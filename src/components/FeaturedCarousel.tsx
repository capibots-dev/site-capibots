import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  featured: boolean;
}

interface FeaturedCarouselProps {
  posts: Post[];
}

const FeaturedCarousel = ({ posts }: FeaturedCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + posts.length) % posts.length);
  const next = () => setCurrent((c) => (c + 1) % posts.length);
  const post = posts[current];

  return (
    <div className="relative w-full bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Destaques</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[280px]">
          {/* Image */}
          <div className="h-56 lg:h-72 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            {post.image.startsWith('/') ? (
              <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <span className="text-8xl">{post.image}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">{post.title}</h2>
            <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
            <Button asChild className="w-fit">
              <Link to={`/blog/${post.id}`}>
                Ler Artigo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prev} className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
