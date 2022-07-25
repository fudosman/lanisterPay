 const compute = (req,res) => {
  console.log("successfully hit the compute server");
  return res.status(200).json({
    status: "success",
    message: "successful request to the compute"
  });
 };

 module.exports = compute;
 