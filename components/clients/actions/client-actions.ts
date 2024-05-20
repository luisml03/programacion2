'use server'

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";


export const createClient = async( Nombre: string, Correo: string, Telefono: string, Direccion: string, Ciudad: string, Pais: string ) => {
    const client = await prisma.clientes.create({ data: { Nombre, Correo, Telefono, Direccion, Ciudad, Pais } });
    revalidatePath('/clients');
    return client;
  }

  export const deleteCompleted = async(ids: number[]) => {
    await prisma.clientes.deleteMany({ where: { IDCliente: {in: ids},}});
    revalidatePath('/clients');
  
  }

  export const UpdataClient = async( IDCliente: number, Nombre?: string, Correo?: string, Telefono?: string | null, Direccion?: string | null, Ciudad?: string | null, Pais?: string | null  ) => {

    
    const todo = await prisma.clientes.findFirst({ where: { IDCliente } });
  
    if ( !todo ) {
      throw `Todo con id ${ IDCliente } no encontrado`;
    }
  
    const updatedTodo = await prisma.clientes.update({ where: { IDCliente }, data:{ Nombre, Correo, Telefono, Direccion, Ciudad, Pais }});
    revalidatePath('/clients');
    return updatedTodo;
  
  }
   