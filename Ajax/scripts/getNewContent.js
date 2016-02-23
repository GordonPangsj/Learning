function getNewContent(){
	var request = getHTTPObject();
	if(request){
		request.open("Get", "example.txt", true);
		request,onreadystatechange = function(){
			if(request.readyState == 4){
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appenChild(txt);
				document.getElementById('new').appenChild(para);
			}
		};
		request.send(null);
	}
	else{
		alert("Sorry, your browser doesn't support XMLHttpRequest");
	}
}
addLoadEvent(getNewContent);