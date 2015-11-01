Template.bidNew.rendered = function () {
	Session.set('activeListingId', this.data.listingId);
};


AutoForm.hooks({
  'bid-new-form': {
  	before: {
  	  insert: function(doc) {
  	    doc.listingId = Session.get('activeListingId');
  	    return doc;
      }
    },
    onSuccess: function (operation, result, template) {
      //toast('Bid submitted successfully!', 4000);
      Router.go('bids', {_id: Session.get('activeListingId')});
    }
  }
});
