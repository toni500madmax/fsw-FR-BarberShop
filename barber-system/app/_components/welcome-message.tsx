"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

const WelcomeMessage = () => {
   const { data } = useSession();
   const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
   ];
   const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

   const date = new Date();
   const month = months[date.getMonth()];
   const day = days[date.getDay()];
   const dayOfMonth = date.getDate();

   return data ? (
      <>
         <h2 className="text-xl font-bold">{`Olá, ${data?.user?.name}!`}</h2>
         <p>{`${day}-feira, ${dayOfMonth} de ${month.toLowerCase()}.`}</p>
      </>
   ) : (
      <>
         <h2 className="text-xl font-bold">Olá, seja bem vindo!</h2>
         <p>Faça seu login!</p>
      </>
   );
};

export default WelcomeMessage;
