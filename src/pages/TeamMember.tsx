import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Bot, FlaskConical, ClipboardList, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import teamData from '@/data/team.json';
import projectsData from '@/data/projects.json';

const dimensionMap: Record<string, { label: string; desc: string; Icon: React.ElementType; colorClass: string; badgeClass: string }> = {
  Programação: {
    label: 'Desafio Prático',
    desc: 'Escreve o código que transforma estratégia em movimento — os programadores são o cérebro do robô no tapete.',
    Icon: Bot,
    colorClass: 'text-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  Posicionamento: {
    label: 'Desafio Prático',
    desc: 'Garante que o robô parta do ponto exato na hora certa — milímetros importam no tapete de competição.',
    Icon: Bot,
    colorClass: 'text-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  Engenharia: {
    label: 'Desafio Prático',
    desc: 'Projeta e monta a estrutura física do robô, garantindo que cada peça cumpra sua função sob pressão.',
    Icon: Cpu,
    colorClass: 'text-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  Ciência: {
    label: 'Mérito Científico',
    desc: 'Lidera a pesquisa científica da equipe — do problema ao ODS, da hipótese à solução com impacto real.',
    Icon: FlaskConical,
    colorClass: 'text-orange-600',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  Organização: {
    label: 'Organização & Método',
    desc: 'Mantém prazos, registros e o time funcionando como um mecanismo bem calibrado ao longo da temporada.',
    Icon: ClipboardList,
    colorClass: 'text-purple-600',
    badgeClass: 'bg-purple-100 text-purple-700 border-purple-200',
  },
};

const categoryColor: Record<string, string> = {
  Programação: 'bg-primary/10 text-primary border-primary/20',
  Posicionamento: 'bg-secondary/10 text-secondary border-secondary/20',
  Ciência: 'bg-orange-100 text-orange-700 border-orange-200',
  Engenharia: 'bg-purple-100 text-purple-700 border-purple-200',
  Organização: 'bg-pink-100 text-pink-700 border-pink-200',
};

const TeamMember = () => {
  const { slug } = useParams();
  const index = teamData.findIndex((m) => m.slug === slug);
  const member = teamData[index];

  if (!member) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Integrante não encontrado</h1>
          <Button asChild>
            <Link to="/sobre"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para a equipe</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const prev = teamData[index - 1] ?? teamData[teamData.length - 1];
  const next = teamData[index + 1] ?? teamData[0];

  const dimension = dimensionMap[member.category];
  const memberProjects = projectsData.filter((p) =>
    p.teamMembers.some((m) => m.toLowerCase().includes(member.name.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <Header />

      {/* ── Hero ── */}
      <section className="relative gradient-orange-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="pt-10 pb-0 flex flex-col items-center text-center">
            <Link
              to="/sobre"
              className="mb-8 flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Toda a equipe
            </Link>

            {/* Avatar */}
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold">
                  {member.name[0]}
                </div>
              )}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold">{member.name}</h1>
            <p className="mt-2 text-xl text-white/80">{member.role}</p>

            <div className="mt-4 mb-0">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border bg-white/20 text-white border-white/30`}>
                {member.category}
              </span>
            </div>

            {/* Wave divider */}
            <div className="w-full mt-10 overflow-hidden leading-none">
              <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 64L1440 64L1440 20C1200 60 960 0 720 32C480 64 240 8 0 40L0 64Z" fill="hsl(var(--background))" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conteúdo ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">

            {/* Coluna principal */}
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gradient">Sobre {member.name}</h2>
                  <p className="text-muted-foreground leading-relaxed text-base">{member.minibio}</p>
                </CardContent>
              </Card>

              {/* Dimensão TBR */}
              {dimension && (
                <Card className="overflow-hidden">
                  <div className={`h-1.5 ${
                    member.category === 'Organização' ? 'bg-purple-400' :
                    member.category === 'Ciência' ? 'bg-orange-400' : 'bg-blue-400'
                  }`} />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        member.category === 'Organização' ? 'bg-purple-100' :
                        member.category === 'Ciência' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <dimension.Icon className={`h-6 w-6 ${dimension.colorClass}`} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                          Dimensão TBR
                        </p>
                        <h3 className="font-bold text-lg mb-2">{dimension.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dimension.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* Função */}
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Função na equipe</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{member.role}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${categoryColor[member.category] ?? ''}`}>
                        {member.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projetos */}
              {memberProjects.length > 0 && (
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Projetos</p>
                    <div className="space-y-3">
                      {memberProjects.map((project) => (
                        <Link
                          key={project.id}
                          to={`/projetos/${project.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center">
                            {project.image.startsWith('/') ? (
                              <img src={project.image} alt={project.title} className="h-full w-full object-contain p-1" />
                            ) : (
                              <span className="text-white text-lg">{project.image}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">{project.title}</p>
                            <Badge
                              variant="outline"
                              className={`text-[10px] mt-0.5 ${
                                project.status === 'Concluído'
                                  ? 'border-green-300 text-green-700'
                                  : 'border-blue-300 text-blue-700'
                              }`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Número na equipe */}
              <Card className="bg-muted/40">
                <CardContent className="p-5 text-center">
                  <p className="text-4xl font-black text-primary">#{index + 1}</p>
                  <p className="text-xs text-muted-foreground mt-1">de {teamData.length} integrantes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navegação prev/next ── */}
      <section className="py-10 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <Link
              to={`/equipe/${prev.slug}`}
              className="flex items-center gap-3 group"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors flex-shrink-0 bg-gradient-to-br from-primary to-secondary">
                {prev.image ? (
                  <img src={prev.image} alt={prev.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">{prev.name[0]}</div>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ChevronLeft className="h-3 w-3" /> Anterior
                </p>
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{prev.name}</p>
              </div>
            </Link>

            <Button asChild variant="outline" size="sm">
              <Link to="/sobre">Ver toda a equipe</Link>
            </Button>

            <Link
              to={`/equipe/${next.slug}`}
              className="flex items-center gap-3 group text-right"
            >
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  Próximo <ChevronRight className="h-3 w-3" />
                </p>
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{next.name}</p>
              </div>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors flex-shrink-0 bg-gradient-to-br from-primary to-secondary">
                {next.image ? (
                  <img src={next.image} alt={next.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">{next.name[0]}</div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamMember;
