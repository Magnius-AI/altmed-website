import { MenuEditor } from "@/components/admin/MenuEditor";
import { getNavigationMenu } from "@/lib/api";
import { updateNavigationMenuAction } from "./actions";

export default async function AdminMenusPage() {
  const menu = await getNavigationMenu();

  return <MenuEditor initialMenu={menu} action={updateNavigationMenuAction} />;
}
