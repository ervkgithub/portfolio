import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { trackResumeDownload } from "../../utils/analytics";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

function AppBanner() {
  const [activeTheme] = useThemeSwitcher();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="flex flex-col sm:justify-between items-center sm:flex-row mt-5 md:mt-2"
    >
      <div className="w-full md:w-1/3 text-left">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.1,
          }}
          className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
        >
          Hi, I am Vijay Kumar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.2,
          }}
          className="font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200 min-h-24 md:min-h-20 lg:min-h-24 xl:min-h-28"
        >
          <TypeAnimation
            sequence={[
              "Senior Frontend Engineer | React | Next.js",
              1500,
              "Building Scalable, Production-Grade Web Apps",
              1500,
              "Frontend System Design & Architecture Expert",
              1500,
              "Performance Optimization at Scale",
              1500,
              "TypeScript & Modern JavaScript Specialist",
              1500,
              "AI-Driven Frontend Experiences",
              1500,
              "Integrating AI into Modern Web Applications",
              1500,
              "Crafting Intelligent & Adaptive UI Systems",
              1500,
              "Scalable UI Architecture for Global Products",
              1500,
              "Delivering Seamless & High-Performance UX",
              1500,
            ]}
            wrapper="span"
            speed={10}
            repeat={Infinity}
          />
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.3,
          }}
          className="flex justify-center sm:block"
        >
          <a
            download="Vijay_Kumar_Senior_Frontend_Engineer.pdf"
            href="/files/Vijay_Kumar_Senior_Frontend_Engineer.pdf"
            onClick={() => trackResumeDownload()}
            className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-1 focus:ring-indigo-900 duration-500"
            aria-label="Download Resume"
          >
            <FiArrowDownCircle className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100"></FiArrowDownCircle>
            <span className="text-sm sm:text-lg duration-100">Download CV</span>
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={
            activeTheme === "dark"
              ? "/images/developer.svg"
              : "/images/developer-dark.svg"
          }
          alt="Developer"
          className="w-full h-auto"
          loading="lazy"
          width={970}
          height={500}
        />
      </motion.div>
    </motion.section>
  );
}

export default AppBanner;
