
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { SignIn } from "../authComponents/sign-in";

export function NavbarComponent() {
  return (
    <Navbar fluid className="bg-gray-600">
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <img src="https://u-static.fotor.com/images/text-to-image/result/PRO-8b02599fdeb544ab9d4f9f11254bd210.jpg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-white text-xl font-semibold dark:text-white">Tarea Unidad 2</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active className="text-gray-200">
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#" className="text-white">
          About
        </NavbarLink>
        <NavbarLink href="/dashboard/clients" className="text-white">Services</NavbarLink>
        <NavbarLink href="#" className="text-white">Contact</NavbarLink>
        <SignIn/>
      </NavbarCollapse>
    </Navbar>
  );
}
