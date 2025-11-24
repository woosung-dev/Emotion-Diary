"use client";

import React, { useState } from 'react';
import { EmotionSelector, Emotion } from './EmotionSelector';
import { useRouter } from 'next/navigation';

export function DiaryEditor() {
    const router = useRouter();
    const [emotion, setEmotion] = useState<Emotion>('neutral');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emotion,
                    content,
                    date,
                }),
            });

            if (!response.ok) throw new Error('Failed to create entry');

            setContent('');
            setEmotion('neutral');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save diary entry');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">How are you feeling today?</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <EmotionSelector selected={emotion} onSelect={setEmotion} />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">What's on your mind?</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full px-4 py-3 h-32 bg-black/20 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-gray-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-purple-500/20"
                >
                    {isSubmitting ? 'Saving...' : 'Save Entry'}
                </button>
            </form>
        </div>
    );
}
