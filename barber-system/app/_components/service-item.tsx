import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
   service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
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

                  <Button variant="secondary" size="sm">
                     Reservar
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default ServiceItem;
