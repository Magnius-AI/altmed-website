import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-warm)]">
      <AdminSidebar />
      <div className="min-w-0 flex-1 bg-[var(--color-bg-gray)]">
        <AdminTopbar />
        <div className="p-3 lg:p-4">{children}</div>
      </div>
    </div>
  );
}
