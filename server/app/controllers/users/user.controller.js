import { User } from "../../models/user/user.model.js";
import { Account } from "../../models/account/account.model.js";
import { tranfer, withdraw } from "../../utils/users.utils.js";
import { Tranfer } from "../../models/tranfer/transfer.model.js";
import { Withdraw } from "../../models/withdraw/withdraw.model.js";
import mongoose from "mongoose";

export const createNewUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = new User(userBody);
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });


  } catch (err) {
    res.status(400).send(err);
  }
}

export const createNewAccount = async (req, res) => {
  const accountBody = req.body;
  try {
    const newAccount = new Account({
      ...accountBody,
      owner: req.user._id
    })
    const account = await newAccount.save();
    res.status(201).send(account)

  } catch (err) {
    res.status(400).send(err);
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    if (!user) return res.send({ error: "Unable To Login" });
    const token = await user.generateAuthToken();
    res.send({ user, token })

  } catch (err) {
    res.send(err);
  }
}

export const logoutUser = async (req, res) => {
  try {
    const updatedTokens = req.user.tokens.filter((objToken) => objToken.token !== req.token);
    req.user.tokens = updatedTokens;
    await req.user.save();
    res.send();

  } catch (err) {
    res.send(err);
  }
}

export const logoutAnyDevice = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();

  } catch (err) {
    res.send(err);
  }

}


export const getMyProfile = async (req, res) => {
  res.send(req.user);
}

// /my-accounts?limit=3&skip=0 fetch 3 accounts page 1
// /my-accounts?limit=3&skip=3 fetch 3 accounts page 2
export const getMyAccounts = async (req, res) => {
  try {
    const userWithVirtualAccounts = await req.user.populate({
      path: 'accounts',
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      }
    });
    const accounts = userWithVirtualAccounts.accounts
    if (accounts.length === 0) return res.status(404).send({ error: "No accounts found" });
    res.send(accounts)

  } catch (err) {
    res.send(err);
  }
}

export const getMyWithdrawals = async (req, res) => {
  try {
    const myWithdrawals = await Withdraw.find({owner: req.user._id});
    if(myWithdrawals.length === 0) return res.status(404).send({ error: "No withdrawals found" })
    res.send(myWithdrawals);

  } catch (err) {
    res.send(err)
  }
}

export const getMySpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  try {
    const account = await Account.findOne({ _id: accountID, owner: req.user._id })
    if (!account) return res.status(404).send();
    res.send(account)

  } catch (err) {
    res.send(err);
  }
}

export const deleteMySpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  try {
    const account = await Account.findOneAndDelete({ _id: accountID, owner: req.user._id});
    if(!account) return res.status(404).send();
    res.send(account);

  } catch (err) {
    res.send(err);
  }
}

export const depositToMySpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['cash'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: "Invalid deposit!" });

  try {
    const account = await Account.findOne({ _id: accountID, owner: req.user._id });
    if (!account) return res.status(404).send();
    updates.forEach((update) => account[update] += req.body[update]);
    await account.save();
    res.send(account);

  } catch (err) {
    res.send(err);
  }
}

export const transferFromMySpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  const { toAccountID, amount } = req.body;

  try {
    const fromAccount = await Account.findOne({ _id: accountID, owner: req.user.id });
    if (!fromAccount) return res.status(404).send();

    const toAccount = await Account.findById(toAccountID);
    if (!toAccount) return res.status(404).send();

    const resultTranfer = tranfer(fromAccount, toAccount, amount);
    if (!resultTranfer) return res.status(400).send({ error: "The transfer failed" });

    await resultTranfer.fromAccount.save();
    await resultTranfer.toAccount.save();

    const fromAccountOwner = await fromAccount.populate('owner');
    const toAccountOwner = await toAccount.populate('owner');

    const newTransfer = new Tranfer({
       fromAccount:  fromAccount._id,
        nameSender: `${fromAccountOwner.owner.firstName} ${fromAccountOwner.owner.lastName}`,
         toAccount:  toAccount._id,
      NameReceiver: `${toAccountOwner.owner.firstName} ${toAccountOwner.owner.lastName}`,
            amount:  amount

    })

    await newTransfer.save();
    res.send(newTransfer);
  } catch (err) {
    res.send(err);
  }
}

export const withdrawFromMySpecificAccount = async (req, res) => {
  const accountID = req.params.id;
  const { amount } = req.body;

  try {
    const account = await Account.findOne({ _id: accountID, owner: req.user.id });
    if (!account) return res.status(404).send();

    const resultWithdraw = withdraw(account, amount);
    if (!resultWithdraw) return res.status(400).send({ error: "The withdraw failed" });


    const accountOwner = await account.populate('owner');

    const newWithdraw = new Withdraw({
                 owner:     accountOwner.owner._id,
           fromAccount:     account._id,
      NameAccountOwner:    `${accountOwner.owner.firstName} ${accountOwner.owner.lastName}`,
                amount:     amount
    })

    await newWithdraw.save();
    await account.save();
    res.send({ account, withdraw: newWithdraw });
  } catch (err) {
    res.send(err);
  }
}