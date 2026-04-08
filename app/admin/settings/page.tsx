"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Lock, 
  Key, 
  Download, 
  Upload, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Github,
  ExternalLink
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { setPassword, verifyPassword } from "@/lib/auth"
import { getCJApiKey, setCJApiKey, removeCJApiKey, validateCJApiKey } from "@/lib/cj-api"
import { exportProductsAsJson, importProductsFromJson, getProductsFromStorage } from "@/lib/products"

export default function AdminSettingsPage() {
  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // API Key state
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeyMessage, setApiKeyMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isValidatingKey, setIsValidatingKey] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)

  // Export/Import state
  const [importFile, setImportFile] = useState<File | null>(null)
  const [exportMessage, setExportMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  useEffect(() => {
    const key = getCJApiKey()
    if (key) {
      setApiKey(key)
      setHasApiKey(true)
    }
  }, [])

  // Password change handler
  const handleChangePassword = async () => {
    setPasswordMessage(null)
    
    if (!verifyPassword(currentPassword)) {
      setPasswordMessage({ type: 'error', text: 'Aktuelles Passwort ist falsch' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Neues Passwort muss mindestens 6 Zeichen haben' })
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passworter stimmen nicht uberein' })
      return
    }

    setIsChangingPassword(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setPassword(newPassword)
    setPasswordMessage({ type: 'success', text: 'Passwort erfolgreich geandert!' })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsChangingPassword(false)
  }

  // API Key handler
  const handleSaveApiKey = async () => {
    setApiKeyMessage(null)
    
    if (!apiKey.trim()) {
      removeCJApiKey()
      setHasApiKey(false)
      setApiKeyMessage({ type: 'success', text: 'API-Key entfernt' })
      return
    }

    setIsValidatingKey(true)
    
    // Attempt real validation
    const isValid = await validateCJApiKey(apiKey)
    
    if (isValid) {
      setCJApiKey(apiKey)
      setHasApiKey(true)
      setApiKeyMessage({ type: 'success', text: 'API-Key erfolgreich validiert und gespeichert!' })
    } else {
      setApiKeyMessage({ type: 'error', text: 'Ungültiger API-Key. Bitte überprüfen Sie Ihre CJ-Zugangsdaten.' })
    }
    
    setIsValidatingKey(false)
  }

  // Export handler
  const handleExport = async () => {
    setIsExporting(true)
    setExportMessage(null)
    
    try {
      const jsonData = exportProductsAsJson()
      const blob = new Blob([jsonData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `paw-co-products-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setExportMessage({ type: 'success', text: 'Produkte erfolgreich exportiert!' })
    } catch {
      setExportMessage({ type: 'error', text: 'Fehler beim Export' })
    } finally {
      setIsExporting(false)
    }
  }

  // Import handler
  const handleImport = async () => {
    if (!importFile) return
    
    setIsImporting(true)
    setExportMessage(null)
    
    try {
      const text = await importFile.text()
      const success = importProductsFromJson(text)
      
      if (success) {
        setExportMessage({ type: 'success', text: 'Produkte erfolgreich importiert!' })
        setImportFile(null)
      } else {
        setExportMessage({ type: 'error', text: 'Ungultiges Dateiformat' })
      }
    } catch {
      setExportMessage({ type: 'error', text: 'Fehler beim Import' })
    } finally {
      setIsImporting(false)
    }
  }

  // Copy to clipboard
  const handleCopyJson = async () => {
    const jsonData = exportProductsAsJson()
    await navigator.clipboard.writeText(jsonData)
    setExportMessage({ type: 'success', text: 'JSON in Zwischenablage kopiert!' })
  }

  const products = getProductsFromStorage()

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold">Einstellungen</h1>
          <p className="text-muted-foreground mt-1">
            Verwalten Sie Passwort, API-Keys und Daten
          </p>
        </div>

        {/* Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Passwort andern
            </CardTitle>
            <CardDescription>
              Andern Sie Ihr Admin-Passwort fur mehr Sicherheit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {passwordMessage && (
              <Alert variant={passwordMessage.type === 'error' ? 'destructive' : 'default'}>
                {passwordMessage.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{passwordMessage.text}</AlertDescription>
              </Alert>
            )}
            
            <FieldGroup>
              <Field>
                <FieldLabel>Aktuelles Passwort</FieldLabel>
                <div className="relative">
                  <Input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Aktuelles Passwort"
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel>Neues Passwort</FieldLabel>
                <Input
                  type={showPasswords ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                />
              </Field>
              <Field>
                <FieldLabel>Passwort bestatigen</FieldLabel>
                <Input
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Neues Passwort wiederholen"
                />
              </Field>
            </FieldGroup>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPasswords ? "Verstecken" : "Anzeigen"}
              </Button>
              <Button 
                onClick={handleChangePassword}
                disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
              >
                {isChangingPassword ? <Spinner className="h-4 w-4 mr-2" /> : null}
                Passwort andern
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CJ API Key Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              CJ Dropshipping API
            </CardTitle>
            <CardDescription>
              Konfigurieren Sie Ihren CJ API-Key fur automatischen Produktimport
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiKeyMessage && (
              <Alert variant={apiKeyMessage.type === 'error' ? 'destructive' : 'default'}>
                {apiKeyMessage.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{apiKeyMessage.text}</AlertDescription>
              </Alert>
            )}

            <FieldGroup>
              <Field>
                <FieldLabel>CJ Access Token</FieldLabel>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Ihr CJ API Access Token"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </Field>
            </FieldGroup>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://developers.cjdropshipping.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  CJ Developer Portal
                </a>
              </Button>
              <Button onClick={handleSaveApiKey} disabled={isValidatingKey}>
                {isValidatingKey ? <Spinner className="h-4 w-4 mr-2" /> : null}
                Speichern
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Erstellen Sie einen kostenlosen Account auf{" "}
              <a 
                href="https://cjdropshipping.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                cjdropshipping.com
              </a>
              {" "}und generieren Sie einen API-Token im Developer Portal.
            </p>
          </CardContent>
        </Card>

        {/* Export/Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Daten Export/Import
            </CardTitle>
            <CardDescription>
              Exportieren Sie Ihre Produkte fur GitHub Pages oder importieren Sie eine Sicherung
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {exportMessage && (
              <Alert variant={exportMessage.type === 'error' ? 'destructive' : 'default'}>
                {exportMessage.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{exportMessage.text}</AlertDescription>
              </Alert>
            )}

            {/* Export */}
            <div className="space-y-3">
              <h4 className="font-medium">Produkte exportieren</h4>
              <p className="text-sm text-muted-foreground">
                Exportieren Sie alle {products.length} Produkte als JSON-Datei fur GitHub Pages
              </p>
              <div className="flex gap-2">
                <Button onClick={handleExport} disabled={isExporting}>
                  {isExporting ? <Spinner className="h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                  Als Datei herunterladen
                </Button>
                <Button variant="outline" onClick={handleCopyJson}>
                  <Copy className="h-4 w-4 mr-2" />
                  In Zwischenablage
                </Button>
              </div>
            </div>

            <Separator />

            {/* Import */}
            <div className="space-y-3">
              <h4 className="font-medium">Produkte importieren</h4>
              <p className="text-sm text-muted-foreground">
                Importieren Sie eine JSON-Datei mit Produktdaten
              </p>
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleImport} 
                  disabled={isImporting || !importFile}
                  variant="outline"
                >
                  {isImporting ? <Spinner className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                  Importieren
                </Button>
              </div>
            </div>

            <Separator />

            {/* GitHub Instructions */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Pages Anleitung
              </h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Exportieren Sie Ihre Produkte als JSON-Datei</li>
                <li>Erstellen Sie ein GitHub Repository fur Ihre Website</li>
                <li>Laden Sie die JSON-Datei in den <code className="bg-muted px-1 py-0.5 rounded">/public/data/</code> Ordner</li>
                <li>Aktivieren Sie GitHub Pages in den Repository-Einstellungen</li>
                <li>Ihre Website ist nun unter <code className="bg-muted px-1 py-0.5 rounded">username.github.io/repo</code> erreichbar</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
