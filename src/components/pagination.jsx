import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          2
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          3
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          4
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          5
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          89
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8">
          Yuklash olish
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          Qatorlar soni 10
        </Button>
      </div>
    </div>
  )
}

