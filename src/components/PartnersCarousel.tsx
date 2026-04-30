import { Instagram } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  instagram?: string;
  type: 'Ouro' | 'Prata' | 'Bronze';
  image?: string;
}

const partners: Partner[] = [
  // ── Ouro ──
  { id: 2,  name: 'Vanilla Cestas Finas',                  instagram: '@vanillacestasfinas',           type: 'Ouro' },
  { id: 3,  name: 'Publicenter',                           instagram: '@publicentersistemas',           type: 'Ouro', image: '/images/sponsors/publicenter-square.png' },
  { id: 6,  name: 'Farmácia Kalayasa',                                                                  type: 'Ouro', image: '/images/sponsors/Logo Kalayasa.jpeg' },
  { id: 7,  name: 'Eduardo e Monique Negócios Imobiliários', instagram: '@moniquevieira.imoveis',      type: 'Ouro', image: '/images/sponsors/eduardoemonique-square.jpeg' },
  { id: 10, name: 'Gráfica Hebron',                        instagram: '@graficahebrom_',               type: 'Ouro', image: '/images/sponsors/hebrom-square.png' },
  { id: 12, name: 'Babuska',                               instagram: '@babuskapaes',                  type: 'Ouro', image: '/images/sponsors/babuska-square.png' },
  { id: 13, name: 'Clínica Orthus Fisioterapia',           instagram: '@clinicaorthusfisioterapia',    type: 'Ouro', image: '/images/sponsors/orthus-square.jpeg' },
  // ── Prata ──
  { id: 5,  name: 'Rezende Solar',                         instagram: '@rezende_solar',                type: 'Prata' },
  { id: 9,  name: 'ML Acabamentos',                        instagram: '@mlacabamentos',                type: 'Prata', image: '/images/sponsors/mlacabamentos-square.png' },
  { id: 11, name: 'Methos Corretora',                      instagram: '@methoscorretora',              type: 'Prata' },
  // ── Bronze ──
  { id: 1,  name: 'Calixto Negócios Imobiliários',         instagram: '@calixtoimoveisoficial',        type: 'Bronze', image: '/images/sponsors/calixto-square.png' },
  { id: 4,  name: 'Projet Equipamentos',                   instagram: '@projetequipamentos',           type: 'Bronze', image: '/images/sponsors/Logo Projet.jpeg' },
  { id: 8,  name: 'Flor du Quintal',                       instagram: '@florduquintal',                type: 'Bronze', image: '/images/sponsors/florduquintal-square.png' },
];

const tierConfig = {
  Ouro: {
    label: 'Patrocinadores Ouro',
    badge: '🥇',
    badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    headerClass: 'text-yellow-700',
    logoSize: 'h-28 w-28',
    nameSize: 'text-sm font-semibold',
    grid: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  },
  Prata: {
    label: 'Patrocinadores Prata',
    badge: '🥈',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
    headerClass: 'text-slate-600',
    logoSize: 'h-20 w-20',
    nameSize: 'text-xs font-medium',
    grid: 'grid-cols-2 sm:grid-cols-3',
  },
  Bronze: {
    label: 'Patrocinadores Bronze',
    badge: '🥉',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-300',
    headerClass: 'text-orange-700',
    logoSize: 'h-14 w-14',
    nameSize: 'text-xs',
    grid: 'grid-cols-3 sm:grid-cols-4',
  },
};

interface PartnerCardProps {
  partner: Partner;
  logoSize: string;
  nameSize: string;
}

const PartnerCard = ({ partner, logoSize, nameSize }: PartnerCardProps) => (
  <div className="flex flex-col items-center text-center gap-2 group">
    <div
      className={`${logoSize} rounded-xl overflow-hidden bg-white border border-border shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5`}
    >
      {partner.image ? (
        <img
          src={partner.image}
          alt={partner.name}
          className="w-full h-full object-contain p-1"
        />
      ) : (
        <span className="font-bold text-primary text-xl">
          {partner.name.charAt(0)}
        </span>
      )}
    </div>
    <p className={`${nameSize} text-foreground leading-tight line-clamp-2 max-w-[100px]`}>
      {partner.name}
    </p>
    {partner.instagram && (
      <a
        href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors"
      >
        <Instagram className="h-3 w-3" />
        {partner.instagram}
      </a>
    )}
  </div>
);

const PartnersCarousel = () => {
  const tiers = (['Ouro', 'Prata', 'Bronze'] as const).map((tier) => ({
    tier,
    config: tierConfig[tier],
    partners: partners.filter((p) => p.type === tier),
  }));

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-gradient">Nossos Patrocinadores</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Agradecemos a todos os parceiros que tornam possível nossa participação no TBR.
        </p>
      </div>

      {tiers.map(({ tier, config, partners: tierPartners }) =>
        tierPartners.length === 0 ? null : (
          <div key={tier}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px flex-1 bg-border`} />
              <span className={`text-sm font-semibold uppercase tracking-widest ${config.headerClass} flex items-center gap-1.5`}>
                {config.badge} {config.label}
              </span>
              <div className={`h-px flex-1 bg-border`} />
            </div>

            <div className={`grid ${config.grid} gap-6 justify-items-center`}>
              {tierPartners.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  logoSize={config.logoSize}
                  nameSize={config.nameSize}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PartnersCarousel;
