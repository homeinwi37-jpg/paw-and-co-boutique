"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { X, Plus, ImageIcon, Trash2 } from "lucide-react"
import { type Product, getCategories, addProduct, updateProduct } from "@/lib/products"
import { Spinner } from "@/components/ui/spinner"

interface ProductFormProps {
  product?: Product | null
  onSave: () => void
  onCancel: () => void
}

const defaultCategories = ["Betten", "Halsbander", "Snacks", "Spielzeug", "Bekleidung", "Napfe", "Pflege", "Sonstiges"]

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>(defaultCategories)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    images: [""],
    category: "",
    specs: {} as Record<string, string>,
    cjProductId: "",
    cjVariantId: "",
    isActive: true,
  })

  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

  useEffect(() => {
    const existingCategories = getCategories()
    if (existingCategories.length > 0) {
      setCategories([...new Set([...defaultCategories, ...existingCategories])])
    }

    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        images: product.images.length > 0 ? product.images : [""],
        category: product.category,
        specs: { ...product.specs },
        cjProductId: product.cjProductId || "",
        cjVariantId: product.cjVariantId || "",
        isActive: product.isActive,
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      images: formData.images.filter(img => img.trim() !== ""),
      category: formData.category || "Sonstiges",
      specs: formData.specs,
      cjProductId: formData.cjProductId || undefined,
      cjVariantId: formData.cjVariantId || undefined,
      isActive: formData.isActive,
    }

    if (product) {
      updateProduct(product.id, productData)
    } else {
      addProduct(productData)
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    setIsLoading(false)
    onSave()
  }

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [""] })
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const addSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [newSpecKey]: newSpecValue }
      })
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specs }
    delete newSpecs[key]
    setFormData({ ...formData, specs: newSpecs })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grundinformationen</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Produktname *</FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="z.B. Premium Hundebett 'Royal Comfort'"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Beschreibung</FieldLabel>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detaillierte Produktbeschreibung..."
                rows={4}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">Verkaufspreis (EUR) *</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="99.99"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="originalPrice">Originalpreis (EUR)</FieldLabel>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="129.99"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="category">Kategorie</FieldLabel>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie wahlen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="isActive">Produkt aktiv</FieldLabel>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Inaktive Produkte werden im Shop nicht angezeigt
              </p>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bilder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted overflow-hidden flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <Input
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImage} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Bild hinzufugen
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spezifikationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(formData.specs).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{key}:</span>
                <span className="flex-1 text-muted-foreground">{value}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpec(key)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="flex gap-2">
              <Input
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Eigenschaft (z.B. Material)"
                className="flex-1"
              />
              <Input
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Wert (z.B. Leder)"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={addSpec}
                disabled={!newSpecKey.trim() || !newSpecValue.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CJ Dropshipping</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cjProductId">CJ Produkt-ID</FieldLabel>
              <Input
                id="cjProductId"
                value={formData.cjProductId}
                onChange={(e) => setFormData({ ...formData, cjProductId: e.target.value })}
                placeholder="z.B. 1234567890"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="cjVariantId">CJ Varianten-ID</FieldLabel>
              <Input
                id="cjVariantId"
                value={formData.cjVariantId}
                onChange={(e) => setFormData({ ...formData, cjVariantId: e.target.value })}
                placeholder="z.B. v1234567890"
              />
            </Field>
          </FieldGroup>
          <p className="text-sm text-muted-foreground mt-3">
            Diese IDs werden fur die automatische Bestellung bei CJ Dropshipping verwendet
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit" disabled={isLoading || !formData.name || !formData.price}>
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Speichern...
            </>
          ) : (
            product ? "Anderungen speichern" : "Produkt erstellen"
          )}
        </Button>
      </div>
    </form>
  )
}
