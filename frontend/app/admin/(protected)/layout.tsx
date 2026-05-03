import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-warm)]">
      <AdminSidebar />
      <div className="min-w-0 flex-1 bg-[radial-gradient(circle_at_top_left,rgba(22,122,91,0.08),transparent_28rem),linear-gradient(180deg,#fbfaf7_0%,#f6f8f7_38%,#f7f8f6_100%)]">
        <AdminTopbar />
        <div className="p-4 sm:p-5 lg:p-6 xl:p-7">{children}</div>
      </div>
    </div>
  );
}
