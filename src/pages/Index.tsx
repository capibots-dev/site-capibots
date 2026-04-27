import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TeamMemberCard from '@/components/TeamMemberCard';
import PartnersCarousel from '@/components/PartnersCarousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowDown, Users, Instagram } from 'lucide-react';
import teamData from '@/data/team.json';
import projectsData from '@/data/projects.json';
import blogData from '@/data/blog.json';

const Index = () => {
  const teamMembers = teamData;
  const projects = projectsData;
  const recentNews = [...blogData].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 gradient-orange-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Unidos como capivaras, <br />
              <span className="text-yellow-300">espertos como robôs!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Somos a equipe Capibots, jovens inovadores de 9 e 10 anos apaixonados por robótica,
              tecnologia e trabalho em equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/projetos">Conheça Nossos Projetos</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/sobre">Sobre a Equipe</Link>
              </Button>
            </div>
          </div>
          <div className="text-center mt-12 animate-bounce-gentle">
            <ArrowDown className="h-8 w-8 mx-auto text-white/70" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Nossa Equipe</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça os 9 integrantes talentosos que formam a equipe Capibots,
              cada um contribuindo com suas habilidades únicas para nossos projetos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/sobre">
                <Users className="mr-2 h-4 w-4" />
                Conheça Mais Sobre Nós
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Projetos em Destaque</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Acompanhe nossos projetos atuais e descubra como estamos inovando na robótica educacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-40 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white text-6xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{project.status}</span>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/projetos/${project.id}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Últimas Notícias</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fique por dentro das nossas últimas atividades, conquistas e participações em eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {recentNews.map((news) => (
              <Card key={news.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary font-medium">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{news.excerpt}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/blog/${news.id}`}>Ler Mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/blog">Ver Todas as Notícias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <PartnersCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Junte-se à Nossa Jornada</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Acompanhe nossos projetos, conquistas e aventuras no mundo da robótica.
            Conecte-se conosco nas redes sociais!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contato">Entre em Contato</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                Siga no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  </>
  );
};

export default Index;
