window.onload=function(){
	imglocation("dtt","box");
	var imgdata={"data":[{"src":"chi1.jpg"},{"src":"1.jpg"},{"src":"3.jpg"},{"src":"e.jpg"},{"src":"chi5.jpg"},{"src":"tu_1.jpg"},{"src":"4.jpg"},{"src":"chi8.jpg"},{"src":"chi9.jpg"},{"src":"chi1.jpg"}]}
	window.onscroll=function(){
		if (checkflag()) {
			var cparent=document.getElementById("dtt");
			for (var i=0;i<imgdata.data.length;i++) {
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boximg=document.createElement("div");
				boximg.className="box_img";
				ccontent.appendChild(boximg);
				var img=document.createElement("img");
				img.src="img/"+imgdata.data[i].src;
				boximg.appendChild(img);
			}
			imglocation("dtt","box");
		}
		
	}
}
function checkflag(){
	var cparent=document.getElementById("dtt");
	var ccontent=getChildElement(cparent,"box");
	var lastheight=ccontent[ccontent.length-1].offsetTop;
	var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageheight=document.documentElement.clientHeight|document.body.clientHeight;
	if (lastheight<scrolltop+pageheight) {
		return true;
	}
}
function imglocation(parent,content){
	//将parent多余的content取出
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);
	var imgwidth=ccontent[0].offsetWidth;
	var num= Math.floor(document.documentElement.clientWidth/imgwidth);
	cparent.style.cssText="width:"+imgwidth*num+"px;margin:0 auto";

	var boxheightarr=[];
	for (var i=0;i<ccontent.length;i++) {
		if (i<num) {
			boxheightarr[i]=ccontent[i].offsetHeight;
			console.log(boxheightarr[i]);
		}else{
			var minheight=Math.min.apply(null,boxheightarr);
			var minindex=getminheightlocation(boxheightarr,minheight);
			
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=minheight+"px";
			ccontent[i].style.left=ccontent[minindex].offsetLeft+"px";
			boxheightarr[minindex]=boxheightarr[minindex]+ccontent[i].offsetHeight;
		}
	}

}
function getminheightlocation(boxheightarr,minheight){
	for (var i in boxheightarr) {
		if (boxheightarr[i]==minheight) {
			return i;
		}
	}
}
function getChildElement(parent,content){
	var contentarr=[];
	var allcontent=parent.getElementsByTagName("*");
	for (var i=0;i<allcontent.length;i++) {
		if (allcontent[i].className==content) {
			contentarr.push(allcontent[i]);
		} 
	}
	return contentarr;
}
