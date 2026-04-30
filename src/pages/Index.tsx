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
  FlaskConical,
  Bot,
  ClipboardList,
  Sprout,
} from 'lucide-react';
import projectsData from '@/data/projects.json';
import achievementsData from '@/data/achievements.json';
import blogData from '@/data/blog.json';
import teamData from '@/data/team.json';

const dimensoes = [
  {
    icon: FlaskConical,
    label: 'Mérito Científico',
    color: 'from-orange-400 to-orange-600',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200',
    items: [
      'Tema: ODS 4 — Educação de Qualidade',
      'Pesquisa sobre inclusão e acesso à educação',
      'Solução digital inovadora em desenvolvimento',
    ],
    cta: { label: 'Ver projeto', to: '/projetos/tbr-2026' },
  },
  {
    icon: Bot,
    label: 'Desafio Prático',
    color: 'from-blue-400 to-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
    items: [
      'Robô: Lego Spike Prime',
      'Tapete 2026: missões em ambiente escolar',
      '1º lugar no Desafio Prático — Regional 2025',
    ],
    cta: { label: 'Por Dentro do Robô', to: '/blog' },
  },
  {
    icon: ClipboardList,
    label: 'Organização & Método',
    color: 'from-purple-400 to-purple-600',
    badgeClass: 'bg-purple-100 text-purple-700 border-purple-200',
    items: [
      '9 integrantes com papéis definidos',
      'Trello, Google Forms e Canva',
      'Reuniões semanais e cronograma estruturado',
    ],
    cta: { label: 'Conheça a equipe', to: '/sobre' },
  },
  {
    icon: Sprout,
    label: 'Desenvolvimento Humano',
    color: 'from-green-400 to-green-600',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
    items: [
      'Entrevista na TV Paranaíba',
      '800+ seguidores no Instagram',
      'Impacto real: doação de mudas nativas',
    ],
    cta: { label: 'Nossa história', to: '/sobre' },
  },
];

const categoryColor: Record<string, string> = {
  Programação: 'bg-primary/10 text-primary border-primary/20',
  Posicionamento: 'bg-secondary/10 text-secondary border-secondary/20',
  Ciência: 'bg-orange-100 text-orange-700 border-orange-200',
  Engenharia: 'bg-purple-100 text-purple-700 border-purple-200',
  Organização: 'bg-pink-100 text-pink-700 border-pink-200',
};

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
      <section className="relative py-14 md:py-20 gradient-orange-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 py-1">
              🤖 Temporada TBR 2026 · ODS 4 — Educação de Qualidade
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Unidos como capivaras,
              <br />
              <span className="text-yellow-300">espertos como robôs!</span>
            </h1>
            <p className="text-base md:text-xl mb-8 text-white/90 max-w-xl mx-auto">
              9 jovens de Uberlândia competindo no Torneio Brasil de Robótica com
              tecnologia, ciência e trabalho em equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/projetos">Nossos Projetos</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link to="/sobre">Conhecer a Equipe</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip — Conquistas 2025 ── */}
      <section className="bg-foreground text-background py-5">
        <div className="container mx-auto px-4">
          <p className="text-center text-[9px] md:text-[10px] uppercase tracking-widest opacity-50 font-semibold mb-3 flex items-center justify-center gap-1.5">
            <Trophy className="h-3 w-3 text-primary" />
            Conquistas da Temporada 2025
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '🏆 Campeã Geral', label: 'Torneio Interno · Mar/2025' },
              { value: '🥇 1º Desafio Prático', label: 'Etapa Regional · Ago/2025' },
              { value: '🥈 2º lugar geral', label: 'Etapa Regional · Ago/2025' },
              { value: '🥉 3º lugar nacional', label: 'Etapa Nacional · Dez/2025' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-sm md:text-base font-bold text-primary leading-snug">{s.value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projeto TBR 2026 ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="outline" className="text-primary border-primary mb-2">
              Projeto em andamento
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">{activeProject.title}</h2>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">{activeProject.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            {/* Problema & Solução */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                {activeProject.image.startsWith('/') ? (
                  <img src={activeProject.image} alt={activeProject.title} className="h-12 w-12 object-contain" />
                ) : (
                  <span className="text-4xl">{activeProject.image}</span>
                )}
                <div>
                  <div className="flex gap-2 flex-wrap mb-1">
                    <Badge className="bg-primary/10 text-primary border-0 text-xs">{activeProject.category}</Badge>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">{activeProject.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{activeProject.period}</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">O Problema</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    Como garantir educação inclusiva e de qualidade para crianças e jovens? O ODS 4 aponta que milhões ainda enfrentam barreiras de acesso, permanência e aprendizagem.
                  </p>
                </div>
                <div className="p-3.5 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1">Nossa Solução</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {activeProject.description.slice(0, 220)}…
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-sm">Progresso da temporada</span>
                  <span className="text-primary font-bold text-sm">{activeProject.progress}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-orange-green rounded-full transition-all duration-700"
                    style={{ width: `${activeProject.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <Button asChild>
                <Link to={`/projetos/${activeProject.id}`}>
                  Ver Projeto Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Timeline de etapas */}
            <div className="border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Etapas da temporada</p>
              <div className="space-y-1">
                {activeProject.timeline.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground border-2 border-border'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Circle className="h-3.5 w-3.5" />
                        )}
                      </div>
                      {i < activeProject.timeline.length - 1 && (
                        <div className={`w-0.5 h-9 mt-1 ${item.completed ? 'bg-primary' : 'bg-border'}`} />
                      )}
                    </div>
                    <div className="pb-2 pt-0.5">
                      <p className={`font-medium text-sm leading-snug ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
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

      {/* ── As 4 Dimensões ── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="outline" className="text-primary border-primary mb-2">
              Fichas de Avaliação TBR
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">As 4 Dimensões</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-xl mx-auto">
              O TBR avalia equipes em quatro dimensões. Veja como os Capibots trabalham cada uma delas.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dimensoes.map((d) => (
              <Card key={d.label} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-1.5 bg-gradient-to-r ${d.color}`} />
                  <div className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${d.badgeClass}`}>
                      <d.icon className="h-3 w-3" />
                      {d.label}
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {d.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" size="sm" className="w-full text-xs h-7">
                      <Link to={d.cta.to}>
                        {d.cta.label}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── A Equipe ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">A Equipe</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              9 integrantes com papéis complementares. Clique para conhecer cada um.
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-9 gap-4 max-w-5xl mx-auto">
            {teamData.map((member) => (
              <Link
                key={member.name}
                to={`/equipe/${member.slug}`}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary mb-2 flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {member.name[0]}
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-semibold leading-tight group-hover:text-primary transition-colors">{member.name}</p>
                <span className={`mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border ${categoryColor[member.category] ?? 'bg-muted text-muted-foreground border-border'}`}>
                  {member.role}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conquistas ── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Conquistas</h2>
            <p className="text-sm md:text-base text-muted-foreground">Nossa jornada de vitórias e aprendizados</p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievementsData.map((ach) => (
                <div key={ach.id} className="flex flex-col items-center text-center">
                  <div className="relative z-10 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mb-3">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{ach.date}</p>
                  <h3 className="font-bold text-sm mb-3 leading-snug px-2">{ach.title}</h3>
                  <div className="flex flex-col gap-1.5 items-center">
                    {ach.awards.map((award) => (
                      <Badge key={award} className="bg-primary/10 text-primary border-0 text-xs px-2.5">
                        🏆 {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/sobre">Ver Todas as Conquistas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Banner Loja ── */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <a
            href="https://capibots-dev.github.io/loja-capibots/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-5xl mx-auto group"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01]">
              <div className="flex items-center gap-4">
                <div className="bg-white/30 rounded-xl p-3 flex-shrink-0">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">Novidade</p>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">Loja Capibots 🛒</h3>
                  <p className="text-white/90 mt-0.5 text-sm">
                    Produtos exclusivos da equipe. Apoie e vista a camisa do time!
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white text-orange-500 font-bold px-6 py-2.5 rounded-full text-sm group-hover:bg-orange-50 transition-colors flex items-center gap-2 whitespace-nowrap">
                  Acessar a Loja
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── Últimas notícias ── */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Últimas Notícias</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Atividades e novidades mais recentes da equipe
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {latestPosts[0] && (
              <Card className="md:col-span-2 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-44 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                    {latestPosts[0].image.startsWith('/') ? (
                      <img src={latestPosts[0].image} alt={latestPosts[0].title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">{latestPosts[0].image}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {latestPosts[0].date}
                      <Badge variant="outline" className="ml-auto text-[10px]">{latestPosts[0].category}</Badge>
                    </div>
                    <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {latestPosts[0].title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{latestPosts[0].excerpt}</p>
                    <Button asChild size="sm">
                      <Link to={`/blog/${latestPosts[0].id}`}>
                        Ler Mais <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col gap-4">
              {latestPosts.slice(1).map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex-1">
                  <CardContent className="p-0">
                    <div className="h-24 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                      {post.image.startsWith('/') ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{post.image}</span>
                      )}
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1.5">
                        <Calendar className="h-2.5 w-2.5" />
                        {post.date}
                      </div>
                      <h3 className="text-xs font-semibold mb-2.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <Button asChild variant="outline" size="sm" className="w-full text-xs h-7">
                        <Link to={`/blog/${post.id}`}>
                          Ler Mais <ArrowRight className="ml-1 h-2.5 w-2.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/blog">Ver Todas as Notícias</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Parceiros ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <PartnersCarousel />
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-12 md:py-16 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Junte-se à Nossa Jornada</h2>
          <p className="text-base mb-6 text-white/90 max-w-xl mx-auto">
            Acompanhe projetos, conquistas e aventuras no mundo da robótica.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contato">Entre em Contato</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
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
