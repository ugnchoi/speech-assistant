import { redirect } from "next/navigation";

export default function WhatThisIsRedirectPage() {
  redirect("/prototype?step=what-this-is");
}
