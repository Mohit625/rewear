import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Upload, Search, MessageSquare, RefreshCw, Coins } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Create Your Profile",
      icon: <Users className="h-8 w-8" />,
      description:
        "Sign up and create your ReWear profile. Tell us about your style preferences and clothing sizes.",
      details: [
        "Complete email verification",
        "Set up your profile with photos",
        "Add your clothing preferences",
        "Verify your location for local swaps",
      ],
    },
    {
      step: 2,
      title: "Upload Your Items",
      icon: <Upload className="h-8 w-8" />,
      description:
        "Take photos of unworn clothing and upload them with detailed descriptions including size, condition, and brand.",
      details: [
        "Take 3–5 clear photos per item",
        "Write detailed descriptions",
        "Specify size, condition, and material",
        "Set your preferred exchange method",
      ],
    },
    {
      step: 3,
      title: "Browse & Discover",
      icon: <Search className="h-8 w-8" />,
      description:
        "Explore thousands of clothing items from our community. Filter by size, style, condition, and location.",
      details: [
        "Use advanced search filters",
        "Save items to your wishlist",
        "Browse by category or style",
        "Check seller ratings and reviews",
      ],
    },
    {
      step: 4,
      title: "Make Requests",
      icon: <MessageSquare className="h-8 w-8" />,
      description:
        "Send swap requests for direct exchanges or use your points to redeem items you love.",
      details: [
        "Send direct swap proposals",
        "Use points for instant redemption",
        "Chat with other users",
        "Negotiate exchange terms",
      ],
    },
    {
      step: 5,
      title: "Complete Exchange",
      icon: <RefreshCw className="h-8 w-8" />,
      description:
        "Once both parties agree, exchange items safely. Rate your experience and earn points for future swaps.",
      details: [
        "Arrange safe meetup or shipping",
        "Confirm item condition upon receipt",
        "Rate your exchange partner",
        "Earn points for successful swaps",
      ],
    },
  ];

  const exchangeTypes = [
    {
      title: "Direct Swap",
      icon: <RefreshCw className="h-12 w-12 text-blue-600" />,
      description: "Trade your items directly with other community members",
      features: [
        "1:1 item exchanges",
        "Negotiate with other users",
        "Perfect for similar value items",
        "Build relationships in the community",
      ],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Points Redemption",
      icon: <Coins className="h-12 w-12 text-green-600" />,
      description: "Earn points by listing items and redeem them for others",
      features: [
        "Earn 5–30 points per listed item",
        "Instant redemption with points",
        "No need to find direct matches",
        "Fair value-based system",
      ],
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100/50">
        <div className="container text-center max-w-3xl mx-auto space-y-6">
          <Badge className="bg-green-100 text-green-700">
            🌱 Sustainable Fashion Guide
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold">
            How{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              ReWear
            </span>{" "}
            Works
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our sustainable fashion community in 5 simple steps. Exchange
            unworn clothing and reduce your environmental impact.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Getting Started
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow these simple steps to start your sustainable fashion
              journey
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        {step.icon}
                      </div>
                      <div>
                        <Badge className="bg-green-100 text-green-700 mb-2">
                          Step {step.step}
                        </Badge>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-100/50">
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <div className="text-green-600">{step.icon}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Step {step.step} Illustration
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Methods */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">Swap Methods</h2>
            <p className="text-muted-foreground text-lg">
              Choose how you want to exchange items
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {exchangeTypes.map((method, idx) => (
              <Card
                key={idx}
                className={`p-6 border ${method.borderColor} ${method.bgColor}`}
              >
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    {method.icon}
                    <h3 className="text-xl font-semibold">{method.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
                    {method.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
