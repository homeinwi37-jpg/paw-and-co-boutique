import { LegalLayout } from "@/components/legal-layout"

export const metadata = {
  title: "Datenschutz | Paw & Co. Boutique",
  description: "Datenschutzerklarung von Paw & Co. Boutique"
}

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklarung">
      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          Diese Erklarung informiert Sie uber die Verarbeitung personenbezogener Daten 
          beim Besuch dieses Shops und bei Kaufen.
        </p>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Verantwortlicher</h2>
          <p className="leading-relaxed">
            Paw & Co. Boutique (Einzelunternehmer) - siehe{" "}
            <a href="/impressum" className="text-accent hover:underline">Impressum</a>.
            <br />
            E-Mail Datenschutz:{" "}
            <a href="mailto:datenschutz@pawandco.de" className="text-accent hover:underline">
              datenschutz@pawandco.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Datenverarbeitung beim Besuch</h2>
          <p className="leading-relaxed">
            Beim Aufruf unserer Website werden durch den Hosting-Anbieter automatisch 
            technische Informationen erfasst (z.B. IP-Adresse, Zeitpunkt, Browser-Typ), 
            soweit dies zur Bereitstellung und Sicherheit der Seite erforderlich ist.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Bestellvorgang</h2>
          <p className="leading-relaxed">
            Im Rahmen der Bestellung erheben wir die fur die Vertragsabwicklung notwendigen Daten 
            (Name, Adresse, E-Mail, Zahlungsinformationen). Diese Daten werden ausschliesslich 
            zur Vertragserfüllung verarbeitet und nach den gesetzlichen Aufbewahrungsfristen geloscht.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Zahlungsabwicklung</h2>
          <p className="leading-relaxed">
            Wenn Sie PayPal nutzen, werden die fur die Transaktion notwendigen Daten an 
            PayPal (Europe) S.a r.l. et Cie, S.C.A. ubermittelt. Die Verarbeitung richtet sich 
            nach der Datenschutzerklarung von PayPal.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Cookies</h2>
          <p className="leading-relaxed">
            Wir verwenden nur technisch notwendige Cookies, die fur den Betrieb der Website 
            erforderlich sind. Marketing-Cookies setzen wir nur mit Ihrer ausdrucklichen Einwilligung ein.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Ihre Rechte</h2>
          <p className="leading-relaxed">
            Sie haben nach Massgabe der DSGVO folgende Rechte:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Auskunft uber Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Loschung Ihrer Daten</li>
            <li>Einschrankung der Verarbeitung</li>
            <li>Datenubertragbarkeit</li>
            <li>Widerspruch gegen die Verarbeitung</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Sie konnen sich zudem bei einer Datenschutzaufsichtsbehorde beschweren.
          </p>
        </section>

        <p className="text-sm pt-8 border-t border-border">
          Stand: Marz 2026
        </p>
      </div>
    </LegalLayout>
  )
}
