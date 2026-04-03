import { spawn } from "node:child_process";

const args = ["exec", "prisma", "db", "push", "--config", "prisma.config.ts"];

const child = spawn("pnpm", args, {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    DEBUG: process.env.DEBUG ?? "prisma:*",
    RUST_LOG: process.env.RUST_LOG ?? "info",
    RUST_BACKTRACE: process.env.RUST_BACKTRACE ?? "1",
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
