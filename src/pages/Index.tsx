
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShoppingCart, BookText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Automatyzacja Biznesu
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Odkryj moc automatyzacji i przekształć swój biznes w efektywną maszynę
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ideas">
                <Button size="lg" className="px-8 py-4 text-lg hover:shadow-lg transition-all duration-200">
                  Przeglądaj Pomysły
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg hover:shadow-md transition-all duration-200">
                Skontaktuj się
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dlaczego automatyzacja?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Poznaj korzyści, które automatyzacja może przynieść Twojemu biznesowi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Oszczędność Czasu</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Automatyzacja rutynowych zadań pozwala skupić się na tym, co naprawdę ważne dla rozwoju biznesu.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Redukcja Kosztów</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Zmniejsz koszty operacyjne poprzez eliminację powtarzalnych, czasochłonnych procesów manualnych.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <BookText className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Wyższa Jakość</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Eliminuj błędy ludzkie i zapewnij stałą, wysoką jakość procesów w całej organizacji.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gotowy na automatyzację?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sprawdź nasze pomysły na automatyzację dostosowane do różnych branż i znajdź rozwiązanie dla siebie.
          </p>
          <Link to="/ideas">
            <Button size="lg" className="px-8 py-4 text-lg hover:shadow-lg transition-all duration-200">
              Zobacz Pomysły na Automatyzację
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
