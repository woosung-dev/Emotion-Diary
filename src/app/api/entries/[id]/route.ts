import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.diaryEntry.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const { emotion, content, date } = body;

        const entry = await prisma.diaryEntry.update({
            where: { id },
            data: {
                emotion,
                content,
                date: date ? new Date(date) : undefined,
            },
        });
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 });
    }
}
