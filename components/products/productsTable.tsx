"use client";
import { useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";
import {Productos} from '@prisma/client';
//import { CreateComponent } from "./modals/Create";
//import { deleteCompleted } from "./actions/client-actions";
//import { ModifyComponent } from "@/components/clients/modals/modify";

interface Props {
	productos?: Productos[];
  }

export const ProductTable = ({productos = []}: Props) => {
	const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);

	const handleCheckboxChange = (id: number, isChecked: boolean) => {
	  setSelectedClientIds((prevSelectedClientIds) => {
		if (isChecked) {
		  return [...prevSelectedClientIds, id];
		} else {
		  return prevSelectedClientIds.filter((clientId) => clientId !== id);
		}
	  });
	};
	const deleteClients = async () => {
		try {
			//await deleteCompleted(selectedClientIds);
			alert('productos borrados exitosamente')
		} catch (error) {
			console.error(error);
			alert('error en el proceso');
		}

	};
  return (
	<>
	<div className="overflow-x-auto">
		<div className="flex mx-2 my-2 items-center gap-4">
	{/* <CreateComponent/>*/}	
	<Button color="failure" onClick={deleteClients}>Borrar Prodcutos</Button>
	</div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
		  <Checkbox
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  setSelectedClientIds(productos.map((producto) => producto.IDProducto));
                } else {
                  setSelectedClientIds([]);
                }
              }}
            />
          </Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Descripcion</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell className="max-[760px]:hidden">Stock</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        
        <Table.Body className="divide-y">
			{productos.map((producto) => (
          <Table.Row key={producto.IDProducto} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
			<Checkbox
                  checked={selectedClientIds.includes(producto.IDProducto)}
                  onChange={(e) => handleCheckboxChange(producto.IDProducto, e.target.checked)}
                />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {producto.Nombre}
            </Table.Cell>
            <Table.Cell>{producto.Descripci_n}</Table.Cell>
            <Table.Cell>{producto.Precio.toString()}</Table.Cell>
            <Table.Cell className="max-[760px]:hidden">{producto.Stock}</Table.Cell>
            <Table.Cell>
		{/*<ModifyComponent id={producto.IDProducto} name={producto.Nombre} correo={producto.Correo} phone={producto.Telefono} address={producto.Direccion} city={producto.Ciudad} country={producto.Pais}/> */}	
            </Table.Cell>
          </Table.Row>
			))}
        </Table.Body>
      </Table>
    </div>
	
	
	</>
  )
}