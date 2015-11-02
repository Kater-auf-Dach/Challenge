(function() {
  var openMenu = document.querySelector('.touch-menu');
  var menuMain = document.querySelector('.main-menu');
  
  if (openMenu.classList) {
    openMenu.addEventListener('click', function(event){
      event.preventDefault();
      menuMain.classList.toggle('menu-show')}
  )} else {
    window.onload = function() {
      document.getElementById('touch-menu').onclick = openMenuIE;
    };
    function openMenuIE() {
     var menuIE = document.getElementById('nav');
     menuIE.style.display = (menuIE.style.display !== 'block') ? 'block' : 'none';
    }
  }  
})();
