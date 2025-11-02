"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative border-t-2 border-gray-300 dark:border-gray-700 py-20 bg-linear-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 via-green-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Contact us today to get started on your next project. We&apos;re
            here to help bring your vision to life!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                info@firstclassprojects.co.za
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                0861 125 277
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                19 Jan Smuts Avenue, Parktown, Johannesburg, South Africa
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="text-center">
          <Button
            size="lg"
            className="bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow transition-all"
          >
            Get Started Today
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
