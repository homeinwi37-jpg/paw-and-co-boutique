import { LegalLayout } from "@/components/legal-layout"

export const metadata = {
  title: "Impressum | Paw & Co. Boutique",
  description: "Impressum und rechtliche Angaben von Paw & Co. Boutique"
}

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Angaben gemass 5 TMG</h2>
          <p className="leading-relaxed">
            <strong className="text-foreground">Paw & Co. Boutique</strong><br />
            (Einzelunternehmer)<br />
            <br />
            Musterstrasse 123<br />
            80331 Munchen<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Kontakt</h2>
          <p className="leading-relaxed">
            E-Mail: <a href="mailto:kontakt@pawandco.de" className="text-accent hover:underline">kontakt@pawandco.de</a><br />
            Telefon: +49 (0) 89 123 456 78
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Umsatzsteuer-ID</h2>
          <p className="leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemass 27a Umsatzsteuergesetz:<br />
            DE 123 456 789
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Verantwortlich fur den Inhalt</h2>
          <p className="leading-relaxed">
            Gemass 55 Abs. 2 RStV:<br />
            Paw & Co. Boutique<br />
            (Anschrift wie oben)
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">EU-Streitschlichtung</h2>
          <p className="leading-relaxed">
            Die Europaische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="leading-relaxed mt-4">
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, 
            an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <p className="text-sm pt-8 border-t border-border">
          Stand: Marz 2026
        </p>
      </div>
    </LegalLayout>
  )
}
