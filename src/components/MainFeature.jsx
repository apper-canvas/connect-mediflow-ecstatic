import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('register')
  const [patients, setPatients] = useState([
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 34,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      status: 'stable',
      department: 'Cardiology'
    },
    {
      id: 'P002', 
      name: 'Michael Chen',
      age: 28,
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-14',
      status: 'monitoring',
      department: 'Endocrinology'
    },
    {
      id: 'P003',
      name: 'Emma Rodriguez',
      age: 45,
      condition: 'Asthma',
      lastVisit: '2024-01-13',
      status: 'critical',
      department: 'Pulmonology'
    }
  ])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: '',
    emergencyContact: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    insuranceProvider: '',
    department: 'General Medicine'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)

  const departments = [
    'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 
    'Pediatrics', 'Emergency', 'Radiology', 'Pathology'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.age) {
      toast.error('Please fill in all required fields')
      return
    }

    const newPatient = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      name: `${formData.firstName} ${formData.lastName}`,
      age: parseInt(formData.age),
      condition: formData.medicalHistory || 'General Checkup',
      lastVisit: format(new Date(), 'yyyy-MM-dd'),
      status: 'stable',
      department: formData.department,
      contact: formData.phoneNumber,
      email: formData.email,
      emergencyContact: formData.emergencyContact,
      medications: formData.currentMedications,
      allergies: formData.allergies,
      insurance: formData.insuranceProvider
    }

    setPatients(prev => [...prev, newPatient])
    toast.success(`Patient ${newPatient.name} registered successfully!`)
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      email: '',
      emergencyContact: '',
      medicalHistory: '',
      currentMedications: '',
      allergies: '',
      insuranceProvider: '',
      department: 'General Medicine'
    })
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800 border-green-200'
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const tabs = [
    { id: 'register', label: 'Register Patient', icon: 'UserPlus' },
    { id: 'search', label: 'Patient Records', icon: 'Search' },
    { id: 'analytics', label: 'Quick Stats', icon: 'BarChart3' }
  ]

  return (
    <div className="medical-card dark:medical-card-dark max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="border-b border-surface-200 dark:border-surface-700 mb-6 sm:mb-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-t-xl transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {/* Patient Registration Form */}
        {activeTab === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Register New Patient
              </h3>
              <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400">
                Enter patient information to create a new medical record
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="User" className="h-5 w-5 mr-2 text-primary" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                      required
                      min="0"
                      max="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="Phone" className="h-5 w-5 mr-2 text-primary" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                      placeholder="Name and phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="Stethoscope" className="h-5 w-5 mr-2 text-primary" />
                  Medical Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Medical History
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      rows="3"
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white resize-none"
                      placeholder="Previous conditions, surgeries, etc."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Current Medications
                      </label>
                      <textarea
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleInputChange}
                        rows="2"
                        className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white resize-none"
                        placeholder="List current medications"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Allergies
                      </label>
                      <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        rows="2"
                        className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white resize-none"
                        placeholder="Known allergies"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                      className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                      placeholder="Insurance company name"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-4 text-lg"
              >
                <ApperIcon name="UserPlus" className="h-5 w-5" />
                <span>Register Patient</span>
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Patient Search and Records */}
        {activeTab === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-4">
                Patient Records
              </h3>
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <ApperIcon name="User" className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                          {patient.name}
                        </h4>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">
                          ID: {patient.id} • Age: {patient.age} • {patient.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </span>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        Last visit: {format(new Date(patient.lastVisit), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <ApperIcon name="Heart" className="h-3 w-3 mr-1" />
                      {patient.condition}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Search" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                <p className="text-surface-600 dark:text-surface-400">No patients found matching your search.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Quick Analytics */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Quick Analytics
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Overview of patient statistics and department metrics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Status Distribution */}
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="PieChart" className="h-5 w-5 mr-2 text-primary" />
                  Patient Status
                </h4>
                <div className="space-y-3">
                  {['stable', 'monitoring', 'critical'].map((status) => {
                    const count = patients.filter(p => p.status === status).length
                    const percentage = Math.round((count / patients.length) * 100)
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                status === 'stable' ? 'bg-green-500' :
                                status === 'monitoring' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Department Distribution */}
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                  <ApperIcon name="Building2" className="h-5 w-5 mr-2 text-primary" />
                  Department Load
                </h4>
                <div className="space-y-3">
                  {departments.slice(0, 4).map((dept) => {
                    const count = patients.filter(p => p.department === dept).length
                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                          {dept}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${(count / patients.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300 w-8">
                            {count}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                <ApperIcon name="Activity" className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {patients.slice(-3).reverse().map((patient, index) => (
                  <div key={patient.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-surface-800 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ApperIcon name="UserCheck" className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-surface-900 dark:text-white">
                        {patient.name} registered
                      </p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        {patient.department} • {format(new Date(patient.lastVisit), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPatient(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Patient Details
                </h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-6 w-6 text-surface-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <ApperIcon name="User" className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-surface-900 dark:text-white">
                      {selectedPatient.name}
                    </h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      Patient ID: {selectedPatient.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Age</p>
                    <p className="text-lg font-semibold text-surface-900 dark:text-white">{selectedPatient.age}</p>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Department</p>
                    <p className="text-lg font-semibold text-surface-900 dark:text-white">{selectedPatient.department}</p>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Condition</p>
                    <p className="text-lg font-semibold text-surface-900 dark:text-white">{selectedPatient.condition}</p>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                    </span>
                  </div>
                </div>

                {selectedPatient.contact && (
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Contact Information</p>
                    <p className="text-surface-900 dark:text-white">{selectedPatient.contact}</p>
                    {selectedPatient.email && (
                      <p className="text-surface-600 dark:text-surface-400">{selectedPatient.email}</p>
                    )}
                  </div>
                )}

                <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                  <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Last Visit</p>
<p className="text-surface-900 dark:text-white">
                    {format(new Date(selectedPatient.lastVisit), 'MMMM dd, yyyy')}
                  </p>
                </div>

                {/* Lab Results Section */}
                {selectedPatient.labResults && selectedPatient.labResults.length > 0 && (
                  <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <h5 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                      <ApperIcon name="TestTube" className="h-5 w-5 mr-2 text-primary" />
                      Recent Lab Results
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPatient.labResults.map((result) => (
<div key={result.id} className="bg-white dark:bg-surface-800 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-surface-900 dark:text-white">{result.test}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-surface-900 dark:text-white">
                              {result.value} {result.unit}
                            </span>
                            <span className="text-xs text-surface-500 dark:text-surface-400">
                              {format(new Date(result.date), 'MMM dd')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature