import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f5f8fa]">
      <AdminSidebar />
      <div className="flex-1 bg-[#f6f9fb]">
        <AdminTopbar />
        <div className="p-4 sm:p-5 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
