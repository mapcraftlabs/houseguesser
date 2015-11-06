Template.listing.helpers({
  oneBid: function () {
    return this.numBids == 1;
	},
  numBids: function () {
  	return this.numBids || 0;
  },
  listingPage: function () {
  	return ActiveRoute.name('dashboard');
  }
});