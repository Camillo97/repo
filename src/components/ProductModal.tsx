
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight } from "lucide-react";
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

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
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
