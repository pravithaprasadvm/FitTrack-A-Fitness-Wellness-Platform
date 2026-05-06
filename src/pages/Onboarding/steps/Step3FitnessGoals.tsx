import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Flame, Dumbbell, Activity, Shield, Apple, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const goals = [
  { id: 'lose_weight', label: 'Lose Weight', icon: Flame, desc: 'Burn fat and get leaner' },
  { id: 'build_muscle', label: 'Build Muscle', icon: Dumbbell, desc: 'Increase strength and mass' },
  { id: 'stay_active', label: 'Stay Active', icon: Activity, desc: 'Improve general fitness' },
  { id: 'flexibility', label: 'Flexibility', icon: Shield, desc: 'Move better, feel better' },
  { id: 'eat_healthier', label: 'Eat Healthier', icon: Apple, desc: 'Improve nutrition habits' },
  { id: 'reduce_stress', label: 'Reduce Stress', icon: Brain, desc: 'Mindfulness and recovery' },
];

export function Step3FitnessGoals() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [selectedGoals, setSelectedGoals] = React.useState<string[]>(data.goals || []);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(id)) return prev.filter(g => g !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const onSubmit = () => {
    updateData({ goals: selectedGoals });
    nextStep();
  };

  // ✨ SAME animation system
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Fitness Goals</h2>
        <p className="text-sm text-muted-foreground">
          Select up to 3 goals to focus on.
        </p>
      </motion.div>

      {/* Goals Grid */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1"
      >
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          const isDisabled = !isSelected && selectedGoals.length >= 3;

          return (
            <motion.div
              key={goal.id}
              variants={item}
              whileHover={!isDisabled ? { scale: 1.03 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
              onClick={() => !isDisabled && toggleGoal(goal.id)}
              className={cn(
                "relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-muted bg-card hover:border-primary/50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div
                  className={cn(
                    "p-2 rounded-lg transition",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}
                >
                  <goal.icon className="w-5 h-5" />
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>

              <h4
                className={cn(
                  "font-semibold text-sm",
                  isSelected ? "text-primary" : "text-foreground"
                )}
              >
                {goal.label}
              </h4>

              <p className="text-xs text-muted-foreground mt-1">
                {goal.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Buttons */}
      <motion.div variants={item} className="flex gap-4 pt-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
          <Button variant="outline" className="w-full" onClick={prevStep}>
            Back
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
          <Button className="w-full" onClick={onSubmit} disabled={selectedGoals.length === 0}>
            Continue
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}