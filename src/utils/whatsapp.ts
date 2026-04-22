
/**
 * Generates a WhatsApp URL with a pre-filled message for an order.
 */
export const generateWhatsAppOrderUrl = (
  items: Array<{ name: string; qty: number; price: number; image?: string }>,
  total: number,
  shopPhone: string
) => {
  let msg = `🛒 *New Order Inquiry*\n\n`;
  
  items.forEach((item) => {
    msg += `▸ ${item.name} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString()}\n`;
    if (item.image) {
      msg += `  🖼️ Image: ${item.image}\n`;
    }
    msg += `\n`;
  });
  
  msg += `💰 *Total Amount: ₹${total.toLocaleString()}*\n\n`;
  msg += `Hello! I would like to know more about /order the items listed above. Please let me know more.`;

  const cleanPhone = shopPhone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
};
