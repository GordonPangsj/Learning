﻿function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
    //var source = whichpic.getAttribute("href");   //DOM Core
    var source = whichpic.href;  	//HTML-DOM
    var placeholder = document.getElementById("placeholder");
    if(placeholder.nodeName != "IMG") return false;
    //placeholder.setAttribute("src", source);     //DOM Core
    placeholder.src = source;    //HTML-DOM

    if(document.getElementById("description")){
    var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
    var description = document.getElementById("description");
    if(description.firstChild.nodeType == 3)
    	description.firstChild.nodeValue = text;
	}
	return true;
}

function prepareLinks(){
	var links = document.getElementsByTagName("a");
	for(var i = 0; i<links.length;i++){
		if(links[i].getAttribute("class") == "popup"){
			links[i].onclick = function(){
				popUp(this.getAttribute("href"));
				return false;
			}
		}
	}
}

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this) ? false : true;
		}
	}
}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "my image gallery");

	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfer(description, gallery);
	insertAfer(placeholder, gallery);

}



//Test Code
//function countBodyChildren(){
//	var body_element = document.getElementsByTagName("body")[0];
	//alert(body_element.childNodes.length);
//	alert(body_element.nodeType);
//}

//function popUp(winURL){
//	window.open(winURL, "popup", "width=320, height=480");
//}


//非常实用的函数
function insertAfer(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);







//window.onload = countBodyChildren;
//window.onload = prepareLinks;
//window.onload = function(){
//	prepareLinks();
//	prepareGallery();
//}