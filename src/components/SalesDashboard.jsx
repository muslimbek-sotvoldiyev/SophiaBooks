"use client";
import React, { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { Download, Clock, BarChart2, TrendingUp, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

// Soatlar uchun ma'lumotlar
const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${String(i).padStart(2, "0")}:00`,
}));

// Hafta kunlari
const weekDays = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

// Oylar
const months = [
  "Yanvar",

];

// Yillar
const years = ["2020", "2021", "2022", "2023", ];

// Static data for all time periods
const staticData = {
  today: [
    {
      timeLabel: "00:00",
      savdo: 125000,
      kirim: 112500,
      chiqim: 50000,
      mijozlar: 1250,
      chegirma: 12500,
    },
    {
      timeLabel: "01:00",
      savdo: 98000,
      kirim: 88200,
      chiqim: 39200,
      mijozlar: 980,
      chegirma: 9800,
    },
    {
      timeLabel: "02:00",
      savdo: 78000,
      kirim: 70200,
      chiqim: 31200,
      mijozlar: 780,
      chegirma: 7800,
    },
    {
      timeLabel: "03:00",
      savdo: 65000,
      kirim: 58500,
      chiqim: 26000,
      mijozlar: 650,
      chegirma: 6500,
    },
    {
      timeLabel: "04:00",
      savdo: 72000,
      kirim: 64800,
      chiqim: 28800,
      mijozlar: 720,
      chegirma: 7200,
    },
    {
      timeLabel: "05:00",
      savdo: 95000,
      kirim: 85500,
      chiqim: 38000,
      mijozlar: 950,
      chegirma: 9500,
    },
    {
      timeLabel: "06:00",
      savdo: 140000,
      kirim: 126000,
      chiqim: 56000,
      mijozlar: 1400,
      chegirma: 14000,
    },
    {
      timeLabel: "07:00",
      savdo: 210000,
      kirim: 189000,
      chiqim: 84000,
      mijozlar: 2100,
      chegirma: 21000,
    },
    {
      timeLabel: "08:00",
      savdo: 350000,
      kirim: 315000,
      chiqim: 140000,
      mijozlar: 3500,
      chegirma: 35000,
    },
    {
      timeLabel: "09:00",
      savdo: 450000,
      kirim: 405000,
      chiqim: 180000,
      mijozlar: 4500,
      chegirma: 45000,
    },
    {
      timeLabel: "10:00",
      savdo: 520000,
      kirim: 468000,
      chiqim: 208000,
      mijozlar: 5200,
      chegirma: 52000,
    },
    {
      timeLabel: "11:00",
      savdo: 580000,
      kirim: 522000,
      chiqim: 232000,
      mijozlar: 5800,
      chegirma: 58000,
    },
    {
      timeLabel: "12:00",
      savdo: 610000,
      kirim: 549000,
      chiqim: 244000,
      mijozlar: 6100,
      chegirma: 61000,
    },
    {
      timeLabel: "13:00",
      savdo: 590000,
      kirim: 531000,
      chiqim: 236000,
      mijozlar: 5900,
      chegirma: 59000,
    },
    {
      timeLabel: "14:00",
      savdo: 540000,
      kirim: 486000,
      chiqim: 216000,
      mijozlar: 5400,
      chegirma: 54000,
    },
    {
      timeLabel: "15:00",
      savdo: 510000,
      kirim: 459000,
      chiqim: 204000,
      mijozlar: 5100,
      chegirma: 51000,
    },
    {
      timeLabel: "16:00",
      savdo: 480000,
      kirim: 432000,
      chiqim: 192000,
      mijozlar: 4800,
      chegirma: 48000,
    },
    {
      timeLabel: "17:00",
      savdo: 530000,
      kirim: 477000,
      chiqim: 212000,
      mijozlar: 5300,
      chegirma: 53000,
    },
    {
      timeLabel: "18:00",
      savdo: 580000,
      kirim: 522000,
      chiqim: 232000,
      mijozlar: 5800,
      chegirma: 58000,
    },
    {
      timeLabel: "19:00",
      savdo: 540000,
      kirim: 486000,
      chiqim: 216000,
      mijozlar: 5400,
      chegirma: 54000,
    },
    {
      timeLabel: "20:00",
      savdo: 480000,
      kirim: 432000,
      chiqim: 192000,
      mijozlar: 4800,
      chegirma: 48000,
    },
    {
      timeLabel: "21:00",
      savdo: 350000,
      kirim: 315000,
      chiqim: 140000,
      mijozlar: 3500,
      chegirma: 35000,
    },
    {
      timeLabel: "22:00",
      savdo: 240000,
      kirim: 216000,
      chiqim: 96000,
      mijozlar: 2400,
      chegirma: 24000,
    },
    {
      timeLabel: "23:00",
      savdo: 150000,
      kirim: 135000,
      chiqim: 60000,
      mijozlar: 1500,
      chegirma: 15000,
    },
  ],
  weekly: [
    {
      timeLabel: "Dushanba",
      savdo: 3250000,
      kirim: 2925000,
      chiqim: 1300000,
      mijozlar: 32500,
      chegirma: 325000,
    },
    {
      timeLabel: "Seshanba",
      savdo: 3450000,
      kirim: 3105000,
      chiqim: 1380000,
      mijozlar: 34500,
      chegirma: 345000,
    },
    {
      timeLabel: "Chorshanba",
      savdo: 3620000,
      kirim: 3258000,
      chiqim: 1448000,
      mijozlar: 36200,
      chegirma: 362000,
    },
    {
      timeLabel: "Payshanba",
      savdo: 3820000,
      kirim: 3438000,
      chiqim: 1528000,
      mijozlar: 38200,
      chegirma: 382000,
    },
    {
      timeLabel: "Juma",
      savdo: 4250000,
      kirim: 3825000,
      chiqim: 1700000,
      mijozlar: 42500,
      chegirma: 425000,
    },
    {
      timeLabel: "Shanba",
      savdo: 4780000,
      kirim: 4302000,
      chiqim: 1912000,
      mijozlar: 47800,
      chegirma: 478000,
    },
    {
      timeLabel: "Yakshanba",
      savdo: 3980000,
      kirim: 3582000,
      chiqim: 1592000,
      mijozlar: 39800,
      chegirma: 398000,
    },
  ],
  monthly: [
    {
      timeLabel: "Yanvar",
      savdo: 98500000,
      kirim: 88650000,
      chiqim: 39400000,
      mijozlar: 985000,
      chegirma: 9850000,
    },
    {
      timeLabel: "Fevral",
      savdo: 102000000,
      kirim: 91800000,
      chiqim: 40800000,
      mijozlar: 1020000,
      chegirma: 10200000,
    },
    {
      timeLabel: "Mart",
      savdo: 118000000,
      kirim: 106200000,
      chiqim: 47200000,
      mijozlar: 1180000,
      chegirma: 11800000,
    },
    {
      timeLabel: "Aprel",
      savdo: 125000000,
      kirim: 112500000,
      chiqim: 50000000,
      mijozlar: 1250000,
      chegirma: 12500000,
    },
    {
      timeLabel: "May",
      savdo: 130000000,
      kirim: 117000000,
      chiqim: 52000000,
      mijozlar: 1300000,
      chegirma: 13000000,
    },
    {
      timeLabel: "Iyun",
      savdo: 135000000,
      kirim: 121500000,
      chiqim: 54000000,
      mijozlar: 1350000,
      chegirma: 13500000,
    },
    {
      timeLabel: "Iyul",
      savdo: 138000000,
      kirim: 124200000,
      chiqim: 55200000,
      mijozlar: 1380000,
      chegirma: 13800000,
    },
    {
      timeLabel: "Avgust",
      savdo: 142000000,
      kirim: 127800000,
      chiqim: 56800000,
      mijozlar: 1420000,
      chegirma: 14200000,
    },
    {
      timeLabel: "Sentabr",
      savdo: 136000000,
      kirim: 122400000,
      chiqim: 54400000,
      mijozlar: 1360000,
      chegirma: 13600000,
    },
    {
      timeLabel: "Oktabr",
      savdo: 128000000,
      kirim: 115200000,
      chiqim: 51200000,
      mijozlar: 1280000,
      chegirma: 12800000,
    },
    {
      timeLabel: "Noyabr",
      savdo: 123000000,
      kirim: 110700000,
      chiqim: 49200000,
      mijozlar: 1230000,
      chegirma: 12300000,
    },
    {
      timeLabel: "Dekabr",
      savdo: 145000000,
      kirim: 130500000,
      chiqim: 58000000,
      mijozlar: 1450000,
      chegirma: 14500000,
    },
  ],
  yearly: [
    {
      timeLabel: "2020",
      savdo: 1250000000,
      kirim: 1125000000,
      chiqim: 500000000,
      mijozlar: 12500000,
      chegirma: 125000000,
    },
    {
      timeLabel: "2021",
      savdo: 1380000000,
      kirim: 1242000000,
      chiqim: 552000000,
      mijozlar: 13800000,
      chegirma: 138000000,
    },
    {
      timeLabel: "2022",
      savdo: 1520000000,
      kirim: 1368000000,
      chiqim: 608000000,
      mijozlar: 15200000,
      chegirma: 152000000,
    },
    {
      timeLabel: "2023",
      savdo: 1670000000,
      kirim: 1503000000,
      chiqim: 668000000,
      mijozlar: 16700000,
      chegirma: 167000000,
    },
    {
      timeLabel: "2024",
      savdo: 1820000000,
      kirim: 1638000000,
      chiqim: 728000000,
      mijozlar: 18200000,
      chegirma: 182000000,
    },
  ],
};

// Filter data by hour range
const filterDataByHours = (data, startHour, endHour) => {
  if (!Array.isArray(data)) return [];

  return data.filter((item) => {
    if (!item.timeLabel.includes(":")) return true;
    const hour = parseInt(item.timeLabel.split(":")[0]);
    return hour >= startHour && hour <= endHour;
  });
};

const chartTypes = [
  { id: "area", icon: TrendingUp, label: "Chiziqli" },
  { id: "bar", icon: BarChart2, label: "Ustunli" },
  { id: "line", icon: FileText, label: "Grafik" },
];

export function SalesDashboard() {
  const { theme } = useTheme();
  const [selectedRange, setSelectedRange] = useState("today");
  const [selectedMetric, setSelectedMetric] = useState("savdo");
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("area");
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedRange === "today") {
      setData(filterDataByHours(staticData.today, startHour, endHour));
    } else {
      setData(staticData[selectedRange] || []);
    }
  }, [selectedRange, startHour, endHour]);

  const metrics = [
    { value: "savdo", label: "Savdo", color: "#10B981" },
    { value: "kirim", label: "Kirim", color: "#3B82F6" },
    { value: "chiqim", label: "Chiqim", color: "#EF4444" },
    { value: "mijozlar", label: "Mijozlar", color: "#F59E0B" },
    { value: "chegirma", label: "Chegirma", color: "#8B5CF6" },
  ];

  // Raqamlarni formatlash uchun funksiya
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatValue = (value) => {
    if (selectedMetric === "mijozlar") return formatNumber(value);
    if (value >= 1000000000)
      return `${formatNumber(Math.floor(value / 1000000000))}.${Math.floor(
        (value % 1000000000) / 100000000
      )}B`;
    if (value >= 1000000)
      return `${formatNumber(Math.floor(value / 1000000))}.${Math.floor(
        (value % 1000000) / 100000
      )}M`;
    return formatNumber(value);
  };

  const getTotal = () => {
    return data.reduce((sum, item) => sum + item[selectedMetric], 0);
  };

  const renderChart = () => {
    const ChartComponent = {
      area: AreaChart,
      bar: BarChart,
      line: LineChart,
    }[chartType];

    const DataComponent = {
      area: Area,
      bar: Bar,
      line: Line,
    }[chartType];

    const currentMetric = metrics.find((m) => m.value === selectedMetric);
    const isDark = theme === "dark";

    return (
      <ChartComponent
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id={`color${selectedMetric}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={currentMetric.color}
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor={currentMetric.color}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timeLabel"
          stroke={isDark ? "#666" : "#888"}
          tick={{ fill: isDark ? "#666" : "#888" }}
          axisLine={{ stroke: isDark ? "#333" : "#ddd" }}
        />
        <YAxis
          stroke={isDark ? "#666" : "#888"}
          tick={{ fill: isDark ? "#666" : "#888" }}
          axisLine={{ stroke: isDark ? "#333" : "#ddd" }}
          tickFormatter={formatValue}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#2C2C2C" : "#fff",
            border: isDark ? "none" : "1px solid #eee",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: isDark ? "#999" : "#666" }}
          formatter={(value) => [
            `${formatValue(value)} ${
              selectedMetric === "mijozlar" ? "ta" : "so'm"
            }`,
            currentMetric.label,
          ]}
        />
        <DataComponent
          type="monotone"
          dataKey={selectedMetric}
          stroke={currentMetric.color}
          fill={
            chartType === "area"
              ? `url(#color${selectedMetric})`
              : currentMetric.color
          }
          fillOpacity={chartType === "bar" ? 0.4 : 1}
        />
      </ChartComponent>
    );
  };

  // Davr tanlovchini ko'rsatish
  const renderTimeRangeSelector = () => {
    const isDark = theme === "dark";

    if (selectedRange === "today") {
      return (
        <div
          className={`flex items-center gap-2 ${
            isDark ? "bg-[#1C1C1C]" : "bg-gray-100"
          } p-2 rounded-lg`}
        >
          <Clock
            className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
          <Select
            value={startHour.toString()}
            onValueChange={(v) => setStartHour(Number(v))}
          >
            <SelectTrigger className="w-24 border-none bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour.value} value={hour.value.toString()}>
                  {hour.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className={isDark ? "text-gray-400" : "text-gray-500"}>-</span>
          <Select
            value={endHour.toString()}
            onValueChange={(v) => setEndHour(Number(v))}
          >
            <SelectTrigger className="w-24 border-none bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour.value} value={hour.value.toString()}>
                  {hour.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  };

  // Handle hydration mismatch by not rendering until client-side
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div className="w-full min-h-[600px] p-6 rounded-lg shadow-xl transition-colors duration-300 bg-background">
      {/* Yuqori panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap flex-grow gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.value}
              className={`flex-1 min-w-[180px] p-4 rounded-lg border border-opacity-10 cursor-pointer transition-all
                ${
                  selectedMetric === metric.value
                    ? "border-opacity-50 shadow-lg scale-105"
                    : "hover:scale-102"
                }`}
              style={{ borderColor: metric.color }}
              onClick={() => setSelectedMetric(metric.value)}
            >
              <div
                className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}
              >
                {metric.label}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: metric.color }}
              >
                {formatValue(
                  data.reduce((sum, item) => sum + item[metric.value], 0)
                )}
                {metric.value === "mijozlar" ? " ta" : " so'm"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vaqt davri tanlovi */}
      <div className="mb-6">
        <Tabs
          value={selectedRange}
          onValueChange={setSelectedRange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Bugun</TabsTrigger>
            <TabsTrigger value="weekly">Haftalik</TabsTrigger>
            <TabsTrigger value="monthly">Oylik</TabsTrigger>
            <TabsTrigger value="yearly">Yillik</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Asosiy panel */}
      <div className="rounded-lg p-6 mb-6 transition-colors duration-300 bg-card">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            {chartTypes.map((type) => (
              <Button
                key={type.id}
                variant={chartType === type.id ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                onClick={() => setChartType(type.id)}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {renderTimeRangeSelector()}
          </div>
        </div>

        {/* Grafik */}
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SalesDashboard;
