export const getBrandInitials = (name: string) => {
  const trimmedName = name.trim();
  if (!trimmedName) return 'B';
  const [firstName, secondName] = trimmedName.split(' ');
  const firstInitial = firstName[0].toUpperCase();
  if (!secondName) return `${firstInitial}`;
  const secondInitial = secondName[0].toUpperCase();
  return `${firstInitial}${secondInitial}`;
};
