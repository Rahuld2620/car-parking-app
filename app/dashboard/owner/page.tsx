"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ArrowLeft,
  IndianRupee,
  Car,
  TrendingUp,
  Wallet,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Edit3,
  Save,
  ParkingCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Chatbot } from "@/components/chatbot";

interface OwnerInfo {
  name: string;
  phone: string;
  aadharNumber: string;
  address: string;
  parkingSlotImage: string | null;
  gpsLocation: string;
  upiId: string;
  pricePerHour: number;
  totalSlots: number;
  occupiedSlots: number;
  earnings: number;
}

interface ParkingEntry {
  id: string;
  vehicleNumber: string;
  driverName: string;
  entryTime: string;
  status: "parked" | "exited";
  duration: string;
  amount: number;
}

const SAMPLE_ENTRIES: ParkingEntry[] = [
  {
    id: "1",
    vehicleNumber: "KA-01-AB-1234",
    driverName: "Rahul S.",
    entryTime: "09:30 AM",
    status: "parked",
    duration: "2h 15m",
    amount: 100,
  },
  {
    id: "2",
    vehicleNumber: "KA-05-CD-5678",
    driverName: "Priya M.",
    entryTime: "10:00 AM",
    status: "parked",
    duration: "1h 45m",
    amount: 80,
  },
  {
    id: "3",
    vehicleNumber: "TN-02-EF-9012",
    driverName: "Arun K.",
    entryTime: "08:00 AM",
    status: "exited",
    duration: "3h 00m",
    amount: 150,
  },
  {
    id: "4",
    vehicleNumber: "MH-12-GH-3456",
    driverName: "Sneha P.",
    entryTime: "11:15 AM",
    status: "parked",
    duration: "0h 30m",
    amount: 25,
  },
  {
    id: "5",
    vehicleNumber: "AP-09-IJ-7890",
    driverName: "Vikram R.",
    entryTime: "07:45 AM",
    status: "exited",
    duration: "4h 00m",
    amount: 200,
  },
];

export default function OwnerDashboard() {
  const router = useRouter();
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<OwnerInfo | null>(null);
  const [entries] = useState<ParkingEntry[]>(SAMPLE_ENTRIES);
  const [upiEdit, setUpiEdit] = useState(false);
  const [upiValue, setUpiValue] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("sps_owner");
    const loggedIn = sessionStorage.getItem("sps_owner_logged_in");
    if (!stored || loggedIn !== "true") {
      router.push("/register/owner");
      return;
    }
    const parsed = JSON.parse(stored);
    // Add demo data
    parsed.occupiedSlots = entries.filter((e) => e.status === "parked").length;
    parsed.earnings = entries.reduce((sum: number, e: ParkingEntry) => sum + e.amount, 0);
    setOwner(parsed);
    setEditData(parsed);
    setUpiValue(parsed.upiId || "");
  }, [router, entries]);

  function handleSaveProfile() {
    if (editData) {
      setOwner(editData);
      sessionStorage.setItem("sps_owner", JSON.stringify(editData));
      setEditMode(false);
    }
  }

  function handleSaveUpi() {
    if (owner) {
      const updated = { ...owner, upiId: upiValue };
      setOwner(updated);
      sessionStorage.setItem("sps_owner", JSON.stringify(updated));
      setUpiEdit(false);
    }
  }

  if (!owner) return null;

  const parkedCount = entries.filter((e) => e.status === "parked").length;
  const totalEarnings = entries.reduce((sum, e) => sum + e.amount, 0);
  const todayExited = entries.filter((e) => e.status === "exited").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between py-3 px-4 md:px-8 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Go home"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm">SpotHost</span>
          </div>
        </div>

        {/* Profile Circle */}
        <button
          type="button"
          onClick={() => setShowProfile(!showProfile)}
          className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm hover:bg-accent/90 transition-colors"
          aria-label="Profile"
        >
          {owner.name.charAt(0).toUpperCase()}
        </button>
      </header>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-16 right-4 md:right-8 z-50 w-80 bg-card rounded-2xl border border-border shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
              {owner.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-foreground">{owner.name}</p>
              <p className="text-sm text-muted-foreground">{owner.phone}</p>
            </div>
          </div>

          {editMode ? (
            <div className="flex flex-col gap-3">
              <Input
                value={editData?.name ?? ""}
                onChange={(e) =>
                  setEditData(
                    editData ? { ...editData, name: e.target.value } : null
                  )
                }
                placeholder="Name"
                className="h-10 text-sm"
              />
              <Input
                value={editData?.phone ?? ""}
                onChange={(e) =>
                  setEditData(
                    editData ? { ...editData, phone: e.target.value } : null
                  )
                }
                placeholder="Phone"
                className="h-10 text-sm"
              />
              <Input
                value={editData?.address ?? ""}
                onChange={(e) =>
                  setEditData(
                    editData ? { ...editData, address: e.target.value } : null
                  )
                }
                placeholder="Address"
                className="h-10 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 h-9 text-sm bg-accent text-accent-foreground"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditMode(false);
                    setEditData(owner);
                  }}
                  variant="outline"
                  className="flex-1 h-9 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Aadhar</span>
                <span className="text-foreground font-medium">
                  {"****-****-" + owner.aadharNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">GPS</span>
                <span className="text-foreground font-medium">
                  {owner.gpsLocation}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Total Slots</span>
                <span className="text-foreground font-medium">
                  {owner.totalSlots}
                </span>
              </div>
              <Button
                onClick={() => setEditMode(true)}
                variant="outline"
                className="mt-2 h-9 text-sm w-full"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome, {owner.name.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your parking space and track earnings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{parkedCount}</p>
            <p className="text-xs text-muted-foreground">Currently Parked</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              Rs {totalEarnings}
            </p>
            <p className="text-xs text-muted-foreground">{"Today's Earnings"}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--success))]/10 flex items-center justify-center">
              <ParkingCircle className="w-5 h-5 text-[hsl(var(--success))]" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {owner.totalSlots - parkedCount}
            </p>
            <p className="text-xs text-muted-foreground">Slots Available</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{todayExited}</p>
            <p className="text-xs text-muted-foreground">Exited Today</p>
          </div>
        </div>

        {/* Parking Status */}
        <section>
          <h3 className="font-bold text-foreground mb-4">
            Parking Status Updates
          </h3>
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-6 gap-4 px-5 py-3 bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Vehicle</span>
              <span>Driver</span>
              <span>Entry</span>
              <span>Duration</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 px-5 py-4 border-t border-border items-center"
              >
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {entry.vehicleNumber}
                  </p>
                  <p className="text-xs text-muted-foreground md:hidden">
                    {entry.driverName}
                  </p>
                </div>
                <p className="hidden md:block text-sm text-foreground">
                  {entry.driverName}
                </p>
                <p className="hidden md:block text-sm text-muted-foreground">
                  {entry.entryTime}
                </p>
                <p className="hidden md:block text-sm text-foreground">
                  {entry.duration}
                </p>
                <p className="hidden md:block text-sm font-medium text-foreground">
                  Rs {entry.amount}
                </p>
                <div className="flex justify-end md:justify-start">
                  {entry.status === "parked" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Parked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      <XCircle className="w-3 h-3" />
                      Exited
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UPI & Payment Section */}
        <section>
          <h3 className="font-bold text-foreground mb-4">Payment Settings</h3>
          <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">
                  UPI ID for Receiving Payments
                </p>
                <p className="text-xs text-muted-foreground">
                  Drivers will pay to this UPI ID after booking
                </p>
              </div>
            </div>

            {upiEdit ? (
              <div className="flex gap-2">
                <Input
                  value={upiValue}
                  onChange={(e) => setUpiValue(e.target.value)}
                  placeholder="yourname@upi"
                  className="h-10 text-sm flex-1"
                />
                <Button
                  onClick={handleSaveUpi}
                  className="h-10 px-4 bg-accent text-accent-foreground"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-xl bg-muted p-4">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Current UPI ID
                  </Label>
                  <p className="font-medium text-foreground text-sm mt-1">
                    {owner.upiId || "Not set yet"}
                  </p>
                </div>
                <Button
                  onClick={() => setUpiEdit(true)}
                  variant="outline"
                  size="sm"
                  className="h-9"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {owner.upiId ? "Edit" : "Add"}
                </Button>
              </div>
            )}

            {/* Earnings Breakdown */}
            <div className="mt-2 rounded-xl bg-muted p-4 flex flex-col gap-3">
              <p className="font-semibold text-foreground text-sm">
                Earnings Summary
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-foreground">
                    Rs {totalEarnings}
                  </span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-foreground">
                    Rs {totalEarnings * 7}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    This Week
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-foreground">
                    Rs {totalEarnings * 30}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    This Month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Pricing */}
        <section>
          <h3 className="font-bold text-foreground mb-4">
            Location & Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground text-sm">
                  Parking Address
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{owner.address}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>GPS: {owner.gpsLocation}</span>
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl bg-muted h-40 flex items-center justify-center mt-2">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Map view - {owner.gpsLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-accent" />
                <p className="font-semibold text-foreground text-sm">
                  Pricing Details
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    Per Hour
                  </span>
                  <span className="font-bold text-foreground">
                    Rs {owner.pricePerHour}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    Half Day (6h)
                  </span>
                  <span className="font-bold text-foreground">
                    Rs {owner.pricePerHour * 5}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    Full Day (12h)
                  </span>
                  <span className="font-bold text-foreground">
                    Rs {owner.pricePerHour * 9}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">
                    Overnight (12h+)
                  </span>
                  <span className="font-bold text-foreground">
                    Rs {owner.pricePerHour * 12}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              type="button"
              className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center gap-3 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">
                Add Vehicle
              </span>
            </button>
            <button
              type="button"
              className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center gap-3 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-foreground">
                View History
              </span>
            </button>
            <button
              type="button"
              className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center gap-3 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--success))]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[hsl(var(--success))]" />
              </div>
              <span className="text-xs font-medium text-foreground">
                Reports
              </span>
            </button>
            <button
              type="button"
              className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center gap-3 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">
                Edit Slots
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
