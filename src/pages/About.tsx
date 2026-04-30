
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Zap, Users, Trophy } from 'lucide-react';
import teamData from '@/data/team.json';
import achievementsData from '@/data/achievements.json';

const About = () => {
  const teamMembers = teamData;
  const achievements = achievementsData;

  const values = [
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description: 'Acreditamos que juntos somos mais fortes. Como capivaras, valorizamos a cooperação e o apoio mútuo.'
    },
    {
      icon: Zap,
      title: 'Inovação',
      description: 'Buscamos constantemente novas soluções e tecnologias para resolver problemas do dia a dia.'
    },
    {
      icon: Heart,
      title: 'Paixão pelo Aprendizado',
      description: 'Cada desafio é uma oportunidade de crescer e descobrir algo novo sobre robótica e tecnologia.'
    },
    {
      icon: Target,
      title: 'Impacto Social',
      description: 'Nossos projetos visam contribuir positivamente para nossa comunidade e meio ambiente.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="py-10 md:py-14 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90">
            Conheça a história, valores e pessoas que formam a equipe Capibots —
            jovens inovadores unidos pela paixão por robótica e tecnologia.
          </p>
        </div>
      </section>

      {/* Equipe — foto + grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Nossa Equipe</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              9 jovens entre 9 e 10 anos, cada um contribuindo com suas habilidades únicas para nossos projetos de robótica.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <img
              src="/lovable-uploads/0075cfc8-8482-49b7-91ad-52d983fc12b0.png"
              alt="Equipe Capibots reunida"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.07}s` }}>
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História e Missão */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nossa História</h2>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Missão</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Inspirar e educar jovens através da robótica, promovendo o desenvolvimento
                      de habilidades técnicas, trabalho em equipe e pensamento crítico,
                      enquanto contribuímos para um futuro mais tecnológico e sustentável.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-secondary">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-secondary">Visão</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Ser reconhecida como uma equipe de referência em robótica educacional,
                      formando jovens inovadores que utilizarão a tecnologia para criar
                      soluções que beneficiem a sociedade e o meio ambiente.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Como Surgimos</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                A equipe Capibots nasceu da união de jovens apaixonados por tecnologia e robótica.
                Inspirados pela natureza colaborativa das capivaras — animais conhecidos por sua
                capacidade de trabalho em grupo e adaptabilidade — decidimos adotar esse espírito
                em nossos projetos.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada membro trouxe suas habilidades únicas, desde programação até organização,
                formando uma equipe diversa e complementar. Nosso objetivo é não apenas competir
                em torneios de robótica, mas também aprender, inovar e contribuir para nossa comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Nossos Valores</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam nossa equipe e moldam nossa abordagem em todos os projetos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <Card key={value.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                <CardContent className="p-5">
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conquistas */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Nossas Conquistas</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Cada troféu é o resultado do esforço coletivo, da dedicação e do espírito de equipe que nos une como capivaras.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            <div className="space-y-8">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative flex gap-5 items-start">
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${achievement.highlight ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted border-2 border-primary/30'}`}>
                    <Trophy className={`h-7 w-7 ${achievement.highlight ? 'text-white' : 'text-primary'}`} />
                  </div>

                  <Card className={`flex-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${achievement.highlight ? 'border-primary/30' : ''}`}>
                    {achievement.image && (
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{achievement.date}</span>
                        {achievement.highlight && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Destaque</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {achievement.awards.map((award) => (
                          <span key={award} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            🏆 {award}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
