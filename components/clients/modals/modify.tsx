
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { UpdataClient } from "../actions/client-actions";
interface Props {
    id: number;
    name: string;
    correo: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
}

export function ModifyComponent({id, name, correo, phone, address, city, country}:Props) {
  const [openModal, setOpenModal] = useState(false);
  const [nombre, setNombre] = useState(name);
  const [email, setEmail] = useState(correo);
  const [telefono, setTelefono] = useState(phone);
  const [direccion, setDireccion] = useState(address);
  const [ciudad, setCiudad] = useState(city);
  const [pais, setPais] = useState(country);

  function onCloseModal() {
    setOpenModal(false);
  
  }
  const handleSubmit = async() => {
     console.log(nombre, email, telefono, direccion, ciudad, pais)
     try {
     await UpdataClient(id, nombre, email, telefono, direccion, ciudad, pais);
     alert('Cliente ha sido actualizado')
    onCloseModal();
     } catch (error) {
         console.error('problemas en el proceso');
         alert('No se pudeo crear el cliente');
     }
 
   }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Edit</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modificar usuario</h3>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" value="Nombre" />
              </div>
              <TextInput
                id="name"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="email" value="Correo" />
              </div>
              <TextInput id="email" type="email" required 
              value={email}
               onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="telefono" value="Telefono" />
              </div>
              <TextInput id="telefono" type="text" required
              value={telefono || ""}
              onChange={(event) => setTelefono(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="direccion" value="Dirección" />
              </div>
              <TextInput id="direccion" type="text" required
              value={direccion || ""}
              onChange={(event) => setDireccion(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="ciudad" value="Ciudad" />
              </div>
              <TextInput id="ciudad" type="text" required 
              value={ciudad || ""}
              onChange={(event) => setCiudad(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="pais" value="Pais" />
              </div>
              <TextInput id="pais" type="text" required 
              value={pais || ""}
              onChange={(event) => setPais(event.target.value)}
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Actualizar</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
