import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  const posts = {
    'empreendedorismo-futsal': {
      title: 'Equipe Capibots promove ação de empreendedorismo no Torneio de Futsal',
      date: '14/06/2025',
      author: 'Equipe Capibots',
      category: 'Empreendedorismo',
      readTime: '4 min',
      image: '🏆',
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

Estamos muito orgulhosos desta iniciativa que demonstra o espírito empreendedor e a determinação da equipe Capibots em buscar recursos próprios para participar do TBR 2025! 🤖🏆`
    },
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
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <Button asChild>
            <Link to="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Link>
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge>{post.category}</Badge>
              <span className="text-sm text-muted-foreground">{post.readTime} de leitura</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="h-64 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-8">
                  <span className="text-8xl">{post.image}</span>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  {post.content.split('\n').map((paragraph, index) => {
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
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4 mb-2">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    }
                    if (paragraph.startsWith('✅ ')) {
                      return (
                        <p key={index} className="mb-2 flex items-start">
                          <span className="mr-2">✅</span>
                          {paragraph.replace('✅ ', '')}
                        </p>
                      );
                    }
                    if (paragraph.trim()) {
                      return (
                        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Continue Lendo</h2>
            <Button asChild size="lg">
              <Link to="/blog">Ver Mais Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
