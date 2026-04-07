"use client"

const items = [
  "Schneller Versand",
  "Deutsches Design",
  "Handgefertigt",
  "Nachhaltige Materialien",
  "Premium Qualitat",
  "14 Tage Ruckgabe"
]

export function MarqueeSection() {
  return (
    <div className="bg-primary text-primary-foreground py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <span 
            key={index}
            className="mx-12 text-xs tracking-[0.3em] uppercase font-medium"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
