
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Coffee, Candy, Droplets } from 'lucide-react';

const CardapioFutsal = () => {
  const lanches = [
    { nome: 'Combo Salgadinhos', preco: 8.00, descricao: '5 unidades' },
    { nome: 'Cachorro Quente', preco: 8.00, descricao: 'Completo' }
  ];

  const sobremesas = [
    { nome: 'Balas Fini', preco: 8.00, descricao: 'Variadas' },
    { nome: 'Chocolate', preco: 0, descricao: 'Consultar valores' }
  ];

  const bebidas = [
    { nome: 'Água', preco: 3.00, descricao: 'Com ou sem gás' },
    { nome: 'Refrigerante', preco: 4.00, descricao: '200ml' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🏆 Cardápio Futsal</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Torneio de Futsal do Colégio Batista Mineiro - 14 de Junho de 2025
          </p>
          <Badge className="mt-4 bg-yellow-400 text-black text-lg px-4 py-2">
            Equipe Capibots - Empreendedorismo em Ação! 🤖
          </Badge>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Nossos Produtos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deliciosos lanches, bebidas e sobremesas para você se refrescar durante o torneio!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Lanches e Snacks */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center bg-primary/10">
                <Coffee className="h-12 w-12 mx-auto mb-2 text-primary" />
                <CardTitle className="text-primary">Lanches & Snacks</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {lanches.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-semibold">{item.nome}</h4>
                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary text-lg">
                        R$ {item.preco.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sobremesas */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center bg-secondary/10">
                <Candy className="h-12 w-12 mx-auto mb-2 text-secondary" />
                <CardTitle className="text-secondary">Sobremesas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {sobremesas.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-semibold">{item.nome}</h4>
                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-secondary text-lg">
                        {item.preco > 0 ? `R$ ${item.preco.toFixed(2)}` : 'Consultar'}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bebidas */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center bg-accent/10">
                <Droplets className="h-12 w-12 mx-auto mb-2 text-accent" />
                <CardTitle className="text-accent">Bebidas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {bebidas.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-semibold">{item.nome}</h4>
                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-accent text-lg">
                        R$ {item.preco.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-4 text-gradient">Informações Importantes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">📅 Data e Horário</h4>
                    <p className="text-muted-foreground">14 de Junho de 2025 - Manhã</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">📍 Local</h4>
                    <p className="text-muted-foreground">Colégio Batista Mineiro - Unidade Martins</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">🏆 Campeonato</h4>
                    <p className="text-muted-foreground">Disputa entre 4º e 5º anos</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">🎯 Objetivo</h4>
                    <p className="text-muted-foreground">Arrecadação para preparação TBR 2025</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <p className="text-center font-medium">
                    🤖 <strong>Toda a renda será destinada às ações de preparação da equipe Capibots para o TBR 2025!</strong>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Primeira fase interna: 28 de junho de 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CardapioFutsal;
