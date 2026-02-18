import * as react_jsx_runtime from 'react/jsx-runtime';

interface HeatmapData {
    date: string;
    count: number;
}
interface HeatmapProps {
    data: HeatmapData[];
    year?: number;
    gap?: number;
    className?: string;
    colors?: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
    };
    thresholds?: [number, number, number];
    emptyColor?: string;
}
declare function Heatmap({ data, year, gap, className, colors, thresholds, }: HeatmapProps): react_jsx_runtime.JSX.Element;

export { Heatmap, type HeatmapData, type HeatmapProps };
