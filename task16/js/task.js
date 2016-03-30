/**
 * Created by Administrator on 2016/3/30.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
(function (window, undefined) {
    window.onload = function () {
var aqiData = new Array();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input");
    var kq =  document.getElementById("aqi-value-input");

    //使用正则表达式进行输入判断
    if(city.value.trim().length==0) {  //分别对空输入进行判断
        alert("请您输入城市名称！");
        return;   //终止程序
    }
    var reg = /^[\u0391-\uFFE5A-Za-z]+$/ ;
    var rcity = city.value.trim().match(reg);
    if(rcity==null)
    {
        alert("对不起，你输入的城市名称含有非中英文字符！");
        city.value="";
        kq.value = "";
        return;   //终止程序
    }
    if(kq.value.trim().length==0) {
        alert("请您输入该城市的空气质量！");
        return;   //终止程序
    }

    var reg1 = /^[-+]?\d*$/;
    var rkq = kq.value.trim().match(reg1);
    if(rkq==null)
    {
        alert("对不起，你输入的城市空气质量不是有效的整数！");
        city.value="";
        kq.value = "";
        return;   //终止程序
    }
    aqiData.push([city.value.trim(),kq.value.trim()]);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var city = document.getElementById("aqi-city-input");
    var kq =  document.getElementById("aqi-value-input");
    //通过上一步的添加操作，我们将数组的元素添加到表格中，顺便添加删除按钮
    //首先清除table表中的所有标签
    var table = document.getElementById("aqi-table");
    if (table.innerHTML.indexOf("tr") > 0) {
    var trArray = table.getElementsByTagName("td");
    if (trArray.length > 0) {
        table.innerHTML="";
    }
    }

    if(aqiData.length>0) {
        //对表格进行渲染
        table.border = "1";
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = "城市";
        var td2 = document.createElement("td");
        td2.innerHTML = "空气质量";
        var td3 = document.createElement("td");
        td3.innerHTML = "操作";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);


        for (var i = 0; i < aqiData.length; i++) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = aqiData[i][0];
            var td2 = document.createElement("td");
            td2.innerHTML = aqiData[i][1];
            var td3 = document.createElement("button");
            (function () {
                var p = i;
                td3.onclick = function () {
                    delBtnHandle(p);
                    city.value="";
                    kq.value = "";
                }
            })();

            td3.id = i;
            td3.innerHTML = "删除";
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            table.appendChild(tr);
        }
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

function deleteI(num)
        {
            var j = num;
            var tmp = new Array();
            for(var i=0;i<aqiData.length;i++)
            {
                if(i!=num)
                {
                    tmp.push(aqiData[i]);
                }
            }
            aqiData = tmp;
        }

function delBtnHandle( i) {
    // do sth.
    deleteI(i);
    //删除数组中的第i个元素
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function ()
    {
        addBtnHandle();
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();
    };
})(window);