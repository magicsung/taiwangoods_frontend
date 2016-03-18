$( document ).ready(function() {

  // menu collapse
  var openMenuAction = function(event) {
    event.preventDefault();
    $('#menu-toggle').css("display", "block");
    $('#menu-content').animate({
      left: "0"
    }, 300);
    $('html').addClass('noscroll');
  };
  var closeMenuAction = function(event){
    event.preventDefault();
    $('#menu-content').animate({
      left: "-75%"
    }, 300, function() {
        $('#menu-toggle').css("display", "none");
    });
    $('html').removeClass('noscroll');
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
      $(this).siblings().toggleClass('active');
      $(this).parent().siblings().children('.menu-sub-items').slideUp(200, function(){
        $(this).siblings().removeClass('active');
      });
    });
  };

  $('.menu-collapse').click(menuItemClickAction);
  var menuCollapse = document.getElementsByClassName('menu-collapse');
  for (var i = 0; i < menuCollapse.length; i++) {
    menuCollapse[i].addEventListener('touchstart', menuItemClickAction);
  }

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
    $('html').addClass('noscroll');
  });
  $('#light-box').click(function() {
    $(this).fadeOut(300);
    $('html').removeClass('noscroll');
  });

  $('body').keypress(function(e){
    if(e.which == 27){
      $('#light-box').fadeOut(300);
      closePopout();
    }
  });

  // ad-banner swipe
  $("#ad-carousel").swiperight(function() {
	  $(this).carousel('prev');
	});
  $("#ad-carousel").swipeleft(function() {
    $(this).carousel('next');
  });

  // popout toggle
  var closePopout = function() {
    $('.popout').children('.content').slideUp();
    $('.popout').fadeOut('slow');
    $('html').removeClass('noscroll');
  }
  var openPopout = function() {
    $('.popout').fadeIn('slow');
    $('.popout .content').slideDown();
    $('html').addClass('noscroll');
  }

  $('.login').click(openPopout);
  var closePopoutLogin = document.getElementById('close-popout-login')
  closePopoutLogin.addEventListener('click', closePopout);
  closePopoutLogin.addEventListener('touchstart', closePopout);
  $('#close-popout-area').click(closePopout);

});
