Meteor.publishComposite("listings", function() {
  return {
    find: function() {
      return Listings.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
