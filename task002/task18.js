var userInput=document.getElementById('userInput');
var showNUm=document.getElementById('showNUm');
var spanEle;
/*
判断输入的是否是正整数字符串
*/
function isIntStr(str){
	return /^[1-9]\d*$/.test(str);
}

function prepareShow(){
	if(!isIntStr(userInput.value)){
		alert('输入必须为正整数，请重新输入');
		return false;
	}

	spanEle=document.createElement('span');
	spanEle.setAttribute('data',userInput.value);
	spanEle.innerHTML=userInput.value;

}

var leftin=document.getElementById('leftin');
leftin.onclick=function(){
	prepareShow();
	if(showNUm.firstChild===null){
		showNUm.appendChild(spanEle);
	}else{
		showNUm.insertBefore(spanEle,showNUm.firstChild);
	}
}
var rightin=document.getElementById('rightin');
rightin.onclick=function(){
	prepareShow();
	showNUm.appendChild(spanEle);
}

var leftout=document.getElementById('leftout');
leftout.onclick=function(){
	alert('您将要删除'+showNUm.firstChild.getAttribute('data'));
	showNUm.removeChild(showNUm.firstChild);
}

var rightout=document.getElementById('rightout');
rightout.onclick=function(){
	alert('您将要删除'+showNUm.lastChild.getAttribute('data'));
	showNUm.removeChild(showNUm.lastChild);
}
showNUm.onclick=function(e){
	alert('您将要删除'+e.target.getAttribute('data'));
	showNUm.removeChild(e.target);
}