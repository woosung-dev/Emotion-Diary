"use client";

import React from 'react';
import { Emotion } from './EmotionSelector';
import { Smile, Frown, Angry, Meh, PartyPopper, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DiaryEntry {
    id: number;
    date: string;
    emotion: Emotion;
    content: string;
}

interface DiaryListProps {
    entries: DiaryEntry[];
}

const emotionIcons = {
    happy: Smile,
    sad: Frown,
    angry: Angry,
    neutral: Meh,
    excited: PartyPopper,
};

const emotionColors = {
    happy: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    sad: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    angry: 'text-red-500 bg-red-500/10 border-red-500/20',
    neutral: 'text-gray-500 bg-gray-500/10 border-gray-500/20',
    excited: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
};

export function DiaryList({ entries }: DiaryListProps) {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        // if (!confirm('Are you sure you want to delete this entry?')) return;

        try {
            await fetch(`/api/entries/${id}`, { method: 'DELETE' });
            router.refresh();
        } catch (error) {
            console.error('Failed to delete entry', error);
        }
    };

    if (entries.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                No entries yet. Start writing your diary!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {entries.map((entry) => {
                const Icon = emotionIcons[entry.emotion];
                const colorClass = emotionColors[entry.emotion];

                return (
                    <div
                        key={entry.id}
                        className={`p-4 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${colorClass}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium opacity-70">
                                    {new Date(entry.date).toLocaleDateString()}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="p-1 hover:bg-black/10 rounded-full transition-colors opacity-50 hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-gray-200 whitespace-pre-wrap">{entry.content}</p>
                    </div>
                );
            })}
        </div>
    );
}
