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

// Get stored API key
export function getCJApiKey(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cj_api_key')
}

// Save API key
export function setCJApiKey(apiKey: string): void {
  localStorage.setItem('cj_api_key', apiKey)
}

// Remove API key
export function removeCJApiKey(): void {
  localStorage.removeItem('cj_api_key')
}

// Make API request to CJ
async function cjRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const apiKey = getCJApiKey()
  if (!apiKey) {
    throw new Error('CJ API Key nicht konfiguriert')
  }

  const response = await fetch(`${CJ_API_BASE}${endpoint}`, {
    ...options,
    cache: 'no-store',
    headers: {
      'CJ-Access-Token': apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`CJ API Fehler: ${response.status}`)
  }

  const data = await response.json()
  
  if (data.code !== 200) {
    throw new Error(data.message || 'CJ API Fehler')
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
    const result = await cjRequest<any>('/product/query', {
      method: 'POST',
      body: JSON.stringify({ pid }),
    })
    return result || null
  } catch {
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

// Extract product ID from CJ URL
export function extractCJProductId(url: string): string | null {
  // URL formats:
  // https://cjdropshipping.com/product/xxx-p-123456.html
  // https://www.cjdropshipping.com/product-detail/123456
  
  const patterns = [
    /p-(\d+)\.html/,
    /product-detail\/(\d+)/,
    /pid=(\d+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  // If it's just a number, return it
  if (/^\d+$/.test(url.trim())) {
    return url.trim()
  }

  return null
}

// Convert CJ product to our product format
export function convertCJToProduct(cj: CJProduct, germanName?: string): Omit<import('./products').Product, 'id' | 'createdAt' | 'updatedAt'> {
  // Calculate retail price (markup of ~2.5x)
  const sellPrice = cj.sellPrice || cj.sourcePrice || 10
  const retailPrice = Math.ceil(sellPrice * 2.5 * 100) / 100
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
export async function validateCJApiKey(): Promise<boolean> {
  try {
    await cjRequest('/product/list', {
      method: 'POST',
      body: JSON.stringify({ pageNum: 1, pageSize: 1 }),
    })
    return true
  } catch {
    return false
  }
}
