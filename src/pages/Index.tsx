
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Calendar, Star, ArrowRight, Music, Mic, Camera, Palette } from "lucide-react";
import Navigation from "@/components/Navigation";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const artistCategories = [
    {
      id: 1,
      title: "Singers",
      description: "Professional vocalists for all occasions",
      icon: Mic,
      count: "250+ artists",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Dancers",
      description: "Choreographers and performance dancers",
      icon: Music,
      count: "180+ artists",
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Speakers",
      description: "Motivational and keynote speakers",
      icon: Users,
      count: "120+ artists",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "DJs",
      description: "Professional DJs and music producers",
      icon: Camera,
      count: "300+ artists",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    }
  ];

  const stats = [
    { number: "850+", label: "Verified Artists" },
    { number: "2000+", label: "Successful Events" },
    { number: "500+", label: "Happy Clients" },
    { number: "50+", label: "Cities Covered" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
              India's Premier Artist Booking Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Book Amazing <span className="text-yellow-400">Artists</span> for Your Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Connect with thousands of verified performers. From singers to speakers, 
              find the perfect artist for your event in minutes.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for singers, dancers, speakers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                />
                <Button className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/artists">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                  Explore Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/onboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                  Join as Artist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Artists by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our curated selection of professional artists across various categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artistCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} to="/artists" className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <IconComponent className="h-8 w-8 mb-2" />
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {category.count}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Artistly Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to book your perfect artist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Browse & Search</h3>
              <p className="text-gray-600">
                Explore our extensive database of verified artists filtered by category, location, and budget.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Request Quote</h3>
              <p className="text-gray-600">
                Send booking requests with your event details and get instant quotes from artists.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Book & Enjoy</h3>
              <p className="text-gray-600">
                Confirm your booking, make secure payments, and enjoy an amazing performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Artist?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/artists">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4">
                Start Browsing Artists
              </Button>
            </Link>
            <Link to="/onboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4">
                List Your Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Artistly</h3>
              <p className="text-gray-300">
                India's premier platform connecting event planners with talented artists.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Event Planners</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/artists" className="hover:text-purple-400">Browse Artists</Link></li>
                <li><a href="#" className="hover:text-purple-400">How It Works</a></li>
                <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Artists</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/onboard" className="hover:text-purple-400">Join Platform</Link></li>
                <li><Link to="/dashboard" className="hover:text-purple-400">Artist Dashboard</Link></li>
                <li><a href="#" className="hover:text-purple-400">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Artistly.com - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
