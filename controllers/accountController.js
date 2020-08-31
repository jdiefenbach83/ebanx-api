import accountService from '../services/accountService.js';

const getBalance = async (req, res) => {
  try {
    const result = accountService.getBalance(req.query);

    if (!!!result.success) {
      return res.status(404).send(result.message);
    }

    return res.status(200).send(result.message);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export default getBalance;
