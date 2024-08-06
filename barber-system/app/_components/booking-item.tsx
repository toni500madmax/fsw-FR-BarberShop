import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// ToDo: receber agendamento como props

const BookingItem = () => {
   return (
      <>
         <h2 className="text-grey-400 mb-3 mt-6 text-xs font-bold uppercase">
            Agendamentos
         </h2>

         <Card>
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
      </>
   );
};

export default BookingItem;
