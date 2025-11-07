'use server'

import connectDB from "../mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
    try {
        await connectDB();

        const bookingDoc = await Booking.create({ eventId, slug, email });
        const booking = bookingDoc.toObject();


        return { success: true, message: booking }

    } catch (e) {
        console.log('Create booking failed');
        return { success: false, message: e }
    }
}