import { Truck, Headphones, RefreshCcw, ShieldCheck } from "lucide-react"

export function TrustSection() {
  const features = [
    { icon: Truck, title: "Sicherer Versand", desc: "Schnell & Versichert" },
    { icon: Headphones, title: "24/7 Support", desc: "Immer für Sie da" },
    { icon: RefreshCcw, title: "14 Tage Rückgabe", desc: "Ohne Wenn und Aber" },
  ]

  return (
    <div className="mt-10 py-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div key={i} className="flex flex-col items-center text-center space-y-2">
          <div className="p-3 bg-accent/10 rounded-full">
            <f.icon className="h-6 w-6 text-accent" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-tighter">{f.title}</h4>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}