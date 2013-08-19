Carousel = Backbone.View.extend({
  events: {
    'click nav a': 'goTo'
  },
  initialize: function(options) {
    _.bindAll(this);
    this.container = this.$el;
    this.itemsContainer = this.$('> ul');
    this.items = this.itemsContainer.find('li');
    this.controllers = this.$('nav a');
    this.current = 0;
    this.itemsHeight = null;
  },
  render: function() {
    this.items.hide().eq(this.current).show(1,function() {
      this.itemsHeight = this.items.height();
      this.itemsContainer.height(this.itemsHeight);
    }.bind(this));
    return this;
  },
  goTo: function(e) {
    console.log( this.items.eq(this.current).height() );
    this.items.eq(this.current).fadeOut();
    this.current = this.controllers.index($(e.currentTarget));
    this.items.eq(this.current).fadeIn();
  },
  play: function () {
    return this;
  },
  pause: function () {
    return this;
  }
});
var carousel = new Carousel({el: '.carousel'}).render();