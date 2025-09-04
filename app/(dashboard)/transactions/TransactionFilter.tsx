"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAtom } from "jotai"
import { Filter, Search } from "lucide-react"
import {
  categoriesAtom,
  isThisMonthActiveAtom,
  isTodayActiveAtom,
  searchTermAtom,
  selectedCategoryAtom,
} from "../../store/atom"
import { useEffect } from "react"
import { getAllCategories } from "../../api/transaction"
import { categoriesSchema } from "../../api/transaction/schema"

const TransactionFilter = () => {
  const [categories, setCategories] = useAtom(categoriesAtom)
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom)
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)
  const [isThisMonthActive, setIsThisMonthActive] = useAtom(
    isThisMonthActiveAtom
  )
  const [isTodayActive, setIsTodayActive] = useAtom(isTodayActiveAtom)

  useEffect(() => {
      const fetchData = () => {
        const validatedCategories = getAllCategories.map((transaction) =>
          categoriesSchema.parse(transaction)
        )
        setCategories(validatedCategories)
      }
  
      fetchData()
    }, [setCategories])

  const handleToday = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsTodayActive((prev: any) => !prev)
    if (isThisMonthActive) {
      setIsThisMonthActive(false)
    }
  }

  const handleThisMonth = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsThisMonthActive((prev: any) => !prev)
    if (isTodayActive) {
      setIsTodayActive(false)
    }
  }

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Date range */}
        <div className="flex items-center space-x-4">
          {/* to do calendar range picker */}
          {/* <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button> */}
          <Button
            variant={isThisMonthActive ? "default" : "outline"}
            size="sm"
            onClick={handleThisMonth}
          >
            This Month
          </Button>
          <Button
            variant={isTodayActive ? "default" : "outline"}
            size="sm"
            onClick={handleToday}
          >
            Today
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionFilter
