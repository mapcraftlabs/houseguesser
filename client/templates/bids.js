Template.bids.helpers({
  noBids: function () {
  	return this.bids.count() == 0;
  }
});


Template.bids.events({
  'click .go-back': function () {
  	history.back();
  }
})