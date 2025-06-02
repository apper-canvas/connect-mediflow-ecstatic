import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Users, Calendar, UserCheck, Package, Plus, Edit, Trash2, Eye, Search, TrendingUp, Activity, Heart, Thermometer, BarChart3, Building, Bed, MapPin, Clock, User, Phone, TestTube, PieChart, Building2, X, UserPlus, Stethoscope } from 'lucide-react';
import Chart from 'react-apexcharts';

// Simple date formatting function
const format = (date, formatStr) => {
  const d = new Date(date);
  if (formatStr === 'yyyy-MM-dd') {
    return d.toISOString().split('T')[0];
  } else if (formatStr === 'MMM dd, yyyy') {
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  } else if (formatStr === 'MMMM dd, yyyy') {
    return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  } else if (formatStr === 'MMM dd') {
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  }
  return d.toLocaleDateString();
};

// Icon component wrapper
const ApperIcon = ({ name, className }) => {
  const IconMap = {
    User, Users, Calendar, UserCheck, Package, Plus, Edit, Trash2, Eye, Search, 
    TrendingUp, Activity, Heart, Thermometer, BarChart3, Building, Bed, MapPin, 
    Clock, Phone, TestTube, PieChart, Building2, X, UserPlus, Stethoscope
  };
  const IconComponent = IconMap[name] || User;
  return <IconComponent className={className} />;
};

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('register');
  
  const [patients, setPatients] = useState([
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 34,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      status: 'stable',
      department: 'Cardiology',
      vitalSigns: [
        { date: '2024-01-15', heartRate: 72, bloodPressureSys: 120, bloodPressureDia: 80, temperature: 98.6 },
        { date: '2024-01-14', heartRate: 75, bloodPressureSys: 125, bloodPressureDia: 82, temperature: 98.4 },
        { date: '2024-01-13', heartRate: 78, bloodPressureSys: 128, bloodPressureDia: 85, temperature: 98.8 },
        { date: '2024-01-12', heartRate: 74, bloodPressureSys: 122, bloodPressureDia: 81, temperature: 98.5 },
        { date: '2024-01-11', heartRate: 76, bloodPressureSys: 126, bloodPressureDia: 83, temperature: 98.7 }
      ],
      labResults: [
        { id: 'L001', test: 'Cholesterol', value: 180, unit: 'mg/dL', status: 'stable', date: '2024-01-15', normalRange: '< 200' },
        { id: 'L002', test: 'Blood Glucose', value: 95, unit: 'mg/dL', status: 'stable', date: '2024-01-15', normalRange: '70-100' },
        { id: 'L003', test: 'Hemoglobin', value: 13.5, unit: 'g/dL', status: 'stable', date: '2024-01-14', normalRange: '12-16' },
        { id: 'L004', test: 'White Blood Cells', value: 7.2, unit: 'K/μL', status: 'stable', date: '2024-01-14', normalRange: '4.5-11' }
      ]
    },
    {
      id: 'P002', 
      name: 'Michael Chen',
      age: 28,
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-14',
      status: 'monitoring',
      department: 'Endocrinology',
      vitalSigns: [
        { date: '2024-01-14', heartRate: 68, bloodPressureSys: 118, bloodPressureDia: 78, temperature: 98.2 },
        { date: '2024-01-13', heartRate: 70, bloodPressureSys: 120, bloodPressureDia: 80, temperature: 98.4 },
        { date: '2024-01-12', heartRate: 72, bloodPressureSys: 115, bloodPressureDia: 76, temperature: 98.1 },
        { date: '2024-01-11', heartRate: 69, bloodPressureSys: 117, bloodPressureDia: 77, temperature: 98.3 },
        { date: '2024-01-10', heartRate: 71, bloodPressureSys: 119, bloodPressureDia: 79, temperature: 98.5 }
      ],
      labResults: [
        { id: 'L005', test: 'HbA1c', value: 7.2, unit: '%', status: 'monitoring', date: '2024-01-14', normalRange: '< 7%' },
        { id: 'L006', test: 'Fasting Glucose', value: 145, unit: 'mg/dL', status: 'monitoring', date: '2024-01-14', normalRange: '70-100' },
        { id: 'L007', test: 'Triglycerides', value: 165, unit: 'mg/dL', status: 'monitoring', date: '2024-01-13', normalRange: '< 150' }
      ]
    },
    {
      id: 'P003',
      name: 'Emma Rodriguez',
      age: 45,
      condition: 'Asthma',
      lastVisit: '2024-01-13',
      status: 'critical',
      department: 'Pulmonology',
      vitalSigns: [
        { date: '2024-01-13', heartRate: 95, bloodPressureSys: 140, bloodPressureDia: 90, temperature: 99.2 },
        { date: '2024-01-12', heartRate: 98, bloodPressureSys: 145, bloodPressureDia: 92, temperature: 99.5 },
        { date: '2024-01-11', heartRate: 92, bloodPressureSys: 138, bloodPressureDia: 88, temperature: 99.0 },
        { date: '2024-01-10', heartRate: 90, bloodPressureSys: 135, bloodPressureDia: 85, temperature: 98.8 },
        { date: '2024-01-09', heartRate: 88, bloodPressureSys: 132, bloodPressureDia: 82, temperature: 98.6 }
      ],
      labResults: [
        { id: 'L008', test: 'Peak Flow', value: 250, unit: 'L/min', status: 'critical', date: '2024-01-13', normalRange: '400-700' },
        { id: 'L009', test: 'Oxygen Saturation', value: 94, unit: '%', status: 'monitoring', date: '2024-01-13', normalRange: '95-100' },
        { id: 'L010', test: 'C-Reactive Protein', value: 8.5, unit: 'mg/L', status: 'critical', date: '2024-01-12', normalRange: '< 3.0' }
      ]
    }
  ]);

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
    { id: 'analytics', label: 'Quick Stats', icon: 'BarChart3' },
    { id: 'charts', label: 'Charts & Trends', icon: 'TrendingUp' },
    { id: 'beds', label: 'Bed Management', icon: 'Bed' }
  ];

  // Bed Management State
  const [bedData, setBedData] = useState({
    'ICU': {
      name: 'Intensive Care Unit',
      totalBeds: 20,
      available: 5,
      occupied: 12,
      maintenance: 3,
      beds: Array.from({ length: 20 }, (_, i) => ({
        id: `ICU-${i + 1}`,
        number: i + 1,
        status: i < 12 ? 'occupied' : i < 17 ? 'available' : 'maintenance',
        patient: i < 12 ? `Patient ${i + 1}` : null,
        lastUpdated: new Date()
      }))
    },
    'General': {
      name: 'General Ward',
      totalBeds: 50,
      available: 18,
      occupied: 28,
      maintenance: 4,
      beds: Array.from({ length: 50 }, (_, i) => ({
        id: `GEN-${i + 1}`,
        number: i + 1,
        status: i < 28 ? 'occupied' : i < 46 ? 'available' : 'maintenance',
        patient: i < 28 ? `Patient ${i + 1}` : null,
        lastUpdated: new Date()
      }))
    },
    'Emergency': {
      name: 'Emergency Department',
      totalBeds: 15,
      available: 3,
      occupied: 11,
      maintenance: 1,
      beds: Array.from({ length: 15 }, (_, i) => ({
        id: `ER-${i + 1}`,
        number: i + 1,
        status: i < 11 ? 'occupied' : i < 14 ? 'available' : 'maintenance',
        patient: i < 11 ? `Emergency Patient ${i + 1}` : null,
        lastUpdated: new Date()
      }))
    },
    'Maternity': {
      name: 'Maternity Ward',
      totalBeds: 25,
      available: 8,
      occupied: 15,
      maintenance: 2,
      beds: Array.from({ length: 25 }, (_, i) => ({
        id: `MAT-${i + 1}`,
        number: i + 1,
        status: i < 15 ? 'occupied' : i < 23 ? 'available' : 'maintenance',
        patient: i < 15 ? `Mother ${i + 1}` : null,
        lastUpdated: new Date()
      }))
    },
    'Pediatric': {
      name: 'Pediatric Ward',
      totalBeds: 30,
      available: 12,
      occupied: 16,
      maintenance: 2,
      beds: Array.from({ length: 30 }, (_, i) => ({
        id: `PED-${i + 1}`,
        number: i + 1,
        status: i < 16 ? 'occupied' : i < 28 ? 'available' : 'maintenance',
        patient: i < 16 ? `Child Patient ${i + 1}` : null,
        lastUpdated: new Date()
      }))
    }
  });

  // Real-time updates for bed status
  useEffect(() => {
    const interval = setInterval(() => {
      setBedData(prevData => {
        const newData = { ...prevData };
        
        // Simulate some bed status changes
        Object.keys(newData).forEach(wardKey => {
          const ward = newData[wardKey];
          const beds = [...ward.beds];
          
          // Randomly change 1-2 bed statuses
          const changeCount = Math.floor(Math.random() * 3);
          for (let i = 0; i < changeCount; i++) {
            const randomBedIndex = Math.floor(Math.random() * beds.length);
            const currentStatus = beds[randomBedIndex].status;
            
            // Cycle through statuses
            if (currentStatus === 'available' && Math.random() > 0.7) {
              beds[randomBedIndex].status = 'occupied';
              beds[randomBedIndex].patient = `New Patient ${Date.now()}`;
            } else if (currentStatus === 'occupied' && Math.random() > 0.8) {
              beds[randomBedIndex].status = 'available';
              beds[randomBedIndex].patient = null;
            }
            beds[randomBedIndex].lastUpdated = new Date();
          }
          
          // Recalculate counts
          const available = beds.filter(bed => bed.status === 'available').length;
          const occupied = beds.filter(bed => bed.status === 'occupied').length;
          const maintenance = beds.filter(bed => bed.status === 'maintenance').length;
          
          newData[wardKey] = {
            ...ward,
            beds,
            available,
            occupied,
            maintenance
          };
        });
        
        return newData;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getBedStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBedStatusBorderColor = (status) => {
    switch (status) {
      case 'available': return 'border-green-200 bg-green-50';
      case 'occupied': return 'border-red-200 bg-red-50';
      case 'maintenance': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };
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

        {/* Charts and Trends */}
        {activeTab === 'charts' && (
          <motion.div
            key="charts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Charts & Trends
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Visualize patient vital signs and lab results trends over time
              </p>
            </div>

            {/* Chart Type Selector */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4 flex-1 min-w-[250px]">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Select Patient
                </label>
                <select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => {
                    const patient = patients.find(p => p.id === e.target.value)
                    setSelectedPatient(patient || null)
                  }}
                  className="input-field dark:bg-surface-800 dark:border-surface-600 dark:text-white"
                >
                  <option value="">Select a patient...</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedPatient ? (
              <div className="space-y-6">
                {/* Vital Signs Chart */}
                <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                    <ApperIcon name="Activity" className="h-5 w-5 mr-2 text-primary" />
                    Vital Signs Trends
                  </h4>
                  
                  <div className="mb-4">
                    <div className="bg-white dark:bg-surface-800 rounded-lg p-4">
                      <Chart
                        options={{
                          chart: {
                            id: 'vital-signs',
                            type: 'line',
                            height: 350,
                            toolbar: {
                              show: true,
                              tools: {
                                download: true,
                                selection: false,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: false,
                                reset: true
                              }
                            },
                            background: 'transparent'
                          },
                          theme: {
                            mode: 'light'
                          },
                          colors: ['#0EA5E9', '#10B981', '#F59E0B'],
                          stroke: {
                            curve: 'smooth',
                            width: 3
                          },
                          grid: {
                            borderColor: '#e2e8f0',
                            strokeDashArray: 3
                          },
                          xaxis: {
                            categories: selectedPatient.vitalSigns?.map(vs => format(new Date(vs.date), 'MMM dd')) || [],
                            labels: {
                              style: {
                                colors: '#64748b'
                              }
                            }
                          },
                          yaxis: [
                            {
                              title: {
                                text: 'Heart Rate (BPM)',
                                style: {
                                  color: '#64748b'
                                }
                              },
                              labels: {
                                style: {
                                  colors: '#64748b'
                                }
                              }
                            },
                            {
                              opposite: true,
                              title: {
                                text: 'Blood Pressure (mmHg)',
                                style: {
                                  color: '#64748b'
                                }
                              },
                              labels: {
                                style: {
                                  colors: '#64748b'
                                }
                              }
                            },
                            {
                              opposite: true,
                              title: {
                                text: 'Temperature (°F)',
                                style: {
                                  color: '#64748b'
                                }
                              },
                              labels: {
                                style: {
                                  colors: '#64748b'
                                }
                              }
                            }
                          ],
                          legend: {
                            position: 'top',
                            horizontalAlign: 'right',
                            labels: {
                              colors: '#64748b'
                            }
                          },
                          tooltip: {
                            shared: true,
                            intersect: false,
                            y: {
                              formatter: function(value, { seriesIndex }) {
                                if (seriesIndex === 0) return value + ' BPM'
                                if (seriesIndex === 1) return value + ' mmHg'
                                if (seriesIndex === 2) return value + '°F'
                                return value
                              }
                            }
                          },
                          markers: {
                            size: 6,
                            strokeWidth: 2,
                            hover: {
                              size: 8
                            }
                          }
                        }}
                        series={[
                          {
                            name: 'Heart Rate',
                            data: selectedPatient.vitalSigns?.map(vs => vs.heartRate) || [],
                            yAxisIndex: 0
                          },
                          {
                            name: 'Systolic BP',
                            data: selectedPatient.vitalSigns?.map(vs => vs.bloodPressureSys) || [],
                            yAxisIndex: 1
                          },
                          {
                            name: 'Temperature',
                            data: selectedPatient.vitalSigns?.map(vs => vs.temperature) || [],
                            yAxisIndex: 2
                          }
                        ]}
                        type="line"
                        height={350}
                      />
                    </div>
                  </div>

                  {/* Vital Signs Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedPatient.vitalSigns && selectedPatient.vitalSigns.length > 0 && (
                      <>
                        <div className="bg-white dark:bg-surface-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-surface-600 dark:text-surface-400">Latest Heart Rate</p>
                              <p className="text-2xl font-bold text-surface-900 dark:text-white">
                                {selectedPatient.vitalSigns[0].heartRate} <span className="text-sm font-normal">BPM</span>
                              </p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                              <ApperIcon name="Heart" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-surface-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-surface-600 dark:text-surface-400">Latest Blood Pressure</p>
                              <p className="text-2xl font-bold text-surface-900 dark:text-white">
                                {selectedPatient.vitalSigns[0].bloodPressureSys}/{selectedPatient.vitalSigns[0].bloodPressureDia}
                              </p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                              <ApperIcon name="Activity" className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-surface-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-surface-600 dark:text-surface-400">Latest Temperature</p>
                              <p className="text-2xl font-bold text-surface-900 dark:text-white">
                                {selectedPatient.vitalSigns[0].temperature}°F
                              </p>
                            </div>
                            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                              <ApperIcon name="Thermometer" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Lab Results Chart */}
                {selectedPatient.labResults && selectedPatient.labResults.length > 0 && (
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
                      <ApperIcon name="TestTube" className="h-5 w-5 mr-2 text-primary" />
                      Lab Results Overview
                    </h4>
                    
                    <div className="bg-white dark:bg-surface-800 rounded-lg p-4 mb-4">
                      <Chart
                        options={{
                          chart: {
                            id: 'lab-results',
                            type: 'bar',
                            height: 300,
                            toolbar: {
                              show: true
                            },
                            background: 'transparent'
                          },
                          plotOptions: {
                            bar: {
                              borderRadius: 8,
                              horizontal: false,
                              columnWidth: '60%'
                            }
                          },
                          colors: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444'],
                          dataLabels: {
                            enabled: true,
                            formatter: function(val, opts) {
                              const test = selectedPatient.labResults[opts.dataPointIndex]
                              return val + ' ' + test.unit
                            }
                          },
                          xaxis: {
                            categories: selectedPatient.labResults.map(result => result.test),
                            labels: {
                              style: {
                                colors: '#64748b'
                              }
                            }
                          },
                          yaxis: {
                            title: {
                              text: 'Test Values',
                              style: {
                                color: '#64748b'
                              }
                            },
                            labels: {
                              style: {
                                colors: '#64748b'
                              }
                            }
                          },
                          grid: {
                            borderColor: '#e2e8f0',
                            strokeDashArray: 3
                          },
                          tooltip: {
                            y: {
                              formatter: function(value, { dataPointIndex }) {
                                const result = selectedPatient.labResults[dataPointIndex]
                                return `${value} ${result.unit} (Normal: ${result.normalRange})`
                              }
                            }
                          }
                        }}
                        series={[
                          {
                            name: 'Test Results',
                            data: selectedPatient.labResults.map(result => result.value)
                          }
                        ]}
                        type="bar"
                        height={300}
                      />
                    </div>

                    {/* Lab Results Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPatient.labResults.map((result) => (
                        <div key={result.id} className="bg-white dark:bg-surface-800 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-surface-900 dark:text-white">{result.test}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-surface-900 dark:text-white">
                              {result.value} {result.unit}
                            </p>
                            <p className="text-xs text-surface-500 dark:text-surface-400">
                              Normal range: {result.normalRange}
                            </p>
                            <p className="text-xs text-surface-500 dark:text-surface-400">
                              Date: {format(new Date(result.date), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <ApperIcon name="TrendingUp" className="h-16 w-16 text-surface-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-surface-600 dark:text-surface-400 mb-2">
                  Select a Patient to View Charts
                </h4>
                <p className="text-surface-500 dark:text-surface-400">
                  Choose a patient from the dropdown above to visualize their vital signs and lab results trends.
                </p>
              </div>
            )}
</motion.div>
        )}

        {/* Bed Management */}
        {activeTab === 'beds' && (
          <motion.div
            key="beds"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Real-time Bed Management
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Monitor bed availability and room status across all hospital wards
              </p>
            </div>

            {/* Overall Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.values(bedData).reduce((totals, ward) => {
                totals.total += ward.totalBeds;
                totals.available += ward.available;
                totals.occupied += ward.occupied;
                totals.maintenance += ward.maintenance;
                return totals;
              }, { total: 0, available: 0, occupied: 0, maintenance: 0 })}

              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">Total Beds</p>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white">
                      {Object.values(bedData).reduce((sum, ward) => sum + ward.totalBeds, 0)}
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <ApperIcon name="Bed" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">Available</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Object.values(bedData).reduce((sum, ward) => sum + ward.available, 0)}
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <ApperIcon name="UserCheck" className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">Occupied</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {Object.values(bedData).reduce((sum, ward) => sum + ward.occupied, 0)}
                    </p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <ApperIcon name="Users" className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">Maintenance</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {Object.values(bedData).reduce((sum, ward) => sum + ward.maintenance, 0)}
                    </p>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                    <ApperIcon name="Package" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ward Details */}
            <div className="space-y-6">
              {Object.entries(bedData).map(([wardKey, ward]) => (
                <div key={wardKey} className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <ApperIcon name="Building2" className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                          {ward.name}
                        </h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {ward.totalBeds} total beds • Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        Available: {ward.available}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                        Occupied: {ward.occupied}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Maintenance: {ward.maintenance}
                      </span>
                    </div>
                  </div>

                  {/* Occupancy Rate */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        Occupancy Rate
                      </span>
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {Math.round((ward.occupied / ward.totalBeds) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-200 dark:bg-surface-600 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-red-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(ward.occupied / ward.totalBeds) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Bed Grid */}
                  <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
                    {ward.beds.map((bed) => (
                      <motion.div
                        key={bed.id}
                        whileHover={{ scale: 1.1 }}
                        className={`relative w-8 h-8 rounded-lg border-2 transition-all duration-200 cursor-pointer ${getBedStatusBorderColor(bed.status)}`}
                        title={`Bed ${bed.number} - ${bed.status}${bed.patient ? ` (${bed.patient})` : ''}`}
                      >
                        <div className={`w-full h-full rounded-md ${getBedStatusColor(bed.status)}`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {bed.number}
                            </span>
                          </div>
                        </div>
                        
                        {/* Status indicator dot */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getBedStatusColor(bed.status)}`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm text-surface-600 dark:text-surface-400">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-surface-600 dark:text-surface-400">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-sm text-surface-600 dark:text-surface-400">Maintenance</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Real-time Updates Notice */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <ApperIcon name="Clock" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100">Real-time Updates</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Bed status is automatically updated every 30 seconds. Last update: {format(new Date(), 'HH:mm:ss')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && activeTab !== 'charts' && (
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

export default MainFeature;