"use client";

import { useMemo, useState } from "react";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import type { NavigationMenuItem } from "@/lib/site-content";

type Props = {
  initialMenu: NavigationMenuItem[];
  action: (formData: FormData) => void | Promise<void>;
};

function createItem(): NavigationMenuItem {
  return {
    id: `menu-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    label: "",
    href: ""
  };
}

export function MenuEditor({ initialMenu, action }: Props) {
  const [menu, setMenu] = useState<NavigationMenuItem[]>(initialMenu);

  const serialized = useMemo(() => JSON.stringify(menu), [menu]);

  function updateItem(index: number, patch: Partial<NavigationMenuItem>) {
    setMenu((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function updateChild(
    parentIndex: number,
    childIndex: number,
    patch: Partial<NavigationMenuItem>
  ) {
    setMenu((items) =>
      items.map((item, itemIndex) => {
        if (itemIndex !== parentIndex) {
          return item;
        }

        return {
          ...item,
          children: (item.children ?? []).map((child, currentIndex) =>
            currentIndex === childIndex ? { ...child, ...patch } : child
          )
        };
      })
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="menu" value={serialized} />
      <section className="admin-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="admin-label">Menu Builder</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Navigation with submenus</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
              Top-level items become the main navbar. Add children to turn an item into a dropdown.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMenu((items) => [...items, createItem()])}
            className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-neutral-700"
          >
            Add top-level item
          </button>
        </div>
      </section>

      {menu.map((item, index) => (
        <section key={item.id} className="admin-card p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              value={item.label}
              onChange={(event) => updateItem(index, { label: event.target.value })}
              placeholder="Menu label"
              className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            />
            <input
              type="text"
              value={item.href}
              onChange={(event) => updateItem(index, { href: event.target.value })}
              placeholder="/about"
              className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            />
            <button
              type="button"
              onClick={() => setMenu((items) => items.filter((_, itemIndex) => itemIndex !== index))}
              className="focus-ring rounded-xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-neutral-900">Dropdown items</div>
              <button
                type="button"
                onClick={() =>
                  updateItem(index, {
                    children: [...(item.children ?? []), createItem()]
                  })
                }
                className="focus-ring rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-neutral-700"
              >
                Add submenu item
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {(item.children ?? []).map((child, childIndex) => (
                <div key={child.id} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:grid-cols-[1fr_1fr_1.2fr_auto]">
                  <input
                    type="text"
                    value={child.label}
                    onChange={(event) =>
                      updateChild(index, childIndex, { label: event.target.value })
                    }
                    placeholder="Submenu label"
                    className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                  />
                  <input
                    type="text"
                    value={child.href}
                    onChange={(event) =>
                      updateChild(index, childIndex, { href: event.target.value })
                    }
                    placeholder="/services/urgent-care-manassas-va"
                    className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                  />
                  <input
                    type="text"
                    value={child.description ?? ""}
                    onChange={(event) =>
                      updateChild(index, childIndex, { description: event.target.value })
                    }
                    placeholder="Optional helper text"
                    className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateItem(index, {
                        children: (item.children ?? []).filter(
                          (_, currentIndex) => currentIndex !== childIndex
                        )
                      })
                    }
                    className="focus-ring rounded-xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <AdminSubmitButton
        className="focus-ring rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
        pendingLabel="Saving menu..."
      >
        Save navigation menu
      </AdminSubmitButton>
    </form>
  );
}
