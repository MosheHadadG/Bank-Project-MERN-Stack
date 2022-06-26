import React from 'react'



function CardWithdraw({ withdraw }) {

  const { _id, fromAccount, NameAccountOwner, amount, date } = withdraw;
  return (
    <div key={_id} className='account'>
      <h5>From Account: {fromAccount}</h5>
      <h5>Name Account Owner: {NameAccountOwner}</h5>
      <h5>amount: {amount}₪</h5>
      <h5>date: {date}</h5>
    </div>
  )
}

export default CardWithdraw;