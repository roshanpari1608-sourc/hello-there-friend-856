import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Network, Zap, Shield, Eye, Cpu } from "lucide-react";

export default function AI() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const technologies = [
    {
      icon: Brain,
      title: "Convolutional Neural Networks (CNNs)",
      description: "Advanced deep learning models trained to detect inconsistencies in facial features, expressions, and movements across video frames.",
    },
    {
      icon: Network,
      title: "Recurrent Neural Networks (RNNs & LSTMs)",
      description: "Analyze temporal sequences in videos to identify unnatural transitions and temporal anomalies indicative of deep fakes.",
    },
    {
      icon: Zap,
      title: "Adversarial Training",
      description: "Using GANs to generate and detect deep fakes simultaneously, improving detection algorithm robustness through continuous learning.",
    },
    {
      icon: Eye,
      title: "Audio-Visual Analysis",
      description: "Combining audio and visual analysis to detect mismatches between lip movements and speech, plus ambient sound inconsistencies.",
    },
    {
      icon: Shield,
      title: "Frequency Domain Analysis",
      description: "Analyzing the frequency domain of images and videos to detect anomalies and artifacts introduced during deep fake creation.",
    },
    {
      icon: Cpu,
      title: "Biometric Verification",
      description: "Analyzing subtle behavioral traits such as micro-expressions, eye movements, and head movements to detect anomalies.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">AI Detection Technology</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging cutting-edge artificial intelligence and machine learning algorithms to detect face-swap deep fake videos with exceptional accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <tech.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {tech.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Our Hybrid Detection Approach</CardTitle>
              <CardDescription className="text-base">
                Deep Guard AI combines multiple detection methods for superior accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our detection system employs a hybrid model that integrates spatial, temporal, audio, and frequency analysis. This multi-faceted approach ensures:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Higher detection accuracy by cross-validating findings across multiple AI models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Reduced false positives through comprehensive multi-modal analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Detailed forensic reports explaining detected abnormalities and mathematical techniques used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Continuous model improvement through adversarial training and real-world data</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
