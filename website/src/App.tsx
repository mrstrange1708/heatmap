import { useState } from "react";
import { Heatmap } from "heat-calendar";

// Generate dummy data
const generateData = (year: number) => {
    const data = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        if (Math.random() > 0.6) {
            data.push({
                date: d.toISOString().split("T")[0],
                count: Math.floor(Math.random() * 50),
            });
        }
    }
    return data;
};

function App() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState(generateData(year));
    const [theme, setTheme] = useState<"green" | "blue" | "fire">("green");

    const [copied, setCopied] = useState(false);

    const themes = {
        green: {
            0: "bg-gray-800/50",
            1: "bg-green-900/60",
            2: "bg-green-700/70",
            3: "bg-green-500/80",
            4: "bg-green-400",
            accent: "from-green-400 via-emerald-400 to-teal-500",
            button: "bg-green-500 hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]",
            selection: "selection:bg-green-500/30",
            icon: "bg-gradient-to-tr from-green-400 to-emerald-600"
        },
        blue: {
            0: "bg-gray-800/50",
            1: "bg-blue-900/60",
            2: "bg-blue-700/70",
            3: "bg-blue-500/80",
            4: "bg-blue-400",
            accent: "from-blue-400 via-cyan-400 to-sky-500",
            button: "bg-blue-500 hover:bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
            selection: "selection:bg-blue-500/30",
            icon: "bg-gradient-to-tr from-blue-400 to-cyan-600"
        },
        fire: {
            0: "bg-gray-800/50",
            1: "bg-orange-900/60",
            2: "bg-orange-700/70",
            3: "bg-orange-500/80",
            4: "bg-red-500",
            accent: "from-orange-400 via-red-500 to-yellow-500",
            button: "bg-orange-500 hover:bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]",
            selection: "selection:bg-orange-500/30",
            icon: "bg-gradient-to-tr from-orange-400 to-red-600"
        },
    };

    const activeTheme = themes[theme];

    const handleCopy = () => {
        navigator.clipboard.writeText("npm install heat-calendar");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRegenerate = () => {
        setData(generateData(year));
    };

    return (
        <div className={`min-h-screen bg-slate-950 text-slate-200 font-sans ${activeTheme.selection}`}>
            {/* Hero Section */}
            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 ${activeTheme.icon} rounded-md transition-all duration-500`}></div>
                        <span className="font-bold text-lg tracking-tight">Heat Calendar</span>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                        <a href="#demo" className="hover:text-white transition-colors">Demo</a>
                        <a href="#installation" className="hover:text-white transition-colors">Installation</a>
                        <a href="#props" className="hover:text-white transition-colors">API</a>
                    </nav>
                    <a
                        href="https://github.com"
                        target="_blank"
                        className="text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full transition-all"
                    >
                        GitHub
                    </a>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className={`text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${activeTheme.accent} mb-6 pb-2 transition-all duration-700`}>
                        Visualize Activity Like a Pro.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        A lightweight, customizable, and beautiful heatmap component for React.
                        Perfect for tracking contributions, habits, or any daily activity.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 flex items-center gap-3 font-mono text-sm text-slate-300 shadow-lg cursor-pointer" onClick={handleCopy}>
                            <span className="text-slate-500">$</span>
                            npm install heat-calendar
                            <span className="ml-2 text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                                {copied ? "Copied!" : "📋"}
                            </span>
                        </div>
                        <a href="#demo" className={`${activeTheme.button} text-slate-950 font-semibold px-6 py-3 rounded-lg transition-all duration-300`}>
                            View Demo
                        </a>
                    </div>
                </div>

                {/* Demo Section */}
                <section id="demo" className="max-w-5xl mx-auto mb-24 scroll-mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Interactive Demo</h2>
                        <div className="flex gap-4">
                            <select
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500/50"
                            >
                                {[2023, 2024, 2025, 2026].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as any)}
                                className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500/50"
                            >
                                <option value="green">Green Theme</option>
                                <option value="blue">Blue Theme</option>
                                <option value="fire">Fire Theme</option>
                            </select>
                            <button
                                onClick={handleRegenerate}
                                className="text-sm text-slate-400 hover:text-white underline underline-offset-4"
                            >
                                Regenerate Data
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm overflow-hidden">
                        <Heatmap
                            data={data}
                            year={year}
                            colors={themes[theme]}
                            className="w-full"
                        />
                    </div>
                </section>

                {/* Installation */}
                <section id="installation" className="max-w-3xl mx-auto mb-20 scroll-mt-24 text-slate-300">
                    <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
                    <p className="mb-4">Install the package via your favorite package manager:</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 font-mono text-sm mb-8">
                        npm install heat-calendar framed-motion
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Usage</h3>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 font-mono text-sm overflow-x-auto">
                        <pre className="language-tsx">
                            {`import { Heatmap } from "heat-calendar";

const MyComponent = () => {
  const data = [
    { date: "2024-01-01", count: 12 },
    { date: "2024-01-02", count: 5 },
    // ...
  ];

  return (
    <Heatmap 
      data={data} 
      year={2024} 
    />
  );
}`}
                        </pre>
                    </div>
                </section>

                {/* Props API */}
                <section id="props" className="max-w-3xl mx-auto scroll-mt-24">
                    <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
                    <div className="overflow-hidden rounded-lg border border-slate-800">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-900 text-slate-200 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Prop</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Default</th>
                                    <th className="px-6 py-4">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                                <tr>
                                    <td className="px-6 py-4 font-mono text-green-400">data</td>
                                    <td className="px-6 py-4 font-mono">HeatmapData[]</td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4">Array of objects with <code>date</code> (string) and <code>count</code> (number).</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono text-green-400">year</td>
                                    <td className="px-6 py-4 font-mono">number</td>
                                    <td className="px-6 py-4">current year</td>
                                    <td className="px-6 py-4">The year to render.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono text-green-400">gap</td>
                                    <td className="px-6 py-4 font-mono">number</td>
                                    <td className="px-6 py-4">2</td>
                                    <td className="px-6 py-4">Gap between cells in pixels.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono text-green-400">colors</td>
                                    <td className="px-6 py-4 font-mono">object</td>
                                    <td className="px-6 py-4">Green scale</td>
                                    <td className="px-6 py-4">Object mapping levels (0-4) to Tailwind class strings.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>

            <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} Heat Calendar. MIT License.</p>
            </footer>
        </div>
    );
}

export default App;
