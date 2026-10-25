
import { useParams } from 'react-router-dom';
import CapiAprendeBeta from '@/components/CapiAprendeBeta';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Target, Cpu, ArrowLeft, ExternalLink, Check, FlaskConical, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import projectsData from '@/data/projects.json';
import sponsorsData from '@/data/sponsors.json';
import teamData from '@/data/team.json';
import blogData from '@/data/blog.json';
import { DIARIO_CATEGORY, SEASON_NEWS_CATEGORIES, SEASON_SECTION_CATEGORIES, categoriaEstilo } from '@/lib/blog';

type Tier = 'ouro' | 'prata' | 'bronze';

const tierOrder: Tier[] = ['ouro', 'prata', 'bronze'];
const tierInfo: Record<Tier, { label: string; badge: string; className: string }> = {
  ouro: { label: 'Ouro', badge: '🥇', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  prata: { label: 'Prata', badge: '🥈', className: 'bg-slate-100 text-slate-700 border-slate-300' },
  bronze: { label: 'Bronze', badge: '🥉', className: 'bg-orange-100 text-orange-700 border-orange-300' },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.id === slug);

  const projectSponsors = project
    ? (sponsorsData as { id: string; nome: string; imagem: string; link: string | null; edicoes: { ano: number; tipo: Tier }[] }[])
        .flatMap((sp) => {
          const edicao = sp.edicoes.find((e) => e.ano === project.season);
          return edicao ? [{ ...sp, tipo: edicao.tipo }] : [];
        })
        .sort((a, b) => tierOrder.indexOf(a.tipo) - tierOrder.indexOf(b.tipo))
    : [];

  const today = new Date().toISOString().slice(0, 10);
  const diaryPosts = project
    ? blogData
        .filter((p) => p.category === DIARIO_CATEGORY && p.date <= today && p.season === project.season)
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];

  const seasonNews = project
    ? blogData
        .filter((p) => p.season === project.season && p.date <= today && SEASON_NEWS_CATEGORIES.includes(p.category))
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];
  const newsSections = [
    ...SEASON_SECTION_CATEGORIES.map((category) => ({
      title: category,
      style: categoriaEstilo[category],
      mixed: false,
      posts: seasonNews.filter((p) => p.category === category),
    })),
    {
      title: 'Notícias',
      style: categoriaEstilo['Divulgação'],
      mixed: true,
      posts: seasonNews.filter((p) => !SEASON_SECTION_CATEGORIES.includes(p.category)),
    },
  ].filter((section) => section.posts.length > 0);

  type Research = {
    title: string;
    intro: string;
    stats: { value: string; label: string }[];
    stages: { title: string; summary: string; status: 'concluida' | 'andamento'; posts: string[] }[];
  };
  const research = (project as { research?: Research } | undefined)?.research;
  const researchStages = research
    ? research.stages.map((stage) => ({
        ...stage,
        posts: stage.posts.flatMap((id) => {
          const post = blogData.find((p) => p.id === id && p.date <= today);
          return post ? [post] : [];
        }),
      }))
    : [];

  const notebooks = (project as { notebooks?: { title: string; description: string; link: string; linkLabel: string } } | undefined)?.notebooks;
  const tools = (project as { tools?: { name: string; description: string; image: string; link: string; linkLabel: string }[] } | undefined)?.tools ?? [];

  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-8">O projeto que você está procurando não existe.</p>
          <Button asChild>
            <Link to="/projetos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em desenvolvimento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Concluído':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Planejamento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 md:py-14 gradient-orange-green text-white">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="mb-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <Link to="/projetos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-5">
              {project.image.startsWith('/') ? (
                <img src={project.image} alt={project.title} className="h-16 w-auto object-contain rounded-xl shadow-md" />
              ) : (
                <span className="text-5xl">{project.image}</span>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">{project.title}</h1>
                <p className="text-lg text-white/80">{project.subtitle}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Badge className={`${getStatusColor(project.status)} border`}>
                {project.status}
              </Badge>
              <Badge variant="outline" className="border-white text-white">
                {project.category}
              </Badge>
              <div className="flex items-center text-white/80">
                <Calendar className="h-4 w-4 mr-2" />
                {project.startDate} - {project.expectedCompletion}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">Descrição do Projeto</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>

              {/* Cadernos técnicos da temporada */}
              {notebooks && (
                <Card>
                  <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <BookOpen className="h-8 w-8 text-primary shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-1">{notebooks.title}</h2>
                      <p className="text-sm text-muted-foreground">{notebooks.description}</p>
                    </div>
                    <Button asChild className="gradient-orange-green text-white border-0">
                      <Link to={notebooks.link}>{notebooks.linkLabel}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Pesquisa: resultados parciais */}
              {research && (
                <Card className="border-primary/40 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${categoriaEstilo['Mérito Científico'].color} flex items-center justify-center`}>
                        <FlaskConical className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gradient">{research.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5">{research.intro}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {research.stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border bg-muted/40 p-4 text-center">
                          <p className="text-3xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <ol className="space-y-5">
                      {researchStages.map((stage, index) => (
                        <li key={stage.title} className="flex gap-4">
                          <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${stage.status === 'concluida' ? 'bg-primary text-white' : 'border-2 border-primary text-primary'}`}>
                            {stage.status === 'concluida' ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold">{index + 1}. {stage.title}</h3>
                              <Badge variant="outline" className="text-[10px]">
                                {stage.status === 'concluida' ? 'Concluída' : 'Em andamento'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{stage.summary}</p>
                            {stage.posts.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {stage.posts.map((post) => (
                                  <li key={post.id}>
                                    <Link to={`/blog/${post.id}`} className="text-sm text-primary hover:underline">
                                      {post.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}

              {/* Objectives */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">Objetivos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.goals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Challenges and Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-destructive">Desafios</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-secondary">Soluções</h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Tools created in the season */}
              {tools.length > 0 && (
                <Card className="border-primary/40 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-1 text-gradient">Ferramentas criadas na temporada</h2>
                    <p className="text-sm text-muted-foreground mb-5">Experimente o que os Capibots desenvolveram em {project.season}.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tools.map((tool) => (
                        <div key={tool.name} className="rounded-lg border overflow-hidden flex flex-col bg-card">
                          <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-64 bg-muted">
                            <img src={tool.image} alt={`Tela de ${tool.name}`} className="max-h-64 max-w-full w-auto object-contain" />
                          </a>
                          <div className="p-4 flex flex-col flex-1 gap-3">
                            <h3 className="text-lg font-bold">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground flex-1">{tool.description}</p>
                            <Button asChild className="gradient-orange-green text-white border-0">
                              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                                {tool.linkLabel}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Technologies */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">Tecnologias e Ferramentas</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.technologies.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-primary" />
                        <span className="text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Diário de Bordo */}
              {diaryPosts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-gradient">Diário de Bordo dos Treinos</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      O registro de cada encontro de treino da temporada, do mais recente ao mais antigo. Clique para ler.
                    </p>
                    <Accordion type="multiple">
                      {diaryPosts.map((post) => (
                        <AccordionItem key={post.id} value={post.id}>
                          <AccordionTrigger className="group gap-4 text-left hover:no-underline">
                            <span className="flex w-32 shrink-0 items-center gap-2 text-sm font-normal text-muted-foreground whitespace-nowrap">
                              <Calendar className="h-4 w-4 text-primary" />
                              {post.date.split('-').reverse().join('/')}
                            </span>
                            <span className="flex-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-primary">
                              {post.title.replace(/^Treino de \d{2}\/\d{2}: /, '').replace(/^./, (c) => c.toUpperCase())}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              {post.content.split('\n').filter(Boolean).map((line, i) => (
                                <p key={i}>
                                  {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
                                    j % 2 === 1 ? <strong key={j} className="font-semibold text-foreground">{part}</strong> : part
                                  )}
                                </p>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}

              {/* Sponsors */}
              {projectSponsors.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gradient">Patrocinadores</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {projectSponsors.map((sp) => {
                        const tier = tierInfo[sp.tipo];
                        const logo = (
                          <img src={sp.imagem} alt={sp.nome} className="w-full h-full object-contain p-1" />
                        );
                        return (
                          <div key={sp.id} className="flex flex-col items-center text-center gap-2">
                            <div className="w-full max-w-[88px] aspect-square rounded-xl overflow-hidden bg-white border border-border shadow-sm">
                              {sp.link ? (
                                <a href={sp.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                  {logo}
                                </a>
                              ) : (
                                logo
                              )}
                            </div>
                            <p className="text-[11px] font-medium leading-tight">{sp.nome}</p>
                            <Badge variant="outline" className={tier.className}>
                              {tier.badge} {tier.label}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {project.id === 'tbr-2026' && <CapiAprendeBeta />}

              {/* Logo da temporada */}
              {project.image.startsWith('/') && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-md"
                />
              )}

              {/* Progress */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Progresso do Projeto</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Desenvolvimento</span>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fase atual: Desenvolvimento e testes dos sensores
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Equipe do Projeto
                  </h3>
                  <div className="space-y-2">
                    {project.teamMembers.map((member) => {
                      const kid = teamData.find((t) => t.name === member);
                      const content = (
                        <>
                          {kid ? (
                            <img
                              src={kid.image}
                              alt={kid.name}
                              className="w-8 h-8 rounded-full object-cover bg-muted"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {member.charAt(0)}
                              </span>
                            </div>
                          )}
                          <span className="text-sm">{member}</span>
                        </>
                      );
                      return kid ? (
                        <Link
                          key={member}
                          to={`/equipe/${kid.slug}`}
                          className="flex items-center space-x-2 hover:text-primary transition-colors"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div key={member} className="flex items-center space-x-2">
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {project.timeline.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-primary' : 'bg-muted border-2 border-primary'}`}></div>
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notícias da temporada, por categoria */}
              {newsSections.map((section) => {
                const SectionIcon = section.style.icon;
                return (
                  <Card key={section.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${section.style.color} flex items-center justify-center`}>
                          <SectionIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-bold flex-1">{section.title}</h3>
                        <Badge variant="outline" className="text-[10px]">{section.posts.length}</Badge>
                      </div>
                      <ul className="max-h-96 overflow-y-auto divide-y pr-1">
                        {section.posts.map((post) => {
                          const PostIcon = categoriaEstilo[post.category].icon;
                          return (
                            <li key={post.id}>
                              <Link to={`/blog/${post.id}`} className="group block py-3">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  {section.mixed ? (
                                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                                      <span className={`h-5 w-5 rounded-md bg-gradient-to-br ${categoriaEstilo[post.category].color} flex items-center justify-center`}>
                                        <PostIcon className="h-3 w-3 text-white" />
                                      </span>
                                      {post.category}
                                    </span>
                                  ) : <span />}
                                  <span className="text-xs text-muted-foreground">
                                    {post.date.split('-').reverse().join('/')}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 transition-colors group-hover:text-primary">
                                  {post.title}
                                </p>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
