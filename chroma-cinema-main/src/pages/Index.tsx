import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import content from "@/data/content.json";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.personal.name,
    jobTitle: content.personal.title,
    description: content.personal.bio,
    url: window.location.origin,
  };

  return (
    <>
      <Helmet>
        <title>{content.personal.name} — {content.personal.title} | DaVinci Resolve & CapCut Specialist</title>
        <meta
          name="description"
          content={`Cinematic portfolio of ${content.personal.name}, video editor with ${content.personal.yearsExperience} years experience. Showreel, projects, services, and contact.`}
        />
        <meta property="og:title" content={`${content.personal.name} — ${content.personal.title}`} />
        <meta property="og:description" content={content.personal.subtitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
