"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Languages } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type PasswordStrength = "weak" | "medium" | "strong";

function getPasswordStrength(password: string): PasswordStrength | null {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const strengthConfig: Record<
  PasswordStrength,
  { label: string; color: string; width: string }
> = {
  weak: { label: "Yếu", color: "bg-status-error", width: "w-1/3" },
  medium: {
    label: "Trung bình",
    color: "bg-status-warning",
    width: "w-2/3",
  },
  strong: { label: "Mạnh", color: "bg-status-success", width: "w-full" },
};

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const { signUp, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn";
    } else if (name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const errorMessage = await signUp(email, password, name);
    if (errorMessage) {
      setErrors({ general: errorMessage });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20"
          >
            <Languages className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-h1 text-white">Tạo tài khoản</h1>
          <p className="mt-1 text-body text-slate-400">
            Bắt đầu hành trình học ngoại ngữ
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-md bg-status-error/10 px-4 py-3 text-small text-status-error"
            >
              {errors.general}
            </motion.div>
          )}

          <Input
            label="Họ và tên"
            type="text"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            error={errors.name}
            icon={<User className="h-4 w-4" />}
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            error={errors.email}
            icon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />

          {/* Password with toggle visibility */}
          <div className="w-full">
            <label className="mb-1 block text-small text-slate-400">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tạo mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                autoComplete="new-password"
                className={cn(
                  "w-full rounded-md bg-white/[0.06] border border-gray-700 pl-10 pr-10 py-2.5 text-body text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors",
                  errors.password && "border-status-error"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-small text-status-error">
                {errors.password}
              </p>
            )}

            {/* Password Strength Indicator */}
            {passwordStrength && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-small text-slate-500">
                    Độ mạnh mật khẩu
                  </span>
                  <span
                    className={cn(
                      "text-small font-semibold",
                      passwordStrength === "weak" && "text-status-error",
                      passwordStrength === "medium" && "text-status-warning",
                      passwordStrength === "strong" && "text-status-success"
                    )}
                  >
                    {strengthConfig[passwordStrength].label}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        passwordStrength === "weak"
                          ? "33%"
                          : passwordStrength === "medium"
                            ? "66%"
                            : "100%",
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "h-full rounded-full transition-colors",
                      strengthConfig[passwordStrength].color
                    )}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Confirm Password with toggle visibility */}
          <div className="w-full">
            <label className="mb-1 block text-small text-slate-400">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError("confirmPassword");
                }}
                autoComplete="new-password"
                className={cn(
                  "w-full rounded-md bg-white/[0.06] border border-gray-700 pl-10 pr-10 py-2.5 text-body text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors",
                  errors.confirmPassword && "border-status-error"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-small text-status-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
            Đăng ký
          </Button>
        </form>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-body text-slate-400"
        >
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Đăng nhập
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
