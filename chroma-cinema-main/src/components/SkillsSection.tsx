import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";
import content from "@/data/content.json";
import { Film, Palette, Sparkles, Smartphone, Volume2, Users } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  film: Film,
  sparkles: Sparkles,
  smartphone: Smartphone,
  volume: Volume2,
  users: Users,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * easeOut));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span>{displayValue}</span>;
}

function SkillBar({ skill, index, isInView }: { 
  skill: { name: string; percentage: number; icon: string }; 
  index: number; 
  isInView: boolean;
}) {
  const Icon = iconMap[skill.icon] || Sparkles;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(skill.percentage);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.percentage, index]);

  return (
    <motion.div
      variants={itemVariants}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-glow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-2xl font-bold gradient-text">
          <AnimatedCounter value={skill.percentage} isInView={isInView} />%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
          style={{
            boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--primary)/0.05),transparent_60%)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              My
              <span className="gradient-text"> Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Years of experience honing my craft across various aspects of video production and post-production.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {content.skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
