import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { itemsApi, wishlistApi, swapsApi } from "@/lib/api";
import {
  Search,
  Filter,
  Heart,
  Coins,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Browse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [minPoints, setMinPoints] = useState("");
  const [maxPoints, setMaxPoints] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "tops", name: "Tops" },
    { id: "dresses", name: "Dresses" },
    { id: "outerwear", name: "Outerwear" },
    { id: "bottoms", name: "Bottoms" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" },
    { id: "vintage", name: "Vintage" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const conditions = ["like-new", "excellent", "good", "fair"];

  useEffect(() => {
    loadItems();
  }, [
    searchTerm,
    selectedCategory,
    selectedSize,
    selectedCondition,
    minPoints,
    maxPoints,
    sortBy,
    currentPage,
  ]);

  const loadItems = async () => {
    setLoading(true);
    setError("");

    try {
      const query = {
        page: currentPage,
        limit: 12,
        sortBy,
        ...(searchTerm && { query: searchTerm }),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(selectedSize !== "all" && { size: selectedSize }),
        ...(selectedCondition !== "all" && { condition: selectedCondition }),
        ...(minPoints && { minPoints: parseInt(minPoints) }),
        ...(maxPoints && { maxPoints: parseInt(maxPoints) }),
      };

      const response = await itemsApi.searchItems(query);
      setItems(response.items);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (itemId) => {
    try {
      await wishlistApi.addToWishlist(itemId);
      setSuccess("Item added to wishlist!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to add to wishlist");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSwapRequest = async (itemId) => {
    try {
      const item = items.find((item) => item.id === itemId);
      await swapsApi.createSwapRequest({
        targetItemId: itemId,
        type: "points",
        pointsOffered: item?.points || 0,
        message: "I'd like to redeem this item for points",
      });
      setSuccess("Swap request sent!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to send swap request");
      setTimeout(() => setError(""), 3000);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedCondition("all");
    setMinPoints("");
    setMaxPoints("");
    setSortBy("recent");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Items</h1>
          <p className="text-muted-foreground">
            Discover unique clothing items from our sustainable community
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

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for clothing items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={resetFilters}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Item Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.size} • {item.condition}
                  </p>
                  <p className="mt-1 text-sm">{item.points} points</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" onClick={() => handleAddToWishlist(item.id)}>
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleSwapRequest(item.id)}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
