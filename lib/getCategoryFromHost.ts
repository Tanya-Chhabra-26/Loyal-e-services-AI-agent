export function getCategoryFromHost(host: string): string {
  const parts = host.split('.');
  if (parts.length > 2) return parts[0]; // e.g., animation.localhost
  return 'main'; // fallback
}
