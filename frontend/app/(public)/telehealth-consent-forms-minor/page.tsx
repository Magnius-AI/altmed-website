import { permanentRedirect } from "next/navigation";
import { publicRoutes } from "@/lib/site-content";

export default function TelehealthMinorConsentPage() {
  permanentRedirect(`${publicRoutes.telehealth}#telehealth-consent`);
}
