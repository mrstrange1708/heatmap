import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export interface HeatmapData {
    date: string;
    count: number;
}

export interface HeatmapProps {
    data: HeatmapData[];
    year?: number;
    gap?: number;
    className?: string;
    colors?: {
        0: string;
        1: string; // < 10 (or first threshold)
        2: string; // < 25 (or second threshold)
        3: string; // < 50 (or third threshold)
        4: string; // >= 50 (or max)
    };
    thresholds?: [number, number, number]; // [10, 25, 50]
    emptyColor?: string;
}

export function Heatmap({
    data,
    year = new Date().getFullYear(),
    gap = 2,
    className = "",
    colors = {
        0: "bg-gray-800/50",
        1: "bg-green-900/60",
        2: "bg-green-700/70",
        3: "bg-green-500/80",
        4: "bg-green-400",
    },
    thresholds = [10, 25, 50],
}: HeatmapProps) {
    const [hoveredCell, setHoveredCell] = useState<{
        date: string;
        count: number;
    } | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const yearDays = useMemo(() => {
        const days: Date[] = [];
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            days.push(new Date(d));
        }
        return days;
    }, [year]);

    const dataMap = useMemo(() => {
        return new Map(
            data.map((item) => [new Date(item.date).toDateString(), item.count])
        );
    }, [data]);

    const getColor = (count: number) => {
        if (count === 0) return colors[0];
        if (count < thresholds[0]) return colors[1];
        if (count < thresholds[1]) return colors[2];
        if (count < thresholds[2]) return colors[3];
        return colors[4];
    };

    const weeks = useMemo(() => {
        const weeks: (Date | null)[][] = [];
        let currentWeek: (Date | null)[] = [];

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
                weeks.push([...currentWeek]);
                currentWeek = [];
            }
        });
        return weeks;
    }, [yearDays]);

    const monthLabels = useMemo(() => {
        const labels: { month: string; weekIndex: number }[] = [];
        let lastMonth = -1;

        weeks.forEach((week, weekIndex) => {
            const firstValidDay = week.find((day) => day !== null);
            if (firstValidDay) {
                const month = firstValidDay.getMonth();
                if (month !== lastMonth) {
                    lastMonth = month;
                    // Only add label if it's not too close to the previous one, or simple logic for now
                    // For simplicity, just add them all, we can style/hide them later if needed
                    // Actually, let's keep the logic from original code loosely
                    if (weekIndex > 0 || lastMonth === 0) {
                        labels.push({
                            month: firstValidDay.toLocaleDateString("en-US", { month: "short" }),
                            weekIndex,
                        });
                    }
                }
            }
        });
        return labels;
    }, [weeks]);

    const handleMouseEnter = (
        date: Date,
        count: number,
        event: React.MouseEvent
    ) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setHoveredCell({
            date: date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            count,
        });
        setTooltipPos({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
        });
    };

    return (
        <div className={`relative w-full ${className} font-sans`}>
            <div className="text-gray-400 text-sm font-medium mb-3">{year}</div>
            <div className="flex gap-3">
                {/* Day labels */}
                <div className="flex flex-col justify-start pt-[24px]">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-xs text-gray-500 h-[11px] flex items-center mb-[2px]">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Heatmap Grid */}
                <div className="flex-1 overflow-x-auto">
                    <div className="flex mb-2 h-5 relative">
                        {monthLabels.map((label) => (
                            <div
                                key={`${label.month}-${label.weekIndex}`}
                                className="text-xs text-gray-500 absolute"
                                style={{ left: `${label.weekIndex * (11 + gap)}px` }}
                            >
                                {label.month}
                            </div>
                        ))}
                    </div>

                    <div className="flex" style={{ gap: `${gap}px` }}>
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
                                {week.map((day, dayIndex) => {
                                    if (!day) {
                                        return <div key={`empty-${weekIndex}-${dayIndex}`} className="w-[11px] h-[11px]" />;
                                    }
                                    const count = dataMap.get(day.toDateString()) || 0;
                                    const colorClass = getColor(count);

                                    return (
                                        <motion.div
                                            key={day.toISOString()}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: weekIndex * 0.003 }}
                                            className={`w-[11px] h-[11px] rounded-sm ${colorClass} hover:ring-1 hover:ring-green-400 transition-all cursor-pointer border border-gray-700/30`}
                                            onMouseEnter={(e: React.MouseEvent) => handleMouseEnter(day, count, e)}
                                            onMouseLeave={() => setHoveredCell(null)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredCell && (
                <div
                    className="fixed z-50 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl text-sm pointer-events-none"
                    style={{
                        left: tooltipPos.x,
                        top: tooltipPos.y,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <div className="text-white font-medium">{hoveredCell.date}</div>
                    <div className="text-gray-400">
                        {hoveredCell.count} activity
                    </div>
                </div>
            )}
        </div>
    );
}
