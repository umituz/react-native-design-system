interface FileWithType {
  readonly type: string;
}

export async function getMediaDuration(file: FileWithType): Promise<number | undefined> {
  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    return Math.floor(Math.random() * 60) + 10;
  }
  return undefined;
}

export function generateThumbnail(file: FileWithType): string | undefined {
  if (file.type.startsWith("video/")) {
    return `https://picsum.photos/200/150?random=${Date.now()}`;
  }
  return undefined;
}
