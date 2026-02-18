import * as react_jsx_runtime from 'react/jsx-runtime';

interface HeatmapData {
    date: string;
    count: number;
}
type HeatmapTheme = {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
};
declare const themes: Record<"green" | "blue" | "fire", HeatmapTheme>;
interface HeatmapProps {
    data: HeatmapData[];
    year?: number;
    gap?: number;
    className?: string;
    theme?: "green" | "blue" | "fire";
    colors?: HeatmapTheme;
    thresholds?: [number, number, number];
    emptyColor?: string;
}
declare function Heatmap({ data, year, gap, className, theme, colors, thresholds, }: HeatmapProps): react_jsx_runtime.JSX.Element;

export { Heatmap, type HeatmapData, type HeatmapProps, type HeatmapTheme, themes };
