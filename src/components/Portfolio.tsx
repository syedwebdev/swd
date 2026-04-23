import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { Reveal } from '@/components/cinematic/Reveal';
import { Parallax } from '@/components/cinematic/Parallax';
import { Tilt3D } from '@/components/cinematic/Tilt3D';
import portfolioSaas from '@/assets/portfolio-saas.jpg';
import portfolioHealthcare from '@/assets/portfolio-healthcare.jpg';
import portfolioEducation from '@/assets/portfolio-education.jpg';
import portfolioEcommerce from '@/assets/portfolio-ecommerce.jpg';

const projects = [
  { title: 'TechCorp Enterprise Platform', category: 'SaaS', image: portfolioSaas },
  { title: 'HealthFirst Medical Portal', category: 'Healthcare', image: portfolioHealthcare },
  { title: 'EduLearn LMS Platform', category: 'Education', image: portfolioEducation },
  { title: 'ShopMax E-Commerce', category: 'E-Commerce', image: portfolioEcommerce },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-secondary/30 relative overflow-hidden">
      <Parallax speed={-0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full blur-3xl" />
      </Parallax>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            PORTFOLIO
          </span>
          <AnimatedHeading className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Latest Work</span>
          </AnimatedHeading>
          <p className="text-muted-foreground text-lg">
            Explore our recent projects showcasing innovation and excellence across industries.
          </p>
        </Reveal>

        <Reveal stagger={0.15} direction="up" distance={60} className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <Tilt3D key={index} max={9} lift={8} className="h-full">
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-cyan/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--cyan)/0.4)] h-full">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs text-cyan font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-1">{project.title}</h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="glass" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Tilt3D>
          ))}
        </Reveal>

        <Reveal direction="zoom" className="text-center">
          <Button variant="gradient" size="lg">
            View All Projects
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
