"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Shield, CreditCard, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Học không giới hạn tất cả ngôn ngữ",
  "AI Tutor 24/7 không giới hạn",
  "Phân tích chi tiết phát âm",
  "Không có quảng cáo",
  "Chứng chỉ hoàn thành",
  "Ưu tiên hỗ trợ",
];

const plans = [
  {
    id: "monthly",
    name: "Hàng tháng",
    price: "199,000đ",
    period: "/tháng",
    subtitle: null,
    badge: null,
    recommended: false,
  },
  {
    id: "yearly",
    name: "Hàng năm",
    price: "99,000đ",
    period: "/tháng",
    subtitle: "1,188,000đ/năm",
    badge: "Tiết kiệm 50%",
    recommended: true,
  },
  {
    id: "lifetime",
    name: "Trọn đời",
    price: "2,990,000đ",
    period: " một lần",
    subtitle: null,
    badge: "Best Value",
    recommended: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-4"
    >
      {/* Back button */}
      <motion.div variants={item} className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
          <span className="text-small">Quay lại</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={item} className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
          <Crown size={32} className="text-white" />
        </div>
        <h1 className="text-h1 font-bold mb-2">
          Nâng cấp WeSPEAK{" "}
          <span className="text-amber-400">Premium</span>
        </h1>
        <p className="text-small text-slate-400">
          Mở khóa toàn bộ tính năng học tập
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={item} className="glass-3d glass-shine rounded-xl p-5 mb-8">
        <div className="space-y-3.5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-secondary" />
              </div>
              <span className="text-body">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div variants={item} className="space-y-3 mb-8">
        <h2 className="text-h3 font-semibold mb-4">Chọn gói của bạn</h2>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isRecommended = plan.recommended;
          const isLifetime = plan.id === "lifetime";

          return (
            <motion.button
              key={plan.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                w-full rounded-xl p-4 text-left transition-all relative overflow-hidden
                ${isRecommended
                  ? "glass-3d-heavy border-2 border-[#6C63FF] shadow-glow"
                  : "glass-3d glass-shine border-2 border-transparent"
                }
                ${isSelected && !isRecommended ? "border-slate-500" : ""}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`
                    absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-[11px] font-bold
                    ${isLifetime
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black"
                      : "bg-gradient-to-r from-[#6C63FF] to-[#8B83FF] text-white"
                    }
                  `}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {isRecommended && <Star size={16} className="text-[#6C63FF]" />}
                    {isLifetime && <Crown size={16} className="text-amber-400" />}
                    <span className="text-h3 font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${isRecommended ? "text-[#6C63FF]" : ""} ${isLifetime ? "text-amber-400" : ""}`}>
                      {plan.price}
                    </span>
                    <span className="text-small text-slate-400">{plan.period}</span>
                  </div>
                  {plan.subtitle && (
                    <p className="text-[12px] text-slate-500 mt-0.5">{plan.subtitle}</p>
                  )}
                </div>

                {/* Radio indicator */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected
                      ? isRecommended
                        ? "border-[#6C63FF] bg-[#6C63FF]"
                        : isLifetime
                          ? "border-amber-400 bg-amber-400"
                          : "border-secondary bg-secondary"
                      : "border-slate-600"
                    }
                  `}
                >
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={item} className="mb-6">
        <button className="w-full py-4 rounded-xl bg-primary-gradient text-white font-bold text-body btn-3d press-glow shadow-glow transition-all active:scale-[0.98]">
          Dùng thử 7 ngày miễn phí
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-2">
          Sau đó{" "}
          {plans.find((p) => p.id === selectedPlan)?.price}
          {plans.find((p) => p.id === selectedPlan)?.period}
        </p>
      </motion.div>

      {/* Trust Badges */}
      <motion.div variants={item} className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Shield size={16} className="text-secondary" />
          <span className="text-small">Bảo mật thanh toán</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <CreditCard size={16} className="text-secondary" />
          <span className="text-small">Hủy bất cứ lúc nào</span>
        </div>
      </motion.div>

      {/* Restore purchases */}
      <motion.div variants={item} className="text-center pb-4">
        <button className="text-small text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors">
          Khôi phục giao dịch
        </button>
      </motion.div>
    </motion.div>
  );
}
