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

  $('.menu-link').click(menuItemClickAction);
  var menuLink = document.getElementsByClassName('menu-link');
  for (var i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener('touchstart', menuItemClickAction);
  }

  // search collapse
  var openSearchAction = function(event) {
    event.preventDefault();
    $('.search').slideToggle(200);
    $('#main-content').toggleClass('slide-down');
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


});
