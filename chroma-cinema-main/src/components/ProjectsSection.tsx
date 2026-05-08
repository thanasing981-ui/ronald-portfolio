import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import content from "@/data/content.json";
import { useState, useMemo } from "react";

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

const categoryOrder = [
  "Script Videos",
  "Talking Head",
  "UGC",
  "Real Estate",
  "Automobile",
  "Corporate",
  "AI Videos",
];

// ✅ HIGH QUALITY YOUTUBE THUMBNAIL
const getYouTubeThumbnail = (url?: string) => {
  if (!url) return "/placeholder.svg";

  const parts = url.split("/embed/");

  if (parts.length < 2) {
    return "/placeholder.svg";
  }

  const videoId = parts[1].split("?")[0];

  // ✅ HD Thumbnail
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export function ProjectsSection() {
  const { ref, isInView } = useInView(0.1);

  // ✅ DEFAULT FIRST TAB
  const [activeCategory, setActiveCategory] =
    useState("Script Videos");

  const [activeVideo, setActiveVideo] =
    useState<string | null>(null);

  // ✅ SHOW ONLY AVAILABLE CATEGORIES
  const categories = useMemo(() => {
    const availableCategories = new Set(
      content.projects.map((p: any) => p.category)
    );

    return categoryOrder.filter((cat) =>
      availableCategories.has(cat)
    );
  }, []);

  // ✅ FILTER VIDEOS
  const filteredProjects = useMemo(() => {
    return content.projects.filter(
      (p: any) => p.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-primary/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* VIDEOS GRID */}
          <div className="flex flex-wrap justify-center gap-6">
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                className="cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  if (project.videoUrl) {
                    setActiveVideo(project.videoUrl);
                  }
                }}
              >
                <div className="relative w-[220px] aspect-[9/16] rounded-xl overflow-hidden bg-black">
                  <img
                    src={getYouTubeThumbnail(project.videoUrl)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-black text-2xl">
                      ▶
                    </div>
                  </div>
                </div>

                {/* TITLE */}
                <p className="text-center mt-2 text-sm">
                  {project.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* VIDEO POPUP */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-[90%] max-w-[360px] aspect-[9/16] bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo}
              title="Video Player"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}