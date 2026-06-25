export const getBrandInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
