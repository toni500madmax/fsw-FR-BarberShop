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

export default function Home() {
   return (
      <>
         <Header />
         <div className="p-5">
            <h2 className="text-xl font-bold">Olá, Felipe!</h2>
            <p>Segunda-feira, 06 de agosto.</p>
            <div className="mt-6 flex items-center gap-2 space-x-2">
               <Input placeholder="Faça sua busca..." />
               <Button>
                  <SearchIcon />
               </Button>
            </div>
            <div className="relative mt-6 h-[150px] w-full">
               <Image
                  src="/banner-01.png"
                  alt="Agende nos melhores com FSW Barber Shop"
                  fill
                  className="rounded-xl object-cover"
               />
            </div>
         </div>
      </>
   );
}
