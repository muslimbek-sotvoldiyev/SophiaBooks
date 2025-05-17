import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          2
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          3
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">10 ta elementdan 1-10</span>
      </div>
    </div>
  )
}

