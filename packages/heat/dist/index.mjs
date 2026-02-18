// src/index.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
function Heatmap({
  data,
  year = (/* @__PURE__ */ new Date()).getFullYear(),
  gap = 2,
  className = "",
  colors = {
    0: "bg-gray-800/50",
    1: "bg-green-900/60",
    2: "bg-green-700/70",
    3: "bg-green-500/80",
    4: "bg-green-400"
  },
  thresholds = [10, 25, 50]
}) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const yearDays = useMemo(() => {
    const days = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [year]);
  const dataMap = useMemo(() => {
    return new Map(
      data.map((item) => [new Date(item.date).toDateString(), item.count])
    );
  }, [data]);
  const getColor = (count) => {
    if (count === 0) return colors[0];
    if (count < thresholds[0]) return colors[1];
    if (count < thresholds[1]) return colors[2];
    if (count < thresholds[2]) return colors[3];
    return colors[4];
  };
  const weeks = useMemo(() => {
    const weeks2 = [];
    let currentWeek = [];
    if (yearDays.length === 0) return [];
    const firstDay = yearDays[0];
    const dayOfWeek = firstDay.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push(null);
    }
    yearDays.forEach((day, index) => {
      currentWeek.push(day);
      if (day.getDay() === 6 || index === yearDays.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks2.push([...currentWeek]);
        currentWeek = [];
      }
    });
    return weeks2;
  }, [yearDays]);
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find((day) => day !== null);
      if (firstValidDay) {
        const month = firstValidDay.getMonth();
        if (month !== lastMonth) {
          lastMonth = month;
          if (weekIndex > 0 || lastMonth === 0) {
            labels.push({
              month: firstValidDay.toLocaleDateString("en-US", { month: "short" }),
              weekIndex
            });
          }
        }
      }
    });
    return labels;
  }, [weeks]);
  const handleMouseEnter = (date, count, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoveredCell({
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      count
    });
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative w-full ${className} font-sans`, children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm font-medium mb-3", children: year }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start pt-[24px]", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 h-[11px] flex items-center mb-[2px]", children: day }, day)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-x-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "flex mb-2 h-5 relative", children: monthLabels.map((label) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-xs text-gray-500 absolute",
            style: { left: `${label.weekIndex * (11 + gap)}px` },
            children: label.month
          },
          `${label.month}-${label.weekIndex}`
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex", style: { gap: `${gap}px` }, children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsx("div", { className: "flex flex-col", style: { gap: `${gap}px` }, children: week.map((day, dayIndex) => {
          if (!day) {
            return /* @__PURE__ */ jsx("div", { className: "w-[11px] h-[11px]" }, `empty-${weekIndex}-${dayIndex}`);
          }
          const count = dataMap.get(day.toDateString()) || 0;
          const colorClass = getColor(count);
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: weekIndex * 3e-3 },
              className: `w-[11px] h-[11px] rounded-sm ${colorClass} hover:ring-1 hover:ring-green-400 transition-all cursor-pointer border border-gray-700/30`,
              onMouseEnter: (e) => handleMouseEnter(day, count, e),
              onMouseLeave: () => setHoveredCell(null)
            },
            day.toISOString()
          );
        }) }, weekIndex)) })
      ] })
    ] }),
    hoveredCell && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed z-50 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl text-sm pointer-events-none",
        style: {
          left: tooltipPos.x,
          top: tooltipPos.y,
          transform: "translate(-50%, -100%)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: hoveredCell.date }),
          /* @__PURE__ */ jsxs("div", { className: "text-gray-400", children: [
            hoveredCell.count,
            " activity"
          ] })
        ]
      }
    )
  ] });
}
export {
  Heatmap
};
