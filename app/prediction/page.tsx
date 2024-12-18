'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';

// Validation Schema
const formSchema = z.object({
  age: z.coerce.number().min(0, "Age must be positive").max(120, "Age seems unrealistic"),
  hypertension: z.enum(['0', '1'], { 
    required_error: "Select hypertension status" 
  }),
  heart_disease: z.enum(['0', '1'], { 
    required_error: "Select heart disease status" 
  }),
  avg_glucose_level: z.coerce.number().min(50, "Glucose level too low").max(300, "Glucose level too high"),
  bmi: z.coerce.number().min(10, "BMI too low").max(60, "BMI too high"),
  gender: z.enum(['Male', 'Female'], { 
    required_error: "Select gender" 
  }),
  ever_married: z.enum(['Yes', 'No'], { 
    required_error: "Select marital status" 
  }),
  work_type: z.enum(['Private', 'Self-employed', 'Govt_job', 'children'], { 
    required_error: "Select work type" 
  }),
  Residence_type: z.enum(['Urban', 'Rural'], { 
    required_error: "Select residence type" 
  }),
  smoking_status: z.enum(['Never_smoked', 'Smokes', 'Formerly_smoked'], { 
    required_error: "Select smoking status" 
  })
});

type FormData = z.infer<typeof formSchema>;

export default function StrokeRiskPredictionForm() {
  const [result, setResult] = useState<{
    stroke_prediction: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with zod and react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      hypertension: '0',
      heart_disease: '0',
      avg_glucose_level: 0,
      bmi: 0,
      gender: 'Male',
      ever_married: 'No',
      work_type: 'Private',
      Residence_type: 'Urban',
      smoking_status: 'Never_smoked'
    }
  });

  const onSubmit = useCallback(async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formattedData = {
      age: Number(data.age),
      hypertension: Number(data.hypertension),
      heart_disease: Number(data.heart_disease),
      avg_glucose_level: Number(data.avg_glucose_level),
      bmi: Number(data.bmi),
      gender_Male: data.gender === 'Male' ? 1 : 0,
      gender_Other: 0,
      ever_married_Yes: data.ever_married === 'Yes' ? 1 : 0,
      work_type_Never_worked: data.work_type === 'Govt_job' ? 1 : 0,
      work_type_Private: data.work_type === 'Private' ? 1 : 0,
      work_type_children: data.work_type === 'children' ? 1 : 0,
      "work_type_Self-employed": data.work_type === 'Self-employed' ? 1 : 0,
      Residence_type_Urban: data.Residence_type === 'Urban' ? 1 : 0,
      "smoking_status_formerly smoked": data.smoking_status === 'Formerly_smoked' ? 1 : 0,
      "smoking_status_never smoked": data.smoking_status === 'Never_smoked' ? 1 : 0,
      smoking_status_smokes: data.smoking_status === 'Smokes' ? 1 : 0,
    };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError('Failed to predict stroke risk. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderAlert = useMemo(() => {
    if (result) {
      const isHighRisk = result.stroke_prediction === 1
      return (
        <Alert variant={isHighRisk ? "destructive" : "default"}>
          {isHighRisk ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          <AlertTitle>
            {result.stroke_prediction ? 'Potential Stroke Risk Detected' : 'Low Stroke Risk'}
          </AlertTitle>
          <AlertDescription>
            You {result.stroke_prediction ? 'have' : 'dont have'} a stroke risk.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  }, [result]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-32 max-w-2xl min-h-screen"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Stroke Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Personal Information Section */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                {/* Health Metrics Section */}
                <FormField
                  control={form.control}
                  name="avg_glucose_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Glucose Level</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter glucose level" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter BMI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Additional Risk Factors */}
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="hypertension"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hypertension</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hypertension" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heart_disease"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heart Disease</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Heart Disease" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No</SelectItem>
                          <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smoking_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Smoking Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Smoking Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Never_smoked">Never Smoked</SelectItem>
                          <SelectItem value="Smokes">Smokes</SelectItem>
                          <SelectItem value="Formerly_smoked">Formerly Smoked</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Lifestyle Section */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="work_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Work Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Self-employed">Self-employed</SelectItem>
                          <SelectItem value="Govt_job">Government Job</SelectItem>
                          <SelectItem value="children">Children</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Residence_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Residence Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Urban">Urban</SelectItem>
                          <SelectItem value="Rural">Rural</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Predicting...' : 'Assess Stroke Risk'}
              </Button>
            </form>
          </Form>

          {/* Result Section */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {renderAlert}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}