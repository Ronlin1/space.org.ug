import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { AdminFrame } from "@/components/admin/admin-frame";
import { AdminResourceForm } from "@/components/admin/admin-resource-form";
import { deleteResourceAction, updateResourceAction } from "@/lib/admin/actions";
import { getResourceRecord, serializeAdminRecord } from "@/lib/admin/records";
import { getResourceConfig } from "@/lib/admin/resources";

export const dynamic = "force-dynamic";

type EditResourcePageProps = {
  params: Promise<{
    id: string;
    resource: string;
  }>;
};

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  const { id, resource } = await params;
  const config = getResourceConfig(resource);

  if (!config) {
    notFound();
  }

  const record = await getResourceRecord(config, id);

  if (!record) {
    notFound();
  }

  const updateAction = updateResourceAction.bind(null, config.slug, id);
  const deleteAction = deleteResourceAction.bind(null, config.slug, id);

  return (
    <AdminFrame
      actions={
        config.allowDelete === false ? null : (
          <form action={deleteAction}>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-red-300/35 px-4 py-3 text-sm font-black text-red-100 transition hover:bg-red-500/15"
              type="submit"
            >
              <Trash2 aria-hidden="true" size={17} />
              Delete
            </button>
          </form>
        )
      }
      description={`Edit this ${config.singularLabel.toLowerCase()} record and save changes to the live database.`}
      title={`Edit ${config.singularLabel}`}
    >
      <AdminResourceForm
        action={updateAction}
        cancelHref={`/admin/${config.slug}`}
        config={config}
        record={serializeAdminRecord(record)}
      />
    </AdminFrame>
  );
}
