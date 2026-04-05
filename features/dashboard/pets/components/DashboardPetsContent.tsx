import Link from "next/link";

import { listPetsAdmin } from "@/backend/modules/pets/application/list-pets-admin";
import { ADMIN_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { H3, Muted, Small } from "@/shared/ui/typography";

const dashboardMessages = messages.dashboard;
const petsMessages = dashboardMessages.pets;

type SearchParamValue = string | string[] | undefined;

type DashboardPetsContentProps = {
  searchParams: Record<string, SearchParamValue>;
};

function firstParam(value: SearchParamValue) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function toOptional(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function buildPageHref(
  searchParams: Record<string, SearchParamValue>,
  page: number,
) {
  const params = new URLSearchParams();
  const query = toOptional(firstParam(searchParams.query));
  const species = toOptional(firstParam(searchParams.species));
  const status = toOptional(firstParam(searchParams.status));
  const published = toOptional(firstParam(searchParams.published));

  if (query) params.set("query", query);
  if (species) params.set("species", species);
  if (status) params.set("status", status);
  if (published) params.set("published", published);
  params.set("page", String(page));

  const qs = params.toString();
  return qs ? `${ADMIN_ROUTES.pets}?${qs}` : ADMIN_ROUTES.pets;
}

function replacePageTemplate(
  template: string,
  page: number,
  totalPages: number,
) {
  return template
    .replace("{page}", String(page))
    .replace("{totalPages}", String(totalPages));
}

export async function DashboardPetsContent({
  searchParams,
}: DashboardPetsContentProps) {
  const pageRaw = Number(firstParam(searchParams.page) || "1");
  const query = toOptional(firstParam(searchParams.query));
  const species = toOptional(firstParam(searchParams.species));
  const status = toOptional(firstParam(searchParams.status));
  const published = toOptional(firstParam(searchParams.published));
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const response = await listPetsAdmin({
    page,
    pageSize: 20,
    query,
    species: species ?? null,
    status: status ?? null,
    published: published ?? null,
  });

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <H3 className="text-2xl">{petsMessages.title}</H3>
        <Muted>{petsMessages.subtitle}</Muted>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link href={ADMIN_ROUTES.petCreate}>{petsMessages.createCta}</Link>
        </Button>
        <Button asChild>
          <Link href={ADMIN_ROUTES.petsImport}>{petsMessages.importCta}</Link>
        </Button>
      </div>

      <form className="grid gap-3 rounded-xl border p-4 md:grid-cols-5">
        <div className="space-y-1">
          <Small>{petsMessages.filters.queryLabel}</Small>
          <input
            name="query"
            defaultValue={query ?? ""}
            placeholder={petsMessages.filters.queryPlaceholder}
            className="h-9 w-full rounded-md border border-input bg-input px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <Small>{petsMessages.filters.speciesLabel}</Small>
          <select
            name="species"
            defaultValue={species ?? ""}
            className="h-9 w-full rounded-md border border-input bg-input px-3 text-sm"
          >
            <option value="">{petsMessages.filters.all}</option>
            <option value="DOG">{petsMessages.speciesValues.DOG}</option>
            <option value="CAT">{petsMessages.speciesValues.CAT}</option>
            <option value="OTHER">{petsMessages.speciesValues.OTHER}</option>
          </select>
        </div>

        <div className="space-y-1">
          <Small>{petsMessages.filters.statusLabel}</Small>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="h-9 w-full rounded-md border border-input bg-input px-3 text-sm"
          >
            <option value="">{petsMessages.filters.all}</option>
            <option value="AVAILABLE">
              {petsMessages.statusValues.AVAILABLE}
            </option>
            <option value="RESERVED">
              {petsMessages.statusValues.RESERVED}
            </option>
            <option value="ADOPTED">{petsMessages.statusValues.ADOPTED}</option>
            <option value="TREATMENT">
              {petsMessages.statusValues.TREATMENT}
            </option>
          </select>
        </div>

        <div className="space-y-1">
          <Small>{petsMessages.filters.publishedLabel}</Small>
          <select
            name="published"
            defaultValue={published ?? ""}
            className="h-9 w-full rounded-md border border-input bg-input px-3 text-sm"
          >
            <option value="">{petsMessages.filters.all}</option>
            <option value="true">{petsMessages.filters.published}</option>
            <option value="false">{petsMessages.filters.unpublished}</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button type="submit" variant="outline" className="w-full">
            {petsMessages.filters.submit}
          </Button>
        </div>
      </form>

      {response.items.length === 0 ? (
        <div className="rounded-xl border p-4">
          <Muted>{petsMessages.table.empty}</Muted>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.name}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.species}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.status}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.city}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.published}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.featured}
                </th>
                <th className="px-3 py-2 text-left">
                  {petsMessages.table.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {response.items.map((pet) => (
                <tr key={pet.id} className="border-t">
                  <td className="px-3 py-2">{pet.name}</td>
                  <td className="px-3 py-2">
                    {
                      petsMessages.speciesValues[
                        pet.species as keyof typeof petsMessages.speciesValues
                      ]
                    }
                  </td>
                  <td className="px-3 py-2">
                    {
                      petsMessages.statusValues[
                        pet.status as keyof typeof petsMessages.statusValues
                      ]
                    }
                  </td>
                  <td className="px-3 py-2">{pet.city ?? "-"}</td>
                  <td className="px-3 py-2">
                    {pet.published
                      ? petsMessages.table.yes
                      : petsMessages.table.no}
                  </td>
                  <td className="px-3 py-2">
                    {pet.featured
                      ? petsMessages.table.yes
                      : petsMessages.table.no}
                  </td>
                  <td className="px-3 py-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={ADMIN_ROUTES.petDetail(pet.id)}>
                        {petsMessages.table.edit}
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Muted>
          {replacePageTemplate(
            petsMessages.pagination.page,
            response.page,
            response.totalPages,
          )}
        </Muted>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled={response.page <= 1}
          >
            <Link
              href={buildPageHref(searchParams, Math.max(1, response.page - 1))}
            >
              {petsMessages.pagination.previous}
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled={response.page >= response.totalPages}
          >
            <Link
              href={buildPageHref(
                searchParams,
                Math.min(response.totalPages, response.page + 1),
              )}
            >
              {petsMessages.pagination.next}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
