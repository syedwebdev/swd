import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, BadgeCheck, Zap } from 'lucide-react';
import { AnimatedHeading } from '@/components/AnimatedHeading';

export const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedHeading className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Activate Your Plan?</span>
          </AnimatedHeading>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get continuous website management, security, and performance — starting at just ₹999/month.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/pricing">
                Activate Plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="group" asChild>
              <Link to="/start-your-website">
                <Zap className="w-5 h-5" />
                Start Service
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-cyan" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-cyan" />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
