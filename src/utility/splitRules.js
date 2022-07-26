module.exports = class ComputeOps {
  constructor(balance, splitInfo) {
    this.balance = balance;
    this.splitInfo = splitInfo;
    this.sharingParticipantsNo = splitInfo.length;
    this.shared = [];
    this.totalRatio = 0;
  }
  async checkParticipants() {
    if (this.sharingParticipantsNo < 0) {
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
    console.log(this.balance);
    treatAsFlat.map((FlatOps) => {
      this.balance = this.balance - FlatOps.SplitValue;
      this.shared.push(FlatOps);
      console.log(this.balance);
    });
  }
  async PercentageOps() {
    const treatAsPercentage = this.splitInfo.filter((PERCENTAGE) => {
      return PERCENTAGE.SplitType == "PERCENTAGE";
    });
    treatAsPercentage.map((Percent) => {
      this.balance = this.balance - ((Percent.SplitValue / 100) * this.balance);
      this.shared.push(Percent);
      console.log(this.balance);
    });

  }
  async RatioOps() {
    const treatAsRatio = this.splitInfo.filter((RATIO) => {
      return RATIO.SplitType == "RATIO";
    });
    treatAsRatio.map((ratioOps) => {
      this.totalRatio = this.totalRatio + ratioOps.SplitValue;
    });
    treatAsRatio.map((ratioOps) => {
      this.balance = this.balance - ((ratioOps.SplitValue / this.totalRatio) * this.balance);
      this.shared.push(ratioOps);
      console.log(this.balance);
    });
  }
};