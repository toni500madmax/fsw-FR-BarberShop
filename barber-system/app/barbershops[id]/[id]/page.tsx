import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopProps {
   params: {
      id: string;
   };
}

const BarbershopPage = async ({ params }: BarbershopProps) => {
   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },
      // criando o join para obter os dados da tabela de serviços
      include: {
         services: true,
      },
   });

   // resolve problema de "barbershop" ser undefined ou null.
   if (!barbershop) {
      return notFound();
   }

   return (
      <>
         <div className="relative h-[250px] w-full">
            <Image
               src={barbershop?.imageUrl}
               alt={barbershop?.name}
               fill
               className="object-cover"
            />
            <Button
               size="icon"
               variant="secondary"
               className="absolute left-4 top-4"
               asChild
            >
               <Link href={"/"}>
                  <ChevronLeftIcon />
               </Link>
            </Button>
            <Button
               size="icon"
               variant="secondary"
               className="absolute right-4 top-4"
               asChild
            >
               <MenuIcon />
            </Button>
         </div>

         <div className="border-b border-solid p-5">
            <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
            <div className="mb-2 flex items-center gap-2">
               <MapPinIcon className="text-primary" size={18} />
               <p className="text-sm">{barbershop?.address}</p>
            </div>
            <div className="flex items-center gap-2">
               <StarIcon className="fill-primary text-primary" size={18} />
               <p className="text-sm">5.0 (400 avaliações)</p>
            </div>
         </div>

         <div className="space-y-2 border-b border-solid p-5">
            <h2 className="font-bol text-grey-400 text-xs uppercase">
               Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
         </div>

         <div className="space-y-3 p-5">
            <h2 className="font-bol text-grey-400 text-xs uppercase">
               Serviços
            </h2>
            <div className="space-y-3">
               {barbershop.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
               ))}
            </div>
         </div>
      </>
   );
};

export default BarbershopPage;
