

import prisma from "@/libs/prisma";
import { ClientTable } from "@/components/clients/clientTable";
export default async function Page() {
  const clients = await prisma.clientes.findMany();
  return (
    <div className="flex">
    <ClientTable clientes={clients}/>
    </div>
  );
}
