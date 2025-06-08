
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  instagram?: string;
  type: 'Ouro' | 'Prata' | 'Bronze';
}

const partners: Partner[] = [
  { id: 1, name: 'Calixto Negócios Imobiliários', instagram: '@calixtoimoveisoficial', type: 'Bronze' },
  { id: 2, name: 'Vanilla Cestas Finas', instagram: '@vanillacestasfinas', type: 'Ouro' },
  { id: 3, name: 'Publicenter', instagram: '@publicentersistemas', type: 'Ouro' },
  { id: 4, name: 'Projet Equipamentos', instagram: '@projetequipamentos', type: 'Bronze' },
  { id: 5, name: 'Rezende Solar', instagram: '@rezende_solar', type: 'Prata' },
  { id: 6, name: 'Farmácia Kalayasa', type: 'Ouro' },
  { id: 7, name: 'Eduardo e Monique Negócios Imobiliários', instagram: '@moniquevieira.imoveis', type: 'Ouro' },
  { id: 8, name: 'Flor du Quintal', instagram: '@florduquintal', type: 'Bronze' },
  { id: 9, name: 'ML Acabamentos', instagram: '@mlacabamentos', type: 'Prata' },
  { id: 10, name: 'Gráfica Hebron', instagram: '@graficahebrom_', type: 'Ouro' },
  { id: 11, name: 'Methos Corretora', instagram: '@methoscorretora', type: 'Prata' },
  { id: 12, name: 'Babuska', instagram: '@babuskapaes', type: 'Ouro' },
  { id: 13, name: 'Clínica Orthus Fisioterapia', instagram: '@clinicaorthusfisioterapia', type: 'Ouro' },
];

const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ouro':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Prata':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const visiblePartners = [
    partners[currentIndex],
    partners[(currentIndex + 1) % partners.length],
    partners[(currentIndex + 2) % partners.length],
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Nossos Parceiros</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Agradecemos a todos os parceiros que apoiam nossa jornada na robótica educacional
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visiblePartners.map((partner, index) => (
          <Card 
            key={`${partner.id}-${currentIndex}`}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{partner.name}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${getTypeColor(partner.type)}`}>
                Parceiro {partner.type}
              </span>
              {partner.instagram && (
                <a
                  href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{partner.instagram}</span>
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {partners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
