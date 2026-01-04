import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import HireMeModal from "../HireMeModal";
import logoLight from "../../public/images/logo-light.png";
import logoDark from "../../public/images/logo-dark.png";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { trackHireMeClick } from "../../utils/analytics";

function AppHeader({ visitor }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();
  const router = useRouter();

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  function showHireMeModal() {
    if (!showModal) {
      // Track the Hire Vijay click
      trackHireMeClick("header");
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowModal(false);
    }
  }

  function closeMenu() {
    setShowMenu(false);
  }

  // Helper function to check if a route is active
  function isActive(path) {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
  }

  // Helper function to get active link classes
  function getLinkClasses(path) {
    const baseClasses =
      "block text-left text-lg font-medium sm:mx-4 mb-2 sm:py-2 transition-colors duration-200";
    const activeClasses = isActive(path)
      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
      : "text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light";
    return `${baseClasses} ${activeClasses}`;
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
    >
      {/* Header */}
      <div className="z-10 block sm:flex sm:justify-between sm:items-center px-4 lg:px-10">
        {/* Header menu links and small screen hamburger menu */}
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="block w-[100px] lg:w-[auto]">
              {activeTheme === "dark" ? (
                <Image
                  src={logoDark}
                  className="w-36 cursor-pointer relative -left-[22px]"
                  alt="Dark Logo"
                  width={150}
                  height={120}
                />
              ) : (
                <Image
                  src={logoLight}
                  className="w-36 cursor-pointer relative -left-[22px]"
                  alt="Dark Logo"
                  width={150}
                  height={120}
                />
              )}
            </Link>
          </div>

          {visitor?.name ? (
            <div className="pr-6">
              <p className="text-sm text-secondary-dark dark:text-ternary-light">
                Welcome, <span className="font-semibold">{visitor.name}</span>
              </p>
            </div>
          ) : null}

          {/* Theme switcher small screen */}
          <button
            type="button"
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="block sm:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </button>

          {/* Small screen hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
              >
                {showMenu ? (
                  <FiX className="text-3xl" />
                ) : (
                  <FiMenu className="text-3xl" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? "block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none"
              : "hidden"
          }
        >
          <div
            className={`${getLinkClasses(
              "/projects"
            )} border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark`}
          >
            <Link href="/projects" aria-label="Projects" onClick={closeMenu}>
              Projects
            </Link>
          </div>
          <div
            className={`${getLinkClasses(
              "/about"
            )} border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark`}
          >
            <Link href="/about" aria-label="About Me" onClick={closeMenu}>
              About Me
            </Link>
          </div>

          <div
            className={`${getLinkClasses(
              "/contact"
            )} border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark`}
          >
            <Link href="/contact" aria-label="Contact" onClick={closeMenu}>
              Contact
            </Link>
          </div>
          <div
            className={`${getLinkClasses(
              "/blog"
            )} border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark`}
          >
            <Link href="/blog" aria-label="Blog" onClick={closeMenu}>
              Blog
            </Link>
          </div>
          <div className="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
            <button
              onClick={showHireMeModal}
              className="w-[fit-content] font-general-medium sm:hidden block text-left text-md bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300"
              aria-label="Hire Vijay Button"
            >
              Hire Vijay
            </button>
          </div>
        </div>

        {/* Header links large screen */}
        <div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
          <div className={getLinkClasses("/about")} aria-label="About Me">
            <Link href="/about">About Me</Link>
          </div>
          <div className={getLinkClasses("/projects")} aria-label="Projects">
            <Link href="/projects">Projects</Link>
          </div>
          
          <div className={getLinkClasses("/contact")} aria-label="Contact">
            <Link href="/contact">Contact</Link>
          </div>
          <div className={getLinkClasses("/blog")} aria-label="Blog">
            <Link href="/blog">Blog</Link>
          </div>
        </div>

        {/* Header right section buttons */}
        <div className="hidden sm:flex justify-between items-center flex-col md:flex-row">
          <div className="hidden md:flex">
            <button
              onClick={showHireMeModal}
              className="text-md font-general-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
              aria-label="Hire Vijay Button"
            >
              Hire Vijay
            </button>
          </div>

          {/* Theme switcher large screen */}
          <button
            type="button"
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === "dark" ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </button>
        </div>
      </div>
      <div>
        {showModal ? (
          <HireMeModal onClose={showHireMeModal} onRequest={showHireMeModal} />
        ) : null}
        {showModal ? showHireMeModal : null}
      </div>
    </motion.nav>
  );
}

export default AppHeader;
