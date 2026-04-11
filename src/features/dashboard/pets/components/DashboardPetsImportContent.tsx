"use client";

import Link from "next/link";
import { type ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";

import { ADMIN_ROUTES, API_ROUTES } from "@/constants";
import { useImportPetsMutation } from "@/features/dashboard/pets/hooks/useImportPetsMutation";
import { buildPetsImportPreview } from "@/features/dashboard/pets/utils/pets-import-preview";
import { dashboardMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { H3, Muted, Small } from "@/shared/ui/typography";
import type { PetImportPreviewRow } from "@/types";
const importMessages = dashboardMessages.import;

export function DashboardPetsImportContent() {
  const importMutation = useImportPetsMutation();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [previewRows, setPreviewRows] = useState<PetImportPreviewRow[]>([]);
  const [fileName, setFileName] = useState("");

  const summary = useMemo(() => {
    const total = previewRows.length;
    const valid = previewRows.filter((row) => row.valid).length;
    const invalid = total - valid;
    return { total, valid, invalid };
  }, [previewRows]);

  async function parseFile(file: File) {
    const XLSX = await import("xlsx");
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];

    return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: "",
    });
  }

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      setRows([]);
      setPreviewRows([]);
      setFileName("");
      return;
    }

    try {
      const parsedRows = await parseFile(selectedFile);
      const preview = buildPetsImportPreview(parsedRows);
      setRows(parsedRows);
      setPreviewRows(preview);
      setFileName(selectedFile.name);
      toast.success(importMessages.fileLoaded);
    } catch {
      setRows([]);
      setPreviewRows([]);
      setFileName("");
      toast.error(importMessages.fileError);
    }
  }

  async function onImport() {
    if (summary.valid === 0) {
      toast.error(importMessages.noValidRows);
      return;
    }

    const result = await importMutation
      .mutateAsync({ items: rows })
      .catch(() => null);

    if (!result) {
      toast.error(importMessages.importError);
      return;
    }

    toast.success(
      importMessages.importSuccess
        .replace("{inserted}", String(result.inserted))
        .replace("{ignored}", String(result.ignored)),
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <H3 className="text-2xl">{importMessages.title}</H3>
        <Muted>{importMessages.subtitle}</Muted>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <a href={API_ROUTES.petsImportTemplate}>
            {importMessages.downloadTemplate}
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ADMIN_ROUTES.pets}>{importMessages.backToPets}</Link>
        </Button>
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        <Small>{importMessages.uploadLabel}</Small>
        <Input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={onFileChange}
          aria-label={importMessages.uploadLabel}
        />
        {fileName ? (
          <Muted>{importMessages.fileName.replace("{file}", fileName)}</Muted>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <Small>{importMessages.summary.total}</Small>
          <p className="text-2xl font-semibold">{summary.total}</p>
        </div>
        <div className="rounded-xl border p-4">
          <Small>{importMessages.summary.valid}</Small>
          <p className="text-2xl font-semibold text-emerald-700">
            {summary.valid}
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <Small>{importMessages.summary.invalid}</Small>
          <p className="text-2xl font-semibold text-destructive">
            {summary.invalid}
          </p>
        </div>
      </div>

      {previewRows.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">
                  {importMessages.preview.row}
                </th>
                <th className="px-3 py-2 text-left">
                  {importMessages.preview.name}
                </th>
                <th className="px-3 py-2 text-left">
                  {importMessages.preview.species}
                </th>
                <th className="px-3 py-2 text-left">
                  {importMessages.preview.status}
                </th>
                <th className="px-3 py-2 text-left">
                  {importMessages.preview.errors}
                </th>
              </tr>
            </thead>
            <tbody>
              {previewRows.slice(0, 50).map((row) => (
                <tr key={row.row} className="border-t">
                  <td className="px-3 py-2">{row.row}</td>
                  <td className="px-3 py-2">{String(row.data.name ?? "")}</td>
                  <td className="px-3 py-2">
                    {String(row.data.species ?? "")}
                  </td>
                  <td className="px-3 py-2">
                    {row.valid
                      ? importMessages.preview.valid
                      : importMessages.preview.invalid}
                  </td>
                  <td className="px-3 py-2">
                    {row.errors.length > 0 ? row.errors.join("; ") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <Button
        onClick={onImport}
        disabled={
          importMutation.isPending || summary.total === 0 || summary.valid === 0
        }
      >
        {importMutation.isPending
          ? importMessages.importing
          : importMessages.importButton}
      </Button>
    </section>
  );
}
