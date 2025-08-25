import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Recycle,
  Users,
  Leaf,
  Heart,
  Star,
  ArrowRight,
  Play,
  Coins,
  RefreshCw,
  Package,
  Shirt,
  CheckCircle,
  Globe,
  TrendingUp,
} from "lucide-react";
export default function Home() {
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      size: "M",
      condition: "Excellent",
      points: 15,
      image: "/api/placeholder/300/300",
      user: "Sarah_Fashion",
      tags: ["vintage", "denim", "casual"],
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      size: "One Size",
      condition: "Like New",
      points: 25,
      image: "/api/placeholder/300/300",
      user: "LuxStyle",
      tags: ["designer", "silk", "accessories"],
    },
    {
      id: 3,
      title: "Wool Winter Coat",
      size: "L",
      condition: "Good",
      points: 30,
      image: "/api/placeholder/300/300",
      user: "EcoFashion",
      tags: ["wool", "winter", "coat"],
    },
    {
      id: 4,
      title: "Summer Floral Dress",
      size: "S",
      condition: "Excellent",
      points: 20,
      image: "/api/placeholder/300/300",
      user: "VintageVibes",
      tags: ["floral", "summer", "dress"],
    },
  ];

  const categories = [
    { name: "Tops", count: "450", icon: "👕" },
    { name: "Dresses", count: "320", icon: "👗" },
    { name: "Outerwear", count: "280", icon: "🧥" },
    { name: "Accessories", count: "190", icon: "👜" },
    { name: "Shoes", count: "150", icon: "👠" },
    { name: "Vintage", count: "120", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100/50">
        <div className="container py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  🌱 Sustainable Fashion Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                    ReWear
                  </span>{" "}
                  Community Clothing Exchange
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Exchange unworn clothing through direct swaps or point-based
                  redemption. Promote sustainable fashion in our
                  community-driven marketplace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Browse Items
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                >
                  <Shirt className="mr-2 h-4 w-4" />
                  List an Item
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>2.5k+ Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 text-green-600" />
                  <span>5k+ Swaps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span>Eco-Friendly</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-700/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Quick Search</h3>
                  <Badge className="bg-green-100 text-green-700">Live</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Find clothing items..."
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories.slice(0, 4).map((category, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-gray-100 hover:border-green-200 transition-colors cursor-pointer"
                    >
                      <div className="text-sm font-medium flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {category.count} items
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center pt-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-green-600">
                    <Recycle className="h-4 w-4" />
                    <span>100% Sustainable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">How ReWear Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start your sustainable fashion journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shirt className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>1. Upload Items</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  List your unworn clothes with photos, descriptions, and
                  condition details
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <RefreshCw className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>2. Swap or Redeem</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Exchange directly with other users or use points to redeem
                  items
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>3. Stay Sustainable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Build your wardrobe sustainably while earning points for every
                  successful exchange
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-green-50/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} items
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured Items
              </h2>
              <p className="text-lg text-muted-foreground">
                Popular items from our community
              </p>
            </div>
            <Button variant="outline" className="border-green-200">
              View All Items
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                    <Shirt className="h-16 w-16 text-green-400" />
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-3 left-3 bg-green-100 text-green-700">
                    {item.condition}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Size {item.size} • by @{item.user}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <Coins className="h-4 w-4 mr-1" />
                        {item.points} points
                      </div>
                      <div className="flex gap-1">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Send Request
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Impact */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-lg text-green-100">
              Together, we're making fashion more sustainable
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">5,247</div>
              <div className="text-green-100">Items Exchanged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">
                2.1 tons
              </div>
              <div className="text-green-100">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">89%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2">2,543</div>
              <div className="text-green-100">Active Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Sustainable Fashion Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of fashion lovers making a positive impact on the
              environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 hover:bg-green-50"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
                  <Recycle className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">ReWear</span>
              </div>
              <p className="text-gray-400 mb-4">
                Sustainable fashion through community-driven clothing exchange.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Items
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    List Items
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About ReWear
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Impact Report
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2024 ReWear. All rights reserved. • Making fashion sustainable,
            one swap at a time.
          </div>
        </div>
      </footer>
    </div>
  );
}
