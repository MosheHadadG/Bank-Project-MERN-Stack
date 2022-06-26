import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user/user.model.js';

const authentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, 'BankAPICode!');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

    if(!user) throw new Error();
    req.token = token;
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({error: 'Please Authenticate.'})
  }
}

export { authentication }