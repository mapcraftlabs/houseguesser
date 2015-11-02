Meteor.publish("listings", function() {
  return Listings.find({});
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
  },
  /*'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }*/
});


Listings._ensureIndex({ link: 1 });


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
  /*'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }*/
});


Meteor.methods({
  'Bids.insert': function (params) {
    Bids.insert(params);
  }
});