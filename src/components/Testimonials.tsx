import { Star } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { Reveal } from '@/components/cinematic/Reveal';
import { Parallax } from '@/components/cinematic/Parallax';
import { Tilt3D } from '@/components/cinematic/Tilt3D';

const testimonials = [
  {
    quote: "Syed Web delivered an enterprise platform that exceeded all our expectations. Their team's expertise and professionalism are unmatched.",
    author: 'Sarah Johnson',
    role: 'CEO, TechVentures',
    rating: 5,
  },
  {
    quote: 'The LMS they built transformed our educational offerings. Student engagement increased by 300% within the first month.',
    author: 'Michael Chen',
    role: 'Founder, EduLearn',
    rating: 5,
  },
  {
    quote: 'Our healthcare portal is now the industry standard. Exceptional attention to security, compliance, and user experience.',
    author: 'Emma Williams',
    role: 'Marketing Director, HealthFirst',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <Parallax speed={-0.25} className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-magenta/5 rounded-full blur-3xl" />
      </Parallax>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            TESTIMONIALS
          </span>
          <AnimatedHeading className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </AnimatedHeading>
        </Reveal>

        {/* Testimonials Grid */}
        <Reveal stagger={0.12} direction="up" distance={50} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Tilt3D key={index} max={8} lift={4} className="h-full">
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-cyan/30 transition-all duration-300 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-cyan text-cyan" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Tilt3D>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
