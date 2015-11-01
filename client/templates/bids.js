Template.bids.helpers({
  noBids: function () {
  	return this.bids.count() == 0;
  }
});