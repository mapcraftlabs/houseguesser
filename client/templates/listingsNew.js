Template.listingsNew.helpers({
  geog: function () {
    return Session.get('geog');
  },
  geogId: function () {
    return Session.get('geogId');
  }
})

var parse_url = function (url) {
  if(url.indexOf("redfin.com") < 0) {
     // not a redfin link
     return -1;
  }
  // url looks like this
  // https://www.redfin.com/CA/Oakland/350-Lester-Ave-94606/home/1159447
  var tokens = url.split("/");
  if(tokens[0].indexOf("https:") < 0) {
  	return -2;
  }
  var addressTokens = tokens[5].split("-");
  var zip = _.last(addressTokens);
  if(zip.length != 5) {
  	return -3;
  }
  var address = addressTokens.slice(0, -1).join(' ');
  return {
    numBids: 0,
  	state: tokens[3],
  	city: tokens[4],
  	address: address,
  	zip: zip
  }
};

AutoForm.hooks({
  'listings-new-form': {
  	before: {
  	  insert: function(doc) {
  	  	if(!doc.link) {
  	  		Materialize.toast("Enter a valid redfin link", 4000, "red");
  	  	  return false;
  	  	}
  	  	var ret = parse_url(doc.link);
  	  	if(ret < 0) {
  	  		Materialize.toast("Not a valid redfin link", 4000, "red");
  	  		return false;
  	  	}
  	  	doc = _.defaults(doc, ret);

  	    return doc;
      }
    },
    onError: function(operation, error) {

      if(!error.reason ||
          error.reason.indexOf("Link already exists") != -1) {

        console.log(error);
        Materialize.toast("Error creating listing", "red");
        return;
      }

      var id = error.message.split("-")[1];
      Materialize.toast('Listing already exists, forwarding to listing.', 4000);
      Router.go('bids', {_id: $.trim(id)});
    },
    onSuccess: function (operation, result, template) {
      Materialize.toast('Listing created successfully!', 4000, "green");
      Router.go('bids', {_id: result});
    }
  }
});
