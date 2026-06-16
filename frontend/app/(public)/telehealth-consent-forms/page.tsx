import { permanentRedirect } from "next/navigation";
import { publicRoutes } from "@/lib/site-content";

export default function TelehealthConsentPage() {
  permanentRedirect(`${publicRoutes.telehealth}#telehealth-consent`);
}
