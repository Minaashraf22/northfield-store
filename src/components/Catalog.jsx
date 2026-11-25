import React, { useState } from 'react'
import { PRODUCTS } from '../products.js'
import ProductCard from './ProductCard.jsx'

export default function Catalog({ onAdd }) {
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('featured')
  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))]
  let list = PRODUCTS.filter(p => cat === 'All' || p.category === cat)
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  return (
    <main>
      <div className="bar">
        <div className="chips">{cats.map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
        <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      <div className="grid">{list.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}</div>
    </main>
  )
}
