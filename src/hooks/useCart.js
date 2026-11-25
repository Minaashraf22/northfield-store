import { useEffect, useState } from 'react'
import { PRODUCTS, totals, PROMOS } from '../products.js'

const load = () => { try { return JSON.parse(localStorage.getItem('nf-cart')) || {} } catch { return {} } }

// Cart state, persistence, promo handling and derived totals.
export function useCart() {
  const [cart, setCart] = useState(load)
  const [promoIn, setPromoIn] = useState('')
  const [promo, setPromo] = useState('')
  const [promoMsg, setPromoMsg] = useState('')
  useEffect(() => localStorage.setItem('nf-cart', JSON.stringify(cart)), [cart])

  const lines = PRODUCTS.filter(p => cart[p.id]).map(p => ({ ...p, qty: cart[p.id] }))
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const t = totals(lines, promo)
  const add = id => setCart(c => ({ ...c, [id]: Math.min(10, (c[id] || 0) + 1) }))
  const setQty = (id, q) => setCart(c => { const x = { ...c }; if (q <= 0) delete x[id]; else x[id] = Math.min(10, q); return x })
  const applyPromo = () => {
    const code = promoIn.trim().toUpperCase()
    if (PROMOS[code]) { setPromo(code); setPromoMsg(`${code} applied: ${PROMOS[code] * 100}% off`) }
    else { setPromo(''); setPromoMsg('Invalid code') }
  }
  const reset = () => { setCart({}); setPromo(''); setPromoIn(''); setPromoMsg('') }
  return { lines, count, t, add, setQty, promoIn, setPromoIn, promo, promoMsg, applyPromo, reset }
}
