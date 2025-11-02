"use client";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden py-4">
      {/* Background image with enhanced overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/person-painting-wall-with-blue-paint-roller.jpg')",
        }}
      />

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 via-teal-800/70 to-transparent dark:from-slate-900/95 dark:via-slate-800/85" />

      {/* Main content container */}
      <div className="w-full px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] w-full max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <motion.div
            className="text-left lg:text-left space-y-8 flex-1 lg:max-w-none max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-flex items-center px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-2xl">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Professional Service Since 1988
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white drop-shadow-2xl text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform Spaces With{" "}
              <span className="text-amber-400">Exceptional Painting</span>
            </motion.h1>
            {/* <motion.span
              className="block text-slate-900 dark:text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Professional
            </motion.span>
            <motion.span
              className="block text-amber-500 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Painting
            </motion.span>
            <motion.span
              className="block text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Contractors
            </motion.span> */}

            {/* Subtitle */}
            <motion.p
              className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Transforming spaces with precision, passion, and unmatched
              excellence since 1988. Your vision, our expertise.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { number: "6000+", label: "Projects Completed" },
                { number: "35+", label: "Years Experience" },
                { number: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80 uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-1/4 w-6 h-6 bg-amber-400 rounded-full shadow-lg"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-1/3 w-4 h-4 bg-teal-400 rounded-full shadow-lg"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          opacity: [0.4, 0.9, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full shadow-lg"
        animate={{
          y: [0, 25, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Curved bottom section */}
      <div className="absolute -bottom-12 md:-bottom-10 left-0 right-0 h-32">
        <svg viewBox="0 0 1440 120" className="w-full h-full">
          <path
            fill="currentColor"
            className="text-white dark:text-gray-950"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
