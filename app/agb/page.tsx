import { LegalLayout } from "@/components/legal-layout"

export const metadata = {
  title: "AGB | Paw & Co. Boutique",
  description: "Allgemeine Geschaftsbedingungen von Paw & Co. Boutique"
}

export default function AGBPage() {
  return (
    <LegalLayout title="Allgemeine Geschaftsbedingungen">
      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          Diese Bedingungen gelten fur alle Bestellungen uber unseren Onlineshop.
        </p>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">1. Geltungsbereich</h2>
          <p className="leading-relaxed">
            Vertragspartner ist Paw & Co. Boutique (Einzelunternehmer), siehe{" "}
            <a href="/impressum" className="text-accent hover:underline">Impressum</a>. 
            Es gelten ausschliesslich diese AGB in der zum Zeitpunkt der Bestellung gultigen Fassung.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">2. Vertragsschluss</h2>
          <p className="leading-relaxed">
            Die Darstellung der Produkte stellt kein rechtlich bindendes Angebot dar. 
            Mit Abschluss des Bestellvorgangs geben Sie ein verbindliches Angebot ab. 
            Der Vertrag kommt zustande, wenn wir die Bestellung bestatigen oder die Ware versenden.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">3. Preise und Zahlung</h2>
          <p className="leading-relaxed">
            Alle Preise sind Endpreise in Euro und enthalten die gesetzliche Mehrwertsteuer von 19%. 
            Versandkosten werden gesondert ausgewiesen und betragen innerhalb Deutschlands 4,90 EUR. 
            Ab einem Bestellwert von 100 EUR ist der Versand kostenfrei.
          </p>
          <p className="leading-relaxed mt-4">
            Die Zahlung erfolgt uber PayPal oder Kreditkarte (Visa, Mastercard).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">4. Lieferung</h2>
          <p className="leading-relaxed">
            Die Lieferzeit betragt in der Regel 3-5 Werktage innerhalb Deutschlands. 
            Bei Lieferungen in andere EU-Lander kann die Lieferzeit bis zu 10 Werktage betragen.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">5. Eigentumsvorbehalt</h2>
          <p className="leading-relaxed">
            Die Ware bleibt bis zur vollstandigen Bezahlung unser Eigentum.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">6. Widerrufsrecht</h2>
          <p className="leading-relaxed">
            Verbraucher haben ein gesetzliches Widerrufsrecht. Die vollstandige Widerrufsbelehrung 
            finden Sie unter{" "}
            <a href="/widerruf" className="text-accent hover:underline">Widerrufsrecht</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">7. Gewahrleistung</h2>
          <p className="leading-relaxed">
            Es gelten die gesetzlichen Gewahrleistungsrechte. Bei Mangeln wenden Sie sich bitte 
            zunachst an unseren Kundenservice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">8. Schlussbestimmungen</h2>
          <p className="leading-relaxed">
            Es gilt das Recht der Bundesrepublik Deutschland. Bei Verbrauchern gilt diese 
            Rechtswahl nur, soweit dadurch keine zwingenden Verbraucherschutzrechte entzogen werden.
          </p>
        </section>

        <p className="text-sm pt-8 border-t border-border">
          Stand: Marz 2026
        </p>
      </div>
    </LegalLayout>
  )
}
