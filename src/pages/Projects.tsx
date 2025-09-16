import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code, Layout, Layers } from 'lucide-react';
import FireParticles from '../components/FireParticles';
// import { useSoundContext } from '../context/SoundContext';

interface Project {
  id: number;
  name: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  language: string;
  technologies: string[];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  // const { playSoundEffect } = useSoundContext();
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Static projects data
  const projects: Project[] = [
    {
      id: 1,
      name: "Job Board Application",
      description: "A platform where employers can post jobs and candidates can apply. Features include user authentication, job posting, application management, and search functionality.",
      githubUrl: "https://github.com/aryankuttarmare14/job-board-app",
      liveUrl: "https://job-board-app-coral.vercel.app/",
      language: "JavaScript",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"]
    },
    {
      id: 2,
      name: "Agricultural Field Monitoring Using AI",
      description: "Smart monitoring system to analyze crop health and environmental conditions using AI/ML algorithms. Provides real-time insights for farmers.",
      githubUrl: "https://github.com/aryankuttarmare14/Agricultural-Field-Monitoring-Using-AI",
      liveUrl: "https://drive.google.com/file/d/1XeDZce8i1xxlbR5O6BST1GZq7jW08er9/view?usp=drive_link",
      language: "Python",
      technologies: ["Python", "TensorFlow","React", "Flask", "YOLOv8" , "OpenCV", "NumPy"]
    },
    {
      id: 3,
      name: "Quiz Master App",
      description: "A fun quiz app with authentication and leaderboard. Users can create accounts, take quizzes, and compete on the leaderboard.",
      githubUrl: "https://github.com/aryankuttarmare14/quiz-master-app",
      liveUrl: "https://masterquizhub.netlify.app/",
      language: "JavaScript",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "Authentication"]
    },
    {
      id: 4,
      name: "Sorting Algorithms",
      description: "Implemented multiple sorting algorithms including Quick Sort, Merge Sort, Heap Sort, and analyzed their performance with time complexity comparisons.",
      githubUrl: "https://github.com/aryankuttarmare14/Sorting_Algorithm_Technique",
      liveUrl: "https://quo.vercel.app",
      language: "C++",
      technologies: ["C++", "Data Structures", "Algorithms", "Performance Analysis"]
    },
    {
      id: 5,
      name: "Weather App",
      description: "A web app that fetches real-time weather data for any city. Features include current weather, forecast, and location-based weather updates.",
      githubUrl: "https://github.com/aryankuttarmare14/WeatherApp",
      liveUrl: "https://weather-app-demo.vercel.app",
      language: "JavaScript",
      technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS", "Fetch API"]
    },
    {
      id: 6,
      name: "Tic-Tac-Toe Game",
      description: "Interactive 2-player game with responsive UI. Features include game state management, win detection, and responsive design for all devices.",
      githubUrl: "https://github.com/aryankuttarmare14/Tic-tac-toe-game",
      liveUrl: "https://tic-tac-toe-demo.vercel.app",
      language: "JavaScript",
      technologies: ["JavaScript", "HTML", "CSS", "Responsive Design"]
    }
  ];

  // Get unique languages for filtering
  const languages = ['all', ...new Set(projects.map(project => project.language).filter(Boolean))];

  // Filter projects by language
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.language === activeFilter);

  // Get a language-specific color
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      'C++': 'bg-blue-600',
      HTML: 'bg-orange-500',
      CSS: 'bg-purple-500',
      // Add more languages as needed
      default: 'bg-gray-400'
    };
    
    return colors[language] || colors.default;
  };

  const handleFilterClick = (filter: string) => {
    // playSoundEffect('menuClick');
    setActiveFilter(filter);
  };

  return (
    <div className="pt-20 pb-20 relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <FireParticles intensity="low" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/95 via-charcoal-900/80 to-charcoal-900/95 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-flame-500 font-japanese inline-block font-semibold text-lg mb-2"
            >
              {/* 炎の作品 */}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-display font-bold text-white mb-4"
            >
              Dev Projects
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={headerInView ? { width: '60px' } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-flame-500 mx-auto mb-6"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-charcoal-200 max-w-2xl mx-auto mb-12"
            >
              Discover my projects, each crafted with precision and attention to detail —
              like the futurestic art of Development.
            </motion.p>
            
            {/* Language Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {languages.map((language, index) => (
                <motion.button
                  key={language || `unknown-${index}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterClick(language)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                    activeFilter === language
                      ? 'bg-flame-500 text-white shadow-flame'
                      : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700'
                  }`}
                >
                  {language === 'all' ? 'All Projects' : language || 'Other'}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Project Grid */}
          <motion.section
            ref={projectsRef}
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-charcoal-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-charcoal-700 hover:border-flame-700 transition-colors duration-300 shadow-lg group"
                  >
                    {/* Project Card Header */}
                    <div className="relative h-40 bg-gradient-to-br from-charcoal-700 to-charcoal-900 overflow-hidden">
                      {/* Project Icon */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-flame-500 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                          {project.language === 'JavaScript' ? (
                            <Layout className="w-24 h-24" />
                          ) : project.language === 'Python' ? (
                            <Code className="w-24 h-24" />
                          ) : project.language === 'C++' ? (
                            <Layers className="w-24 h-24" />
                          ) : (
                            <Code className="w-24 h-24" />
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Language Tag */}
                      {project.language && (
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center bg-charcoal-900/70 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className={`h-3 w-3 rounded-full ${getLanguageColor(project.language)} mr-2`}></span>
                            <span className="text-xs font-medium text-white">{project.language}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Flame Effect on Hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-flame-500/30 to-transparent pointer-events-none"
                      />
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-flame-400 transition-colors duration-300">
                        {project.name}
                      </h3>
                      
                      <p className="text-charcoal-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-1 bg-charcoal-700/70 text-charcoal-300 rounded-md text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-charcoal-700/70 text-charcoal-300 rounded-md text-xs">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Links */}
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-charcoal-700 hover:bg-charcoal-600 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                            // onMouseEnter={() => playSoundEffect('menuClick')}
                          >
                            <Github className="h-4 w-4" /> 
                            Repository
                          </motion.a>
                        )}
                        
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-flame-600 hover:bg-flame-500 text-white rounded-md transition-colors duration-300 text-sm font-medium"
                            // onMouseEnter={() => playSoundEffect('menuClick')}
                          >
                            <ExternalLink className="h-4 w-4" /> 
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Projects;