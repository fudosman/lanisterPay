const ComputeOps = require('../utility/splitRules');

const compute = async (req, res) => {
   try {
    const payload = req.body;
    const {Amount, SplitInfo} = payload;
    const computeOps = new ComputeOps(Amount, SplitInfo);

    computeOps.checkParticipants();
    computeOps.FlatOps();
    computeOps.PercentageOps();
    computeOps.RatioOps();
    computeOps.Breakdown();

    console.log(computeOps);

    return res.status(200).json({
      ID: payload.ID,
      Balance: computeOps.balance,
      SplitBreakdown: computeOps.sharedBreakdown
    });
    
   } catch (error) {
     console.error(error);
     res.status(500).send({
       status: "error",
       message: "try again later, server error"
     });
   }
 };

 module.exports = compute;