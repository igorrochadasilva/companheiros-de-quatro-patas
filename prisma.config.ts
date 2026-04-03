import "dotenv/config";

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "backend/prisma/schema.prisma",
  datasource: {
    // Prisma CLI (generate/db push/migrate) usa conexao direta.
    url: env("DIRECT_URL"),
  },
});
