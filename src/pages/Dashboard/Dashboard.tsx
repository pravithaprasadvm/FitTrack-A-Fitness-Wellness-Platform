import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, Clock, CalendarDays, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const activityData = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 45 },
  { day: 'Fri', minutes: 90 },
  { day: 'Sat', minutes: 120 },
  { day: 'Sun', minutes: 20 },
];

const todayWorkout = [
  { id: 1, name: 'Warm up (Jumping Jacks)', duration: '5 min', completed: true },
  { id: 2, name: 'Dumbbell Bench Press', duration: '4 sets x 10 reps', completed: true },
  { id: 3, name: 'Incline Dumbbell Press', duration: '3 sets x 12 reps', completed: false },
  { id: 4, name: 'Cable Crossovers', duration: '3 sets x 15 reps', completed: false },
  { id: 5, name: 'Cool down stretch', duration: '10 min', completed: false },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
            <p className="text-muted-foreground mt-1">You're on a 5-day streak. Keep it up!</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">Log Meal</Button>
            <Button className="flex-1 sm:flex-none">Start Workout</Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Calories Burned</p>
                <h3 className="text-2xl font-bold">2,450 <span className="text-sm font-normal text-muted-foreground">kcal</span></h3>
              </div>
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-full">
                <Flame className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Time</p>
                <h3 className="text-2xl font-bold">4.5 <span className="text-sm font-normal text-muted-foreground">hrs</span></h3>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                <Clock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Streak</p>
                <h3 className="text-2xl font-bold">5 <span className="text-sm font-normal text-muted-foreground">days</span></h3>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-full">
                <CalendarDays className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Goal Progress</p>
                  <span className="text-sm font-bold text-primary">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-primary/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your active minutes over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Workout */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>Today's Plan</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Edit</Button>
              </div>
              <CardDescription>Chest & Triceps Focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayWorkout.map((exercise) => (
                  <div key={exercise.id} className="flex items-start gap-3">
                    <button className="mt-0.5 text-muted-foreground hover:text-primary transition-colors">
                      {exercise.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <p className={cn("text-sm font-medium", exercise.completed && "text-muted-foreground line-through")}>
                        {exercise.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{exercise.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6">Continue Workout</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
