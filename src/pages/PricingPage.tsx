import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { AnimatedSection, staggerContainer, staggerItem } from '@/components/AnimatedComponents';
import { Check, X, Zap, Crown, Building2, Rocket, ArrowRight, Sparkles, Star, Globe, Shield, BarChart3, Users, Headphones, Monitor, Lock, TrendingUp, UserCheck } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Country data with region mapping
const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'india' },
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'usa' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'europe' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'uae' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'australia' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'canada' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'usa' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'usa' },
];

const regionalPricing = {
  india: { currency: '₹', prices: ['999', '4,999', '6,999', '9,999', '19,999'] },
  usa: { currency: '$', prices: ['19', '69', '99', '149', '299'] },
  europe: { currency: '€', prices: ['19', '65', '95', '139', '279'] },
  uae: { currency: 'AED', prices: ['99', '299', '499', '799', '1,499'] },
  australia: { currency: 'AUD $', prices: ['29', '99', '149', '229', '449'] },
  canada: { currency: 'CAD $', prices: ['29', '99', '149', '229', '449'] },
};

// Razorpay payment links — replace with actual links
const razorpayLinks: Record<string, string> = {
  Starter: 'https://rzp.io/l/starter-plan',
  Growth: 'https://rzp.io/l/growth-plan',
  Professional: 'https://rzp.io/l/professional-plan',
  Business: 'https://rzp.io/l/business-plan',
  Enterprise: 'https://rzp.io/l/enterprise-plan',
};

// Template variables for future messaging
export const planTemplates = {
  generateMessage: (planName: string, amount: string, dueDate: string, paymentLink: string) =>
    `Plan: ${planName}\nAmount: ${amount}\nDue Date: ${dueDate}\nPayment Link: ${paymentLink}`,
};

const pricingPlans = [
  {
    name: 'Starter',
    description: 'For individuals & small projects',
    icon: Zap,
    popular: false,
    features: [
      { name: 'Hosting included', included: true },
      { name: 'Monthly maintenance', included: true },
      { name: 'Basic security', included: true },
      { name: 'Standard support', included: true },
      { name: 'Priority support', included: false },
      { name: 'Performance optimization', included: false },
      { name: 'SEO', included: false },
      { name: 'Analytics integration', included: false },
      { name: 'Dedicated support', included: false },
      { name: 'Custom features', included: false },
    ],
    cta: 'Start Service',
  },
  {
    name: 'Growth',
    description: 'Best for growing businesses',
    icon: Rocket,
    popular: true,
    features: [
      { name: 'Everything in Starter', included: true },
      { name: 'Priority support', included: true },
      { name: 'Performance optimization', included: true },
      { name: 'Basic SEO', included: true },
      { name: 'Weekly backups', included: true },
      { name: 'Advanced security', included: false },
      { name: 'Speed optimization', included: false },
      { name: 'Analytics integration', included: false },
      { name: 'Dedicated support', included: false },
      { name: 'Custom features', included: false },
    ],
    cta: 'Activate Plan',
  },
  {
    name: 'Professional',
    description: 'For serious digital presence',
    icon: Crown,
    popular: false,
    features: [
      { name: 'Everything in Growth', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Speed optimization', included: true },
      { name: 'Analytics integration', included: true },
      { name: 'Monthly reports', included: true },
      { name: 'Conversion optimization', included: false },
      { name: 'Performance audits', included: false },
      { name: 'Dedicated support', included: false },
      { name: 'Custom features', included: false },
      { name: 'Account manager', included: false },
    ],
    cta: 'Activate Plan',
  },
  {
    name: 'Business',
    description: 'Complete business solution',
    icon: Building2,
    popular: false,
    features: [
      { name: 'Everything in Professional', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Conversion optimization', included: true },
      { name: 'Performance audits', included: true },
      { name: 'Priority queue', included: true },
      { name: 'Custom features', included: false },
      { name: 'SLA-based support', included: false },
      { name: 'Advanced infrastructure', included: false },
      { name: 'Account manager', included: false },
      { name: 'Custom integrations', included: false },
    ],
    cta: 'Activate Plan',
  },
  {
    name: 'Enterprise',
    description: 'White-glove managed service',
    icon: Sparkles,
    popular: false,
    features: [
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom features', included: true },
      { name: 'SLA-based support', included: true },
      { name: 'Advanced infrastructure', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Real-time monitoring', included: true },
      { name: 'Multi-site management', included: true },
      { name: 'Priority escalation', included: true },
      { name: 'Quarterly strategy calls', included: true },
      { name: 'White-label options', included: true },
    ],
    cta: 'Activate Plan',
  },
];

const comparisonFeatures = [
  { feature: 'Hosting', starter: '✓', growth: '✓', professional: '✓', business: '✓', enterprise: '✓' },
  { feature: 'Maintenance', starter: 'Monthly', growth: 'Bi-weekly', professional: 'Weekly', business: 'Daily', enterprise: 'Continuous' },
  { feature: 'Support Level', starter: 'Standard', growth: 'Priority', professional: 'Priority+', business: 'Dedicated', enterprise: 'SLA-based' },
  { feature: 'Security Level', starter: 'Basic', growth: 'Basic', professional: 'Advanced', business: 'Advanced', enterprise: 'Enterprise' },
  { feature: 'Performance Optimization', starter: '—', growth: '✓', professional: '✓', business: '✓', enterprise: '✓' },
  { feature: 'SEO', starter: '—', growth: 'Basic', professional: 'Advanced', business: 'Advanced', enterprise: 'Full' },
  { feature: 'Analytics', starter: '—', growth: '—', professional: '✓', business: '✓', enterprise: 'Custom' },
  { feature: 'Custom Features', starter: '—', growth: '—', professional: '—', business: '—', enterprise: '✓' },
  { feature: 'Account Manager', starter: '—', growth: '—', professional: '—', business: '—', enterprise: 'Dedicated' },
  { feature: 'Uptime SLA', starter: '99%', growth: '99.5%', professional: '99.9%', business: '99.9%', enterprise: '99.99%' },
];

const howItWorks = [
  { step: '01', title: 'Choose Your Plan', description: 'Pick a plan that fits your needs. All plans are monthly — cancel anytime.', icon: Star },
  { step: '02', title: 'We Set Up & Manage', description: 'Our team handles everything: hosting, security, performance, and updates.', icon: Monitor },
  { step: '03', title: 'You Focus on Business', description: 'While we manage your website, you focus on growing your business.', icon: TrendingUp },
];

const trustMetrics = [
  { icon: Shield, value: '99.9%', label: 'Uptime Guarantee' },
  { icon: Lock, value: 'Secure', label: 'Hosting & SSL' },
  { icon: BarChart3, value: '24/7', label: 'Continuous Monitoring' },
  { icon: Headphones, value: 'Pro', label: 'Professional Support' },
  { icon: Users, value: '50+', label: 'Websites Managed' },
];

const PricingPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];
  const pricing = regionalPricing[currentCountry.region as keyof typeof regionalPricing];

  const formatPrice = (priceIndex: number) => {
    const price = pricing.prices[priceIndex];
    return `${pricing.currency}${price}`;
  };

  return (
    <>
      <Helmet>
        <title>Pricing — Managed Website Plans | SyedWebDev</title>
        <meta name="description" content="Transparent monthly website plans starting at ₹999. Hosting, maintenance, security & support included. Cancel anytime." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 wave-bg opacity-30" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ duration: 1.5 }} className="absolute top-20 right-20 w-72 h-72 bg-cyan/20 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="absolute bottom-20 left-20 w-72 h-72 bg-magenta/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-6">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span className="text-sm text-muted-foreground">Simple, Transparent Pricing</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl md:text-6xl font-display font-bold mb-6">
              Choose Your <span className="gradient-text">Service Plan</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              All plans are billed monthly. Cancel anytime. No hidden fees.
            </motion.p>

            {/* Country Selector */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex justify-center">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[280px] h-14 text-lg glass border-border/50 hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyan" />
                    <SelectValue>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{currentCountry.flag}</span>
                        <span>{currentCountry.name}</span>
                      </span>
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[400px] bg-background/95 backdrop-blur-xl border-border">
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Anchor */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center glass rounded-2xl p-8 border border-cyan/20">
            <p className="text-lg md:text-xl text-muted-foreground">
              Custom website projects typically cost <span className="text-foreground font-semibold">₹20,000 – ₹60,000+</span>.
            </p>
            <p className="text-lg md:text-xl mt-2">
              With SyedWebDev, get <span className="gradient-text font-bold">continuous management</span> starting at just <span className="text-foreground font-bold">₹999/month</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                whileHover={{ y: -10, scale: plan.popular ? 1.04 : 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/20 to-background border-2 border-primary shadow-2xl shadow-primary/20 lg:scale-105 z-10'
                    : 'glass border border-border/50'
                }`}
              >
                {plan.popular && (
                  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan to-magenta rounded-full">
                    <span className="text-sm font-semibold text-primary-foreground">⭐ Most Popular</span>
                  </motion.div>
                )}

                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: index * 0.1 + 0.2, type: "spring" }} className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-gradient-to-br from-cyan to-magenta' : 'bg-secondary'}`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                </motion.div>

                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-sm text-muted-foreground">Per Month</span>
                  <motion.div key={`${selectedCountry}-${index}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold gradient-text">{formatPrice(index)}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </motion.div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li key={feature.name} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: featureIndex * 0.03 + 0.3 }} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>{feature.name}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={plan.popular ? 'hero' : 'heroOutline'}
                    className="w-full group"
                    asChild
                  >
                    <a href={razorpayLinks[plan.name]} target="_blank" rel="noopener noreferrer">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-sm text-muted-foreground mt-8">All plans are billed monthly. Cancel anytime. No long-term contracts.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Three Simple <span className="gradient-text">Steps</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
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

      {/* Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Trusted <span className="gradient-text">Infrastructure</span>
            </h2>
          </AnimatedSection>
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

      {/* SaaS Dashboard Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">DASHBOARD</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Your <span className="gradient-text">Service Dashboard</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Manage your subscription, track performance, and view billing — all in one place.</p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl border border-border/50 overflow-hidden">
              {/* Mock title bar */}
              <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-sm text-muted-foreground">dashboard.syedwebdev.com</span>
              </div>
              <div className="p-8 space-y-6">
                {/* Plan info */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Plan</div>
                    <div className="text-2xl font-display font-bold gradient-text">Growth Plan</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">Active</div>
                </div>
                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Billing Status</div>
                    <div className="font-semibold text-foreground">Paid</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Renewal Date</div>
                    <div className="font-semibold text-foreground">Aug 12, 2026</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="font-semibold text-foreground">₹4,999/mo</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="font-semibold text-green-500">99.98%</div>
                  </div>
                </div>
                {/* Action */}
                <Button variant="hero" className="w-full">Make Payment</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Plan <span className="gradient-text">Comparison</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A detailed breakdown of what's included in each service tier.</p>
          </AnimatedSection>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-x-auto">
            <table className="w-full min-w-[900px] glass rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-6 font-display font-bold">Feature</th>
                  <th className="p-6 font-display font-bold text-center">Starter</th>
                  <th className="p-6 font-display font-bold text-center bg-primary/10">Growth ⭐</th>
                  <th className="p-6 font-display font-bold text-center">Professional</th>
                  <th className="p-6 font-display font-bold text-center">Business</th>
                  <th className="p-6 font-display font-bold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    viewport={{ once: true }}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-6 font-medium">{row.feature}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.starter}</td>
                    <td className="p-6 text-center bg-primary/5 text-foreground font-medium">{row.growth}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.professional}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.business}</td>
                    <td className="p-6 text-center text-muted-foreground">{row.enterprise}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-transparent to-magenta/10" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center glass rounded-2xl p-12 border border-border/50 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Need a <span className="gradient-text">Custom Solution?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every business is unique. Contact us for a tailored service plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="xl" className="group" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/start-your-website">Start Service</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" />Cancel anytime</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" />No setup fees</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" />Response within 24h</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PricingPage;
