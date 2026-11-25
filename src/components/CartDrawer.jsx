import React, { useState } from 'react'
import CartView from './CartView.jsx'
import CheckoutForm from './CheckoutForm.jsx'
import OrderConfirmation from './OrderConfirmation.jsx'

const TITLES = { cart: 'Your cart', checkout: 'Checkout', done: 'Thank you' }

export default function CartDrawer({ cart, onClose }) {
  const [step, setStep] = useState('cart')
  const [order, setOrder] = useState(null)
  const place = form => {
    setOrder({ id: 'NF-' + (1000 + Math.floor(Math.random() * 9000)), total: cart.t.total, count: cart.count, name: form.name.trim() })
    cart.reset(); setStep('done')
  }
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label="Cart">
        <div className="dh"><h2>{TITLES[step]}</h2><button onClick={onClose} aria-label="Close">✕</button></div>
        {step === 'cart' && <CartView cart={cart} onCheckout={() => setStep('checkout')} />}
        {step === 'checkout' && <CheckoutForm total={cart.t.total} onBack={() => setStep('cart')} onPlace={place} />}
        {step === 'done' && order && <OrderConfirmation order={order} onClose={onClose} />}
      </aside>
    </>
  )
}
