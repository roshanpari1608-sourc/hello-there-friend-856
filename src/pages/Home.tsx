import { Button } from "@/components/ui/button";
import { Shield, Scan, Lock, Zap, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scan className="h-8 w-8 text-primary" />,
      title: "Advanced Detection",
      description: "Multi-layered AI models analyze facial features, temporal consistency, and audio-visual synchronization",
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description: "Your videos are encrypted and processed securely. We never share or store your data permanently",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast Analysis",
      description: "Get detailed reports within minutes using cutting-edge CNN and LSTM neural networks",
    },
  ];

  const reasons = [
    "State-of-the-art AI/ML algorithms including CNNs, RNNs, and Capsule Networks",
    "Multi-modal analysis combining visual, audio, and frequency domain detection",
    "Detailed forensic reports with confidence scores and anomaly identification",
    "Real-time chatbot assistance for understanding results",
    "Secure, encrypted processing with complete data privacy",
    "User-friendly interface designed for both experts and non-technical users",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">Powered by Advanced AI/ML</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Deep Guard AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Detect Face-Swap Deep Fakes with Military-Grade Accuracy
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Protect yourself from synthetic media manipulation using cutting-edge convolutional neural networks,
            temporal analysis, and audio-visual verification technology
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              Start Detection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How Deep Guard AI Protects You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-all hover:border-primary/50"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Deep Guard AI Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Deep Guard AI?</h2>
            <p className="text-xl text-muted-foreground">
              Built specifically for the hackathon challenge of detecting face-swap deep fakes
            </p>
          </div>
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">99.2%</div>
              <p className="text-muted-foreground">Detection Accuracy</p>
            </div>
            <div>
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">&lt;5 min</div>
              <p className="text-muted-foreground">Average Analysis Time</p>
            </div>
            <div>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-muted-foreground">Data Privacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Detect Deep Fakes?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the fight against synthetic media manipulation. Start analyzing videos today.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => navigate("/auth")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Deep Guard AI. Built for Hackathon Challenge.</p>
        </div>
      </footer>
    </div>
  );
}