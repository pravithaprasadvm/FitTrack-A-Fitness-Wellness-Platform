import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const step2Schema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(300),
});

type Step2Values = z.infer<typeof step2Schema>;

export function Step2PersonalDetails() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      dob: data.dob,
      gender: data.gender || 'prefer_not_to_say',
      height: data.height || 170,
      weight: data.weight || 70,
    },
    mode: 'onChange',
  });

  const height = watch('height');
  const weight = watch('weight');

  const onSubmit = (values: Step2Values) => {
    updateData(values);
    nextStep();
  };

  // ✨ Animation (same as Step1)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
        <h2 className="text-2xl font-bold">Personal Details</h2>
        <p className="text-sm text-muted-foreground">
          Help us tailor your experience.
        </p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* DOB */}
        <motion.div variants={item} className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            {...register('dob')}
            className={errors.dob ? 'border-destructive' : ''}
          />
          {errors.dob && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {errors.dob.message}
            </motion.p>
          )}
        </motion.div>

        {/* Gender */}
        <motion.div variants={item} className="space-y-3">
          <Label>Gender</Label>
          <RadioGroup
            defaultValue={watch('gender')}
            onValueChange={(v: string) =>
              setValue('gender', v as any, { shouldValidate: true })
            }
            className="flex flex-wrap gap-2"
          >
            {[
              { id: 'male', label: 'Male' },
              { id: 'female', label: 'Female' },
              { id: 'other', label: 'Other' },
              { id: 'prefer_not_to_say', label: 'Prefer not to say' },
            ].map((option) => (
              <motion.div
                key={option.id}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="flex-1 min-w-[100px]"
              >
                <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                <Label
                  htmlFor={option.id}
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 md:p-3 hover:bg-accent peer-data-[state=checked]:border-primary cursor-pointer text-xs sm:text-sm font-medium"
                >
                  {option.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        {/* Height */}
        <motion.div variants={item} className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <Label>Height</Label>
            <span className="text-sm font-bold text-primary">{height} cm</span>
          </div>
          <Slider
            min={100}
            max={250}
            step={1}
            value={[height]}
            onValueChange={(val: number[]) =>
              setValue('height', val[0], { shouldValidate: true })
            }
          />
        </motion.div>

        {/* Weight */}
        <motion.div variants={item} className="space-y-4 pt-2">
          <div className="flex justify-between items-center">
            <Label>Weight</Label>
            <span className="text-sm font-bold text-primary">{weight} kg</span>
          </div>
          <Slider
            min={30}
            max={200}
            step={1}
            value={[weight]}
            onValueChange={(val: number[]) =>
              setValue('weight', val[0], { shouldValidate: true })
            }
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
              Continue
            </Button>
          </motion.div>
        </motion.div>

      </motion.form>
    </motion.div>
  );
}