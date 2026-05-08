import { motion } from "framer-motion";
import { ParticleBackground } from "./ParticleBackground";
import { ThreeDIcons } from "./ThreeDIcons";
import { Button } from "./ui/button";
import { Play, ChevronDown } from "lucide-react";
import content from "@/data/content.json";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.08),transparent_50%)]" />
      
      <ParticleBackground />
      
      {/* Film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* 3D Icons */}
      <ThreeDIcons />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge - with higher z-index and proper spacing */}
          <motion.div variants={itemVariants} className="mb-6 mt-24 md:mt-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium relative z-50">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6"
          >
            <span className="gradient-text">{content.personal.title}</span>
            <br />
            <span className="text-foreground">
              {content.personal.tagline}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            {content.personal.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="neon"
              size="xl"
              onClick={() => scrollToSection("contact")}
              className="group"
            >
              Hire Me
              <motion.span
                className="inline-block"
                animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Button>
            <Button
              variant="neonOutline"
              size="xl"
              onClick={() => scrollToSection("projects")}
            >
              <Play className="w-5 h-5" />
              Watch Showreel
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
