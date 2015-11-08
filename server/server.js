Meteor.publish("listingCounts", function() {
  return ListingCounts.find({});
});


Meteor.publish("listings", function(filter) {
  return Listings.find(filter);
});


Meteor.publish("listing", function(id) {
  return Listings.find({_id: id});
});


Listings.allow({
  'insert': function(userId, doc) {
    var l = Listings.findOne({link: doc.link});
    if(l) {
      throw new Meteor.Error(404, 
        "Link already exists -" + l._id + "-");
    }
    return userId;
  }
});


Listings._ensureIndex({ link: 1 });


Meteor.methods({
  'Listings.insert': function (params) {
    Listings.insert(params);
  },
  'updateSalesPrice': function (_id, salesPrice) {
    Listings.update({_id: _id}, {$set: {salesPrice: salesPrice}});
    Leaderboard.updateListing(_id);
  }
});


Listings.after.insert(function (userId, l) {
  ListingCounts.upsert({zip: l.zip}, {$inc: {numBids: 1}});
  ListingCounts.upsert({city: l.city}, {$inc: {numBids: 1}});
  ListingCounts.upsert({state: l.state}, {$inc: {numBids: 1}});
});


Meteor.publishComposite('bids', function(id) {
  return {
    find: function() {
      return Bids.find({listingId: id});
    },
    children: [{
      find: function(bid) {
        return Meteor.users.find({
          _id: bid.createdBy
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


Bids.allow({
  'insert': function(userId, doc) {
    var l = Bids.findOne({
      createdBy: userId,
      listingId: doc.listingId
    });
    if(l) {
      throw new Meteor.Error(404, 
        "Can only bid once");
    }
    return userId;
  }
});


Meteor.methods({
  'Bids.insert': function (params) {
    Bids.insert(params);
  }
});


Bids.after.insert(function (userId, doc) {
  Listings.update(doc.listingId, {$inc: {numBids: 1}});
  var l = Listings.findOne(doc.listingId);
});


var recountListings = function () {
  ListingCounts.remove({});

  var ls = Listings.find({}).fetch();

  _.each(ls, function (l) {
    ListingCounts.upsert({zip: l.zip}, {$inc: {numBids: 1}});
    ListingCounts.upsert({city: l.city}, {$inc: {numBids: 1}});
    ListingCounts.upsert({state: l.state}, {$inc: {numBids: 1}});
  });
};


Meteor.startup(function() {

  console.log('indexingBids...');
  Leaderboard.updateAllListings();
  console.log('done IndexingBids...');

  console.log('recountListings...');
  recountListings();
  console.log('done recountListings...');

  if (ServiceConfiguration.configurations.find(
    {service: 'google'}).count() == 0) {

    ServiceConfiguration.configurations.insert({
      service: "google",
      clientId: Meteor.settings.googleClientId,
      loginStyle: "popup",
      secret: Meteor.settings.googleSecret
    });
  }
});


Bids._ensureIndex({ listingId: 1 });
