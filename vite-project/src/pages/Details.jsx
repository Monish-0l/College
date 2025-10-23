import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence here
import {
  Calendar,
  Users,
  Trophy,
  Clock,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  Code,
  Lightbulb,
  Target,
  UserCheck,
  Laptop,
  // Rocket // Keep if needed for potential future icons
} from 'lucide-react';
import { useState } from 'react';
import { faqs, getAllCategories, getFAQsByCategory } from '../data/faqs';
import { getEventTypeColor } from '../data/schedule'; // Keep color logic

// --- SVG Components for Decorations ---

// Astronaut SVG Component (Small version for decoration)
const AstronautIcon = ({ className = "w-16 h-16 md:w-20 md:h-20" }) => (
  <motion.div
    className={className}
    animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
      {/* Helmet */}
      <circle cx="100" cy="70" r="35" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
      <circle cx="100" cy="70" r="30" fill="rgba(255,255,255,0.1)" />
      {/* Visor Reflection */}
      <path d="M 80 75 Q 100 85 120 75 Q 115 60 100 55 Q 85 60 80 75 Z" fill="rgba(59, 130, 246, 0.3)" />
      {/* Body */}
      <ellipse cx="100" cy="130" rx="25" ry="35" fill="#F3F4F6" />
      <rect x="85" y="110" width="30" height="40" rx="15" fill="#E5E7EB" />
      {/* Arms */}
      <ellipse cx="70" cy="120" rx="8" ry="20" fill="#E5E7EB" transform="rotate(-20 70 120)" />
      <ellipse cx="130" cy="120" rx="8" ry="20" fill="#E5E7EB" transform="rotate(20 130 120)" />
      {/* Legs */}
      <ellipse cx="90" cy="170" rx="8" ry="20" fill="#E5E7EB" />
      <ellipse cx="110" cy="170" rx="8" ry="20" fill="#E5E7EB" />
    </svg>
  </motion.div>
);

// Simple Planet Component for decoration
const PlanetIcon = ({ className = "w-16 h-16 md:w-20 md:h-20", color = "#8B5CF6" }) => (
  <motion.div
    className={className}
    animate={{ y: [-4, 4, -4], rotate: [0, 15, -10, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
      <defs>
        <radialGradient id={`grad-${color.replace('#', '')}-icon`} cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.4)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#grad-${color.replace('#', '')}-icon)`} />
      <ellipse cx="32" cy="32" rx="30" ry="8" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" transform="rotate(-30 32 32)" />
    </svg>
  </motion.div>
);
// Rocket SVG Component for decoration
const RocketIcon = ({ className = "w-16 h-16 md:w-20 md:h-20" }) => (
  <motion.div
    className={className}
    animate={{ y: [-5, 5, -5], rotate: [5, -5, 5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
  >
     <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M17.8481 44.8233L16 41.5161M17.8481 44.8233L19.6961 41.5161M17.8481 44.8233L21.5442 41.5161" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M25.7481 44.8233L23.9 41.5161M25.7481 44.8233L27.5961 41.5161M25.7481 44.8233L29.4442 41.5161" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M30.7481 44.8233L28.9 41.5161M30.7481 44.8233L32.5961 41.5161M30.7481 44.8233L34.4442 41.5161" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M24 4C14.0589 4 6 12.0589 6 22C6 26.685 7.67576 30.9152 10.4284 34.0718L13 37.1009H35L37.5716 34.0718C40.3242 30.9152 42 26.685 42 22C42 12.0589 33.9411 4 24 4Z" fill="#E5E7EB"/>
         <path d="M13 37.1008H35L37.5716 34.0716C40.3242 30.915 42 26.6848 42 21.9998C42 12.0587 33.9411 3.99976 24 3.99976C14.0589 3.99976 6 12.0587 6 21.9998C6 26.6848 7.67576 30.915 10.4284 34.0716L13 37.1008Z" stroke="#4B5563" strokeWidth="1.5"/>
         <path d="M13 41V37H35V41" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         <ellipse cx="24" cy="22" rx="9" ry="10" fill="#3B82F6"/>
         <path d="M24 16C26.7614 16 29 18.2386 29 21C29 22.3837 28.2977 23.6146 27.199 24.363" stroke="white" strokeWidth="1" strokeLinecap="round"/>
         <path d="M12 28L6 31" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
         <path d="M36 28L42 31" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
  </motion.div>
);
// --- End SVG Components ---


const Details = () => {
  // Use state for the schedule data now
  const [scheduleData] = useState([
    {
      id: 1,
      day: "Day 1 - Nov 8, 2025",
      events: [
        { time: "08:00 AM", title: "Registration & Check-in", description: "Breakfast & Kit Distribution", type: "registration" },
        { time: "09:00 AM", title: "Inauguration Ceremony", description: "Welcome Address & Keynote", type: "ceremony" },
        { time: "10:00 AM", title: "Hackathon Begins & Problem Statement Reveal", description: "Start Hacking!", type: "main" },
        { time: "01:00 PM", title: "Lunch Break", description: "Networking Lunch", type: "break" },
        { time: "02:00 PM", title: "Mentoring Session 1", description: "Guidance from Industry Experts", type: "mentoring" },
        { time: "04:00 PM", title: "Tech Talk / Workshop", description: "Deep Dive into AI/Web Technologies", type: "workshop" },
        { time: "06:00 PM", title: "High Tea & Snacks", description: "Quick Refreshments", type: "break" },
        { time: "07:00 PM", title: "Mentoring Session 2", description: "Project Review & Feedback", type: "mentoring" },
        { time: "09:00 PM", title: "Dinner", description: "Fueling the Night Coders", type: "break" },
        { time: "11:59 PM", title: "Midnight Check-in & Snacks", description: "Keep the Momentum Going", type: "activity" }
      ]
    },
    {
      id: 2,
      day: "Day 2 - Nov 9, 2025",
      events: [
        { time: "07:00 AM", title: "Breakfast", description: "Morning Fuel", type: "break" },
        { time: "09:00 AM", title: "Final Mentoring Session", description: "Last-minute Guidance", type: "mentoring" },
        { time: "12:00 PM", title: "Lunch Break", description: "Quick Lunch", type: "break" },
        { time: "02:00 PM", title: "Code Freeze & Submission Deadline", description: "Submit Your Projects", type: "deadline" },
        { time: "02:30 PM", title: "Preliminary Judging / Demo Setup", description: "Prepare for Presentation", type: "activity" },
        { time: "03:30 PM", title: "Final Presentations", description: "Teams Showcase Their Solutions", type: "presentation" },
        { time: "05:30 PM", title: "Judges Deliberation & High Tea", description: "Winners Selection", type: "break" },
        { time: "06:30 PM", title: "Valedictory & Prize Distribution", description: "Announcing the Winners", type: "ceremony" },
        { time: "07:30 PM", title: "Networking & Wrap-up", description: "Closing Remarks", type: "activity" }
      ]
    }
  ]);
  const [activeDay, setActiveDay] = useState(1);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeFAQCategory, setActiveFAQCategory] = useState('General');

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const prizes = [
    { position: "1st Place", amount: "₹25,000+", icon: Trophy, color: "text-yellow-400", bgColor: "bg-yellow-400/10", borderColor: "border-yellow-400/30" },
    { position: "2nd Place", amount: "₹15,000+", icon: Award, color: "text-gray-300", bgColor: "bg-gray-300/10", borderColor: "border-gray-300/30" },
    { position: "3rd Place", amount: "₹10,000+", icon: Star, color: "text-orange-400", bgColor: "bg-orange-400/10", borderColor: "border-orange-400/30" }
  ];

  const specialPrizes = [
    { name: "Best AI Innovation", amount: "Exciting Rewards" },
    { name: "Best Web/App Dev", amount: "Exciting Rewards" },
  ];

  const rules = [
    "Teams must have exactly 4 members.",
    "At least one member should be expert in web/app development.",
    "At least one member should be expert in AI.",
    "All team members must be present during the hackathon.",
    "Projects must be built during the 36-hour hackathon timeframe.",
    "Use of pre-existing code libraries and APIs is allowed.",
    "Projects must be original and aim to solve the provided problem statements.",
    "All code must be pushed to a public GitHub repository (or provided platform).",
    "Teams must present their project to judges.",
    "Decision of judges is final."
  ];

  const categories = getAllCategories();

  return (
    <motion.div
      id="main-content"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-950"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Flex container for title and icon */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8" // Flex layout
          >
            {/* Spacer (optional, adjust width as needed) */}
            <div className="hidden md:block w-20 flex-shrink-0"></div>
            {/* Content */}
            <div className="flex-grow">
              <motion.h1
                variants={itemVariants}
                className="heading-1 mb-6"
              >
                Hackathon <span className="text-gradient">Details</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="body-large text-gray-300 max-w-3xl mx-auto"
              >
                Key information for HACK-AI-THON - rules, schedule, prizes, and FAQs for this 36-hour national level event.
              </motion.p>
            </div>
            {/* Astronaut Icon */}
            <motion.div variants={itemVariants} className="mt-6 md:mt-0 flex-shrink-0">
              <AstronautIcon />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          {/* Flex container for title and icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8" // Flex layout
          >
            {/* Planet Icon (Order changed for visual placement) */}
            <motion.div
              initial={{ opacity: 0 }} // Animate icon separately if desired
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }} // Add delay
              className="order-first md:order-last mt-6 md:mt-0 flex-shrink-0"
            >
              <PlanetIcon color="#EC4899" /> {/* Pink Planet */}
            </motion.div>
            {/* Content */}
            <div className="flex-grow order-last md:order-first">
              <h2 className="heading-2 mb-4">About HACK-AI-THON</h2>
              <p className="body-regular text-gray-400 max-w-3xl mx-auto">
                A 36-hour national level hackathon focused on solving industry problems using Artificial Intelligence and Machine Learning.
              </p>
            </div>
            {/* Spacer (optional, adjust width as needed) */}
            <div className="hidden md:block w-20 flex-shrink-0 order-first"></div>
          </motion.div>

          {/* Rest of About Section Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Focus Areas</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">AI/ML Solutions</h4>
                    <p className="text-gray-400">Develop innovative solutions leveraging AI and Machine Learning techniques.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-6 h-6 text-secondary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Industry Problem Statements</h4>
                    <p className="text-gray-400">Tackle real-world challenges provided by industry partners across multi-domains.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="w-6 h-6 text-accent-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Web/App Development</h4>
                    <p className="text-gray-400">Build functional applications showcasing your AI solutions.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Nov 8th - 9th, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-secondary-400" />
                  <span className="text-gray-300">36 hours of coding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span className="text-gray-300">Vidyavardhaka College of Engineering, Mysuru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Teams of Minimum 2 and Max 4 members</span>
                </div>
                <div className="flex items-start space-x-3 pt-2">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Each team must include at least  <b>one Female</b> member</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Prize Pool ₹50K+</h2>
            <p className="body-regular text-gray-400">
              Compete for cash prizes and exciting rewards!
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {prizes.map((prize, index) => {
              const Icon = prize.icon;
              return (
                <motion.div
                  key={prize.position}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card card-hover text-center border ${prize.borderColor} ${prize.bgColor}`}
                >
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${prize.bgColor} mb-4`}>
                      <Icon className={`w-8 h-8 ${prize.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{prize.position}</h3>
                    <div className={`text-3xl font-bold ${prize.color}`}>{prize.amount}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {specialPrizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="card max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Special Category Prizes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specialPrizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">{prize.name}</span>
                    <span className="text-primary-400 font-semibold">{prize.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Rules & Guidelines</h2>
            <p className="body-regular text-gray-400">
              Please adhere to the following rules for participation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className={`w-6 h-6 rounded-full ${[1, 2, 3].includes(index + 1) ? 'bg-primary-500/20' : 'bg-gray-700/50'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`${[1, 2, 3].includes(index + 1) ? 'text-primary-400' : 'text-gray-400'} text-sm font-semibold`}>{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{rule}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start space-x-3 pl-9"
              >
                {/* <Laptop className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Required: Web/App Development Expertise</p> */}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start space-x-3 pl-9"
              >
                {/* <Lightbulb className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Required: AI Expertise</p> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          {/* Flex container for title and icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8" // Flex layout
          >
            {/* Spacer (optional) */}
            <div className="hidden md:block w-20 flex-shrink-0"></div>
            {/* Content */}
            <div className="flex-grow">
              <h2 className="heading-2 mb-4">Event Schedule (36 Hours)</h2>
              <p className="body-regular text-gray-400">
                Timeline for the Hackathon on Nov 8th & 9th, 2025
              </p>
            </div>
            {/* Rocket Icon */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1}}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }} // Add delay
                className="mt-6 md:mt-0 flex-shrink-0"
            >
                <RocketIcon />
            </motion.div>
          </motion.div>
          <div className="flex justify-center mb-12">
            <div className="glass rounded-lg p-1 flex space-x-1">
              {scheduleData.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${activeDay === day.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Day {day.id}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: activeDay === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {scheduleData.find(day => day.id === activeDay)?.day}
            </h3>
            <div className="space-y-6 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-700 hidden sm:block"></div>
              {scheduleData.find(day => day.id === activeDay)?.events.map((event, index) => (
                <motion.div
                  key={`${activeDay}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start space-x-4 group pl-8 sm:pl-10 relative"
                >
                  <div className={`absolute left-4 top-2 -ml-[0.3125rem] w-3 h-3 rounded-full border-2 border-gray-700 ${getEventTypeColor(event.type)} hidden sm:block`} />
                  <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${getEventTypeColor(event.type)} sm:hidden`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-1">
                      <span className="text-primary-400 font-mono text-sm block sm:inline">{event.time}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getEventTypeColor(event.type)} bg-opacity-20 inline-block mt-1 sm:mt-0`}>
                        {event.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="body-regular text-gray-400">
              Find answers to common questions about the hackathon
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFAQCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeFAQCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <motion.div
            key={activeFAQCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {getFAQsByCategory(activeFAQCategory).map((faq) => (
              <motion.div
                key={faq.id}
                layout
                initial={{ borderRadius: '0.75rem' }}
                className="card hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
              >
                <motion.div layout="position" className="w-full flex items-center justify-between text-left">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div animate={{ rotate: activeFAQ === faq.id ? 180 : 0 }}>
                    <ChevronDown className={`w-5 h-5 ${activeFAQ === faq.id ? 'text-primary-400' : 'text-gray-400'} flex-shrink-0 transition-colors`} />
                  </motion.div>
                </motion.div>
                <AnimatePresence>
                  {activeFAQ === faq.id && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(55, 65, 81, 1)' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, borderTop: 'none' }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Details;