import React from 'react'
export default function Header({ count, onOpen }) {
  return (
    <header className="top">
      <div className="brand"><img src="logo.svg" alt="" /> Northfield Goods</div>
      <button className="cartbtn" onClick={onOpen} aria-label="Open cart">Cart <b data-testid="count">{count}</b></button>
    </header>
  )
}
