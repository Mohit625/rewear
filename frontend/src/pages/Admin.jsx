import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Clock,
  Users,
  AlertTriangle,
  TrendingUp,
  Eye,
  Shirt,
  Star,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const stats = {
    pendingItems: 8,
    activeUsers: 2847,
    flaggedItems: 3,
    totalSwaps: 1234,
    monthlyGrowth: 12,
  };

  const pendingItems = [
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      user: "MusicLover92",
      submitted: "2 hours ago",
      condition: "Good",
      points: 15,
      category: "Tops",
      images: 4,
    },
    {
      id: 2,
      title: "Designer Leather Jacket",
      user: "FashionPro",
      submitted: "5 hours ago",
      condition: "Excellent",
      points: 45,
      category: "Outerwear",
      images: 6,
    },
  ];

  const flaggedItems = [
    {
      id: 1,
      title: "Fake Designer Bag",
      user: "BagSeller123",
      reporter: "AuthenticityExpert",
      reason: "Counterfeit item",
      reportedAt: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">ReWear Admin Dashboard</h1>
            <Badge className="bg-green-100 text-green-700">Admin Panel</Badge>
          </div>
          <p className="text-muted-foreground">
            Moderate listings, manage users, and monitor platform stats.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingItems}</div>
              <p className="text-xs text-muted-foreground">Awaiting moderation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.monthlyGrowth}% this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Flagged Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.flaggedItems}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSwaps}</div>
              <p className="text-xs text-muted-foreground">All time exchanges</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="pending">Pending Items</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Items</TabsTrigger>
            <TabsTrigger value="users">Top Users</TabsTrigger>
          </TabsList>

          {/* Pending Items Tab */}
          <TabsContent value="pending" className="space-y-6">
            <h2 className="text-xl font-semibold">Pending Item Reviews</h2>
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                          <Shirt className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            by @{item.user} • {item.submitted}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge className="bg-blue-100 text-blue-700">
                              {item.category}
                            </Badge>
                            <Badge className="bg-green-100 text-green-700">
                              {item.condition}
                            </Badge>
                            <span className="text-muted-foreground">
                              {item.points} pts • {item.images} photos
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </div>
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
