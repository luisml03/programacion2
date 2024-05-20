
"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import {  useState } from "react";
import { createClient } from "../actions/client-actions";

export function CreateComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setCiudad('');
    setPais('');
  }
  const handleSubmit = async() => {
   // console.log(nombre, email, telefono, direccion, ciudad, pais)
    
    try {
    await createClient(nombre, email, telefono, direccion, ciudad, pais);
    alert('Cliente ha sido creado')
    onCloseModal();
    } catch (error) {
        console.error('problemas en el proceso');
        alert('No se pudeo crear el cliente');
    }

  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Crear Usuario</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crear usuario</h3>
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
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="direccion" value="Dirección" />
              </div>
              <TextInput id="direccion" type="text" required
              value={direccion}
              onChange={(event) => setDireccion(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="ciudad" value="Ciudad" />
              </div>
              <TextInput id="ciudad" type="text" required 
              value={ciudad}
              onChange={(event) => setCiudad(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="pais" value="Pais" />
              </div>
              <TextInput id="pais" type="text" required 
              value={pais}
              onChange={(event) => setPais(event.target.value)}
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Crear Usuario</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
