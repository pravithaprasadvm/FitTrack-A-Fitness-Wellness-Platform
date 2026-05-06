import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OnboardingFlow from './pages/Onboarding/OnboardingFlow'
import Dashboard from './pages/Dashboard/Dashboard'
import { HowItWorksSection } from './components/landing/HowItWorksSection'
import { FeaturesSection } from './components/landing/FeaturesSection'
import { PricingSection } from './components/landing/PricingSection'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/works" element={<HowItWorksSection />} />
        <Route path="/feature" element={<FeaturesSection />} />
        <Route path="/pricing" element={<PricingSection />} />
      </Routes>
    </Router>
  )
}

export default App
