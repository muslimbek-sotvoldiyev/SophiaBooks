"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Plus } from "lucide-react"

export default function VendorSelectionModal({ onSelectVendor, onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [newVendorName, setNewVendorName] = useState("")
  const [isNewVendorModalOpen, setIsNewVendorModalOpen] = useState(false)
  const [selectedVendorId, setSelectedVendorId] = useState(null)

  // Sample vendor data - you would replace this with your actual data
  const vendors = [
    { id: 1, name: "Asaxiy Books" },
    { id: 2, name: "Alifshop" },
    { id: 3, name: "Kitobxon" },
    { id: 4, name: "Akademnashr" },
    { id: 5, name: "Uzum Market" }
  ]

  const handleVendorSelect = (vendorId) => {
    setSelectedVendorId(vendorId)
  }

  const handleConfirm = () => {
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
    onSelectVendor(selectedVendor)
    onClose()
  }

  const handleAddVendor = () => {
    if (newVendorName.trim()) {
      const newVendor = {
        id: vendors.length + 1,
        name: newVendorName.trim()
      }
      // In a real app, you would save this to your database
      console.log("Adding new vendor:", newVendor)
      setNewVendorName("")
      setIsNewVendorModalOpen(false)
      onSelectVendor(newVendor)
      onClose()
    }
  }

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-gray-900 dark:text-white">Sotuvchini tanlang</DialogTitle>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
            placeholder="Sotuvchini qidirish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <RadioGroup value={selectedVendorId} onValueChange={handleVendorSelect}>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center space-x-2 border p-3 rounded-md"
              >
                <RadioGroupItem value={vendor.id} id={`vendor-${vendor.id}`} />
                <Label htmlFor={`vendor-${vendor.id}`}>{vendor.name}</Label>
              </div>
            ))}
            
            {filteredVendors.length === 0 && (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                Sotuvchi topilmadi
              </div>
            )}
          </div>
        </RadioGroup>

        <Button
          variant="outline"
          className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white justify-center"
          onClick={() => setIsNewVendorModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2 text-blue-500" />
          Yangi sotuvchini qo'shish
        </Button>
      </div>

      {isNewVendorModalOpen && (
        <div className="space-y-4 border-t pt-4 border-gray-300 dark:border-gray-700">
          <div className="space-y-2">
            <Label htmlFor="vendor-name">Sotuvchi nomi</Label>
            <Input
              id="vendor-name"
              placeholder="Sotuvchi nomini kiriting"
              value={newVendorName}
              onChange={(e) => setNewVendorName(e.target.value)}
              className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewVendorModalOpen(false)}
              className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
            >
              Bekor qilish
            </Button>
            <Button onClick={handleAddVendor}>Qo'shish</Button>
          </DialogFooter>
        </div>
      )}

      {!isNewVendorModalOpen && (
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
          >
            Bekor qilish
          </Button>
          <Button onClick={handleConfirm} disabled={selectedVendorId === null}>
            Tanlash
          </Button>
        </DialogFooter>
      )}
    </>
  )
}