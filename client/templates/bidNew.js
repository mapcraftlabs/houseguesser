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
    onError: function(operation, error) {
      if(!error.reason ||
          error.reason.indexOf("Can only bid once") == -1) {

        console.log(error);
        Materialize.toast("Error creating bid");
        return;
      }

      // in the future this can probably forward to a bid edit page
      Materialize.toast('Can only bid once.', 4000);
    },
    onSuccess: function (operation, result, template) {
      //toast('Bid submitted successfully!', 4000);
      Router.go('bids', {_id: Session.get('activeListingId')});
    }
  }
});
