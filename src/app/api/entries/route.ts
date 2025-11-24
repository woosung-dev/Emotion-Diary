import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const entries = await prisma.diaryEntry.findMany({
            orderBy: {
                date: 'desc',
            },
        });
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { emotion, content, date } = body;

        const entry = await prisma.diaryEntry.create({
            data: {
                emotion,
                content,
                date: new Date(date),
            },
        });
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
    }
}
