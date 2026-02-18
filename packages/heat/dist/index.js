"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  Heatmap: () => Heatmap,
  themes: () => themes
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_jsx_runtime = require("react/jsx-runtime");
var themes = {
  green: {
    0: "bg-gray-800/50",
    1: "bg-green-900/60",
    2: "bg-green-700/70",
    3: "bg-green-500/80",
    4: "bg-green-400"
  },
  blue: {
    0: "bg-gray-800/50",
    1: "bg-blue-900/60",
    2: "bg-blue-700/70",
    3: "bg-blue-500/80",
    4: "bg-blue-400"
  },
  fire: {
    0: "bg-gray-800/50",
    1: "bg-orange-900/60",
    2: "bg-orange-700/70",
    3: "bg-orange-500/80",
    4: "bg-red-500"
  }
};
function Heatmap({
  data,
  year = (/* @__PURE__ */ new Date()).getFullYear(),
  gap = 2,
  className = "",
  theme = "green",
  colors,
  thresholds = [10, 25, 50]
}) {
  const [hoveredCell, setHoveredCell] = (0, import_react.useState)(null);
  const [tooltipPos, setTooltipPos] = (0, import_react.useState)({ x: 0, y: 0 });
  const activeColors = colors || themes[theme] || themes.green;
  const yearDays = (0, import_react.useMemo)(() => {
    const days = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [year]);
  const dataMap = (0, import_react.useMemo)(() => {
    return new Map(
      data.map((item) => [new Date(item.date).toDateString(), item.count])
    );
  }, [data]);
  const getColor = (count) => {
    if (count === 0) return activeColors[0];
    if (count < thresholds[0]) return activeColors[1];
    if (count < thresholds[1]) return activeColors[2];
    if (count < thresholds[2]) return activeColors[3];
    return activeColors[4];
  };
  const weeks = (0, import_react.useMemo)(() => {
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
  const monthLabels = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `relative w-full ${className} font-sans`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-gray-400 text-sm font-medium mb-3", children: year }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col justify-start pt-[24px]", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-gray-500 h-[11px] flex items-center mb-[2px]", children: day }, day)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 overflow-x-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex mb-2 h-5 relative", children: monthLabels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "text-xs text-gray-500 absolute",
            style: { left: `${label.weekIndex * (11 + gap)}px` },
            children: label.month
          },
          `${label.month}-${label.weekIndex}`
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex", style: { gap: `${gap}px` }, children: weeks.map((week, weekIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col", style: { gap: `${gap}px` }, children: week.map((day, dayIndex) => {
          if (!day) {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[11px] h-[11px]" }, `empty-${weekIndex}-${dayIndex}`);
          }
          const count = dataMap.get(day.toDateString()) || 0;
          const colorClass = getColor(count);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
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
    hoveredCell && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "fixed z-50 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl text-sm pointer-events-none",
        style: {
          left: tooltipPos.x,
          top: tooltipPos.y,
          transform: "translate(-50%, -100%)"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-white font-medium", children: hoveredCell.date }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-gray-400", children: [
            hoveredCell.count,
            " activity"
          ] })
        ]
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Heatmap,
  themes
});
