"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Star,
  Car,
  IndianRupee,
  Clock,
  ArrowLeft,
  User,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/chatbot";
import { SAMPLE_PARKING_SPOTS, type ParkingSpot } from "@/lib/app-context";

interface UserInfo {
  name: string;
  phone: string;
  drivingLicense: string;
  vehicleNumber: string;
  permanentAddress: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<UserInfo | null>(null);
  const [filteredSpots, setFilteredSpots] =
    useState<ParkingSpot[]>(SAMPLE_PARKING_SPOTS);
  const [activeBooking, setActiveBooking] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("sps_user");
    const loggedIn = sessionStorage.getItem("sps_user_logged_in");
    if (!stored || loggedIn !== "true") {
      router.push("/register/user");
      return;
    }
    const parsed = JSON.parse(stored);
    setUser(parsed);
    setEditData(parsed);
  }, [router]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSpots(SAMPLE_PARKING_SPOTS);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredSpots(
        SAMPLE_PARKING_SPOTS.filter(
          (s) =>
            s.ownerName.toLowerCase().includes(q) ||
            s.address.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery]);

  function handleSaveProfile() {
    if (editData) {
      setUser(editData);
      sessionStorage.setItem("sps_user", JSON.stringify(editData));
      setEditMode(false);
    }
  }

  function handleBookSpot(spot: ParkingSpot) {
    if (spot.availableSlots > 0) {
      setActiveBooking(spot);
    }
  }

  if (!user) return null;

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
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm">SPS Space</span>
          </div>
        </div>

        {/* Profile Circle */}
        <button
          type="button"
          onClick={() => setShowProfile(!showProfile)}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm hover:bg-primary/90 transition-colors"
          aria-label="Profile"
        >
          {user.name.charAt(0).toUpperCase()}
        </button>
      </header>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-16 right-4 md:right-8 z-50 w-80 bg-card rounded-2xl border border-border shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
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
                value={editData?.vehicleNumber ?? ""}
                onChange={(e) =>
                  setEditData(
                    editData
                      ? { ...editData, vehicleNumber: e.target.value }
                      : null
                  )
                }
                placeholder="Vehicle Number"
                className="h-10 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 h-9 text-sm bg-primary text-primary-foreground"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditMode(false);
                    setEditData(user);
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
                <span className="text-muted-foreground">License</span>
                <span className="text-foreground font-medium">
                  {user.drivingLicense}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="text-foreground font-medium">
                  {user.vehicleNumber}
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

      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome, {user.name.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Find the best parking spots near you
          </p>
        </div>

        {/* Active Booking Banner */}
        {activeBooking && (
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Active Booking</p>
                <p className="text-sm text-muted-foreground">
                  {activeBooking.ownerName} - {activeBooking.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-primary">
                Rs {activeBooking.pricePerHour}/hr
              </span>
              <Button
                onClick={() => setActiveBooking(null)}
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                End Parking
              </Button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location or parking name..."
            className="h-12 pl-12 text-sm rounded-xl"
          />
        </div>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-foreground">Recommended For You</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {SAMPLE_PARKING_SPOTS.filter((s) => s.rating >= 4.3).map((spot) => (
              <div
                key={`rec-${spot.id}`}
                className="shrink-0 w-64 rounded-2xl bg-card border border-border p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    Top Rated
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-xs font-medium text-foreground">
                      {spot.rating}
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {spot.ownerName}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{spot.address}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-primary text-sm">
                    Rs {spot.pricePerHour}/hr
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {spot.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Spots */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Available Parking Spots</h3>
            <span className="text-sm text-muted-foreground">
              {filteredSpots.filter((s) => s.availableSlots > 0).length} spots
              available
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="rounded-2xl bg-card border border-border p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">
                      {spot.ownerName}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="text-xs font-medium text-foreground">
                        {spot.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{spot.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm mt-1">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {spot.distance}
                    </span>
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        spot.availableSlots > 3
                          ? "text-[hsl(var(--success))]"
                          : spot.availableSlots > 0
                            ? "text-accent"
                            : "text-destructive"
                      }`}
                    >
                      {spot.availableSlots > 0
                        ? `${spot.availableSlots}/${spot.totalSlots} slots free`
                        : "Full"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      {spot.pricePerHour}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      per hour
                    </span>
                  </div>
                  <Button
                    onClick={() => handleBookSpot(spot)}
                    disabled={spot.availableSlots === 0}
                    className={`h-10 px-6 text-sm font-medium ${
                      spot.availableSlots === 0
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {spot.availableSlots === 0 ? "Full" : "Book Now"}
                    {spot.availableSlots > 0 && (
                      <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {filteredSpots.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium text-foreground">
                  No parking spots found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
