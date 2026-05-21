export const getRating = ({ rating }: { rating: number }) => {
  const ratingText = `${'★'.repeat(Math.round(rating))} ${rating.toFixed(1)}`;

  return {
    ratingText,
  };
};
