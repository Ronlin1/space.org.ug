import { notFound } from "next/navigation";
import { AdminFrame } from "@/components/admin/admin-frame";
import { AdminResourceForm } from "@/components/admin/admin-resource-form";
import { createResourceAction } from "@/lib/admin/actions";
import { getResourceConfig } from "@/lib/admin/resources";

export const dynamic = "force-dynamic";

type NewResourcePageProps = {
  params: Promise<{
    resource: string;
  }>;
};

export default async function NewResourcePage({ params }: NewResourcePageProps) {
  const { resource } = await params;
  const config = getResourceConfig(resource);

  if (!config || config.allowCreate === false) {
    notFound();
  }

  const action = createResourceAction.bind(null, config.slug);

  return (
    <AdminFrame
      description={`Create a new ${config.singularLabel.toLowerCase()} record in the Space Uganda database.`}
      title={`New ${config.singularLabel}`}
    >
      <AdminResourceForm action={action} cancelHref={`/admin/${config.slug}`} config={config} />
    </AdminFrame>
  );
}
