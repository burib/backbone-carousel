Carousel = Backbone.View.extend({
  events: {
    'click nav a': 'onControllerClick',
    'mouseover': 'pause',
    'mouseleave': 'play'
  },
  initialize: function(options) {
    _.bindAll(this);
    $(window).on('resize', this.setContainerHeight);
    this.options = $.extend({
      delay: 4000
    }, options);
    this.container = this.$el;
    this.itemsContainer = this.$('> ul');
    this.items = this.itemsContainer.find('li');
    this.current = 0;
    this.itemsHeight = null;
  },
  render: function() {
    this.items.hide().eq(this.current).show(300,this.setContainerHeight);  
    this.container.prepend("<nav><ul>" + new Array(this.items.length + 1).join('<li><a href="#"></a></li>')+"</ul></nav>");
    this.controllers = this.$('nav a').eq(this.current).addClass('active').end();
    this.play();
    return this;
  },
  onControllerClick: function(e) {
    e.preventDefault();
    this.goTo(this.controllers.index($(e.currentTarget)));
  },
  goTo: function (index) {
    this.items.eq(index).fadeIn();
    this.items.eq(this.current).fadeOut();
    this.current = index;
    this.controllers.removeClass('active').eq(this.current).addClass('active');
  },
  play: function () {
    this.timer = window.setInterval(function () {
      this.goTo((function () {
        return (this.current + 1) < (this.items.length) ? (this.current + 1) : 0;
      }.bind(this))());
    }.bind(this), this.options.delay);
    return this;
  },
  pause: function () {
    window.clearInterval(this.timer);
    return this;
  },
  setContainerHeight: function () {
    this.itemsHeight = this.items.height();
    this.itemsContainer.height(this.itemsHeight);
    return this;
  }
});
var carousel = new Carousel({el: '.carousel'}).render();