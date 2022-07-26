const ComputeOps = require('../utility/splitRules');

const compute = async (req, res) => {
  //  try {
    const payload = req.body;
    const {Amount, SplitInfo} = payload;
    const computeOps = new ComputeOps(Amount, SplitInfo);
    computeOps.FlatOps();
    computeOps.PercentageOps();
    computeOps.RatioOps();
    
    
  //  } catch (error) {
  //    console.error(error);
  //    res.status(500).send({
  //      status: "error",
  //      message: "try again later, server error"
  //    });
  //  }
 };

 module.exports = compute;