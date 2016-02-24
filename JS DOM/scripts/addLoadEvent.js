function addLoadEvent(func){
	var oldonload = window.onload;
	if(window.onload != "funciton"){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}