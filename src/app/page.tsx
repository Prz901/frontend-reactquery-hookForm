'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from "./utils/react-query";
import { TableProducts } from '@/components/TableProducts';

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-24  text-white bg-zinc-800 ">
        <div className='container m-auto  flex items-center justify-start'>
          <TableProducts />
        </div>
      </main>
    </QueryClientProvider>
  );
}
