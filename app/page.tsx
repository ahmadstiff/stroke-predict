'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Activity, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  badgeText 
}) => (
  <Card className="hover:shadow-xl transition-all duration-300 group">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
        {badgeText && (
          <Badge variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
            {badgeText}
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <CardTitle className="text-xl mb-2">{title}</CardTitle>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function StrokeRiskPredictionPage() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze multiple health factors",
      badgeText: "Machine Learning"
    },
    {
      icon: <Activity className="w-6 h-6 text-green-500" />,
      title: "Comprehensive Monitoring",
      description: "Track and assess multiple health metrics contributing to stroke risk",
      badgeText: "360° Health View"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Personalized Prevention",
      description: "Tailored recommendations to mitigate individual stroke risks",
      badgeText: "Custom Insights"
    }
  ];

  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-5 md:px-20 pt-32 pb-10 space-y-16"
      >
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-lime-500 to-amber-500 bg-clip-text text-transparent"
          >
            Stroke Risk Intelligence
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Leverage cutting-edge AI to predict, understand, and proactively manage your stroke risk through comprehensive health analysis.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/prediction">
              <Button 
                size="lg" 
                className="group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Risk Assessment
                <ArrowRight 
                  className={`ml-2 transition-transform ${
                    isHovered ? 'translate-x-1' : ''
                  }`} 
                />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </section>

        {/* Detailed Explanation Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Tooltip>
              <TooltipTrigger>
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src="https://i.pinimg.com/736x/05/ac/f0/05acf0eb7e04a4c11e9d048ee9112e83.jpg"
                    alt="Medical Data Visualization"
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                AI-Powered Health Visualization
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-teal-500 bg-clip-text text-transparent">How We Predict Stroke Risks</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <ShieldCheck className="w-8 h-8 text-green-500" />
                <p className="text-muted-foreground">
                  Intelligent risk assessment using multi-factor health analysis
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <TrendingUp className="w-8 h-8 text-blue-500" />
                <p className="text-muted-foreground">
                  Predictive modeling with machine learning algorithms
                </p>
              </div>
            </div>
            <Link href="/prediction">
              <Button variant="outline" className='ms-3 mt-3'>Learn More</Button>
            </Link>
          </div>
        </section>
      </motion.div>
    </TooltipProvider>
  );
}