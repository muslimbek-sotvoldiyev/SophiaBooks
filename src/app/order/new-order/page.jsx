"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ChevronDown, Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import VendorSelectionModal from "@/components/vendor-selection-modal"

export default function ShoppingCart() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isWholesale, setIsWholesale] = useState(false)
  const [discountValue, setDiscountValue] = useState("")
  const [discountType, setDiscountType] = useState("%")
  const [clientName, setClientName] = useState("")
  const [orderNumber] = useState("#9045922400")
  const [cartItems, setCartItems] = useState([])
  const [isNoteVisible, setIsNoteVisible] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false)

  // Function to handle adding a discount
  const handleDiscountClick = (value) => {
    setDiscountValue(value)
  }

  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor)
    setIsVendorDialogOpen(false)
  }

  // Discount qiymatlari ro'yxati
  const percentDiscounts = ["15%", "30%", "50%", "75%"]
  const uzsDiscounts = ["50K", "100K", "150K", "200K"]

  // Joriy discount turi bo'yicha qiymatlarni tanlash
  const currentDiscounts = discountType === "%" ? percentDiscounts : uzsDiscounts

  // Sample cart items (empty for now)
  const sampleCartItems = []

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Корзина</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-xl font-bold text-muted-foreground">{orderNumber}</div>
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Savat elementlari (0)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 ${isWholesale ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setIsWholesale(!isWholesale)}
                >
                  Ulgurji narxlar
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Artikul, shtrix-kod, nomi..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  {selectedVendor ? selectedVendor.name : "Barcha sotuvlar"}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <VendorSelectionModal
                  onClose={() => setIsVendorDialogOpen(false)}
                  onSelectVendor={handleSelectVendor}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {cartItems.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Rasm</TableHead>
                    <TableHead>Tovar nomi</TableHead>
                    <TableHead>Artikul</TableHead>
                    <TableHead>Shtrix-kod</TableHead>
                    <TableHead>Miqdori</TableHead>
                    <TableHead>Narxi</TableHead>
                    <TableHead>Jami</TableHead>
                    <TableHead>Harakatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* Cart items would go here */}</TableBody>
              </Table>
            </div>
          ) : (
            <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center h-[400px]">
              <h2 className="text-xl font-semibold mb-2">Savatcha hozircha bo'm-bo'sh</h2>
              <p className="text-muted-foreground text-center">
                Tovarni qidirish uchun "/" belgini bosing yoki tovarni skaner qiling
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm">Savatchada harakatlanish</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <span className="transform rotate-90">↑</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <span className="transform rotate-90">↓</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Miqdor o'zgarishi</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                →
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                ←
              </Button>
            </div>
          </div>
        </main>

        {/* Right sidebar */}
        <div className="w-80 border-l p-4 flex flex-col">
          {/* Client section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span>Mijoz</span>
                <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">J</div>
              </div>
              <Button variant="link" className="text-primary p-0">
                Yaratish
              </Button>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Mijoz ismi yoki telefon raqami"
                className="pl-10"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Discount section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span>Chegirma</span>
                <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">K</div>
              </div>
              <Button variant="link" className="text-primary p-0">
                Kodni kiritish
              </Button>
            </div>
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Chegirmani kiriting"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
              <Button
                variant="outline"
                className="min-w-[50px]"
                onClick={() => setDiscountType(discountType === "%" ? "UZS" : "%")}
              >
                {discountType}
              </Button>
            </div>
            <div className="flex gap-2">
              {currentDiscounts.map((discount) => (
                <Button
                  key={discount}
                  variant="outline"
                  className={`flex-1 ${discountValue === discount ? "bg-muted" : ""}`}
                  onClick={() => handleDiscountClick(discount)}
                >
                  {discount}
                </Button>
              ))}
            </div>
          </div>

          {/* Add note button */}
          <div>
            <Button
              variant="outline"
              className="mb-6 flex items-center justify-center gap-2 w-full"
              onClick={() => setIsNoteVisible(!isNoteVisible)}
            >
              <Plus className="h-4 w-4 text-primary" />
              Eslatma qo'shish
            </Button>

            {isNoteVisible && (
              <Textarea
                placeholder="Eslatmani shu yerga kiriting"
                className="mb-6"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
            )}
          </div>

          {/* Totals section */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Oraliq jami</span>
              <span className="font-semibold">0 UZS</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Chegirma</span>
              <span className="font-semibold">0 UZS</span>
            </div>
            <Button
              variant="secondary"
              className="w-full py-6 mb-4 flex items-center justify-between"
              disabled={cartItems.length === 0}
            >
              <div className="flex items-center">
                <span>To'lash</span>
                <div className="ml-2 bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">L</div>
              </div>
              <span>0 UZS</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>Kechiktirish</span>
              <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">O</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

