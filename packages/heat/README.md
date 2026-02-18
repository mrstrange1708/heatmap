# @mrstrange1708/heat-map

A beautiful, customizable heatmap calendar component for React, built with Tailwind CSS and Framer Motion. Visualizes activity data in a contribution graph style, similar to GitHub's contribution chart.

## Features

- 📅 **Annual View**: Displays a full year of activity data.
- 🎨 **Customizable Colors**: Fully configurable color scales using Tailwind CSS classes.
- 🔧 **Flexible Configuration**: Adjust thresholds, gaps, and styles.
- ✨ **Animations**: Smooth entry animations powered by Framer Motion.
- 📱 **Responsive**: Built with responsive design in mind (scrollable horizontal container).

## Installation

```bash
npm install @mrstrange1708/heat-map
# or
yarn add @mrstrange1708/heat-map
# or
pnpm add @mrstrange1708/heat-map
```

## Peer Dependencies

This package requires the following peer dependencies:

- `react` (>=18)
- `react-dom` (>=18)
- `framer-motion`
- `tailwindcss` (Ensure your project has Tailwind CSS configured)

## Usage

```tsx
import React from 'react';
import { Heatmap } from '@mrstrange1708/heat-map';

const data = [
  { date: '2024-01-01', count: 2 },
  { date: '2024-01-02', count: 12 },
  { date: '2024-01-03', count: 5 },
  // ... more data
];

export default function App() {
  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">My Activity</h1>
      
      <Heatmap 
        data={data} 
        year={2024} 
      />
    </div>
  );
}
```

## API Reference

### `Heatmap` Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `HeatmapData[]` | **Required** | Array of data points containing `{ date: string, count: number }`. |
| `year` | `number` | `new Date().getFullYear()` | The year to render the calendar for. |
| `gap` | `number` | `2` | Gap between individual day cells in pixels. |
| `className` | `string` | `""` | Additional CSS classes for the outer container. |
| `thresholds` | `[number, number, number]` | `[10, 25, 50]` | The break points for color intensity. |
| `colors` | `ColorMap` | *Default Green Scale* | Object defining Tailwind classes for each intensity level. |

### Interfaces

#### `HeatmapData`
```tsx
interface HeatmapData {
    date: string; // YYYY-MM-DD format recommended
    count: number;
}
```

#### `ColorMap`
Define the styles for each activity level. Keys `1-4` correspond to the ranges defined by your `thresholds` prop.

```tsx
type ColorMap = {
    0: string; // Empty cell color (count 0)
    1: string; // Low activity (count < thresholds[0])
    2: string; // Medium activity (count < thresholds[1])
    3: string; // High activity (count < thresholds[2])
    4: string; // Max activity (count >= thresholds[2])
};

// Default Values:
// 0: "bg-gray-800/50"
// 1: "bg-green-900/60"
// 2: "bg-green-700/70"
// 3: "bg-green-500/80"
// 4: "bg-green-400"
```

## Customization Example

```tsx
<Heatmap
  data={data}
  year={2024}
  gap={4}
  thresholds={[5, 10, 20]}
  colors={{
    0: "bg-slate-800",
    1: "bg-blue-900",
    2: "bg-blue-700",
    3: "bg-blue-500",
    4: "bg-blue-300",
  }}
/>
```

## License

MIT
