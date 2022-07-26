const ComputeOps = require('../utility/splitRules');

const compute = async (req, res) => {
   try {
    const payload = req.body;
    const {Amount, SplitInfo} = payload;
    const computeOps = new ComputeOps(Amount, SplitInfo);

    await computeOps.checkParticipants();
    await computeOps.FlatOps();
    await computeOps.PercentageOps();
    await computeOps.RatioOps();
    await computeOps.Breakdown();

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