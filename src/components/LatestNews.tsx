import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import blogData from '@/data/blog.json';

const LatestNews = () => {
  const today = new Date().toISOString().slice(0, 10);
  const posts = [...blogData]
    .filter((p) => p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Últimas Notícias</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique por dentro das nossas últimas atividades, conquistas e participações em eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <h3 className="text-base font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/blog/${post.id}`}>
                    Ler Mais
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/blog">Ver Todas as Notícias</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
