"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { formatDate, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva desmarcada com sucesso!")
    } catch (err) {
      console.log(err)
      toast.error("Erro ao cancelar reserva. Tente novamente mais tarde!")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => setIsSheetOpen(isOpen)

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full min-w-full">
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
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{booking.service.barbershop.name}</p>
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
                  {formatDate(booking.date, "HH:mm", { locale: ptBR })}
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
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <h3 className="text-sm font-bold">
                  {booking.service.barbershop.name}
                </h3>
                <p className="text-sm">{booking.service.barbershop.address}</p>
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
                  <p className="text-sm">{booking.service.barbershop.name}</p>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              {booking.service.barbershop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>
          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <>
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button variant="destructive" className="w-full">
                        Cancelar Reserva
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                      <DialogHeader>
                        <DialogTitle>
                          Deseja cancelar esse agendamento ?
                        </DialogTitle>
                        <DialogDescription>
                          Ao cancelar o agendamento será excluído, porém você
                          ainda poderá marcar outra data.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-row gap-3">
                        <DialogClose asChild className="w-full">
                          <Button variant="secondary" className="w-full">
                            Voltar
                          </Button>
                        </DialogClose>
                        <DialogClose className="w-full">
                          <Button
                            variant="destructive"
                            onClick={handleCancelBooking}
                            className="w-full"
                          >
                            Confirmar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
