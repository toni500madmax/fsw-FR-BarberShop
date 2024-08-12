"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { formatDate, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";

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
         <Sheet>
            <SheetTrigger>
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
            </SheetTrigger>
            <SheetContent className="w-[90%]">
               <SheetHeader>
                  <SheetTitle className="text-left">
                     Informações da reserva
                  </SheetTitle>
               </SheetHeader>
               <div className="relative mt-6 flex h-[180px] w-full items-end">
                  <Image
                     src="/map.png"
                     fill
                     className="rounded-xl object-cover"
                     alt={`Mapa da barbearia ${booking.service.barbershop.name}.`}
                  />
                  <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                     <CardContent className="px-5 py-3">
                        <Avatar>
                           <AvatarImage
                              src={booking.service.barbershop.imageUrl}
                           />
                        </Avatar>
                        <h3 className="text-sm font-bold">
                           {booking.service.barbershop.name}
                        </h3>
                        <p className="text-sm">
                           {booking.service.barbershop.address}
                        </p>
                     </CardContent>
                  </Card>
               </div>
               <div className="mt-6">
                  <Badge
                     className="flex items-center justify-center text-center"
                     variant={isConfirmed ? "default" : "secondary"}
                  >
                     {isConfirmed ? "Confirmado" : "Finalizado"}
                  </Badge>
                  <Card className="mb-6 mt-3">
                     <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                           <h2 className="font-bold">{booking.service.name}</h2>
                           <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                 style: "currency",
                                 currency: "BRL",
                              }).format(Number(booking.service.price))}
                           </p>
                        </div>

                        <div className="flex items-center justify-between">
                           <h2 className="text-sm text-gray-400">Horário</h2>
                           <p className="text-sm">
                              {formatDate(booking.date, "HH:dd", {
                                 locale: ptBR,
                              })}
                           </p>
                        </div>

                        <div className="flex items-center justify-between">
                           <h2 className="text-sm text-gray-400">Barbearia</h2>
                           <p className="text-sm">
                              {booking.service.barbershop.name}
                           </p>
                        </div>
                     </CardContent>
                  </Card>
                  <div className="space-y-3">
                     {booking.service.barbershop.phones.map((phone, index) => (
                        <PhoneItem key={index} phone={phone} />
                     ))}
                  </div>
               </div>
            </SheetContent>
         </Sheet>
      </>
   );
};

export default BookingItem;
