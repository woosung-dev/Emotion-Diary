import { DiaryEditor } from '@/components/DiaryEditor';
import { DiaryList } from '@/components/DiaryList';
import { EmotionChart } from '@/components/EmotionChart';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const entries = await prisma.diaryEntry.findMany({
        orderBy: {
            date: 'desc',
        },
    });

    // Convert dates to strings for client components to avoid serialization issues
    const formattedEntries = entries.map(entry => ({
        ...entry,
        date: entry.date.toISOString(),
        emotion: entry.emotion as any, // Cast to any first to avoid type conflict, or import Emotion type
    }));

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Emotion Diary
                    </h1>
                    <p className="text-gray-400 text-lg">Track your feelings, understand your mind.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <DiaryEditor />
                        <EmotionChart entries={formattedEntries} />
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Entries</h2>
                        <DiaryList entries={formattedEntries} />
                    </div>
                </div>
            </div>
        </main>
    );
}
