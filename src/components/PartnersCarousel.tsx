import { Instagram } from 'lucide-react';
import sponsorsData from '@/data/sponsors.json';

type Tier = 'ouro' | 'prata' | 'bronze';

interface Sponsor {
  id: string;
  nome: string;
  edicoes: { ano: number; tipo: Tier }[];
  imagem: string;
  link: string | null;
  instagram: string | null;
  descricao: string;
}

interface Partner {
  id: string;
  name: string;
  instagram?: string;
  link?: string;
  type: 'Ouro' | 'Prata' | 'Bronze';
  image: string;
}

const tierLabel = { ouro: 'Ouro', prata: 'Prata', bronze: 'Bronze' } as const;

const sponsors = sponsorsData as Sponsor[];
const currentYear = Math.max(...sponsors.flatMap((s) => s.edicoes.map((e) => e.ano)));

const partners: Partner[] = sponsors.flatMap((s) => {
  const edicao = s.edicoes.find((e) => e.ano === currentYear);
  if (!edicao) return [];
  return [{
    id: s.id,
    name: s.nome,
    instagram: s.instagram ?? undefined,
    link: s.link ?? undefined,
    type: tierLabel[edicao.tipo],
    image: s.imagem,
  }];
});

const pastPartners = sponsors.filter((s) => !s.edicoes.some((e) => e.ano === currentYear));

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
      {partner.link ? (
        <a href={partner.link} target="_blank" rel="noopener noreferrer" className="w-full h-full">
          <img src={partner.image} alt={partner.name} className="w-full h-full object-contain p-1" />
        </a>
      ) : (
        <img src={partner.image} alt={partner.name} className="w-full h-full object-contain p-1" />
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

      {pastPartners.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Apoiaram em edições anteriores
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 justify-items-center">
            {pastPartners.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center gap-2">
                <div className="h-14 w-14 rounded-xl overflow-hidden bg-white border border-border shadow-sm flex items-center justify-center">
                  <img src={s.imagem} alt={s.nome} className="w-full h-full object-contain p-1" />
                </div>
                <p className="text-xs text-muted-foreground leading-tight line-clamp-2 max-w-[100px]">{s.nome}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersCarousel;
