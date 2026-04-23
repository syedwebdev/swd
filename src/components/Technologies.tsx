import { AnimatedHeading } from '@/components/AnimatedHeading';

const techStack = {
  frontend: [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Tailwind', icon: '🎨' },
  ],
  backend: [
    { name: 'Node.js', icon: '💚' },
    { name: 'Python', icon: '🐍' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Java', icon: '☕' },
    { name: 'Go', icon: '🔵' },
  ],
  database: [
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Firebase', icon: '🔥' },
  ],
  cloud: [
    { name: 'AWS', icon: '☁️' },
    { name: 'Google Cloud', icon: '🌐' },
    { name: 'Azure', icon: '📘' },
    { name: 'Vercel', icon: '▲' },
    { name: 'Docker', icon: '🐳' },
  ],
};

const additionalTech = [
  'REST & GraphQL APIs',
  'CI/CD Pipelines',
  'WCAG Accessibility',
  'GDPR Compliance',
  'SSL & Security',
  'Performance Optimization',
  'Microservices',
  'Serverless',
];

export const Technologies = () => {
  return (
    <section id="technologies" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan/5 to-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            TECHNOLOGIES
          </span>
          <AnimatedHeading className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Powered by <span className="gradient-text">Modern Tech Stack</span>
          </AnimatedHeading>
          <p className="text-muted-foreground text-lg">
            We leverage the latest technologies and industry best practices to build scalable, secure, and high-performance digital solutions.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(techStack).map(([category, techs], index) => (
            <div key={category} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {category}
              </h3>
              <div className="space-y-3">
                {techs.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="text-lg">{tech.icon}</span>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="flex flex-wrap justify-center gap-3">
          {additionalTech.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground hover:border-cyan/50 hover:text-foreground transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
