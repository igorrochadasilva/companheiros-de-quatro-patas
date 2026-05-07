import { buildJsonLdScriptProps } from "@/shared/lib";

type JsonLdScriptProps = {
  data: unknown;
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return <script {...buildJsonLdScriptProps(data)} />;
}
