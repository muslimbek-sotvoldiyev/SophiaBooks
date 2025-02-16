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
import {
  Download,
  Clock,
  Calendar,
  BarChart2,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Soatlar uchun ma'lumotlar
const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${String(i).padStart(2, "0")}:00`,
}));

// Vaqt oraliqlarini generatsiya qilish
const generateTimeData = (type, startHour, endHour) => {
  const filterByHours = (data) => {
    return data.filter((item) => {
      const hour = parseInt(item.hour.split(":")[0]);
      return hour >= startHour && hour <= endHour;
    });
  };

  let data = [];
  switch (type) {
    case "today":
    case "yesterday":
      data = Array.from({ length: 24 }, (_, i) => {
        const baseValue = Math.sin(i / 3) * 400000 + 200000;
        const randomFactor = 0.8 + Math.random() * 0.4;
        return {
          hour: `${String(i).padStart(2, "0")}:00`,
          savdo: Math.round(baseValue * randomFactor),
          kirim: Math.round(baseValue * randomFactor * 0.9),
          chiqim: Math.round(baseValue * randomFactor * 0.4),
          mijozlar: Math.round(baseValue * randomFactor * 0.01),
          chegirma: Math.round(baseValue * randomFactor * 0.1),
        };
      });
      return filterByHours(data);
    // ... boshqa case'lar uchun kodlar
    default:
      return [];
  }
};

const chartTypes = [
  { id: "area", icon: TrendingUp, label: "Chiziqli" },
  { id: "bar", icon: BarChart2, label: "Ustunli" },
  { id: "line", icon: FileText, label: "Grafik" },
];

export function DarkSalesDashboard() {
  const [selectedRange, setSelectedRange] = useState("today");
  const [selectedMetric, setSelectedMetric] = useState("savdo");
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("area");

  useEffect(() => {
    setData(generateTimeData(selectedRange, startHour, endHour));
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
          dataKey="hour"
          stroke="#666"
          tick={{ fill: "#666" }}
          axisLine={{ stroke: "#333" }}
        />
        <YAxis
          stroke="#666"
          tick={{ fill: "#666" }}
          axisLine={{ stroke: "#333" }}
          tickFormatter={formatValue}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#2C2C2C",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "#999" }}
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

  return (
    <div className="w-full min-h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-6 rounded-lg shadow-xl">
      {/* Yuqori panel */}
      <div className="flex flex-wrap gap-4 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.value}
            className={`flex-1 min-w-[200px] p-4 rounded-lg bg-[#2C2C2C] border border-opacity-10 cursor-pointer transition-all
              ${
                selectedMetric === metric.value
                  ? "border-opacity-50 shadow-lg scale-105"
                  : "hover:scale-102"
              }`}
            style={{ borderColor: metric.color }}
            onClick={() => setSelectedMetric(metric.value)}
          >
            <div className="text-gray-400 mb-2">{metric.label}</div>
            <div className="text-2xl font-bold" style={{ color: metric.color }}>
              {formatValue(
                data.reduce((sum, item) => sum + item[metric.value], 0)
              )}
              {metric.value === "mijozlar" ? " ta" : " so'm"}
            </div>
          </div>
        ))}
      </div>

      {/* Asosiy panel */}
      <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Vaqt tanlov */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 bg-[#1C1C1C] p-2 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400" />
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
            <span className="text-gray-400">-</span>
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

export default DarkSalesDashboard;
