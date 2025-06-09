import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingCart, BookText } from "lucide-react";
import ProductModal from "@/components/ProductModal";

const categories = [
  { id: "all", name: "Wszystkie", icon: BookOpen },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
  { id: "marketing", name: "Marketing", icon: BookText },
  { id: "hr", name: "HR & Rekrutacja", icon: BookOpen },
  { id: "finance", name: "Finanse", icon: BookText },
  { id: "logistics", name: "Logistyka", icon: ShoppingCart },
];

const automationIdeas = [
  {
    id: 1,
    title: "Automatyczne generowanie faktur",
    description: "System automatycznie generuje i wysyła faktury po realizacji zamówienia, integrując się z systemami płatności.",
    category: "ecommerce",
    industry: "E-commerce",
    difficulty: "Średni",
    timeToImplement: "2-3 tygodnie",
    benefits: ["Oszczędność czasu", "Redukcja błędów", "Lepszy cash flow"],
    price: "od 2,500 PLN",
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 2,
    title: "Chatbot obsługi klienta",
    description: "Inteligentny chatbot odpowiadający na najczęstsze pytania klientów 24/7, z możliwością przekierowania do konsultanta.",
    category: "ecommerce",
    industry: "E-commerce",
    difficulty: "Zaawansowany",
    timeToImplement: "4-6 tygodni",
    benefits: ["Dostępność 24/7", "Redukcja kosztów", "Szybsza obsługa"],
    price: "od 5,000 PLN",
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 3,
    title: "Automatyczne kampanie email marketingowe",
    description: "System segmentuje klientów i wysyła spersonalizowane kampanie email w oparciu o ich zachowania i preferencje.",
    category: "marketing",
    industry: "Marketing",
    difficulty: "Średni",
    timeToImplement: "2-4 tygodnie",
    benefits: ["Wyższa konwersja", "Personalizacja", "Automatyzacja nurturing"],
    price: "od 3,000 PLN",
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    id: 4,
    title: "System automatycznego rekrutacji",
    description: "Automatyczne przesiewanie CV, planowanie rozmów i komunikacja z kandydatami na podstawie zdefiniowanych kryteriów.",
    category: "hr",
    industry: "HR & Rekrutacja",
    difficulty: "Zaawansowany",
    timeToImplement: "6-8 tygodni",
    benefits: ["Oszczędność czasu HR", "Lepsza jakość kandydatów", "Standardyzacja procesu"],
    price: "od 8,000 PLN",
    image: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 5,
    title: "Automatyczne raportowanie finansowe",
    description: "System automatycznie zbiera dane z różnych źródeł i generuje raporty finansowe w czasie rzeczywistym.",
    category: "finance",
    industry: "Finanse",
    difficulty: "Średni",
    timeToImplement: "3-5 tygodni",
    benefits: ["Aktualne dane", "Redukcja błędów", "Oszczędność czasu"],
    price: "od 4,500 PLN",
    image: "photo-1518770660439-4636190af475"
  },
  {
    id: 6,
    title: "Smart tracking przesyłek",
    description: "Automatyczne śledzenie przesyłek z powiadomieniami klientów o statusie dostawy i przewidywanym czasie.",
    category: "logistics",
    industry: "Logistyka",
    difficulty: "Średni",
    timeToImplement: "2-3 tygodnie",
    benefits: ["Lepsza komunikacja", "Redukcja zapytań", "Zwiększona satysfakcja"],
    price: "od 3,500 PLN",
    image: "photo-1488590528505-98d2b5aba04b"
  }
];

const Ideas = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof automationIdeas[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredIdeas = selectedCategory === "all" 
    ? automationIdeas 
    : automationIdeas.filter(idea => idea.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Łatwy": return "bg-green-100 text-green-800";
      case "Średni": return "bg-yellow-100 text-yellow-800";
      case "Zaawansowany": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleLearnMore = (idea: typeof automationIdeas[0]) => {
    setSelectedProduct(idea);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Pomysły na Automatyzację
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Odkryj gotowe rozwiązania automatyzacji dostosowane do Twojej branży. 
              Od e-commerce po finanse - znajdź inspirację dla swojego biznesu.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Icon size={18} />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={`https://images.unsplash.com/${idea.image}?w=400&h=200&fit=crop`}
                  alt={idea.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={`${getDifficultyColor(idea.difficulty)} border-0`}>
                    {idea.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {idea.industry}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {idea.timeToImplement}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {idea.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {idea.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Korzyści:</h4>
                    <div className="flex flex-wrap gap-1">
                      {idea.benefits.slice(0, 3).map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="font-bold text-lg text-primary">{idea.price}</p>
                      <p className="text-xs text-muted-foreground">implementacja</p>
                    </div>
                    <Button 
                      className="px-6 hover:shadow-md transition-all duration-200"
                      onClick={() => handleLearnMore(idea)}
                    >
                      Dowiedz się więcej
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Nie widzisz swojego pomysłu?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Skontaktuj się z nami, aby omówić indywidualne rozwiązanie automatyzacji 
            dostosowane do specyfiki Twojego biznesu.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg hover:shadow-lg transition-all duration-200">
            Skontaktuj się z ekspertem
          </Button>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Ideas;
