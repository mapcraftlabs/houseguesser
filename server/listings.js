Meteor.publish("listings", function() {
  return Listings.find({});
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