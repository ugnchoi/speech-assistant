import { redirect } from "next/navigation";

export default function ClosingRedirectPage() {
  redirect("/prototype?step=closing");
}
