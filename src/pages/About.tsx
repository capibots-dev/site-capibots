
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
      
      {/* Hero Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre Nós</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Conheça a história, valores e pessoas que formam a equipe Capibots - 
            jovens inovadores unidos pela paixão por robótica e tecnologia.
          </p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Nossa Equipe</h2>
            <div className="max-w-4xl mx-auto">
              <img 
                src="/lovable-uploads/0075cfc8-8482-49b7-91ad-52d983fc12b0.png"
                alt="Equipe Capibots reunida"
                className="w-full rounded-lg shadow-lg mb-8"
              />
              <p className="text-lg text-muted-foreground">
                A equipe Capibots é formada por 9 jovens talentosos entre 9 e 10 anos, 
                cada um contribuindo com suas habilidades únicas para nossos projetos de robótica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gradient">Nossa História</h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Missão</h3>
                    <p className="text-muted-foreground">
                      Inspirar e educar jovens através da robótica, promovendo o desenvolvimento 
                      de habilidades técnicas, trabalho em equipe e pensamento crítico, 
                      enquanto contribuímos para um futuro mais tecnológico e sustentável.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-secondary">Visão</h3>
                    <p className="text-muted-foreground">
                      Ser reconhecida como uma equipe de referência em robótica educacional, 
                      formando jovens inovadores que utilizarão a tecnologia para criar 
                      soluções que beneficiem a sociedade e o meio ambiente.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6">Como Surgimos</h3>
              <p className="text-muted-foreground mb-6">
                A equipe Capibots nasceu da união de jovens apaixonados por tecnologia e robótica. 
                Inspirados pela natureza colaborativa das capivaras - animais conhecidos por sua 
                capacidade de trabalho em grupo e adaptabilidade - decidimos adotar esse espírito 
                em nossos projetos.
              </p>
              <p className="text-muted-foreground">
                Cada membro trouxe suas habilidades únicas, desde programação até organização, 
                formando uma equipe diversa e complementar. Nosso objetivo é não apenas competir 
                em torneios de robótica, mas também aprender, inovar e contribuir para nossa comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Os princípios que guiam nossa equipe e moldam nossa abordagem em todos os projetos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Nossa Filosofia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Metodologia de Trabalho</h3>
                  <p className="text-muted-foreground">
                    Acreditamos na importância do aprendizado prático e colaborativo. 
                    Nossos projetos são desenvolvidos através de brainstorming coletivo, 
                    experimentação hands-on e iteração constante, sempre com foco no 
                    aprendizado mútuo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-secondary">Enfrentando Desafios</h3>
                  <p className="text-muted-foreground">
                    Encaramos cada desafio como uma oportunidade de crescimento. 
                    Utilizamos o erro como ferramenta de aprendizado e valorizamos 
                    a perseverança, criatividade e pensamento crítico na busca por soluções.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent">Colaboração</h3>
                  <p className="text-muted-foreground">
                    Como as capivaras, entendemos que juntos somos mais fortes. 
                    Cada membro contribui com suas habilidades únicas, criando 
                    um ambiente onde todos aprendem e ensinam simultaneamente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-600">Sustentabilidade</h3>
                  <p className="text-muted-foreground">
                    Nossos projetos sempre consideram o impacto ambiental e social. 
                    Buscamos desenvolver soluções que não apenas demonstrem nossa 
                    capacidade técnica, mas também contribuam para um mundo melhor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Nossas Conquistas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada troféu é o resultado do esforço coletivo, da dedicação e do espírito de equipe que nos une como capivaras.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            <div className="space-y-10">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="relative flex gap-6 items-start">
                  {/* dot */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${achievement.highlight ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted border-2 border-primary/30'}`}>
                    <Trophy className={`h-7 w-7 ${achievement.highlight ? 'text-white' : 'text-primary'}`} />
                  </div>

                  {/* card */}
                  <Card className={`flex-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${achievement.highlight ? 'border-primary/30' : ''}`}>
                    {achievement.image && (
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />
                    )}
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{achievement.date}</span>
                        {achievement.highlight && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Destaque</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {achievement.awards.map((award) => (
                          <span key={award} className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
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

      {/* Team Members Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Membros da Equipe</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça cada um dos nossos talentosos integrantes e suas especialidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
