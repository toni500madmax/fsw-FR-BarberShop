"use client";

import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quicksearchOptions } from "../_constants/searchOptions";
import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SidebarSheet = () => {
   const { data } = useSession();
   const handleLogInWithGoogleClick = () => signIn("google");
   const handleLogOutFromGoogleClick = () => signOut();

   return (
      <SheetContent>
         {/* Header */}
         <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
         </SheetHeader>

         <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
            {data?.user ? (
               <div className="flex items-center gap-2">
                  <Avatar>
                     {/* Alternativa para caso for undefined ou null usando operador ?? */}
                     <AvatarImage src={data?.user?.image ?? ""} />
                  </Avatar>

                  <div>
                     <p className="font-bold">{data.user.name}</p>
                     <p className="text-sm">{data.user.email}</p>
                  </div>
               </div>
            ) : (
               <>
                  <h2 className="text-lg font-bold">Faça seu login</h2>
                  <Dialog>
                     <DialogTrigger asChild>
                        <Button size="icon">
                           <LogInIcon size={18} />
                        </Button>
                     </DialogTrigger>
                     <DialogContent className="w-[90%]">
                        <DialogHeader>
                           <DialogTitle>Faça seu Login</DialogTitle>
                           <DialogDescription>
                              Conecte-se com sua conta do Google.
                           </DialogDescription>
                        </DialogHeader>

                        <Button
                           variant="outline"
                           className="gap-3 font-bold"
                           onClick={handleLogInWithGoogleClick}
                        >
                           <Image
                              src="/google.svg"
                              alt="Login com Google"
                              width={18}
                              height={18}
                           />{" "}
                           Google
                        </Button>
                     </DialogContent>
                  </Dialog>
               </>
            )}
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
            <Button
               variant="ghost"
               className="justify-start"
               onClick={handleLogOutFromGoogleClick}
            >
               <LogOutIcon size={18} />
               Sair da conta
            </Button>
         </div>
      </SheetContent>
   );
};

export default SidebarSheet;
