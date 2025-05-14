"use client"; // Indicates that this component is a client component in Next.js
import React, { useState, useEffect } from "react"; // Import necessary React hooks
import Image from "next/image"; // Import Next.js Image component for optimized images
import styles from "../page.module.css"; // Import CSS module for styling
import CountUp from "react-countup"; // Import CountUp for animated number counting
// import Dashboardpage from "../dasboard/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome for icons
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Import social media icons
import {
  faSchool,
  faPiggyBank,
  faBuilding,
  faHospital,
  faIndustry,
  faStore,
} from "@fortawesome/free-solid-svg-icons"; // Import industry icons
import Link from "next/link";

import { useRouter } from "next/navigation";





const HomePage = () => {
  // State variables
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for text/image rotation
  const [isHostMenuVisible, setHostMenuVisible] = useState(false); // Toggle visibility of host menu
  const [showNexusPoints, setShowNexusPoints] = useState(false); // Show Nexus points on scroll
  const [isFooterVisible, setFooterVisible] = useState(false); // Toggle footer visibility
  const [animateFooter, setAnimateFooter] = useState(false); // Toggle footer animation
  // const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state

  // Mobile menu state
  const [user, setUser] = useState(null); // User state for logged-in user
  // const router = useRouter(); // Next.js router for navigation




  // Fetch the user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle logout
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signIn");
  };


  // Texts and images for the rotating section
  const texts = [
    {
      text: "Transform your information into action with AI companion",
      images: ["/images/image1.jpg", "/images/image2.jpg"],
    },
    {
      text: "Find what you need when you need it with AI companion",
      images: ["/images/image3.jpg", "/images/image4.jpg"],
    },
  ];

  // Effect for rotating texts and images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle through texts
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll event handler
  const handleScroll = () => {
    const sectionTop = document
      .getElementById("nexusSection")
      ?.getBoundingClientRect().top;
    if (sectionTop && sectionTop < window.innerHeight && sectionTop > 0) {
      setShowNexusPoints(true); // Show Nexus points when section is in view
    } else {
      setShowNexusPoints(false); // Hide Nexus points when section is out of view
    }

    const footerElement = document.querySelector("footer");
    if (footerElement) {
      const footerTop = footerElement.getBoundingClientRect().top;
      const isInView = footerTop < window.innerHeight && footerTop > 0;

      if (isInView) {
        setAnimateFooter(true); // Trigger animation when footer is in view
      } else {
        setAnimateFooter(false); // Reset animation when footer is out of view
      }

      setFooterVisible(isInView); // Update footer visibility state
    }
  };

  // Effect to add and cleanup scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  // Toggle function for host menu visibility
  const toggleHostMenu = () => {
    setHostMenuVisible(!isHostMenuVisible);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const router = useRouter();

  // const handleNavigation = () => {
  //   // Programmatically navigate to the '/dasboard' route
  //   router.push('/dasboard');
  // };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className="hidden lg:block">
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/NEXUS_bg.png"
              alt="Nexus Logo"
              width={100}
              height={20}
              className={`${styles.logoImage} rounded-full shadow-2xl p-2 m-4`}
            />
          </div>
          <nav className={styles.nav}>
            <ul className="">

            <Link href="/nexusmeeting">
            <li style={{ cursor: "pointer" }}>Products</li>
            </Link>
            
             <Link href="/plain">
             <li style={{ cursor: "pointer" }}>Solutions</li>
             </Link>

              
              {/* <button onClick={handleNavigation}>
                <li style={{ cursor: "pointer" }}>Dashboard</li>
                </button> */}
             
      
   





              <Link href="/contact">
                <li
                  style={{ cursor: "pointer" }}
                  className=" hover:text-[#0070f3] "
                >
                  Contact Us
                </li>
              </Link>
            </ul>
          </nav>

          <div className={styles.headerOptions}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchBar}
            />
            <button
              style={{ cursor: "pointer" }}
              className={styles.headerButton}
            >
              Support
            </button>
            <button
              style={{ cursor: "pointer" }}
              className={styles.headerButton}
            >
              Request a Demo
            </button>

            <div className={styles.verticalLine}></div>

            <div className={styles.dropdownMenu}>
              <Link href="http://localhost:3002/">
                <button
                  className={"${styles.headerButton} hover:text-blue-600"}
                >
                  Join
                </button>
              </Link>

              <Link href="http://localhost:3002/">
                <div
                  className={"${styles.headerButton} hover:text-blue-600"}
                  onMouseEnter={toggleHostMenu}
                  onMouseLeave={toggleHostMenu}
                >
                  Host
                  {isHostMenuVisible && (
                    <ul
                      style={{ cursor: "pointer" }}
                      className={styles.submenu}
                    >
                      <li>With Video On</li>
                      <li>With Video Off</li>
                      <li>Screen Share Only</li>
                    </ul>
                  )}
                </div>
              </Link>


              {/* <div className="./room">
                <Link href="/signIn">
                  <button
                    style={{ cursor: "pointer" }}
                    className={styles.headerButton}
                  >
                    Sign In
                  </button>
                </Link>
              </div> */}

              <div>
  {user ? (
    <>
      <span className={styles.userName}>
        Hi, {user.firstName}
      </span>
      <button
        className={styles.headerButton}
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  ) : (
    <>
      <Link href="/signIn">
        <button
          style={{ cursor: "pointer" }}
          className={styles.headerButton}
        >
          Sign In
        </button>
      </Link>
      <Link href="/signup">
        <button
          style={{ cursor: "pointer" }}
          className={`${styles.headerButton} hover:text-blue-600`}
        >
          Sign Up
        </button>
      </Link>
    </>
  )}
</div>       



            </div>
          </div>
        </header>
      </div>

      {/* mobile div */}
      <div className="flex   justify-between lg:hidden">
        {/* logo */}
        <div className="size-full">
          <div style={{ cursor: "pointer" }} className={styles.logoContainer}>
            <Image
              src="/images/NEXUS_bg.png"
              alt="Nexus Logo"
              width={100}
              height={20}
              className={`${styles.logoImage} rounded-full p-2 m-4`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
        <Link href="http://localhost:3002/">
          <div>
            <h1
              style={{ cursor: "pointer" }}
              className="text-xl font-bold hover:text-blue-600"
            >
              Join
            </h1>
          </div>
          </Link>
          <Link href="http://localhost:3002/">
          <div
            style={{ cursor: "pointer" }}
            className="text-lg font-semibold hover:text-blue-600"
          >
            Host
          </div>
          </Link>
          <div>
            {/* Mobile menu toggle */}
            <button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-col justify-end lg:hidden ">
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className={`${styles.mobileMenu} bg-white border-b border-gray-300 shadow-lg`}
          >
            <ul style={{ cursor: "pointer" }} className="space-y-4 py-4 px-6">


            <Link href="/nexusmeeting">
              <li className="border-b hover:text-[#0070f3] cursor-pointer border-gray-200 pb-2">
                Products
              </li>
            </Link>

            <Link href="/plain">
              <li className="border-b hover:text-[#0070f3]  border-gray-200 pb-2">
                Solutions
              </li>
              </Link>
              {/* <button onClick={handleNavigation}> <li className="border-b hover:text-[#0070f3] border-gray-200 pb-2">
                Dashboard
              </li> </button> */}


             

              <li className="border-b hover:text-[#0070f3] border-gray-200 pb-2">
                Plans & Pricing
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Main Content Section */}

      <div className="hidden lg:flex justify-center items-center bg-[#f8f8f8] ">
        <div className="flex-col">
          <main className={styles.mainContent}>
            <div className={styles.textSection}>
              <h1 className={styles.dynamicText}>
                {texts[currentIndex].text.split("AI companion")[0]}
                <span className={styles.highlight}>AI companion</span>
              </h1>
              <p className={styles.largeFont}>
                Accomplish more with NEXUS Workplace: Your AI-first work
                platform featuring AI Companion 2.0, included at no extra cost.
              </p>
              <div className={styles.buttons}>
                <button className={styles.primaryButton}>
                  Plans & Pricing
                </button>
                <button className={styles.secondaryButton}>
                  <span>Discover Nexus Workplace</span>
                </button>
              </div>
            </div>
          </main>
        </div>
        <div className="flex-col bg-[#f8f8f8] pr-8 max-w-xl">
          <div className="imageSection hidden lg:flex ">
            <div className={styles.imageWrapper}>
              <Image
                src={texts[currentIndex].images[0]}
                alt={`Image ${currentIndex * 2 + 1}`}
                width={100}
                height={100}
                className={`${styles.image} ${styles.fadeIn} size-100`}
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={texts[currentIndex].images[1]}
                alt={`Image ${currentIndex * 2 + 2}`}
                width={400}
                height={300}
                className={`${styles.imageSecond} ${styles.fadeIn} size-100`}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {/* Main Content Section mobile*/}
      <div className="flex-col space-x-2 p-4 justify-center lg:hidden">
        <h1 className="text-4xl font-bold py-4">
          {texts[currentIndex].text.split("AI companion")[0]}
          <span className={styles.highlight}>AI companion</span>
        </h1>
        <p className={styles.largeFont}>
          Accomplish more with NEXUS Workplace: Your AI-first work platform
          featuring AI Companion 2.0, included at no extra cost.
        </p>

        <div className="imageSection ">
          <div className={styles.imageWrapper}>
            <Image
              src={texts[currentIndex].images[0]}
              alt={`Image ${currentIndex * 2 + 1}`}
              width={400}
              height={300}
              className={`${styles.image} ${styles.fadeIn}`}
            />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={texts[currentIndex].images[1]}
              alt={`Image ${currentIndex * 2 + 2}`}
              width={400}
              height={300}
              className={`${styles.imageSecond} ${styles.fadeIn}`}
            />
          </div>
        </div>
      </div>

      {/* Curved Line Section */}
      <div className={styles.curvedLineContainer}>
        <svg className={styles.curvedLine} viewBox="0 0 100 10">
          <path
            d="M0 10 C 50 0, 50 0, 100 10"
            fill="none"
            stroke="#0070f3"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Nexus Section */}
      <div className="hidden md:block">
        <div className={styles.nexusContainer} id="nexusSection">
          <div className={styles.nexusLeft}>
            <h2 className={`${styles.nexusTitle} ${styles.nexusHeader}`}>
              NEXUS
            </h2>
            <h3>The AI-first work platform for human connection</h3>
            <ul className={styles.nexusPoints}>
              {showNexusPoints && (
                <div className={styles.pointsContainer}>
                  <div
                    className={`${styles.point} ${
                      showNexusPoints ? styles.animatePoint : ""
                    }`}
                  >
                    Nexus Workplace
                  </div>
                  <div
                    className={`${styles.point} ${
                      showNexusPoints ? styles.animatePoint : ""
                    }`}
                  >
                    AI Companion
                  </div>
                  <div
                    className={`${styles.point} ${
                      showNexusPoints ? styles.animatePoint : ""
                    }`}
                  >
                    Business Services
                  </div>
                  <div
                    className={`${styles.point} ${
                      showNexusPoints ? styles.animatePoint : ""
                    }`}
                  >
                    Developer Ecosystem
                  </div>
                </div>
              )}
            </ul>
          </div>
          <div className={styles.nexusRight}>
            <h2 className={styles.nexusTitle}>
              <span className={styles.blueText}>NEXUS</span>
              <span className={styles.blackText}> Workplace</span>
            </h2>
            <p>
              Make teamwork more meaningful across hybrid teams with modern
              collaboration solutions.
              <button className={styles.learnMoreButton}>Learn more</button>
            </p>
            <ul className={styles.nexusWorkplacePoints}>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>🗂️</span> Meetings
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>📅</span> Real Time Translation
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>💼</span> Productivity
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>💬</span> Team Chat
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>👥</span> Employee Engagement
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>📞</span> Phone
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>🏢</span> Flexible Workspaces
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>📧</span> Mail & Calendar
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>🛠️</span> Workvivo
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>🗓️</span> Scheduler
              </li>
              <li className={styles.nexusWorkplacePoint}>
                <span className={styles.icon}>📲</span> App Marketplace
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nexus Section mobile */}

      <div className="hidden md:hidden">
        <div
          className={`flex flex-col md:flex-row justify-between p-6 bg-gray-100`}
          id="nexusSection"
        >
          <div
            className={`md:w-1/2 p-4 bg-blue-600 text-white rounded-lg shadow-md`}
          >
            <h2 className="text-2xl font-bold mb-2">NEXUS</h2>
            <h3 className="text-lg mb-4">
              The AI-first work platform for human connection
            </h3>
            <ul className="space-y-2">
              {showNexusPoints && (
                <div className="flex flex-col space-y-2">
                  <div
                    className={`p-2 bg-white text-gray-800 rounded-lg shadow ${
                      showNexusPoints ? "animate-fadeIn" : ""
                    }`}
                  >
                    Nexus Workplace
                  </div>
                  <div
                    className={`p-2 bg-white text-gray-800 rounded-lg shadow ${
                      showNexusPoints ? "animate-fadeIn" : ""
                    }`}
                  >
                    AI Companion
                  </div>
                  <div
                    className={`p-2 bg-white text-gray-800 rounded-lg shadow ${
                      showNexusPoints ? "animate-fadeIn" : ""
                    }`}
                  >
                    Business Services
                  </div>
                  <div
                    className={`p-2 bg-white text-gray-800 rounded-lg shadow ${
                      showNexusPoints ? "animate-fadeIn" : ""
                    }`}
                  >
                    Developer Ecosystem
                  </div>
                </div>
              )}
            </ul>
          </div>
          <div className={`md:w-1/2 p-4 relative`}>
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-blue-500">NEXUS</span>
              <span className="text-black"> Workplace</span>
            </h2>
            <p className="mb-4">
              Make teamwork more meaningful across hybrid teams with modern
              collaboration solutions.
              <button className="mt-2 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300">
                Learn more
              </button>
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-xl">🗂️</span> Meetings
              </li>
              <li className="flex items-center">
                <span className="text-xl">📅</span> Real Time Translation
              </li>
              <li className="flex items-center">
                <span className="text-xl">💼</span> Productivity
              </li>
              <li className="flex items-center">
                <span className="text-xl">💬</span> Team Chat
              </li>
              <li className="flex items-center">
                <span className="text-xl">👥</span> Employee Engagement
              </li>
              <li className="flex items-center">
                <span className="text-xl">📞</span> Phone
              </li>
              <li className="flex items-center">
                <span className="text-xl">🏢</span> Flexible Workspaces
              </li>
              <li className="flex items-center">
                <span className="text-xl">📧</span> Mail & Calendar
              </li>
              <li className="flex items-center">
                <span className="text-xl">🛠️</span> Workvivo
              </li>
              <li className="flex items-center">
                <span className="text-xl">🗓️</span> Scheduler
              </li>
              <li className="flex items-center">
                <span className="text-xl">📲</span> App Marketplace
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Text Section */}
      <div className="hidden md:block">
        <div className={styles.videoTextSection}>
          <div className={styles.leftVideo}>
            <video className={styles.videoElement} controls>
              <source src="/nexus.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.rightText}>
            <h2 className={styles.heading}>
              The AI-first work platform for human connection
            </h2>
            <p className={styles.boldParagraph}>
              Work happy with AI Companion, real-time voice translation,
              reimagine teamwork, enhance customer relationships, and enable
              seamless experiences with a choice of third-party apps and
              integrations for best-in-class collaboration.
            </p>
            <button className={styles.ovalButton}>
              Discover the possibilities
            </button>
            <p className={styles.disclaimer}>
              *AI Companion is included at no additional cost with the paid
              services in your Nexus user account and may not be available for
              all regions and industry verticals. Some features not currently
              available across all regions or plans and are subject to change.
            </p>
          </div>
        </div>
      </div>

      {/* Video Text Section mobile*/}

      <div className="md:hidden">
        <div className={styles.videoTextSection}>
          {/* <div className={styles.leftVideo}>
            <video className={styles.videoElement} controls>
              <source src="/nexus.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}
          <div className={styles.rightText}>
            <h2 className={styles.heading}>
              The AI-first work platform for human connection
            </h2>
            <p className={styles.boldParagraph}>
              Work happy with AI Companion, real-time voice translation,
              reimagine teamwork, enhance customer relationships, and enable
              seamless experiences with a choice of third-party apps and
              integrations for best-in-class collaboration.
            </p>
            <button className={styles.ovalButton}>
              Discover the possibilities
            </button>
            <p className={styles.disclaimer}>
              *AI Companion is included at no additional cost with the paid
              services in your Nexus user account and may not be available for
              all regions and industry verticals. Some features not currently
              available across all regions or plans and are subject to change.
            </p>
          </div>
        </div>
      </div>

      {/* Industry Solution Section */}
      <div className="hidden">
        <div className={styles.industrySolutionSection}>
          <div className={styles.leftSection}>
            <h2 className={styles.boldHeading}>
              Powering organizations across industries and geographies
            </h2>
            <p>
              Nexus helps consolidate communications, connect people, and
              collaborate better together in the boardroom, classroom, operating
              room, and everywhere in between.
            </p>
            <button className={styles.industryButton}>
              Explore Industry Solutions
            </button>
          </div>

          <div className={styles.industrySolutionsRight}>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faSchool} />
              <p>EDUCATION</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faPiggyBank} />
              <p>FINANCIAL SERVICES</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faBuilding} />
              <p>GOVERNMENT</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faHospital} />
              <p>HEALTH CARE</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faIndustry} />
              <p>MANUFACTURING</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faStore} />
              <p>RETAIL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Solution Section mobile*/}

      <div className="flex">
        <div className={styles.industrySolutionSection}>
          <div className={styles.leftSection}>
            <h2 className={styles.boldHeading}>
              Powering organizations across industries and geographies
            </h2>
            <p>
              Nexus helps consolidate communications, connect people, and
              collaborate better together in the boardroom, classroom, operating
              room, and everywhere in between.
            </p>
            <button className={styles.industryButton}>
              Explore Industry Solutions
            </button>
          </div>

          {/* <div className={styles.industrySolutionsRight}>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faSchool} />
              <p>EDUCATION</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faPiggyBank} />
              <p>FINANCIAL SERVICES</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faBuilding} />
              <p>GOVERNMENT</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faHospital} />
              <p>HEALTH CARE</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faIndustry} />
              <p>MANUFACTURING</p>
            </div>
            <div className={styles.industryBox}>
              <FontAwesomeIcon icon={faStore} />
              <p>RETAIL</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Trusted by Businesses Section */}
      <div className="hidden lg:block">
        <div className={styles.trustedSection}>
          <h2 className={styles.trustedTitle}>
            Trusted by businesses, loved by people
          </h2>
          <p className={styles.trustedSubtitle}>Top-rated on review sites.</p>

          <div className={styles.countingNumbers}>
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={5000}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>Businesses</p>
            </div>
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={120000}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>Satisfied Users</p>
            </div>
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={250}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>5-star Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by Businesses Section mobile */}

      <div className="lg:hidden">
        <div className={styles.trustedSection}>
          <h2 className={styles.trustedTitle}>
            Trusted by businesses, loved by people
          </h2>
          <p className={styles.trustedSubtitle}>Top-rated on review sites.</p>

          <div className="flex-col">
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={5000}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>Businesses</p>
            </div>
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={120000}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>Satisfied Users</p>
            </div>
            <div className={styles.counterItem}>
              <CountUp
                start={0}
                end={250}
                duration={5}
                className={styles.counter}
              />
              <p className={styles.counterLabel}>5-star Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className={`${styles.footer} ${
          isFooterVisible ? styles.scrolled : ""
        } ${animateFooter ? styles.animate : ""}`}
      >
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>About</h4>
            <ul>
              <li>Nexus Blog</li>
              <li>Customers</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Integrations</li>
              <li>Partners</li>
              <li>Investors</li>
              <li>Press</li>
              <li>Sustainability & ESG</li>
              <li>Nexus Cares</li>
              <li>Media Kit</li>
              <li>How To Videos</li>
              <li>Developer Platform</li>
              <li>Nexus Ventures</li>
              <li>Nexus Merchandise Store</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Download</h4>
            <ul>
              <li>Nexus Workplace App</li>
              <li>Nexus Rooms App</li>
              <li>Nexus Rooms Controller</li>
              <li>Browser Extension</li>
              <li>Outlook Plug-in</li>
              <li>iPhone/iPad App</li>
              <li>Android App</li>
              <li>Nexus Virtual Backgrounds</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Sales</h4>
            <ul>
              <li>1.888.799.9666</li>
              <li>Contact Sales</li>
              <li>Plans & pricing</li>
              <li>Request a Demo</li>
              <li>Webinars and Events</li>
              <li>Nexus Experience Center</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul>
              <li>Test Nexus</li>
              <li>Account</li>
              <li>Support Center</li>
              <li>Learning Center</li>
              <li>Feedback</li>
              <li>Nexus Community</li>
              <li>Contact Us</li>
              <li>Accessibility</li>
              <li>Developer Support</li>
              <li>Privacy, Security, Legal Policies</li>
              <li>Modern Slavery Act Transparency Statement</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Language</h4>
            <p>English</p>
            <h4>Currency</h4>
            <p>US Dollars $</p>
          </div>

          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="NEXUS on Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" aria-label="NEXUS on Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="NEXUS on LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" aria-label="NEXUS on Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            Copyright ©2024 Nexus Video Communications, Inc. All rights
            reserved.
          </p>
          <p>
            Terms | Privacy | Trust Center | Acceptable Use Guidelines | Legal &
            Compliance | Your Privacy Choices | Cookie Preferences
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
