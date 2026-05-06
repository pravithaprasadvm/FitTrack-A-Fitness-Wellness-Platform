import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const step5Schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
  notifications: z.boolean(),
});

type Step5Values = z.infer<typeof step5Schema>;

export function Step5ProfileSetup() {
  const { data, updateData, prevStep } = useOnboardingStore();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      username: data.username || '',
      bio: data.bio || '',
      notifications: data.notifications ?? true,
    },
    mode: 'onChange',
  });

  const onSubmit = (values: Step5Values) => {
    updateData(values);
    setIsCompleted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
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

  // ✅ Success screen (enhanced animation)
  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center"
>
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className="flex justify-center mb-4"
  >
    <div className="flex justify-center mb-4">
  <div className="p-4 rounded-full bg-primary/10 shadow-lg shadow-primary/20">
    <CheckCircle className="w-8 h-8 text-primary" />
  </div>
</div>
  </motion.div>

  <h2 className="text-3xl font-bold mb-2 text-foreground">
    Welcome to FitTrack!
  </h2>
  <p className="text-muted-foreground">
    Your profile is set up. Redirecting to dashboard...
  </p>
</motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Profile Setup</h2>
        <p className="text-sm text-muted-foreground">
          Customize your public profile.
        </p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Avatar */}
        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/50 overflow-hidden flex items-center justify-center bg-muted/50 group cursor-pointer hover:border-primary transition-colors"
          >
            {avatarPreview ? (
              <img src={avatarPreview} className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </motion.div>

          <span className="text-xs text-muted-foreground font-medium">
            Upload Avatar (optional)
          </span>
        </motion.div>

        {/* Username */}
        <motion.div variants={item} className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="@fitness_guru"
            {...register('username')}
            className={errors.username ? 'border-destructive' : ''}
          />
          {errors.username && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {errors.username.message}
            </motion.p>
          )}
        </motion.div>

        {/* Bio */}
        <motion.div variants={item} className="space-y-2">
          <Label htmlFor="bio">Short Bio (Optional)</Label>
          <Input
            id="bio"
            placeholder="Marathon runner & yogi"
            {...register('bio')}
            className={errors.bio ? 'border-destructive' : ''}
          />
          {errors.bio && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {errors.bio.message}
            </motion.p>
          )}
        </motion.div>

        {/* Notifications */}
        <motion.div
          variants={item}
          className="flex items-center justify-between rounded-lg border border-border p-4 bg-card"
        >
          <div>
            <Label className="text-base">Push Notifications</Label>
            <p className="text-xs text-muted-foreground">
              Receive reminders for workouts and meals.
            </p>
          </div>
          <Switch
            checked={watch('notifications')}
            onCheckedChange={(val: boolean) => setValue('notifications', val)}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div variants={item} className="flex gap-4 pt-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
            <Button type="button" variant="outline" className="w-full" onClick={prevStep}>
              Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="flex-1">
            <Button type="submit" className="w-full" disabled={!isValid}>
              Finish Setup
            </Button>
          </motion.div>
        </motion.div>

        {/* Skip */}
        <motion.div variants={item} className="text-center mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() =>
              onSubmit({
                username: 'User' + Math.floor(Math.random() * 1000),
                notifications: true,
              })
            }
            className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2"
          >
            Skip for now
          </motion.button>
        </motion.div>

      </motion.form>
    </motion.div>
  );
}