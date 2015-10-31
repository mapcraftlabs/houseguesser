Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/listings/new', {
  name: 'listings.new'
});

/*Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});*/
