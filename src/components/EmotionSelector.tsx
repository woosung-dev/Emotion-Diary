import React from 'react';
import { Smile, Frown, Angry, Meh, PartyPopper } from 'lucide-react';
import { clsx } from 'clsx';

export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'excited';

interface EmotionSelectorProps {
    selected: Emotion;
    onSelect: (emotion: Emotion) => void;
}

const emotions: { value: Emotion; label: string; icon: React.ElementType; color: string }[] = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-500' },
    { value: 'excited', label: 'Excited', icon: PartyPopper, color: 'text-pink-500' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-500' },
    { value: 'angry', label: 'Angry', icon: Angry, color: 'text-red-500' },
];

export function EmotionSelector({ selected, onSelect }: EmotionSelectorProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-center p-4">
            {emotions.map(({ value, label, icon: Icon, color }) => (
                <button
                    key={value}
                    onClick={() => onSelect(value)}
                    className={clsx(
                        "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                        selected === value
                            ? "bg-white/10 scale-110 ring-2 ring-white/20 shadow-lg"
                            : "hover:bg-white/5 hover:scale-105 opacity-70 hover:opacity-100"
                    )}
                    type="button"
                >
                    <Icon className={clsx("w-8 h-8", color)} />
                    <span className="text-xs font-medium text-gray-200">{label}</span>
                </button>
            ))}
        </div>
    );
}
