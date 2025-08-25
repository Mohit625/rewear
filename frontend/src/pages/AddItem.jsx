import { useState } from 'react';
import API from '../api/axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Upload,
  Camera,
  X,
  Plus,
  Shirt,
  Tag,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Coins,
  RefreshCw,
} from "lucide-react";

export default function AddItem() {
  const [form, setForm] = useState({
    title: '', description: '', category: '', type: '',
    size: '', condition: '', tags: '', imageUrls: [], points: 5
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [exchangeMethod, setExchangeMethod] = useState("both");
  const [estimatedPoints, setEstimatedPoints] = useState(0);

  const categories = [
    "Tops",
    "Dresses",
    "Outerwear",
    "Bottoms",
    "Shoes",
    "Accessories",
    "Bags",
    "Jewelry",
    "Activewear",
    "Formal",
    "Vintage",
    "Designer",
  ];

  const sizes = {
    clothing: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    shoes: [
      "5",
      "5.5",
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12",
    ],
    oneSize: ["One Size"],
  };

  const conditions = [
    {
      value: "like-new",
      label: "Like New",
      description: "Worn once or twice, no visible wear",
      points: 30,
    },
    {
      value: "excellent",
      label: "Excellent",
      description: "Minimal wear, excellent condition",
      points: 25,
    },
    {
      value: "good",
      label: "Good",
      description: "Some signs of wear but well maintained",
      points: 18,
    },
    {
      value: "fair",
      label: "Fair",
      description: "Noticeable wear but still functional",
      points: 12,
    },
  ];

  const popularTags = [
    "vintage",
    "designer",
    "casual",
    "formal",
    "summer",
    "winter",
    "organic",
    "sustainable",
    "brand-new",
    "limited-edition",
    "handmade",
    "eco-friendly",
  ];

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const calculateEstimatedPoints = (condition, category) => {
    const basePoints =
      conditions.find((c) => c.value === condition)?.points || 0;
    const categoryMultiplier =
      category === "designer" || category === "vintage" ? 1.5 : 1;
    return Math.round(basePoints * categoryMultiplier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = form.tags.split(',').map(tag => tag.trim());
    await API.post('/items', { ...form, tags });
    alert('Item submitted!');
    setForm({ ...form, title: '', description: '', tags: '' });
  };

  return (
    <>
    <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Plus className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">List New Item</h1>
            <Badge className="bg-green-100 text-green-700">Free</Badge>
          </div>
          <p className="text-muted-foreground">
            Share your unworn clothing with the ReWear community and earn points
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Photos
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add 3-5 clear photos of your item. Good photos get more
                  interest!
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-green-100 text-green-700">
                          Main Photo
                        </Badge>
                      )}
                    </div>
                  ))}
                  {uploadedImages.length < 5 && (
                    <label className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                {uploadedImages.length === 0 && (
                  <div className="flex items-center mt-4 p-3 bg-blue-50 rounded-lg">
                    <Info className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-700">
                      Upload at least 3 photos to get started
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shirt className="h-5 w-5 mr-2" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Denim Jacket"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Levi's, Zara, H&M"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.clothing.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="e.g., Navy Blue"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Condition *</Label>
                  <RadioGroup defaultValue="excellent" className="space-y-3">
                    {conditions.map((condition) => (
                      <div
                        key={condition.value}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem
                          value={condition.value}
                          id={condition.value}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={condition.value}
                            className="font-medium cursor-pointer"
                          >
                            {condition.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {condition.description}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          ~{condition.points} pts
                        </Badge>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail. Include fabric, fit, why you're letting it go, any flaws, etc."
                    className="min-h-24"
                  />
                  <p className="text-xs text-muted-foreground">
                    Detailed descriptions get more interest and build trust
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags (Optional)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add tags to help people find your item
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Button
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className={
                          selectedTags.includes(tag)
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }
                      >
                        {tag}
                        {selectedTags.includes(tag) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add custom tag" className="flex-1" />
                    <Button variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exchange Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Exchange Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>How would you like to exchange this item?</Label>
                  <RadioGroup
                    value={exchangeMethod}
                    onValueChange={setExchangeMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="both" id="both" />
                      <div className="flex-1">
                        <Label
                          htmlFor="both"
                          className="font-medium cursor-pointer"
                        >
                          Both swaps and points
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Accept direct swaps or point redemptions
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Recommended
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="swap-only" id="swap-only" />
                      <div className="flex-1">
                        <Label
                          htmlFor="swap-only"
                          className="font-medium cursor-pointer"
                        >
                          Direct swaps only
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Only accept item-for-item exchanges
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="points-only" id="points-only" />
                      <div className="flex-1">
                        <Label
                          htmlFor="points-only"
                          className="font-medium cursor-pointer"
                        >
                          Points only
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Only accept point redemptions
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedImages.length > 0 ? (
                    <img
                      src={uploadedImages[0]}
                      alt="Preview"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Shirt className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">Your Item Title</h3>
                    <p className="text-sm text-muted-foreground">
                      Size • Condition
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-green-600 font-semibold">
                        <Coins className="h-4 w-4 mr-1" />
                        {estimatedPoints || "~"} points
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Your rating
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Listing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm">Use natural lighting for photos</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm">Show any flaws or wear honestly</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm">Include measurements when helpful</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm">Write a detailed description</p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <p className="text-sm">
                    Items are reviewed before going live
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                List Item
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      {['title', 'description', 'category', 'type', 'size', 'condition', 'tags'].map(field => (
        <input key={field} placeholder={field} value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="input" required />
      ))}
      <input type="number" min="1" placeholder="Points" value={form.points}
        onChange={e => setForm({ ...form, points: e.target.value })} className="input" />
      <button className="btn">Submit Item</button>
    </form>
    </>
  );
}
