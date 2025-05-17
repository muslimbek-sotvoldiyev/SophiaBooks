"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ban, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("O'zbek");
  const [selectedTheme, setSelectedTheme] = useState("avto");

  const resetProfile = () => {
    console.log("Profile reset");
  };

  const saveProfile = () => {
    console.log("Profile saved");
  };
  const [selectedImage, setSelectedImage] = useState(null);

  // Fayl tanlanganda ishlaydigan funksiya
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Faylning to'g'ri formatda (JPG yoki PNG) va hajmi 5MB dan kichik ekanligini tekshirish
      const validFormats = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB baytlarda

      if (!validFormats.includes(file.type)) {
        alert("Faqat JPG yoki PNG formatdagi rasmlar qo'llab-quvvatlanadi!");
        return;
      }

      if (file.size > maxSize) {
        alert("Rasm hajmi 5MB dan kichik bo'lishi kerak!");
        return;
      }

      // Rasmni oldindan ko'rish uchun URL yaratish
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Profil sozlamalari</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProfile}
            className="h-8"
          >
            Filtrlarni tiklash
          </Button>
          <Button size="sm" onClick={saveProfile} className="h-8">
            Saqlash
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border rounded-md p-6">
          {/* Existing Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <div>
              <h2 className="text-lg font-medium mb-6">Asosiy</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Ism
                </label>
                <Input
                  id="name"
                  placeholder="Ism"
                  className="w-full h-10 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="familyName"
                  className="block text-sm font-medium mb-2"
                >
                  Familiya
                </label>
                <Input
                  id="familyName"
                  placeholder="Familiya"
                  className="w-full h-10 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rasm</label>
                <div className="grid grid-cols-1 md:grid-cols-2 border rounded-md overflow-hidden bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  {/* Rasm yuklash qismi */}
                  <div className="p-6 flex flex-col items-center justify-center text-center bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white border-r-2">
                    {selectedImage ? (
                      <div className="flex flex-col items-center ">
                        <Image
                          src={selectedImage}
                          alt="Selected profile image"
                          width={100}
                          height={100}
                          className="rounded-full object-fill mb-4"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedImage(null)}
                        >
                          Rasmni o'chirish
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handleImageUpload}
                          className="w-full max-w-[200px] text-sm "
                        />
                      </>
                    )}
                  </div>

                  {/* Avatar tanlash qismi */}
                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <Ban className="text-gray-600" size={20} />
                        </div>
                      </div>
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={`avatar-${i}`}
                          className="flex justify-center"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=48&width=48`}
                              alt={`Avatar option ${i + 1}`}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`avatar2-${i}`}
                          className="flex justify-center"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=48&width=48`}
                              alt={`Avatar option ${i + 8}`}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Yuklanadigan rasm formati: JPG yoki PNG. Maksimal o'lchami:
                  5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-8"></div>

          {/* Security Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
            <div>
              <h2 className="text-lg font-medium mb-6">Xavfsizlik</h2>
            </div>
            <div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">Parol</label>
                <Button
                  variant="outline"
                  className="w-full h-10 bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={() => console.log("Change password clicked")}
                >
                  Parolni o'zgartirish
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-8"></div>

          {/* Interface Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <div>
              <h2 className="text-lg font-medium mb-6">Interfeys</h2>
            </div>
            <div className="space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Til</label>
                <Button
                  variant="outline"
                  className="w-full h-10 justify-between bg-gray-100 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={() => {}}
                >
                  <span>{selectedLanguage}</span>
                  <ChevronDown size={16} />
                </Button>
              </div>

              {/* Theme Selection */}
              <div>
                <h3 className="text-xl mb-3">Mavzu</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Auto Theme */}
                  <div
                    className={`cursor-pointer rounded-lg overflow-hidden ${
                      selectedTheme === "avto" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedTheme("avto")}
                  >
                    <div className="bg-white p-4 h-[120px] flex flex-col shadow-sm">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-full rounded-md flex items-center justify-center overflow-hidden">
                          {/* Yarim oq, yarim qora effekt */}
                          <div className="w-3/4 h-3/4 flex">
                            {/* Chap yarmi (Light Mode) */}
                            <div className="w-1/2 h-full flex">
                              <div className="w-1/3 bg-gray-200 h-full"></div>
                              <div className="w-2/3 bg-white h-full flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-2 w-3/4 h-1/2">
                                  <div className="bg-gray-300 rounded-md"></div>
                                  <div className="bg-gray-300 rounded-md"></div>
                                  <div className="bg-gray-300 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                            {/* O‘ng yarmi (Dark Mode) */}
                            <div className="w-1/2 h-full flex bg-gray-800">
                              <div className="w-1/3 bg-gray-700 h-full"></div>
                              <div className="w-2/3 bg-gray-800 h-full flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-2 w-3/4 h-1/2">
                                  <div className="bg-gray-600 rounded-md"></div>
                                  <div className="bg-gray-600 rounded-md"></div>
                                  <div className="bg-gray-600 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-gray-700">Avto</div>
                    </div>
                  </div>

                  {/* Light Theme */}
                  <div
                    className={`cursor-pointer rounded-lg overflow-hidden ${
                      selectedTheme === "ochiq" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedTheme("ochiq")}
                  >
                    <div className="bg-white p-4 h-[120px] flex flex-col shadow-sm">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-full bg-white rounded-md flex items-center justify-center border border-gray-200">
                          <div className="w-3/4 h-3/4 flex">
                            <div className="w-1/3 bg-gray-100 h-full"></div>
                            <div className="w-2/3 bg-white h-full flex items-center justify-center">
                              <div className="grid grid-cols-3 gap-2 w-3/4 h-1/2">
                                <div className="bg-gray-200 rounded-md"></div>
                                <div className="bg-gray-200 rounded-md"></div>
                                <div className="bg-gray-200 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-gray-700">
                        Ochiq
                      </div>
                    </div>
                  </div>

                  {/* Dark Theme */}
                  <div
                    className={`cursor-pointer rounded-lg overflow-hidden ${
                      selectedTheme === "toq" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedTheme("toq")}
                  >
                    <div className="bg-white p-4 h-[120px] flex flex-col shadow-sm">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-800 rounded-md flex items-center justify-center">
                          <div className="w-3/4 h-3/4 flex">
                            <div className="w-1/3 bg-gray-700 h-full"></div>
                            <div className="w-2/3 bg-gray-800 h-full flex items-center justify-center">
                              <div className="grid grid-cols-3 gap-2 w-3/4 h-1/2">
                                <div className="bg-gray-600 rounded-md"></div>
                                <div className="bg-gray-600 rounded-md"></div>
                                <div className="bg-gray-600 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-gray-700">To'q</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
