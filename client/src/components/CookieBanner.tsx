/**
 * CookieBanner – DSGVO-konformer Cookie-Hinweis
 * Design: Dark Forge – schwebend, Gold-Akzente, minimalistisch
 * Mobile: Vollbreite unten | Desktop: Kompakte Leiste unten
 */

import { useEffect, useState } from "react";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "qc_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (stored) {
      setConsent(stored);
    } else {
      // Kurze Verzögerung damit die Seite zuerst lädt
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-4 md:pb-6"
      style={{
        animation: "cookieSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Banner Container */}
      <div
        className="mx-auto max-w-4xl rounded-xl md:rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.13 0.01 270 / 0.97)",
          border: "1px solid rgba(212,168,67,0.25)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.5), 0 0 60px rgba(212,168,67,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Goldene Akzentlinie oben */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(212,168,67,0.5), transparent)",
          }}
        />

        <div className="px-5 py-4 md:px-6 md:py-4">
          {/* Mobile Layout: gestapelt */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex items-start gap-3">
              <Cookie
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: "var(--gold)" }}
              />
              <div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "oklch(0.88 0.005 80)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem" }}
                >
                  Cookie-Hinweis
                </p>
                <p className="text-xs font-light leading-relaxed" style={{ color: "oklch(0.60 0.008 80)" }}>
                  Diese Website verwendet Cookies für Analyse und optimale Nutzererfahrung.
                  Mehr in unserer{" "}
                  <button
                    className="underline underline-offset-2 transition-colors"
                    style={{ color: "var(--gold)" }}
                    onClick={() => {
                      // Datenschutz-Modal öffnen via Custom Event
                      window.dispatchEvent(new CustomEvent("openLegal", { detail: "datenschutz" }));
                    }}
                  >
                    Datenschutzerklärung
                  </button>
                  .
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDecline}
                className="flex-1 py-2 rounded-lg text-xs font-light tracking-wider transition-all duration-200"
                style={{
                  border: "1px solid rgba(212,168,67,0.2)",
                  color: "oklch(0.55 0.008 80)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.70 0.008 80)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.55 0.008 80)";
                }}
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2 rounded-lg text-xs font-medium tracking-wider transition-all duration-200"
                style={{
                  background: "var(--gold)",
                  color: "oklch(0.10 0.008 270)",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                Akzeptieren
              </button>
            </div>
          </div>

          {/* Desktop Layout: horizontal */}
          <div className="hidden md:flex items-center gap-6">
            <Cookie className="w-4 h-4 flex-shrink-0" style={{ color: "var(--gold)" }} />

            <p className="flex-1 text-xs font-light leading-relaxed" style={{ color: "oklch(0.62 0.008 80)" }}>
              <span style={{ color: "oklch(0.85 0.005 80)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", fontWeight: 500 }}>
                Cookie-Hinweis:{" "}
              </span>
              Diese Website verwendet Cookies zur Analyse und Verbesserung der Nutzererfahrung.
              Weitere Informationen in unserer{" "}
              <button
                className="underline underline-offset-2 transition-colors"
                style={{ color: "var(--gold)" }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openLegal", { detail: "datenschutz" }));
                }}
              >
                Datenschutzerklärung
              </button>
              .
            </p>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 rounded-lg text-xs font-light tracking-wider transition-all duration-200"
                style={{
                  border: "1px solid rgba(212,168,67,0.2)",
                  color: "oklch(0.55 0.008 80)",
                  background: "transparent",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.70 0.008 80)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,67,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.55 0.008 80)";
                }}
              >
                Nur notwendige
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 rounded-lg text-xs font-medium tracking-wider transition-all duration-200"
                style={{
                  background: "var(--gold)",
                  color: "oklch(0.10 0.008 270)",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleDecline}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: "1px solid rgba(212,168,67,0.15)",
                  color: "oklch(0.45 0.008 80)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,168,67,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.45 0.008 80)";
                }}
                aria-label="Schließen"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
