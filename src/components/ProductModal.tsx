
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight, Building2, Award, BarChart3, Play, Zap } from "lucide-react";
import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    description: string;
    category: string;
    industry: string;
    difficulty: string;
    timeToImplement: string;
    benefits: string[];
    price: string;
    image: string;
  } | null;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Nowe zamówienie' },
    position: { x: 250, y: 0 },
    style: { 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    }
  },
  {
    id: '2',
    data: { label: 'Weryfikacja danych' },
    position: { x: 250, y: 100 },
    style: { 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    }
  },
  {
    id: '3',
    data: { label: 'Generowanie faktury' },
    position: { x: 100, y: 200 },
    style: { 
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    }
  },
  {
    id: '4',
    data: { label: 'Wysyłka do klienta' },
    position: { x: 400, y: 200 },
    style: { 
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    }
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Proces zakończony' },
    position: { x: 250, y: 300 },
    style: { 
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }
];

const caseStudies = [
  {
    company: "TechStore Sp. z o.o.",
    industry: "E-commerce",
    challenge: "Ręczne generowanie 200+ faktur dziennie",
    solution: "Automatyzacja całego procesu fakturowania",
    results: [
      "Oszczędność 15 godzin pracy tygodniowo",
      "Redukcja błędów o 95%",
      "Przyspieszenie płatności o 40%"
    ],
    timeframe: "2 miesiące",
    roi: "300%"
  },
  {
    company: "ModaStyle",
    industry: "Fashion",
    challenge: "Brak automatycznej komunikacji z klientami",
    solution: "Wdrożenie chatbota i automatycznych emaili",
    results: [
      "24/7 obsługa klienta",
      "Wzrost konwersji o 25%",
      "Redukcja kosztów obsługi o 60%"
    ],
    timeframe: "6 tygodni",
    roi: "450%"
  }
];

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cases'>('overview');

  if (!product) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Łatwy": return "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0";
      case "Średni": return "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0";
      case "Zaawansowany": return "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0";
      default: return "bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-0">
        <DialogHeader className="text-left space-y-4 pb-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                {product.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </DialogDescription>
            </div>
            <img
              src={`https://images.unsplash.com/${product.image}?w=200&h=120&fit=crop`}
              alt={product.title}
              className="w-48 h-28 object-cover rounded-xl shadow-lg"
            />
          </div>
        </DialogHeader>

        {/* Modern Tabs */}
        <div className="flex gap-2 p-1 bg-muted/50 rounded-2xl mb-8">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                : 'hover:bg-background/80'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Przegląd rozwiązania
          </Button>
          <Button
            variant={activeTab === 'cases' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('cases')}
            className={`flex-1 rounded-xl transition-all duration-300 ${
              activeTab === 'cases' 
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                : 'hover:bg-background/80'
            }`}
          >
            <Award className="w-4 h-4 mr-2" />
            Case Studies
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Badge variant="secondary" className="mb-2">{product.industry}</Badge>
                  <p className="text-sm text-muted-foreground">Branża</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Badge className={getDifficultyColor(product.difficulty)}>
                    {product.difficulty}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">Złożoność</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-sm">
                <CardContent className="p-4 text-center flex items-center justify-center flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock size={16} className="text-green-600" />
                    <span className="font-semibold text-green-700">{product.timeToImplement}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Czas wdrożenia</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="font-bold text-lg text-primary mb-1">{product.price}</div>
                  <p className="text-sm text-muted-foreground">Inwestycja</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="text-green-600" size={24} />
                      Korzyści dla Twojego biznesu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                          <ArrowRight size={16} className="text-primary shrink-0" />
                          <span className="text-sm font-medium">{benefit}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                        <ArrowRight size={16} className="text-primary shrink-0" />
                        <span className="text-sm font-medium">Automatyczne raportowanie</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                        <ArrowRight size={16} className="text-primary shrink-0" />
                        <span className="text-sm font-medium">Integracja z istniejącymi systemami</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Users className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold">Zespół</p>
                          <p className="text-sm text-muted-foreground">2-3 specjalistów</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <TrendingUp className="text-green-600" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold">ROI</p>
                          <p className="text-sm text-muted-foreground">6-12 miesięcy</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Flowchart */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-background to-primary/5 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="text-primary" size={20} />
                      Jak działa automatyzacja?
                    </CardTitle>
                    <CardDescription>
                      Interaktywny schemat procesu automatyzacji
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                      <ReactFlow
                        nodes={initialNodes}
                        edges={initialEdges}
                        fitView
                        attributionPosition="bottom-left"
                        style={{ background: 'transparent' }}
                      >
                        <Background color="#e2e8f0" gap={20} size={1} />
                        <Controls className="bg-white/80 backdrop-blur-sm border-0 shadow-lg" />
                      </ReactFlow>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-0">
                  <CardHeader>
                    <CardTitle>Co obejmuje implementacja?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Analiza procesów", desc: "Szczegółowe mapowanie obecnych procesów" },
                        { title: "Konfiguracja systemu", desc: "Dostosowanie do specyfiki firmy" },
                        { title: "Szkolenie zespołu", desc: "Kompleksowe przeszkolenie użytkowników" },
                        { title: "Wsparcie techniczne", desc: "3 miesiące bezpłatnego wsparcia" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                          <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                Nasze sukcesy w liczbach
              </h3>
              <p className="text-lg text-muted-foreground">
                Zobacz jak nasze rozwiązania pomogły realnym firmom osiągnąć wymieralne rezultaty
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="bg-gradient-to-br from-background to-primary/5 border-l-4 border-l-primary shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="text-primary" size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{study.company}</CardTitle>
                        <Badge variant="outline" className="mt-1">{study.industry}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg border-l-4 border-l-red-400">
                        <h4 className="font-semibold text-red-700 mb-2">Wyzwanie:</h4>
                        <p className="text-sm text-red-600">{study.challenge}</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-400">
                        <h4 className="font-semibold text-blue-700 mb-2">Rozwiązanie:</h4>
                        <p className="text-sm text-blue-600">{study.solution}</p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-400">
                        <h4 className="font-semibold text-green-700 mb-3">Rezultaty:</h4>
                        <div className="space-y-2">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Award size={14} className="text-green-600 shrink-0" />
                              <span className="text-sm text-green-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock size={16} className="text-blue-600" />
                          <span className="font-semibold text-blue-700 text-sm">Czas wdrożenia</span>
                        </div>
                        <p className="font-bold text-blue-800">{study.timeframe}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <BarChart3 size={16} className="text-green-600" />
                          <span className="font-semibold text-green-700 text-sm">ROI</span>
                        </div>
                        <p className="font-bold text-green-800">{study.roi}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border-0 shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h4 className="text-2xl font-bold mb-4">Gotowy na podobne rezultaty?</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Sprawdź jak nasze rozwiązanie może zwiększyć efektywność Twojej firmy i osiągnąć 
                    podobne rezultaty w automatyzacji procesów biznesowych.
                  </p>
                  <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
                    Umów bezpłatną konsultację
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modern Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50 mt-8">
          <div className="text-center sm:text-left">
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {product.price}
            </p>
            <p className="text-sm text-muted-foreground">za kompletną implementację</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="px-6 hover:bg-muted/80">
              Zamknij
            </Button>
            <Button className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
              Skontaktuj się z ekspertem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
