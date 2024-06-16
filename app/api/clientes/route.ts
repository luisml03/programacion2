import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '5');

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [clientes, totalClientes] = await Promise.all([
    prisma.clientes.findMany({
      skip: skip,
      take: take,
      orderBy: {
        IDCliente: 'asc', // Ordenar por el ID en orden ascendente
      },
    }),
    prisma.clientes.count(),
  ]);

  console.log(totalClientes)

  return NextResponse.json({
    clientes,
    totalClientes,
    totalPages: Math.ceil(totalClientes / take),
    currentPage: page,
  });
}
