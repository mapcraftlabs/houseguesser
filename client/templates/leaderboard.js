Template.leaderboard.helpers({
	allRoute: function () {
		return this.geog == "all";
	},
	noLeaders: function () {
		return this.leaders.fetch().length == 0;
	}
});