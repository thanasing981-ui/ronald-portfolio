import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Mail, Sparkles } from "lucide-react";
import content from "@/data/content.json";

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

export function ContactSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--secondary)/0.05),transparent_60%)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Create
              <span className="gradient-text"> Together</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your vision to life.
            </p>
          </motion.div>

          {/* Prominent email CTA */}
          <motion.div variants={itemVariants}>
            <motion.a
              href={`mailto:${content.personal.email}?subject=Project Inquiry`}
              className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 border-2 border-primary/40 hover:border-primary transition-all duration-500 group relative overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: "0 0 60px hsl(var(--primary) / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shadow-lg shadow-primary/20">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                
                <p className="text-lg text-muted-foreground mb-3">
                  Mail me to start your project
                </p>
                
                <p className="text-2xl md:text-3xl font-bold text-primary group-hover:text-primary/90 transition-colors tracking-wide">
                  {content.personal.email}
                </p>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span>Click to open your email client</span>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Response time */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-sm text-muted-foreground"
          >
            I typically respond within 24 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
