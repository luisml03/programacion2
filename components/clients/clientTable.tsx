// components/ClientTable.tsx

"use client";
import { useEffect, useState } from "react";
import { Checkbox, Table, Button } from "flowbite-react";
import { Clientes } from '@prisma/client';
import { CreateComponent } from "./modals/Create";
import { deleteCompleted } from "./actions/client-actions";
import { ModifyComponent } from "@/components/clients/modals/modify";
import { PaginationComponent } from "../generalComponents/pagination";
import { ExportButton } from "../generalComponents/exportExcel";
import { ExportWordButton } from "../generalComponents/exportWord";

// Define the response structure from your API
interface ApiResponse {
  clientes: Clientes[];
  totalClientes: number;
  totalPages: number;
  currentPage: number;
}

interface Props {
  Clients: Clientes[];
  name: string;
}

const fetchClientes = async (page: number) => {
  const res = await fetch(`/api/clientes?page=${page}`);
  const data: ApiResponse = await res.json();
  return data;
};

export const ClientTable = ({Clients, name}: Props) => {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const reportUrl = `http://localhost:3500/reports/bill?user=${name}`

  useEffect(() => {
    const loadClientes = async () => {
      const data = await fetchClientes(currentPage);
      setClientes(data.clientes);
      setTotalPages(data.totalPages);
    };

    loadClientes();
  }, [currentPage]);

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
      await deleteCompleted(selectedClientIds);
      alert('Clientes borrados exitosamente');
    } catch (error) {
      console.error(error);
      alert('error en el proceso');
    }
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex mx-2 my-2 items-center gap-4">
          <CreateComponent />
          <Button color="failure" onClick={deleteClients}>Borrar usuarios</Button>
          <Button color="gray" href={reportUrl} >Ver reporte</Button>
          <ExportButton data={Clients} />
          <ExportWordButton data={Clients} />
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    setSelectedClientIds(clientes.map((cliente) => cliente.IDCliente));
                  } else {
                    setSelectedClientIds([]);
                  }
                }}
              />
            </Table.HeadCell>
            <Table.HeadCell>Client Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Dirección</Table.HeadCell>
            <Table.HeadCell>Ciudad</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {clientes.map((cliente) => (
              <Table.Row key={cliente.IDCliente} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox
                    checked={selectedClientIds.includes(cliente.IDCliente)}
                    onChange={(e) => handleCheckboxChange(cliente.IDCliente, e.target.checked)}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cliente.Nombre}
                </Table.Cell>
                <Table.Cell>{cliente.Correo}</Table.Cell>
                <Table.Cell>{cliente.Telefono}</Table.Cell>
                <Table.Cell>{cliente.Direccion}</Table.Cell>
                <Table.Cell>{cliente.Ciudad}</Table.Cell>
                <Table.Cell>
                  <ModifyComponent id={cliente.IDCliente} name={cliente.Nombre} correo={cliente.Correo} phone={cliente.Telefono} address={cliente.Direccion} city={cliente.Ciudad} country={cliente.Pais} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </>
  );
};
