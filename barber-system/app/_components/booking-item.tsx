"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { formatDate, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
   booking: Prisma.BookingGetPayload<{
      include: {
         service: {
            include: {
               barbershop: true;
            };
         };
      };
   }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
   const isConfirmed = isFuture(booking.date);

   return (
      <>
         <Card className="min-w-[90%]">
            <CardContent className="flex justify-between p-0">
               {/* Esquerda */}
               <div className="flex flex-col gap-2 py-5 pl-5">
                  <Badge
                     className="flex items-center justify-center text-center"
                     variant={isConfirmed ? "default" : "secondary"}
                  >
                     {isConfirmed ? "Confirmado" : "Finalizado"}
                  </Badge>
                  <h3 className="font-bold">{booking.service.name}</h3>
                  <div className="flex items-center gap-2">
                     <Avatar className="h-6 w-6">
                        <AvatarImage
                           src={booking.service.barbershop.imageUrl}
                        />
                     </Avatar>
                     <p className="text-sm">
                        {booking.service.barbershop.name}
                     </p>
                  </div>
               </div>
               {/* Direita */}
               <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                  <p className="text-sm capitalize">
                     {formatDate(booking.date, "MMMM", { locale: ptBR })}
                  </p>
                  <p className="text-2xl">
                     {formatDate(booking.date, "dd", { locale: ptBR })}
                  </p>
                  <p className="text-sm">
                     {formatDate(booking.date, "HH:dd", { locale: ptBR })}
                  </p>
               </div>
            </CardContent>
         </Card>
      </>
   );
};

export default BookingItem;
