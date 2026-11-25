import React, { useState } from 'react'
import { validateCheckout } from '../validation.js'
import { n0 } from '../format.js'

export default function CheckoutForm({ total, onBack, onPlace }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '' })
  const [errs, setErrs] = useState({})
  const submit = ev => {
    ev.preventDefault()
    const e = validateCheckout(form); setErrs(e)
    if (!Object.keys(e).length) onPlace(form)
  }
  const field = (k, label, props = {}) => (
    <label>{label}<input name={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} {...props} />{errs[k] && <em>{errs[k]}</em>}</label>
  )
  return (
    <form onSubmit={submit} noValidate>
      {field('name', 'Full name')}{field('email', 'Email', { type: 'email' })}{field('phone', 'Phone')}{field('address', 'Street address')}
      <label>City<select name="city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}><option value="">Choose…</option><option>Cairo</option><option>Giza</option><option>Alexandria</option></select>{errs.city && <em>{errs.city}</em>}</label>
      <p className="hint">Pay on delivery (demo). Total: <b>{n0(total)} EGP</b></p>
      <button className="btn wide" type="submit">Place order</button>
      <button type="button" className="link" onClick={onBack}>Back to cart</button>
    </form>
  )
}
