import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BetaTesterButton from '@/components/BetaTesterButton';
import { CAPI_APRENDE_TUTORIAL_URL } from '@/lib/capiAprende';

// Chamada para o tutorial e para o grupo de beta-testers do Capi-Aprende.
const CapiAprendeBeta = () => (
  <Card className="border-primary/30 bg-primary/5">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <FlaskConical className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-bold">Seja beta-tester do Capi-Aprende</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Veja o tutorial e peça um login de visitante para testar o aplicativo e contar o que achou.
      </p>
      <div className="flex flex-col gap-2">
        <Button asChild size="sm">
          <a href={CAPI_APRENDE_TUTORIAL_URL} target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4 mr-2" />
            Ver o tutorial
            <ExternalLink className="h-3 w-3 ml-2" />
          </a>
        </Button>
        <BetaTesterButton size="sm" variant="outline" />
        <Link to="/capi-aprende" className="text-xs text-primary hover:underline text-center mt-1">
          Saiba mais
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default CapiAprendeBeta;
