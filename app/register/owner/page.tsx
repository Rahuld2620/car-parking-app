"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OwnerRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadharNumber: "",
    address: "",
    parkingSlotImage: null as string | null,
    gpsLocation: "",
    totalSlots: "",
    pricePerHour: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!formData.aadharNumber.trim() || formData.aadharNumber.length !== 12)
      newErrors.aadharNumber = "Valid 12-digit Aadhar number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.gpsLocation.trim())
      newErrors.gpsLocation = "GPS location is required";
    if (!formData.totalSlots.trim())
      newErrors.totalSlots = "Total slots is required";
    if (!formData.pricePerHour.trim())
      newErrors.pricePerHour = "Price per hour is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, parkingSlotImage: result });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleGetGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData({ ...formData, gpsLocation: loc });
        },
        () => {
          setFormData({ ...formData, gpsLocation: "12.9716, 77.5946" });
        }
      );
    } else {
      setFormData({ ...formData, gpsLocation: "12.9716, 77.5946" });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ownerData = {
        ...formData,
        totalSlots: Number.parseInt(formData.totalSlots),
        pricePerHour: Number.parseInt(formData.pricePerHour),
        occupiedSlots: 0,
        earnings: 0,
        upiId: "",
      };
      sessionStorage.setItem("sps_owner", JSON.stringify(ownerData));
      sessionStorage.setItem("sps_owner_logged_in", "true");
      router.push("/dashboard/owner");
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
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Building2 className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-bold text-foreground">SpotHost</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Parking Owner Registration
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Register your parking space details to start hosting and earning from drivers.
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

          {/* Aadhar Number */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="aadharNumber"
              className="text-sm font-medium text-foreground"
            >
              Aadhar Card Number
            </Label>
            <Input
              id="aadharNumber"
              placeholder="Enter 12-digit Aadhar number"
              maxLength={12}
              value={formData.aadharNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  aadharNumber: e.target.value.replace(/\D/g, ""),
                })
              }
              className="h-12"
            />
            {errors.aadharNumber && (
              <p className="text-sm text-destructive">{errors.aadharNumber}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-foreground"
            >
              Parking Space Address
            </Label>
            <textarea
              id="address"
              placeholder="Enter the address of your parking space"
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          {/* Parking Slot Image */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">
              Parking Slot Photo
            </Label>
            <label
              htmlFor="slotImage"
              className="flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors bg-muted/30"
            >
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Parking slot preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload parking slot photo
                  </span>
                </>
              )}
            </label>
            <input
              id="slotImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* GPS Location */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="gpsLocation"
              className="text-sm font-medium text-foreground"
            >
              GPS Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="gpsLocation"
                placeholder="Latitude, Longitude"
                value={formData.gpsLocation}
                onChange={(e) =>
                  setFormData({ ...formData, gpsLocation: e.target.value })
                }
                className="h-12 flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGetGPS}
                className="h-12 px-4 bg-transparent"
              >
                Detect
              </Button>
            </div>
            {errors.gpsLocation && (
              <p className="text-sm text-destructive">{errors.gpsLocation}</p>
            )}
          </div>

          {/* Total Slots & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="totalSlots"
                className="text-sm font-medium text-foreground"
              >
                Total Parking Slots
              </Label>
              <Input
                id="totalSlots"
                type="number"
                placeholder="e.g. 20"
                value={formData.totalSlots}
                onChange={(e) =>
                  setFormData({ ...formData, totalSlots: e.target.value })
                }
                className="h-12"
              />
              {errors.totalSlots && (
                <p className="text-sm text-destructive">{errors.totalSlots}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="pricePerHour"
                className="text-sm font-medium text-foreground"
              >
                Price / Hour (Rs)
              </Label>
              <Input
                id="pricePerHour"
                type="number"
                placeholder="e.g. 50"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerHour: e.target.value })
                }
                className="h-12"
              />
              {errors.pricePerHour && (
                <p className="text-sm text-destructive">
                  {errors.pricePerHour}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Register & Start Hosting"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}
