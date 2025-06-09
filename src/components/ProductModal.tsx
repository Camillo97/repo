
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight, Building2, Award, BarChart3 } from "lucide-react";
import { ReactFlow, Node, Edge, Background, Controls, Position } from '@xyflow/react';
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
    style: { background: '#e1f5fe', border: '2px solid #0288d1' }
  },
  {
    id: '2',
    data: { label: 'Weryfikacja danych' },
    position: { x: 250, y: 100 },
    style: { background: '#f3e5f5', border: '2px solid #7b1fa2' }
  },
  {
    id: '3',
    data: { label: 'Generowanie faktury' },
    position: { x: 100, y: 200 },
    style: { background: '#e8f5e8', border: '2px solid #388e3c' }
  },
  {
    id: '4',
    data: { label: 'Wysyłka do klienta' },
    position: { x: 400, y: 200 },
    style: { background: '#fff3e0', border: '2px solid #f57c00' }
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Proces zakończony' },
    position: { x: 250, y: 300 },
    style: { background: '#fce4ec', border: '2px solid #c2185b' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true }
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
      case "Łatwy": return "bg-green-100 text-green-800";
      case "Średni": return "bg-yellow-100 text-yellow-800";
      case "Zaawansowany": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          <DialogDescription className="text-base">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs Navigation */}
        <div className="flex gap-1 mt-6 p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex-1"
          >
            Przegląd rozwiązania
          </Button>
          <Button
            variant={activeTab === 'cases' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('cases')}
            className="flex-1"
          >
            Case Studies
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Lewa kolumna - Szczegóły */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{product.industry}</Badge>
                <Badge className={getDifficultyColor(product.difficulty)}>
                  {product.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock size={12} />
                  {product.timeToImplement}
                </Badge>
              </div>

              <img
                src={`https://images.unsplash.com/${product.image}?w=500&h=250&fit=crop`}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    Korzyści dla Twojego biznesu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ArrowRight size={16} className="text-primary" />
                        {benefit}
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <ArrowRight size={16} className="text-primary" />
                      Automatyczne raportowanie
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight size={16} className="text-primary" />
                      Integracja z istniejącymi systemami
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Users className="text-blue-600" size={24} />
                      <div>
                        <p className="font-semibold">Zespół</p>
                        <p className="text-sm text-muted-foreground">2-3 specjalistów</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-green-600" size={24} />
                      <div>
                        <p className="font-semibold">ROI</p>
                        <p className="text-sm text-muted-foreground">6-12 miesięcy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Prawa kolumna - Flowchart */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Jak działa automatyzacja?</CardTitle>
                  <CardDescription>
                    Schemat procesu automatyzacji dla tego rozwiązania
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 border rounded-lg">
                    <ReactFlow
                      nodes={initialNodes}
                      edges={initialEdges}
                      fitView
                      attributionPosition="bottom-left"
                      style={{ background: '#f8fafc' }}
                    >
                      <Background />
                      <Controls />
                    </ReactFlow>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Co obejmuje implementacja?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold">Analiza procesów</p>
                        <p className="text-sm text-muted-foreground">Szczegółowe mapowanie obecnych procesów</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold">Konfiguracja systemu</p>
                        <p className="text-sm text-muted-foreground">Dostosowanie do specyfiki firmy</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold">Szkolenie zespołu</p>
                        <p className="text-sm text-muted-foreground">Kompleksowe przeszkolenie użytkowników</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold">Wsparcie techniczne</p>
                        <p className="text-sm text-muted-foreground">3 miesiące bezpłatnego wsparcia</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="mt-6 space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Nasze sukcesy w liczbach</h3>
              <p className="text-muted-foreground">
                Zobacz jak nasze rozwiązania pomogły realnym firmom osiągnąć wymieralne rezultaty
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {caseStudies.map((study, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="text-primary" size={20} />
                      <CardTitle className="text-lg">{study.company}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {study.industry}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-1">Wyzwanie:</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-1">Rozwiązanie:</h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Rezultaty:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Award size={14} className="text-green-600" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock size={16} className="text-blue-600" />
                          <span className="font-semibold text-blue-600">Czas wdrożenia</span>
                        </div>
                        <p className="text-sm font-bold">{study.timeframe}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <BarChart3 size={16} className="text-green-600" />
                          <span className="font-semibold text-green-600">ROI</span>
                        </div>
                        <p className="text-sm font-bold">{study.roi}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Gotowy na podobne rezultaty?</h4>
                  <p className="text-muted-foreground mb-4">
                    Sprawdź jak nasze rozwiązanie może zwiększyć efektywność Twojej firmy
                  </p>
                  <Button size="lg">
                    Umów bezpłatną konsultację
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer z ceną i przyciskami */}
        <div className="flex items-center justify-between pt-6 border-t mt-6">
          <div>
            <p className="text-2xl font-bold text-primary">{product.price}</p>
            <p className="text-sm text-muted-foreground">za kompletną implementację</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Zamknij
            </Button>
            <Button className="px-8">
              Skontaktuj się z ekspertem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
