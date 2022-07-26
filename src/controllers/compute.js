 const compute = (req, res) => {
   try {
     const {
       ID,
       Amount,
       Currency,
       CustomerEmail,
       SplitInfo
     } = req.body;
     if (SplitInfo.length > 0 && SplitInfo.length < 20){
      SplitInfo.map((splitEntites)=>splitEntites)
     }
    
    //  splitTypes
    if(SplitType === "FLAT"){
      
    }
    if(SplitType === "PERCENTAGE"){

    }
    if(SplitType === "RATIO"){

    }

     console.log("now on it again");
     return res.status(200).json({
       ID: null,
       Balance: null,
       SplitBreakdown: [{
           splitEntityId: null,
           Amount: null
         },
         {
           splitEntityId: null,
           Amount: null
         }
       ]
     });
   } catch (error) {
     console.error(error)
     res.status(500).send({
       status: "error",
       message: "try again later, server error"
     });
   }
 };

 module.exports = compute;