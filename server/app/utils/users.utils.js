export const tranfer = (fromAccount, toAccount, amount) => {
  if (fromAccount.cash + fromAccount.credit >= amount) {
    toAccount.cash += amount;
    if (fromAccount.cash - amount <= 0) {
      amount -= fromAccount.cash;
      fromAccount.cash = 0;
      fromAccount.credit -= amount;
    }
    else {
      fromAccount.cash -= amount;
    }
    return {fromAccount, toAccount}

  }
  else return false;
}

export const withdraw = (userAccount, amount) => {
  if (userAccount.cash + userAccount.credit >= amount) {
    if (userAccount.cash - amount <= 0) {
      amount -= userAccount.cash;
      userAccount.cash = 0;
      userAccount.credit -= amount;
    } 
    else userAccount.cash -= amount;

    return {userAccount};
  } 
  else return false
}