import React from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Step1CreateAccount } from './steps/Step1CreateAccount';
import { Step2PersonalDetails } from './steps/Step2PersonalDetails';
import { Step3FitnessGoals } from './steps/Step3FitnessGoals';
import { Step4ActivityLevel } from './steps/Step4ActivityLevel';
import { Step5ProfileSetup } from './steps/Step5ProfileSetup';

export default function OnboardingFlow() {
  const { step } = useOnboardingStore();

  const steps = [
    { id: 1, component: Step1CreateAccount, title: "Create Account" },
    { id: 2, component: Step2PersonalDetails, title: "Personal Details" },
    { id: 3, component: Step3FitnessGoals, title: "Fitness Goals" },
    { id: 4, component: Step4ActivityLevel, title: "Activity Level" },
    { id: 5, component: Step5ProfileSetup, title: "Profile Setup" },
  ];

  const CurrentStep =
    steps.find((s) => s.id === step)?.component || Step1CreateAccount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex flex-col relative overflow-hidden">

      {/* 🔵 Soft Glow Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-purple-200/30 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center border-b border-border/50 bg-background/60 backdrop-blur-md sticky top-0 z-10">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            FitTrack
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-8 flex items-center gap-4">
          <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Step {step} of 5
          </div>
          <Progress
            value={(step / 5) * 100}
            className="h-2 flex-1 bg-primary/20"
          />
        </div>

        <div className="w-8 sm:w-24"></div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-x-hidden">
        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-primary/5 border border-border p-6 sm:p-8"
            >
              <CurrentStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}