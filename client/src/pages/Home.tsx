/*
 * QuantumCreativity – Home Page (One-Pager)
 * Design: "Dark Forge" – Premium Dark Mode mit Goldakzenten
 * Fonts: Cormorant Garamond (Headlines) + Inter (Body)
 * Sections: Nav → Hero → Problem → Leistungen → Pakete → Über Aleks → Kontakt → Footer
 */

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Star, ArrowRight, Menu, X, ChevronDown, Mail, MapPin, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { LegalModal } from "@/components/LegalModal";
import { CookieBanner } from "@/components/CookieBanner";

// Asset URLs
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/B6UdFPMk2gSnxRgJpoPbPm/qc-hero-bg-TRmrJJKAXPxCujWygMhvRL.webp";
const MOCKUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/B6UdFPMk2gSnxRgJpoPbPm/qc-restaurant-mockup-2NyKaXeo8HDP4xf6wmyTGg.webp";
const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/B6UdFPMk2gSnxRgJpoPbPm/qc-about-bg-E54NsfuRJFKvdsekVWrs5c.webp";
const PROCESS_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663222217661/B6UdFPMk2gSnxRgJpoPbPm/qc-logo-aleks_0a9f4c41.png";

// Kontaktdaten
const PHONE = "+436606242162";
const PHONE_DISPLAY = "+43 660 624 2162";
const EMAIL = "aleks@aleksboskovic.com";
const STANDORT = "Österreich";

// Intersection Observer Hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Animated counter
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  // inHero: Logo nur sichtbar wenn man sich noch im Hero-Bereich befindet
  // Verhindert dass das fixed Logo beim Scrollen durch andere Sections hindurchscheint
  const [inHero, setInHero] = useState(true);
  const [legalModal, setLegalModal] = useState<"impressum" | "datenschutz" | "agb" | null>(null);

  // Cookie-Banner: Datenschutz-Link öffnet das Modal
  useEffect(() => {
    const handleOpenLegal = (e: Event) => {
      const detail = (e as CustomEvent).detail as "impressum" | "datenschutz" | "agb";
      setLegalModal(detail);
    };
    window.addEventListener("openLegal", handleOpenLegal);
    return () => window.removeEventListener("openLegal", handleOpenLegal);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Navbar-Button erst sichtbar wenn Hero verlassen (ca. 90vh)
      setPastHero(window.scrollY > window.innerHeight * 0.85);
      // Logo nur im Hero-Bereich sichtbar (bis 95vh) – danach ausblenden
      // φ-Schwellwert: 95% = kurz bevor der Hero vollständig verlassen wird
      setInHero(window.scrollY < window.innerHeight * 0.95);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Pakete", href: "#pakete" },
    { label: "Über mich", href: "#ueber" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: problemRef, inView: problemInView } = useInView();
  const { ref: leistungenRef, inView: leistungenInView } = useInView();
  const { ref: paketeRef, inView: paketeInView } = useInView();
  const { ref: ueberRef, inView: ueberInView } = useInView();
  const { ref: kontaktRef, inView: kontaktInView } = useInView();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─── GLOBALES HINTERGRUND-LOGO (NUR DESKTOP) ─── */}
      {/* fixed = bleibt immer an derselben Bildschirmposition */}
      {/* inHero-State: Logo wird ausgeblendet sobald man den Hero-Bereich verlässt */}
      {/* Verhindert dass das Logo beim Scrollen durch andere Sections hindurchscheint */}
      <div
        className="fixed pointer-events-none hidden md:block"
        style={{
          top: "35%",
          left: "37.5%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          opacity: inHero ? 0.30 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <img
          src={PROCESS_ICON}
          alt=""
          aria-hidden="true"
          style={{
            /* Radius verkleinert: 38vw → 30vw */
            /* Kreuz-Mitte bleibt exakt bei left:37.5% top:35% */
            /* Oberkante: 35% - 15vw ≈ nicht mehr in Navbar */
            /* Linke Kante: 37.5% - 15vw = 22.5% → Zitat bei 14% hat Platz */
            width: "min(30vw, 360px)",
            height: "min(30vw, 360px)",
            objectFit: "contain",
            filter: "drop-shadow(0 0 40px rgba(212,168,67,0.6)) drop-shadow(0 0 15px rgba(212,168,67,0.35))",
            animation: "logoFloat 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* ─── NAVIGATION ─── */}
      {/* Navbar hat immer einen dunklen Hintergrund (mind. 85% Opazität) damit das
           fixed Logo nie durch die Navbar hindurchscheint */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-white/5"
            : "bg-background/85 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo – nur Schrift in Navbar */}
          <a href="#" className="flex items-center group">
            <span
              className="font-['Cormorant_Garamond'] text-xl font-700 tracking-widest gold-shimmer"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: "0.15em" }}
            >
              QUANTUM<span className="font-light"> CREATIVITY</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-muted-foreground hover:text-gold transition-colors duration-300 tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button – nur sichtbar nach der Hero Section */}
          <div
            className="hidden md:flex items-center gap-3"
            style={{
              opacity: pastHero ? 1 : 0,
              transform: pastHero ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: pastHero ? "auto" : "none",
            }}
          >
            <a href={`tel:${PHONE}`}>
              <Button
                className="text-sm font-medium tracking-wider"
                style={{
                  background: "var(--gold)",
                  color: "oklch(0.10 0.008 270)",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Jetzt anrufen
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-gold transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-white/5 px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-light text-muted-foreground hover:text-gold transition-colors py-2 border-b border-white/5 tracking-wider"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={`tel:${PHONE}`} className="mt-2">
              <Button className="w-full" style={{ background: "var(--gold)", color: "oklch(0.10 0.008 270)" }}>
                <Phone className="w-4 h-4 mr-2" />
                Jetzt anrufen
              </Button>
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      {/*
       * DESKTOP: Goldener Schnitt Layout – Logo fixed im Hintergrund (oben)
       * MOBILE: Logo scrollt mit dem Inhalt (normal im Flow, nicht fixed)
       *   Logo-Bereich: 38.2vh (φ-Proportion oben)
       *   Text-Bereich: 61.8vh (φ-Proportion unten)
       */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ zIndex: 1, background: "#05050a" }}
      >
        {/* Subtiler Radial-Glow hinter dem Logo – links (Desktop) / oben (Mobile) */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 37% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)" }} />
        {/* Mobile Glow – zentriert oben */}
        <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: "radial-gradient(ellipse 80% 45% at 50% 30%, rgba(212,168,67,0.07) 0%, transparent 70%)" }} />
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* VERTIKALES ZITAT – nach φ positioniert (nur Desktop) */}
        {/* zIndex: 20 – muss über dem Desktop-Layout-Div (zIndex: 10) liegen */}
        {/* Das Logo hat zIndex: 2 (fixed, außerhalb dieser Section) */}
        <div
          className="absolute hidden md:flex items-center justify-center pointer-events-none"
          style={{
            /* Zitat nach links verschoben: 23.6% → 11.8% (φ³/2) */
            /* Logo-Linke-Kante bei 37.5% - 15vw ≈ 22.5% → Zitat bei 11.8% hat klar Platz */
            left: "11.8%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            zIndex: 20,
          }}
        >
          <p
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              color: "rgba(180,140,40,0.42)",
              lineHeight: 1.618,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            Vollkommenheit ist erreicht, wenn man nichts mehr wegnehmen kann.
          </p>
        </div>

        {/* ── DESKTOP LAYOUT: Goldener Schnitt (unverändert) ── */}
        <div
          ref={heroRef}
          className="relative min-h-screen hidden md:flex items-center"
          style={{
            zIndex: 10,
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.1s ease-out, transform 1.1s ease-out",
          }}
        >
          <div className="absolute inset-0 w-full h-full">
            {/* TEXT BLOCK – positioniert nach φ: startet bei 61.8% Breite, vertikal bei 23.6% */}
            <div
              className="absolute flex flex-col"
              style={{
                left: "61.8%",
                top: "23.6%",
                width: "34%",
                transform: "none",
              }}
            >
              <p
                className="font-light tracking-[0.3em] uppercase"
                style={{
                  color: "var(--gold)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  marginBottom: "1.618rem",
                  letterSpacing: "0.35em",
                }}
              >
                Premium Webdesign Agentur
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "oklch(0.95 0.005 80)",
                  fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  marginBottom: "1.618rem",
                }}
              >
                Ihr Unternehmen.
                <br />
                <span className="gold-shimmer">Online. Perfekt.</span>
              </h1>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
                  fontWeight: 300,
                  lineHeight: 1.618,
                  color: "oklch(0.65 0.01 80)",
                  marginBottom: "2.618rem",
                  maxWidth: "38ch",
                }}
              >
                Ich erstelle hochwertige, elegante Websites für Restaurants und lokale Betriebe –
                die Ihnen neue Kunden bringen. Professionell. Schnell. Zu einem fairen Preis.
              </p>
              <a href={`tel:${PHONE}`}>
                <Button
                  size="lg"
                  className="animate-gold-pulse font-medium tracking-wider whitespace-nowrap"
                  style={{
                    background: "var(--gold)",
                    color: "oklch(0.10 0.008 270)",
                    border: "none",
                    fontSize: "0.9rem",
                    padding: "1rem 2.618rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Jetzt kostenlos anrufen
                </Button>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-xs tracking-widest uppercase text-muted-foreground">Mehr erfahren</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
          </div>
        </div>

        {/* ── MOBILE LAYOUT: Logo scrollt mit dem Inhalt ── */}
        {/*
         * WICHTIG: Das Logo ist hier im normalen Dokument-Flow (NICHT fixed/absolute).
         * Es scrollt daher ganz natürlich mit dem Inhalt mit – genau wie auf Desktop
         * wo das fixed Logo beim Scrollen "stehen bleibt" und der Inhalt darüber läuft.
         * Auf Mobile ist das Gegenteil gewünscht: Logo scrollt MIT.
         *
         * Goldener Schnitt vertikal:
         *   Logo-Bereich: 38.2vh (φ-Proportion oben)
         *   Text-Bereich: 61.8vh (φ-Proportion unten)
         */}
        <div
          className="md:hidden relative flex flex-col min-h-screen"
          style={{ zIndex: 10 }}
        >
          {/* Logo-Bereich – φ-Proportion: 44vh
           * Logo verwendet logoFloatMobile (KEIN translateY) damit es das Zitat nicht überdeckt.
           * overflow:hidden verhindert zusätzlich jedes Herausragen aus dem Bereich.
           */}
          <div
            className="flex flex-col items-center justify-center"
            style={{
              height: "44vh",
              paddingTop: "5rem", /* Navbar-Abstand */
              paddingBottom: "0.5rem",
              gap: "0.6rem",
              overflow: "hidden", /* Sicherheitsnetz: Logo kann nicht herausragen */
            }}
          >
            {/* Logo: logoFloatMobile = nur Glow+Rotation, kein translateY */}
            <img
              src={PROCESS_ICON}
              alt="QuantumCreativity Logo"
              style={{
                width: "min(40vw, 160px)",
                height: "min(40vw, 160px)",
                objectFit: "contain",
                animation: "logoFloatMobile 10s ease-in-out infinite",
                opacity: 0.85,
                flexShrink: 0,
              }}
            />
            {/* Zitat – dezent unter dem Logo, φ-Rhythmus: 38.2% / 61.8% */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "0.60rem",
                letterSpacing: "0.10em",
                color: "rgba(180,140,40,0.42)",
                lineHeight: 1.55,
                textAlign: "center",
                maxWidth: "26ch",
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              Vollkommenheit ist erreicht,
              <br />
              wenn man nichts mehr wegnehmen kann.
            </p>
          </div>

          {/* Text-Bereich – φ-Proportion: 61.8% der Höhe */}
          <div
            className="flex flex-col items-center justify-center text-center px-6 pb-24"
            style={{
              flex: 1,
              minHeight: "61.8vh",
            }}
          >
            {/* Goldene Trennlinie */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--gold)",
                marginBottom: "1.618rem",
                opacity: 0.6,
              }}
            />

            <p
              className="font-light tracking-[0.3em] uppercase"
              style={{
                color: "var(--gold)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                marginBottom: "1rem",
                letterSpacing: "0.35em",
              }}
            >
              Premium Webdesign Agentur
            </p>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "oklch(0.95 0.005 80)",
                fontSize: "clamp(2.4rem, 9vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "1.2rem",
              }}
            >
              Ihr Unternehmen.
              <br />
              <span className="gold-shimmer">Online. Perfekt.</span>
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.618,
                color: "oklch(0.65 0.01 80)",
                marginBottom: "2rem",
                maxWidth: "32ch",
              }}
            >
              Hochwertige Websites für Restaurants und lokale Betriebe.
              Professionell. Schnell. Zum fairen Preis.
            </p>

            <a href={`tel:${PHONE}`} className="w-full max-w-xs">
              <Button
                size="lg"
                className="animate-gold-pulse font-medium tracking-wider w-full"
                style={{
                  background: "var(--gold)",
                  color: "oklch(0.10 0.008 270)",
                  border: "none",
                  fontSize: "0.95rem",
                  padding: "1rem 1.5rem",
                  letterSpacing: "0.08em",
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Jetzt kostenlos anrufen
              </Button>
            </a>

            {/* Scroll indicator Mobile */}
            <div className="flex flex-col items-center gap-2 opacity-40 mt-8">
              <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-12 border-y border-white/5 relative" style={{ zIndex: 3 }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center max-w-xl mx-auto">
            {[
              { value: 100, suffix: "%", label: "Kundenzufriedenheit" },
              { value: 48, suffix: "h", label: "Lieferzeit Demo" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="text-4xl md:text-5xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)" }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-light tracking-wider uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / LÖSUNG ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ zIndex: 3 }}>
        <div className="container">
          <div
            ref={problemRef}
            className="grid md:grid-cols-2 gap-16 items-center"
            style={{
              opacity: problemInView ? 1 : 0,
              transform: problemInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {/* Left: Image */}
            <div className="relative">
              <div
                className="rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 60px oklch(0.78 0.12 85 / 0.15)" }}
              >
                <img
                  src={MOCKUP_IMG}
                  alt="Premium Restaurant Website Mockup"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-card border border-gold/30 rounded-lg px-4 py-3 text-center"
                style={{ boxShadow: "0 0 20px oklch(0.78 0.12 85 / 0.2)" }}
              >
                <p className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)" }}>+300%</p>
                <p className="text-xs text-muted-foreground tracking-wider">Mehr Anfragen</p>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <p className="text-sm font-light tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Das Problem
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Gutes Essen reicht heute nicht mehr.
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Ihr Restaurant ist ausgezeichnet. Das Essen ist fantastisch. Aber wenn ein potenzieller Gast
                Ihr Lieferando-Menü sieht oder eine veraltete Website findet – ist er weg. Für immer.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Die junge Generation entscheidet in Sekunden: Schöne Website = vertrauenswürdig = ich bestelle.
                Keine schöne Website = weiterklicken. So einfach ist das.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Kunden googeln zuerst – und urteilen nach der Website",
                  "80% der Entscheidungen fallen in den ersten 3 Sekunden",
                  "Eine professionelle Website zahlt sich in Wochen aus",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                    <span className="text-sm font-light text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEISTUNGEN ─── */}
      <section id="leistungen" className="py-24 md:py-32 relative" style={{ zIndex: 3 }}>
        <div className="container">
          <div
            ref={leistungenRef}
            style={{
              opacity: leistungenInView ? 1 : 0,
              transform: leistungenInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-sm font-light tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Was ich biete
              </p>
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Alles aus einer Hand.
              </h2>
              <div className="gold-divider max-w-xs mx-auto mt-6" />
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "✦",
                  title: "Premium Webdesign",
                  desc: "Maßgeschneiderte, elegante Websites, die Ihr Unternehmen perfekt repräsentieren. Keine Templates – jede Website ist ein Unikat.",
                  points: ["Individuelles Design", "Mobile-optimiert", "Schnelle Ladezeiten"],
                },
                {
                  icon: "◈",
                  title: "SEO-Optimierung",
                  desc: "Ihre Website wird von Google gefunden. Ich optimiere alle technischen und inhaltlichen Faktoren, damit neue Kunden Sie entdecken.",
                  points: ["Google-Ranking verbessern", "Lokales SEO", "Technische Optimierung"],
                },
                {
                  icon: "⬡",
                  title: "Wartung & Pflege",
                  desc: "Ihre Website bleibt immer aktuell und sicher. Ich kümmere mich um Updates, Änderungen und technischen Support.",
                  points: ["Monatliche Updates", "Inhaltspflege", "Technischer Support"],
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="group relative bg-background border border-white/5 rounded-lg p-8 hover:border-gold/30 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: "var(--gold)" }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="gold-divider mb-6" />
                  <ul className="flex flex-col gap-2">
                    {service.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                        <span style={{ color: "var(--gold)" }}>→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 30px oklch(0.78 0.12 85 / 0.05)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAKETE ─── */}
      <section id="pakete" className="py-24 md:py-32 relative overflow-hidden" style={{ zIndex: 3 }}>
        <div className="container">
          <div
            ref={paketeRef}
            style={{
              opacity: paketeInView ? 1 : 0,
              transform: paketeInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-sm font-light tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Transparente Preise
              </p>
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ihr Paket. Ihr Preis.
              </h2>
              <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
                Keine versteckten Kosten. Keine Überraschungen. Nur Ergebnisse.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-6" />
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "799",
                  monthly: "29",
                  desc: "Perfekt für den Einstieg",
                  features: [
                    "Bis zu 5 Seiten",
                    "Responsives Design",
                    "Kontaktformular",
                    "Google Maps Integration",
                    "Basis SEO",
                    "1 Monat Support",
                  ],
                  highlight: false,
                  cta: "Jetzt starten",
                },
                {
                  name: "Professional",
                  price: "1.499",
                  monthly: "59",
                  desc: "Unser beliebtestes Paket",
                  features: [
                    "Bis zu 10 Seiten",
                    "Premium Design",
                    "Online-Reservierung",
                    "Speisekarte digital",
                    "Vollständiges SEO",
                    "Google Business Setup",
                    "3 Monate Support",
                    "Monatliche Updates",
                  ],
                  highlight: true,
                  cta: "Jetzt buchen",
                },
                {
                  name: "Premium",
                  price: "2.499",
                  monthly: "99",
                  desc: "Für maximalen Erfolg",
                  features: [
                    "Unbegrenzte Seiten",
                    "Exklusives Design",
                    "Online-Shop / Bestellung",
                    "Blog & News",
                    "Vollständiges SEO",
                    "Social Media Integration",
                    "6 Monate Support",
                    "Wöchentliche Updates",
                    "Monatliches Reporting",
                  ],
                  highlight: false,
                  cta: "Jetzt anfragen",
                },
              ].map((pkg, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg p-8 border transition-all duration-500 ${
                    pkg.highlight
                      ? "border-gold/50 bg-card"
                      : "border-white/5 bg-card hover:border-gold/20"
                  }`}
                  style={pkg.highlight ? { boxShadow: "0 0 40px oklch(0.78 0.12 85 / 0.15)" } : {}}
                >
                  {pkg.highlight && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium tracking-wider"
                      style={{ background: "var(--gold)", color: "oklch(0.10 0.008 270)" }}
                    >
                      EMPFOHLEN
                    </div>
                  )}

                  <p className="text-sm font-light tracking-[0.2em] uppercase mb-2" style={{ color: "var(--gold)" }}>
                    {pkg.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>

                  <div className="mb-2" style={{ filter: "blur(7px)", userSelect: "none", pointerEvents: "none" }}>
                    <span className="text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {pkg.price}€
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">einmalig</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6" style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
                    + {pkg.monthly}€ / Monat Wartung
                  </p>

                  <div className="gold-divider mb-6" />

                  <ul className="flex flex-col gap-3 mb-8">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-light text-muted-foreground">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--gold)" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a href="#kontakt">
                    <Button
                      className="w-full font-medium tracking-wider"
                      style={
                        pkg.highlight
                          ? { background: "var(--gold)", color: "oklch(0.10 0.008 270)", border: "none" }
                          : { background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)" }
                      }
                    >
                      {pkg.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 font-light" style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
              Alle Preise zzgl. MwSt. · Individuelle Angebote auf Anfrage · Kostenlose Erstberatung
            </p>
          </div>
        </div>
      </section>

      {/* ─── ÜBER ALEKS ─── */}
      <section id="ueber" className="py-24 md:py-32 relative overflow-hidden" style={{ zIndex: 3 }}>
        <div className="container relative z-10">
          <div
            ref={ueberRef}
            className="grid md:grid-cols-2 gap-16 items-center"
            style={{
              opacity: ueberInView ? 1 : 0,
              transform: ueberInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {/* Left: Text */}
            <div>
              <p className="text-sm font-light tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Über mich
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Hinter QuantumCreativity steckt eine Person: Aleks.
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Ich bin kein großes Unternehmen mit Hunderten von Mitarbeitern. Ich bin ein leidenschaftlicher
                Webdesigner, der glaubt, dass jedes gute Unternehmen eine großartige Website verdient –
                unabhängig von der Größe des Budgets.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Mein Ansatz ist einfach: Ich erstelle zuerst eine Demo Ihrer Website – kostenlos und unverbindlich.
                Sie sehen das Ergebnis, bevor Sie einen Cent ausgeben. Wenn Sie überzeugt sind, starten wir.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Ich arbeite direkt mit Ihnen zusammen – kein Callcenter, kein Zwischenhändler.
                Sie erreichen mich jederzeit persönlich.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Kostenlose Demo – Sie sehen zuerst, was Sie bekommen",
                  "Direkter Ansprechpartner – kein Callcenter",
                  "Schnelle Umsetzung – Ihre Website in wenigen Tagen online",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                    <span className="text-sm font-light text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quote card */}
            <div
              className="bg-card/80 backdrop-blur-sm border border-gold/20 rounded-lg p-10"
              style={{ boxShadow: "0 0 40px oklch(0.78 0.12 85 / 0.1)" }}
            >
              <div className="text-5xl mb-6" style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif" }}>
                "
              </div>
              <p
                className="text-xl md:text-2xl font-light leading-relaxed mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.90 0.005 80)" }}
              >
                Selbst wenn ein Restaurant das beste Essen der Stadt hat – ohne eine schöne Website
                verliert es täglich Kunden, die es nie kennenlernen werden.
              </p>
              <div className="gold-divider mb-6" />
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: "var(--gold)", color: "oklch(0.10 0.008 270)", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  A
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--gold)" }}>Aleksandar Boskovic</p>
                  <p className="text-sm font-light text-muted-foreground">Gründer, QuantumCreativity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KONTAKT / CTA ─── */}
      <section id="kontakt" className="py-24 md:py-32 relative" style={{ zIndex: 3 }}>
        <div className="container">
          <div
            ref={kontaktRef}
            style={{
              opacity: kontaktInView ? 1 : 0,
              transform: kontaktInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-sm font-light tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Kontakt
              </p>
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Bereit für Ihren
                <br />
                <span className="gold-shimmer">Online-Auftritt?</span>
              </h2>
              <p className="text-muted-foreground font-light mt-4 max-w-xl mx-auto">
                Rufen Sie jetzt an oder schreiben Sie mir.
                Ich erstelle Ihnen eine Demo – unverbindlich und kostenlos.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Contact Info */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Direkt in Kontakt treten
                  </h3>
                  <div className="flex flex-col gap-6">
                    <a href={`tel:${PHONE}`} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-gold/30 group-hover:bg-gold/10 transition-colors">
                        <Phone className="w-5 h-5" style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Telefon</p>
                        <p className="font-medium" style={{ color: "var(--gold)" }}>{PHONE_DISPLAY}</p>
                      </div>
                    </a>
                    <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-gold/30 group-hover:bg-gold/10 transition-colors">
                        <Mail className="w-5 h-5" style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">E-Mail</p>
                        <p className="font-medium" style={{ color: "var(--gold)" }}>{EMAIL}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-gold/30">
                        <MapPin className="w-5 h-5" style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Standort</p>
                        <p className="font-medium text-foreground">{STANDORT}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="border border-gold/20 rounded-lg p-6"
                  style={{ background: "oklch(0.78 0.12 85 / 0.05)" }}
                >
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    <span style={{ color: "var(--gold)" }} className="font-medium">Mein Versprechen:</span> Ich erstelle
                    Ihnen eine kostenlose Demo-Website Ihres Unternehmens. Sie sehen das Ergebnis,
                    bevor Sie sich entscheiden. Kein Risiko. Keine Verpflichtung.
                  </p>
                </div>
              </div>

              {/* Contact Form – sendet direkt via tRPC an aleks@aleksboskovic.com */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-white/5 relative" style={{ zIndex: 3 }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#" className="flex items-center gap-3">
              <img src={PROCESS_ICON} alt="QC Logo" className="w-8 h-8 object-contain" />
              <span
                className="font-bold tracking-widest gold-shimmer"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", letterSpacing: "0.15em" }}
              >
                QUANTUM<span className="font-light"> CREATIVITY</span>
              </span>
            </a>
            <div className="flex gap-6 text-xs font-light text-muted-foreground tracking-wider">
              <button
                onClick={() => setLegalModal("impressum")}
                className="hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                Impressum
              </button>
              <button
                onClick={() => setLegalModal("datenschutz")}
                className="hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                Datenschutz
              </button>
              <button
                onClick={() => setLegalModal("agb")}
                className="hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                AGB
              </button>
            </div>
            <p className="text-xs font-light text-muted-foreground">
              © {new Date().getFullYear()} QuantumCreativity · Aleksandar Boskovic · {STANDORT}
            </p>
          </div>
        </div>
      </footer>

      {/* ─── LEGAL MODALS ─── */}
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      {/* ─── COOKIE BANNER ─── */}
      <CookieBanner />
    </div>
  );
}

// ─── CONTACT FORM COMPONENT ───
// Sendet E-Mail direkt via tRPC-Backend an aleks@aleksboskovic.com
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", business: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Nachricht gesendet! Ich melde mich innerhalb von 24 Stunden.");
    },
    onError: (err) => {
      console.error("Kontaktformular Fehler:", err);
      toast.error("Fehler beim Senden. Bitte rufen Sie mich direkt an: +43 660 624 2162");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.business || !formData.phone) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    sendContact.mutate({
      name: formData.name,
      business: formData.business,
      phone: formData.phone,
      message: formData.message || undefined,
    });
  };

  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center p-8 border border-gold/20 rounded-lg"
        style={{ background: "oklch(0.78 0.12 85 / 0.05)" }}
      >
        <CheckCircle className="w-12 h-12 mb-4" style={{ color: "var(--gold)" }} />
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vielen Dank!
        </h3>
        <p className="text-sm font-light text-muted-foreground">
          Ich melde mich innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {[
        { key: "name", label: "Ihr Name *", placeholder: "Max Mustermann", type: "text" },
        { key: "business", label: "Ihr Unternehmen *", placeholder: "Restaurant Muster", type: "text" },
        { key: "phone", label: "Telefonnummer *", placeholder: "+43 660 ...", type: "tel" },
      ].map((field) => (
        <div key={field.key}>
          <label className="block text-xs font-light tracking-wider uppercase text-muted-foreground mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.key as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            required
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-light tracking-wider uppercase text-muted-foreground mb-2">
          Ihre Nachricht (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Erzählen Sie mir kurz von Ihrem Unternehmen..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={sendContact.isPending}
        className="w-full font-medium tracking-wider py-6 mt-2"
        style={{ background: "var(--gold)", color: "oklch(0.10 0.008 270)", border: "none" }}
      >
        {sendContact.isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            <Mail className="w-5 h-5 mr-2" />
            Nachricht senden
          </>
        )}
      </Button>
    </form>
  );
}
