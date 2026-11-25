export const PRODUCTS = [
  { id: 1, name: 'Court Sneaker', category: 'Footwear', price: 1850, img: 'p1.jpg' },
  { id: 2, name: 'Field Backpack', category: 'Bags', price: 1450, img: 'p2.jpg' },
  { id: 3, name: 'Matte Mug', category: 'Home', price: 220, img: 'p3.jpg' },
  { id: 4, name: 'Leather Wallet', category: 'Accessories', price: 640, img: 'p4.jpg' },
  { id: 5, name: 'Studio Headphones', category: 'Tech', price: 2400, img: 'p5.jpg' },
  { id: 6, name: 'Steel Bottle', category: 'Home', price: 380, img: 'p6.jpg' },
]
export const PROMOS = { WELCOME10: 0.1 }
export const FREE_SHIPPING_FROM = 1500
export const SHIPPING = 60
export function totals(lines, promo) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const discount = promo && PROMOS[promo] ? Math.round(subtotal * PROMOS[promo]) : 0
  const after = subtotal - discount
  const shipping = lines.length === 0 || after >= FREE_SHIPPING_FROM ? 0 : SHIPPING
  return { subtotal, discount, shipping, total: after + shipping }
}
