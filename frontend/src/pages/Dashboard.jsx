import { useEffect } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { authApi } from "@/lib/api";
import { useSafeState, useMounted } from "@/hooks/useSafeState";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coins,
  Package,
  Star,
  Edit,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, signIn } = useAuth();
  const mountedRef = useMounted();

  const [userStats, setUserStats] = useSafeState({
    points: 0,
    totalSwaps: 0,
    itemsListed: 0,
    rating: 0,
    memberSince: "Jan 2024",
  });

  const [isLoading, setIsLoading] = useSafeState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (isAuthenticated && user && token) {
      loadUserStats();
    } else if (isAuthenticated && !token) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }
  }, [isAuthenticated, user]);

  const loadUserStats = async () => {
    if (!mountedRef.current) return;
    try {
      setIsLoading(true);
      const stats = await authApi.getUserStats();
      setUserStats({
        points: stats.points || 0,
        totalSwaps: stats.totalSwaps || 0,
        itemsListed: stats.itemsListed || 0,
        rating: stats.rating || 0,
        memberSince: user?.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "Jan 2024",
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const myItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      size: "M",
      condition: "Excellent",
      points: 15,
      status: "active",
      views: 24,
      likes: 3,
      requests: 2,
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      size: "S",
      condition: "Like New",
      points: 20,
      status: "pending",
      views: 12,
      likes: 1,
      requests: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-green-100 text-green-700">
                {user ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h1>
              <p className="text-muted-foreground">
                Member since {userStats.memberSince}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{userStats.rating}</span>
                <Badge className="bg-green-100 text-green-700">Trusted Swapper</Badge>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              List New Item
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points</CardTitle>
              <Coins className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userStats.points}</div>
              <p className="text-xs text-muted-foreground">Earned via swaps</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalSwaps}</div>
              <p className="text-xs text-muted-foreground">Completed exchanges</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Items, Requests, History */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="history">Swap History</TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.condition}</p>
                    <div className="text-sm mt-2">{item.points} points</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
