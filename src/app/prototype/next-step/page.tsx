import { redirect } from "next/navigation";

export default function NextStepRedirectPage() {
  redirect("/prototype?step=next-step");
}
