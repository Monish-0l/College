import { motion } from 'framer-motion';
import {
  Code,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Heart,
  User // Added User icon for coordinators
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // General contact info (Email and Location remain)
  const generalContactInfo = [
    {
      icon: Mail,
      label: 'General Email', // Clarified label
      value: 'contact@hackathon.com',
      href: 'mailto:contact@hackathon.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'VVCE Campus',
      href: 'https://www.google.com/maps/place/Vidyavardhaka+College+of+Engineering/@12.336565,76.6161701,17z/data=!4m16!1m9!3m8!1s0x3baf7a5fd7f84b71:0x56edd06e7a72a40!2sVidyavardhaka+College+of+Engineering!8m2!3d12.336565!4d76.618745!9m1!1b1!16zL20vMDg4ZHZ6!3m5!1s0x3baf7a5fd7f84b71:0x56edd06e7a72a40!8m2!3d12.336565!4d76.618745!16zL20vMDg4ZHZ6?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  // Faculty Coordinators
  const facultyCoordinators = [
    { name: 'Prof. Harshit K', phone: '9591522396', href: 'tel:9591522396' },
    { name: 'Prof. Prashanth N D', phone: '9880048336', href: 'tel:9880048336' }
  ];

  // Student Coordinators
  const studentCoordinators = [
    { name: 'Skanda V', phone: '7829871341', href: 'tel:7829871341' },
    { name: 'Vikas', phone: '6363163519', href: 'tel:6363163519' }
  ];

  // Social links (Only Instagram)
  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/hackathon' // Make sure this is correct
    }
  ];

  // Removed Legal Links

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="py-12"
        >
          {/* Use Grid for better structure with more contact info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">

            {/* Brand Section (Column 1) */}
            <motion.div variants={itemVariants} className="md:col-span-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="relative">
                  <Code className="h-8 w-8 text-primary-500" />
                  <motion.div
                    className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <span className="text-2xl font-bold text-gradient">
                  HACK-AI-THON
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-sm mx-auto md:mx-0">
                The premier AI/ML hackathon bringing together the brightest minds.
              </p>
              {/* Social Link */}
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a /* ... Instagram link ... */ >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
              {/* General Contact Info (Email/Location) */}
               <div className="mt-6 space-y-3">
                 {generalContactInfo.map((contact) => (
                   <a
                     key={contact.label}
                     href={contact.href}
                     target={contact.label === 'Location' ? '_blank' : undefined}
                     rel={contact.label === 'Location' ? 'noopener noreferrer' : undefined}
                     className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group text-sm"
                   >
                     <contact.icon className="w-4 h-4 flex-shrink-0 group-hover:text-primary-400" />
                     <span>{contact.value}</span>
                   </a>
                 ))}
               </div>
            </motion.div>

            {/* Faculty Coordinators (Column 2) */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Faculty Coordinators</h3>
              <ul className="space-y-4">
                {facultyCoordinators.map((coord) => (
                  <li key={coord.name}>
                    <a
                      href={coord.href}
                      className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <User className="w-5 h-5 flex-shrink-0 group-hover:text-primary-400" />
                      <div>
                        <div className="text-white group-hover:text-primary-400">{coord.name}</div>
                        <div className="text-sm flex items-center">
                           <Phone className="w-3 h-3 mr-1.5" />
                           {coord.phone}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Student Coordinators (Column 3) */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Student Coordinators</h3>
              <ul className="space-y-4">
                {studentCoordinators.map((coord) => (
                   <li key={coord.name}>
                     <a
                       href={coord.href}
                       className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
                     >
                       <User className="w-5 h-5 flex-shrink-0 group-hover:text-primary-400" />
                       <div>
                         <div className="text-white group-hover:text-primary-400">{coord.name}</div>
                         <div className="text-sm flex items-center">
                           <Phone className="w-3 h-3 mr-1.5" />
                           {coord.phone}
                         </div>
                       </div>
                     </a>
                   </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-6"
        >
          <div className="flex justify-center items-center space-x-1 text-sm text-gray-400">
            <span>© {currentYear} HACK-AI-THON. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>for innovation.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;