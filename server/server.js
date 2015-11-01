Meteor.publish("listings", function() {
  return Listings.find({});
});

Meteor.publish("listing", function(id) {
  return Listings.find({_id: id});
});


Listings.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }
});


Meteor.methods({
  'Listings.insert': function (params) {
    Listings.insert(params);
  }
});


Meteor.publish("bids", function (id) {
  // find bids for a specific listingId
  return Bids.find({listingId: id});
});


Bids.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }
});


Meteor.methods({
  'Bids.insert': function (params) {
    Bids.insert(params);
  }
});