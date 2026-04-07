import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

// Sample products data
const products = [
  {
    id: "1",
    name: "Samt-Hundebett Milano",
    price: 189.00,
    category: "Betten",
    description: "Das Milano Hundebett vereint italienische Eleganz mit deutschem Qualitatshandwerk. Gefertigt aus feinstem Samt und gefullt mit ergonomischem Memory-Schaum fur optimalen Schlafkomfort.",
    specs: [
      "Premium Samtbezug",
      "Memory-Schaum Fullung",
      "Abnehmbarer, waschbarer Bezug",
      "Rutschfeste Unterseite",
      "Grosse: 80x60x25 cm"
    ],
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=1000&fit=crop"
    ],
    isNew: true
  },
  {
    id: "2",
    name: "Leder-Halsband Firenze",
    price: 79.00,
    category: "Halsbander",
    description: "Handgefertigtes Halsband aus italienischem Vollnarbenleder. Jedes Stuck ist ein Unikat mit individueller Maserung und wird mit traditionellen Techniken in unserer Manufaktur gefertigt.",
    specs: [
      "Italienisches Vollnarbenleder",
      "Handvernäht",
      "Vernickelte Beschlage",
      "Verstellbar",
      "Grosse: S, M, L, XL"
    ],
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=1000&fit=crop"
    ],
    isNew: false
  },
  {
    id: "3",
    name: "Bio-Pflegeset Natura",
    price: 59.00,
    category: "Pflege",
    description: "Unser Natura Pflegeset enthalt ausschliesslich biologische Inhaltsstoffe. Sanft zur Haut und zum Fell Ihres Lieblings, ohne Kompromisse bei der Wirksamkeit.",
    specs: [
      "100% Bio-Inhaltsstoffe",
      "Dermatologisch getestet",
      "Ohne Parabene & Sulfate",
      "Vegan & tierversuchsfrei",
      "Inhalt: 250ml Shampoo, 100ml Conditioner"
    ],
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=1000&fit=crop"
    ],
    isNew: true
  },
  {
    id: "4",
    name: "Premium Futternapf Keramik",
    price: 49.00,
    category: "Accessoires",
    description: "Handgefertigter Futternapf aus hochwertiger Keramik. Das minimalistische Design fugt sich perfekt in jedes moderne Zuhause ein.",
    specs: [
      "Handgefertigte Keramik",
      "Spulmaschinenfest",
      "Rutschfester Boden",
      "Lebensmittelecht",
      "Fassungsvermogen: 500ml"
    ],
    images: [
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1000&fit=crop"
    ],
    isNew: false
  },
  {
    id: "5",
    name: "Kaschmir Katzenbett Oslo",
    price: 229.00,
    category: "Betten",
    description: "Luxurioses Katzenbett aus einer Mischung von Kaschmir und Merinowolle. Der perfekte Ruckzugsort fur anspruchsvolle Samtpfoten.",
    specs: [
      "Kaschmir-Merinowolle Mix",
      "Handgestrickt",
      "Hypoallergen",
      "Temperaturregulierend",
      "Durchmesser: 50 cm"
    ],
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=1000&fit=crop"
    ],
    isNew: false
  },
  {
    id: "6",
    name: "Elegantes Leder-Leine Set",
    price: 119.00,
    category: "Halsbander",
    description: "Passendes Leinen-Set zu unserem Firenze Halsband. Gefertigt aus dem gleichen hochwertigen italienischen Leder fur einen einheitlichen, eleganten Look.",
    specs: [
      "Italienisches Vollnarbenleder",
      "Gepolsterter Handgriff",
      "Vernickelte Karabiner",
      "Lange: 150 cm",
      "Breite: 2 cm"
    ],
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=1000&fit=crop"
    ],
    isNew: true
  }
]

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-serif text-4xl mb-4">Produkt nicht gefunden</h1>
          <p className="text-muted-foreground">Das gesuchte Produkt existiert leider nicht.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
