import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<{ message: string; event?: IEvent; error?: string }>> {
  try {
    // Connect to database
    await connectDB();

    // Extract and validate slug parameter
    const { slug } = await params;


    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { message: 'Invalid slug parameter', error: 'Slug must be a non-empty string' },
        { status: 400 }
      );
    }

    // Sanitize slug: trim and convert to lowercase
    const sanitizedSlug = slug.trim().toLowerCase();

    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        { message: 'Invalid slug parameter', error: 'Slug cannot be empty' },
        { status: 400 }
      );
    }

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found', error: `No event found with slug: ${sanitizedSlug}` },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event by slug:', error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
