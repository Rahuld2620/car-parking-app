"use client";

import { useRouter } from "next/navigation";
import { AppProvider } from "@/lib/app-context";
import { Car, Building2, ArrowRight, MapPin, Shield, Clock } from "lucide-react";

function LandingContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-6 px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            SPS Space
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Smart Parking Solution
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
            Park Smarter, Not Harder
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Find available parking instantly or list your space to earn.
            Connecting drivers with parking owners seamlessly.
          </p>
        </div>

        {/* Two Role Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
          {/* User / Driver Button */}
          <button
            type="button"
            onClick={() => router.push("/register/user")}
            className="group relative flex flex-col items-center gap-6 p-10 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Car className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Find My Spot
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Looking for parking? Register as a driver and discover
                available spots near you instantly.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Owner Button */}
          <button
            type="button"
            onClick={() => router.push("/register/owner")}
            className="group relative flex flex-col items-center gap-6 p-10 rounded-2xl bg-card border-2 border-border hover:border-accent transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
          >
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Building2 className="w-10 h-10 text-accent" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                SpotHost
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Own a parking space? List it and start earning from
                drivers looking for spots nearby.
              </p>
            </div>
            <div className="flex items-center gap-2 text-accent font-medium text-sm">
              <span>Start Earning</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl mx-auto mt-20">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">GPS Enabled</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find the nearest parking spots with real-time GPS tracking
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Verified & Safe</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All parking spots and owners are verified for your safety
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Real-Time</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Live availability updates so you never waste time searching
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          SPS Space - Smart Parking Solution
        </p>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <LandingContent />
    </AppProvider>
  );
}
