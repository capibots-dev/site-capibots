
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 'empreendedorismo-futsal',
      title: 'Equipe Capibots promove ação de empreendedorismo no Torneio de Futsal',
      date: '14/06/2025',
      author: 'Equipe Capibots',
      excerpt: 'Durante o campeonato de futsal do Colégio Batista Mineiro, nossa equipe organizou uma ação de vendas para arrecadar fundos para o TBR 2025.',
      content: `A equipe Capibots realizou uma importante ação de empreendedorismo durante o Torneio de Futsal do Colégio Batista Mineiro, Unidade Martins, que aconteceu na manhã do dia 14 de junho de 2025.

## Uma Oportunidade de Empreendedorismo

O campeonato, que foi uma disputa entre as crianças do 4º e 5º ano do Colégio Batista Mineiro, se tornou uma excelente oportunidade para nossa equipe colocar em prática conceitos de empreendedorismo e gestão de negócios.

## Produtos Oferecidos

Nossa equipe foi a única autorizada a vender produtos durante o evento, oferecendo uma variedade de itens:

### 🍴 Lanches e Snacks
- Combo Salgadinhos (5 unidades) - R$ 8,00
- Cachorro Quente completo - R$ 8,00

### 🍭 Sobremesas
- Balas Fini variadas - R$ 8,00
- Chocolates diversos

### 🥤 Bebidas
- Água (com ou sem gás) - R$ 3,00
- Refrigerante 200ml - R$ 4,00

## Objetivo da Ação

Todo valor arrecadado durante esta ação será destinado exclusivamente às ações de preparação da equipe Capibots para o TBR 2025 (Torneio Brasileiro de Robótica), que terá sua primeira fase interna acontecendo no dia 28 de junho.

## Aprendizados Importantes

Esta experiência proporcionou aos integrantes da equipe:

✅ **Gestão de Estoque**: Controle de produtos e quantidades
✅ **Atendimento ao Cliente**: Relacionamento com compradores
✅ **Gestão Financeira**: Controle de vendas e troco
✅ **Trabalho em Equipe**: Coordenação entre todos os membros
✅ **Responsabilidade**: Cumprimento de horários e compromissos

## Conexão com a Robótica

Esta ação de empreendedorismo demonstra que os valores da robótica educacional vão além da programação e construção de robôs. Incluem também:

- **Inovação**: Encontrar soluções criativas para arrecadar fundos
- **Planejamento**: Organizar toda a logística da venda
- **Sustentabilidade**: Garantir recursos para projetos futuros
- **Responsabilidade Social**: Contribuir com a comunidade escolar

Estamos muito orgulhosos desta iniciativa que demonstra o espírito empreendedor e a determinação da equipe Capibots em buscar recursos próprios para participar do TBR 2025! 🤖🏆`,
      category: 'Empreendedorismo',
      readTime: '4 min',
      image: '🏆'
    },
    {
      id: 'divulgacao-batista-mineiro',
      title: 'Equipe Capibots promove ação de divulgação no Colégio Batista Mineiro',
      date: '06/06/2025',
      author: 'Equipe Capibots',
      excerpt: 'Ação de divulgação no período da tarde resultou em crescimento significativo de seguidores e maior visibilidade da equipe.',
      content: `A equipe Capibots realizou uma ação especial de divulgação no Colégio Batista Mineiro que foi um verdadeiro sucesso!

📅 **Quando**: Durante o horário de início das aulas do período da tarde
👥 **Participação**: Todas as crianças da equipe estiveram presentes
🍭 **Estratégia**: Distribuição de pirulitos para alunos e pais
📱 **Objetivo**: Convidar pessoas a seguir nosso Instagram @equipecapibots

## Resultados Incríveis!

Nossa estratégia de divulgação teve resultados que superaram nossas expectativas:

✅ **Meta Alcançada**: Ultrapassamos a marca de 300 seguidores no Instagram
🎯 **Próximo Objetivo**: Estamos a caminho dos 400 seguidores!
🤝 **Engajamento**: Maior interação com a comunidade escolar
🌟 **Visibilidade**: Crescimento da consciência sobre nosso trabalho em robótica

## A Importância da Comunidade

Esta ação demonstra como o apoio da comunidade é fundamental para o crescimento da nossa equipe. Cada novo seguidor representa:

- Uma pessoa interessada em robótica educacional
- Potencial apoio para nossos projetos futuros
- Ampliação da rede de pessoas que valorizam STEM
- Oportunidade de inspirar outros jovens

Agradecemos a todos que nos seguiram e continuam acompanhando nossa jornada. Juntos, estamos construindo uma comunidade que valoriza a ciência, tecnologia e inovação!

Siga nosso Instagram @equipecapibots e acompanhe todas as novidades dos nossos projetos de robótica! 🤖✨`,
      category: 'Divulgação',
      readTime: '2 min',
      image: '📱'
    }
  ];

  const categories = ['Todos', 'Eventos', 'Divulgação', 'Projetos', 'Competições'];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog & Notícias</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Acompanhe nossas últimas atividades, conquistas, aprendizados e 
            todas as novidades da equipe Capibots.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Todos' ? 'default' : 'outline'}
                size="sm"
                className={category === 'Todos' ? 'bg-primary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
                    <span className="text-6xl">{post.image}</span>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <span>{post.readTime} de leitura</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Button asChild className="w-full group">
                      <Link to={`/blog/${post.id}`}>
                        Ler Artigo Completo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" disabled>
              Carregando mais posts...
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Fique por Dentro</h2>
            <p className="text-muted-foreground mb-8">
              Não perca nenhuma novidade da equipe Capibots! Siga nosso Instagram 
              para acompanhar todos os nossos projetos e conquistas.
            </p>
            <Button asChild size="lg">
              <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                Seguir no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
