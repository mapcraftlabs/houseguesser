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
  }
});


Listings._ensureIndex({ link: 1 });


Meteor.methods({
  'Listings.insert': function (params) {
    Listings.insert(params);
  }
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
    return userId;
  }
});


Meteor.methods({
  'Bids.insert': function (params) {
    console.log(params);
    Bids.insert(params);
  }
});


Bids.after.insert(function (userId, doc) {
  Listings.update(doc.listingId, {$inc: {numBids: 1}});
});


Meteor.startup(function() {
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
