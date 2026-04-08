"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Download, 
  ExternalLink, 
  Package,
  Plus,
  Check,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { 
  extractCJProductId,
  convertCJToProduct,
  getCJProductById,
  searchCJProducts,
  type CJProduct 
} from "@/lib/cj-api"
import { addProduct, getProductsFromStorage } from "@/lib/products"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminImportPage() {
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [productUrl, setProductUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<CJProduct[]>([])
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    // Check already imported products
    const products = getProductsFromStorage()
    const cjIds = new Set(products.filter(p => p.cjProductId).map(p => p.cjProductId!))
    setImportedIds(cjIds)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setMessage(null)
    
    try {
      const result = await searchCJProducts(searchQuery)
      setSearchResults(result.products)
    } catch (error) {
      console.error('Search error:', error)
      setMessage({ type: 'error', text: 'Fehler bei der Suche. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportByUrl = async () => {
    if (!productUrl.trim()) return
    
    setIsLoading(true)
    setMessage(null)
    
    try {
      const productId = extractCJProductId(productUrl)
      
      if (!productId) {
        setMessage({ type: 'error', text: 'Ungultige CJ Dropshipping URL oder Produkt-ID' })
        setIsLoading(false)
        return
      }

      const cjProduct = await getCJProductById(productId)
      if (cjProduct) {
        const productData = convertCJToProduct(cjProduct)
        addProduct(productData)
        setImportedIds(prev => new Set([...prev, productId]))
        setMessage({ type: 'success', text: `Produkt "${productData.name}" erfolgreich importiert!` })
        setProductUrl("")
      } else {
        setMessage({ type: 'error', text: 'Produkt konnte nicht von CJ abgerufen werden.' })
      }
    } catch (error) {
      console.error('Import error:', error)
      setMessage({ type: 'error', text: 'Fehler beim Import. Bitte versuchen Sie es erneut.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportProduct = async (product: CJProduct) => {
    try {
      const productData = convertCJToProduct(product)
      addProduct(productData)
      
      setImportedIds(prev => new Set([...prev, product.pid]))
      setMessage({ type: 'success', text: `"${product.productNameEn}" wurde importiert!` })
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Import.' })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">CJ Dropshipping Import</h1>
          <p className="text-muted-foreground mt-1">
            Importieren Sie Produkte direkt von CJ Dropshipping
          </p>
        </div>



        {/* Message */}
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="search">Produktsuche</TabsTrigger>
            <TabsTrigger value="url">Per URL/ID</TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produkte suchen</CardTitle>
                <CardDescription>
                  Suchen Sie nach Produkten im CJ Dropshipping Katalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="z.B. pet bed, dog collar, cat toy..."
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
                    {isLoading ? <Spinner className="h-4 w-4" /> : "Suchen"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((product) => {
                  const isImported = importedIds.has(product.pid)
                  return (
                    <Card key={product.pid} className="overflow-hidden">
                      <div className="aspect-square relative bg-muted">
                        <img
                          src={product.productImage}
                          alt={product.productNameEn}
                          className="h-full w-full object-cover"
                        />
                        {isImported && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-green-500 text-white">
                              <Check className="h-3 w-3 mr-1" />
                              Importiert
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-2 min-h-[48px]">
                          {product.productNameEn}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Einkaufspreis</p>
                            <p className="font-bold text-lg">${product.sellPrice.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Empf. VK</p>
                            <p className="font-bold text-lg text-green-600">
                              {(product.sellPrice * 2.5).toFixed(2)} EUR
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a
                              href={`https://cjdropshipping.com/product-detail/${product.pid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              CJ
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            disabled={isImported}
                            onClick={() => handleImportProduct(product)}
                          >
                            {isImported ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Importiert
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                Importieren
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          {/* URL Import Tab */}
          <TabsContent value="url" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import per URL oder ID</CardTitle>
                <CardDescription>
                  Fugen Sie eine CJ Dropshipping Produkt-URL oder Produkt-ID ein
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>CJ Produkt-URL oder ID</FieldLabel>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={productUrl}
                          onChange={(e) => setProductUrl(e.target.value)}
                          placeholder="https://cjdropshipping.com/product/... oder 1234567"
                          className="pl-10"
                        />
                      </div>
                      <Button onClick={handleImportByUrl} disabled={isLoading || !productUrl.trim()}>
                        {isLoading ? <Spinner className="h-4 w-4" /> : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Importieren
                          </>
                        )}
                      </Button>
                    </div>
                  </Field>
                </FieldGroup>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Unterstutzte Formate:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• https://cjdropshipping.com/product/xxx-p-<strong>123456</strong>.html</li>
                    <li>• https://cjdropshipping.com/product-detail/<strong>123456</strong></li>
                    <li>• Direkte Produkt-ID: <strong>123456</strong></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card>
              <CardHeader>
                <CardTitle>So funktioniert der Import</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">1. Produkt finden</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suchen Sie auf CJ Dropshipping nach gewunschten Produkten
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">2. Importieren</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Kopieren Sie die URL und importieren Sie das Produkt
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">3. Anpassen</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bearbeiten Sie Name, Preis und Beschreibung nach Wunsch
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}