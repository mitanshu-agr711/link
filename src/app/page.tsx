import { redirect } from "next/navigation";
import { auth } from "./api/auth-utils";

export default async function HomePage() {
  const session = await auth();
  
  if (!session) {
    redirect("/auth/signin");
  }


  redirect("/dashboard");
}
