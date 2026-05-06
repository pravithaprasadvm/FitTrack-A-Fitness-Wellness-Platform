import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-background/80 backdrop-blur-lg border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your life?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already achieved their fitness goals with FitTrack. Start your free trial today.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Enter your email address" className="h-12 flex-1" />
            <Button size="lg" type="submit" className="h-12 w-full sm:w-auto px-8">Get Started</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">No credit card required. 14-day free trial.</p>
        </motion.div>
      </div>
    </section>
  );
}
