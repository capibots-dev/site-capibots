
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberCardProps {
  slug: string;
  name: string;
  role: string;
  category: string;
  minibio?: string;
  image?: string;
}

const TeamMemberCard = ({ slug, name, role, category, minibio, image }: TeamMemberCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Programação':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Posicionamento':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Ciência':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Engenharia':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Organização':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Link to={`/equipe/${slug}`} className="block group">
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
        <div className="h-52 bg-gradient-to-br from-primary to-secondary overflow-hidden">
          {image
            ? <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            : <div className="w-full h-full flex items-center justify-center"><User className="h-20 w-20 text-white/60" /></div>
          }
        </div>
        <CardContent className="p-5 text-center">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-muted-foreground text-sm mb-3">{role}</p>
          {minibio && <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{minibio}</p>}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
            {category}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamMemberCard;
