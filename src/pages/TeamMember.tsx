import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Bot, FlaskConical, ClipboardList, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import teamData from '@/data/team.json';
import projectsData from '@/data/projects.json';

const dimensionMap: Record<string, { label: string; desc: string; Icon: React.ElementType; colorClass: string; bgClass: string }> = {
  Programação: {
    label: 'Desafio Prático',
    desc: 'Escreve o código que transforma estratégia em movimento — os programadores são o cérebro do robô no tapete.',
    Icon: Bot,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
  },
  Posicionamento: {
    label: 'Desafio Prático',
    desc: 'Garante que o robô parta do ponto exato na hora certa — milímetros importam no tapete de competição.',
    Icon: Bot,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
  },
  Engenharia: {
    label: 'Desafio Prático',
    desc: 'Projeta e monta a estrutura física do robô, garantindo que cada peça cumpra sua função sob pressão.',
    Icon: Cpu,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
  },
  Ciência: {
    label: 'Mérito Científico',
    desc: 'Lidera a pesquisa científica da equipe — do problema ao ODS, da hipótese à solução com impacto real.',
    Icon: FlaskConical,
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-100',
  },
  Organização: {
    label: 'Organização & Método',
    desc: 'Mantém prazos, registros e o time funcionando como um mecanismo bem calibrado ao longo da temporada.',
    Icon: ClipboardList,
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-100',
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
          <h1 className="text-3xl font-bold mb-4">Integrante não encontrado</h1>
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
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Breadcrumb */}
        <Link
          to="/sobre"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Toda a equipe
        </Link>

        {/* Ficha do integrante */}
        <Card className="overflow-hidden max-w-4xl mx-auto shadow-md">
          <div className="flex flex-col md:flex-row">

            {/* ── Coluna esquerda: identidade ── */}
            <div className="md:w-56 lg:w-64 shrink-0 flex flex-col items-center text-center p-6 bg-muted/40 border-b md:border-b-0 md:border-r border-border">
              {/* Foto */}
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary shadow mb-4">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white">
                    {member.name[0]}
                  </div>
                )}
              </div>

              {/* Nome e função */}
              <h1 className="text-lg font-bold leading-tight mb-1">{member.name}</h1>
              <p className="text-sm text-muted-foreground mb-3">{member.role}</p>

              {/* Categoria */}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor[member.category] ?? ''}`}>
                {member.category}
              </span>

              {/* Número na equipe */}
              <div className="mt-auto pt-8 text-center">
                <p className="text-3xl font-black text-primary leading-none">#{index + 1}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">
                  de {teamData.length} integrantes
                </p>
              </div>
            </div>

            {/* ── Coluna direita: detalhes ── */}
            <div className="flex-1 p-6 space-y-5">

              {/* Bio */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                  Sobre {member.name}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.minibio}</p>
              </div>

              <hr className="border-border" />

              {/* Dimensão TBR */}
              {dimension && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                    Dimensão TBR
                  </p>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${dimension.bgClass}`}>
                      <dimension.Icon className={`h-5 w-5 ${dimension.colorClass}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{dimension.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{dimension.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Projetos */}
              {memberProjects.length > 0 && (
                <>
                  <hr className="border-border" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                      Projetos
                    </p>
                    <div className="space-y-2">
                      {memberProjects.map((project) => (
                        <Link
                          key={project.id}
                          to={`/projetos/${project.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="h-9 w-9 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary shrink-0 flex items-center justify-center">
                            {project.image.startsWith('/') ? (
                              <img src={project.image} alt={project.title} className="h-full w-full object-contain p-1" />
                            ) : (
                              <span className="text-white text-base">{project.image}</span>
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
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* ── Navegação prev / next ── */}
        <div className="max-w-4xl mx-auto mt-5 flex items-center justify-between gap-4">
          <Link to={`/equipe/${prev.slug}`} className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors shrink-0 bg-gradient-to-br from-primary to-secondary">
              {prev.image ? (
                <img src={prev.image} alt={prev.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">{prev.name[0]}</div>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground flex items-center gap-0.5">
                <ChevronLeft className="h-3 w-3" /> Anterior
              </p>
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">{prev.name}</p>
            </div>
          </Link>

          <Button asChild variant="outline" size="sm">
            <Link to="/sobre">Ver toda a equipe</Link>
          </Button>

          <Link to={`/equipe/${next.slug}`} className="flex items-center gap-2 group text-right">
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground flex items-center gap-0.5 justify-end">
                Próximo <ChevronRight className="h-3 w-3" />
              </p>
              <p className="text-sm font-semibold group-hover:text-primary transition-colors">{next.name}</p>
            </div>
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors shrink-0 bg-gradient-to-br from-primary to-secondary">
              {next.image ? (
                <img src={next.image} alt={next.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">{next.name[0]}</div>
              )}
            </div>
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TeamMember;
