export function generateReference(title: string): string {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const randomId = Math.random().toString(36).substring(2, 15);
  return `${slug}-${randomId}`;
}

export function generatePath(parentPath: string | null, parentReference: string): string {
  return parentPath ? `${parentPath},${parentReference}` : `,${parentReference}`;
}

