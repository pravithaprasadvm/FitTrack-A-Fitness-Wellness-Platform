import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const step1Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Step1Values = z.infer<typeof step1Schema>;

export function Step1CreateAccount() {
  const { data, updateData, nextStep } = useOnboardingStore();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
    },
    mode: 'onChange',
  });

  const onSubmit = (values: Step1Values) => {
    updateData({ fullName: values.fullName, email: values.email, password: values.password });
    nextStep();
  };

  // ✨ Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-sm text-muted-foreground">
          Start your fitness journey today.
        </p>
      </motion.div>

      {/* Google Button */}
      <motion.div variants={item}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full relative overflow-hidden border rounded-md px-4 py-2 flex items-center justify-center"
          type="button"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25..." />
          </svg>
          Sign up with Google
        </motion.button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={item} className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Input Field Animation */}
        {[
          { id: 'fullName', label: 'Full Name', type: 'text' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'password', label: 'Password', type: 'password' },
          { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
        ].map((field) => (
          <motion.div key={field.id} variants={item} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.type}
              {...register(field.id as keyof Step1Values)}
              className={errors[field.id as keyof Step1Values] ? 'border-destructive' : ''}
            />

            {/* Error Animation */}
            {errors[field.id as keyof Step1Values] && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive"
              >
                {errors[field.id as keyof Step1Values]?.message}
              </motion.p>
            )}
          </motion.div>
        ))}

        {/* Submit Button */}
        <motion.div variants={item}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
            <Button type="submit" className="w-full" disabled={!isValid}>
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}