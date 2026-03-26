import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

export async function savePlatformUpload(
  file: File,
  category: "documents" | "reports",
) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadRoot = path.join(process.cwd(), "public", "platform", "uploads", category);
  await mkdir(uploadRoot, { recursive: true });

  const timestamp = Date.now();
  const safeName = sanitizeFileName(file.name || `${category}-${timestamp}`);
  const finalName = `${timestamp}-${safeName}`;
  const absolutePath = path.join(uploadRoot, finalName);

  await writeFile(absolutePath, buffer);

  return {
    fileName: finalName,
    fileUrl: `/platform/uploads/${category}/${finalName}`,
  };
}
