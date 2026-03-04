"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Languages } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-dark"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // Show error from URL params (e.g., OAuth failure redirect)
  const urlError = searchParams.get("error");
  const urlErrorMessage =
    urlError === "auth" ? "Đăng nhập thất bại. Vui lòng thử lại." : null;

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const errorMessage = await signIn(email, password);
    if (errorMessage) {
      setErrors({ general: errorMessage });
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
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
          <h1 className="text-h1 text-white">WeSPEAK</h1>
          <p className="mt-1 text-body text-slate-400">
            Speak Like a Native with AI
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL error from OAuth redirect */}
          {urlErrorMessage && !errors.general && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-md bg-status-error/10 px-4 py-3 text-small text-status-error"
            >
              {urlErrorMessage}
            </motion.div>
          )}

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
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            icon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            icon={<Lock className="h-4 w-4" />}
            autoComplete="current-password"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={async () => {
                if (!email.trim()) {
                  setErrors({ email: "Vui lòng nhập email để đặt lại mật khẩu" });
                  return;
                }
                try {
                  const { createClient } = await import("@/lib/supabase/client");
                  const supabase = createClient();
                  if (supabase) {
                    await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/login`,
                    });
                  }
                  setErrors({ general: undefined });
                  alert("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.");
                } catch {
                  alert("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.");
                }
              }}
              className="text-small text-primary hover:text-primary-hover transition-colors"
            >
              Quên mật khẩu?
            </button>
          </div>

          <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
            Đăng nhập
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-700" />
          <span className="text-small text-slate-500">hoặc</span>
          <div className="h-px flex-1 bg-gray-700" />
        </div>

        {/* Google OAuth */}
        <Button
          variant="outline"
          fullWidth
          size="lg"
          onClick={handleGoogleSignIn}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Đăng nhập với Google
        </Button>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-body text-slate-400"
        >
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Đăng ký
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
