var category, open, markerArr, plPoints, x, y, z;

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function init_menu(){
    for(var j=0;j<mapdata.length;j+=1){
        var cat = mapdata[j].category;
        var arr = mapdata[j].data.markers;
        var menu = $('#'+cat+'_menu');
        for(var i=0;i<arr.length;i+=1){
                var node = "<li><a href='?c="+j+"&o="+i+"'>"+ arr[i].title +"</a></li>"
                menu.append(node);
        }
    }

    category = parseInt(getQueryString('c'));
    open = parseInt(getQueryString('o'));

    if(!category){
        category = 0;
    }
    if(!open){
        open = 0;
    }


    var cat = mapdata[category].category;
    $("#"+cat).addClass("btn-info"); // 追加样式 

    markers = mapdata[category].data.markers;
    plOpts = mapdata[category].data.plOpts;
    plPath = mapdata[category].data.plPath;
    labels = mapdata[category].data.labels;
    
    //x = mapdata[category].data.center[0];
    //y = mapdata[category].data.center[1];
    //z = mapdata[category].data.center[2];
    //z = parseInt(z);
    x = markers[open].position.lng;
    y = markers[open].position.lat;
    z = 16;

    markers[open].isOpen=1;

    var event_name = markers[open].title;
    $("title").html("清华2017校庆地图 | " + event_name); 


}

function add_autherinfo(){
    var menu = $('#outdoor_menu');
    var node='<li class="divider"></li>\
            <li><a href="http://mp.weixin.qq.com/s?__biz=MjM5MTcxOTQxNQ==&mid=507637135&idx=1&sn=cb428faf11be9bdc4f6c468de4dafe76#rd">\
                <img src="2cy.jpg" style="width:65px">\
                <b>制作：清华军乐THUMB</b>&nbsp;&nbsp;&nbsp;<-点击关注\
            </a></li>\
            <li><a href="http://mp.weixin.qq.com/s?__biz=MjM5ODUwOTE0Mg==&mid=201942103&idx=1&sn=afc449a61f493aa58482c1f95649bfdf">\
                出品：清华大学学生艺术团\
            </a></li>\
            <li class="divider"></li>\
            <li><a>如活动信息有误，请联系作者：highan911@qq.com</a></li>';
    menu.append(node);
}


function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(x,y),z);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }

    //向地图添加控件
    function addMapControl(){
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:1});
      map.addControl(navControl);
    }

    function addMapOverlay(){

      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        //var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: "",
          enableMessage: true
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        //marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);


        if(markers[index].isOpen==1){
            marker.openInfoWindow(infoWindow);
        }

      };


      //for(var index = 0; index < labels.length; index++){
        //var opt = { position: new BMap.Point(labels[index].position.lng,labels[index].position.lat )};
        //var label = new BMap.Label(" " + labels[index].content,opt);
        //map.addOverlay(label);
      //};

      for(var index = 0; index < plOpts.length; index++){
        var polyline = new BMap.Polyline(plPath[index],plOpts[index]);
        map.addOverlay(polyline);
      }
    }


init_menu();

add_autherinfo();
    
var map;
initMap();