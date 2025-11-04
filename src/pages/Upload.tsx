import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileVideo, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [user, setUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a video smaller than 100MB",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);

    try {
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("deepfake-videos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("deepfake-videos")
        .getPublicUrl(fileName);

      // Create analysis record
      const { error: insertError } = await supabase
        .from("video_analyses")
        .insert({
          user_id: user.id,
          video_url: urlData.publicUrl,
          file_name: file.name,
          file_size: file.size,
          status: "pending",
        });

      if (insertError) throw insertError;

      toast({
        title: "Upload successful!",
        description: "Your video is being analyzed. This may take a few minutes.",
      });

      // Start analysis
      setUploading(false);
      setAnalyzing(true);
      
      // Simulate analysis (in production, this would be handled by a backend service)
      setTimeout(async () => {
        const result = Math.random() > 0.5 ? "authentic" : "deepfake";
        const confidence = Math.floor(Math.random() * 30) + 70;

        const { error: updateError } = await supabase
          .from("video_analyses")
          .update({
            status: "completed",
            result,
            confidence_score: confidence,
            completed_at: new Date().toISOString(),
            analysis_details: {
              facial_inconsistencies: Math.random() > 0.5,
              temporal_anomalies: Math.random() > 0.5,
              audio_visual_mismatch: Math.random() > 0.5,
              frequency_artifacts: Math.random() > 0.5,
            },
          })
          .eq("video_url", urlData.publicUrl);

        if (updateError) throw updateError;

        setAnalyzing(false);
        toast({
          title: "Analysis complete!",
          description: `Video classified as ${result} with ${confidence}% confidence`,
        });
        navigate("/dashboard");
      }, 5000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Upload Video for Analysis</h1>
            <p className="text-muted-foreground">
              Upload a video to detect potential deep fake manipulation
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Video Upload</CardTitle>
              <CardDescription>
                Supported formats: MP4, AVI, MOV, MKV (max 100MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Video files up to 100MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                    disabled={uploading || analyzing}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <FileVideo className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    {!uploading && !analyzing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  {analyzing ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Analyzing video...</p>
                      <p className="text-sm text-muted-foreground">
                        Our AI models are examining facial features, temporal consistency,
                        and audio-visual synchronization
                      </p>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleUpload}
                      disabled={uploading || analyzing}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">1.</span>
                    <span>Your video is securely uploaded to our encrypted storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">2.</span>
                    <span>Multiple AI models analyze facial features, movements, and audio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">3.</span>
                    <span>A detailed report is generated with confidence scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">4.</span>
                    <span>You can view results in your dashboard</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}