import { type ClassValue, clsx } from "clsx";

// Simple class name utility (no tailwind-merge needed for now)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}

export function getLevelTitle(level: number): string {
  if (level <= 5) return "Beginner";
  if (level <= 10) return "Elementary";
  if (level <= 15) return "Intermediate";
  if (level <= 20) return "Advanced";
  if (level <= 25) return "Expert";
  return "Master";
}

export function getLevelFromXP(xp: number): number {
  const thresholds = [
    0, 200, 400, 600, 800, 1000, 1800, 2600, 3400, 4200,
    5000, 6500, 8000, 9500, 11000, 12500, 15000, 17500, 20000, 22500,
    25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000,
    100000,
  ];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1;
  }
  return 1;
}

export function getXPForNextLevel(level: number): number {
  const thresholds = [
    0, 200, 400, 600, 800, 1000, 1800, 2600, 3400, 4200,
    5000, 6500, 8000, 9500, 11000, 12500, 15000, 17500, 20000, 22500,
    25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000,
    100000,
  ];
  if (level >= thresholds.length) return thresholds[thresholds.length - 1];
  return thresholds[level];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buổi sáng tốt lành";
  if (hour < 18) return "Buổi chiều tốt lành";
  return "Buổi tối tốt lành";
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours} giờ`;
}

export function generateId(): string {
  return crypto.randomUUID();
}
