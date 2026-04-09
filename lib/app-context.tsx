"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface UserData {
  name: string;
  phone: string;
  drivingLicense: string;
  vehicleNumber: string;
  permanentAddress: string;
}

export interface OwnerData {
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

export interface ParkingSpot {
  id: string;
  ownerName: string;
  address: string;
  pricePerHour: number;
  availableSlots: number;
  totalSlots: number;
  distance: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface AppContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  currentOwner: OwnerData | null;
  setCurrentOwner: (owner: OwnerData | null) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (val: boolean) => void;
  isOwnerLoggedIn: boolean;
  setIsOwnerLoggedIn: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentOwner, setCurrentOwner] = useState<OwnerData | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentOwner,
        setCurrentOwner,
        isUserLoggedIn,
        setIsUserLoggedIn,
        isOwnerLoggedIn,
        setIsOwnerLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export const SAMPLE_PARKING_SPOTS: ParkingSpot[] = [
  {
    id: "1",
    ownerName: "Raj Parking Zone",
    address: "MG Road, Bengaluru",
    pricePerHour: 40,
    availableSlots: 5,
    totalSlots: 20,
    distance: "1.2 km",
    rating: 4.5,
  },
  {
    id: "2",
    ownerName: "City Park Hub",
    address: "Connaught Place, Delhi",
    pricePerHour: 60,
    availableSlots: 3,
    totalSlots: 15,
    distance: "0.8 km",
    rating: 4.2,
  },
  {
    id: "3",
    ownerName: "Safe Spot Parking",
    address: "Marine Drive, Mumbai",
    pricePerHour: 50,
    availableSlots: 8,
    totalSlots: 25,
    distance: "2.1 km",
    rating: 4.7,
  },
  {
    id: "4",
    ownerName: "Green Park Area",
    address: "Anna Nagar, Chennai",
    pricePerHour: 30,
    availableSlots: 12,
    totalSlots: 30,
    distance: "3.5 km",
    rating: 4.0,
  },
  {
    id: "5",
    ownerName: "Metro Parking Bay",
    address: "Banjara Hills, Hyderabad",
    pricePerHour: 45,
    availableSlots: 0,
    totalSlots: 10,
    distance: "1.8 km",
    rating: 4.3,
  },
];
