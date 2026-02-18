# @mrstrange1708/heat-map

A beautiful, customizable heatmap calendar component for React, built with Tailwind CSS and Framer Motion.

[**Live Demo & Website**](https://mrstrange1708-heatmap.vercel.app/)

## Features

- 📅 **Annual View**: Displays a full year of activity data.
- 🎨 **Built-in Themes**: Ready-to-use themes like Green, Blue, and Fire.
- 🖌️ **Customizable**: Create your own color scales or use the built-in ones.
- 🔧 **Flexible Configuration**: Adjust thresholds, gaps, and styles.
- ✨ **Animations**: Smooth entry animations powered by Framer Motion.
- 📱 **Responsive**: Built with responsive design in mind.

## Installation

```bash
npm install @mrstrange1708/heat-map
# or
yarn add @mrstrange1708/heat-map
# or
pnpm add @mrstrange1708/heat-map
```

## Peer Dependencies

- `react` (>=18)
- `react-dom` (>=18)
- `framer-motion`
- `tailwindcss`

## Usage

### Basic Usage (Default Green Theme)

```tsx
import { Heatmap } from '@mrstrange1708/heat-map';

export default function App() {
  return <Heatmap data={data} year={2024} />;
}
```

### Using Built-in Themes

You can easily switch themes using the `theme` prop. Available themes: `"green"`, `"blue"`, `"fire"`.

```tsx
// Blue Theme
<Heatmap 
  data={data} 
  year={2024} 
  theme="blue"
/>

// Fire Theme
<Heatmap 
  data={data} 
  year={2024} 
  theme="fire"
/>
```

## API Reference

### `Heatmap` Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `HeatmapData[]` | **Required** | Array of `{ date: string, count: number }`. |
| `theme` | `"green" \| "blue" \| "fire"` | `"green"` | Built-in color theme to use. |
| `colors` | `HeatmapTheme` | - | Custom color map (overrides `theme`). |
| `year` | `number` | `current year` | The year to render. |
| `gap` | `number` | `2` | Gap between cells in pixels. |
| `className` | `string` | `""` | Additional CSS classes. |
| `thresholds` | `[number, number, number]` | `[10, 25, 50]` | Breakpoints for intensity levels. |

### Interfaces

#### `HeatmapData`
```tsx
interface HeatmapData {
    date: string; // YYYY-MM-DD
    count: number;
}
```

#### `HeatmapTheme`
Define custom styles for each activity level (0-4).

```tsx
type HeatmapTheme = {
  0: string; // Empty
  1: string; // Low
  2: string; // Medium
  3: string; // High
  4: string; // Max
};
```

## Customization Example

```tsx
<Heatmap
  data={data}
  colors={{
    0: "bg-slate-800",
    1: "bg-purple-900",
    2: "bg-purple-700",
    3: "bg-purple-500",
    4: "bg-purple-300",
  }}
/>
```

## License

MIT
