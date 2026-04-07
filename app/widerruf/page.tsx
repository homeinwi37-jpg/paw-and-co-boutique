import { LegalLayout } from "@/components/legal-layout"

export const metadata = {
  title: "Widerrufsrecht | Paw & Co. Boutique",
  description: "Widerrufsbelehrung von Paw & Co. Boutique"
}

export default function WiderrufPage() {
  return (
    <LegalLayout title="Widerrufsrecht">
      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Widerrufsbelehrung</h2>
          <p className="leading-relaxed">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Grunden diesen Vertrag zu widerrufen.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Widerrufsfrist</h2>
          <p className="leading-relaxed">
            Die Widerrufsfrist betragt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen 
            benannter Dritter, der nicht der Beforderer ist, die Waren in Besitz genommen haben bzw. hat.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Ausubung des Widerrufs</h2>
          <p className="leading-relaxed">
            Um Ihr Widerrufsrecht auszuuben, mussen Sie uns mittels einer eindeutigen Erklarung 
            (z.B. ein mit der Post versandter Brief oder E-Mail) uber Ihren Entschluss, 
            diesen Vertrag zu widerrufen, informieren.
          </p>
          <div className="mt-4 p-6 bg-secondary rounded-lg">
            <p className="text-foreground font-medium mb-2">Kontakt fur Widerruf:</p>
            <p>
              Paw & Co. Boutique<br />
              Musterstrasse 123<br />
              80331 Munchen<br />
              E-Mail:{" "}
              <a href="mailto:widerruf@pawandco.de" className="text-accent hover:underline">
                widerruf@pawandco.de
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Folgen des Widerrufs</h2>
          <p className="leading-relaxed">
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen 
            erhalten haben, einschliesslich der Lieferkosten (mit Ausnahme der zusatzlichen Kosten, 
            die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, 
            gunstigste Standardlieferung gewahlt haben), unverzuglich und spatestens binnen vierzehn 
            Tagen ab dem Tag zuruckzuzahlen, an dem die Mitteilung uber Ihren Widerruf bei uns 
            eingegangen ist.
          </p>
          <p className="leading-relaxed mt-4">
            Fur diese Ruckzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprunglichen 
            Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrucklich etwas anderes 
            vereinbart; in keinem Fall werden Ihnen wegen dieser Ruckzahlung Entgelte berechnet.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Rucksendung der Ware</h2>
          <p className="leading-relaxed">
            Sie haben die Waren unverzuglich und in jedem Fall spatestens binnen vierzehn Tagen 
            ab dem Tag, an dem Sie uns uber den Widerruf dieses Vertrags unterrichten, an uns 
            zuruckzusenden oder zu ubergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf 
            der Frist von vierzehn Tagen absenden.
          </p>
          <p className="leading-relaxed mt-4">
            Sie tragen die unmittelbaren Kosten der Rucksendung der Waren.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">Wertverlust</h2>
          <p className="leading-relaxed">
            Sie mussen fur einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser 
            Wertverlust auf einen zur Prufung der Beschaffenheit, Eigenschaften und Funktionsweise 
            der Waren nicht notwendigen Umgang mit ihnen zuruckzufuhren ist.
          </p>
        </section>

        <section className="p-6 bg-secondary rounded-lg">
          <h3 className="font-serif text-xl text-foreground mb-3">Muster-Widerrufsformular</h3>
          <p className="leading-relaxed text-sm">
            (Wenn Sie den Vertrag widerrufen wollen, dann fullen Sie bitte dieses Formular aus 
            und senden Sie es zuruck.)
          </p>
          <div className="mt-4 text-sm space-y-2">
            <p>An: Paw & Co. Boutique, Musterstrasse 123, 80331 Munchen, widerruf@pawandco.de</p>
            <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag uber 
              den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</p>
            <p>Bestellt am (*)/erhalten am (*)</p>
            <p>Name des/der Verbraucher(s)</p>
            <p>Anschrift des/der Verbraucher(s)</p>
            <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
            <p>Datum</p>
            <p className="text-xs text-muted-foreground mt-4">(*) Unzutreffendes streichen.</p>
          </div>
        </section>

        <p className="text-sm pt-8 border-t border-border">
          Stand: Marz 2026
        </p>
      </div>
    </LegalLayout>
  )
}
