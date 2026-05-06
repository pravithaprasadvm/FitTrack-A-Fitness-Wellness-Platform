# 🚀 FitTrack – Fitness Onboarding & Dashboard App

FitTrack is a modern fitness web application that guides users through a multi-step onboarding process and provides a personalized dashboard to track activity, goals, and progress.

---

## 📌 Features

* 🏠 Landing Page with CTA (Get Started)
* 🧭 Multi-step Onboarding Flow (Step 1 → Step 5)
* ✅ Form validation using Zod + React Hook Form
* 🎯 Goal selection & activity tracking
* 📊 Interactive Dashboard with charts
* 🌗 Dark / Light theme toggle (Dashboard)
* 🎨 Smooth animations using Framer Motion
* 📱 Fully responsive design

---

## 🧩 Component Architecture

### 🔹 1. Landing Page

* Entry point of the application
* Contains hero section, Feature, how it work, pricing and **“Get Started”** button
* Redirects users to onboarding flow

---

### 🔹 2. Onboarding Flow (Controller)

**Component:** `OnboardingFlow`

* Manages step navigation (Step 1–5)
* Displays progress bar
* Dynamically renders current step component
* Uses global state for data persistence

---

### 🔹 3. State Management

**Store:** `useOnboardingStore`

Handles:

* Current step tracking
* User input data across all steps

```ts
{
  step: number,
  fullName,
  email,
  password,
  dob,
  gender,
  height,
  weight,
  goals,
  activityLevel,
  username,
  bio,
  notifications
}
```

---

### 🔹 4. Onboarding Steps

Each step is a modular, reusable component:

#### Step 1 – Create Account

* Name, Email, Password
* Form validation

#### Step 2 – Personal Details

* DOB, Gender, Height, Weight
* Uses sliders and radio inputs

#### Step 3 – Fitness Goals

* Select up to 3 goals
* Card-based UI

#### Step 4 – Activity Level

* Single selection (radio-style cards)

#### Step 5 – Profile Setup

* Username, Bio, Avatar upload
* Notification toggle
* Final submission → Dashboard

---

### 🔹 5. Animation Layer

* Implemented using **Framer Motion**
* Smooth transitions between steps
* Staggered animations for form elements

---

### 🔹 6. Dashboard Layout

**Component:** `DashboardLayout`

* Sidebar navigation
* Top header (notifications, profile)
* Mobile bottom navigation
* Theme toggle (Dark / Light)

---

### 🔹 7. Dashboard Page

* Welcome section
* Stats cards (Calories, Activity Time, Streak)
* Weekly activity chart (Recharts)
* Workout plan list

---

## 🔁 Application Flow

```
Landing Page
   ↓
Get Started
   ↓
Onboarding Flow
   ↓
Step1 → Step2 → Step3 → Step4 → Step5
   ↓
Dashboard
```

---

## 🏗️ Tech Stack

* ⚛️ React.js
* 🎨 Tailwind CSS
* 🧠 Zustand (State Management)
* ✅ React Hook Form + Zod (Validation)
* 🎬 Framer Motion (Animations)
* 📊 Recharts (Charts)
* 🧩 ShadCN UI Components

---

## 📦 Installation

```bash
git clone https://github.com/your-username/fittrack.git
cd fittrack
npm install
npm run dev
```

---

## 🌟 Key Highlights

* Modular and scalable architecture
* Clean separation of UI and logic
* Reusable components
* Smooth user experience with animations
* Responsive and modern UI design

---

## 📌 Future Improvements

* Authentication integration
* API-based data persistence
* Advanced analytics dashboard
* Social features & community

---

## 🙌 Author

Developed by **Pravitha VM**

---

