import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const statsData = [
    { label: 'Active Patients', value: '2,847', icon: 'Users', color: 'text-blue-600' },
    { label: 'Staff Members', value: '156', icon: 'UserCheck', color: 'text-green-600' },
    { label: 'Appointments Today', value: '47', icon: 'Calendar', color: 'text-purple-600' },
    { label: 'Available Beds', value: '23', icon: 'Bed', color: 'text-orange-600' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-surface-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 sm:p-3 rounded-xl">
                <ApperIcon name="Activity" className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">MediFlow</h1>
                <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">Healthcare Management Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
              >
                <ApperIcon 
                  name={darkMode ? 'Sun' : 'Moon'} 
                  className="h-4 w-4 sm:h-5 sm:w-5 text-surface-600 dark:text-surface-300" 
                />
              </button>
              <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-700 rounded-xl px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-surface-700 dark:text-surface-300">Online</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Stats Overview */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="medical-card dark:medical-card-dark p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-2 sm:p-3 rounded-full bg-surface-50 dark:bg-surface-700 mb-3 sm:mb-4 ${stat.color}`}>
                <ApperIcon name={stat.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-1 sm:mb-2">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Feature Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-3 sm:mb-4">
            Patient Management
          </h2>
          <p className="text-sm sm:text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Streamline patient care with our comprehensive management system
          </p>
        </div>
        <MainFeature />
      </motion.section>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-surface-800/50 backdrop-blur-md border-t border-surface-200 dark:border-surface-700 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">
              © 2024 MediFlow. Healthcare Management Platform for Modern Hospitals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home