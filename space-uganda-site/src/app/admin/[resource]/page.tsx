import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { AdminFrame } from "@/components/admin/admin-frame";
import { formatAdminValue, listResourceRecords } from "@/lib/admin/records";
import { getResourceConfig } from "@/lib/admin/resources";

export const dynamic = "force-dynamic";

type ResourceListPageProps = {
  params: Promise<{
    resource: string;
  }>;
};

export default async function ResourceListPage({ params }: ResourceListPageProps) {
  const { resource } = await params;
  const config = getResourceConfig(resource);

  if (!config) {
    notFound();
  }

  const records = await listResourceRecords(config);

  return (
    <AdminFrame
      actions={
        config.allowCreate === false ? null : (
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-ugandaGold px-4 py-3 text-sm font-black text-ink transition hover:bg-white"
            href={`/admin/${config.slug}/new`}
          >
            <Plus aria-hidden="true" size={17} />
            New {config.singularLabel}
          </Link>
        )
      }
      description={config.description}
      title={config.label}
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-white/[0.08] text-xs font-black uppercase tracking-normal text-white/55">
              <tr>
                <th className="px-4 py-3">Record</th>
                {config.listFields.map((field) => (
                  <th className="px-4 py-3" key={field}>
                    {field}
                  </th>
                ))}
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {records.map((record) => (
                <tr className="align-top text-white/75" key={record.id}>
                  <td className="px-4 py-4">
                    <p className="font-mono text-xs text-white/45">{record.id}</p>
                  </td>
                  {config.listFields.map((field) => (
                    <td className="max-w-xs px-4 py-4" key={field}>
                      <span className="line-clamp-3">{formatAdminValue(record[field])}</span>
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <Link
                      className="rounded-md border border-white/15 px-3 py-2 text-xs font-black text-white transition hover:border-ugandaGold hover:text-ugandaGold"
                      href={`/admin/${config.slug}/${record.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {records.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-sm font-bold text-white/55"
                    colSpan={config.listFields.length + 2}
                  >
                    No records yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminFrame>
  );
}
