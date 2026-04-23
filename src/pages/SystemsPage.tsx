import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, ChevronRight, ChevronDown, Grid3X3, Sparkles, Zap, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedComponents';
import { categories, type SystemCategory, type SystemItem } from '@/data/systemsData';
import { Tilt3D } from '@/components/cinematic/Tilt3D';
import { getCategoryImage } from '@/data/systemImages';

const ITEMS_PER_PAGE = 20;

const Highlight = ({ text, query }: { text: string; query: string }) => {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const SystemCard = ({ system, delay, onGetSystem, query, image }: { system: SystemItem; delay: number; onGetSystem: (s: SystemItem) => void; query: string; image: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(delay * 0.03, 0.5) }}
      className="group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--cyan)/0.15)] transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={system.name}
          loading="lazy"
          width={640}
          height={360}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          <Highlight text={system.name} query={query} />
        </h3>
        <p className={`text-sm text-muted-foreground mb-3 ${expanded ? '' : 'line-clamp-2'}`}>
          <Highlight text={system.description} query={query} />
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-3 space-y-2 border-t border-border/40 mt-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Key Features</h4>
                <ul className="space-y-1.5">
                  {['Production-ready codebase', 'Modern responsive UI', 'API & database integration', 'Fully customizable'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {system.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="default" className="flex-1 text-xs" onClick={() => onGetSystem(system)}>
            Get System
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Hide Details' : 'View Details'}
            <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ category, onClick, delay, query }: { category: SystemCategory; onClick: () => void; delay: number; query: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: delay * 0.08 }}
  >
    <Tilt3D max={9} lift={6} className="group cursor-pointer relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--cyan)/0.15)] h-full" >
      <div onClick={onClick} className="absolute inset-0 z-10" aria-hidden />
      <div className="text-4xl mb-4">{category.icon}</div>
      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
        <Highlight text={category.name} query={query} />
      </h3>
      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
        {category.count} Systems
      </span>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        <Highlight text={category.description} query={query} />
      </p>
      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all relative z-20" onClick={onClick}>
        View Systems <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </Tilt3D>
  </motion.div>
);

export default function SystemsPage() {
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [pricingSystem, setPricingSystem] = useState<SystemItem | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const totalSystems = categories.reduce((sum, c) => sum + c.count, 0);

  const filteredSystems = useMemo(() => {
    if (!selectedCategory) return [];
    const q = searchQuery.toLowerCase();
    return q
      ? selectedCategory.systems.filter(s =>
          s.name.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q))
        )
      : selectedCategory.systems;
  }, [selectedCategory, searchQuery]);

  const handleExplore = () => {
    categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategoryClick = (cat: SystemCategory) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      <Helmet>
        <title>Explore Systems | SyedWebDev</title>
        <meta name="description" content={`Browse ${totalSystems}+ ready-to-deploy systems across 10 categories.`} />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              {totalSystems}+ Ready-to-Deploy Systems
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Explore Our Systems
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse {categories.length} categories of production-ready systems. From AI tools to e-commerce — find, customize, and deploy.
            </p>
            <Button variant="hero" size="xl" onClick={handleExplore}>
              <Grid3X3 className="w-5 h-5 mr-2" />
              Explore Systems
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Breadcrumb & Content */}
      <section ref={categoryRef} className="pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <button onClick={handleBack} className="hover:text-primary transition-colors">Systems</button>
            {selectedCategory && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">{selectedCategory.name}</span>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              /* Categories Grid */
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      System Categories
                    </h2>
                    <span className="text-sm text-muted-foreground">{categories.length} Categories</span>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search categories..."
                      value={categoryQuery}
                      onChange={e => setCategoryQuery(e.target.value)}
                      className="pl-10 bg-card/50 border-border/50"
                    />
                  </div>
                </div>
                {(() => {
                  const q = categoryQuery.toLowerCase().trim();
                  const filtered = q
                    ? categories.filter(c =>
                        c.name.toLowerCase().includes(q) ||
                        c.description.toLowerCase().includes(q) ||
                        c.systems.some(s => s.name.toLowerCase().includes(q))
                      )
                    : categories;
                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-20 text-muted-foreground">
                        <Zap className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No categories match your search.</p>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filtered.map((cat, i) => (
                        <CategoryCard key={cat.id} category={cat} onClick={() => handleCategoryClick(cat)} delay={i} query={categoryQuery} />
                      ))}
                    </div>
                  );
                })()}
              </motion.div>
            ) : (
              /* Systems Grid */
              <motion.div
                key="systems"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Cinematic category banner */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden mb-8 border border-border/50 hover:border-primary/40 transition-colors aspect-[3/1] sm:aspect-[4/1]"
                >
                  <img
                    src={getCategoryImage(selectedCategory.id)}
                    alt={`${selectedCategory.name} banner`}
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 max-w-2xl">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cyan font-semibold mb-3">
                      <span className="text-xl">{selectedCategory.icon}</span>
                      Category
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      <span className="gradient-text">{selectedCategory.name}</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                      {selectedCategory.description}
                    </p>
                  </div>
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack}>
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                    <div>
                      <p className="text-sm text-muted-foreground">{filteredSystems.length} systems found</p>
                    </div>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search systems..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 bg-card/50 border-border/50"
                    />
                  </div>
                </div>

                {filteredSystems.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No systems match your search.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredSystems.slice(0, visibleCount).map((system, i) => (
                        <SystemCard
                          key={system.slug}
                          system={system}
                          delay={i}
                          onGetSystem={setPricingSystem}
                          query={searchQuery}
                          image={getCategoryImage(selectedCategory.id)}
                        />
                      ))}
                    </div>
                    {visibleCount < filteredSystems.length && (
                      <div className="text-center mt-10">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                        >
                          Load More ({filteredSystems.length - visibleCount} remaining)
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Dialog open={!!pricingSystem} onOpenChange={(o) => !o && setPricingSystem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Subscribe to unlock {pricingSystem?.name}
            </DialogTitle>
            <DialogDescription className="text-center">
              This system is part of our premium library. Choose a plan to get instant access, deployment support, and ongoing updates.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 py-2">
            {['Access to all production-ready systems', 'White-glove deployment & customization', 'Priority support & continuous updates'].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/pricing" onClick={() => setPricingSystem(null)}>
                View Pricing Plans
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPricingSystem(null)} className="w-full">
              Maybe later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
