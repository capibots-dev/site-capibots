
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  const posts = {
    'caminhada-ecologica': {
      id: 'caminhada-ecologica',
      title: 'Equipe Capibots participa de Caminhada Ecológica na Semana de Meio Ambiente',
      date: '07/06/2025',
      author: 'Equipe Capibots',
      content: `Os integrantes Arthur, Augusto, Lucca e Nicolas da equipe Capibots participaram de uma emocionante Caminhada Ecológica durante a Semana de Meio Ambiente. O evento foi promovido pelo Praia Clube de Uberlândia e foi muito bem organizado e instrutivo para as crianças.

Durante a atividade, nossos jovens robóticos tiveram oportunidades únicas de aprendizado:

## 🌱 Plantio de Mudas
Cada participante teve a chance de plantar uma muda de Aroeirinha, contribuindo diretamente para o reflorestamento e aprendendo sobre a importância das árvores nativas do cerrado.

## 🦎 Fauna do Cerrado
Conheceram diversos animais típicos do cerrado que vivem na região, entendendo melhor o ecossistema local e a importância da conservação da biodiversidade.

## 🌿 Flora Regional
Descobriram espécies novas de plantas, ampliando seus conhecimentos sobre a biodiversidade de nossa região e as características únicas do bioma cerrado.

## ♻️ Sustentabilidade
Aprenderam sobre processos fundamentais como descarte correto, reciclagem e compostagem de resíduos, conhecimentos que se alinham perfeitamente com nossos valores de responsabilidade ambiental.

## Reflexões da Equipe

Esta experiência foi muito enriquecedora para nossa equipe, reforçando nosso compromisso não apenas com a tecnologia, mas também com a sustentabilidade e preservação do meio ambiente. 

Como uma equipe de robótica, entendemos a importância de desenvolver soluções tecnológicas que sejam ambientalmente responsáveis. A caminhada ecológica nos mostrou na prática como pequenas ações podem ter um grande impacto positivo no meio ambiente.

## Próximos Passos

Inspirados por esta experiência, estamos planejando incorporar mais elementos de sustentabilidade em nossos projetos futuros. Queremos desenvolver robôs que não apenas demonstrem nossas habilidades técnicas, mas que também contribuam para a preservação ambiental.

Agradecemos ao Praia Clube de Uberlândia pela organização exemplar deste evento educativo!`,
      category: 'Eventos',
      readTime: '3 min',
      image: '🌱',
      participants: ['Arthur', 'Augusto', 'Lucca', 'Nicolas']
    },
    'divulgacao-batista-mineiro': {
      id: 'divulgacao-batista-mineiro',
      title: 'Equipe Capibots promove ação de divulgação no Colégio Batista Mineiro',
      date: '06/06/2025',
      author: 'Equipe Capibots',
      content: `A equipe Capibots realizou uma ação especial de divulgação no Colégio Batista Mineiro que foi um verdadeiro sucesso! Esta iniciativa marcou um momento importante em nossa estratégia de crescimento e engajamento com a comunidade.

## A Estratégia

Nossa abordagem foi simples, mas efetiva:

**📅 Quando**: Durante o horário de início das aulas do período da tarde
**👥 Participação**: Todas as crianças da equipe estiveram presentes
**🍭 Estratégia**: Distribuição de pirulitos para alunos e pais
**📱 Objetivo**: Convidar pessoas a seguir nosso Instagram @equipecapibots

## Resultados Incríveis!

Nossa estratégia de divulgação teve resultados que superaram nossas expectativas:

### ✅ Meta Alcançada
Ultrapassamos a marca de 300 seguidores no Instagram! Este marco representa muito mais do que números - representa uma comunidade crescente de pessoas interessadas em robótica educacional.

### 🎯 Próximo Objetivo
Estamos a caminho dos 400 seguidores! Cada novo seguidor nos motiva a continuar compartilhando nossa jornada e inspirando outros jovens.

### 🤝 Engajamento
Notamos um aumento significativo na interação com nossa comunidade escolar, com mais comentários, curtidas e compartilhamentos.

### 🌟 Visibilidade
Houve um crescimento notável da consciência sobre nosso trabalho em robótica dentro da comunidade escolar.

## A Importância da Comunidade

Esta ação demonstra como o apoio da comunidade é fundamental para o crescimento da nossa equipe. Cada novo seguidor representa:

- Uma pessoa interessada em robótica educacional
- Potencial apoio para nossos projetos futuros  
- Ampliação da rede de pessoas que valorizam STEM
- Oportunidade de inspirar outros jovens a se interessarem por tecnologia

## Lições Aprendidas

### Simplicidade Funciona
Às vezes, as estratégias mais simples são as mais efetivas. A distribuição de pirulitos criou um momento de conexão genuína com as pessoas.

### Presença da Equipe
Ter toda a equipe presente foi fundamental. Isso mostrou nosso comprometimento e permitiu que as pessoas conhecessem todos os integrantes.

### Timing Perfeito
Escolher o horário de entrada das aulas garantiu que alcançássemos tanto alunos quanto pais, maximizando nosso alcance.

## Próximas Ações

Motivados pelo sucesso desta iniciativa, já estamos planejando:

1. **Apresentações em outras escolas** da região
2. **Participação em eventos** da comunidade
3. **Criação de conteúdo** mais engajador para redes sociais
4. **Parcerias estratégicas** com instituições locais

## Agradecimentos

Agradecemos a todos que nos seguiram e continuam acompanhando nossa jornada. Juntos, estamos construindo uma comunidade que valoriza a ciência, tecnologia e inovação!

**Siga nosso Instagram @equipecapibots e acompanhe todas as novidades dos nossos projetos de robótica! 🤖✨**`,
      category: 'Divulgação',
      readTime: '2 min',
      image: '📱',
      participants: ['Toda a equipe']
    }
  };

  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-8">O artigo que você está procurando não existe.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gradient">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="mb-8 border-white text-white hover:bg-white hover:text-primary">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{post.image}</span>
              <div className="flex-1">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center text-white/80">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime} de leitura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                {formatContent(post.content)}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2">Gostou do artigo?</h3>
                    <p className="text-sm text-muted-foreground">
                      Compartilhe com seus amigos!
                    </p>
                  </div>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Article Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Sobre este artigo</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Categoria:</span>
                      <Badge variant="secondary" className="ml-2">
                        {post.category}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Data:</span>
                      <span className="ml-2 text-muted-foreground">{post.date}</span>
                    </div>
                    <div>
                      <span className="font-medium">Tempo de leitura:</span>
                      <span className="ml-2 text-muted-foreground">{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              {post.participants && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Participantes</h3>
                    <div className="space-y-2">
                      {post.participants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {participant.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm">{participant}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Outros artigos</h3>
                  <div className="space-y-4">
                    {Object.values(posts)
                      .filter(p => p.id !== post.id)
                      .map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <div className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {relatedPost.date}
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="gradient-orange-green text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Siga a Capibots</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Acompanhe todas as nossas aventuras!
                  </p>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                      Seguir Instagram
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
