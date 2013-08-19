Carousel = Backbone.View.extend({
  events: {
    'click nav a': 'goTo'
  },
  initialize: function(options) {
    _.bindAll(this);
    $(window).on('resize', this.setContainerHeight)
    this.container = this.$el;
    this.itemsContainer = this.$('> ul');
    this.items = this.itemsContainer.find('li');
    this.current = 0;
    this.itemsHeight = null;
  },
  render: function() {
    this.items.hide().eq(this.current).show(10,this.setContainerHeight);  
    this.container.prepend("<nav><ul>" + new Array(this.items.length + 1).join('<li><a href="#"></a></li>')+"</ul></nav>");
    this.controllers = this.$('nav a');
    return this;
  },
  goTo: function(e) {
    e.preventDefault();
    this.items.eq(this.current).fadeOut();
    this.current = this.controllers.index($(e.currentTarget));
    this.items.eq(this.current).fadeIn();
  },
  play: function () {
    return this;
  },
  pause: function () {
    return this;
  },
  setContainerHeight: function () {
    this.itemsHeight = this.items.height();
    this.itemsContainer.height(this.itemsHeight);
    return this;
  }
});
var carousel = new Carousel({el: '.carousel'}).render();