import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quicksearchOptions } from "../_constants/searchOptions";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";

const SidebarSheet = () => {
   return (
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
            <Button className="justify-start gap-2" variant="ghost" asChild>
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
         {/* Botão logout */}
         <div className="flex flex-col gap-1 border-b border-solid py-5">
            <Button variant="ghost" className="justify-start">
               <LogOutIcon size={18} />
               Sair da conta
            </Button>
         </div>
      </SheetContent>
   );
};

export default SidebarSheet;
