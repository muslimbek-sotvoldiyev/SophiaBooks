"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export function NumberInput({
  id,
  placeholder,
  className,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  suffix,
}) {
  const [value, setValue] = useState(min)

  const handleChange = (newValue) => {
    if (newValue >= min && newValue <= max) {
      setValue(newValue)
      onChange && onChange(newValue)
    }
  }

  return (
    <div className="relative flex items-center border rounded-lg overflow-hidden bg-gray-100  dark:bg-gray-800 px-4 py-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleChange(value - step)}
        className="absolute left-2 p-2"
      >
        <Minus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </Button>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        placeholder={placeholder}
        className={`text-center py-2 px-12 border-none focus:ring-0 text-lg bg-white dark:bg-gray-900 ${className}`}
        min={min}
        max={max}
        step={step}
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleChange(value + step)}
        className="absolute right-2 p-2"
      >
        <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </Button>
      {suffix && <span className="absolute right-12 text-sm text-gray-500 dark:text-gray-400">{suffix}</span>}
    </div>
  )
}
