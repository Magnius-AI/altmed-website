import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#f4f8fa_0%,#eef6f7_48%,#f8fbfb_100%)]">
      <AdminSidebar />
      <div className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(0,166,166,0.08),_transparent_26%),linear-gradient(180deg,#f8fbfb_0%,#f2f7f8_100%)]">
        <AdminTopbar />
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
