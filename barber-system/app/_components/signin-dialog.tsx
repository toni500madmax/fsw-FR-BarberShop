import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import {
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "./ui/dialog";
import Image from "next/image";

const SignInDialog = () => {
   const handleLogInWithGoogleClick = () => signIn("google");

   return (
      <>
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
      </>
   );
};

export default SignInDialog;
