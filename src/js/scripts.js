function toggleMobileMenu() {
  var openMenu = document.querySelector('.touch-menu'),
     menuMain = document.querySelector('.main-menu');
  if(openMenu.classList) {
    openMenu.addEventListener('click', function(event){
      event.preventDefault();
      menuMain.classList.toggle("menu-show")}
    )}
  else {
    window.onload = function (){
      document.getElementById('touch-menu').onclick = openMenuIE;
    }
    function openMenuIE (){
      var menuIE = document.getElementById('nav');
      if(menuIE.style.display!='block'){
    		menuIE.style.display='block';
    	}
    	else
    	{
    		menuIE.style.display= 'none';
    	}
    }
  }
}

toggleMobileMenu();
