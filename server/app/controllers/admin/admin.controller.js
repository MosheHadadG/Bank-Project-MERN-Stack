import { User } from "../../models/user/user.model.js";
import { Account } from "../../models/account/account.model.js";


export const createNewUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = new User(userBody);
    const savedUser = await newUser.save();
    res.send(savedUser)
    
  } catch (err) {
    res.status(400).send(err);
  }
}

export const createNewAccount = async (req, res) => {
  const accountBody = req.body;
  try {
    const newAccount = new Account(accountBody);
    const savedAccount = await newAccount.save();
    res.send(savedAccount)

  } catch (err) {
    res.status(400).send(err);
  }
}

export const getSpecificUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if(!user) return res.status(404).send({error: "User No Found"})
    res.send(user);

  } catch (err) {
    res.send(err)
  }
}

export const getSpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  try {
    const account = await Account.findById(accountID);
    if (!account) return res.status(404).send({error: "Account No Found"});
    res.send(account);

  } catch (err) {
    res.send(err);
  }
}
