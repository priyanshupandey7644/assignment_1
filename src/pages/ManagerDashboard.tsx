
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  MapPin
} from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock data for dashboard
const stats = [
  {
    title: "Total Artists",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Active Bookings",
    value: "18",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "text-green-600"
  },
  {
    title: "Monthly Revenue",
    value: "₹2,45,000",
    change: "+24%",
    trend: "up",
    icon: IndianRupee,
    color: "text-purple-600"
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

const mockArtistSubmissions = [
  {
    id: 1,
    name: "Amit Kumar",
    category: ["Singer", "Vocalist"],
    city: "Mumbai",
    fee: "₹25,000 - ₹50,000",
    experience: "8+ years",
    status: "pending",
    submittedDate: "2024-06-20",
    rating: null,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Sneha Patel",
    category: ["Dancer", "Choreographer"],
    city: "Bangalore",
    fee: "₹30,000 - ₹60,000",
    experience: "6+ years",
    status: "approved",
    submittedDate: "2024-06-18",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Rajesh Sharma",
    category: ["DJ", "Music Producer"],
    city: "Delhi",
    fee: "₹20,000 - ₹40,000",
    experience: "5+ years",
    status: "rejected",
    submittedDate: "2024-06-15",
    rating: null,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    name: "Kavya Reddy",
    category: ["Speaker", "Motivational Coach"],
    city: "Hyderabad",
    fee: "₹50,000 - ₹1,00,000",
    experience: "10+ years",
    status: "approved",
    submittedDate: "2024-06-12",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 5,
    name: "Arjun Singh",
    category: ["Singer", "Folk Performer"],
    city: "Jaipur",
    fee: "₹15,000 - ₹35,000",
    experience: "4+ years",
    status: "pending",
    submittedDate: "2024-06-10",
    rating: null,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  }
];

const mockBookingRequests = [
  {
    id: 1,
    eventTitle: "Corporate Annual Day",
    clientName: "Tech Solutions Pvt Ltd",
    artistName: "Priya Sharma",
    eventDate: "2024-07-15",
    location: "Mumbai",
    budget: "₹45,000",
    status: "pending",
    requestDate: "2024-06-22"
  },
  {
    id: 2,
    eventTitle: "Wedding Reception",
    clientName: "Sharma Family",
    artistName: "Meera Dance Troupe",
    eventDate: "2024-07-20",
    location: "Delhi",
    budget: "₹65,000",
    status: "confirmed",
    requestDate: "2024-06-20"
  },
  {
    id: 3,
    eventTitle: "Music Festival",
    clientName: "Event Co.",
    artistName: "The Rhythm Collective",
    eventDate: "2024-08-05",
    location: "Goa",
    budget: "₹75,000",
    status: "negotiating",
    requestDate: "2024-06-18"
  }
];

const ManagerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "negotiating":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "negotiating":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredSubmissions = mockArtistSubmissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredBookings = mockBookingRequests.filter(booking => {
    const matchesSearch = booking.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.artistName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Manager Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your artists and bookings efficiently
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artists">Artist Management</TabsTrigger>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={`${stat.color}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your platform efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                    <Users className="h-6 w-6" />
                    Review New Artists
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Manage Bookings
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <TrendingUp className="h-6 w-6" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Artist Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockArtistSubmissions.slice(0, 3).map((artist) => (
                      <div key={artist.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{artist.name}</h4>
                          <p className="text-sm text-gray-600">{artist.category.join(", ")}</p>
                        </div>
                        <Badge className={getStatusColor(artist.status)}>
                          {artist.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Booking Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookingRequests.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{booking.eventTitle}</h4>
                          <p className="text-sm text-gray-600">{booking.clientName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.budget}</p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="artists" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search artists by name, category, or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Artist Table */}
            <Card>
              <CardHeader>
                <CardTitle>Artist Submissions ({filteredSubmissions.length})</CardTitle>
                <CardDescription>Manage artist applications and profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artist</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Fee Range</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((artist) => (
                        <TableRow key={artist.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium">{artist.name}</p>
                                {artist.rating && (
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {artist.rating}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {artist.category.map((cat, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {artist.city}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{artist.fee}</TableCell>
                          <TableCell>{artist.experience}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(artist.status)}>
                              {getStatusIcon(artist.status)}
                              <span className="ml-1 capitalize">{artist.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {artist.status === "pending" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="destructive">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search bookings by event, client, or artist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="negotiating">Negotiating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests ({filteredBookings.length})</CardTitle>
                <CardDescription>Manage event booking requests and confirmations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Details</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Artist</TableHead>
                        <TableHead>Event Date</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.eventTitle}</p>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {booking.location}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{booking.clientName}</TableCell>
                          <TableCell className="font-medium">{booking.artistName}</TableCell>
                          <TableCell>{new Date(booking.eventDate).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{booking.budget}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
