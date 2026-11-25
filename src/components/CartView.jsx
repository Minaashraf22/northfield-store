import React from 'react'
import { FREE_SHIPPING_FROM } from '../products.js'
import { n0 } from '../format.js'

export default function CartView({ cart, onCheckout }) {
  const { lines, t, setQty, promoIn, setPromoIn, promo, promoMsg, applyPromo } = cart
  if (lines.length === 0) return <p className="empty">Your cart is empty.</p>
  return (
    <>
      <ul className="lines">{lines.map(l => (
        <li key={l.id}><img src={l.img} alt="" /><div><b>{l.name}</b><small>{n0(l.price)} EGP</small>
          <div className="qty"><button aria-label={'Decrease ' + l.name} onClick={() => setQty(l.id, l.qty - 1)}>−</button><span>{l.qty}</span><button aria-label={'Increase ' + l.name} onClick={() => setQty(l.id, l.qty + 1)}>+</button></div></div>
          <b>{n0(l.price * l.qty)}</b></li>))}</ul>
      <div className="promo"><input placeholder="Promo code" value={promoIn} onChange={e => setPromoIn(e.target.value)} /><button className="btn alt" onClick={applyPromo}>Apply</button></div>
      {promoMsg && <p className={promo ? 'good' : 'bad'} data-testid="promomsg">{promoMsg}</p>}
      <dl className="sum">
        <dt>Subtotal</dt><dd data-testid="subtotal">{n0(t.subtotal)} EGP</dd>
        {t.discount > 0 && <><dt>Discount</dt><dd data-testid="discount">−{n0(t.discount)} EGP</dd></>}
        <dt>Shipping</dt><dd data-testid="shipping">{t.shipping ? n0(t.shipping) + ' EGP' : 'Free'}</dd>
        <dt className="tot">Total</dt><dd className="tot" data-testid="total">{n0(t.total)} EGP</dd>
      </dl>
      {t.shipping > 0 && <p className="hint">Free shipping from {n0(FREE_SHIPPING_FROM)} EGP</p>}
      <button className="btn wide" onClick={onCheckout}>Checkout</button>
    </>
  )
}
