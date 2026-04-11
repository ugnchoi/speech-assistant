import { redirect } from "next/navigation";

export default function SermonInputRedirectPage() {
  redirect("/prototype?step=sermon-input");
}
