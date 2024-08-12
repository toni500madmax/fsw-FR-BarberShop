"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProps {
   serviceId: string;
   date: Date;
}

// Este escopo de função já significa uma promise, então não precisa de async await.
export const getBookings = ({ date }: GetBookingsProps) => {
   return db.booking.findMany({
      where: {
         date: {
            lte: endOfDay(date),
            gte: startOfDay(date),
         },
      },
   });
};
