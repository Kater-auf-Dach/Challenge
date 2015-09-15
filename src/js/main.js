var link = document.querySelector('.touch-menu');
var menuMain = document.querySelector('.main-menu');

link.addEventListener('click', function(){
  //event.preventDefault();
  menuMain.classList.toggle("menu-show");

});
