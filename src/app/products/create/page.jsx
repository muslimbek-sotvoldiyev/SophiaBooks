"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { NumberInput } from "@/components/NumberInput";
import { ChevronLeft, ChevronRight, Plus, Search, Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

export default function CreateProduct() {
  const [productType, setProductType] = useState("product");
  const [productCharacteristic, setProductCharacteristic] = useState("simple");
  const [article, setArticle] = useState("");
  const [barcode, setBarcode] = useState("");
  const [image, setImage] = useState(null); // Initialized as null for clarity
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { theme } = useTheme(); // Get the current theme from next-themes

  const Editor = dynamic(
    () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
    {
      ssr: false,
    }
  );

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const generateRandomArticle = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from(
      { length: 3 },
      () => letters[Math.floor(Math.random() * letters.length)]
    ).join("");
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    setArticle(`${randomLetters}-${randomNumbers}`);
  };

  const generateRandomBarcode = () => {
    const randomBarcode = Math.floor(
      2000000000000 + Math.random() * 7999999999999
    );
    setBarcode(randomBarcode.toString());
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      console.log("Adding new category:", newCategoryName);
      setNewCategoryName("");
      setIsNewCategoryOpen(false);
    }
  };

  const editorRef = useRef(null);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0C0A09] dark:text-white">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-4 dark:border-gray-800 dark:bg-[#0C0A09]">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Yangi mahsulot</h1>
        </div>
        <Button variant="default" size="sm">
          Yaratish
        </Button>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Mahsulot turi</h2>
              <RadioGroup
                defaultValue="product"
                className="flex gap-4"
                onValueChange={setProductType}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product" id="product" />
                  <Label htmlFor="product">Mahsulot</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service" id="service" />
                  <Label htmlFor="service">Xizmat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="installation" id="installation" />
                  <Label htmlFor="installation">O'rnatish</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Mahsulotning o'zgaruvchanligi
              </h2>
              <RadioGroup
                defaultValue="simple"
                className="flex gap-4"
                onValueChange={setProductCharacteristic}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="simple" id="simple" />
                  <Label htmlFor="simple">Oddiy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="variable" id="variable" />
                  <Label htmlFor="variable">O'zgaruvchan</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nomi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nomini yozing"
                  className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="article">
                    Artikul <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="article"
                      placeholder="Artikulni kiriting"
                      value={article}
                      onChange={(e) => setArticle(e.target.value)} // Added for manual input
                      className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={generateRandomArticle}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">
                    Shtrix-kod <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      placeholder="Shtrix-kodni kiriting"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)} // Added for manual input
                      className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={generateRandomBarcode}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">O'lchov birliklari</Label>
                <Select>
                  <SelectTrigger className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Shtuka" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piece">Shtuka</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Rasm</Label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={handleUploadClick}
                >
                  {image ? (
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Yuklangan rasm"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Plus className="mx-auto h-8 w-8 text-gray-600 dark:text-gray-400" />
                      <span className="mt-2 block text-sm text-gray-600 dark:text-gray-400">
                        Rasmni yuklash uchun bosing
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Narxlar</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="entry-price">
                    Kirish narxi <span className="text-red-500">*</span>
                  </Label>
                  <NumberInput
                    id="entry-price"
                    placeholder="0"
                    className="bg-background border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    suffix="UZS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-fee">Qo'shimcha haq</Label>
                  <NumberInput
                    id="additional-fee"
                    placeholder="0"
                    className="bg-background border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    suffix="%"
                    max={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selling-price">
                    Sotish narxi <span className="text-red-500">*</span>
                  </Label>
                  <NumberInput
                    id="selling-price"
                    placeholder="0"
                    className="bg-background border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    suffix="UZS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wholesale-price">Ulgurji narx</Label>
                  <NumberInput
                    id="wholesale-price"
                    placeholder="0"
                    className="bg-background border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    suffix="UZS"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Tovar soni</h2>
              <div className="rounded-md border border-gray-400">
                <div className="grid grid-cols-3 gap-4 border-b border-gray-800 p-4">
                  <div className="text-sm font-medium text-black dark:text-white">Do'kon</div>
                  <div className="text-sm font-medium text-black dark:text-white">
                    Soni <span className="text-red-500">*</span>
                  </div>
                  <div className="text-sm font-medium text-black dark:text-white">
                    Kam qoldiq
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-black dark:text-white">Bayon kitoblari</div>
                    </div>
                    <NumberInput
                      id="quantity"
                      placeholder="0"
                      className="border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      suffix="sht"
                    />
                    <NumberInput
                      id="low-stock"
                      placeholder="0"
                      className="border-gray-400 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      suffix="sht"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Xususiyatlar</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brend</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Brendni kiritng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand1">Brand 1</SelectItem>
                      <SelectItem value="brand2">Brand 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Yetkazib beruvchi</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Yetkazib beruvchini kiritng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier1">Supplier 1</SelectItem>
                      <SelectItem value="supplier2">Supplier 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-400 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Ixtiyoriy xususiyat</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-200 dark:bg-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Xususiyat qo'shish
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mahsulotingizni tavsiflovchi qo'shimcha maydon
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Kategoriya</h3>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="pl-10 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                    placeholder="toifa nomi"
                  />
                </div>

                <Dialog
                  open={isNewCategoryOpen}
                  onOpenChange={setIsNewCategoryOpen}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white justify-center"
                    onClick={() => setIsNewCategoryOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2 text-blue-500" />
                    Yangi kategoriyani qo'shish
                  </Button>
                  <DialogContent className="bg-white dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-white">
                        Yangi kategoriya qo'shish
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="category-name">Kategoriya nomi</Label>
                        <Input
                          id="category-name"
                          placeholder="Kategoriya nomini kiriting"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsNewCategoryOpen(false)}
                        className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                      >
                        Bekor qilish
                      </Button>
                      <Button onClick={handleAddCategory}>Qo'shish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="space-y-2">
                  {[
                    "Shaxsiy rivojlanish",
                    "Jahon adabiyoti",
                    "Oila munosabatlari",
                    "Farzand tarbiyasi",
                    "Diniy",
                  ].map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 rounded-md p-3"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          id={category}
                          className="mr-3 border-gray-400 dark:border-gray-600"
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-200 dark:bg-gray-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-900 dark:bg-gray-900 text-white"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-200 dark:bg-gray-800"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-200 dark:bg-gray-800"
                    >
                      3
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-200 dark:bg-gray-800"
                    >
                      4
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-gray-200 dark:bg-gray-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select defaultValue="5">
                    <SelectTrigger className="w-40 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Qatorlar soni 5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Qatorlar soni 5</SelectItem>
                      <SelectItem value="10">Qatorlar soni 10</SelectItem>
                      <SelectItem value="20">Qatorlar soni 20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6 mx-auto max-w-3xl mt-20">
              <h2 className="text-xl font-semibold">Tavsif</h2>
              <div className="space-y-2">
                <Label htmlFor="description">Mahsulot haqida</Label>
                <div className="rounded-md border border-gray-400 dark:border-gray-700 bg-background dark:bg-gray-800">
                  <Editor
                    apiKey="zm33wgsb0qs4gi1zpbbgq0ewbwk993wx7qj9gtr81mgjlel3"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      width: "100%",
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide", // Dynamically set based on theme
                      content_css: theme === "dark" ? "dark" : "default", // Dynamically set based on theme
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}