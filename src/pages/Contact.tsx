
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Tem dúvidas sobre nossos projetos? Quer fazer uma parceria? 
            Estamos aqui para conversar!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gradient">Como nos encontrar</h2>
              <p className="text-lg text-muted-foreground">
                Escolha a melhor forma de entrar em contato conosco. 
                Estamos sempre ansiosos para conhecer novas pessoas!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Contact */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">E-mail</h3>
                  <p className="text-muted-foreground mb-6">
                    Para parcerias, dúvidas ou informações sobre nossos projetos
                  </p>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">equipecapibots@gmail.com</p>
                    <Button asChild className="w-full">
                      <a href="mailto:equipecapibots@gmail.com">
                        Enviar E-mail
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Instagram Contact */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Instagram</h3>
                  <p className="text-muted-foreground mb-6">
                    Acompanhe nosso dia a dia e mande uma mensagem direta
                  </p>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">@equipecapibots</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                        Seguir no Instagram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gradient">Perguntas Frequentes</h2>
              <p className="text-lg text-muted-foreground">
                Algumas perguntas que costumamos receber com frequência
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-primary">Como posso apoiar a equipe?</h3>
                  <p className="text-muted-foreground text-sm">
                    Você pode nos apoiar seguindo nossas redes sociais, compartilhando nossos projetos 
                    e entrando em contato para discutir possíveis parcerias.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-primary">Vocês fazem apresentações?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim! Adoramos compartilhar nosso conhecimento. Entre em contato para agendar 
                    uma apresentação em sua escola ou evento.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-primary">Como funciona o projeto TBR 2025?</h3>
                  <p className="text-muted-foreground text-sm">
                    Estamos desenvolvendo a CerradoTech, uma plataforma na internet com ferramentas e muito conteúdo para ajudar na criação de uma rede de colaboradores com o propósito de regenerar a vegetação do Cerrado.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-primary">Qual a idade dos integrantes?</h3>
                  <p className="text-muted-foreground text-sm">
                    Nossa equipe é formada por 9 jovens talentosos entre 9 e 10 anos, 
                    cada um com habilidades únicas em diferentes áreas da robótica.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Vamos Conversar!</h2>
            <p className="text-xl mb-8 text-white/90">
              Seja para parcerias, dúvidas ou só para bater um papo sobre robótica, 
              estamos sempre prontos para uma boa conversa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="mailto:equipecapibots@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar E-mail
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
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
