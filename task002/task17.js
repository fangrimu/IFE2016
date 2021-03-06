/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day",
  nowSelCityName:"北京"
}
//生成随机颜色
var getRandomColor = function(){    

return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
} 
/**
 * 渲染图表
 */
function renderChart() {
  var chartWrap=document.getElementById('aqi-chart-wrap');  
  var content='';
  for(var time in chartData){
      content+='<div class="'+pageState.nowGraTime+'" title="'+time+','+chartData[time]+'" style="height:'+chartData[time]+'px;background-color:'+getRandomColor()+'"></div>'; 
    
  }
  chartWrap.innerHTML=content;
  
  var divs=document.getElementsByClassName(pageState.nowGraTime);
  

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
 if(this.value===pageState.nowGraTime){
      return false;
  }
  pageState.nowGraTime=this.value;


  // 设置对应数据

  // 调用图表渲染函数

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(this.selectedIndex===pageState.nowSelectCity){
    return false;
  }  

  // 设置对应数据
  pageState.nowSelectCity=this.selectedIndex;
  pageState.nowSelCityName=this.options[this.selectedIndex].value;

  //chartData=aqiSourceData[nowSelCityName];
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radios=document.getElementsByTagName('radio');
  for(var i=0;i<radios.length;i++){
      radios[i].onclick=graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select=document.getElementById('city-select');
  var selContent='';
  for(var k in aqiSourceData){
    selContent+='<option value="'+k+'">'+k+'</option>';
  }
  select.innerHTML=selContent;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange=citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  if(pageState.nowGraTime==='day'){
    chartData=aqiSourceData[pageState.nowSelCityName];
  }else if(pageState.nowGraTime==='week'){//按周计算
    let sourData=aqiSourceData[pageState.nowSelCityName];
    // for(let k in sourData){
    //     let 
    // }

  }else if(pageState.nowGraTime==='month'){//按月计算
    // var data=aqiSourceData[pageState.nowSelCityName];
    // var arr=Object.keys(data);
    // var sum;
    // for(let i=0,i<arr.length;i++){
    //   if(arr[i].substr(0,7)===arr[i+1].substr(0,7)){

    //   }
    // }
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();