import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartnersCarousel from '@/components/PartnersCarousel';
import {
  ArrowRight,
  Trophy,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import projectsData from '@/data/projects.json';
import achievementsData from '@/data/achievements.json';
import blogData from '@/data/blog.json';

const Index = () => {
  const activeProject =
    projectsData.find((p) => p.status === 'Em desenvolvimento') ?? projectsData[0];

  const today = new Date().toISOString().slice(0, 10);
  const latestPosts = [...blogData]
    .filter((p) => p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-28 gradient-orange-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
              🤖 Temporada TBR 2026 em andamento
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Unidos como capivaras,
              <br />
              <span className="text-yellow-300">espertos como robôs!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
              Jovens inovadores de 9 e 10 anos de Uberlândia, apaixonados por
              robótica, tecnologia e trabalho em equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-base px-8"
              >
                <Link to="/projetos">Ver Nossos Projetos</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary text-base px-8"
              >
                <Link to="/sobre">Conhecer a Equipe</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projeto em andamento ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-primary border-primary mb-3">
              Projeto em andamento
            </Badge>
            <h2 className="text-4xl font-bold text-gradient">{activeProject.title}</h2>
            <p className="text-muted-foreground mt-2 text-lg">{activeProject.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            {/* Info + progresso */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                {activeProject.image.startsWith('/') ? (
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <span className="text-5xl">{activeProject.image}</span>
                )}
                <div>
                  <div className="flex gap-2 flex-wrap mb-1">
                    <Badge className="bg-primary/10 text-primary border-0">
                      {activeProject.category}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      {activeProject.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activeProject.period}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {activeProject.description.slice(0, 280)}…
              </p>

              {/* Barra de progresso */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progresso da temporada</span>
                  <span className="text-primary font-bold">{activeProject.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-orange-green rounded-full transition-all duration-700"
                    style={{ width: `${activeProject.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeProject.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Button asChild size="lg">
                <Link to={`/projetos/${activeProject.id}`}>
                  Ver Projeto Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Timeline vertical de etapas */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Etapas da temporada</h3>
              <div className="space-y-1">
                {activeProject.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground border-2 border-border'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      {i < activeProject.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-10 mt-1 ${
                            item.completed ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-2 pt-1">
                      <p
                        className={`font-medium text-sm leading-snug ${
                          item.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Banner Loja ── */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <a
            href="https://capibots-dev.github.io/loja-capibots/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-5xl mx-auto group"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01]">
              <div className="flex items-center gap-5">
                <div className="bg-white/30 rounded-2xl p-4 flex-shrink-0">
                  <ShoppingBag className="h-10 w-10 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
                    Novidade
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    Loja Capibots 🛒
                  </h3>
                  <p className="text-white/90 mt-1 text-sm md:text-base">
                    Produtos exclusivos da equipe. Apoie e vista a camisa do time!
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-base group-hover:bg-orange-50 transition-colors flex items-center gap-2 whitespace-nowrap">
                  Acessar a Loja
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── Timeline horizontal de conquistas ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Conquistas</h2>
            <p className="text-xl text-muted-foreground">
              Nossa jornada de vitórias e aprendizados
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Linha conectora — desktop */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {achievementsData.map((ach) => (
                <div key={ach.id} className="flex flex-col items-center text-center">
                  <div className="relative z-10 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mb-4">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {ach.date}
                  </p>
                  <h3 className="font-bold text-sm mb-4 leading-snug px-2">{ach.title}</h3>
                  <div className="flex flex-col gap-1.5 items-center">
                    {ach.awards.map((award) => (
                      <Badge
                        key={award}
                        className="bg-primary/10 text-primary border-0 text-xs px-3"
                      >
                        🏆 {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/sobre">Ver Todas as Conquistas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Últimas notícias em destaque ── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Últimas Notícias</h2>
            <p className="text-xl text-muted-foreground">
              Acompanhe as atividades e novidades mais recentes da equipe
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Post em destaque */}
            {latestPosts[0] && (
              <Card className="md:col-span-2 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-56 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                    {latestPosts[0].image.startsWith('/') ? (
                      <img
                        src={latestPosts[0].image}
                        alt={latestPosts[0].title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-7xl">{latestPosts[0].image}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      {latestPosts[0].date}
                      <Badge variant="outline" className="ml-auto text-xs">
                        {latestPosts[0].category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {latestPosts[0].title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                      {latestPosts[0].excerpt}
                    </p>
                    <Button asChild size="sm">
                      <Link to={`/blog/${latestPosts[0].id}`}>
                        Ler Mais
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts menores */}
            <div className="flex flex-col gap-6">
              {latestPosts.slice(1).map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex-1"
                >
                  <CardContent className="p-0">
                    <div className="h-28 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                      {post.image.startsWith('/') ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">{post.image}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <h3 className="text-sm font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <Button asChild variant="outline" size="sm" className="w-full text-xs h-7">
                        <Link to={`/blog/${post.id}`}>
                          Ler Mais
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/blog">Ver Todas as Notícias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Parceiros ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <PartnersCarousel />
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Junte-se à Nossa Jornada</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Acompanhe nossos projetos, conquistas e aventuras no mundo da robótica.
            Conecte-se conosco nas redes sociais!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/contato">Entre em Contato</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <a
                href="https://instagram.com/equipecapibots"
                target="_blank"
                rel="noopener noreferrer"
              >
                Siga no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
