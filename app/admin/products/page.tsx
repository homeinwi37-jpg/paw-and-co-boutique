"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ProductTable } from "@/components/admin/product-table"
import { ProductForm } from "@/components/admin/product-form"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { 
  getProductsFromStorage, 
  initializeProducts, 
  getProductById,
  type Product 
} from "@/lib/products"

export default function AdminProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const loadProducts = () => {
    initializeProducts()
    const loadedProducts = getProductsFromStorage()
    setProducts(loadedProducts)
    setIsLoading(false)
  }

  useEffect(() => {
    loadProducts()

    // Check URL params for edit or new
    const editId = searchParams.get('edit')
    const action = searchParams.get('action')

    if (editId) {
      const product = getProductById(editId)
      if (product) {
        setEditingProduct(product)
      }
    } else if (action === 'new') {
      setIsCreating(true)
    }
  }, [searchParams])

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsCreating(false)
    router.push(`/admin/products?edit=${product.id}`)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setIsCreating(true)
    router.push('/admin/products?action=new')
  }

  const handleSave = () => {
    setEditingProduct(null)
    setIsCreating(false)
    router.push('/admin/products')
    loadProducts()
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setIsCreating(false)
    router.push('/admin/products')
  }

  const showForm = isCreating || editingProduct

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showForm && (
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-serif font-bold">
                {showForm 
                  ? editingProduct 
                    ? "Produkt bearbeiten" 
                    : "Neues Produkt"
                  : "Produkte"
                }
              </h1>
              <p className="text-muted-foreground mt-1">
                {showForm
                  ? editingProduct
                    ? `Bearbeiten: ${editingProduct.name}`
                    : "Erstellen Sie ein neues Produkt"
                  : `${products.length} Produkte im Katalog`
                }
              </p>
            </div>
          </div>
          {!showForm && (
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Neues Produkt
            </Button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Produkte werden geladen...
          </div>
        ) : showForm ? (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onRefresh={loadProducts}
          />
        )}
      </div>
    </AdminLayout>
  )
}
