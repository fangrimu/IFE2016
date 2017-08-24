/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
// var cityInput;
// var aqiInput;
/*
处理用户输入的字符串，去除开头和结尾的空格
*/
function trim(str){
	return str.replace(/^\s+|\s+$/,'');
}
/*
判断输入的字符是否是中英文字符
*/
function isValidStr(str){
	var pattern=/^[\u4e00-\u9fa5]|[a-zA-Z]$/;
	return pattern.test(str);
}

/*
判断输入的是否是整数,在JS内部在，整数和浮点数是同样的存储方法，所以 3和3.0 被视为同一个值
*/
function isInteger(num){
	return (typeof num==='number' && num%1===0);
	//return Number.isInteger(num);
}
/*
判断输入的是否是正整数字符串
*/
function isIntStr(str){
	return /^[1-9]\d*$/.test(str);
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityInput=trim(document.getElementById('aqi-city-input').value);
	if(!isValidStr(cityInput)){
		alert('城市名称必须为中英文字符，请重新输入');
		return false;
	}
	var aqiInput=trim(document.getElementById('aqi-value-input').value);
    
    if(!isIntStr(aqiInput)){
		alert('空气质量指数必须为正整数，请重新输入');
		return false;
	}
	
	//验证是否已经存在该城市
	if(cityInput in aqiData){
		alert('该城市及其空气质量指数已经存在，请重新输入');
		return false;
	}
	aqiData[cityInput]=parseInt(aqiInput);

	return true;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
 /*
 一开始的想法是 每次添加单条数据，或者删除单条数据，都是局部渲染表格，但是似乎出题者的意图是想全部重新渲染，故，重写该方法
 */
 /*var table=document.getElementById('aqi-table');
 var tr=document.createElement('tr'); 
 table.appendChild(tr);
 var td1=document.createElement('td');
 td1.appendChild(document.createTextNode(cityInput));
 tr.appendChild(td1);
 var td2=document.createElement('td');
 td2.appendChild(document.createTextNode(aqiInput));
 tr.appendChild(td2);
 var td3=document.createElement('td');
 var button=document.createElement('button');
 button.setAttribute('key',cityInput);
 button.appendChild(document.createTextNode('删除'));
 td3.appendChild(button);
 tr.appendChild(td3); */

var content='';
var table=document.getElementById('aqi-table');
for(var k in aqiData){
	//方法1，直接渲染页面时，给button添加onclick属性
    //content+='<tr><td>'+k+'</td><td>'+aqiData[k]+'</td><td><button  data-key='+k+' onclick="delBtnHandle(event)">删除</button></td></tr>';
    //方法2，后面处理，直接在table上添加删除事件，因为事件本身是冒泡的
    content+='<tr><td>'+k+'</td><td>'+aqiData[k]+'</td><td><button  data-key='+k+'>删除</button></td></tr>';
}
table.innerHTML=content;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  if(addAqiData()){
  	renderAqiList();  	
  } 
  
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var city=event.target.getAttribute('data-key');
  alert(city);
  if(city in aqiData){
  	delete aqiData[city];
  }
  renderAqiList(aqiData);
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn=document.getElementById('add-btn');
  addBtn.onclick=addBtnHandle;
  //addBtn.addEventListener('click',addBtnHandle,false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

/*我的想法是，在每一次添加数据，都会重新渲染页面,渲染页面时，为每一个删除button添加删除事件*/

//学习的别人的方法，直接在table上添加删除事件，虽然第一次加载页面时没有生成删除button，但是事件本身是冒泡的，可以直接添加道父元素上也可以
//这叫事件委托

	var table=document.getElementById('aqi-table');
	table.onclick=delBtnHandle;



}

init();
