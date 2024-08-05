// Determinação de renderização parcial no client side, 
// isso permite o dinamismo e hooks do React.
"use client";

// Shadcn/ui
import { Button } from "./_components/ui/button";

const name = "teste eslint"

export default function Home() {
  return (
    <>
    <h1 className="text-red-700 py-3 px-5">Hello Next.js</h1>
    <Button >Button Shadcn</Button>
    </>
  );
}
