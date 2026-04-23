/**
 * LegalModal – Elegante schwebende Modal-Fenster für Impressum, Datenschutz & AGB
 * Design: Dark Forge – dunkler Hintergrund, Gold-Akzente, Cormorant Garamond Headlines
 */

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type LegalType = "impressum" | "datenschutz" | "agb";

interface LegalModalProps {
  type: LegalType | null;
  onClose: () => void;
}

const CONTENT: Record<LegalType, { title: string; body: React.ReactNode }> = {
  impressum: {
    title: "Impressum",
    body: (
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Diensteanbieter / Medieninhaber
          </h3>
          <p className="text-foreground/80">
            Aleksandar Boskovic<br />
            Lamberggasse 18<br />
            5020 Salzburg, Österreich
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Kontakt
          </h3>
          <p className="text-foreground/80">
            Telefon: <a href="tel:+436606242162" className="hover:text-gold transition-colors" style={{ color: "var(--gold)" }}>+43 660 624 2162</a><br />
            E-Mail: <a href="mailto:aleks@aleksboskovic.com" className="hover:text-gold transition-colors" style={{ color: "var(--gold)" }}>aleks@aleksboskovic.com</a>
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Unternehmensgegenstand
          </h3>
          <p className="text-foreground/80">
            Webdesign, Webentwicklung und digitale Dienstleistungen für Unternehmen
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Rechtsgrundlage
          </h3>
          <p className="text-foreground/60 text-xs leading-relaxed">
            Angaben gemäß § 5 ECG (E-Commerce-Gesetz) und § 24 MedienG (Mediengesetz), Österreich.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            EU-Streitschlichtung
          </h3>
          <p className="text-foreground/60 text-xs leading-relaxed">
            Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten:{" "}
            <a
              href="http://ec.europa.eu/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--gold)" }}
            >
              ec.europa.eu/odr
            </a>
            . Beschwerden können auch direkt per E-Mail an{" "}
            <a href="mailto:aleks@aleksboskovic.com" style={{ color: "var(--gold)" }}>
              aleks@aleksboskovic.com
            </a>{" "}
            gerichtet werden.
          </p>
        </section>
      </div>
    ),
  },

  datenschutz: {
    title: "Datenschutzerklärung",
    body: (
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            1. Verantwortlicher
          </h3>
          <p className="text-foreground/80">
            Aleksandar Boskovic, Lamberggasse 18, 5020 Salzburg, Österreich<br />
            E-Mail: <a href="mailto:aleks@aleksboskovic.com" style={{ color: "var(--gold)" }}>aleks@aleksboskovic.com</a>
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            2. Kontaktformular
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten (Name, Unternehmen, Telefonnummer, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung). Die Daten werden nicht an Dritte weitergegeben und nach Abschluss der Anfrage gelöscht.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            3. Hosting & Server-Logs
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Diese Website wird auf Servern in der EU gehostet. Beim Aufruf der Website werden automatisch technische Daten (IP-Adresse, Browsertyp, Uhrzeit) in Server-Logs gespeichert.
            Diese Daten werden ausschließlich zur Sicherstellung des Betriebs verwendet und nach 7 Tagen gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            4. Google Analytics (GA4)
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Diese Website nutzt Google Analytics 4 der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            Die Nutzung erfolgt ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            IP-Anonymisierung ist aktiviert. Daten können in die USA übertragen werden (EU-US Data Privacy Framework).
            Sie können Ihre Einwilligung jederzeit widerrufen.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            5. Ihre Rechte (DSGVO)
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Sie haben das Recht auf <strong className="text-foreground/90">Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch</strong>.
            Bei Beschwerden können Sie sich an die österreichische Datenschutzbehörde (DSB) wenden:{" "}
            <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>dsb.gv.at</a>.
            Für Anfragen: <a href="mailto:aleks@aleksboskovic.com" style={{ color: "var(--gold)" }}>aleks@aleksboskovic.com</a>
          </p>
        </section>
      </div>
    ),
  },

  agb: {
    title: "Allgemeine Geschäftsbedingungen",
    body: (
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            1. Geltungsbereich
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Diese AGB gelten für alle geschäftlichen Beziehungen zwischen Aleksandar Boskovic (nachfolgend „Auftragnehmer") und dem Kunden in der jeweils zum Zeitpunkt des Vertragsschlusses gültigen Fassung.
            Abweichende Bedingungen des Kunden werden nicht anerkannt, sofern nicht ausdrücklich schriftlich zugestimmt wurde.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            2. Vertragsschluss
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch die tatsächliche Leistungserbringung zustande.
            Angebote sind freibleibend und unverbindlich, sofern nicht ausdrücklich anders vereinbart.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            3. Preise & Zahlung
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Alle Preise verstehen sich exklusive der gesetzlichen Umsatzsteuer (MwSt.), sofern nicht anders angegeben.
            Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug fällig.
            Bei Zahlungsverzug werden Verzugszinsen in gesetzlicher Höhe berechnet.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            4. Leistungsumfang & Mitwirkungspflichten
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
            Der Kunde ist verpflichtet, alle für die Leistungserbringung notwendigen Informationen, Inhalte und Zugänge rechtzeitig bereitzustellen.
            Verzögerungen durch fehlende Mitwirkung des Kunden gehen nicht zu Lasten des Auftragnehmers.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            5. Urheberrecht & Nutzungsrechte
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Alle erstellten Werke (Designs, Codes, Texte) bleiben bis zur vollständigen Bezahlung Eigentum des Auftragnehmers.
            Nach vollständiger Zahlung erhält der Kunde das einfache, nicht übertragbare Nutzungsrecht für den vereinbarten Zweck.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            6. Gewährleistung & Haftung
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Es gelten die gesetzlichen Gewährleistungsbestimmungen nach österreichischem Recht.
            Eine Haftung für leichte Fahrlässigkeit wird – sofern es sich nicht um Personenschäden handelt – ausgeschlossen.
            Die Haftung für mittelbare Schäden, entgangenen Gewinn und Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig.
          </p>
        </section>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,67,0.3), transparent)" }} />

        <section>
          <h3 className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            7. Gerichtsstand & anwendbares Recht
          </h3>
          <p className="text-foreground/70 text-xs leading-relaxed">
            Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts.
            Für alle Streitigkeiten wird das sachlich zuständige Gericht in Salzburg vereinbart,
            sofern dem keine zwingenden Verbraucherschutzbestimmungen entgegenstehen.
          </p>
        </section>

        <p className="text-foreground/40 text-xs pt-2">
          Stand: {new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })} · Aleksandar Boskovic, Salzburg
        </p>
      </div>
    ),
  },
};

export function LegalModal({ type, onClose }: LegalModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Schließen mit Escape-Taste
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [type, onClose]);

  if (!type) return null;

  const { title, body } = CONTENT[type];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(5, 5, 10, 0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Modal Panel */}
      <div
        className="relative w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl flex flex-col"
        style={{
          background: "oklch(0.12 0.008 270)",
          border: "1px solid rgba(212,168,67,0.2)",
          boxShadow: "0 0 80px rgba(212,168,67,0.08), 0 40px 80px rgba(0,0,0,0.6)",
          maxHeight: "85vh",
          animation: "modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(212,168,67,0.15)" }}
        >
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}
            >
              Rechtliches
            </p>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.95 0.005 80)" }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
            style={{
              border: "1px solid rgba(212,168,67,0.2)",
              color: "oklch(0.60 0.01 80)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,168,67,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.60 0.01 80)";
            }}
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,168,67,0.2) transparent" }}>
          {body}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(212,168,67,0.1)" }}
        >
          <p className="text-xs text-center" style={{ color: "oklch(0.45 0.008 80)" }}>
            © {new Date().getFullYear()} QuantumCreativity · Aleksandar Boskovic · Österreich
          </p>
        </div>
      </div>
    </div>
  );
}
