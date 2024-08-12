// Determinação de renderização parcial no client side -> "use-client",
// isso permite o dinamismo e hooks do React.

// Interface
import { quicksearchOptions } from "./_constants/searchOptions";

// Components
import Header from "./_components/header";
import { Button } from "./_components/ui/button";

// O next.js possui 4 componentes otimizados.
import Image from "next/image";

// Banco de dados
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import WelcomeMessage from "./_components/welcome-message";

/* 
ToDo: Implementar sistema de avaliação de barbearias.
*/

const Home = async () => {
   // conexão com o banco de dados com a linguagem do Prisma.
   const barbershop = await db.barbershop.findMany({});
   const popularBarbershops = await db.barbershop.findMany({
      orderBy: {
         name: "desc",
      },
   });

   return (
      <>
         <Header />

         <div className="p-5">
            <WelcomeMessage />

            {/* Busca */}
            <div className="mt-6">
               <Search />
            </div>

            {/* Ícones de busca rápida */}
            <div className="[&:: -webkit-scrollbar]:hidden mt-6 flex gap-3 overflow-x-scroll">
               {quicksearchOptions.map((option) => (
                  <Button variant="secondary" key={option.title} asChild>
                     <Link href={`/barbershops?service=${option.title}`}>
                        <Image
                           src={option.imageUrl}
                           width={16}
                           height={16}
                           alt={option.title}
                           className="mr-2"
                        />
                        {option.title}
                     </Link>
                  </Button>
               ))}
            </div>

            {/* Banner */}
            <div className="relative mt-6 h-[150px] w-full">
               <Image
                  src="/banner-01.png"
                  alt="Agende nos melhores com FSW Barber Shop"
                  fill
                  className="rounded-xl object-cover"
               />
            </div>

            {/* Agendamento */}
            <BookingItem />

            <h2 className="text-grey-400 mb-3 mt-6 text-xs font-bold uppercase">
               Recomendados
            </h2>
            {/* com uma classe do webkit que some com a barra de scroll */}
            <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
               {barbershop.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
               ))}
            </div>

            {/* Populares */}
            <h2 className="text-grey-400 mb-3 mt-6 text-xs font-bold uppercase">
               Populares
            </h2>
            {/* com uma classe do webkit que some com a barra de scroll */}
            <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
               {popularBarbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Home;
