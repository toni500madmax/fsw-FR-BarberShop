import { Card, CardContent } from "./ui/card";

const Footer = () => {
   return (
      <footer className="mt-6">
         <Card>
            <CardContent className="py-3 text-center">
               <p className="text-grey-400 text-sm">
                  2024 Copyright{" "}
                  <span className="font-bold">FSW Barber Shop</span>
               </p>
            </CardContent>
         </Card>
      </footer>
   );
};

export default Footer;
