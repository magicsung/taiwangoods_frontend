$( document ).ready(function() {

  // menu collapse
  var openMenuAction = function(event) {
    event.preventDefault();
    $('#menu-toggle').css("display", "block");
    $('#menu-content').animate({
      left: "0"
    }, 300);
  };
  var closeMenuAction = function(event){
    event.preventDefault();
    $('#menu-content').animate({
      left: "-75%"
    }, 300, function() {
        $('#menu-toggle').css("display", "none");
    });
  };

  var openMenu = document.getElementById('open-menu');
  openMenu.addEventListener('touchstart', openMenuAction);
  openMenu.addEventListener('click', openMenuAction);

  var closeMenu = document.getElementById('close-menu');
  closeMenu.addEventListener('touchstart', closeMenuAction);
  closeMenu.addEventListener('click', closeMenuAction);

  // menu-item collapse
  var menuItemClickAction = function(event){
    event.preventDefault();
    $(this).siblings().slideToggle(200, function(){
      $(this).siblings().toggleClass('active')
        .children('span').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
      $(this).parent().siblings().children('.menu-sub-items').slideUp(200, function(){
        $(this).siblings().removeClass('active')
          .children('span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
      });
    });
  };

  $('.menu-collapse').click(menuItemClickAction);
  var menuCollapse = document.getElementsByClassName('menu-collapse');
  for (var i = 0; i < menuCollapse.length; i++) {
    menuCollapse[i].addEventListener('touchstart', menuItemClickAction);
  }

  // search collapse
  var openSearchAction = function(event) {
    event.preventDefault();
    $('.search').slideToggle(200);
    $('#filling').animate({
      top: ($('#filling').hasClass('slide-down') ? "0" : "75px")
    }, 200).toggleClass('slide-down');
  };

  var openSearch = document.getElementById('open-search');
  openSearch.addEventListener('touchstart', openSearchAction);
  openSearch.addEventListener('click', openSearchAction);

  // touch link loading
  var linkLoading = document.getElementsByClassName('menu-link');
  for (var i = 0; i < linkLoading.length; i++) {
    linkLoading[i].addEventListener('touchstart', function() {
      $(this).toggleClass('load');
    });
  }

  // category collapse
  $('.category-title').click(function(event) {
    event.preventDefault();
    $(this).siblings('.sub-category').slideToggle("fast");
    $(this).toggleClass('active');
  });

  // product detail image switch
  var switchImage = function(event) {
    event.preventDefault();
    var lg = $(this).children('img').data('lg');
    var xl = $(this).children('img').data('xl');
    $('#image-view').children('img').attr('src', lg).data('url', xl);
  }
  $('.thumbnail-image').click(switchImage).hover(switchImage);

  // image light box
  $('#image-view').click(function(event) {
    event.preventDefault();
    var url = $(this).children('img').data('url');
    $('#light-box').children('img').attr('src', url);
    $('#light-box').fadeIn(300);
  });
  $('#light-box').click(function() {
    $(this).fadeOut(300);
  });
  $('body').keypress(function(e){
    if(e.which == 27){
      $('#light-box').fadeOut(300);
    }
  });

});
