
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Projetos', href: '/projetos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b61c479b-20cc-4f10-a78f-3e1eed742e8e.png" 
                alt="Capibots Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg text-gradient">Capibots</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Unidos como capivaras, espertos como robôs! Equipe de robótica infantil 
              focada em inovação, aprendizado e trabalho em equipe.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navegação</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact and Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contato</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                equipecapibots@gmail.com
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/equipecapibots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Equipe Capibots. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
