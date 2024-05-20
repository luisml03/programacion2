
import prisma from "@/libs/prisma";
import { ProductTable } from "@/components/products/productsTable";
export default async function Page() {
    const products = await prisma.productos.findMany();
  return (
    <div>
        <ProductTable productos={products}/>
    </div>
  )
}