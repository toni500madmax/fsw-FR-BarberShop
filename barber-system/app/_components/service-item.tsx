"use client";

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
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
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { addDays, isPast, isToday, set } from "date-fns";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-booking";
import SignInDialog from "./signin-dialog";
import { Dialog, DialogContent } from "./ui/dialog";

interface ServiceItemProps {
   service: BarbershopService;
   barbershop: Pick<Barbershop, "name">;
}

interface GetTimeListProps {
   bookings: Booking[];
   selectedDay: Date;
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

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
   return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0]);
      const minute = Number(time.split(":")[1]);

      const timeIsPast = isPast(
         set(new Date(), { hours: hour, minutes: minute }),
      );
      if (timeIsPast && isToday(selectedDay)) {
         return false;
      }

      const hasBookingOnCurrentTime = bookings.some(
         (booking) =>
            booking.date.getHours() === hour &&
            booking.date.getMinutes() === minute,
      );

      if (hasBookingOnCurrentTime) {
         return false;
      }
      return true;
   });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
   // ToDo: não mostrar horários que já passaram no dia;

   const { data } = useSession();
   const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
   const [selectedTime, setSelectedTime] = useState<string | undefined>(
      undefined,
   );
   const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
   const [bookingSheetsIsOpen, setBookingSheetsIsOpen] = useState(false);

   const handleBookingSheetOpenChange = () => {
      setSelectedDay(undefined);
      setSelectedTime(undefined);
      setDayBookings([]);
      setBookingSheetsIsOpen(false);
   };

   const handleDateSelect = (date: Date | undefined) => {
      setSelectedDay(date);
   };

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
   };

   const [dayBookings, setDayBookings] = useState<Booking[]>([]);

   useEffect(() => {
      const fetch = async () => {
         if (!selectedDay) return;
         const bookings = await getBookings({
            date: selectedDay,
            serviceId: service.id,
         });
         setDayBookings(bookings);
      };
      fetch();
   }, [selectedDay, service.id, dayBookings]);

   const handleBookingClick = () => {
      if (data?.user) {
         // técnica de early return, isto faz com que saia da função, e
         // não precise de elses depois.
         return setBookingSheetsIsOpen(true);
      }
      return setSignInDialogIsOpen(true);
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
            date: newDate,
         });
         handleBookingSheetOpenChange();
         toast.success("Reserva criada com sucesso!");
      } catch (err) {
         console.log(err);
         toast.error("Erro ao criar reserva!");
      }
   };

   const timeList = useMemo(() => {
      if (!selectedDay) return [];
      return getTimeList({
         bookings: dayBookings,
         selectedDay,
      });
   }, [dayBookings, selectedDay]);

   if (!service) {
      return notFound();
   }
   return (
      <>
         <Card>
            <CardContent className="flex items-center gap-2 py-3">
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
                     <Sheet
                        open={bookingSheetsIsOpen}
                        onOpenChange={handleBookingSheetOpenChange}
                     >
                        <Button
                           variant="secondary"
                           size="sm"
                           onClick={handleBookingClick}
                        >
                           Reservar
                        </Button>

                        <SheetContent className="px-0">
                           <SheetHeader>
                              <SheetTitle>Fazer Reserva</SheetTitle>
                           </SheetHeader>
                           <div className="border-b border-solid py-5">
                              <Calendar
                                 mode="single"
                                 locale={ptBR}
                                 selected={selectedDay}
                                 onSelect={handleDateSelect}
                                 // formDate permite dar um limite de data a partir da.
                                 fromDate={addDays(new Date(), 0)}
                                 styles={{
                                    head_cell: {
                                       width: "100%",
                                       textTransform: "capitalize",
                                    },
                                    cell: {
                                       width: "100%",
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
                                 {timeList.length > 0 ? (
                                    timeList.map((time) => (
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
                                    ))
                                 ) : (
                                    <p className="text-xs text-gray-500">
                                       Não há horários disponíveis para este
                                       dia.
                                    </p>
                                 )}
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
                                          <p className="text-sm">
                                             {selectedTime}
                                          </p>
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

         <Dialog
            open={signInDialogIsOpen}
            onOpenChange={(open) => setSignInDialogIsOpen(open)}
         >
            <DialogContent>
               <SignInDialog />
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ServiceItem;
