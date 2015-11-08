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


Template.listing.events({

  'click .view-bid': function () {
    Router.go('bids', {_id: this._id});
  },

  'click .mark-sold': function () {
    Meteor.call('updateSalesPrice', this._id, 700000);
  },

  'click .mark-unsold': function () {
    Meteor.call('updateSalesPrice', this._id, undefined);
  }
});
