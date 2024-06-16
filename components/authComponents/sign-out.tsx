'use client'

import { Button } from "flowbite-react"
import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <Button onClick={() => signOut()}>Signout</Button>
}