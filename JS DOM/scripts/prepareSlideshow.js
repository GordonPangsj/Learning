function prepareSlideshow(){
	//确保浏览器支持DOM方法
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	//确保元素存在
	if(!document.getElementById("linklist")) return false;
	//创建元素
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/topic.jpg");
	preview.setAttribute("id", "preview");
	preview.setAttribute("alt", "building blocks of web design");
	slideshow.appendChild(preview);
	var list = document.getElementById("linklist");
	insertAfter(slideshow, list);

	//取得列表中的所有链接
	var list = document.getElementById("linklist");
	var links = list.getElementsByTagName("a");
	//为mouseover事件添加动画效果
	links[0].onmouseover = function(){
		moveElement("preview", -350, 0, 10);
	}
	links[1].onmouseover = function(){
		moveElement("preview", -730, 0, 10);
	}
	links[2].onmouseover = function(){
		moveElement("preview", -1070, 0, 10);
	}
	//为mouseout事件添加动画效果
	for(var i = 0; i<links.length; i++){
		links[i].onmouseout = function(){
			moveElement("preview", 0, 0, 10);
		}
	}
}

addLoadEvent(prepareSlideshow);