var subscriptions = new SubsManager();

Router.configure({
  layoutTemplate: 'layout', // set default layout template
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return subscriptions.subscribe('notifications');
  }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function () {
    return [
      subscriptions.subscribe('singlePost', this.params._id),
      subscriptions.subscribe('comments', this.params._id)
    ];
  },
  data: function () { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return subscriptions.subscribe('singlePost', this.params._id);
  },
  data: function () { return Posts.findOne(this.params._id); }
})

Router.route('/submit', {name: 'postSubmit'});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  fastRender: true,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = subscriptions.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});
NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});
BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController,
  fastRender: true
});

if (Meteor.isServer) {
  FastRender.route('/new/:postsLimit?', function (params) {
    var limit = parseInt(params.postsLimit,10);
    this.subscribe('posts', {sort: {}, limit: limit});
  });
  FastRender.route('/best/:postsLimit?', function (params) {
    var limit = parseInt(params.postsLimit,10);
    this.subscribe('posts', {sort: {}, limit: limit});
  });
} else {
  Router.route('/new/:postsLimit?', {name: 'newPosts'});
  Router.route('/best/:postsLimit?', {name: 'bestPosts'});
}

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
