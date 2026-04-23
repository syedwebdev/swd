import { motion } from 'framer-motion';
import { Children, ReactNode, isValidElement, cloneElement } from 'react';

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
}

const wordVariants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0 },
};

const Word = ({ children, i, delay }: { children: ReactNode; i: number; delay: number }) => (
  <span className="inline-block overflow-hidden align-bottom mr-[0.25em]">
    <motion.span
      className="inline-block"
      variants={wordVariants}
      transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

// Split a string node into word spans, returning [nodes, nextIndex]
const splitText = (text: string, startIndex: number, delay: number, wrapClass?: string) => {
  const words = text.split(/\s+/).filter(Boolean);
  const nodes = words.map((w, i) => (
    <Word key={`${startIndex}-${i}`} i={startIndex + i} delay={delay}>
      {wrapClass ? <span className={wrapClass}>{w}</span> : w}
    </Word>
  ));
  return { nodes, next: startIndex + words.length };
};

export const AnimatedHeading = ({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
}: AnimatedHeadingProps) => {
  let counter = 0;
  const out: ReactNode[] = [];

  Children.forEach(children, (child, idx) => {
    if (typeof child === 'string') {
      const { nodes, next } = splitText(child, counter, delay);
      out.push(...nodes);
      counter = next;
    } else if (isValidElement(child)) {
      // For nested element (e.g. <span className="gradient-text">), split its inner text and apply class to each word
      const inner = child.props.children;
      const cls = (child.props as { className?: string }).className;
      if (typeof inner === 'string') {
        const { nodes, next } = splitText(inner, counter, delay, cls);
        out.push(...nodes);
        counter = next;
      } else {
        out.push(
          <Word key={`el-${idx}`} i={counter} delay={delay}>
            {cloneElement(child)}
          </Word>
        );
        counter += 1;
      }
    }
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Tag className={className}>{out}</Tag>
    </motion.div>
  );
};
