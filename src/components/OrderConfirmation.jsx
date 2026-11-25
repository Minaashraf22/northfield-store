import React from 'react'
import { n0 } from '../format.js'
export default function OrderConfirmation({ order, onClose }) {
  return (
    <div className="ok" data-testid="confirm"><h3>Order {order.id} placed</h3>
      <p>Thanks {order.name}. {order.count} item(s), total {n0(order.total)} EGP, pay on delivery. This is a demo, no order was sent.</p>
      <button className="btn wide" onClick={onClose}>Continue shopping</button></div>
  )
}
