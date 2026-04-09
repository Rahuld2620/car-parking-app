"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Car, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    drivingLicense: "",
    vehicleNumber: "",
    permanentAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!formData.drivingLicense.trim())
      newErrors.drivingLicense = "Driving license number is required";
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Permanent address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      // Store user data in sessionStorage for the dashboard
      sessionStorage.setItem("sps_user", JSON.stringify(formData));
      sessionStorage.setItem("sps_user_logged_in", "true");
      router.push("/dashboard/user");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 py-4 px-4 md:px-8 border-b border-border">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">Find My Spot</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Driver Registration
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Register your details to start finding and booking parking spots near you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="h-12"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Driving License */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="drivingLicense"
              className="text-sm font-medium text-foreground"
            >
              Driving License Number
            </Label>
            <Input
              id="drivingLicense"
              placeholder="e.g. KA01-2024-0012345"
              value={formData.drivingLicense}
              onChange={(e) =>
                setFormData({ ...formData, drivingLicense: e.target.value })
              }
              className="h-12"
            />
            {errors.drivingLicense && (
              <p className="text-sm text-destructive">
                {errors.drivingLicense}
              </p>
            )}
          </div>

          {/* Vehicle Number */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="vehicleNumber"
              className="text-sm font-medium text-foreground"
            >
              Vehicle Number
            </Label>
            <Input
              id="vehicleNumber"
              placeholder="e.g. KA-01-AB-1234"
              value={formData.vehicleNumber}
              onChange={(e) =>
                setFormData({ ...formData, vehicleNumber: e.target.value })
              }
              className="h-12"
            />
            {errors.vehicleNumber && (
              <p className="text-sm text-destructive">
                {errors.vehicleNumber}
              </p>
            )}
          </div>

          {/* Permanent Address */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="permanentAddress"
              className="text-sm font-medium text-foreground"
            >
              Permanent Address
            </Label>
            <textarea
              id="permanentAddress"
              placeholder="Enter your permanent address"
              rows={3}
              value={formData.permanentAddress}
              onChange={(e) =>
                setFormData({ ...formData, permanentAddress: e.target.value })
              }
              className="flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
            {errors.permanentAddress && (
              <p className="text-sm text-destructive">
                {errors.permanentAddress}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Register & Continue"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}
