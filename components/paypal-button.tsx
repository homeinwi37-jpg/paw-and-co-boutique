"use client"

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { toast } from "sonner"

interface PayPalButtonProps {
  amount: number
  productName: string
  items: any[]
}

export function PayPalButton({ amount, productName, items }: PayPalButtonProps) {
  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: "EUR",
    intent: "capture",
  }

  const handleSuccess = async (details: any) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: details.payer.name.given_name + ' ' + details.payer.name.surname,
          customer_email: details.payer.email_address,
          shipping_address: details.purchase_units[0].shipping.address,
          items: items,
          total_amount: amount,
          paypal_order_id: details.id
        }),
      })

      if (response.ok) {
        toast.success("Zahlung erfolgreich! Ihre Bestellung wurde gespeichert.")
      } else {
        toast.error("Fehler beim Speichern der Bestellung.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Ein technischer Fehler ist aufgetreten.")
    }
  }

  return (
    <div className="w-full mt-6">
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                description: `Purchase at Paw & Co.: ${productName}`,
                amount: { currency_code: "EUR", value: amount.toFixed(2) }
              }]
            })
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture()
              await handleSuccess(details)
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}