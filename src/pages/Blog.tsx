
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import blogData from '@/data/blog.json';

const Blog = () => {
  const today = new Date().toISOString().slice(0, 10);
  const allPosts = [...blogData]
    .filter((p) => p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));
  const featured = allPosts.filter((p) => p.featured).slice(0, 3);
  const categories = [...new Set(allPosts.map((p) => p.category))];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog & Notícias</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Acompanhe nossas últimas atividades, conquistas, aprendizados e
            todas as novidades da equipe Capibots.
          </p>
        </div>
      </section>

      {/* Featured Carousel */}
      <FeaturedCarousel posts={featured} />

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {allPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-32 bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
                    {post.image.startsWith('/') ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">{post.image}</span>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-white/20 text-white border-white/30 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    {post.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-400 text-yellow-900 border-0 text-xs">★</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                      <span className="ml-auto">{post.readTime}</span>
                    </div>

                    <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <Button asChild size="sm" className="w-full text-xs h-8">
                      <Link to={`/blog/${post.id}`}>
                        Ler Mais
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Fique por Dentro</h2>
            <p className="text-muted-foreground mb-8">
              Não perca nenhuma novidade da equipe Capibots! Siga nosso Instagram
              para acompanhar todos os nossos projetos e conquistas.
            </p>
            <Button asChild size="lg">
              <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer">
                Seguir no Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
