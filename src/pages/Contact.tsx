
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="py-10 md:py-14 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90">
            Tem dúvidas sobre nossos projetos? Quer fazer uma parceria?
            Estamos aqui para conversar!
          </p>
        </div>
      </section>

      {/* Canais de contato */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Como nos encontrar</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Escolha a melhor forma de entrar em contato conosco.
                Estamos sempre ansiosos para conhecer novas pessoas!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">E-mail</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Para parcerias, dúvidas ou informações sobre nossos projetos
                  </p>
                  <p className="font-medium mb-4">equipecapibots@gmail.com</p>
                  <Button asChild className="w-full">
                    <a href="mailto:equipecapibots@gmail.com">Enviar E-mail</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Instagram</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Acompanhe nosso dia a dia e mande uma mensagem direta
                  </p>
                  <p className="font-medium mb-4">@equipecapibots</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                      Seguir no Instagram
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-12 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Vamos Conversar!</h2>
            <p className="text-base mb-6 text-white/90">
              Seja para parcerias, dúvidas ou só para bater um papo sobre robótica,
              estamos sempre prontos para uma boa conversa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="mailto:equipecapibots@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar E-mail
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" />
                  Seguir Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
