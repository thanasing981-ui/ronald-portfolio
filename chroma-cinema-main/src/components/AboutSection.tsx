import { motion } from "framer-motion";
import content from "@/data/content.json";
import { useInView } from "@/hooks/use-in-view";
import { Film, Check } from "lucide-react";

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
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ✅ TOOL COLORS
const toolColors = [
  "from-primary to-accent",
  "from-secondary to-primary",
  "from-pink-500 to-purple-500",
  "from-cyan-400 to-blue-500",
  "from-orange-400 to-red-500",
];

export function AboutSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
      aria-label="About section"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* HEADER */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About Me
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Crafting Stories Through
              <span className="gradient-text">
                {" "}
                Professional Editing
              </span>
            </h2>
          </motion.div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* BIO */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.personal.bio}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Film className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <div className="font-semibold text-foreground">
                    {content.personal.yearsExperience}+ Years
                    Experience
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Available Worldwide
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SERVICES */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                What I Edit
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.services.map((service, index) => (
                  <motion.div
                    key={service}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : {}
                    }
                    transition={{
                      delay: 0.3 + index * 0.1,
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>

                    <span className="text-sm text-foreground">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* TOOLS SECTION */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-muted-foreground mb-8 text-lg">
              Editing & AI Workflow
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {content.skills.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="group relative"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                >
                  {/* GLOW */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      toolColors[index % toolColors.length]
                    } rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity`}
                  />

                  {/* CARD */}
                  <div className="relative px-8 py-4 rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-all duration-300">
                    <span
                      className={`text-lg font-semibold bg-gradient-to-r ${
                        toolColors[index % toolColors.length]
                      } bg-clip-text text-transparent`}
                    >
                      {tool.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}