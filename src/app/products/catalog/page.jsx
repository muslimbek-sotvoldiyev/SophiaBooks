"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ProductCatalog() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [filters, setFilters] = useState({
    store: "",
    category: "",
    brand: "",
    supplier: "",
    article: "",
    unit: "",
    priceMin: "",
    priceMax: "",
    salePriceMin: "",
    salePriceMax: "",
    wholesaleMin: "",
    wholesaleMax: "",
    isActive: "all",
  });

  const resetFilters = () => {
    setFilters({
      store: "",
      category: "",
      brand: "",
      supplier: "",
      article: "",
      unit: "",
      priceMin: "",
      priceMax: "",
      salePriceMin: "",
      salePriceMax: "",
      wholesaleMin: "",
      wholesaleMax: "",
      isActive: "all",
    });
  };

  const applyFilters = () => {
    console.log("Qo‘llangan filtrlash:", filters);
  };
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Katalog</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            Statistikani ko'rsatish
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Barchasi (2.5 k)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Faol (2.5 k)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Faol emas (0)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Kam qoldig (0)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Qolmagan tovarlar (481)
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">2 482 шт</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Artikul, shtrix-kod, nomi..."
                className="w-full pl-8"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filtrlar</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[600px] p-4 bg-black text-white rounded-md">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm">Do‘kon</label>
                    <Input
                      placeholder="Do‘konni tanlang"
                      value={filters.store}
                      onChange={(e) =>
                        setFilters({ ...filters, store: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Turkum</label>
                    <Input
                      placeholder="Turkumni kiriting"
                      value={filters.category}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Artikul</label>
                    <Input
                      placeholder="Artikulni kiriting"
                      value={filters.article}
                      onChange={(e) =>
                        setFilters({ ...filters, article: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Brend</label>
                    <Input
                      placeholder="Brendni kiriting"
                      value={filters.brand}
                      onChange={(e) =>
                        setFilters({ ...filters, brand: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Yetkazib beruvchi</label>
                    <Input
                      placeholder="Yetkazib beruvchini kiriting"
                      value={filters.supplier}
                      onChange={(e) =>
                        setFilters({ ...filters, supplier: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">O‘lchov birliklari</label>
                    <Input
                      placeholder="O‘lchov birligini tanlang"
                      value={filters.unit}
                      onChange={(e) =>
                        setFilters({ ...filters, unit: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Kirish narxi</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="dan"
                        value={filters.priceMin}
                        onChange={(e) =>
                          setFilters({ ...filters, priceMin: e.target.value })
                        }
                      />
                      <Input
                        placeholder="gacha"
                        value={filters.priceMax}
                        onChange={(e) =>
                          setFilters({ ...filters, priceMax: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Sotish narxi</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="dan"
                        value={filters.salePriceMin}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            salePriceMin: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="gacha"
                        value={filters.salePriceMax}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            salePriceMax: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Ulgurji narx</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="dan"
                        value={filters.wholesaleMin}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            wholesaleMin: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="gacha"
                        value={filters.wholesaleMax}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            wholesaleMax: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-span-3 flex justify-between items-center mt-3">
                    <div className="flex gap-4"></div>
                  </div>
                  <div className="col-span-3 flex justify-between">
                    <Button variant="secondary" onClick={resetFilters}>
                      Filtrlarni tiklash
                    </Button>
                    <Button onClick={applyFilters}>Filtrlarni qo‘llash</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span>Harakatlar</span>
            </Button>
            <Link href='/products/create'>
              <Button size="sm" className="h-8">
                Yaratish
              </Button>
            </Link>
          </div>
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
                  <TableHead>Turkum</TableHead>
                  <TableHead>Yetkazib beruvchilar</TableHead>
                  <TableHead>Soni</TableHead>
                  <TableHead>Kirish narxi</TableHead>
                  <TableHead>Sotish narxi</TableHead>
                  <TableHead>Chegirmali narx</TableHead>
                  <TableHead>Brend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded-md bg-gray-100"></div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-blue-500">
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>{product.article}</TableCell>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>{product.quantity} шт</TableCell>
                    <TableCell>{product.buyPrice} UZS</TableCell>
                    <TableCell>{product.sellPrice} UZS</TableCell>
                    <TableCell>{product.discountPrice}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination />
        </main>
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Harley quil. (Kicha. Oq)",
    article: "ESJ-47637",
    barcode: "2000000003221",
    category: "Buyumlar",
    supplier: "—",
    quantity: "50",
    buyPrice: "4 000",
    sellPrice: "8 000",
    discountPrice: "-",
    brand: "-",
  },
  {
    id: 2,
    name: "Harley quil. (Kicha. Sariq)",
    article: "SOO-44594",
    barcode: "2000000003214",
    category: "Buyumlar",
    supplier: "—",
    quantity: "50",
    buyPrice: "4 000",
    sellPrice: "8 000",
    discountPrice: "-",
    brand: "-",
  },
  {
    id: 3,
    name: "Hazrati Fotima rozialllohu anho",
    article: "Nurafshon Dunyosi",
    barcode: "9789910931088",
    category: "Diniy, Tarix",
    supplier: "—",
    quantity: "5",
    buyPrice: "68 900",
    sellPrice: "87 000",
    discountPrice: "-",
    brand: "Munis",
  },
  {
    id: 4,
    name: "Hazrati Zaynab rozialllohu anho",
    article: "Nurafshon Dunyosi",
    barcode: "9789910931062",
    category: "Diniy, Tarix",
    supplier: "—",
    quantity: "5",
    buyPrice: "68 900",
    sellPrice: "87 000",
    discountPrice: "-",
    brand: "Munis",
  },
  {
    id: 5,
    name: "Hazrati Oisha rozialllohu anho",
    article: "Nurafshon Dunyosi",
    barcode: "9789910931055",
    category: "Diniy, Tarix",
    supplier: "—",
    quantity: "4",
    buyPrice: "68 900",
    sellPrice: "87 000",
    discountPrice: "-",
    brand: "Munis",
  },
  {
    id: 6,
    name: "Hazrati Xadicha rozialllohu anho",
    article: "Nurafshon Dunyosi",
    barcode: "9789910931079",
    category: "Diniy, Tarix",
    supplier: "—",
    quantity: "5",
    buyPrice: "68 900",
    sellPrice: "87 000",
    discountPrice: "-",
    brand: "Munis",
  },
  {
    id: 7,
    name: "Hazrati Maryam alayhissalom",
    article: "Nurafshon Dunyosi",
    barcode: "9789910931048",
    category: "Diniy, Tarix",
    supplier: "—",
    quantity: "4",
    buyPrice: "68 900",
    sellPrice: "87 000",
    discountPrice: "-",
    brand: "Munis",
  },
  {
    id: 8,
    name: "Bir olma qiz bor edi",
    article: "Olimlar Shoirlar'g'li",
    barcode: "9789910977219",
    category: "Turk adabiyoti",
    supplier: "—",
    quantity: "2",
    buyPrice: "45 000",
    sellPrice: "59 000",
    discountPrice: "-",
    brand: "Nido",
  },
];
