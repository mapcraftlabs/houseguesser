Template.bids.helpers({
  noBids: function () {
  	return this.bids.count() == 0;
  },
  geog: function () {
    return Session.get('geog');
  },
  geogId: function () {
    return Session.get('geogId');
  }
});