import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Apple, LineChart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Workout Tracking',
    description: 'Log your exercises, sets, reps, and weights with our intuitive interface. Build custom routines.',
    icon: Activity,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Nutrition Plans',
    description: 'Personalized meal plans and macro tracking to fuel your body and reach your goals faster.',
    icon: Apple,
    color: 'bg-green-500/10 text-green-500',
  },
  {
    title: 'Progress Analytics',
    description: 'Visualize your journey with beautiful charts and insights. Track measurements and milestones.',
    icon: LineChart,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Community',
    description: 'Connect with like-minded individuals, share achievements, and join challenges to stay motivated.',
    icon: Users,
    color: 'bg-orange-500/10 text-orange-500',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-lg text-muted-foreground">
            We provide all the tools required to track, analyze, and improve your fitness and wellness journey in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
