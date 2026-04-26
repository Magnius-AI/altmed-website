import { Footer } from "@/components/public/Footer";
import { AnnouncementBanner } from "@/components/public/AnnouncementBanner";
import { Navbar } from "@/components/public/Navbar";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getAnnouncementBanner } from "@/lib/api";
import { buildClinicSchema, buildWebsiteSchema } from "@/lib/schema";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const announcement = await getAnnouncementBanner();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SchemaOrg schema={buildClinicSchema()} />
      <SchemaOrg schema={buildWebsiteSchema()} />
      <Navbar />
      <AnnouncementBanner announcement={announcement} />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
}
