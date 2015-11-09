Template.user.helpers({
  userName: function () {
  	console.log(Meteor.user());
  	var u = Meteor.users.findOne(this.userId);
  	return u.profile.name;
  },
  profilePic: function () {
  	var u = Meteor.users.findOne(this.createdBy);
  	return u.services.google.picture;
  },
  listingForBid: function () {
  	return Listings.findOne({_id: this.listingId});
  }
});