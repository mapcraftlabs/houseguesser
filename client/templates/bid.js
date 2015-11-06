Template.bid.helpers({
  userName: function () {
  	var u = Meteor.users.findOne(this.createdBy);
  	return u.profile.name;
  },
  profilePic: function () {
  	var u = Meteor.users.findOne(this.createdBy);
  	return u.services.google.picture;
  }
});
