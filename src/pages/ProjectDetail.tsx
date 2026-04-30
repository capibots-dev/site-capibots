
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Target, Cpu, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '@/data/projects.json';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.id === slug);

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
                <img src={project.image} alt={project.title} className="h-16 w-auto object-contain" />
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
                    {project.teamMembers.map((member) => (
                      <div key={member} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {member.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm">{member}</span>
                      </div>
                    ))}
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
