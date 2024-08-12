"use client";

import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { set, setMinutes } from "date-fns";
import { toast } from "sonner";

interface ServiceItemProps {
   service: BarbershopService;
   barbershop: Pick<Barbershop, "name">;
}

const TIME_LIST = [
   "08:00",
   "08:30",
   "09:00",
   "09:30",
   "10:00",
   "10:30",
   "11:00",
   "11:30",
   "12:00",
   "12:30",
   "13:00",
   "13:30",
   "14:00",
   "14:30",
   "15:00",
   "15:30",
   "16:00",
   "16:30",
   "17:00",
   "17:30",
   "18:00",
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
   /* 
ToDo: Não exibir horários que já passaram.
ToDo: Pedir login ao clicar em reservar se não estiver logado.
*/

   const { data } = useSession();
   const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
   const [selectedTime, setSelectedTime] = useState<string | undefined>(
      undefined,
   );

   const handleDateSelect = (date: Date | undefined) => {
      setSelectedDay(date);
   };

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
   };

   const handleCreateBooking = async () => {
      try {
         if (!selectedDay || !selectedTime) return;
         const hours = Number(selectedTime.split(":")[0]);
         const minutes = Number(selectedTime.split(":")[1]);
         const newDate = set(selectedDay, {
            minutes: minutes,
            hours: hours,
         });
         await createBooking({
            serviceId: service.id,
            userId: (data?.user as any).id,
            date: newDate,
         });
         toast.success("Reserva criada com sucesso!");
      } catch (err) {
         console.log(err);
         toast.error("Erro ao criar reserva!");
      }
   };

   if (!service) {
      return notFound();
   }
   return (
      <Card>
         <CardContent className="flex items-center gap-2">
            <div className="relative max-h-[110px] min-h-[110px] min-w-[110px]">
               <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="rounded-lg object-cover"
               />
            </div>

            <div className="space-y-2">
               <h3 className="text-sm font-semibold">{service.name}</h3>
               <p className="text-grey-400 text-sm">{service.description}</p>
               <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-primary">
                     {/* Usando a API de conversão de moedas do Javascript Intl */}
                     {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                     }).format(Number(service.price))}
                  </p>
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button variant="secondary" size="sm">
                           Reservar
                        </Button>
                     </SheetTrigger>
                     <SheetContent className="px-0">
                        <SheetHeader>
                           <SheetTitle>Fazer Reserva</SheetTitle>
                        </SheetHeader>
                        <div className="py-5">
                           <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={selectedDay}
                              onSelect={handleDateSelect}
                              styles={{
                                 head_cell: {
                                    width: "100%",
                                    textTransform: "capitalize",
                                 },
                                 button: {
                                    width: "100%",
                                 },
                                 nav_button_previous: {
                                    width: "32px",
                                    height: "32px",
                                 },
                                 nav_button_next: {
                                    width: "32px",
                                    height: "32px",
                                 },
                                 caption: {
                                    textTransform: "capitalize",
                                 },
                              }}
                           />
                        </div>
                        {selectedDay && (
                           <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                              {TIME_LIST.map((time) => (
                                 <Button
                                    key={time}
                                    variant={
                                       selectedTime === time
                                          ? "default"
                                          : "outline"
                                    }
                                    className="rounded-full"
                                    onClick={() => handleTimeSelect(time)}
                                 >
                                    {time}
                                 </Button>
                              ))}
                           </div>
                        )}

                        {selectedTime && selectedDay && (
                           <div className="p-5">
                              <Card>
                                 <CardContent className="p-3">
                                    <div className="flex items-center justify-between">
                                       <h2 className="font-bold">
                                          {service.name}
                                       </h2>
                                       <p className="text-sm font-bold">
                                          {Intl.NumberFormat("pt-BR", {
                                             style: "currency",
                                             currency: "BRL",
                                          }).format(Number(service.price))}
                                       </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                       <h2 className="text-sm text-gray-400">
                                          Horário
                                       </h2>
                                       <p className="text-sm">{selectedTime}</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                       <h2 className="text-sm text-gray-400">
                                          Barbearia
                                       </h2>
                                       <p className="text-sm">
                                          {barbershop.name}
                                       </p>
                                    </div>
                                 </CardContent>
                              </Card>
                           </div>
                        )}
                        <SheetFooter className="mt-5 px-5">
                           <SheetClose asChild>
                              <Button
                                 onClick={handleCreateBooking}
                                 disabled={!selectedDay || !selectedTime}
                              >
                                 Confirmar
                              </Button>
                           </SheetClose>
                        </SheetFooter>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default ServiceItem;
