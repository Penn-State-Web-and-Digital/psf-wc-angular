export function serializeObjects(...objects: any[]): string[] {
  return objects.map((obj) => JSON.stringify(obj));
}
