
import { signIn } from "@/auth";
import { FaGithub } from "react-icons/fa";
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard/clients" })
      }}
    >
      <button type="submit"><FaGithub size={25} color="white"/></button>
    </form>
  )
} 