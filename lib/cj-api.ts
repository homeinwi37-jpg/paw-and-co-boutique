// CJ Dropshipping API Integration
// Documentation: https://developers.cjdropshipping.com/

export interface CJProduct {
  pid: string
  productName: string
  productNameEn: string
  description: string
  categoryName: string
  productImage: string
  productImages: string[]
  sellPrice: number
  sourcePrice: number
  productWeight: number
  variants: CJVariant[]
}

export interface CJVariant {
  vid: string
  variantName: string
  variantImage: string
  variantSellPrice: number
  variantStock: number
}

export interface CJSearchResult {
  products: CJProduct[]
  total: number
  pageNum: number
  pageSize: number
}

const CJ_API_BASE = 'https://developers.cjdropshipping.com/api2.0/v1'

// Get stored API key (with environment variable fallback)
export function getCJApiKey(): string | null {
  if (typeof window === 'undefined') return process.env.CJ_API_KEY || null
  return localStorage.getItem('cj_api_key') || process.env.NEXT_PUBLIC_CJ_API_KEY || null
}

// Save API key
export function setCJApiKey(apiKey: string): void {
  localStorage.setItem('cj_api_key', apiKey)
}

// Remove API key
export function removeCJApiKey(): void {
  localStorage.removeItem('cj_api_key')
}

// Make API request to CJ via internal API proxy
async function cjRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch('/api/import-cj', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint,
      method: options.method || 'POST',
      body: options.body ? JSON.parse(options.body as string) : {},
    }),
  })

  const data = await response.json()
  
  if (!response.ok || data.code !== 200) {
    throw new Error(data.message || `CJ API Fehler: ${data.code || response.status}`)
  }

  return data.data
}

// Search products
export async function searchCJProducts(
  keyword: string,
  pageNum: number = 1,
  pageSize: number = 20
): Promise<CJSearchResult> {
  const result = await cjRequest<any>('/product/list', {
    method: 'POST',
    body: JSON.stringify({
      productName: keyword,
      pageNum,
      pageSize,
    }),
  })

  return {
    products: result.list || [],
    total: result.total || 0,
    pageNum: result.pageNum || pageNum,
    pageSize: result.pageSize || pageSize,
  }
}

// Get product details by PID
export async function getCJProductById(pid: string): Promise<CJProduct | null> {
  try {
    // Ensure pid is treated as a string to avoid precision issues
    const result = await cjRequest<any>('/product/details', {
      method: 'POST',
      body: JSON.stringify({ pid: pid.toString() }),
    })
    return result || null
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Get product by SKU
export async function getCJProductBySku(sku: string): Promise<CJProduct | null> {
  try {
    const result = await cjRequest<any>('/product/query', {
      method: 'POST',
      body: JSON.stringify({ sku }),
    })
    return result || null
  } catch {
    return null
  }
}

export function extractCJProductId(url: string): string | null {
  const cleanUrl = url.trim()
  if (!cleanUrl) return null

  // If it's just a numeric ID, return it as a string
  if (/^\d+$/.test(cleanUrl)) {
    return cleanUrl
  }

  // Handle various CJ URL formats including the long ID format (V2)
  const patterns = [
    /p-(\d+)\.html/,                 // Standard: ...-p-1234.html
    /product-detail\/(\d+)/,         // Detail: .../product-detail/1234
    /pid=(\d+)/,                      // Query: ?pid=1234
    /productId=(\d+)/,                // Alternate query
  ]

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern)
    if (match && match[1]) return match[1].toString()
  }

  // Fallback: search for any sequence of 15+ digits (CJ V2 IDs are very long)
  const longIdMatch = cleanUrl.match(/(\d{15,})/)
  if (longIdMatch) return longIdMatch[1].toString()

  // Last fallback: any sequence of digits longer than 5
  const shortIdMatch = cleanUrl.match(/(\d{5,})/)
  if (shortIdMatch) return shortIdMatch[1].toString()

  return null
}

// Pricing Configuration
const USD_TO_EUR_RATE = 0.93 // Fixed exchange rate (USD -> EUR)
const MARKUP_FACTOR = 2.5 // 2.5x profit margin
const GERMAN_VAT_RATE = 0.19 // 19% MwSt

/**
 * Calculates the final retail price including Markup and VAT
 * Formula: (SourcePrice_USD * ExchangeRate) * Markup * (1 + VAT)
 */
export function calculateRetailPrice(sourcePriceUsd: number): number {
  const priceInEur = sourcePriceUsd * USD_TO_EUR_RATE
  const priceWithMarkup = priceInEur * MARKUP_FACTOR
  const finalPriceWithVat = priceWithMarkup * (1 + GERMAN_VAT_RATE)
  
  // Round to 2 decimal places
  return Math.ceil(finalPriceWithVat * 100) / 100
}

/**
 * Formats the price according to German price display laws (PAngV)
 * Example: 99,99 € inkl. MwSt.
 */
export function formatPriceGerman(price: number): string {
  const formatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
  
  return `${formatted} inkl. MwSt.`
}

// Convert CJ product to our product format
export function convertCJToProduct(cj: CJProduct, germanName?: string): Omit<import('./products').Product, 'id' | 'createdAt' | 'updatedAt'> {
  const sourcePrice = cj.sellPrice || cj.sourcePrice || 10
  
  // Calculate final retail price with VAT and Markup
  const retailPrice = calculateRetailPrice(sourcePrice)
  
  // Original price for "Strike-through" effect (30% higher than retail)
  const originalPrice = Math.ceil(retailPrice * 1.3 * 100) / 100

  return {
    name: germanName || cj.productNameEn || cj.productName,
    description: cj.description || '',
    price: retailPrice,
    originalPrice,
    images: cj.productImages?.length > 0 
      ? cj.productImages 
      : cj.productImage 
        ? [cj.productImage] 
        : [],
    category: cj.categoryName || 'Sonstiges',
    specs: {
      'Gewicht': `${cj.productWeight || 0}g`,
      'CJ Produkt-ID': cj.pid,
    },
    cjProductId: cj.pid,
    cjVariantId: cj.variants?.[0]?.vid,
    isActive: true,
  }
}

// Mock function for demo when no API key
export async function getMockCJProducts(): Promise<CJProduct[]> {
  return [
    {
      pid: '1001',
      productName: '高品质宠物床',
      productNameEn: 'Premium Pet Bed Orthopedic',
      description: 'High quality orthopedic pet bed with memory foam',
      categoryName: 'Pet Beds',
      productImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      productImages: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'
      ],
      sellPrice: 25.99,
      sourcePrice: 18.50,
      productWeight: 1500,
      variants: [
        { vid: 'v1001', variantName: 'Small', variantImage: '', variantSellPrice: 25.99, variantStock: 100 },
        { vid: 'v1002', variantName: 'Medium', variantImage: '', variantSellPrice: 35.99, variantStock: 80 },
      ]
    },
    {
      pid: '1002',
      productName: '真皮宠物项圈',
      productNameEn: 'Genuine Leather Pet Collar',
      description: 'Handmade genuine leather collar with brass buckle',
      categoryName: 'Pet Collars',
      productImage: 'https://images.unsplash.com/photo-1599839575338-31b11ae5c390?w=400',
      productImages: [
        'https://images.unsplash.com/photo-1599839575338-31b11ae5c390?w=800'
      ],
      sellPrice: 12.50,
      sourcePrice: 8.20,
      productWeight: 150,
      variants: [
        { vid: 'v2001', variantName: 'S (30-35cm)', variantImage: '', variantSellPrice: 12.50, variantStock: 200 },
        { vid: 'v2002', variantName: 'M (35-45cm)', variantImage: '', variantSellPrice: 14.50, variantStock: 150 },
      ]
    },
    {
      pid: '1003',
      productName: '智能宠物玩具',
      productNameEn: 'Interactive Pet Puzzle Toy',
      description: 'Smart puzzle toy for mental stimulation',
      categoryName: 'Pet Toys',
      productImage: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400',
      productImages: [
        'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800'
      ],
      sellPrice: 8.99,
      sourcePrice: 5.50,
      productWeight: 300,
      variants: [
        { vid: 'v3001', variantName: 'Standard', variantImage: '', variantSellPrice: 8.99, variantStock: 500 },
      ]
    }
  ]
}

// Check if API key is valid
export async function validateCJApiKey(tempKey?: string): Promise<boolean> {
  try {
    // Route validation through proxy to avoid CORS and use correct V2 endpoint
    const response = await fetch('/api/import-cj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: '/product/list',
        method: 'POST',
        body: { pageNum: 1, pageSize: 1 },
        token: tempKey // Pass temp key if validating a new one in settings
      }),
    })

    if (!response.ok) return false
    const data = await response.json()
    return data.code === 200
  } catch (error) {
    console.error('API Validation error:', error)
    return false
  }
}
