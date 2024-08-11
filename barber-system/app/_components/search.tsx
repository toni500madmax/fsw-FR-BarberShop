"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
// Biblioteca Zod para validação de inputs em conjunto com React Hook Form
import { z } from "zod";
import { useForm } from "react-hook-form";
// zodResolver serve para integrar o Zod com React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormMessage,
} from "./ui/form";

const formSchema = z.object({
   search: z.string().trim().min(1, {
      message: "DIgite algo para buscar",
   }),
});

const Search = () => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         search: "",
      },
   });

   const [search, setSearch] = useState("");
   const router = useRouter();

   const handleSubmit = (data: z.infer<typeof formSchema>) => {
      router.push(`/barbershops?search=${search}`);
   };

   return (
      <>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(handleSubmit)}
               className="flex gap-2"
            >
               <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormControl>
                           <Input
                              placeholder="Faça sua busca..."
                              {...field}
                              className="w-full"
                           />
                        </FormControl>
                        <FormDescription>
                           This is your public display name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit">
                  <SearchIcon />
               </Button>
            </form>
         </Form>
      </>
   );
};

export default Search;
