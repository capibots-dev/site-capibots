
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
      id: 'caminhada-ecologica',
      title: 'Equipe Capibots participa de Caminhada Ecológica na Semana de Meio Ambiente',
      date: '07/06/2025',
      author: 'Equipe Capibots',
      excerpt: 'Integrantes da equipe participaram de evento educativo promovido pelo Praia Clube de Uberlândia, aprendendo sobre sustentabilidade e meio ambiente.',
      content: `Os integrantes Arthur, Augusto, Lucca e Nicolas da equipe Capibots participaram de uma emocionante Caminhada Ecológica durante a Semana de Meio Ambiente. O evento foi promovido pelo Praia Clube de Uberlândia e foi muito bem organizado e instrutivo para as crianças.

Durante a atividade, nossos jovens robóticos tiveram oportunidades únicas de aprendizado:

🌱 **Plantio de Mudas**: Cada participante teve a chance de plantar uma muda de Aroeirinha, contribuindo diretamente para o reflorestamento e aprendendo sobre a importância das árvores nativas.

🦎 **Fauna do Cerrado**: Conheceram diversos animais típicos do cerrado que vivem na região, entendendo melhor o ecossistema local e a importância da conservação.

🌿 **Flora Regional**: Descobriram espécies novas de plantas, ampliando seus conhecimentos sobre a biodiversidade de nossa região.

♻️ **Sustentabilidade**: Aprenderam sobre processos fundamentais como descarte correto, reciclagem e compostagem de resíduos, conhecimentos que se alinham perfeitamente com nossos valores de responsabilidade ambiental.

Esta experiência foi muito enriquecedora para nossa equipe, reforçando nosso compromisso não apenas com a tecnologia, mas também com a sustentabilidade e preservação do meio ambiente. Como uma equipe de robótica, entendemos a importância de desenvolver soluções tecnológicas que sejam ambientalmente responsáveis.`,
      category: 'Eventos',
      readTime: '3 min',
      image: '🌱'
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
