import { redirect } from "next/navigation";

export default function SuggestionRedirectPage() {
  redirect("/prototype?step=suggestion");
}
