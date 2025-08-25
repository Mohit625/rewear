import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { useSafeState, useMounted } from "@/hooks/useSafeState";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wishlistApi, swapsApi } from "@/lib/api";
import {
  Heart,
  Search,
  Coins,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Wishlist() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const mountedRef = useMounted();

  const [wishlistItems, setWishlistItems] = useSafeState([]);
  const [loading, setLoading] = useSafeState(true);
  const [error, setError] = useSafeState("");
  const [success, setSuccess] = useSafeState("");
  const [searchTerm, setSearchTerm] = useSafeState("");
  const [selectedCategory, setSelectedCategory] = useSafeState("all");

  const [stats, setStats] = useSafeState({
    totalItems: 0,
    availableItems: 0,
    unavailableItems: 0,
    totalPoints: 0,
  });

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "tops", name: "Tops" },
    { id: "dresses", name: "Dresses" },
    { id: "outerwear", name: "Outerwear" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" },
  ];

  useEffect(() => {
    if (isAuthenticated && !authLoading && mountedRef.current) {
      const loadData = async () => {
        await loadWishlist();
        await loadStats();
      };
      loadData();
    }
  }, [isAuthenticated, authLoading]);

  const loadWishlist = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await wishlistApi.getWishlist();
      setWishlistItems(response.items);
    } catch (err) {
      setError(err.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await wishlistApi.getWishlistStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const filteredItems = wishlistItems.filter((w) => {
    const title = w.item.title.toLowerCase();
    const category = w.item.category;
    return (
      title.includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || category === selectedCategory)
    );
  });

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await wishlistApi.removeFromWishlist(itemId);
      setSuccess("Item removed from wishlist");
      loadWishlist();
      loadStats();
    } catch (err) {
      setError(err.message || "Failed to remove item");
    }
  };

  const handleSwapRequest = async (itemId, points) => {
    try {
      await swapsApi.createSwapRequest({
        targetItemId: itemId,
        type: "points",
        pointsOffered: points,
        message: "I'd like to redeem this item from my wishlist",
      });
      setSuccess("Swap request sent!");
    } catch (err) {
      setError(err.message || "Failed to send request");
    }
  };

  const handleClearWishlist = async () => {
    if (!confirm("Clear entire wishlist?")) return;
    try {
      await wishlistApi.clearWishlist();
      setSuccess("Wishlist cleared successfully");
      loadWishlist();
      loadStats();
    } catch (err) {
      setError(err.message || "Failed to clear wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span className="ml-2">Loading your wishlist...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <Badge className="bg-red-100 text-red-700">
              {stats.totalItems} items
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Items you've saved for future swaps and redemptions
          </p>
        </div>

        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your wishlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleClearWishlist}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(({ item }) => (
            <Card key={item.id}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleSwapRequest(item.id, item.points)}
                  >
                    Redeem for {item.points} points
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
