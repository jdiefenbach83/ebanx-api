global.db = null;

const reset = () => {
  global.db = {
    accounts: [],
    events: [],
  };
};

export default { reset };
