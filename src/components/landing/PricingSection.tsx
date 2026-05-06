import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started.',
    features: ['Basic workout tracking', 'Standard exercises library', '1 custom routine', 'Community access'],
    popular: false,
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/mo',
    description: 'Everything you need to level up.',
    features: ['Advanced analytics', 'Unlimited custom routines', 'Macro & nutrition tracking', 'Priority support', 'Goal setting'],
    popular: true,
    buttonVariant: 'default' as const,
  },
  {
    name: 'Elite',
    price: '$19.99',
    period: '/mo',
    description: 'For serious athletes.',
    features: ['1-on-1 coaching access', 'Video form analysis', 'Custom meal plans', 'Early access to new features', 'All Pro features'],
    popular: false,
    buttonVariant: 'outline' as const,
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your fitness journey. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/50' : 'border-border/50'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                    {plan.price}
                    {plan.period && <span className="ml-1 text-xl font-medium text-muted-foreground">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.buttonVariant} size="lg">
                    {plan.name === 'Free' ? 'Get Started' : 'Subscribe Now'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
