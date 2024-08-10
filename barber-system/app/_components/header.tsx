// Ícones
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";

// Componentes
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";

import SidebarSheet from "./sidebar-sheet";

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
                  <SidebarSheet />
               </Sheet>
            </CardContent>
         </Card>
      </>
   );
};

export default Header;
