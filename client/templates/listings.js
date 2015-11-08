Template.listings.rendered = function() {

};

Template.listings.helpers({
	allRoute: function () {
		return this.geog == "all";
	},
	numBids: function () {
		return this.numBids || 0;
	}
});