export const getProductCardMeta = ({ discount, rating }: { discount: string; rating: number }) => {
  const discountValue = Number(String(discount).replace(/[^0-9.]/g, '')) || 0;
  const showDiscount = discountValue > 0;
  const ratingText = `${'★'.repeat(Math.round(rating))} ${rating.toFixed(1)}`;

  return {
    showDiscount,
    ratingText,
  };
};
