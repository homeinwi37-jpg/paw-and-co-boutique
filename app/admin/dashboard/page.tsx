"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  PackageCheck, 
  PackageX, 
  TrendingUp,
  Plus,
  Download,
  Settings,
  ArrowRight
} from "lucide-react"
import { getProductsFromStorage, initializeProducts, type Product } from "@/lib/products"

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeProducts()
    const loadedProducts = getProductsFromStorage()
    setProducts(loadedProducts)
    setIsLoading(false)
  }, [])

  const activeProducts = products.filter(p => p.isActive)
  const inactiveProducts = products.filter(p => !p.isActive)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const stats = [
    {
      title: "Gesamtprodukte",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Aktive Produkte",
      value: activeProducts.length,
      icon: PackageCheck,
      color: "bg-green-500",
    },
    {
      title: "Inaktive Produkte",
      value: inactiveProducts.length,
      icon: PackageX,
      color: "bg-orange-500",
    },
    {
      title: "Kategorien",
      value: new Set(products.map(p => p.category)).size,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ]

  const quickActions = [
    {
      title: "Neues Produkt",
      description: "Produkt manuell hinzufugen",
      href: "/admin/products?action=new",
      icon: Plus,
    },
    {
      title: "CJ Import",
      description: "Produkte von CJ importieren",
      href: "/admin/import",
      icon: Download,
    },
    {
      title: "Einstellungen",
      description: "Passwort und API Keys",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Willkommen in der Paw & Co. Boutique Verwaltung
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">
                      {isLoading ? "-" : stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Schnellaktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Zuletzt bearbeitet</CardTitle>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm">
                  Alle anzeigen
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-muted-foreground text-sm">Laden...</p>
              ) : recentProducts.length === 0 ? (
                <p className="text-muted-foreground text-sm">Keine Produkte vorhanden</p>
              ) : (
                <div className="space-y-3">
                  {recentProducts.map((product) => (
                    <Link key={product.id} href={`/admin/products?edit=${product.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.price.toFixed(2)} EUR
                          </p>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Download className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">GitHub Pages Hinweis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Anderungen werden lokal gespeichert. Um sie auf Ihrer Website zu veroffentlichen,
                  exportieren Sie die Produkte unter Einstellungen und laden Sie sie in Ihr GitHub Repository hoch.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
