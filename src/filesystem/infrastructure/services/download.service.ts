/**
 * Download Service
 */

import { File, Paths, Directory } from "expo-file-system";
import type { FileOperationResult } from "../../domain/entities/File";
import { FileUtils } from "../../domain/entities/File";
import { SUPPORTED_DOWNLOAD_EXTENSIONS, DEFAULT_DOWNLOAD_EXTENSION } from "./download.constants";
import type { DownloadProgressCallback, DownloadWithProgressResult } from "./download.types";

const hashUrl = (url: string) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  return Math.abs(hash).toString(36);
};

const getExt = (url: string) => {
  const parts = url.split("?")[0]?.split(".") || [];
  const ext = parts.length > 1 ? parts.pop()?.toLowerCase() || DEFAULT_DOWNLOAD_EXTENSION : DEFAULT_DOWNLOAD_EXTENSION;
  return (SUPPORTED_DOWNLOAD_EXTENSIONS as readonly string[]).includes(ext) ? ext : DEFAULT_DOWNLOAD_EXTENSION;
};

const getCacheUri = (url: string, dir: string) => FileUtils.joinPaths(dir, `cached_${hashUrl(url)}.${getExt(url)}`);

export async function downloadFile(url: string, dest?: string): Promise<FileOperationResult> {
  try {
    const destination = dest ? new File(dest) : new File(Paths.document, FileUtils.generateUniqueFilename("download"));
    const res = await File.downloadFileAsync(url, destination, { idempotent: true });
    return { success: true, uri: res.uri };
  } catch (e: unknown) { return { success: false, error: e instanceof Error ? e.message : String(e) }; }
}

export async function downloadFileWithProgress(url: string, cacheDir: string, onProgress?: DownloadProgressCallback): Promise<DownloadWithProgressResult> {
  try {
    const dir = new Directory(cacheDir);
    if (!dir.exists) dir.create({ intermediates: true, idempotent: true });

    const destUri = getCacheUri(url, cacheDir);
    if (new File(destUri).exists) return { success: true, uri: destUri, fromCache: true };

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const totalBytes = parseInt(response.headers.get("content-length") || "0", 10);
    if (!response.body) return { ...(await downloadFile(url, destUri)), fromCache: false };

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      onProgress?.({ totalBytesWritten: received, totalBytesExpectedToWrite: totalBytes || received });
    }

    const all = new Uint8Array(received);
    let pos = 0;
    for (const c of chunks) { all.set(c, pos); pos += c.length; }
    new File(destUri).write(all);

    return { success: true, uri: destUri, fromCache: false };
  } catch (e: unknown) { return { success: false, error: e instanceof Error ? e.message : String(e) }; }
}

export const isUrlCached = (url: string, dir: string) => new File(getCacheUri(url, dir)).exists;
export const getCachedFileUri = (url: string, dir: string) => isUrlCached(url, dir) ? getCacheUri(url, dir) : null;
export const deleteCachedFile = (url: string, dir: string) => {
  const f = new File(getCacheUri(url, dir));
  if (f.exists) f.delete();
  return true;
};
