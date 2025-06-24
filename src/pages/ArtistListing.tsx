
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Filter, Grid, List, Verified, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import { mockArtists, categories, locations, priceRanges, Artist } from "@/data/mockData";

const ArtistListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Budgets");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist) => {
      const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artist.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           artist.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All Categories" || 
                             artist.category.includes(selectedCategory);

      const matchesLocation = selectedLocation === "All Locations" || 
                             artist.location === selectedLocation;

      const matchesPriceRange = selectedPriceRange === "All Budgets" || 
                               checkPriceRange(artist.priceRange, selectedPriceRange);

      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedPriceRange]);

  const checkPriceRange = (artistPrice: string, selectedRange: string) => {
    const extractPrice = (priceStr: string) => {
      const match = priceStr.match(/₹([\d,]+)/);
      return match ? parseInt(match[1].replace(/,/g, '')) : 0;
    };

    const artistMinPrice = extractPrice(artistPrice);
    
    switch (selectedRange) {
      case "Under ₹20,000":
        return artistMinPrice < 20000;
      case "₹20,000 - ₹40,000":
        return artistMinPrice >= 20000 && artistMinPrice <= 40000;
      case "₹40,000 - ₹60,000":
        return artistMinPrice >= 40000 && artistMinPrice <= 60000;
      case "₹60,000 - ₹80,000":
        return artistMinPrice >= 60000 && artistMinPrice <= 80000;
      case "Above ₹80,000":
        return artistMinPrice > 80000;
      default:
        return true;
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setSelectedPriceRange("All Budgets");
  };

  const ArtistCard = ({ artist }: { artist: Artist }) => {
    if (viewMode === "list") {
      return (
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-32 h-32 flex-shrink-0">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {artist.name}
                      {artist.verified && (
                        <Verified className="h-5 w-5 text-blue-500" />
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      {artist.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-purple-600">
                      {artist.priceRange}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {artist.rating} ({artist.reviewCount})
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {artist.category.map((cat, index) => (
                    <Badge key={index} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {artist.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Quote className="h-4 w-4 mr-2" />
                    Ask for Quote
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            {artist.verified && (
              <Badge className="bg-blue-500 text-white">
                <Verified className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1 text-white bg-black/50 rounded-full px-2 py-1 text-sm w-fit">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {artist.rating} ({artist.reviewCount})
            </div>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{artist.name}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {artist.location}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-3">
            {artist.category.map((cat, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.bio}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-purple-600">{artist.priceRange}</span>
            <span className="text-sm text-gray-500">{artist.experience}</span>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Quote className="h-4 w-4 mr-2" />
            Ask for Quote
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Amazing Artists
          </h1>
          <p className="text-xl text-gray-600">
            Browse {mockArtists.length}+ verified performers across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-grow">
              <Input
                placeholder="Search artists by name, category, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(selectedCategory !== "All Categories" || selectedLocation !== "All Locations" || selectedPriceRange !== "All Budgets" || searchQuery) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary">{selectedCategory}</Badge>
              )}
              {selectedLocation !== "All Locations" && (
                <Badge variant="secondary">{selectedLocation}</Badge>
              )}
              {selectedPriceRange !== "All Budgets" && (
                <Badge variant="secondary">{selectedPriceRange}</Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary">"{searchQuery}"</Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredArtists.length} Artists Found
            </h2>
            <p className="text-gray-600">
              Showing results for your search criteria
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold mb-2">No artists found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all artists
            </p>
            <Button onClick={clearFilters} className="bg-purple-600 hover:bg-purple-700">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistListing;
