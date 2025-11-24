"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Emotion } from './EmotionSelector';

interface DiaryEntry {
    emotion: Emotion;
}

interface EmotionChartProps {
    entries: DiaryEntry[];
}

const COLORS = {
    happy: '#eab308',   // yellow-500
    sad: '#3b82f6',     // blue-500
    angry: '#ef4444',   // red-500
    neutral: '#6b7280', // gray-500
    excited: '#ec4899', // pink-500
};

export function EmotionChart({ entries }: EmotionChartProps) {
    const data = React.useMemo(() => {
        const counts = entries.reduce((acc, entry) => {
            acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
            return acc;
        }, {} as Record<Emotion, number>);

        return Object.entries(counts).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
            color: COLORS[name as Emotion],
        }));
    }, [entries]);

    if (entries.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 bg-white/5 rounded-3xl border border-white/10">
                No data to display
            </div>
        );
    }

    return (
        <div className="h-80 w-full bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-4 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.1)" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
