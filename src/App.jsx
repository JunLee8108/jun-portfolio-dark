import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Download,
  Circle,
  Code2,
  Sparkles,
  Zap,
  Palette,
} from "lucide-react";
import supabase from "./services/supabaseClient";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projects, setProjects] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAllProjects, setShowAllProjects] = useState(false);

  // Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("Project")
          .select("*")
          .order("number", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Fixed: Rotating text for hero section
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Frontend Developer", "UI Engineer", "Creative Coder"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleFeatures = (projectId) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Modal handlers
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    // Delay to ensure smooth animation
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalImage(null);
      document.body.style.overflow = "unset";
    }, 300);
  };

  // 2. Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from("Message").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      // Success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-cyan-500/20">
      {/* Image Modal */}
      {modalImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-sm transition-all duration-300 ease-out ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-4xl transition-all duration-300 ease-out transform ${
              isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={modalImage}
                alt="Project preview"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed px-8 top-0 w-full bg-gray-950/90 backdrop-blur-sm z-40 border-b border-gray-900">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              className="text-lg font-medium tracking-tight"
            >
              Portfolio<span className="text-cyan-500">.</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                { name: "About", id: "about" },
                { name: "Work", id: "work" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950 border-b border-gray-900">
            <div className="px-8 py-6 space-y-4">
              {["About", "Work", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-8 pt-24">
        <div className="max-w-6xl mx-auto w-full pb-10 sm:pb-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Fixed: Rotating roles */}
              <div className="mb-6 h-6 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateY(-${currentRole * 1.5}rem)`,
                  }}
                >
                  {roles.map((role, index) => (
                    <p
                      key={index}
                      className="text-gray-500 tracking-wide text-sm uppercase h-6 leading-6"
                    >
                      {role}
                    </p>
                  ))}
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light leading-tight mb-8">
                Hi, I'm Jeong.
              </h1>
              <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed">
                Specialized in building exceptional websites and applications
                with modern technologies and clean, functional design.
              </p>

              <div className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("work")}
                  className="group flex items-center space-x-2 text-sm uppercase tracking-wider"
                >
                  <span>View Work</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                <a
                  href="https://zqwnmkwetnivvyqtmrjp.supabase.co/storage/v1/object/public/resume/Jeong%20Hyun%20Lee%20-%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Right side - Stats and Status */}
            <div className="lg:pl-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-3 text-sm">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-gray-500">
                    Available for full-time positions
                  </span>
                </div>

                <div className="pt-8 border-t border-gray-800">
                  <p className="text-gray-500 text-sm mb-4">
                    Currently working with
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="text-sm">React</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm">Next.js</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <p className="text-gray-500 mb-4 tracking-wide text-sm uppercase">
                About
              </p>
              <h2
                className="text-4xl lg:text-5xl font-light mb-8"
                style={{ lineHeight: "1.2" }}
              >
                Turning Ideas Into
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Digital Reality
                </span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  I'm a frontend developer with a passion for creating clean,
                  functional, and user-centered digital experiences. With a
                  background in both design and development, I bridge the gap
                  between aesthetics and functionality.
                </p>
                <p>
                  My approach focuses on simplicity and clarity, ensuring that
                  every project not only looks good but also provides value to
                  its users. I believe in the power of minimalism and thoughtful
                  design decisions.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community.
                </p>
              </div>

              <div className="mt-12">
                <a
                  href="https://zqwnmkwetnivvyqtmrjp.supabase.co/storage/v1/object/public/resume/Jeong%20Hyun%20Lee%20-%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-wider border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            <div>
              <p className="text-gray-500 mb-8 tracking-wide text-sm uppercase">
                Expertise
              </p>

              {/* Core Skills with Visual Emphasis */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
                  <Code2 className="w-8 h-8 text-cyan-500 mb-4" />
                  <h3 className="text-base font-medium mb-2">Frontend</h3>
                  <p className="text-gray-500 text-sm">
                    React, Next.js, TypeScript, Vue.js
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                  <Palette className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="text-base font-medium mb-2">Design</h3>
                  <p className="text-gray-500 text-sm">
                    UI/UX, Figma, Design Systems
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-green-500/50 transition-colors">
                  <Zap className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="text-base font-medium mb-2">Performance</h3>
                  <p className="text-gray-500 text-sm">
                    Optimization, SEO, Core Web Vitals
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-orange-500/50 transition-colors">
                  <Sparkles className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="text-base font-medium mb-2">Innovation</h3>
                  <p className="text-gray-500 text-sm">
                    WebGL, Three.js, Animation
                  </p>
                </div>
              </div>

              {/* Detailed Skills List */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm uppercase tracking-wide text-gray-400">
                      Languages & Frameworks
                    </h4>
                    <span className="text-xs text-cyan-500">Expert</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Vue.js",
                      "HTML/CSS",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 bg-gray-900/50 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm uppercase tracking-wide text-gray-400">
                      Tools & Methods
                    </h4>
                    <span className="text-xs text-purple-500">Advanced</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Git",
                      "Webpack",
                      "Docker",
                      "CI/CD",
                      "Testing",
                      "Agile",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 bg-gray-900/50 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <p className="text-gray-500 mb-4 tracking-wide text-sm uppercase">
              Selected Work
            </p>
            <h2 className="text-4xl font-light tracking-[0.01em]">
              Recent Projects
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <>
              <div className="space-y-32">
                {(showAllProjects ? projects : projects.slice(0, 3)).map(
                  (project, index) => (
                    <div key={project.id} className="group">
                      <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
                        {/* Project Number */}
                        <div className="lg:col-span-1">
                          <span className="text-gray-600 text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Left Column: Title, Description, Links */}
                        <div className="lg:col-span-5">
                          <h3 className="text-3xl font-medium mb-4 group-hover:text-cyan-500 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Links */}
                          <div className="flex items-center space-x-6">
                            {project.project_link && (
                              <a
                                href={project.project_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-sm uppercase tracking-wider group/link hover:text-cyan-500 transition-colors"
                              >
                                <span>View Project</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                              </a>
                            )}
                            {project.github_link && (
                              <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-white transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span>Github</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right Column: Features and Tech Stack */}
                        <div className="lg:col-span-5">
                          {/* Features List */}
                          {project.feature && project.feature.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                                Key Features
                              </h4>
                              <ul className="space-y-1.5">
                                {(expandedFeatures[project.id]
                                  ? project.feature
                                  : project.feature.slice(0, 3)
                                ).map((feat, featIndex) => (
                                  <li
                                    key={featIndex}
                                    className="flex items-start space-x-2 text-gray-300"
                                  >
                                    <span className="text-cyan-500 text-sm mt-0.5">
                                      •
                                    </span>
                                    <span className="text-sm leading-relaxed">
                                      {feat}
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              {/* Show more/less button */}
                              {project.feature.length > 3 && (
                                <button
                                  onClick={() => toggleFeatures(project.id)}
                                  className="mt-3 text-xs text-gray-500 hover:text-cyan-500 transition-colors uppercase tracking-wider flex items-center space-x-1"
                                >
                                  <span>
                                    {expandedFeatures[project.id]
                                      ? "Show less"
                                      : `View all ${project.feature.length} features`}
                                  </span>
                                  <ArrowUpRight
                                    className={`w-3 h-3 transition-transform ${
                                      expandedFeatures[project.id]
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                              )}
                            </div>
                          )}

                          {/* Tech Stack */}
                          {project.tech && project.tech.length > 0 && (
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                                Tech Stack
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-xs text-gray-400 px-2.5 py-1 border border-gray-800 rounded-full hover:border-gray-600 transition-colors"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Year - Far right */}
                        <div className="lg:col-span-1 lg:text-right">
                          <span className="text-gray-600 text-sm">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Image Gallery - Unchanged */}
                      {project.images && project.images.length > 0 && (
                        <div className="lg:pl-[8.333%]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {project.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden group/img cursor-pointer"
                                onClick={() => openModal(image)}
                              >
                                <img
                                  src={image}
                                  alt={`${project.title} ${imgIndex + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* View More/Less Projects Button */}
              {projects.length > 3 && (
                <div className="mt-30 text-center">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <span className="relative flex items-center space-x-3">
                      <span className="text-sm uppercase tracking-wider">
                        {showAllProjects
                          ? "Show Less"
                          : `Want to see ${projects.length - 3} more projects?`}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          showAllProjects
                            ? "rotate-180"
                            : "group-hover:translate-x-1 group-hover:-translate-y-1"
                        }`}
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact Section - Increased height */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-32 px-8"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-2xl">
            <p className="text-gray-500 mb-4 tracking-wide text-sm uppercase">
              Contact
            </p>
            <h2 className="text-4xl font-light tracking-[0.01em] mb-8">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              I'm currently available for full-time opportunities. Feel free to
              reach out if you have an interesting project in mind.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
                  Email
                </p>
                <a
                  href="mailto:lejhn1@gmail.com"
                  className="text-xl hover:text-cyan-500 transition-colors"
                >
                  lejhn1@gmail.com
                </a>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
                  Phone
                </p>
                <a
                  href="tel:+12107051438"
                  className="text-xl hover:text-cyan-500 transition-colors"
                >
                  +1 (210) 705-1438
                </a>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-4">
                  Social
                </p>
                <div className="flex space-x-6">
                  <a
                    href="https://github.com/JunLee8108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Github</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/jeong-hyun-lee-a5362319a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="mailto:lejhn1@gmail.com"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-800">
                <p className="text-gray-500 mb-4">Or send me a quick message</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    disabled={isSubmitting}
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    disabled={isSubmitting}
                  />

                  {/* Status messages */}
                  {submitStatus === "success" && (
                    <div className="text-green-500 text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="text-red-500 text-sm">
                      Failed to send message. Please try again or email
                      directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg text-sm uppercase tracking-wider font-medium transition-colors ${
                      isSubmitting
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-950 hover:bg-gray-200"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 Portfolio. All rights reserved.</p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
