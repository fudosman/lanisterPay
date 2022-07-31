module.exports = class ComputeOps {
  constructor(balance, splitInfo) {
    this.balance = balance.toFixed(2);
    this.splitInfo = splitInfo;
    this.sharingParticipantsNo = splitInfo.length;
    this.shared = [];
    this.sharedBreakdown = [];
    this.totalRatio = 0;
    this.failedToCompute = [];
  }
  async checkParticipants() {
    if (this.sharingParticipantsNo <= 0) {
      return {
        status: "error",
        message: "minimun number of participants not met"
      };
    }
    if (20 < this.sharingParticipantsNo) {
      return {
        status: "error",
        message: "maximum number of participants exceeded"
      };
    }
  }

  async FlatOps() {
    const treatAsFlat = this.splitInfo.filter((FLAT) => {
      return FLAT.SplitType == "FLAT";
    });
    // console.log(this.balance);
    treatAsFlat.map((FlatOps) => {
      if (this.balance > FlatOps.SplitValue) {
        this.balance = (this.balance - FlatOps.SplitValue).toFixed(2);
        FlatOps.receivedAmount = FlatOps.SplitValue.toFixed(2);
        this.shared.push(FlatOps);
        // console.log(this.balance);
        return {
          status: "success",
          message: "computation successful"
        };
      } else {
        this.failedToCompute.push(FlatOps);
        return {
          status: "error",
          message: "unable to compute, insufficient balance"
        };
      }
    });
  }
  async PercentageOps() {
    const treatAsPercentage = this.splitInfo.filter((PERCENTAGE) => {
      return PERCENTAGE.SplitType == "PERCENTAGE";
    });
    if (this.balance > 0) {
      treatAsPercentage.map((Percent) => {
        this.balance = (this.balance - ((Percent.SplitValue / 100) * this.balance)).toFixed(2);
        Percent.receivedAmount = ((Percent.SplitValue / 100) * this.balance).toFixed(2);
        this.shared.push(Percent);
        // console.log(this.balance);
      });
      return {
        status: "success",
        message: "computation successful"
      };
    } else {
      this.failedToCompute.push(Percent);
      return {
        status: "error",
        message: "unable to compute, insufficient balance"
      };
    }


  }
  async RatioOps() {
    const treatAsRatio = this.splitInfo.filter((RATIO) => {
      return RATIO.SplitType == "RATIO";
    });
    treatAsRatio.map((ratioOps) => {
      this.totalRatio = this.totalRatio + ratioOps.SplitValue;
    });
    if (this.balance > 0) {
      treatAsRatio.map((ratioOps) => {
        this.balance = (this.balance - ((ratioOps.SplitValue / this.totalRatio) * this.balance)).toFixed(2);
        ratioOps.receivedAmount = ((ratioOps.SplitValue / this.totalRatio) * this.balance).toFixed(2);
        this.shared.push(ratioOps);
        // console.log(this.balance);
      });
      return {
        status: "success",
        message: "computation successful"
      };
    } else {
      this.failedToCompute.push(ratioOps);
      return {
        status: "error",
        message: "unable to compute, insufficient balance"
      };
    }
  }

  async Breakdown() {
    this.shared.map((entity) => {
      let singleRecord = {
        SplitEntityId: entity.SplitEntityId,
        Amount: entity.receivedAmount
      };
      this.sharedBreakdown.push(singleRecord);
    });
  }
};