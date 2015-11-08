// this is a module which contains methods to create a leaderboard
// usually for some geography, like a zip or city, and eventually
// for a set of users irregardless of geography

Meteor.publishComposite('bidIndex', function(filter) {
  return {
    find: function() {
      return BidIndex.find(filter);
    },
    children: [{
      find: function(bid) {
        return Meteor.users.find({
          _id: bid.userId
        },{
          limit: 1, 
          fields: {
            "profile.name": 1, 
            "services.google.picture": 1 
          } 
        });
      }
    }]
  }
});


BidIndex._ensureIndex({ user: 1, zip: 1, city: 1, 
  'scores.numBids': 1, 'scores.averagePctDiff': 1 });

Leaderboard = {

  updateAllListings: function () {

    _.each(Listings.find({}).fetch(), function (listing) {
      Leaderboard.updateListing(listing._id);
    });

    //console.log(BidIndex.find({}).fetch());

  },

  updateListing: function (listingId) {
  	// we don't want to compute the leaderboard every time - for
  	// something like a city, we could have 1000s of listings with
  	// 100s of bids.  we therefore need to keep state which we
  	// update as each house sells - this, then, is the key method
  	// of this object, as it can be called to update all necessary
    // leaderboards when each listing sells (or gets updated)

    // if there is no sales price yet (or if you remove the sales
    // price because a user marked it sold incorrectly), this method
    // will still do the right thing

    var listing = Listings.findOne({_id: listingId});
  	var bids = Bids.find({listingId: listingId}).fetch();

    _.each(bids, function (bid) {
    
      Leaderboard.updateIndex({'zip': listing.zip}, bid.createdBy, 
        listingId, listing.salesPrice, bid.bid);

      Leaderboard.updateIndex({'city': listing.city}, bid.createdBy, 
        listingId, listing.salesPrice, bid.bid);

      Leaderboard.updateIndex({'state': listing.state}, bid.createdBy, 
        listingId, listing.salesPrice, bid.bid);

    });
  },

  updateIndex: function (geog_obj, userId, listingId, price, bid) {
    // update the history for this geography, creator, listing, ask,
    // and bid.  this method is designed so that you can call it
    // multiple times with this same info and it won't count multiple
    // times
    geog_obj.userId = userId; 
    var h = BidIndex.findOne(geog_obj);

    if(!h) {
      h = geog_obj;
      h.bids = {};
      BidIndex.insert(h);
    }

    if(!price) {
      h.bids[listingId] = undefined;
    } else {
      h.bids[listingId] = {
        price: price,
        bid: bid
      };
    }

    h.scores = Leaderboard.addScores(h.bids);

    // update the object in mongo
    BidIndex.update({_id: h._id}, h, true);
  },

  addScores: function (bids) {

    // given an object of bids return an object of scores
    var scores = [];
    _.each(bids, function (bid) {
      if(!bid) return;
      // for now let's just do the median pct difference
      scores.push(1.0 - Math.abs(bid.price - bid.bid) / bid.price);
    });

    var sum = 0;
    _.each(scores, function (score) { sum += score; });

    return {
      numBids: scores.length,
      averagePctDiff: Math.round(sum / scores.length * 1000) / 1000
    };
  }
}