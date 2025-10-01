"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"


const TransactionFilter = () => {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
          
            className="pl-10"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
       
        </div>

        {/* Date range */}
        <div className="flex items-center space-x-4">
          
        
          
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionFilter
