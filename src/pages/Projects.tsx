
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Code, Cpu, Wrench } from 'lucide-react';
import projectsData from '@/data/projects.json';

const Projects = () => {
  const CURRENT_SEASON = 2026;
  const currentProjects = projectsData.filter((p) => p.season === CURRENT_SEASON);
  const pastProjects = projectsData
    .filter((p) => p.season < CURRENT_SEASON)
    .sort((a, b) => b.season - a.season);

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
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossos Projetos</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90">
            Explore nossos projetos de robótica, desde plataformas de competição até 
            soluções inovadoras que combinam tecnologia e criatividade.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 max-w-6xl mx-auto items-start">
            {/* Current season */}
            <div>
              <div className="grid grid-cols-1 gap-8">
              {currentProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Project Header */}
                    <div className="h-48 p-4 bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
                      {project.image.startsWith('/') ? (
                        <img src={project.image} alt={project.title} className="h-full w-auto max-w-full object-contain rounded-2xl shadow-md" />
                      ) : (
                        <span className="text-8xl">{project.image}</span>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getStatusColor(project.status)} border`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.period}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <h4 className="text-lg text-muted-foreground mb-4">{project.subtitle}</h4>
                    
                      <p className="text-muted-foreground mb-6">{project.summary}</p>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progresso</span>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-3">Tecnologias Utilizadas</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <Link to={`/projetos/${project.id}`}>
                          Ver Detalhes do Projeto
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>

            {/* Past seasons */}
            {pastProjects.length > 0 && (
              <aside>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Temporadas Anteriores</h2>
                  <p className="text-sm text-muted-foreground">
                    Histórico dos projetos que já desenvolvemos.
                  </p>
                </div>
                <div className="space-y-3">
                  {pastProjects.map((project) => (
                      <Link
                        key={project.id}
                        to={`/projetos/${project.id}`}
                        className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-muted/40"
                      >
                        <div className="h-14 w-14 shrink-0 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                          {project.image.startsWith('/') ? (
                            <img src={project.image} alt={project.title} className="h-10 w-10 object-contain rounded-md" />
                          ) : (
                            <span className="text-3xl">{project.image}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                            <Badge variant="outline" className="text-xs">{project.category}</Badge>
                            <Badge className={`${getStatusColor(project.status)} border text-xs`}>{project.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
                          <div className="mt-1 flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {project.period}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
                      </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Approach + Next steps */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
            <div className="flex flex-col">
              <div className="text-center mb-8 lg:min-h-[10.5rem]">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Nossa Abordagem</h2>
                <p className="text-base text-muted-foreground">
                  Na equipe Capibots, cada projeto é uma jornada de descoberta e inovação. 
                  Combinamos criatividade, conhecimento técnico e trabalho em equipe para 
                  desenvolver soluções robóticas que não apenas demonstram nossas habilidades, 
                  mas também contribuem para nosso aprendizado e crescimento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 auto-rows-fr">
                <Card className="text-center h-full">
                  <CardContent className="p-4">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Programação</h3>
                    <p className="text-sm text-muted-foreground">
                      Desenvolvimento de algoritmos inteligentes e eficientes
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center h-full">
                  <CardContent className="p-4">
                    <div className="mx-auto w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                      <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Engenharia</h3>
                    <p className="text-sm text-muted-foreground">
                      Design e construção de estruturas robóticas robustas
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center h-full">
                  <CardContent className="p-4">
                    <div className="mx-auto w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Inovação</h3>
                    <p className="text-sm text-muted-foreground">
                      Soluções criativas para desafios complexos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-center mb-8 lg:min-h-[10.5rem]">
                <h2 className="text-3xl font-bold mb-4 text-gradient">Próximos Passos</h2>
                <p className="text-base text-muted-foreground">
                  Estamos sempre pensando no futuro! Aqui estão algumas das ideias e 
                  projetos que discutimos e que talvez possamos desenvolver futuramente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 auto-rows-fr">
                <Card className="text-center group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="font-semibold mb-2">Robô Ecológico</h3>
                    <p className="text-sm text-muted-foreground">
                      Desenvolvimento de um robô para monitoramento ambiental e plantio automatizado
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-4">🌎</div>
                    <h3 className="font-semibold mb-2">Rede de Protetores</h3>
                    <p className="text-sm text-muted-foreground">
                      Difundir a relevândia dos ODS (Objetivos de Desenvolvimento Sustentável) para o futuro da humanidade.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-4">🎮</div>
                    <h3 className="font-semibold mb-2">Jogos Educativos</h3>
                    <p className="text-sm text-muted-foreground">
                      Desenvolvimento de jogos interativos para ensinar programação.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
