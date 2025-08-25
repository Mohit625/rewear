import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Book,
  Star,
  Package,
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      name: "Electronics",
      count: "2,340",
      icon: <Smartphone className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-700",
      subcategories: ["Phones", "Laptops", "Gaming", "Audio"],
    },
    {
      name: "Fashion",
      count: "1,820",
      icon: <Shirt className="h-8 w-8" />,
      color: "bg-pink-100 text-pink-700",
      subcategories: ["Clothing", "Shoes", "Accessories", "Jewelry"],
    },
    {
      name: "Home & Garden",
      count: "1,250",
      icon: <Home className="h-8 w-8" />,
      color: "bg-green-100 text-green-700",
      subcategories: ["Furniture", "Decor", "Garden", "Kitchen"],
    },
    {
      name: "Sports",
      count: "980",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-700",
      subcategories: ["Fitness", "Outdoor", "Team Sports", "Water Sports"],
    },
    {
      name: "Books",
      count: "750",
      icon: <Book className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-700",
      subcategories: ["Fiction", "Non-fiction", "Textbooks", "Comics"],
    },
    {
      name: "Collectibles",
      count: "420",
      icon: <Star className="h-8 w-8" />,
      color: "bg-indigo-100 text-indigo-700",
      subcategories: ["Antiques", "Art", "Coins", "Toys"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Categories</h1>
          <p className="text-muted-foreground">
            Discover items across all our popular categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${category.color.replace("text-", "").replace("100", "50")}`}
                  >
                    {category.icon}
                  </div>
                  <Badge className={category.color}>
                    {category.count} items
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-600 transition-colors">
                  {category.name}
                </h3>

                <div className="space-y-2 mb-4">
                  {category.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {sub}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-brand-50 group-hover:border-brand-200"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Browse {category.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
