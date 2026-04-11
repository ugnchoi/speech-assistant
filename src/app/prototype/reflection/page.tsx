import { redirect } from "next/navigation";

export default function ReflectionRedirectPage() {
  redirect("/prototype?step=reflection");
}
