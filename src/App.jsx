import React, { useEffect, useState } from 'react'
import { PRODUCTS, totals, PROMOS, FREE_SHIPPING_FROM } from './products.js'

const n0 = n => n.toLocaleString('en-US')
const load = () => { try { return JSON.parse(localStorage.getItem('nf-cart')) || {} } catch { return {} } }

export default function App() {
  const [cart, setCart] = useState(load)
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('featured')
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState('cart')
  const [promoIn, setPromoIn] = useState('')
  const [promo, setPromo] = useState('')
  const [promoMsg, setPromoMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '' })
  const [errs, setErrs] = useState({})
  const [order, setOrder] = useState(null)
  useEffect(() => localStorage.setItem('nf-cart', JSON.stringify(cart)), [cart])

  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))]
  let list = PRODUCTS.filter(p => cat === 'All' || p.category === cat)
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
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
  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!/^\+?[0-9 ]{8,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
    if (form.address.trim().length < 6) e.address = 'Enter your street address'
    if (!form.city) e.city = 'Choose a city'
    return e
  }
  const place = ev => {
    ev.preventDefault()
    const e = validate(); setErrs(e)
    if (Object.keys(e).length) return
    setOrder({ id: 'NF-' + (1000 + Math.floor(Math.random() * 9000)), total: t.total, count, name: form.name.trim() })
    setCart({}); setPromo(''); setPromoIn(''); setPromoMsg(''); setStep('done')
  }
  const close = () => { setOpen(false); setStep('cart'); setOrder(null) }
  const field = (k, label, props = {}) => (
    <label>{label}<input name={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} {...props} />{errs[k] && <em>{errs[k]}</em>}</label>
  )

  return (
    <div>
      <header className="top">
        <div className="brand"><img src="logo.svg" alt="" /> Northfield Goods</div>
        <button className="cartbtn" onClick={() => setOpen(true)} aria-label="Open cart">Cart <b data-testid="count">{count}</b></button>
      </header>
      <section className="hero"><h1>Everyday things, made well.</h1><p>A demo storefront. Fictional brand, AI-generated product images. No payments are taken.</p></section>
      <main>
        <div className="bar">
          <div className="chips">{cats.map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
          <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </select>
        </div>
        <div className="grid">
          {list.map(p => (
            <article key={p.id} className="prod">
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="info"><small>{p.category}</small><h3>{p.name}</h3>
                <div className="row"><b>{n0(p.price)} EGP</b><button className="btn" onClick={() => add(p.id)}>Add to cart</button></div></div>
            </article>
          ))}
        </div>
      </main>
      <footer>Northfield Goods is a fictional brand created for this portfolio demo.</footer>
      {open && <div className="overlay" onClick={close} />}
      {open && (
        <aside className="drawer" role="dialog" aria-label="Cart">
          <div className="dh"><h2>{step === 'cart' ? 'Your cart' : step === 'checkout' ? 'Checkout' : 'Thank you'}</h2><button onClick={close} aria-label="Close">✕</button></div>
          {step === 'cart' && (lines.length === 0 ? <p className="empty">Your cart is empty.</p> : <>
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
            <button className="btn wide" onClick={() => setStep('checkout')}>Checkout</button></>)}
          {step === 'checkout' && (
            <form onSubmit={place} noValidate>
              {field('name', 'Full name')}{field('email', 'Email', { type: 'email' })}{field('phone', 'Phone')}{field('address', 'Street address')}
              <label>City<select name="city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}><option value="">Choose…</option><option>Cairo</option><option>Giza</option><option>Alexandria</option></select>{errs.city && <em>{errs.city}</em>}</label>
              <p className="hint">Pay on delivery (demo). Total: <b>{n0(t.total)} EGP</b></p>
              <button className="btn wide" type="submit">Place order</button>
              <button type="button" className="link" onClick={() => setStep('cart')}>Back to cart</button>
            </form>)}
          {step === 'done' && order && <div className="ok" data-testid="confirm"><h3>Order {order.id} placed</h3><p>Thanks {order.name}. {order.count} item(s), total {n0(order.total)} EGP, pay on delivery. This is a demo, no order was sent.</p><button className="btn wide" onClick={close}>Continue shopping</button></div>}
        </aside>)}
    </div>
  )
}
