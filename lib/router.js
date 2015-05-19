Router.configure({
  layoutTemplate: 'layout' // set default layout template
})

Router.route('/', {name: 'postsList'});
// Router.route('/postsList'); // Also works
