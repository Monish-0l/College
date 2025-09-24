import { motion } from 'framer-motion'
import { ArrowDown, Calendar, Users, Trophy, Zap, Star, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CountdownTimer from '../components/ui/CountDownTimer.jsx'
import SponsorsCarousel from '../components/sections/SponsorsCarousel'
import { statusAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const [stats, setStats] = useState({
    totalTeams: 0,
    remainingSlots: 50,
    isOpen: true
  })
  const { isAuthenticated, isAdmin } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statusAPI.get()
        setStats(response.data.data.registration)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const hackathonStart = import.meta.env.VITE_HACKATHON_START || '2025-09-15T09:00:00Z'

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Astronaut SVG Component
  const Astronaut = ({ className = "", size = "large" }) => {
    const sizeClasses = {
      small: "w-24 h-24",
      medium: "w-32 h-32",
      large: "w-64 h-64"
    }

    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Helmet */}
          <circle cx="100" cy="70" r="35" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="100" cy="70" r="30" fill="rgba(255,255,255,0.1)" />

          {/* Face */}
          <circle cx="92" cy="65" r="3" fill="#374151" />
          <circle cx="108" cy="65" r="3" fill="#374151" />
          <path d="M 90 75 Q 100 80 110 75" stroke="#374151" strokeWidth="2" fill="none" />

          {/* Body */}
          <ellipse cx="100" cy="130" rx="25" ry="35" fill="#F3F4F6" />
          <rect x="85" y="110" width="30" height="40" rx="15" fill="#E5E7EB" />

          {/* Control Panel */}
          <rect x="90" y="120" width="20" height="15" rx="3" fill="#3B82F6" />
          <circle cx="95" cy="127" r="2" fill="#EF4444" />
          <circle cx="105" cy="127" r="2" fill="#10B981" />

          {/* Arms */}
          <ellipse cx="70" cy="120" rx="8" ry="20" fill="#E5E7EB" transform="rotate(-20 70 120)" />
          <ellipse cx="130" cy="120" rx="8" ry="20" fill="#E5E7EB" transform="rotate(20 130 120)" />

          {/* Gloves */}
          <circle cx="65" cy="135" r="8" fill="#F3F4F6" />
          <circle cx="135" cy="135" r="8" fill="#F3F4F6" />

          {/* Legs */}
          <ellipse cx="90" cy="170" rx="8" ry="20" fill="#E5E7EB" />
          <ellipse cx="110" cy="170" rx="8" ry="20" fill="#E5E7EB" />

          {/* Boots */}
          <ellipse cx="90" cy="185" rx="10" ry="8" fill="#374151" />
          <ellipse cx="110" cy="185" rx="10" ry="8" fill="#374151" />
        </svg>
      </div>
    )
  }

  // Planet SVG Component
  const Planet = ({ className = "", color = "#8B5CF6" }) => (
    <div className={`w-16 h-16 ${className}`}>
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="32" cy="32" r="28" fill={color} />
        <circle cx="25" cy="25" r="4" fill="rgba(0,0,0,0.2)" />
        <circle cx="40" cy="35" r="3" fill="rgba(0,0,0,0.2)" />
        <circle cx="30" cy="45" r="2" fill="rgba(0,0,0,0.2)" />
        <ellipse cx="32" cy="32" rx="28" ry="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </svg>
    </div>
  )

  // Rocket SVG Component
  const RocketIcon = ({ className = "" }) => (
    <div className={`w-12 h-12 ${className}`}>
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path d="M24 4 L28 20 L24 44 L20 20 Z" fill="#EF4444" />
        <circle cx="24" cy="16" r="4" fill="#3B82F6" />
        <path d="M20 20 L16 24 L20 28 Z" fill="#F59E0B" />
        <path d="M28 20 L32 24 L28 28 Z" fill="#F59E0B" />
        <ellipse cx="24" cy="40" rx="6" ry="4" fill="#F97316" />
      </svg>
    </div>
  )

  return (
    <motion.div
      id="main-content"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Planets */}
        <motion.div
          className="absolute top-20 right-20"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        >
          <Planet color="#8B5CF6" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -360],
          }}
          transition={{
            y: { duration: 8, repeat: Infinity },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        >
          <Planet color="#EC4899" />
        </motion.div>

        {/* Comet */}
        <motion.div
          className="absolute top-1/4 left-0"
          animate={{
            x: [-100, window.innerWidth + 100],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg">
            <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent -translate-x-20 translate-y-1"></div>
          </div>
        </motion.div>

        {/* Floating Rockets */}
        <motion.div
          className="absolute top-1/3 right-1/4"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <RocketIcon />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >

            {/* Main Title */}
            <div>

              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 whitespace-nowrap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                HACK-AI-THON
              </motion.h1>
              <motion.p
                className="text-xs md:text-xs text-purple-200 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Build the future of AI with innovation.
              </motion.p>
            </div>
            {/* Comet */}
            <motion.div
              className="absolute top-1/4 left-0"
              animate={{
                x: [-100, window.innerWidth + 100],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg">
                <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent -translate-x-20 translate-y-1"></div>
              </div>
            </motion.div>


            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Event Starts In:
              </h2>
              <CountdownTimer
                targetDate={hackathonStart}
                size="lg"
                className="mb-8"
              />
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-cyan-400">{stats.totalTeams}</div>
                <div className="text-purple-200 text-sm">Teams Registered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-green-400">{stats.remainingSlots}</div>
                <div className="text-purple-200 text-sm">Slots Remaining</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-yellow-400">72</div>
                <div className="text-purple-200 text-sm">Hours of Coding</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={isAuthenticated && !isAdmin ? '/dashboard' : '/register'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                disabled={!stats.isOpen}
              >
                {isAuthenticated && !isAdmin
                  ? 'Go to Dashboard'
                  : stats.isOpen
                    ? 'Register to Join'
                    : 'Registration Closed'}
              </Link>
              <Link
                to="/details"
                className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Join Builder Chat
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Main Astronaut with Prize */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            {/* Main Astronaut */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Astronaut size="large" />

              {/* Prize Badge */}
              <motion.div
                className="absolute -top-8 -right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-lg transform rotate-12 shadow-lg"
                animate={{
                  rotate: [12, 8, 12],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="text-xs">$10M</div>
                <div className="text-xs">IN GLOBAL PRIZES</div>
              </motion.div>

              {/* Orbit Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Astronauts Section */}
      <section id="mission" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
              OUR MISSION IS TO<br />
              EMPOWER PARTICIPANTS<br />
              TO SHAPE THE FUTURE OF<br />
              ARTIFICIAL INTELLIGENCE
            </h2>
          </motion.div>

          {/* Bottom Astronauts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left Astronaut with Laptop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="relative"
              >
                <Astronaut size="medium" />
                {/* Laptop */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-10 bg-gray-800 rounded-t-lg border-2 border-gray-600">
                    <div className="w-full h-6 bg-blue-500 rounded-t-md flex items-center justify-center">
                      <div className="text-xs text-white font-mono">CODE</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Astronaut on Moon */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center relative"
            >
              <motion.div
                animate={{
                  y: [5, -5, 5],
                  rotate: [1, -1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="relative"
              >
                {/* Moon Surface */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gray-400 rounded-full opacity-80"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gray-500 rounded-full opacity-60"></div>

                <Astronaut size="medium" />

                {/* Flag */}
                <div className="absolute -top-4 right-4">
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                  <div className="absolute top-0 left-0.5 w-8 h-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs flex items-center justify-center font-bold">
                    AI
                  </div>
                </div>
              </motion.div>

              {/* Floating Planet nearby */}
              <motion.div
                className="absolute top-8 right-8"
                animate={{
                  y: [-8, 8, -8],
                  rotate: [0, 360],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity },
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                }}
              >
                <Planet color="#F59E0B" className="w-12 h-12" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">WITH SUPPORT FROM</h2>
          </motion.div>

          <SponsorsCarousel />
        </div>
      </section>
    </motion.div>
  )
}

export default Home