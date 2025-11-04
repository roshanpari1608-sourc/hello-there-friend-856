import Navbar from "@/components/Navbar";
import { Shield, Brain, Lock, Zap } from "lucide-react";

export default function About() {
  const technologies = [
    {
      title: "Convolutional Neural Networks (CNNs)",
      description: "Trained to detect inconsistencies in facial features, expressions, and movements. Analyzes video frames over time to identify unnatural transitions.",
    },
    {
      title: "Recurrent Neural Networks (RNNs) & LSTM",
      description: "Analyzes sequences of frames to detect temporal anomalies and inconsistencies indicative of deep fakes.",
    },
    {
      title: "Capsule Networks",
      description: "Identifies discrepancies in facial pose and texture with superior spatial hierarchy understanding.",
    },
    {
      title: "Audio-Visual Inconsistency Detection",
      description: "Combines audio and visual analysis to identify mismatches between lip movements and speech.",
    },
    {
      title: "Frequency Analysis",
      description: "Analyzes the frequency domain of videos to detect anomalies and artifacts introduced during deep fake creation.",
    },
    {
      title: "Biometric Verification",
      description: "Analyzes subtle behavioral traits such as micro-expressions, eye, and head movements to detect anomalies.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">About Deep Guard AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A cutting-edge solution for detecting face-swap based deep fake videos using
              advanced AI/ML technology
            </p>
          </div>

          {/* Problem Statement */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">The Deep Fake Challenge</h2>
            <div className="bg-card p-8 rounded-lg border border-border space-y-4">
              <p className="text-lg text-muted-foreground">
                Synthetically-generated audios and videos (deep fakes) have become increasingly sophisticated,
                creating serious concerns about their potential to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Disrupt national politics and spread disinformation</li>
                <li>Commit fraud and financial crimes</li>
                <li>Create non-consensual content and defame individuals</li>
                <li>Undermine trust in digital media</li>
              </ul>
              <p className="text-lg text-muted-foreground mt-4">
                Due to enhancements in AI/ML and Large Language Models for Generative AI, identification
                and detection of deep fakes have created a huge challenge for security agencies worldwide.
              </p>
            </div>
          </section>

          {/* Our Solution */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Multi-Modal Analysis</h3>
                <p className="text-muted-foreground">
                  Deep Guard AI combines multiple detection methods including spatial, temporal,
                  audio, and frequency analysis to achieve superior accuracy.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <Lock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Secure Processing</h3>
                <p className="text-muted-foreground">
                  All videos are processed in a secure, encrypted environment. We prioritize
                  your privacy and never share your data.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Fast & Accurate</h3>
                <p className="text-muted-foreground">
                  Get detailed forensic reports within minutes, with confidence scores and
                  identification of specific abnormalities.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Comprehensive Reports</h3>
                <p className="text-muted-foreground">
                  Receive detailed analysis including authenticity verification, detected anomalies,
                  and mathematical techniques used in fake creation.
                </p>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Technologies We Use</h2>
            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="bg-card p-8 rounded-lg border border-border">
              <ol className="space-y-4 text-lg">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <strong>Upload Your Video:</strong> Upload the video you suspect might be a deep fake
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <strong>AI Analysis:</strong> Our multi-layered AI models analyze facial features, temporal consistency,
                    audio-visual synchronization, and frequency patterns
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <strong>Detailed Report:</strong> Receive a comprehensive report with authenticity assessment,
                    confidence scores, and identified abnormalities
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <strong>AI Assistant:</strong> Chat with our AI assistant to understand the results and get
                    insights about the analysis
                  </div>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}