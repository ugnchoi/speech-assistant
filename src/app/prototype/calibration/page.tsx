import { redirect } from "next/navigation";

export default function CalibrationRedirectPage() {
  redirect("/prototype?step=calibration");
}
