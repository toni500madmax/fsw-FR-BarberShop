import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
   barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
   return (
      <Card className="min-w-[167px] rounded-2xl">
         <CardContent className="p-0 px-1 pt-1">
            {/* Imagem */}
            <div className="relative h-[159px] w-full">
               <Image
                  fill
                  className="rounded-2xl object-cover"
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
               />
               <Badge
                  className="absolute left-2 top-2 space-x-1"
                  variant="secondary"
               >
                  <StarIcon size={12} className="fill-primary text-primary" />
                  <p>5.0</p>
               </Badge>
            </div>
            {/* Texto */}
            <div className="px-1 py-3">
               {/* 
                    Classe truncate do tailwind substitui as seguintes:
                    overflow-hidden text-ellipsis text-nowrap
                */}
               <h3 className="truncate font-semibold">{barbershop.name}</h3>
               <p className="text-grey-400 truncate text-sm">
                  {barbershop.address}
               </p>
               <Button variant="secondary" className="mt-3 w-full" asChild>
                  <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default BarbershopItem;
