
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Calendar } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Artistly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/artists" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Browse Artists
            </Link>
            <Link to="/onboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Join as Artist
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="h-4 w-4 mr-2" />
              Book Artist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/artists"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Artists
              </Link>
              <Link
                to="/onboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Join as Artist
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="px-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Artist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
