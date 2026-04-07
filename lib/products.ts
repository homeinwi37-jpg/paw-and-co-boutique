export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  specs: Record<string, string>
  cjProductId?: string
  cjVariantId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductsData {
  products: Product[]
  lastUpdated: string
}

const STORAGE_KEY = 'paw_co_products'

// Get products from localStorage (for admin editing)
export function getProductsFromStorage(): Product[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return getDefaultProducts()
  try {
    const parsed: ProductsData = JSON.parse(data)
    return parsed.products
  } catch {
    return getDefaultProducts()
  }
}

// Save products to localStorage
export function saveProductsToStorage(products: Product[]): void {
  const data: ProductsData = {
    products,
    lastUpdated: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Add a new product
export function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProductsFromStorage()
  const newProduct: Product = {
    ...product,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  products.push(newProduct)
  saveProductsToStorage(products)
  return newProduct
}

// Update a product
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProductsFromStorage()
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  saveProductsToStorage(products)
  return products[index]
}

// Delete a product
export function deleteProduct(id: string): boolean {
  const products = getProductsFromStorage()
  const filtered = products.filter(p => p.id !== id)
  if (filtered.length === products.length) return false
  saveProductsToStorage(filtered)
  return true
}

// Get a single product by ID
export function getProductById(id: string): Product | null {
  const products = getProductsFromStorage()
  return products.find(p => p.id === id) || null
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Default products for initial setup
export function getDefaultProducts(): Product[] {
  return [
    {
      id: "prod_001",
      name: "Premium Hundebett 'Royal Comfort'",
      description: "Luxuriöses orthopädisches Hundebett aus hochwertigem Memory-Schaum. Bezug aus samtweichem, hypoallergenem Stoff in elegantem Grau. Waschbar bei 30°C.",
      price: 149.99,
      originalPrice: 199.99,
      images: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
      ],
      category: "Betten",
      specs: {
        "Material": "Memory-Schaum, Samt",
        "Größe": "80x60x20 cm",
        "Gewicht": "3.5 kg",
        "Pflegehinweis": "Bezug waschbar bei 30°C"
      },
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "prod_002",
      name: "Elegantes Leder-Halsband 'Milano'",
      description: "Handgefertigtes Hundehalsband aus italienischem Vollnarbenleder. Verstellbar mit goldener Schnalle. Erhältlich in verschiedenen Größen.",
      price: 79.99,
      originalPrice: 99.99,
      images: [
        "https://images.unsplash.com/photo-1599839575338-31b11ae5c390?w=800"
      ],
      category: "Halsbänder",
      specs: {
        "Material": "Italienisches Leder",
        "Breite": "2.5 cm",
        "Länge": "35-45 cm (verstellbar)",
        "Verschluss": "Goldene Metallschnalle"
      },
      isActive: true,
      createdAt: "2024-01-16T10:00:00Z",
      updatedAt: "2024-01-16T10:00:00Z"
    },
    {
      id: "prod_003",
      name: "Bio-Leckerli Set 'Naturgenuss'",
      description: "Premium Bio-Hundesnacks aus 100% natürlichen Zutaten. Ohne Zusatzstoffe, Getreide und Zucker. Set enthält 3 verschiedene Sorten.",
      price: 34.99,
      images: [
        "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800"
      ],
      category: "Snacks",
      specs: {
        "Inhalt": "3x 100g Beutel",
        "Sorten": "Huhn, Lachs, Rind",
        "Zertifizierung": "Bio, Getreidefrei",
        "Haltbarkeit": "12 Monate"
      },
      isActive: true,
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z"
    },
    {
      id: "prod_004",
      name: "Intelligentes Spielzeug 'Brain Trainer'",
      description: "Interaktives Futterspielzeug zur geistigen Beschäftigung. Verschiedene Schwierigkeitsstufen. Fördert die natürliche Neugier Ihres Hundes.",
      price: 44.99,
      originalPrice: 59.99,
      images: [
        "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800"
      ],
      category: "Spielzeug",
      specs: {
        "Material": "BPA-freier Kunststoff",
        "Größe": "15x15x8 cm",
        "Schwierigkeitsstufen": "3",
        "Spülmaschinenfest": "Ja"
      },
      isActive: true,
      createdAt: "2024-01-18T10:00:00Z",
      updatedAt: "2024-01-18T10:00:00Z"
    },
    {
      id: "prod_005",
      name: "Regenmantel 'Urban Shield'",
      description: "Wasserdichter Hundemantel mit reflektierenden Streifen für sichere Nachtspaziergänge. Atmungsaktiv und leicht anzuziehen.",
      price: 64.99,
      images: [
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800"
      ],
      category: "Bekleidung",
      specs: {
        "Material": "Wasserdichtes Polyester",
        "Größen": "S, M, L, XL",
        "Farbe": "Schwarz mit Reflektoren",
        "Verschluss": "Klettverschluss"
      },
      isActive: true,
      createdAt: "2024-01-19T10:00:00Z",
      updatedAt: "2024-01-19T10:00:00Z"
    },
    {
      id: "prod_006",
      name: "Keramik-Napf Set 'Elegance'",
      description: "Hochwertiges 2er-Set Keramiknäpfe mit rutschfestem Silikonboden. Spülmaschinenfest und kratzfest. Zeitloses Design.",
      price: 54.99,
      originalPrice: 69.99,
      images: [
        "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800"
      ],
      category: "Näpfe",
      specs: {
        "Material": "Hochwertige Keramik",
        "Fassungsvermögen": "400ml + 800ml",
        "Boden": "Rutschfestes Silikon",
        "Spülmaschinenfest": "Ja"
      },
      isActive: true,
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z"
    }
  ]
}

// Initialize products in localStorage if empty
export function initializeProducts(): void {
  if (typeof window === 'undefined') return
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    saveProductsToStorage(getDefaultProducts())
  }
}

// Get all categories
export function getCategories(): string[] {
  const products = getProductsFromStorage()
  const categories = new Set(products.map(p => p.category))
  return Array.from(categories)
}

// Export products as JSON string (for GitHub upload)
export function exportProductsAsJson(): string {
  const products = getProductsFromStorage()
  const data: ProductsData = {
    products,
    lastUpdated: new Date().toISOString()
  }
  return JSON.stringify(data, null, 2)
}

// Import products from JSON string
export function importProductsFromJson(jsonString: string): boolean {
  try {
    const data: ProductsData = JSON.parse(jsonString)
    if (Array.isArray(data.products)) {
      saveProductsToStorage(data.products)
      return true
    }
    return false
  } catch {
    return false
  }
}
