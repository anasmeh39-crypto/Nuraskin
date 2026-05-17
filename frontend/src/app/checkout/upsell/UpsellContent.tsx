"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { acceptUpsell } from "@/lib/api";
import {
  trackUpsellViewed,
  trackUpsellAccepted,
  generateEventId,
} from "@/lib/tracking";

const UPSELL_SECONDS = 12;

export function UpsellContent() {
  const router = useRouter();
  const params = useSearchParams();

  const orderNumber = params.get("order") || "";
  const upsellEligible = params.get("upsell") === "1";
  const uslug = params.get("uslug") || "";
  const uname = params.get("uname") || "";
  const uprice = Number(params.get("uprice") || 0);
  const uoriginal = Number(params.get("uoriginal") || 0);
  const upct = Number(params.get("upct") || 0);

  const [timeLeft, setTimeLeft] = useState(UPSELL_SECONDS);
  const [accepting, setAccepting] = useState(false);

  const goToThankYou = useCallback(() => {
    router.replace(`/thank-you?order=${orderNumber}`);
  }, [router, orderNumber]);

  useEffect(() => {
    if (!upsellEligible || !uslug) {
      goToThankYou();
      return;
    }
    trackUpsellViewed(uslug);
  }, [upsellEligible, uslug, goToThankYou]);

  useEffect(() => {
    if (!upsellEligible) return;
    if (timeLeft <= 0) {
      goToThankYou();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, upsellEligible, goToThankYou]);

  const handleAccept = async () => {
    setAccepting(true);
    const eventId = generateEventId();
    try {
      await acceptUpsell(orderNumber, uslug, uprice);
      trackUpsellAccepted(uslug, uprice, eventId);
    } catch {
      // Still redirect even if upsell update fails
    }
    goToThankYou();
  };

  if (!upsellEligible || !uslug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">جاري التحويل...</p>
        </div>
      </div>
    );
  }

  const progressPct = ((UPSELL_SECONDS - timeLeft) / UPSELL_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-4xl border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-brand-deep px-6 py-5 text-center">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">
            عرض حصري · لمرة واحدة فقط
          </p>
          <h1 className="text-white text-xl font-bold">
            قبل إتمام طلبكِ — إضافة مميّزة لكِ
          </h1>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-gold transition-all duration-1000 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="p-6 space-y-5">
          {/* Product */}
          <div className="flex gap-5 items-center">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <PlaceholderImage label={uname} className="w-full h-full" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-sans">{uslug}</p>
              <h2 className="font-bold text-brand-deep text-lg leading-snug">
                {uname}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-bold text-brand-deep">
                  {uprice} درهم
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {uoriginal} درهم
                </span>
                <span className="badge-gold text-xs font-bold">
                  -{upct}%
                </span>
              </div>
            </div>
          </div>

          {/* Offer copy */}
          <div className="bg-gold-light border border-amber-100 rounded-2xl p-4 text-center">
            <p className="text-amber-900 text-sm font-semibold">
              وفري {uoriginal - uprice} درهم كهدية لطلبكِ الحالي
            </p>
            <p className="text-amber-700 text-xs mt-1">
              هذا السعر المميّز متاح لكِ الآن فقط
            </p>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-border rounded-full px-5 py-2">
              <span className="text-gray-400 text-sm">ينتهي هذا العرض خلال</span>
              <span className="font-bold text-brand-deep text-lg font-sans tabular-nums">
                00:{String(timeLeft).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <Button
            variant="primary"
            fullWidth
            size="lg"
            loading={accepting}
            onClick={handleAccept}
          >
            نعم، أضيفي هذا المنتج لطلبي ←
          </Button>

          <button
            onClick={goToThankYou}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
            disabled={accepting}
          >
            لا شكراً، أود إتمام طلبي بدونه
          </button>
        </div>
      </div>
    </div>
  );
}
