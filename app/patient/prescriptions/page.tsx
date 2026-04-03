"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconPill, IconShoppingBag, IconTruckDelivery } from "@tabler/icons-react"

export default function PatientPrescriptionsPage() {
  const prescriptions = [
    {
      name: "Amoxicillin 500mg",
      dosage: "1 tablet · 3x daily · Take with food",
      supply: "15 days remaining",
      status: "Active",
      instructions: "Finish the full course even if you feel better.",
      retailers: [
        {
          name: "PharmaPlus",
          price: "$24.00",
          shipping: "Standard (2-3 days)",
          availability: "In Stock",
          perks: ["Free pill organizer", "8% cashback"],
        },
        {
          name: "MediMart",
          price: "$22.50",
          shipping: "Express (next day)",
          availability: "Low Stock",
          perks: ["Same-day pickup", "Pharmacist chat"],
        },
      ],
    },
    {
      name: "Vitamin D3 2000 IU",
      dosage: "1 capsule · Daily · Morning",
      supply: "25 days remaining",
      status: "Active",
      instructions: "Take after a meal that contains healthy fats.",
      retailers: [
        {
          name: "WellnessHub",
          price: "$18.00",
          shipping: "Subscription (ships monthly)",
          availability: "In Stock",
          perks: ["Bundle savings", "Automatic refills"],
        },
        {
          name: "CareRx",
          price: "$19.25",
          shipping: "Standard (3-5 days)",
          availability: "In Stock",
          perks: ["Free delivery", "Store rewards"],
        },
      ],
    },
    {
      name: "Ibuprofen 200mg",
      dosage: "1 tablet · As needed · Max 6 tablets/day",
      supply: "10 tablets remaining",
      status: "Low Stock",
      instructions: "Take with a full glass of water to avoid stomach upset.",
      retailers: [
        {
          name: "QuickMeds",
          price: "$12.50",
          shipping: "2-hour courier",
          availability: "In Stock",
          perks: ["Pain patch sample", "Track delivery"],
        },
        {
          name: "Neighborhood Pharmacy",
          price: "$11.75",
          shipping: "Pickup only",
          availability: "Ready in 45 min",
          perks: ["Consult pharmacist", "Local rewards"],
        },
      ],
    },
  ]

  return (
    <div className="pt-2">
      <p className="text-sm text-muted-foreground mb-3">
        Compare retailers, delivery speeds, and perks before you place your next refill.
      </p>

      <Card className="pt-4">
        <CardHeader className="gap-2 pb-3">
          <CardTitle>Active Prescriptions</CardTitle>
          <CardDescription>Choose where to fulfill each prescription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {prescriptions.map((med) => (
            <div key={med.name} className="rounded-xl border bg-muted/30 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <IconPill className="size-4 text-primary" />
                    <p className="font-medium">{med.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                  <p className="text-xs text-muted-foreground">{med.supply}</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground md:text-right">
                  <p>{med.instructions}</p>
                  <Badge
                    variant={med.status === "Low Stock" ? "destructive" : "default"}
                    className="md:self-end"
                  >
                    {med.status}
                  </Badge>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 md:grid-cols-2">
                {med.retailers.map((retailer) => (
                  <div key={`${med.name}-${retailer.name}`} className="flex flex-col gap-4 rounded-lg border bg-background p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{retailer.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconTruckDelivery className="size-4" />
                          <span>{retailer.shipping}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">{retailer.price}</p>
                        <p className="text-xs text-muted-foreground">30-day supply</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {retailer.perks.map((perk) => (
                        <Badge key={perk} variant="secondary">
                          {perk}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={retailer.availability === "Low Stock" ? "secondary" : "outline"}>
                        {retailer.availability}
                      </Badge>
                      <Button size="sm">
                        <IconShoppingBag className="mr-2 size-4" />
                        Buy from {retailer.name.split(" ")[0]}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
