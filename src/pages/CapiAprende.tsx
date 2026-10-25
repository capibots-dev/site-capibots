import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BetaTesterButton from '@/components/BetaTesterButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ExternalLink, Mail, MousePointerClick, UserCheck } from 'lucide-react';
import {
  CAPI_APRENDE_TUTORIAL_URL,
  CAPI_APRENDE_URL,
} from '@/lib/capiAprende';

const passos = [
  {
    icon: BookOpen,
    title: '1. Veja o tutorial',
    text: 'Ele mostra, passo a passo, como usar o Capi-Aprende do lado do aluno e do lado do professor.',
  },
  {
    icon: Mail,
    title: '2. Inscreva-se',
    text: 'Preencha o formulário com nome, e-mail, perfil e cidade. A equipe entra em contato por e-mail com os próximos passos e o acesso ao aplicativo.',
  },
  {
    icon: UserCheck,
    title: '3. Teste e conte o que achou',
    text: 'Use o aplicativo e diga o que ficou confuso, o que faltou e o que funcionou bem. Sua opinião guia as melhorias.',
  },
];

const CapiAprende = () => {
  useEffect(() => {
    document.title = 'Capi-Aprende: tutorial e beta-testers | Capibots';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-14 md:py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Capi-Aprende</h1>
          <p className="text-base md:text-lg text-white/90 mb-8">
            O aplicativo que a Capibots criou para ajudar crianças que não têm internet de qualidade a estudar.
            Veja o tutorial e entre para o grupo de beta-testers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href={CAPI_APRENDE_TUTORIAL_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-5 w-5 mr-2" />
                Ver o tutorial
              </a>
            </Button>
            <BetaTesterButton
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center mb-2">Como participar</h2>
          <p className="text-center text-muted-foreground text-sm md:text-base mb-8">
            O grupo de beta-testers reúne pessoas que testam o aplicativo antes da versão final.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {passos.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre o Capi-Aprende</h2>
          <p className="text-muted-foreground mb-4">
            Ele nasceu da pesquisa "Aprender sem conexão", que a Capibots fez na temporada 2026 do TBR, cujo tema
            é Educação (ODS 4). A criança que não tem internet boa em casa também precisa de um jeito de estudar.
          </p>
          <p className="text-muted-foreground mb-6">
            Quer só dar uma olhada antes de pedir o login? O protótipo navegável está aberto para qualquer pessoa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href={CAPI_APRENDE_URL} target="_blank" rel="noopener noreferrer">
                <MousePointerClick className="h-4 w-4 mr-2" />
                Abrir o protótipo
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/projetos/tbr-2026">Ver a temporada 2026</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CapiAprende;
