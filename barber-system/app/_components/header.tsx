// Ícones
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";

// Componentes
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet";
import { quicksearchOptions } from "../_constants/searchOptions";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
   return (
      <>
         <Card>
            <CardContent className="flex flex-row items-center justify-between p-5">
               <Image
                  src="/logo.png"
                  height={18}
                  width={120}
                  alt="FSW Barber Shop"
               />
               <Sheet>
                  {/* Botão hamburguer */}
                  <SheetTrigger asChild>
                     <Button size="icon" variant="outline">
                        <MenuIcon />
                     </Button>
                  </SheetTrigger>
                  {/* Janela lateral do menu */}
                  <SheetContent>
                     {/* Header */}
                     <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                     </SheetHeader>

                     <div className="flex items-center gap-3 border-b border-solid py-5">
                        <Avatar>
                           <AvatarImage src="" />
                        </Avatar>

                        <div>
                           <p className="font-bold">Felipe Rocha</p>
                           <p className="text-sm">felipe.email@email.com</p>
                        </div>
                     </div>

                     {/* Body */}
                     <div className="flex flex-col gap-1 border-b border-solid py-5">
                        <Button
                           className="justify-start gap-2"
                           variant="ghost"
                           asChild
                        >
                           <Link href="/">
                              <HomeIcon size={18} />
                              Início
                           </Link>
                        </Button>
                        <Button className="justify-start gap-2" variant="ghost">
                           <CalendarIcon size={18} />
                           Agendamento
                        </Button>
                     </div>
                     {/* Footer */}
                     <div className="flex flex-col gap-1 border-b border-solid py-5">
                        {quicksearchOptions.map((option) => (
                           <Button
                              key={option.title}
                              className="justify-start gap-2"
                              variant="ghost"
                           >
                              <Image
                                 src={option.imageUrl}
                                 height={18}
                                 width={18}
                                 alt={option.title}
                              />
                              {option.title}
                           </Button>
                        ))}
                     </div>

                     <div className="flex flex-col gap-1 border-b border-solid py-5">
                        <Button variant="ghost" className="justify-start">
                           <LogOutIcon size={18} />
                           Sair da conta
                        </Button>
                     </div>
                  </SheetContent>
               </Sheet>
            </CardContent>
         </Card>
      </>
   );
};

export default Header;
