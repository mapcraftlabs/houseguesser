Template.listing.helpers({
  oneBid: function () {
    return this.numBids == 1;
	},
  numBids: function () {
  	return this.numBids || 0;
  },
  listingPage: function () {
  	return ActiveRoute.name('listings') || ActiveRoute.name('user');
  },
  hideGuessCount: function () {
    return ActiveRoute.name('user');
  },
  sellAskDiff: function () {
    var diff = this.salesPrice - this.askingPrice;
    if(diff == 0) {
      return 'Exactly ask';
    } else if (diff > 0) {
      return Math.round(diff/1000) + "k over ask";
    } else {
      return Math.round(-1 * diff/1000) + "k under ask";
    }
  },
  bidSellDiff: function () {
    var bid = Bids.findOne({listingId: this._id,
      createdBy: Meteor.userId()});
    var diff = bid.bid - this.salesPrice;
    if(diff == 0) {
      return 'Nailed it!';
    } else if (diff > 0) {
      return Math.round(diff/1000) + "k over";
    } else {
      return Math.round(-1 * diff/1000) + "k under";
    }
  },
  userBid: function () {
    return Bids.findOne({listingId: this._id,
      createdBy: Meteor.userId()});
  }
});


Template.listing.events({

  'click .view-bid': function () {
    Router.go('bids', {_id: this._id});
  },

  'click .mark-sold': function () {
    var myId = this._id;
    MaterializeModal.prompt({
      title: "Mark as Sold",
      message: "Please enter the sales price",
      placeholder: "e.g. 250000",
      submitLabel: "Save Price",
      callback: function(error, response) {
        if (response.submit) {
          Meteor.call('updateSalesPrice', myId, response.value);
          Materialize.toast("The house is sold!", 4000, "green");
        } else {
          Materialize.toast("Cancelled by user!", 4000, "red");
        }
      }
    });
  },

  'click .mark-unsold': function () {
    Meteor.call('updateSalesPrice', this._id, undefined);
  }
});
