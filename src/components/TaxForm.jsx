import React from 'react'

export const TaxForm = () => {
  return (
    <div> 
      <h1>Amount</h1>
      <input type="number" value={total} onChange={handleAmountChange}
      placeholder='Enter Amount'/>
      <p>Amount : {amountinWords }</p>
    </div>
  )
}
