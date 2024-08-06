// Determinação de renderização parcial no client side,
// isso permite o dinamismo e hooks do React.
"use client";

// Ícones
import { SearchIcon } from "lucide-react";

// Components
import Header from "./_components/header";

// O next.js possui 4 componentes otimizados.
import Image from "next/image";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar } from "./_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Home() {
   return (
      <>
         <Header />

         {/* Texto */}
         <div className="p-5">
            <h2 className="text-xl font-bold">Olá, Felipe!</h2>
            <p>Segunda-feira, 06 de agosto.</p>

            {/* Busca */}
            <div className="mt-6 flex items-center gap-2 space-x-2">
               <Input placeholder="Faça sua busca..." />
               <Button>
                  <SearchIcon />
               </Button>
            </div>

            {/* Imagem */}
            <div className="relative mt-6 h-[150px] w-full">
               <Image
                  src="/banner-01.png"
                  alt="Agende nos melhores com FSW Barber Shop"
                  fill
                  className="rounded-xl object-cover"
               />
            </div>

            {/* Agendamento */}
            <Card className="mt-6">
               <CardContent className="flex justify-between p-0">
                  {/* Esquerda */}
                  <div className="flex flex-col gap-2 py-5 pl-5">
                     <Badge>Comfirmado</Badge>
                     <h3 className="font-bold">Corte de cabelo</h3>
                     <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                           <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                        </Avatar>
                        <p className="text-sm">Barbearia FullStack</p>
                     </div>
                  </div>
                  {/* Direita */}
                  <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                     <p className="text-sm">Agosto</p>
                     <p className="text-2xl">05</p>
                     <p className="text-sm">20:00</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   );
}
