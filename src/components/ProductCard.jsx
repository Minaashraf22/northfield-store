import React from 'react'
import { n0 } from '../format.js'
export default function ProductCard({ p, onAdd }) {
  return (
    <article className="prod">
      <img src={p.img} alt={p.name} loading="lazy" />
      <div className="info"><small>{p.category}</small><h3>{p.name}</h3>
        <div className="row"><b>{n0(p.price)} EGP</b><button className="btn" onClick={() => onAdd(p.id)}>Add to cart</button></div></div>
    </article>
  )
}
