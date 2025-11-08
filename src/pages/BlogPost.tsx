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
    
    Todo valor arrecadado durante esta ação será destinado exclusivamente às ações de preparação da equipe Capibots para o TBR 2025 (Torneio Brasil de Robótica), que terá sua primeira fase interna acontecendo no dia 28 de junho.
    
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
          category: 'Ações Empreendedoras',
          readTime: '4 min',
          image: '🏆'
        },
        'divulgacao-batista-mineiro': {
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
        },
        'capibots-campea-torneio-interno-2025': 
        {
          "title": "Capibots é campeã do Torneio Interno do Colégio Batista Mineiro",
          "date": "2025-06-28",
          "author": "Equipe Capibots",
          "excerpt": "A equipe Capibots conquistou o título de campeã do Torneio Interno de Robótica do Colégio Batista Mineiro, etapa preparatória para o TBR 2025.",
          "content": "A equipe Capibots venceu o torneio interno realizado no Colégio Batista Mineiro, unidade Granja Marileusa, em Uberlândia. O evento, que contou com o apoio das famílias e professores, foi uma oportunidade de testar os conhecimentos adquiridos ao longo do semestre e fortalecer a integração entre as equipes. Além das provas de campo, os Capibots apresentaram seu projeto científico CerradoTech, recebendo elogios pela criatividade e impacto ambiental da proposta.",
          "category": "Competições",
          "readTime": "4 min",
          "image": "🏆"
        },
        'capibots-visita-nepsem-ufu': {
          "title": "Capibots apresenta CerradoTech ao Núcleo de Estudos e Pesquisa em Sementes da UFU",
          "date": "2025-04-05",
          "author": "Equipe Capibots",
          "excerpt": "A equipe apresentou o projeto CerradoTech a pesquisadores da UFU, discutindo a importância da regeneração do bioma e o papel da tecnologia.",
          "content": "Os integrantes da Capibots realizaram uma visita técnica ao Núcleo de Estudos e Pesquisa em Sementes (NEPSEM) da Universidade Federal de Uberlândia (UFU). Durante o encontro, os alunos apresentaram o CerradoTech — uma plataforma colaborativa voltada à regeneração inteligente do Cerrado — e conheceram o trabalho dos pesquisadores em coleta, armazenamento e germinação de sementes nativas. A atividade contribuiu para o aprimoramento científico do projeto e fortaleceu a integração entre educação básica e universidade.",
          "category": "Trabalhos de Campo",
          "readTime": "4 min",
          "image": "🌱"
        },
        'capibots-visita-peiropolis': {
          "title": "Capibots realiza visita técnica ao Museu de Peirópolis",
          "date": "2025-05-11",
          "author": "Equipe Capibots",
          "excerpt": "A visita ao Complexo Paleontológico de Peirópolis ampliou os conhecimentos científicos e ambientais dos integrantes da equipe.",
          "content": "A equipe Capibots realizou uma visita ao Museu dos Dinossauros e ao Centro de Pesquisas Paleontológicas Llewellyn Ivor Price, em Peirópolis (Uberaba-MG). A atividade integrou o plano de formação científica da equipe e permitiu aos alunos compreender a importância do patrimônio natural e da preservação ambiental. O grupo também fez conexões entre a história geológica da região e os ecossistemas atuais do Cerrado.",
          "category": "Educação Científica",
          "readTime": "3 min",
          "image": "🦖"
        },
        'capibots-participa-vi-simposio-biodiversidade': {
          "title": "Capibots participa do VI Simpósio de Conservação da Biodiversidade do Cerrado",
          "date": "2025-10-20",
          "author": "Equipe Capibots",
          "excerpt": "Projeto CerradoTech foi apresentado no VI Simpósio de Conservação da Biodiversidade do Cerrado, realizado na Universidade Federal de Uberlândia.",
          "content": "A equipe Capibots participou do VI Simpósio de Conservação da Biodiversidade do Cerrado, evento científico que reuniu pesquisadores, estudantes e organizações ambientais na UFU. O grupo apresentou o projeto CerradoTech na forma de banner, destacando sua contribuição para a regeneração inteligente do bioma e o uso da tecnologia como ferramenta de educação e engajamento. A participação marcou a integração entre ciência, tecnologia e conservação ambiental.",
          "category": "Divulgação Científica",
          "readTime": "4 min",
          "image": "🎓"
        },
        'capibots-divulga-parceria-soucerrado': {
          "title": "Capibots firma parceria com o perfil @soucerrado",
          "date": "2025-09-12",
          "author": "Equipe Capibots",
          "excerpt": "A equipe estabeleceu uma parceria de comunicação e divulgação com o projeto @soucerrado, ampliando o alcance do CerradoTech nas redes sociais.",
          "content": "Com o objetivo de ampliar o impacto de suas ações e difundir informações sobre o bioma Cerrado, a Capibots estabeleceu uma parceria com o perfil ambiental @soucerrado, reconhecido por promover a conscientização ecológica e valorizar a biodiversidade brasileira. A colaboração tem permitido a divulgação de conteúdos educativos, curiosidades sobre espécies nativas e atualizações sobre o desenvolvimento da plataforma CerradoTech.",
          "category": "Parcerias",
          "readTime": "3 min",
          "image": "🤝"
        },
        'capibots-acao-estande-paufurado': {
          "title": "Capibots participa de evento ambiental no Parque Pau Furado",
          "date": "2025-09-22",
          "author": "Equipe Capibots",
          "excerpt": "Equipe apresentou o projeto CerradoTech em estande interativo durante evento de educação ambiental no Parque Estadual do Pau Furado.",
          "content": "Durante o evento de educação ambiental promovido no Parque Estadual do Pau Furado, a equipe Capibots montou um estande interativo apresentando o CerradoTech. Os visitantes puderam conhecer as funcionalidades da plataforma, como o simulador de reflorestamento e o banco de sementes. Além disso, os alunos explicaram a importância da regeneração do Cerrado e promoveram atividades educativas para o público infantil e adulto.",
          "category": "Trabalhos de Campo",
          "readTime": "4 min",
          "image": "🌳"
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
