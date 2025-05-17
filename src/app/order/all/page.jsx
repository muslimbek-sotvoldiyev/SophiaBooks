"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  CalendarIcon,
  ArrowRight,
  Download,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// Sample transaction data
const transactionData = [
  {
    id: "7896580329",
    date: "07.03.2025",
    time: "14:20:16",
    amount: 54000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 2,
  },
  {
    id: "8655961342",
    date: "07.03.2025",
    time: "14:11:01",
    amount: 115000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 2,
  },
  {
    id: "9605686887",
    date: "07.03.2025",
    time: "13:59:52",
    amount: 169000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 3,
  },
  {
    id: "7775512451",
    date: "07.03.2025",
    time: "13:40:49",
    amount: 735000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 1,
  },
  {
    id: "5499029619",
    date: "07.03.2025",
    time: "13:38:01",
    amount: 52000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 4,
  },
  {
    id: "5082125513",
    date: "07.03.2025",
    time: "13:36:50",
    amount: 34000,
    store: "Bayon kitoblari",
    type: "Almashtirlsh",
    dona: 4,
    isNegative: true,
  },
  {
    id: "9789411420",
    date: "07.03.2025",
    time: "12:31:42",
    amount: 30000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 1,
  },
  {
    id: "1115970493",
    date: "07.03.2025",
    time: "12:30:56",
    amount: 40000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 1,
  },
  {
    id: "5082125513",
    date: "07.03.2025",
    time: "12:24:02",
    amount: 79000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 1,
  },
  {
    id: "6670728054",
    date: "07.03.2025",
    time: "12:22:37",
    amount: 33000,
    store: "Bayon kitoblari",
    type: "Sotuv",
    dona: 2,
  },
];

export default function SalesManagement() {
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [transactions, setTransactions] = useState(transactionData);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate total amount
  useEffect(() => {
    const total = transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
    setTotalAmount(total);
  }, [transactions]);

  // Handle pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle date change
  const handleDateChange = (newDate) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  // Handle filter click
  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  // Apply filter
  const applyFilter = () => {
    setIsFilterApplied(true);
    setIsFilterModalOpen(false);
  };

  // Reset filter
  const resetFilter = () => {
    setIsFilterApplied(false);
    setIsFilterModalOpen(false);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Barcha sotuvlar</span>
          <div className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-sm">25</div>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
            <span>Bugun</span>
            <span className="text-muted-foreground">{format(date, "dd.MM.yyyy")}</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Barchasi (25)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Sotuvlar (24)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Almashtirishlar (1)
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Qaytarishlar (0)
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">25 dona</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ID, tranzaksiyalar, mijoz, foydalanuvchi"
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{format(date, "dd.MM.yyyy")}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleFilterClick}>
              <Filter className="h-3.5 w-3.5" />
              <span>Filtrlar</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Tranzaksiya</TableHead>
                  <TableHead>Sana</TableHead>
                  <TableHead>Tur</TableHead>
                  <TableHead>Do'kon</TableHead>
                  <TableHead>Miqdor</TableHead>
                  <TableHead className="text-right">Summa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={`${transaction.id}-${transaction.time}`}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">#{transaction.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>{transaction.date}</div>
                      <div className="text-sm text-muted-foreground">{transaction.time}</div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.isNegative
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {transaction.type}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.store}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                            transaction.isNegative
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {transaction.dona}
                        </div>
                        <span>dona</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.amount)} UZS</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="icon"
                  className={`h-8 w-8 ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {itemsPerPage} ta elementdan {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, transactions.length)}
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number.parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Qatorlar soni" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 ta qator</SelectItem>
                  <SelectItem value="10">10 ta qator</SelectItem>
                  <SelectItem value="20">20 ta qator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </main>

        {/* Right sidebar - Statistics */}
        <div className="w-80 border-l border-border p-4 flex flex-col">
          <Button className="mb-4 w-full">
            Hisobotni chop etish <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Tranzaksiyalar</span>
                <span className="text-primary">25</span>
                <span className="text-muted-foreground">dona</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="border-b border-dotted pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Tovarlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">124</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Xizmatlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">To'plamlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Sertifikatlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Qaytarib olishlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Qaytarib olishlar summasi</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Almashtirishlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">1</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Almashtirishlar summasi</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">34 000</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-dotted pb-4">
              <div className="flex items-center justify-between mb-2">
                <span>Tranzaksiyalar summasi</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-primary text-xl">4 094 000 UZS</div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Karta</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">40 000</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Naqdsiz</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">4 054 000</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-dotted pb-4">
              <div className="flex items-center justify-between mb-2">
                <span>Mijoz balansi</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-primary">0 UZS</div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Hisoblanganlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Sarflanganlar</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-dotted pb-4">
              <div className="flex items-center justify-between mb-2">
                <span>Sovg'a sertifikatlari</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-primary">0 dona</div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Sotish</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">dona</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Sotish miqdori</div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">0</span>
                    <span className="text-muted-foreground">UZS</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Qarzni to'lash</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-primary">0 UZS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Filtrlar</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm">Do'kon</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Do'konni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha do'konlar</SelectItem>
                    <SelectItem value="bayon">Bayon kitoblari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm">Chek summasi</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input placeholder="dan" />
                  <Input placeholder="gacha" />
                </div>
              </div>

              <div>
                <label className="text-sm">Sotuvchi</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Sotuvchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha sotuvchilar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm">Kassa</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Kassani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha kassalar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm">To'lov turi</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="To'lov turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha to'lov turlari</SelectItem>
                    <SelectItem value="cash">Naqd</SelectItem>
                    <SelectItem value="card">Karta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm">Kassir</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Kassirni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha kassirlar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm">Kassir almashinuvi</label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Выберите кассовую смену" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha smenalar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetFilter}>
              Filtrlarni tiklash
            </Button>
            <Button onClick={applyFilter}>Qo'llash</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}