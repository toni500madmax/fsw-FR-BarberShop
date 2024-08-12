import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";

const Bookings = async () => {
   const session = await getServerSession(authOptions);
   if (!session?.user) {
      return notFound();
   }

   const confirmedBookings = await db.booking.findMany({
      where: {
         userId: (session.user as any).id,
      },
      include: {
         service: {
            include: {
               barbershop: true,
            },
         },
      },
      orderBy: {
         date: "desc",
      },
   });

   const concludedBookings = await db.booking.findMany({
      where: {
         userId: (session.user as any).id,
         date: {
            lt: new Date(),
         },
      },
      include: {
         service: {
            include: {
               barbershop: true,
            },
         },
      },
      orderBy: {
         date: "desc",
      },
   });

   return (
      <>
         <Header />
         <div className="space-y-3 p-5">
            <h1 className="text-xl font-bold">Agendamentos</h1>
            <h2 className="text-grey-400 mb-3 mt-6 text-sm font-bold uppercase">
               Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
               <BookingItem key={booking.id} booking={booking} />
            ))}
            <h2 className="text-grey-400 mb-3 mt-6 text-sm font-bold uppercase">
               Finalizados
            </h2>
            {concludedBookings.map((booking) => (
               <BookingItem key={booking.id} booking={booking} />
            ))}
         </div>
      </>
   );
};

export default Bookings;
