
import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  category: string;
  minibio?: string;
  image?: string;
}

const TeamMemberCard = ({ name, role, category, minibio, image }: TeamMemberCardProps) => {
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
          {image
            ? <img src={image} alt={name} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><User className="h-8 w-8 text-white" /></div>
          }
        </div>
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-muted-foreground mb-3">{role}</p>
        {minibio && <p className="text-sm text-muted-foreground mb-3">{minibio}</p>}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
          {category}
        </span>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
