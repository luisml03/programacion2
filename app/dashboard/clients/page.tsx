

import prisma from "@/libs/prisma";
import {auth}  from '@/auth'
import { ClientTable } from "@/components/clients/clientTable";
export default async function Page() {
  const clients = await prisma.clientes.findMany();
  const session = await auth();
  console.log(session)
  const user = session?.user?.name;
  return (
    <div className="flex">
    <ClientTable Clients={clients} name={user || ''}/>
    </div>
  );
}
