
export interface Artist {
  id: number;
  name: string;
  category: string[];
  bio: string;
  priceRange: string;
  location: string;
  languages: string[];
  image: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  experience: string;
  specialties: string[];
}

export const mockArtists: Artist[] = [
  {
    id: 1,
    name: "Priya Sharma",
    category: ["Singer", "Vocalist"],
    bio: "Professional playback singer with 8+ years of experience in Bollywood and regional music.",
    priceRange: "₹25,000 - ₹50,000",
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    experience: "8+ years",
    specialties: ["Bollywood", "Classical", "Folk"]
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    category: ["DJ", "Music Producer"],
    bio: "International DJ specializing in electronic music and wedding celebrations.",
    priceRange: "₹15,000 - ₹35,000",
    location: "Delhi, Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    experience: "6+ years",
    specialties: ["Electronic", "Bollywood", "Wedding"]
  },
  {
    id: 3,
    name: "Meera Dance Troupe",
    category: ["Dancer", "Choreographer"],
    bio: "Contemporary and classical dance group known for stunning performances.",
    priceRange: "₹30,000 - ₹75,000",
    location: "Bangalore, Karnataka",
    languages: ["Hindi", "English", "Kannada", "Tamil"],
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 234,
    verified: true,
    experience: "10+ years",
    specialties: ["Contemporary", "Classical", "Bollywood"]
  },
  {
    id: 4,
    name: "Dr. Arjun Patel",
    category: ["Speaker", "Motivational Coach"],
    bio: "Renowned motivational speaker and corporate trainer with PhD in Psychology.",
    priceRange: "₹50,000 - ₹1,00,000",
    location: "Pune, Maharashtra",
    languages: ["Hindi", "English", "Gujarati"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 67,
    verified: true,
    experience: "12+ years",
    specialties: ["Corporate Training", "Leadership", "Wellness"]
  },
  {
    id: 5,
    name: "Ananya Iyer",
    category: ["Singer", "Classical Vocalist"],
    bio: "Carnatic classical singer and music teacher with numerous awards.",
    priceRange: "₹20,000 - ₹45,000",
    location: "Chennai, Tamil Nadu",
    languages: ["Tamil", "English", "Telugu", "Sanskrit"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 123,
    verified: true,
    experience: "15+ years",
    specialties: ["Carnatic", "Devotional", "Classical"]
  },
  {
    id: 6,
    name: "The Rhythm Collective",
    category: ["DJ", "Band"],
    bio: "Multi-genre music collective specializing in fusion and contemporary sounds.",
    priceRange: "₹40,000 - ₹80,000",
    location: "Goa, Goa",
    languages: ["Hindi", "English", "Portuguese"],
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 78,
    verified: true,
    experience: "5+ years",
    specialties: ["Fusion", "Electronic", "Live Performance"]
  },
  {
    id: 7,
    name: "Kavya Reddy",
    category: ["Dancer", "Folk Performer"],
    bio: "Traditional folk dancer specializing in Kuchipudi and regional dance forms.",
    priceRange: "₹18,000 - ₹40,000",
    location: "Hyderabad, Telangana",
    languages: ["Telugu", "Hindi", "English"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 145,
    verified: true,
    experience: "9+ years",
    specialties: ["Kuchipudi", "Folk", "Traditional"]
  },
  {
    id: 8,
    name: "Vikram Singh",
    category: ["Speaker", "Stand-up Comedian"],
    bio: "Corporate comedian and public speaker bringing humor to business events.",
    priceRange: "₹35,000 - ₹65,000",
    location: "Jaipur, Rajasthan",
    languages: ["Hindi", "English", "Rajasthani"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 92,
    verified: true,
    experience: "7+ years",
    specialties: ["Corporate Comedy", "Stand-up", "Motivational"]
  }
];

export const categories = [
  "All Categories",
  "Singer",
  "Dancer",
  "Speaker",
  "DJ",
  "Vocalist",
  "Music Producer",
  "Choreographer",
  "Motivational Coach",
  "Classical Vocalist",
  "Band",
  "Folk Performer",
  "Stand-up Comedian"
];

export const locations = [
  "All Locations",
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Goa, Goa",
  "Hyderabad, Telangana",
  "Jaipur, Rajasthan",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat"
];

export const priceRanges = [
  "All Budgets",
  "Under ₹20,000",
  "₹20,000 - ₹40,000",
  "₹40,000 - ₹60,000",
  "₹60,000 - ₹80,000",
  "Above ₹80,000"
];

export const languages = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Rajasthani",
  "Sanskrit",
  "Portuguese"
];

export const feeRanges = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹75,000",
  "₹75,000 - ₹1,00,000",
  "Above ₹1,00,000"
];
