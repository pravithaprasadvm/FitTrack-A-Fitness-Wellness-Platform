import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Briefcase, Coffee, Activity, Flame, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

const levels = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little to no exercise', icon: Briefcase },
  { id: 'lightly_active', label: 'Lightly Active', desc: 'Light exercise 1-2 days/week', icon: Coffee },
  { id: 'moderately_active', label: 'Moderately Active', desc: 'Moderate exercise 3-4 days/week', icon: Activity },
  { id: 'very_active', label: 'Very Active', desc: 'Hard exercise 5-6 days/week', icon: Flame },
  { id: 'athlete', label: 'Athlete', desc: 'Intense exercise daily', icon: Dumbbell },
];

export function Step4ActivityLevel() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();
  const [selectedLevel, setSelectedLevel] = React.useState<string>(data.activityLevel || '');

  const onSubmit = () => {
    updateData({ activityLevel: selectedLevel });
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
        <h2 className="text-2xl font-bold">Activity Level</h2>
        <p className="text-sm text-muted-foreground">How active are you currently?</p>
      </motion.div>

      {/* Levels */}
      <motion.div variants={container} className="space-y-3 max-h-[50vh] overflow-y-auto p-1">
        {levels.map((level) => {
          const isSelected = selectedLevel === level.id;

          return (
            <motion.div
              key={level.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedLevel(level.id)}
              className={cn(
                "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group",
                isSelected ? "border-primary bg-primary/5" : "border-muted bg-card hover:border-primary/50"
              )}
            >
              <div className={cn(
                "p-2 rounded-full mr-4 flex-shrink-0",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
              )}>
                {React.createElement(level.icon, { className: "w-5 h-5" })}
              </div>

              <div className="flex-1">
                <h4 className={cn("font-semibold text-sm", isSelected ? "text-primary" : "text-foreground")}>
                  {level.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
              </div>

              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex-shrink-0 ml-2 flex items-center justify-center",
                isSelected ? "border-primary" : "border-muted-foreground/30"
              )}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
    <Button variant="outline" className="w-full" onClick={prevStep}>
      Back
    </Button>
  </motion.div>

  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
    <Button className="w-full" onClick={onSubmit} disabled={!selectedLevel}>
      Continue
    </Button>
  </motion.div>
</div>

      {/* Skip */}
      <motion.div variants={item} className="text-center mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { updateData({ activityLevel: '' }); nextStep(); }}
          className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2"
        >
          Skip for now
        </motion.button>
      </motion.div>
    </motion.div>
  );
}