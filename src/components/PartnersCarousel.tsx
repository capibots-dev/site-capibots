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

const tierConfig = {
  Ouro: {
    label: 'Patrocinadores Ouro',
    badge: '🥇',
    badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    headerClass: 'text-yellow-700',
    logoSize: 'h-36 w-36 md:h-44 md:w-44',
    nameSize: 'text-base font-semibold',
    rows: 3,
  },
  Prata: {
    label: 'Patrocinadores Prata',
    badge: '🥈',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
    headerClass: 'text-slate-600',
    logoSize: 'h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32',
    nameSize: 'text-xs font-medium',
    rows: 4,
  },
  Bronze: {
    label: 'Patrocinadores Bronze',
    badge: '🥉',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-300',
    headerClass: 'text-orange-700',
    logoSize: 'h-14 w-14',
    nameSize: 'text-xs',
    rows: 4,
  },
};

// Ouro: 3 em cima e o restante embaixo; prata/bronze: uma linha com até 4
const chunk = <T,>(items: T[], perRow: number): T[][] => {
  if (perRow === 3 && items.length > 3) return [items.slice(0, 3), items.slice(3)];
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
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
    <p className={`${nameSize} text-foreground leading-tight line-clamp-2 max-w-[160px]`}>
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
          Agradecemos a todos os parceiros que tornam possível nossa participação no TBR nesta temporada 2026.
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

            <div className="space-y-8">
              {chunk(tierPartners, config.rows).map((row, i) => (
                <div key={i} className="flex flex-wrap justify-center gap-x-8 gap-y-6">
                  {row.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      logoSize={config.logoSize}
                      nameSize={config.nameSize}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
      )}

    </div>
  );
};

export default PartnersCarousel;
