import { supabase } from './supabase'

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

// Get all products from Supabase
export async function getProductsFromStorage(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data.map(mapDbToProduct)
}

// Map database fields (snake_case) to Product interface (camelCase)
function mapDbToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: Number(dbProduct.price),
    originalPrice: dbProduct.original_price ? Number(dbProduct.original_price) : undefined,
    images: dbProduct.images || [],
    category: dbProduct.category,
    specs: dbProduct.specs || {},
    cjProductId: dbProduct.cj_product_id,
    cjVariantId: dbProduct.cj_variant_id,
    isActive: dbProduct.is_active,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at
  }
}

// Add a new product to Supabase
export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.originalPrice,
      images: product.images,
      category: product.category,
      specs: product.specs,
      cj_product_id: product.cjProductId,
      cj_variant_id: product.cjVariantId,
      is_active: product.isActive
    }])
    .select()
    .single()

  if (error) {
    console.error('Error adding product:', error)
    return null
  }

  return mapDbToProduct(data)
}

// Update a product in Supabase
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const dbUpdates: any = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.price !== undefined) dbUpdates.price = updates.price
  if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice
  if (updates.images !== undefined) dbUpdates.images = updates.images
  if (updates.category !== undefined) dbUpdates.category = updates.category
  if (updates.specs !== undefined) dbUpdates.specs = updates.specs
  if (updates.cjProductId !== undefined) dbUpdates.cj_product_id = updates.cjProductId
  if (updates.cjVariantId !== undefined) dbUpdates.cj_variant_id = updates.cjVariantId
  if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive
  
  dbUpdates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('products')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    return null
  }

  return mapDbToProduct(data)
}

// Delete a product from Supabase
export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return false
  }

  return true
}

// Get a single product by ID from Supabase
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }

  return mapDbToProduct(data)
}

// Get all categories from Supabase
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  const categories = new Set(data.map(p => p.category))
  return Array.from(categories).filter(Boolean) as string[]
}

// Initialize products - no longer needed for Supabase as data is persistent
export function initializeProducts(): void {
  // Supabase is persistent, no initialization needed like LocalStorage
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
