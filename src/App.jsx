import React, { useState } from 'react'
import { useCart } from './hooks/useCart.js'
import Header from './components/Header.jsx'
import Catalog from './components/Catalog.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  const cart = useCart()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Header count={cart.count} onOpen={() => setOpen(true)} />
      <section className="hero"><h1>Everyday things, made well.</h1><p>A demo storefront. Fictional brand, AI-generated product images. No payments are taken.</p></section>
      <Catalog onAdd={cart.add} />
      <footer>Northfield Goods is a fictional brand created for this portfolio demo.</footer>
      {open && <CartDrawer cart={cart} onClose={() => setOpen(false)} />}
    </div>
  )
}
