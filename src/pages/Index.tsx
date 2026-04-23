import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/AnimatedComponents';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, User, Building2, ShoppingCart, Newspaper, GraduationCap, Users, Layers, Building, Stethoscope, Landmark, ShoppingBag, Plane, Home, Factory, Shield, Lock, BarChart3, Headphones, Monitor, TrendingUp, Zap } from 'lucide-react';

const services = [
  { icon: User, title: 'Personal & Identity', description: 'Portfolios, resumes, blogs, personal brands.' },
  { icon: Building2, title: 'Business & Corporate', description: 'Corporate sites, startups, agencies, B2B/B2C.' },
  { icon: ShoppingCart, title: 'E-Commerce & Retail', description: 'Online stores, marketplaces, subscriptions.' },
  { icon: Newspaper, title: 'Content & Media', description: 'News portals, magazines, streaming.' },
  { icon: GraduationCap, title: 'Education & Learning', description: 'LMS platforms, online courses, schools.' },
  { icon: Users, title: 'Community & Social', description: 'Social networks, forums, memberships.' },
  { icon: Layers, title: 'SaaS & Platforms', description: 'Web apps, dashboards, analytics.' },
  { icon: Building, title: 'Industry-Specific', description: 'Healthcare, fintech, government.' },
];

const industries = [
  { icon: Stethoscope, name: 'Healthcare' }, { icon: Landmark, name: 'Finance' },
  { icon: GraduationCap, name: 'Education' }, { icon: ShoppingBag, name: 'E-Commerce' },
  { icon: Plane, name: 'Travel' }, { icon: Home, name: 'Real Estate' },
  { icon: Factory, name: 'Manufacturing' }, { icon: Building2, name: 'Government' },
];

const testimonials = [
  { quote: "SyedWebDev manages our entire web infrastructure. We haven't worried about downtime in over a year.", author: 'Sarah Johnson', role: 'CEO, TechVentures' },
  { quote: 'The managed service model freed our team to focus on growth instead of website issues.', author: 'Michael Chen', role: 'Founder, EduLearn' },
  { quote: 'Professional, reliable, and always available. This is how web services should work.', author: 'Emma Williams', role: 'Director, HealthFirst' },
];

const trustMetrics = [
  { icon: Shield, value: '99.9%', label: 'Uptime' },
  { icon: Lock, value: 'Secure', label: 'Hosting' },
  { icon: BarChart3, value: '24/7', label: 'Monitoring' },
  { icon: Headphones, value: 'Pro', label: 'Support' },
  { icon: Users, value: '50+', label: 'Sites Managed' },
];

const howItWorks = [
  { step: '01', title: 'Choose Your Plan', description: 'Pick a plan that fits your needs.', icon: Star },
  { step: '02', title: 'We Set Up & Manage', description: 'We handle hosting, security & updates.', icon: Monitor },
  { step: '03', title: 'You Focus on Business', description: 'Grow while we manage your site.', icon: TrendingUp },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SyedWebDev — Managed Website Infrastructure & Services</title>
        <meta name="description" content="Fully managed, secure, and scalable website services. Hosting, maintenance, security & support — starting at ₹999/month." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <PageTransition>
          <Hero />
          <StatsBar />

          {/* Trust Metrics */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {trustMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 glass rounded-2xl border border-border/50"
                  >
                    <metric.icon className="w-8 h-8 text-cyan mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold gradient-text">{metric.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">HOW IT WORKS</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Three Simple <span className="gradient-text">Steps</span></h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {howItWorks.map((item, index) => (
                  <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="text-center">
                    <motion.div whileHover={{ scale: 1.1 }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan to-magenta flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <div className="text-sm font-bold text-cyan mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Value Anchor */}
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center glass rounded-2xl p-8 border border-cyan/20">
                <p className="text-lg md:text-xl text-muted-foreground">
                  Custom website projects typically cost <span className="text-foreground font-semibold">₹20,000 – ₹60,000+</span>.
                </p>
                <p className="text-lg md:text-xl mt-2">
                  With SyedWebDev, get <span className="gradient-text font-bold">continuous management</span> starting at just <span className="text-foreground font-bold">₹999/month</span>.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/pricing">View Plans <ArrowRight className="w-5 h-5 ml-2" /></Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">OUR SERVICES</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">100+ Website Categories, <span className="gradient-text">One Partner</span></h2>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {services.map((service, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.03, y: -5 }} className="gradient-border p-6 rounded-2xl bg-card">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-cyan" />
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="gradient" size="lg" asChild><Link to="/services">Explore All Services <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Industries Preview */}
          <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">INDUSTRIES</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Solutions for <span className="gradient-text">Every Industry</span></h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {industries.map((industry, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl bg-card border border-border hover:border-cyan/50 text-center transition-all">
                    <industry.icon className="w-10 h-10 text-cyan mx-auto mb-3" />
                    <h3 className="font-semibold">{industry.name}</h3>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline" size="lg" asChild><Link to="/industries">View All Industries</Link></Button>
              </div>
            </div>
          </section>

          {/* Dashboard Preview */}
          <section className="py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">DASHBOARD</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Your <span className="gradient-text">Service Dashboard</span></h2>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
                <div className="glass rounded-2xl border border-border/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-4 text-sm text-muted-foreground">dashboard.syedwebdev.com</span>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Current Plan</div>
                        <div className="text-2xl font-display font-bold gradient-text">Growth Plan</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">Active</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/50"><div className="text-sm text-muted-foreground">Billing</div><div className="font-semibold text-foreground">Paid</div></div>
                      <div className="p-4 rounded-xl bg-secondary/50"><div className="text-sm text-muted-foreground">Renewal</div><div className="font-semibold text-foreground">Aug 12, 2026</div></div>
                      <div className="p-4 rounded-xl bg-secondary/50"><div className="text-sm text-muted-foreground">Amount</div><div className="font-semibold text-foreground">₹4,999/mo</div></div>
                      <div className="p-4 rounded-xl bg-secondary/50"><div className="text-sm text-muted-foreground">Uptime</div><div className="font-semibold text-green-500">99.98%</div></div>
                    </div>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/pricing">Activate Plan</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">TESTIMONIALS</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Trusted by <span className="gradient-text">Industry Leaders</span></h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }} className="p-8 rounded-2xl bg-card border border-border">
                    <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-cyan text-cyan" />)}</div>
                    <blockquote className="text-foreground mb-6">"{t.quote}"</blockquote>
                    <div className="font-semibold">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10" />
            <div className="container mx-auto px-4 lg:px-8 relative text-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to <span className="gradient-text">Activate Your Plan?</span></h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">Get continuous website management, security, and performance — starting at just ₹999/month.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="hero" size="xl" asChild><Link to="/pricing">View Plans <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="heroOutline" size="xl" asChild><Link to="/start-your-website"><Zap className="w-5 h-5" /> Start Service</Link></Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
};

export default Index;
