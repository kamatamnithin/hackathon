import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Globe, User, Stethoscope, Heart, Brain, Shield, 
  Sparkles, TrendingUp, Users, ChevronRight, Zap, Eye, BarChart3,
  Clock, Lock, Database
} from 'lucide-react';
import { PatientDashboard } from './components/patient-dashboard';
import { DoctorDashboard } from './components/doctor-dashboard';
import { FloatingParticles } from './components/floating-particles';
import { Hero3DCard } from './components/hero-3d-card';
import { AnimatedStats } from './components/animated-stats';
import { ModernFeatureCard } from './components/modern-feature-card';
import { AuthModal } from './components/auth-modal';
import { EHRSystem } from './components/ehr-system';
import { Telemedicine } from './components/telemedicine';
import { PrescriptionManagement } from './components/prescription-management';
import { EmergencySOSButton, EmergencySOSModal } from './components/emergency-sos';
import { IoTWearables } from './components/iot-wearables';
import { InsuranceClaims } from './components/insurance-claims';
import { ABDMIntegration } from './components/abdm-integration';
import { DashboardNavigation } from './components/dashboard-navigation';
import { TrendAnalytics } from './components/trend-analytics';

export default function App() {
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSOS, setShowSOS] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<'patient' | 'doctor' | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te' as const, name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const translations = {
    en: {
      hero: {
        badge: 'Next-Gen Healthcare AI',
        title: ['Transform Healthcare with', 'Artificial Intelligence'],
        subtitle: 'Advanced disease prediction powered by modular AI systems. Early detection saves lives.',
        cta1: 'Get Started',
        cta2: 'Watch Demo'
      },
      stats: {
        accuracy: 'AI Accuracy',
        patients: 'Patients Helped',
        predictions: 'Predictions Made',
        doctors: 'Medical Professionals'
      },
      features: {
        title: 'Powerful Features',
        subtitle: 'Everything you need for intelligent healthcare management'
      },
      patient: 'Patient Portal',
      doctor: 'Doctor Portal'
    },
    hi: {
      hero: {
        badge: 'नेक्स्ट-जेन हेल्थकेयर AI',
        title: ['कृत्रिम बुद्धिमत्ता से', 'स्वास्थ्य सेवा में क्रांति'],
        subtitle: 'मॉड्यूलर AI सिस्टम द्वारा संचालित उन्नत रोग भविष्यवाणी। प्रारंभिक पहचान जीवन बचाती है।',
        cta1: 'शुरू करें',
        cta2: 'डेमो देखें'
      },
      stats: {
        accuracy: 'AI सटीकता',
        patients: 'मरीजों की मदद की',
        predictions: 'भविष्यवाणियां की गईं',
        doctors: 'चिकित्सा पेशेवर'
      },
      features: {
        title: 'शक्तिशाली सुविधाएँ',
        subtitle: 'बुद्धिमान स्वास्थ्य प्रबंधन के लिए आवश्यक सब कुछ'
      },
      patient: 'रोगी पोर्टल',
      doctor: 'डॉक्टर पोर्टल'
    },
    te: {
      hero: {
        badge: 'నెక్స్ట్-జెన్ హెల్త్‌కేర్ AI',
        title: ['కృత్రిమ మేధస్సుతో', 'ఆరోగ్య సంరక్షణను మార్చండి'],
        subtitle: 'మాడ్యులర్ AI సిస్టమ్స్ ద్వారా అధునాతన వ్యాధి అంచనా. ముందస్తు గుర్తింపు జీవితాలను కాపాడుతుంది.',
        cta1: 'ప్రారంభించండి',
        cta2: 'డెమో చూడండి'
      },
      stats: {
        accuracy: 'AI ఖచ్చితత్వం',
        patients: 'రోగులకు సహాయపడింది',
        predictions: 'అనుమానాలు చేయబడ్డాయి',
        doctors: 'వైద్య నిపుణులు'
      },
      features: {
        title: 'శక్తివంతమైన ఫీచర్లు',
        subtitle: 'తెలివైన ఆరోగ్య నిర్వహణ కోసం మీకు అవసరమైన ప్రతిదీ'
      },
      patient: 'రోగి పోర్టల్',
      doctor: 'డాక్టర్ పోర్టల్'
    }
  };

  const t = translations[language];

  const handlePortalClick = (portal: 'patient' | 'doctor') => {
    setSelectedPortal(portal);
    setShowAuthModal(true);
  };

  const handleLogin = (type: 'patient' | 'doctor', userData: any) => {
    setUserType(type);
    setShowAuthModal(false);
  };

  if (userType) {
    const renderActiveContent = () => {
      switch (activeTab) {
        case 'overview':
          return userType === 'patient' ? (
            <PatientDashboard language={language} />
          ) : (
            <DoctorDashboard language={language} />
          );
        case 'ehr':
          return <EHRSystem language={language} userType={userType} />;
        case 'telemedicine':
          return <Telemedicine language={language} userType={userType} />;
        case 'prescriptions':
          return <PrescriptionManagement language={language} userType={userType} />;
        case 'wearables':
          return <IoTWearables language={language} />;
        case 'insurance':
          return <InsuranceClaims language={language} userType={userType} />;
        case 'abdm':
          return <ABDMIntegration language={language} />;
        case 'analytics':
          return <TrendAnalytics language={language} />;
        default:
          return userType === 'patient' ? (
            <PatientDashboard language={language} />
          ) : (
            <DoctorDashboard language={language} />
          );
      }
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"
        >
          {/* Top Navigation */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setUserType(null);
                      setActiveTab('overview');
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    ← Back to Home
                  </motion.button>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      HealthAI
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 backdrop-blur-sm rounded-xl">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'te')}
                      className="bg-transparent text-gray-900 text-sm focus:outline-none cursor-pointer"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
                  >
                    {userType === 'patient' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Stethoscope className="w-5 h-5 text-white" />
                    )}
                    <span className="text-white capitalize">{userType}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.nav>

          {/* Dashboard Navigation */}
          <DashboardNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userType={userType}
            language={language}
          />

          {/* Dashboard Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto p-6"
          >
            {renderActiveContent()}
          </motion.div>

          {/* Emergency SOS Button (Patient only) */}
          {userType === 'patient' && (
            <>
              <EmergencySOSButton 
                language={language} 
                onClick={() => setShowSOS(true)} 
              />
              {showSOS && (
                <EmergencySOSModal 
                  language={language} 
                  onClose={() => setShowSOS(false)} 
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <FloatingParticles />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl text-white">HealthAI</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
              <Globe className="w-4 h-4 text-white/80" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'te')}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-900">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-xl border border-blue-400/30 rounded-full mb-6"
              >
                <Sparkles className="w-5 h-5 text-blue-300" />
                <span className="text-blue-100">{t.hero.badge}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
                  <span className="text-white">{t.hero.title[0]}</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t.hero.title[1]}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2 group"
                >
                  {t.hero.cta1}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                >
                  {t.hero.cta2}
                </motion.button>
              </motion.div>

              {/* Mini Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-4 mt-12"
              >
                {[
                  { value: '95%', label: t.stats.accuracy },
                  { value: '50K+', label: t.stats.patients },
                  { value: '500+', label: t.stats.doctors }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right 3D Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Hero3DCard className="relative">
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  {/* Glassmorphism card with role selection */}
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl text-white mb-2">Select Your Portal</h3>
                      <p className="text-gray-300">Choose your role to continue</p>
                    </div>

                    {/* Patient Portal */}
                    <motion.button
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePortalClick('patient')}
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 group-hover:border-blue-400/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <User className="w-7 h-7 text-blue-300 group-hover:text-white transition-colors" />
                          </div>
                          <div className="text-left flex-1">
                            <h4 className="text-white text-lg mb-1">{t.patient}</h4>
                            <p className="text-gray-300 text-sm">Track your health</p>
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                        </div>
                      </div>
                    </motion.button>

                    {/* Doctor Portal */}
                    <motion.button
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePortalClick('doctor')}
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 group-hover:border-purple-400/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Stethoscope className="w-7 h-7 text-purple-300 group-hover:text-white transition-colors" />
                          </div>
                          <div className="text-left flex-1">
                            <h4 className="text-white text-lg mb-1">{t.doctor}</h4>
                            <p className="text-gray-300 text-sm">Manage patients</p>
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </Hero3DCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedStats
              value={95}
              suffix="%"
              label={t.stats.accuracy}
              icon={<Zap className="w-8 h-8 text-white" />}
              color="from-yellow-400 to-orange-500"
              delay={0}
            />
            <AnimatedStats
              value={50000}
              suffix="+"
              label={t.stats.patients}
              icon={<Users className="w-8 h-8 text-white" />}
              color="from-blue-400 to-blue-600"
              delay={0.1}
            />
            <AnimatedStats
              value={150000}
              suffix="+"
              label={t.stats.predictions}
              icon={<TrendingUp className="w-8 h-8 text-white" />}
              color="from-green-400 to-emerald-600"
              delay={0.2}
            />
            <AnimatedStats
              value={500}
              suffix="+"
              label={t.stats.doctors}
              icon={<Heart className="w-8 h-8 text-white" />}
              color="from-pink-400 to-rose-600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl text-white mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-300">{t.features.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModernFeatureCard
              icon={Brain}
              title="Modular AI Models"
              description="Specialized AI modules for heart disease, diabetes, and cancer detection with ensemble learning"
              color="from-blue-500 to-cyan-500"
              index={0}
            />
            <ModernFeatureCard
              icon={Eye}
              title="AI Explainability"
              description="SHAP-based visualization showing which health parameters influence predictions"
              color="from-purple-500 to-pink-500"
              index={1}
            />
            <ModernFeatureCard
              icon={BarChart3}
              title="Disease Analytics"
              description="Real-time trend analysis, demographic insights, and outbreak prediction"
              color="from-green-500 to-emerald-500"
              index={2}
            />
            <ModernFeatureCard
              icon={Shield}
              title="HIPAA Compliant"
              description="Military-grade encryption and compliance with healthcare data regulations"
              color="from-orange-500 to-red-500"
              index={3}
            />
            <ModernFeatureCard
              icon={Clock}
              title="Real-time Monitoring"
              description="IoT integration for continuous health tracking and early warning alerts"
              color="from-indigo-500 to-blue-500"
              index={4}
            />
            <ModernFeatureCard
              icon={Database}
              title="Smart Data Management"
              description="Hybrid database architecture for efficient storage and lightning-fast queries"
              color="from-teal-500 to-cyan-500"
              index={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl text-white mb-4">Ready to Transform Healthcare?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of healthcare professionals using AI for better patient outcomes
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePortalClick('patient')}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl shadow-2xl hover:shadow-white/30 transition-all"
                >
                  Start as Patient
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePortalClick('doctor')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  Start as Doctor
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 HealthAI Platform. Transforming healthcare with artificial intelligence.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && selectedPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <AuthModal
                portalType={selectedPortal}
                onLogin={handleLogin}
                onClose={() => setShowAuthModal(false)}
                language={language}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
