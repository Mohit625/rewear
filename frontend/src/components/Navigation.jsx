import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Menu,
  X,
  User,
  Heart,
  Plus,
  Shield,
  Recycle,
  Coins,
  Package,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Navigation() {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
            <Recycle className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            ReWear
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clothing items..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Browse Items
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/wishlist" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/dashboard" className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
            <Coins className="h-5 w-5" />
            <span className="text-xs">125</span>
          </Link>

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hi, {user?.firstName}!
                </span>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/list-item">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Browse Items
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <Link to="/browse" className="text-lg font-medium">
                  Browse Items
                </Link>
                <Link to="/how-it-works" className="text-lg font-medium">
                  How It Works
                </Link>
                <Link to="/wishlist" className="text-lg font-medium">
                  Wishlist
                </Link>
                <Link to="/dashboard" className="text-lg font-medium">
                  Dashboard
                </Link>
                <Link to="/list-item" className="text-lg font-medium">
                  List Item
                </Link>
                {isAuthenticated ? (
                  <Button variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
