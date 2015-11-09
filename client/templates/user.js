Template.user.helpers({
  userName: function () {
  	var u = Meteor.users.findOne(Meteor.userId());
  	return u.profile.name;
  },
  profilePic: function () {
  	var u = Meteor.users.findOne(Meteor.userId());
  	return u.services.google.picture;
  },
  listingForBid: function () {
  	return Listings.findOne({_id: this.listingId});
  }
});