import { redirect } from "next/navigation";

export default function ReflectionQuestionRedirectPage() {
  redirect("/prototype?step=reflection-question");
}
