import { create } from 'zustand';

interface OnboardingState {
  step: number;
  data: any; // Using any for simplicity here, can be refined
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: any) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  data: {
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    height: 170,
    weight: 70,
    goals: [],
    activityLevel: '',
    username: '',
    bio: '',
    notifications: true,
  },
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
