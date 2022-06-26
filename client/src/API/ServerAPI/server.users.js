import axios from 'axios';

const baseURL = 'https://bank-server-moshehadad.herokuapp.com/users';


export const loginUser = async (userLogin) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userLogin);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const createNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/create-user`, newUser);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const getUserAccounts = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/my-accounts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const accounts = response.data;
    return accounts;
  } catch (err) {
    return err;
  }
}

export const getUserWithdrawals = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/withdraw`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const withdrawals = response.data;
    return withdrawals;
  } catch (err) {
    return err;
  } 
}

export const transferFromUserSpecificAccount = async(token, {fromAccountID, toAccountID, amount}) => {
  try {
    const response = await axios.post(`${baseURL}/transfer/${fromAccountID}`, {toAccountID, amount}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const transferDetails = response.data;
    return transferDetails;
  } catch (err) {
    return err;
  }
}

export const depositToUserSpecificAccount = async (token, {accountID, cash}) => {
  try {
    const response = await axios.patch(`${baseURL}/my-accounts/${accountID}`, { cash }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const depositDetails = response.data;
    return depositDetails;
  } catch (err) {
    return err;
  }
}


export const withdrawFromMySpecificAccount = async (token, {accountID, amount})=> {
  try {
    const response = await axios.post(`${baseURL}/withdraw/${accountID}`, { amount }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const withdrawDetails = response.data;
    return withdrawDetails;
  } catch (err) {
    return err;
  }

}

export const logoutUser = async (token) => {
    await axios.post(`${baseURL}/logout`, null , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}