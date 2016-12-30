/**
 * Created by chl on 16-5-25.
 */




//取屏幕宽高,svg不占满屏幕
/*var width = window.innerWidth * 0.7 ;
var width = 800 ;
var height = window.innerHeight * 0.9 ;*/


//初始化对象以及高度，留出一定空白
/*var obj = new Object();
obj.col1 = 110;
obj.col2 = 110;
obj.col3 = 110;*/
var col;

var attackColor = ["#ffa12d", "#ff4b3f", "#ff631a", "#ff485e", "#ff58b0", "#e74dff", "#8f2fff", "#735cff", "#4883ff", "#15adff",
                 "#5ac3ff", "#11e2e2", "#41c2af", "#23e7a7", "#a3d56e", "#31f16a", "#29ad10", "#e2b533", "#f4d354", "#ffe812"];

//每一列的宽度
var colWidth = 360;
//子区域宽度 200*0.9
var childColWidth = 320;
var childColHeight = 42;


//转化父区域后的数据
var transData = [];
var transChildData = [];
var transLogo = [];
var transGrandChild = [];
var transLogoArea = [];

//用于接收接口数据
var rectData = [];
var childRectData = [];
var grandChildData = [];

//处理关联数据和非关联数据
var noRelateAtt = [], relateAtt = [], relateArr = [];

var starttime = "", endtime = "", maxline = 40, url = "";

//用于处理关联数据
var lastUuid = "";
//用于区分关联数据的颜色
var relateColor = 0;


$(document).ready(function () {

    $("#loadbg").css('display', '');
    $("#loadimg").css('display', '');

    $("#btnSearch").click(function () {

        //loading
        $("#loadbg").css('display', '');
        $("#loadimg").css('display', '');


        starttime = $("#txtsendstarttime").val();
        endtime = $("#txtsendendtime").val();


        if (!isNaN($("#maxline").val())) {
            //判断传入值是数字
            maxline = $("#maxline").val();
        } else {
            maxline = 40;
        }

        url = "../../ajaxHandle/GlobalHandle.ashx?opertype=attacksituation&begTime=" + starttime + "&endTime=" + endtime;
        try {
            getAjax();
        } catch (e) {
            alertMsg("信息处理有误");
        }

    });

    $("#txtsendstarttime").val(new Date().format("yyyy-MM-dd") + " 00:00:00");
    $("#txtsendendtime").val(new Date().format("yyyy-MM-dd hh:mm:ss"));

    starttime = $("#txtsendstarttime").val();
    endtime = $("#txtsendendtime").val();

    url = "../../ajaxHandle/GlobalHandle.ashx?opertype=attacksituation&begTime=" + starttime + "&endTime=" + endtime;
    try {
        getAjax();
    } catch (e) {
        alertMsg("信息处理有误");
    }

});




/*   var getTransData = JSON.parse(getData1.responseText);
   
   var getTransData =
   {
  		  "area" : "[{\"id\":\"001\",\"name\":\"OA区\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"5.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"003\",\"name\":\"测试区\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"004\",\"name\":\"销售区\",\"imgnormal\":\"5.png\",\"imgunnaomal\":\"4.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"001002\",\"name\":\"OA一区\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"001\"},{\"id\":\"001003\",\"name\":\"OA二区\",\"imgnormal\":\"3.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"001\"},{\"id\":\"003001\",\"name\":\"测试一区\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"003\"},{\"id\":\"004001\",\"name\":\"销售一区\",\"imgnormal\":\"3.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"004\"},{\"id\":\"004002\",\"name\":\"销售二区\",\"imgnormal\":\"3.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"004\"},{\"id\":\"005\",\"name\":\"研发部\",\"imgnormal\":\"4.png\",\"imgunnaomal\":\"4.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"005001\",\"name\":\"研发一区\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"005\"},{\"id\":\"005002\",\"name\":\"研发二区\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"005\"},{\"id\":\"006\",\"name\":\"服务器集群\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"006001\",\"name\":\"集群1\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"006\"},{\"id\":\"006002\",\"name\":\"集群2\",\"imgnormal\":\"3.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"006\"},{\"id\":\"006003\",\"name\":\"集群3\",\"imgnormal\":\"3.png\",\"imgunnaomal\":\"3.png\",\"backgroundcolor\":\"\",\"pid\":\"006\"},{\"id\":\"007\",\"name\":\"行政部\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"5.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"006004\",\"name\":\"kafka集群\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"5.png\",\"backgroundcolor\":\"\",\"pid\":\"006\"},{\"id\":\"003002\",\"name\":\"软测组\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"5.png\",\"backgroundcolor\":\"\",\"pid\":\"003\"},{\"id\":\"008\",\"name\":\"测试\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"008001\",\"name\":\"1区\",\"imgnormal\":\"2.png\",\"imgunnaomal\":\"5.png\",\"backgroundcolor\":\"\",\"pid\":\"008\"},{\"id\":\"009\",\"name\":\"DMZ区\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"},{\"id\":\"010\",\"name\":\"实验室\",\"imgnormal\":\"1.png\",\"imgunnaomal\":\"1.png\",\"backgroundcolor\":\"\",\"pid\":\"0\"}]",
  		  "assets" : "[{\"id\":17,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.6.64\",\"areacode\":\"001002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:00:14.0\"},{\"id\":18,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.65\",\"areacode\":\"001002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:00:35.0\"},{\"id\":19,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.6.66\",\"areacode\":\"001002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:01:08.0\"},{\"id\":20,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.6.67\",\"areacode\":\"001002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:02:06.0\"},{\"id\":21,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.6.150\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:03:13.0\"},{\"id\":22,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.151\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:04:08.0\"},{\"id\":23,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.6.152\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:04:30.0\"},{\"id\":24,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.6.153\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:04:59.0\"},{\"id\":25,\"dev_mod\":\"\",\"dev_name\":\"PC5\",\"ip\":\"192.168.6.154\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:05:24.0\"},{\"id\":26,\"dev_mod\":\"\",\"dev_name\":\"PC6\",\"ip\":\"192.168.6.155\",\"areacode\":\"001003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-05-31 10:05:45.0\"},{\"id\":36,\"dev_mod\":\"\",\"dev_name\":\"PC11\",\"ip\":\"192.168.6.125\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:15:50.0\"},{\"id\":37,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.3.54\",\"areacode\":\"004001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:28:46.0\"},{\"id\":38,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.6.119\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:29:34.0\"},{\"id\":39,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.250\",\"areacode\":\"004001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:29:57.0\"},{\"id\":40,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.133\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:39:12.0\"},{\"id\":41,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.6.126\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:39:42.0\"},{\"id\":42,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.25.254\",\"areacode\":\"004002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 11:40:34.0\"},{\"id\":43,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.6.55\",\"areacode\":\"005001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:12:17.0\"},{\"id\":44,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.200\",\"areacode\":\"005001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:35:52.0\"},{\"id\":45,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.6.242\",\"areacode\":\"005001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:36:36.0\"},{\"id\":46,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.6.145\",\"areacode\":\"005001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:36:57.0\"},{\"id\":47,\"dev_mod\":\"\",\"dev_name\":\"PC5\",\"ip\":\"192.168.6.19\",\"areacode\":\"005001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:37:23.0\"},{\"id\":48,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"192.168.6.1\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:37:40.0\"},{\"id\":49,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.6.165\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:39:11.0\"},{\"id\":50,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.6.197\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:39:28.0\"},{\"id\":51,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.6.189\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:39:44.0\"},{\"id\":52,\"dev_mod\":\"\",\"dev_name\":\"PC5\",\"ip\":\"192.168.6.234\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:40:08.0\"},{\"id\":53,\"dev_mod\":\"\",\"dev_name\":\"PC6\",\"ip\":\"192.168.6.163\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:40:27.0\"},{\"id\":54,\"dev_mod\":\"\",\"dev_name\":\"PC7\",\"ip\":\"192.168.6.193\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:40:45.0\"},{\"id\":55,\"dev_mod\":\"\",\"dev_name\":\"PC8\",\"ip\":\"192.168.6.25\",\"areacode\":\"005002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-01 14:41:03.0\"},{\"id\":62,\"dev_mod\":\"\",\"dev_name\":\"SERVER1\",\"ip\":\"192.168.3.10\",\"areacode\":\"006001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:10:32.0\"},{\"id\":63,\"dev_mod\":\"\",\"dev_name\":\"SERVER2\",\"ip\":\"192.168.3.12\",\"areacode\":\"006001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:10:51.0\"},{\"id\":64,\"dev_mod\":\"\",\"dev_name\":\"SERVER3\",\"ip\":\"192.168.3.13\",\"areacode\":\"006001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:11:09.0\"},{\"id\":65,\"dev_mod\":\"\",\"dev_name\":\"SERVER4\",\"ip\":\"192.168.31.146\",\"areacode\":\"006001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:11:22.0\"},{\"id\":66,\"dev_mod\":\"\",\"dev_name\":\"SERVER5\",\"ip\":\"192.168.31.145\",\"areacode\":\"006001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:11:38.0\"},{\"id\":67,\"dev_mod\":\"\",\"dev_name\":\"SERVER1\",\"ip\":\"192.168.3.17\",\"areacode\":\"006002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:16:04.0\"},{\"id\":68,\"dev_mod\":\"\",\"dev_name\":\"SERVER2\",\"ip\":\"192.168.3.21\",\"areacode\":\"006002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:16:22.0\"},{\"id\":69,\"dev_mod\":\"\",\"dev_name\":\"SERVER4\",\"ip\":\"192.168.3.22\",\"areacode\":\"006002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:16:39.0\"},{\"id\":70,\"dev_mod\":\"\",\"dev_name\":\"SERVER5\",\"ip\":\"192.168.3.23\",\"areacode\":\"006002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:16:54.0\"},{\"id\":71,\"dev_mod\":\"\",\"dev_name\":\"SERVER1\",\"ip\":\"192.168.2.102\",\"areacode\":\"006003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:17:23.0\"},{\"id\":72,\"dev_mod\":\"\",\"dev_name\":\"SERVER2\",\"ip\":\"192.168.3.68\",\"areacode\":\"006003\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"SERVER\",\"description\":\"\",\"createtime\":\"2016-06-01 16:17:39.0\"},{\"id\":73,\"dev_mod\":\"\",\"dev_name\":\"PC1\",\"ip\":\"198.162.4.123\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:43:24.0\"},{\"id\":74,\"dev_mod\":\"\",\"dev_name\":\"PC2\",\"ip\":\"192.168.4.123\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:51:01.0\"},{\"id\":75,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.4.198\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:51:49.0\"},{\"id\":76,\"dev_mod\":\"\",\"dev_name\":\"PC4\",\"ip\":\"192.168.31.145\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:52:25.0\"},{\"id\":77,\"dev_mod\":\"\",\"dev_name\":\"PC5\",\"ip\":\"192.168.4.240\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:53:22.0\"},{\"id\":78,\"dev_mod\":\"\",\"dev_name\":\"PC7\",\"ip\":\"192.168.6.190\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 10:56:07.0\"},{\"id\":79,\"dev_mod\":\"\",\"dev_name\":\"PC8\",\"ip\":\"192.168.3.55\",\"areacode\":\"007\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-02 11:00:39.0\"},{\"id\":81,\"dev_mod\":\"\",\"dev_name\":\"PC5\",\"ip\":\"192.168.6.120\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-06 10:00:43.0\"},{\"id\":82,\"dev_mod\":\"\",\"dev_name\":\"kafka08\",\"ip\":\"192.168.3.58\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka08\",\"createtime\":\"2016-06-07 09:19:46.0\"},{\"id\":83,\"dev_mod\":\"\",\"dev_name\":\"kafka09\",\"ip\":\"192.168.3.59\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka09\",\"createtime\":\"2016-06-07 09:20:28.0\"},{\"id\":84,\"dev_mod\":\"\",\"dev_name\":\"kafka10\",\"ip\":\"192.168.3.60\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka10\",\"createtime\":\"2016-06-07 09:20:56.0\"},{\"id\":85,\"dev_mod\":\"\",\"dev_name\":\"kafka11\",\"ip\":\"192.168.3.61\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka11\",\"createtime\":\"2016-06-07 09:21:17.0\"},{\"id\":86,\"dev_mod\":\"\",\"dev_name\":\"kafka12\",\"ip\":\"192.168.3.62\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka12\",\"createtime\":\"2016-06-07 09:21:35.0\"},{\"id\":87,\"dev_mod\":\"\",\"dev_name\":\"PC3\",\"ip\":\"192.168.4.127\",\"areacode\":\"003001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-07 09:21:39.0\"},{\"id\":88,\"dev_mod\":\"\",\"dev_name\":\"kafka13\",\"ip\":\"192.168.3.63\",\"areacode\":\"006004\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"SERVER\",\"description\":\"kafka13\",\"createtime\":\"2016-06-07 09:21:58.0\"},{\"id\":89,\"dev_mod\":\"\",\"dev_name\":\"样本服务器\",\"ip\":\"192.168.4.162\",\"areacode\":\"003002\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"linux\",\"type\":\"PC\",\"description\":\"样本服务器\",\"createtime\":\"2016-06-07 09:23:42.0\"},{\"id\":91,\"dev_mod\":\"213453453453\",\"dev_name\":\"test1\",\"ip\":\"192.168.1.1\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"unix\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-09 10:43:55.0\"},{\"id\":92,\"dev_mod\":\"\",\"dev_name\":\"test1\",\"ip\":\"192.168.1.2\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-09 10:49:49.0\"},{\"id\":93,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.6.129\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:34:28.0\"},{\"id\":94,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.3.230\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:35:50.0\"},{\"id\":95,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.32.17\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:36:11.0\"},{\"id\":96,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.32.16\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:36:24.0\"},{\"id\":97,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.3.138\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:36:41.0\"},{\"id\":98,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.135.56\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:40:29.0\"},{\"id\":99,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.3.135.56\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:40:53.0\"},{\"id\":100,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.33.35\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:42:13.0\"},{\"id\":101,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"192.168.4.141\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:43:03.0\"},{\"id\":102,\"dev_mod\":\"\",\"dev_name\":\"PC\",\"ip\":\"172.16.68.138\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 11:46:53.0\"},{\"id\":103,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.3.141\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:32:42.0\"},{\"id\":104,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"172.16.68.135\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:34:50.0\"},{\"id\":105,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.1.90\",\"areacode\":\"008001\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:35:00.0\"},{\"id\":106,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.159\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:38:31.0\"},{\"id\":107,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.2.198\",\"areacode\":\"010\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:38:59.0\"},{\"id\":108,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.186\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:40:28.0\"},{\"id\":109,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.173\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:40:35.0\"},{\"id\":110,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.3.52\",\"areacode\":\"010\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:40:55.0\"},{\"id\":111,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.15\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:03.0\"},{\"id\":112,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.233\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:11.0\"},{\"id\":113,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.2.106\",\"areacode\":\"010\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:19.0\"},{\"id\":114,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.4.72\",\"areacode\":\"010\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:26.0\"},{\"id\":115,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.156\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:34.0\"},{\"id\":116,\"dev_mod\":\"\",\"dev_name\":\"pc\",\"ip\":\"192.168.2.160\",\"areacode\":\"010\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:41:50.0\"},{\"id\":117,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.100\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:42:10.0\"},{\"id\":118,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.164\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:42:18.0\"},{\"id\":119,\"dev_mod\":\"\",\"dev_name\":\"server\",\"ip\":\"192.168.6.231\",\"areacode\":\"009\",\"tel\":\"\",\"contacts\":\"\",\"email\":\"\",\"system\":\"windows\",\"type\":\"PC\",\"description\":\"\",\"createtime\":\"2016-06-14 13:42:25.0\"}]",
  		  "attack" : "{\"trackers\":[{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-28 19:43:30\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.120\",\"toip\":\"192.168.3.54\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"攻击攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-28 21:46:30\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.230\",\"toip\":\"192.168.6.190\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 09:17:20\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.120\",\"toip\":\"192.168.3.56\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 09:25:20\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.156\",\"toip\":\"192.168.32.17\",\"group\":\"1\",\"relate\":\"false\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 09:27:03\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.2.112\",\"toip\":\"192.168.6.120\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 09:39:52\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.156\",\"toip\":\"192.168.32.22\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 10:04:46\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.186\",\"toip\":\"192.168.3.54\",\"group\":\"1\",\"relate\":\"false\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 13:50:47\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.127\",\"toip\":\"192.168.3.54\",\"group\":\"1\",\"relate\":\"true\"},{\"attacktitle\":\"Gh0st RAt1.0 Alpha版木马连接\",\"parentclassifyid\":\"7\",\"attacktime\":\"2016-07-29 14:00:13\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.2.112\",\"toip\":\"192.168.6.64\",\"group\":\"2\",\"relate\":\"false\"},{\"attacktitle\":\"Gh0st RAt1.0 Alpha版木马连接\",\"parentclassifyid\":\"7\",\"attacktime\":\"2016-07-29 14:01:51\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.64\",\"toip\":\"192.168.2.112\",\"group\":\"2\",\"relate\":\"true\"},{\"attacktitle\":\"Gh0st RAt1.0 Alpha版木马连接\",\"parentclassifyid\":\"7\",\"attacktime\":\"2016-07-29 14:30:59\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.2.112\",\"toip\":\"192.168.6.242\",\"group\":\"2\",\"relate\":\"true\"},{\"attacktitle\":\"Gh0st RAt1.0 Alpha版木马连接\",\"parentclassifyid\":\"7\",\"attacktime\":\"2016-07-29 14:31:06\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.242\",\"toip\":\"192.168.2.112\",\"group\":\"2\",\"relate\":\"true\"},{\"attacktitle\":\"XSS跨站点脚本编制\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 14:41:57\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.159\",\"toip\":\"192.168.32.17\",\"group\":\"2\",\"relate\":\"true\"},{\"attacktitle\":\"标题\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 15:19:15\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.6.64\",\"toip\":\"192.168.4.127\",\"group\":\"3\",\"relate\":\"true\"},{\"attacktitle\":\"攻击攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-29 16:02:54\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.230\",\"toip\":\"192.168.6.120\",\"group\":\"3\",\"relate\":\"true\"},{\"attacktitle\":\"test\",\"parentclassifyid\":\"13\",\"attacktime\":\"2016-07-29 16:24:06\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.230\",\"toip\":\"192.168.6.154\",\"group\":\"3\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 09:33:54\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.139\",\"toip\":\"192.168.3.54\",\"group\":\"3\",\"relate\":\"true\"},{\"attacktitle\":\"病毒文件漏洞攻击\",\"parentclassifyid\":\"16\",\"attacktime\":\"2016-07-30 10:11:45\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.4.198\",\"toip\":\"192.168.6.64\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"test\",\"parentclassifyid\":\"13\",\"attacktime\":\"2016-07-30 10:40:20\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.56\",\"toip\":\"192.168.6.139\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 10:41:21\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.139\",\"toip\":\"192.168.3.56\",\"group\":\"4\",\"relate\":\"false\"},{\"attacktitle\":\"test\",\"parentclassifyid\":\"13\",\"attacktime\":\"2016-07-30 10:47:40\",\"attackhazardlevel\":\"0\",\"fromip\":\"123.206.196.247\",\"toip\":\"192.168.6.64\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"test\",\"parentclassifyid\":\"13\",\"attacktime\":\"2016-07-30 13:14:18\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.230\",\"toip\":\"192.168.6.126\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"标题\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 13:24:25\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.3.54\",\"toip\":\"192.168.6.190\",\"group\":\"4\",\"relate\":\"false\"},{\"attacktitle\":\"病毒文件漏洞攻击\",\"parentclassifyid\":\"16\",\"attacktime\":\"2016-07-30 14:05:57\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.4.162\",\"toip\":\"192.168.6.64\",\"group\":\"4\",\"relate\":\"false\"},{\"attacktitle\":\"ceshi\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 14:20:38\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.6.64\",\"toip\":\"192.168.4.190\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"ceshi\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 14:31:29\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.6.64\",\"toip\":\"192.168.216.11\",\"group\":\"4\",\"relate\":\"false\"},{\"attacktitle\":\"病毒文件漏洞攻击\",\"parentclassifyid\":\"16\",\"attacktime\":\"2016-07-30 14:31:55\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.4.190\",\"toip\":\"192.168.6.64\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"标题\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 16:12:08\",\"attackhazardlevel\":\"2\",\"fromip\":\"192.168.3.56\",\"toip\":\"192.168.6.127\",\"group\":\"4\",\"relate\":\"false\"},{\"attacktitle\":\"SQL注入攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 16:46:34\",\"attackhazardlevel\":\"3\",\"fromip\":\"192.168.6.127\",\"toip\":\"192.168.3.56\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"攻击攻击\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-30 17:40:09\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.230\",\"toip\":\"192.168.6.152\",\"group\":\"4\",\"relate\":\"true\"},{\"attacktitle\":\"ceshi\",\"parentclassifyid\":\"1\",\"attacktime\":\"2016-07-31 10:06:58\",\"attackhazardlevel\":\"0\",\"fromip\":\"192.168.3.54\",\"toip\":\"192.168.6.152\",\"group\":\"4\",\"relate\":\"true\"}]}"
  };
   
   console.log(JSON.parse(getTransData.attack));
  
  var data = JSON.parse(getTransData.area);
  var computerData = JSON.parse(getTransData.assets);
  var attackComputer = JSON.parse(getTransData.attack).trackers;
  var dataError = JSON.parse(getTransData.attack).error;
  
  console.log(dataError);
  
  if (dataError == "1"){
	  attackComputer = [];
	  setTimeout("delay()" , 5500);
  }


separate(data , grandChildData);
transOriData(grandChildData , computerData , childRectData , rectData);
*/

//初始化
function init() {
    transData = [];
    transChildData = [];
    transLogo = [];
    transGrandChild = [];
    transLogoArea = [];

    //用于接收接口数据
    rectData = [];
    childRectData = [];
    grandChildData = [];

    attackColor = ["#ffa12d", "#ff4b3f", "#ff631a", "#ff485e", "#ff58b0", "#e74dff", "#8f2fff", "#735cff", "#4883ff", "#15adff",
	                 "#5ac3ff", "#11e2e2", "#41c2af", "#23e7a7", "#a3d56e", "#31f16a", "#29ad10", "#e2b533", "#f4d354", "#ffe812"];

    relateColor = 0;
}

//ajax请求
function getAjax() {
    var string = '{"area":[{"id":"001","name":"OA区","imgnormal":"4.png","imgunnaomal":"4_a.png","backgroundcolor":"","pid":"0"},{"id":"003","name":"测试区","imgnormal":"4.png","imgunnaomal":"4_a.png","backgroundcolor":"","pid":"0"},{"id":"004","name":"销售区","imgnormal":"5.png","imgunnaomal":"4.png","backgroundcolor":"","pid":"0"},{"id":"001002","name":"OA一区","imgnormal":"2.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"001"},{"id":"001003","name":"OA二区","imgnormal":"3.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"001"},{"id":"003001","name":"测试一区","imgnormal":"2.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"003"},{"id":"004001","name":"销售一区","imgnormal":"3.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"004"},{"id":"004002","name":"销售二区","imgnormal":"3.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"004"},{"id":"005","name":"研发部","imgnormal":"4.png","imgunnaomal":"4.png","backgroundcolor":"","pid":"0"},{"id":"005001","name":"研发一区","imgnormal":"2.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"005"},{"id":"005002","name":"研发二区","imgnormal":"2.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"005"},{"id":"006","name":"服务器集群","imgnormal":"1.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"0"},{"id":"006001","name":"集群1","imgnormal":"2.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"006"},{"id":"006002","name":"集群2","imgnormal":"3.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"006"},{"id":"006003","name":"集群3","imgnormal":"3.png","imgunnaomal":"3.png","backgroundcolor":"","pid":"006"},{"id":"007","name":"行政部","imgnormal":"1.png","imgunnaomal":"5.png","backgroundcolor":"","pid":"0"},{"id":"006004","name":"kafka集群","imgnormal":"2.png","imgunnaomal":"5.png","backgroundcolor":"","pid":"006"},{"id":"003002","name":"软测组","imgnormal":"2.png","imgunnaomal":"5.png","backgroundcolor":"","pid":"003"},{"id":"008","name":"测试","imgnormal":"1.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"0"},{"id":"008001","name":"1区","imgnormal":"2.png","imgunnaomal":"5_a.png","backgroundcolor":"","pid":"008"},{"id":"009","name":"DMZ区","imgnormal":"1.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"0"},{"id":"010","name":"实验室","imgnormal":"1.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"0"},{"id":"011","name":"未管理资产","imgnormal":"1.png","imgunnaomal":"1.png","backgroundcolor":"","pid":"0"}],"assets":[{"id":17,"dev_mod":"","dev_name":"PC1","ip":"192.168.6.64","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:00:14.0"},{"id":18,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.65","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:00:35.0"},{"id":19,"dev_mod":"","dev_name":"PC3","ip":"192.168.6.66","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:01:08.0"},{"id":20,"dev_mod":"","dev_name":"PC4","ip":"192.168.6.67","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:02:06.0"},{"id":21,"dev_mod":"","dev_name":"PC1","ip":"192.168.6.150","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:03:13.0"},{"id":22,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.151","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:04:08.0"},{"id":23,"dev_mod":"","dev_name":"PC3","ip":"192.168.6.152","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:04:30.0"},{"id":24,"dev_mod":"","dev_name":"PC4","ip":"192.168.6.153","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:04:59.0"},{"id":25,"dev_mod":"","dev_name":"PC5","ip":"192.168.6.154","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:05:24.0"},{"id":26,"dev_mod":"","dev_name":"PC6","ip":"192.168.6.155","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-05-31 10:05:45.0"},{"id":36,"dev_mod":"","dev_name":"PC11","ip":"192.168.6.125","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:15:50.0"},{"id":37,"dev_mod":"","dev_name":"PC1","ip":"192.168.3.54","areacode":"004001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:28:46.0"},{"id":38,"dev_mod":"","dev_name":"PC1","ip":"192.168.6.119","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:29:34.0"},{"id":39,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.250","areacode":"004001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:29:57.0"},{"id":40,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.133","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:39:12.0"},{"id":41,"dev_mod":"","dev_name":"PC4","ip":"192.168.6.126","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 11:39:42.0"},{"id":42,"dev_mod":"","dev_name":"PC1","ip":"192.168.25.254","areacode":"004002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-0111:40:34.0"},{"id":43,"dev_mod":"","dev_name":"PC1","ip":"192.168.6.55","areacode":"005001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:12:17.0"},{"id":44,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.200","areacode":"005001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:35:52.0"},{"id":45,"dev_mod":"","dev_name":"PC3","ip":"192.168.6.242","areacode":"005001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:36:36.0"},{"id":46,"dev_mod":"","dev_name":"PC4","ip":"192.168.6.145","areacode":"005001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:36:57.0"},{"id":47,"dev_mod":"","dev_name":"PC5","ip":"192.168.6.19","areacode":"005001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:37:23.0"},{"id":48,"dev_mod":"","dev_name":"PC1","ip":"192.168.6.1","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:37:40.0"},{"id":49,"dev_mod":"","dev_name":"PC2","ip":"192.168.6.165","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:39:11.0"},{"id":50,"dev_mod":"","dev_name":"PC3","ip":"192.168.6.197","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:39:28.0"},{"id":51,"dev_mod":"","dev_name":"PC4","ip":"192.168.6.189","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:39:44.0"},{"id":52,"dev_mod":"","dev_name":"PC5","ip":"192.168.6.234","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:40:08.0"},{"id":53,"dev_mod":"","dev_name":"PC6","ip":"192.168.6.163","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:40:27.0"},{"id":54,"dev_mod":"","dev_name":"PC7","ip":"192.168.6.193","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:40:45.0"},{"id":55,"dev_mod":"","dev_name":"PC8","ip":"192.168.6.25","areacode":"005002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-01 14:41:03.0"},{"id":62,"dev_mod":"","dev_name":"SERVER1","ip":"192.168.3.10","areacode":"006001","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:10:32.0"},{"id":63,"dev_mod":"","dev_name":"SERVER2","ip":"192.168.3.12","areacode":"006001","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:10:51.0"},{"id":64,"dev_mod":"","dev_name":"SERVER3","ip":"192.168.3.13","areacode":"006001","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:11:09.0"},{"id":65,"dev_mod":"","dev_name":"SERVER4","ip":"192.168.31.146","areacode":"006001","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:11:22.0"},{"id":66,"dev_mod":"","dev_name":"SERVER5","ip":"192.168.31.145","areacode":"006001","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:11:38.0"},{"id":67,"dev_mod":"","dev_name":"SERVER1","ip":"192.168.3.17","areacode":"006002","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:16:04.0"},{"id":68,"dev_mod":"","dev_name":"SERVER2","ip":"192.168.3.21","areacode":"006002","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:16:22.0"},{"id":69,"dev_mod":"","dev_name":"SERVER4","ip":"192.168.3.22","areacode":"006002","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:16:39.0"},{"id":70,"dev_mod":"","dev_name":"SERVER5","ip":"192.168.3.23","areacode":"006002","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:16:54.0"},{"id":71,"dev_mod":"","dev_name":"SERVER1","ip":"192.168.2.102","areacode":"006003","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:17:23.0"},{"id":72,"dev_mod":"","dev_name":"SERVER2","ip":"192.168.3.68","areacode":"006003","tel":"","contacts":"","email":"","system":"windows","type":"SERVER","description":"","createtime":"2016-06-01 16:17:39.0"},{"id":74,"dev_mod":"","dev_name":"PC2","ip":"192.168.4.123","areacode":"007","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-02 10:51:01.0"},{"id":75,"dev_mod":"","dev_name":"PC3","ip":"192.168.4.198","areacode":"007","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-02 10:51:49.0"},{"id":76,"dev_mod":"","dev_name":"PC4","ip":"192.168.31.145","areacode":"007","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-02 10:52:25.0"},{"id":77,"dev_mod":"","dev_name":"PC5","ip":"192.168.4.240","areacode":"007","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-0210:53:22.0"},{"id":78,"dev_mod":"","dev_name":"PC7","ip":"192.168.4.241","areacode":"007","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-02 10:56:07.0"},{"id":81,"dev_mod":"","dev_name":"PC5","ip":"192.168.6.120","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-06 10:00:43.0"},{"id":82,"dev_mod":"","dev_name":"kafka08","ip":"192.168.3.58","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka08","createtime":"2016-06-07 09:19:46.0"},{"id":83,"dev_mod":"","dev_name":"kafka09","ip":"192.168.3.59","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka09","createtime":"2016-06-07 09:20:28.0"},{"id":84,"dev_mod":"","dev_name":"kafka10","ip":"192.168.3.60","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka10","createtime":"2016-06-07 09:20:56.0"},{"id":85,"dev_mod":"","dev_name":"kafka11","ip":"192.168.3.61","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka11","createtime":"2016-06-07 09:21:17.0"},{"id":86,"dev_mod":"","dev_name":"kafka12","ip":"192.168.3.62","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka12","createtime":"2016-06-07 09:21:35.0"},{"id":87,"dev_mod":"","dev_name":"PC3","ip":"192.168.4.127","areacode":"003001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-07 09:21:39.0"},{"id":88,"dev_mod":"","dev_name":"kafka13","ip":"192.168.3.63","areacode":"006004","tel":"","contacts":"","email":"","system":"linux","type":"SERVER","description":"kafka13","createtime":"2016-06-07 09:21:58.0"},{"id":89,"dev_mod":"","dev_name":"样本服务器","ip":"192.168.4.162","areacode":"003002","tel":"","contacts":"","email":"","system":"linux","type":"PC","description":"样本服务器","createtime":"2016-06-07 09:23:42.0"},{"id":91,"dev_mod":"213453453453","dev_name":"test1","ip":"192.168.1.1","areacode":"008001","tel":"","contacts":"","email":"","system":"unix","type":"PC","description":"","createtime":"2016-06-09 10:43:55.0"},{"id":92,"dev_mod":"","dev_name":"test1","ip":"192.168.1.2","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-09 10:49:49.0"},{"id":93,"dev_mod":"","dev_name":"PC","ip":"192.168.6.129","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:34:28.0"},{"id":94,"dev_mod":"","dev_name":"PC","ip":"192.168.3.230","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:35:50.0"},{"id":95,"dev_mod":"","dev_name":"PC","ip":"192.168.32.17","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:36:11.0"},{"id":96,"dev_mod":"","dev_name":"PC","ip":"192.168.32.16","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:36:24.0"},{"id":97,"dev_mod":"","dev_name":"PC","ip":"192.168.3.138","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:36:41.0"},{"id":98,"dev_mod":"","dev_name":"PC","ip":"192.168.135.56","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:40:29.0"},{"id":99,"dev_mod":"","dev_name":"PC","ip":"192.3.135.56","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:40:53.0"},{"id":100,"dev_mod":"","dev_name":"PC","ip":"192.168.33.35","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-1411:42:13.0"},{"id":101,"dev_mod":"","dev_name":"PC","ip":"192.168.4.141","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:43:03.0"},{"id":102,"dev_mod":"","dev_name":"PC","ip":"172.16.68.138","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 11:46:53.0"},{"id":103,"dev_mod":"","dev_name":"pc","ip":"192.168.3.141","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:32:42.0"},{"id":105,"dev_mod":"","dev_name":"pc","ip":"192.168.1.90","areacode":"008001","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:35:00.0"},{"id":106,"dev_mod":"","dev_name":"server","ip":"192.168.6.159","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:38:31.0"},{"id":107,"dev_mod":"","dev_name":"pc","ip":"192.168.2.198","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:38:59.0"},{"id":108,"dev_mod":"","dev_name":"server","ip":"192.168.6.186","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:40:28.0"},{"id":109,"dev_mod":"","dev_name":"server","ip":"192.168.6.173","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:40:35.0"},{"id":110,"dev_mod":"","dev_name":"pc","ip":"192.168.3.52","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:40:55.0"},{"id":111,"dev_mod":"","dev_name":"server","ip":"192.168.6.15","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:41:03.0"},{"id":112,"dev_mod":"","dev_name":"server","ip":"192.168.6.233","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:41:11.0"},{"id":113,"dev_mod":"","dev_name":"pc","ip":"192.168.2.106","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:41:19.0"},{"id":114,"dev_mod":"","dev_name":"pc","ip":"192.168.4.72","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:41:26.0"},{"id":115,"dev_mod":"","dev_name":"server","ip":"192.168.6.156","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-14 13:41:34.0"},{"id":116,"dev_mod":"","dev_name":"pc","ip":"192.168.2.160","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-1413:41:50.0"},{"id":117,"dev_mod":"","dev_name":"server","ip":"192.168.6.100","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-1413:42:10.0"},{"id":118,"dev_mod":"","dev_name":"server","ip":"192.168.6.164","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-1413:42:18.0"},{"id":119,"dev_mod":"","dev_name":"server","ip":"192.168.6.231","areacode":"009","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-1413:42:25.0"},{"id":120,"dev_mod":"","dev_name":"PC","ip":"192.168.32.22","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-27 15:44:46.0"},{"id":121,"dev_mod":"","dev_name":"PC","ip":"192.168.4.211","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-27 15:45:22.0"},{"id":123,"dev_mod":"","dev_name":"PC","ip":"192.168.4.190","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-27 15:45:55.0"},{"id":124,"dev_mod":"","dev_name":"PC","ip":"192.168.2.123","areacode":"010","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-06-27 15:46:05.0"},{"id":142,"dev_mod":"","dev_name":"","ip":"192.168.6.10","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":143,"dev_mod":"","dev_name":"","ip":"192.168.6.157","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":144,"dev_mod":"","dev_name":"","ip":"192.168.6.69","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-2915:00:18.0"},{"id":145,"dev_mod":"","dev_name":"","ip":"192.168.3.56","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":146,"dev_mod":"","dev_name":"","ip":"192.168.6.188","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":147,"dev_mod":"","dev_name":"","ip":"192.168.6.110","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":148,"dev_mod":"","dev_name":"","ip":"192.168.2.241","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-2915:00:18.0"},{"id":149,"dev_mod":"","dev_name":"","ip":"192.168.3.249","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":151,"dev_mod":"","dev_name":"","ip":"192.168.6.12","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":152,"dev_mod":"","dev_name":"","ip":"192.168.6.14","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":153,"dev_mod":"","dev_name":"","ip":"192.168.6.3","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-2915:00:18.0"},{"id":154,"dev_mod":"","dev_name":"","ip":"192.168.3.57","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":155,"dev_mod":"","dev_name":"","ip":"192.168.6.20","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":156,"dev_mod":"","dev_name":"","ip":"192.168.6.127","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":157,"dev_mod":"","dev_name":"","ip":"192.168.4.121","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-2915:00:18.0"},{"id":158,"dev_mod":"","dev_name":"","ip":"192.168.6.16","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-06-29 15:00:18.0"},{"id":159,"dev_mod":"","dev_name":"pc-5","ip":"192.168.6.58","areacode":"011","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-01 14:01:17.0"},{"id":175,"dev_mod":"","dev_name":"pc-4","ip":"192.168.6.199","areacode":"011","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-04 12:30:34.0"},{"id":178,"dev_mod":"","dev_name":"pc-3","ip":"192.168.6.196","areacode":"011","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-08 17:00:02.0"},{"id":185,"dev_mod":"","dev_name":"pc-2","ip":"192.168.6.191","areacode":"011","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-09 21:50:40.0"},{"id":186,"dev_mod":"","dev_name":"pc-1","ip":"192.168.6.135","areacode":"011","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-12 10:00:03.0"},{"id":1143,"dev_mod":"","dev_name":"","ip":"192.168.6.177","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1144,"dev_mod":"","dev_name":"","ip":"192.168.6.149","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-2514:40:51.0"},{"id":1145,"dev_mod":"","dev_name":"ce","ip":"192.168.1.18","areacode":"001002","tel":"","contacts":"","email":"","system":"null","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1146,"dev_mod":"","dev_name":"","ip":"10.10.161.14","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1147,"dev_mod":"","dev_name":"","ip":"192.168.6.146","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1148,"dev_mod":"","dev_name":"","ip":"192.168.6.139","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1149,"dev_mod":"","dev_name":"","ip":"192.168.6.174","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1150,"dev_mod":"","dev_name":"","ip":"192.168.2.112","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-2514:40:51.0"},{"id":1151,"dev_mod":"","dev_name":"","ip":"192.168.2.166","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1152,"dev_mod":"","dev_name":"","ip":"192.168.6.143","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1153,"dev_mod":"","dev_name":"","ip":"192.168.6.141","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1154,"dev_mod":"","dev_name":"","ip":"192.168.2.142","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:51.0"},{"id":1155,"dev_mod":"","dev_name":"","ip":"192.168.1.36","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-2514:40:52.0"},{"id":1156,"dev_mod":"","dev_name":"","ip":"192.168.6.171","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-25 14:40:52.0"},{"id":1157,"dev_mod":"","dev_name":"","ip":"192.168.6.142","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-26 11:00:04.0"},{"id":1158,"dev_mod":"","dev_name":"","ip":"192.168.2.141","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-26 12:00:05.0"},{"id":1159,"dev_mod":"","dev_name":"","ip":"192.168.2.139","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-26 12:00:05.0"},{"id":1160,"dev_mod":"","dev_name":"test","ip":"192.168.2.11","areacode":"011","tel":"","contacts":"","email":"","system":"linux","type":"PC","description":"","createtime":"2016-07-2614:50:29.0"},{"id":1161,"dev_mod":"","dev_name":"test2","ip":"192.168.2.113","areacode":"011","tel":"","contacts":"","email":"","system":"linux","type":"PC","description":"","createtime":"2016-07-26 14:51:45.0"},{"id":1162,"dev_mod":"","dev_name":"","ip":"192.168.2.140","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-27 23:00:02.0"},{"id":1163,"dev_mod":"","dev_name":"","ip":"172.16.18.68","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-28 23:00:01.0"},{"id":1164,"dev_mod":"","dev_name":"","ip":"172.16.68.135","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-28 23:00:01.0"},{"id":1165,"dev_mod":"","dev_name":"","ip":"172.16.1.1","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-2823:00:01.0"},{"id":1168,"dev_mod":"","dev_name":"","ip":"192.168.216.11","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-31 23:00:18.0"},{"id":1169,"dev_mod":"","dev_name":"","ip":"192.168.6.190","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-07-31 23:00:18.0"},{"id":1170,"dev_mod":"","dev_name":"","ip":"192.168.32.66","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1171,"dev_mod":"","dev_name":"","ip":"192.168.32.49","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1172,"dev_mod":"","dev_name":"","ip":"192.168.32.196","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1173,"dev_mod":"","dev_name":"","ip":"192.30.253.125","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1174,"dev_mod":"","dev_name":"","ip":"192.168.32.67","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1175,"dev_mod":"","dev_name":"","ip":"192.168.32.48","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1176,"dev_mod":"","dev_name":"","ip":"192.168.32.104","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1177,"dev_mod":"","dev_name":"","ip":"192.168.3.53","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1178,"dev_mod":"","dev_name":"","ip":"192.168.4.133","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1179,"dev_mod":"","dev_name":"","ip":"192.168.32.88","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1180,"dev_mod":"","dev_name":"","ip":"192.0.80.242","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1181,"dev_mod":"","dev_name":"","ip":"192.168.32.51","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1182,"dev_mod":"","dev_name":"","ip":"192.40.37.128","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1183,"dev_mod":"","dev_name":"","ip":"192.168.32.87","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1184,"dev_mod":"","dev_name":"","ip":"192.40.37.152","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1185,"dev_mod":"","dev_name":"","ip":"192.168.32.69","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1186,"dev_mod":"","dev_name":"","ip":"192.40.37.100","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1187,"dev_mod":"","dev_name":"","ip":"192.168.31.142","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1188,"dev_mod":"","dev_name":"","ip":"192.168.32.197","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1189,"dev_mod":"","dev_name":"","ip":"172.16.10.18","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1190,"dev_mod":"","dev_name":"","ip":"192.168.6.148","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1191,"dev_mod":"","dev_name":"","ip":"172.80.2.122","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1192,"dev_mod":"","dev_name":"","ip":"192.168.32.68","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1193,"dev_mod":"","dev_name":"","ip":"192.168.3.55","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1194,"dev_mod":"","dev_name":"","ip":"172.19.90.2","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1195,"dev_mod":"","dev_name":"","ip":"192.168.32.115","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1196,"dev_mod":"","dev_name":"","ip":"192.168.32.15","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1197,"dev_mod":"","dev_name":"","ip":"192.168.6.124","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1198,"dev_mod":"","dev_name":"","ip":"192.168.3.76","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1199,"dev_mod":"","dev_name":"","ip":"192.0.80.241","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1200,"dev_mod":"","dev_name":"","ip":"192.168.32.32","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1201,"dev_mod":"","dev_name":"","ip":"192.40.37.68","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1202,"dev_mod":"","dev_name":"","ip":"192.168.32.57","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1203,"dev_mod":"","dev_name":"","ip":"192.168.31.141","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1204,"dev_mod":"","dev_name":"","ip":"192.168.32.113","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1205,"dev_mod":"","dev_name":"","ip":"192.30.252.153","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1206,"dev_mod":"","dev_name":"","ip":"192.40.37.40","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1207,"dev_mod":"","dev_name":"","ip":"192.229.237.182","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1208,"dev_mod":"","dev_name":"","ip":"192.168.32.23","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1209,"dev_mod":"","dev_name":"","ip":"192.30.253.117","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1210,"dev_mod":"","dev_name":"","ip":"192.168.32.114","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1211,"dev_mod":"","dev_name":"","ip":"192.30.252.154","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1212,"dev_mod":"","dev_name":"","ip":"192.168.32.75","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1213,"dev_mod":"","dev_name":"","ip":"192.168.32.73","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1214,"dev_mod":"","dev_name":"","ip":"192.168.32.14","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1215,"dev_mod":"","dev_name":"","ip":"192.168.32.74","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1216,"dev_mod":"","dev_name":"","ip":"192.229.189.142","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1217,"dev_mod":"","dev_name":"","ip":"192.168.3.79","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1218,"dev_mod":"","dev_name":"","ip":"192.157.242.19","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1219,"dev_mod":"","dev_name":"","ip":"192.168.31.144","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1220,"dev_mod":"","dev_name":"","ip":"192.168.32.36","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1221,"dev_mod":"","dev_name":"","ip":"192.168.32.201","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1222,"dev_mod":"","dev_name":"","ip":"192.168.32.11","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1223,"dev_mod":"","dev_name":"","ip":"192.168.31.143","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1224,"dev_mod":"","dev_name":"","ip":"192.168.1.12","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1225,"dev_mod":"","dev_name":"","ip":"192.168.32.80","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1226,"dev_mod":"","dev_name":"","ip":"192.168.32.89","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1227,"dev_mod":"","dev_name":"","ip":"192.168.32.13","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1228,"dev_mod":"","dev_name":"","ip":"192.168.32.78","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1229,"dev_mod":"","dev_name":"","ip":"192.168.32.199","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1230,"dev_mod":"","dev_name":"","ip":"192.30.253.116","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1231,"dev_mod":"","dev_name":"","ip":"192.168.32.117","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1232,"dev_mod":"","dev_name":"","ip":"192.168.32.106","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1233,"dev_mod":"","dev_name":"","ip":"192.30.253.112","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-03 23:00:54.0"},{"id":1234,"dev_mod":"","dev_name":"","ip":"192.168.32.71","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0323:00:54.0"},{"id":1235,"dev_mod":"","dev_name":"","ip":"192.40.37.98","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1236,"dev_mod":"","dev_name":"","ip":"192.0.80.239","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1237,"dev_mod":"","dev_name":"","ip":"192.168.6.136","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1238,"dev_mod":"","dev_name":"","ip":"192.168.3.91","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1239,"dev_mod":"","dev_name":"","ip":"192.30.253.113","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1240,"dev_mod":"","dev_name":"","ip":"192.168.32.12","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1241,"dev_mod":"","dev_name":"","ip":"192.168.4.124","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1242,"dev_mod":"","dev_name":"","ip":"192.185.52.225","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1243,"dev_mod":"","dev_name":"","ip":"192.168.3.74","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1244,"dev_mod":"","dev_name":"","ip":"192.168.3.93","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1245,"dev_mod":"","dev_name":"","ip":"192.168.6.144","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1246,"dev_mod":"","dev_name":"","ip":"192.168.2.16","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1247,"dev_mod":"","dev_name":"","ip":"192.168.32.19","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1248,"dev_mod":"","dev_name":"","ip":"192.240.101.234","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1249,"dev_mod":"","dev_name":"","ip":"172.21.240.4","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1250,"dev_mod":"","dev_name":"","ip":"192.168.3.94","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1251,"dev_mod":"","dev_name":"","ip":"192.0.77.32","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1252,"dev_mod":"","dev_name":"","ip":"172.19.90.6","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1253,"dev_mod":"","dev_name":"","ip":"192.40.37.99","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1254,"dev_mod":"","dev_name":"","ip":"192.168.3.101","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1255,"dev_mod":"","dev_name":"","ip":"192.40.37.154","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1256,"dev_mod":"","dev_name":"","ip":"192.168.30.133","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1257,"dev_mod":"","dev_name":"","ip":"192.168.30.66","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1258,"dev_mod":"","dev_name":"","ip":"192.168.3.51","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1259,"dev_mod":"","dev_name":"","ip":"192.168.6.232","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1260,"dev_mod":"","dev_name":"","ip":"192.168.31.232","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1261,"dev_mod":"","dev_name":"","ip":"192.168.2.10","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1262,"dev_mod":"","dev_name":"","ip":"192.168.32.20","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1263,"dev_mod":"","dev_name":"","ip":"192.0.76.3","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1264,"dev_mod":"","dev_name":"","ip":"192.40.37.49","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1265,"dev_mod":"","dev_name":"","ip":"192.168.32.18","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1266,"dev_mod":"","dev_name":"","ip":"192.168.4.186","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1267,"dev_mod":"","dev_name":"","ip":"172.21.240.2","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0523:00:06.0"},{"id":1268,"dev_mod":"","dev_name":"","ip":"192.168.2.8","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1269,"dev_mod":"","dev_name":"","ip":"192.73.240.78","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-05 23:00:06.0"},{"id":1270,"dev_mod":"","dev_name":"","ip":"192.168.3.39","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-08 23:00:09.0"},{"id":1271,"dev_mod":"","dev_name":"","ip":"192.168.20.14","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-08 23:00:09.0"},{"id":1272,"dev_mod":"","dev_name":"","ip":"192.168.20.114","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-0823:00:09.0"},{"id":1273,"dev_mod":"","dev_name":"","ip":"192.168.6.178","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-09 23:00:07.0"},{"id":1274,"dev_mod":"","dev_name":"","ip":"192.168.3.42","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-09 23:00:07.0"},{"id":1275,"dev_mod":"","dev_name":"","ip":"192.168.6.50","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-10 23:00:02.0"},{"id":1276,"dev_mod":"","dev_name":"","ip":"192.168.3.66","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1023:00:02.0"},{"id":1277,"dev_mod":"","dev_name":"ipv6","ip":"2001:0DB8:0000:0023:0008:0800:200C:417A","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-11 10:40:25.0"},{"id":1279,"dev_mod":"","dev_name":"ipv6-1","ip":"fe80:0:0:0:c56b:8479:e223:202e","areacode":"001003","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-12 09:58:45.0"},{"id":1280,"dev_mod":"","dev_name":"ipv4","ip":"192.168.6.33","areacode":"011","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-12 09:59:12.0"},{"id":1281,"dev_mod":"","dev_name":"","ip":"10.22.0.24","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1323:00:05.0"},{"id":1282,"dev_mod":"","dev_name":"","ip":"10.88.0.108","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-13 23:00:05.0"},{"id":1283,"dev_mod":"","dev_name":"","ip":"10.88.0.102","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-13 23:00:05.0"},{"id":1284,"dev_mod":"","dev_name":"","ip":"10.22.0.51","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-13 23:00:05.0"},{"id":1285,"dev_mod":"","dev_name":"dwei_test_bj","ip":"10.88.0.103","areacode":"011","tel":"","contacts":"dwei","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-14 15:38:14.0"},{"id":1286,"dev_mod":"","dev_name":"","ip":"192.168.1.55","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1287,"dev_mod":"","dev_name":"","ip":"192.168.1.41","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1288,"dev_mod":"","dev_name":"","ip":"192.168.6.101","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1289,"dev_mod":"","dev_name":"","ip":"192.229.145.200","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1290,"dev_mod":"","dev_name":"","ip":"192.168.6.206","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1291,"dev_mod":"","dev_name":"","ip":"192.168.6.137","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1292,"dev_mod":"","dev_name":"","ip":"192.168.1.65","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1293,"dev_mod":"","dev_name":"","ip":"192.168.6.205","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1294,"dev_mod":"","dev_name":"","ip":"192.168.6.56","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1295,"dev_mod":"","dev_name":"","ip":"192.168.6.38","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1296,"dev_mod":"","dev_name":"","ip":"192.168.3.81","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1297,"dev_mod":"","dev_name":"","ip":"192.168.3.67","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1298,"dev_mod":"","dev_name":"","ip":"192.110.214.11","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1299,"dev_mod":"","dev_name":"","ip":"192.40.37.132","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1300,"dev_mod":"","dev_name":"","ip":"192.168.3.105","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1301,"dev_mod":"","dev_name":"","ip":"192.168.6.203","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1302,"dev_mod":"","dev_name":"","ip":"192.40.37.116","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1303,"dev_mod":"","dev_name":"","ip":"192.168.4.196","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1304,"dev_mod":"","dev_name":"","ip":"192.168.1.59","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1305,"dev_mod":"","dev_name":"","ip":"192.168.4.222","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1306,"dev_mod":"","dev_name":"","ip":"192.168.102.28","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1307,"dev_mod":"","dev_name":"","ip":"192.168.101.27","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1308,"dev_mod":"","dev_name":"","ip":"192.168.1.63","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1309,"dev_mod":"","dev_name":"","ip":"192.40.37.109","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1310,"dev_mod":"","dev_name":"","ip":"172.19.192.2","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1311,"dev_mod":"","dev_name":"","ip":"192.168.3.102","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1312,"dev_mod":"","dev_name":"","ip":"192.168.1.53","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-1923:00:07.0"},{"id":1313,"dev_mod":"","dev_name":"","ip":"192.168.1.20","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1314,"dev_mod":"","dev_name":"","ip":"192.168.6.140","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-19 23:00:07.0"},{"id":1315,"dev_mod":"","dev_name":"1","ip":"192.168.1.3","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-23 17:10:47.0"},{"id":1317,"dev_mod":"","dev_name":"cc","ip":"192.168.16.3","areacode":"001002","tel":"","contacts":"","email":"","system":"windows","type":"PC","description":"","createtime":"2016-08-23 17:30:10.0"},{"id":1318,"dev_mod":"","dev_name":"","ip":"192.168.6.2","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-25 23:00:09.0"},{"id":1319,"dev_mod":"","dev_name":"","ip":"192.168.6.118","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-25 23:00:09.0"},{"id":1320,"dev_mod":"","dev_name":"","ip":"192.168.6.147","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-2523:00:09.0"},{"id":1321,"dev_mod":"","dev_name":"","ip":"192.168.0.1","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-26 23:00:06.0"},{"id":1322,"dev_mod":"","dev_name":"","ip":"192.168.4.178","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-26 23:00:06.0"},{"id":1323,"dev_mod":"","dev_name":"","ip":"192.168.6.167","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-26 23:00:06.0"},{"id":1324,"dev_mod":"","dev_name":"","ip":"192.168.6.111","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-29 23:00:22.0"},{"id":1325,"dev_mod":"","dev_name":"","ip":"192.168.6.113","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-2923:00:22.0"},{"id":1326,"dev_mod":"","dev_name":"","ip":"192.168.31.27","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-29 23:00:22.0"},{"id":1327,"dev_mod":"","dev_name":"","ip":"192.168.6.114","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-30 23:00:02.0"},{"id":1328,"dev_mod":"","dev_name":"","ip":"192.168.2.103","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-08-31 23:00:01.0"},{"id":1329,"dev_mod":"","dev_name":"","ip":"192.168.2.85","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-09-0123:00:02.0"},{"id":1330,"dev_mod":"","dev_name":"","ip":"192.168.3.231","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-09-02 23:00:03.0"},{"id":1331,"dev_mod":"","dev_name":"","ip":"192.168.2.252","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-09-02 23:00:03.0"},{"id":1332,"dev_mod":"","dev_name":"","ip":"192.168.6.134","areacode":"011","tel":"","contacts":"","email":"","system":"","type":"PC","description":"","createtime":"2016-09-10 23:00:05.0"}],"attack":{"trackers":[{"uuid":"1","fromip":"192.168.6.126","toip":"101.96.10.73","attacktime":"2016-09-13 07:45:18","attacktitle":"下载恶意文档：192.168.6.126_1473723929_392770_http_andale32.exe","parentclassifyid":"-1","attackhazardlevel":"-1"},{"uuid":"2","fromip":"192.168.6.147","toip":"60.174.156.12","attacktime":"2016-09-13 11:52:29","attacktitle":"下载恶意文档：192.168.6.147_1473738648_404578_http_QQBrowser_Setup_QQ_medal_140.dll","parentclassifyid":"-1","attackhazardlevel":"-1"},{"uuid":"3","fromip":"192.168.6.140","toip":"61.172.246.236","attacktime":"2016-09-13 15:16:48","attacktitle":"下载恶意文档：192.168.6.140_1473750896_104486_http_%E5%A4%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BF%9C%E7%A8%8B%E6%A1","parentclassifyid":"-1","attackhazardlevel":"-1"},{"uuid":"4","fromip":"192.168.6.140","toip":"61.172.246.236","attacktime":"2016-09-13 15:16:47","attacktitle":"下载恶意文档：192.168.6.140_1473750898_104490_http_%E5%A4%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BF%9C%E7%A8%8B%E6%A1","parentclassifyid":"-1","attackhazardlevel":"-1"}]}}';

    var object = $.parseJSON(string);

    $("#loadbg").css('display', 'none');
    $("#loadimg").css('display', 'none');

    dealData(object);

    return false;

    //获取所有数据
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log("success");

            $("#loadbg").css('display', 'none');
            $("#loadimg").css('display', 'none');


            dealData(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alertMsg("未获取到数据");
            console.log(errorThrown);
        },
        //支持同步
        async: false,
    });
}


//得到数据
function dealData(data) {

    //初始化参数
    clear();
    init();

    var getTransData = data;
    var areaData = data.area;
    var computerData = data.assets;
    var attackComputer = data.attack.trackers;
    var dataError = data.attack.error;

    var errormsg = '';
    if (areaData!=null&&areaData.error != null) {
        errormsg = areaData.error;
        alertMsg(errormsg);
        return;
    }
    if (computerData!=null&&computerData.error != null) {
        errormsg = computerData.error;
        alertMsg(errormsg);
        return;
    }
    if (dataError != null) {
        errormsg = dataError;
        alertMsg(errormsg);
    }
    console.log(dataError);

    if (dataError == "1") {
        attackComputer = [];
        setTimeout("alertMsg('未获取到攻击数据')", 3500);
    }
    if (attackComputer == null || attackComputer == 'undefined') {
        attackComputer = [];
        setTimeout("alertMsg('未获取到攻击数据')", 3500);
    }
    if (attackComputer.length <= 0) {
        setTimeout("alertMsg('未获取到攻击数据')", 3500);
    }

    separate(areaData);
    transOriData(grandChildData, computerData, childRectData, rectData);

    var rectLayout = getRectLayout(areaData, computerData, attackComputer);
    console.log(rectLayout);

    draw(rectLayout);
}


//得到相关布局数据
function getRectLayout(areaData, computerData, attackComputer) {
    var rect = new Object();


    var obj = new Object();
    obj.col1 = 110;
    obj.col2 = 110;
    obj.col3 = 110;
    //对每个rect计算x，y并更新obj的列高
    for (var i = 0; i < transData.length ; i++) {

        //计算父区域布局
        var returnObj = calculate(obj, transData[i]);

    }


    //将父区域数据，子区域数据，区域logo数据返回回去
    rect.father = transData;
    rect.child = transChildData;

    rect.grandChild = transGrandChild;

    rect.computer = getComputer(rect.child, grandChildData, computerData);
    rect.logo = transLogo;
    rect.logoArea = transLogoArea;
    rect.attack = getAttack(rect.computer, attackComputer);
    rect.rectAttack = getRectAttack(rect.father, areaData, computerData, attackComputer);

    //屏幕适高
    if (returnObj==null||returnObj == 'undefined')
        return;
    var winHeight = Math.max(returnObj.col1, returnObj.col2, returnObj.col3);

    rect.winHeight = winHeight + 100;
    return rect;
}






//把所有的区块拆分成父区域和子区域
function separate(areaData) {
    var isGrandChild = false;

    for (var i = 0; i < areaData.length ; i++) {
        if (areaData[i].pid == "0") {
            rectData.push(areaData[i]);
        } else {

            //查询data[i]的子区域 , grandChildData
            for (var j = 0 ; j < areaData.length ; j++) {
                if (areaData[i].id == areaData[j].pid) {
                    grandChildData.push(areaData[j]);
                    areaData[j].isGrandChild = true;
                    //表明改区域下有曾子区域
                    areaData[i].hasGrandChild = true;
                }
            }
            //childData
            if (!areaData[i].isGrandChild) {
                childRectData.push(areaData[i]);
            }



        }
    }

}






//转化相关布局数据
function transOriData(grandChildData, computerData, childRectData, rectData) {

    //计算曾子区域电脑数
    for (var k = 0 ; k < grandChildData.length ; k++) {
        //电脑数
        var ChildComnum = 0;
        //计算子区域电脑数
        for (var j = 0 ; j < computerData.length ; j++) {

            //修改区域图标
            /* if (computerData[j].type == "PC"){
                 computerData[j].type = "0";
             }else if (computerData[j].type == "SERVER"){
                 computerData[j].type = "2";
             }
 */


            if (grandChildData[k].id == computerData[j].areacode) {
                ChildComnum++;
                grandChildData[k].comNum = ChildComnum;
            }


        }

        //单个子区域的height=120;如果区域内没有点脑，则不显示
        if (ChildComnum > 0) {
            grandChildData[k].height = (Math.ceil(ChildComnum / 6) - 1) * childColHeight + 90;
        } else {
            grandChildData[k].height = 0;

        }
    }





    //遍历电脑数据，来确定区域高度
    for (var i = 0; i < childRectData.length ; i++) {

        //初始化变量
        childRectData[i].height = 0;
        //电脑数
        var Comnum = 0;
        //计算子区域电脑数
        for (var j = 0 ; j < computerData.length ; j++) {

            //修改区域图标
            //TODO:增加多种图标样式
            /*   if (computerData[j].type == "PC"){
                   computerData[j].type = "0";
               }else if (computerData[j].type == "SERVER"){
                   computerData[j].type = "2";
               }*/


            if (childRectData[i].id == computerData[j].areacode) {
                Comnum++;
                childRectData[i].comNum = Comnum;
            }


        }

        //一行容纳6台电脑，超出一行的向下取整，暂无下线

        //单个子区域的height=120;如果区域内没有点脑，则不显示
        if (Comnum > 0) {
            childRectData[i].height = (Math.ceil(Comnum / 6) - 1) * childColHeight + 80;
        } else {
            childRectData[i].height = 0;

        }

        //计算含有曾子区域的rect高度
        if (childRectData[i].hasGrandChild) {
            for (var h = 0 ; h < grandChildData.length ; h++) {
                childRectData[i].height += grandChildData[h].height + 30;
            }
        }

    }



    //转化父区域原始数据
    for (var j = 0; j < rectData.length ; j++) {


        //匹配图片
        if ((rectData[j].imgnormal == "1.png") || (rectData[j].imgnormal == "2.png") || (rectData[j].imgnormal == "3.png")) {
            rectData[j].img = "../vendor/apt/images/oa.png";
            rectData[j].backgroundColor = "#F2FAEA";
            rectData[j].titleColor = "#527706";
            rectData[j].strokeColor = "#527706";
            rectData[j].childBorderColor = "#A1D186";
            rectData[j].childFontColor = "#527706";
        } else if (rectData[j].imgnormal == "4.png") {
            rectData[j].img = "../vendor/apt/images/test.png";
            rectData[j].backgroundColor = "#EAF5FA";
            rectData[j].titleColor = "#148EE2";
            rectData[j].strokeColor = "#148EE2";
            rectData[j].childBorderColor = "#A1D5F8";
            rectData[j].childFontColor = "#148EE2";
        } else if (rectData[j].imgnormal == "5.png") {
            rectData[j].img = "../vendor/apt/images/sale.png";
            rectData[j].backgroundColor = "#F9E5DA";
            rectData[j].titleColor = "#E45416";
            rectData[j].strokeColor = "#E45416";
            rectData[j].childBorderColor = "#D8AD90";
            rectData[j].childFontColor = "#E45416";
        }


        //取子区域的个数

        var rectObj = new Object();
        rectObj.height = 0;
        rectObj.width = colWidth;


        var childNum = 0;
        var computerNum = 0;
        //计算父区域的高度
        for (var i = 0; i < childRectData.length ; i++) {

            if (rectData[j].id == childRectData[i].pid) {
                rectObj.height += childRectData[i].height;
                childNum++;
                //TODO：可以添加区域间的电脑
            }
        }
        //如果没有子区域
        if (childNum == 0) {
            for (var k = 0 ; k < computerData.length ; k++) {
                //但是父区域内有电脑
                if (rectData[j].id == computerData[k].areacode) {
                    computerNum++;
                }
            }
        }

        rectObj.height += Math.ceil(computerNum / 6) * childColHeight * 0.9;

        //加上头坐标的高度
        rectObj.height += 110;



        //其余变量赋值
        rectObj.id = rectData[j].id;
        rectObj.pid = rectData[j].pid;
        rectObj.img = rectData[j].img;
        //接口为name，画图为rectName
        rectObj.rectName = rectData[j].name;
        //区域配色传值
        rectObj.backgroundColor = rectData[j].backgroundColor;
        rectObj.titleColor = rectData[j].titleColor;
        rectObj.strokeColor = rectData[j].strokeColor;
        rectObj.childBorderColor = rectData[j].childBorderColor;
        rectObj.childFontColor = rectData[j].childFontColor;

        //转化后的副区域数据
        transData[j] = rectObj;




    }


}









function getComputer(transChildData, grand, computerData) {



    //子区域电脑排版
    for (var j = 0; j < transChildData.length; j++) {
        //起始为0,一行四个，间距20
        var colnNum = 0;
        var rowNum = 0;
        var step;
        for (var i = 0; i < computerData.length; i++) {

            //计算computer的下，x，y坐标
            if (transChildData[j].id == computerData[i].areacode) {
                step = colnNum % 6 * 40 + 15;
                computerData[i].x = transChildData[j].x + step;
                computerData[i].y = transChildData[j].y + rowNum * 30 + 40;

                colnNum++;
                if (colnNum % 6 == 0) {
                    rowNum++;
                }


            }


            //根据数字对应图片类型
            switch (computerData[i].type) {
                case "PC":
                    computerData[i].img = "../vendor/apt/images/computer1.png";
                    break;
                case "1":
                    computerData[i].img = "../vendor/apt/images/computer2.png";
                    break;
                case "SERVER":
                    computerData[i].img = "../vendor/apt/images/server.png";
                    break;
                case "3":
                    computerData[i].img = "../vendor/apt/images/firewall.png";
                    break;
            }

        }
    }

    //父区域电脑布局
    for (var k = 0; k < transData.length; k++) {
        //起始为0,一行四个，间距20
        var colnNum = 0;
        var rowNum = 0;
        var step;
        for (var i = 0; i < computerData.length; i++) {

            //计算computer的下，x，y坐标
            if (transData[k].id == computerData[i].areacode) {
                step = colnNum % 6 * 40 + 25;
                computerData[i].x = transData[k].x + step;
                computerData[i].y = transData[k].y + rowNum * 33 + 60;

                colnNum++;
                if (colnNum % 6 == 0) {
                    rowNum++;
                }


            }


            //根据数字对应图片类型
            switch (computerData[i].type) {
                case "PC":
                    computerData[i].img = "../vendor/apt/images/computer1.png";
                    break;
                case "1":
                    computerData[i].img = "../vendor/apt/images/computer2.png";
                    break;
                case "SERVER":
                    computerData[i].img = "../vendor/apt/images/server.png";
                    break;
                case "3":
                    computerData[i].img = "../vendor/apt/images/firewall.png";
                    break;
            }

        }
    }



    //曾子区域电脑布局
    for (var h = 0; h < grand.length; h++) {
        //起始为0,一行四个，间距20
        var colnNum1 = 0;
        var rowNum1 = 0;
        var step1;
        for (var i = 0; i < computerData.length; i++) {

            //计算computer的下，x，y坐标
            if (grand[h].id == computerData[i].areacode) {
                step1 = colnNum1 % 6 * 40 + 15;
                computerData[i].x = grand[h].x + step1;
                computerData[i].y = grand[h].y + rowNum1 * 30 + 43;

                colnNum1++;
                if (colnNum1 % 6 == 0) {
                    rowNum1++;
                }



            }


            //根据数字对应图片类型
            switch (computerData[i].type) {
                case "PC":
                    computerData[i].img = "../vendor/apt/images/computer1.png";
                    break;
                case "1":
                    computerData[i].img = "../vendor/apt/images/computer2.png";
                    break;
                case "SERVER":
                    computerData[i].img = "../vendor/apt/images/server.png";
                    break;
                case "3":
                    computerData[i].img = "../vendor/apt/images/firewall.png";
                    break;
            }

        }
    }

    return computerData;



}







//计算父区域布局
function calculate(obj, rect) {

    var array = [obj.col1, obj.col2, obj.col3];


    //最小列的序号
    var min = array.indexOf(Math.min.apply(Math, array));

    //列宽为1

    //整体右移
    rect.x = min * colWidth + width * 0.18;
    rect.y = Math.min.apply(Math, array);

    //增加列高
    switch (min) {
        case 0:
            obj.col1 = obj.col1 + rect.height + 15;
            break;
        case 1:
            obj.col2 = obj.col2 + rect.height + 15;
            break;
        case 2:
            obj.col3 = obj.col3 + rect.height + 15;
            break;

    }






    //找到对应的子区域，计算子区域的布局数据
    //对子区域数据进行转化
    //子区域布局对象
    var childRect;
    var grandChildRect;
    //区域logo布局对象
    var logoRect;
    //logo外区域
    var logoAreaRect;

    var temp = 0;

    var lastHeight = 0;
    var lastChildHeigh = 0;


    for (var m = 0; m < childRectData.length ; m++) {
        var grandNum = 0;

        if ((rect.id == childRectData[m].pid) && (childRectData[m].height > 0)) {



            childRect = new Object();
            childRect.x = rect.x + 20;
            childRect.y = (rect.y + 55) + lastHeight;
            childRect.width = childColWidth;
            //height之前计算过

            childRect.id = childRectData[m].id;
            childRect.pid = rect.id;
            childRect.rectName = childRectData[m].name;
            childRect.height = childRectData[m].height;
            childRect.borderColor = rect.childBorderColor;
            childRect.fontColor = rect.childFontColor;
            lastHeight += childRect.height;
            transChildData.push(childRect);




            //对曾子区域计算布局
            if (childRectData[m].hasGrandChild) {
                for (var j = 0 ; j < grandChildData.length ; j++) {
                    grandChildRect = new Object();
                    grandChildRect.x = childRect.x + 13;
                    grandChildRect.y = childRect.y + 37 + lastChildHeigh;
                    grandChildRect.width = childColWidth * 0.9;
                    grandChildRect.height = grandChildData[j].height;
                    lastChildHeigh += grandChildRect.height;
                    grandChildRect.id = grandChildData[j].id;
                    grandChildRect.pid = rect.id;
                    grandChildRect.rectName = grandChildData[j].name;
                    grandNum++;
                    transGrandChild.push(grandChildRect);
                }

            }


            temp++;


        }

    }

    logoRect = new Object();
    logoRect.x = rect.x + 130;
    logoRect.y = rect.y + 40;
    logoRect.img = rect.img;
    transLogo.push(logoRect);


    logoAreaRect = new Object();
    logoAreaRect.x = rect.x + 20;
    logoAreaRect.y = rect.y;
    logoAreaRect.width = 300;
    logoAreaRect.height = 150;
    logoAreaRect.backgroundColor = rect.backgroundColor;
    logoAreaRect.titleColor = rect.titleColor;
    logoAreaRect.strokeColor = rect.strokeColor;
    logoAreaRect.rectName = rect.rectName;
    transLogoArea.push(logoAreaRect);


    return obj;
}




//计算攻击详情路径
function getAttack(com, attackComputer) {

    console.log("进入函数getAttack");

    var map = {};
    var lineMap = {};

    var attackObj1;
    var attackObj2;
    var attack;
    //存放攻击点和攻击线的数据
    var realAttackPoint = [];
    var realAttackLine = [];


    for (var i = 0; i < com.length; i++) {
        map[com[i].ip] = com[i];
    }
    for (var i = 0 ; i < attackComputer ; i++) {
        lineMap[attackComputer[i].fromip] = attackComputer[i];
    }

    var marginleft = window.innerWidth * 0.05 + 100;


    //外界电脑的列高，并设定起始高度
    var outsideCol = 110;
    //外界电脑间隔
    var marginComputer = 40;
    //存放外界电脑
    var outsideCom = [];
    //记录外界电脑,用未攻击状态表示
    var outsideObj;
    //是否已经绘制电脑标记
    var comFlag = false;

    //传递关联攻击和无关联攻击
    var relateAtt = [], noRelateAtt = [];

    //设置标记
    var num = 0;




    for (var j = 0 ; j < attackComputer.length; j++) {

        //攻击点的对象
        attackObj1 = new Object();
        //攻击线的对象
        attackObj2 = new Object();


        //处理toip未录入的情况
        if (map[attackComputer[j].toip] == null) {
            //判断该ip是否已经绘制
            for (var t = 0 ; t < outsideCom.length ; t++) {
                //该点已经绘制，则不再绘制
                if (attackComputer[j].toip == outsideCom[t].ip) {
                    attackObj1.x = marginleft;
                    attackObj1.y = outsideCom[t].y;
                    attackObj2.x2 = marginleft;
                    attackObj2.y2 = outsideCom[t].y;
                    comFlag = true;

                }
            }

            //未绘制该点
            if (!comFlag) {
                outsideCol = outsideCol + marginComputer;
                attackObj1.x = marginleft;
                attackObj1.y = outsideCol;
                attackObj2.x2 = marginleft;
                attackObj2.y2 = outsideCol;
                //push到outsideCom集合中
                outsideObj = new Object();
                outsideObj.id = attackComputer[j].id;
                outsideObj.ip = attackComputer[j].toip;
                outsideObj.x = marginleft;
                outsideObj.y = outsideCol;
                outsideObj.img = "../vendor/apt/images/computer1.png";
                outsideCom.push(outsideObj);
            }
            //重置
            comFlag = false;


        } else {
            //只取被攻击点的坐标
            attackObj1.x = map[attackComputer[j].toip].x;
            attackObj1.y = map[attackComputer[j].toip].y;

            attackObj2.x2 = map[attackComputer[j].toip].x;
            attackObj2.y2 = map[attackComputer[j].toip].y;
        }



        //处理fromip未录入的情况
        if (map[attackComputer[j].fromip] == null) {
            //判断该ip是否已经绘制
            for (var t = 0 ; t < outsideCom.length ; t++) {
                //该点已经绘制，则不再绘制
                if (attackComputer[j].fromip == outsideCom[t].ip) {
                    attackObj2.x1 = marginleft;
                    attackObj2.y1 = outsideCom[t].y;
                    comFlag = true;
                }
            }
            //未绘制该点
            if (!comFlag) {
                outsideCol = outsideCol + marginComputer;
                attackObj2.x1 = marginleft;
                attackObj2.y1 = outsideCol;

                outsideObj = new Object();
                outsideObj.id = attackComputer[j].id;
                outsideObj.ip = attackComputer[j].fromip;
                outsideObj.x = marginleft;
                outsideObj.y = outsideCol;
                outsideObj.img = "../vendor/apt/images/computer1.png";
                outsideCom.push(outsideObj);
            }
            //重置
            comFlag = false;


        } else {
            //push攻击线的坐标
            attackObj2.x1 = map[attackComputer[j].fromip].x;
            attackObj2.y1 = map[attackComputer[j].fromip].y;

        }

        if (attackComputer[j].attacktitle == null) {
            attackObj2.attackType = "未知类型";
        } else {
            attackObj2.attackType = attackComputer[j].attacktitle;
        }

        //其余变量赋值
        attackObj1.parentclassifyid = attackComputer[j].parentclassifyid;
        if ("-1" == attackComputer[j].parentclassifyid) {
            attackObj1.attackColor = attackColor[0];
        } else {
            attackObj1.attackColor = attackColor[attackComputer[j].parentclassifyid];
        }
        //按照group区分颜色
        // attackObj1.attackColor = attackColor[ attackComputer[j].group ];
        attackObj1.x = attackObj1.x + 10;
        attackObj1.y = attackObj1.y + 10;


        attackObj2.fromip = attackComputer[j].fromip;
        attackObj2.toip = attackComputer[j].toip;
        attackObj2.attacktime = attackComputer[j].attacktime;
        attackObj2.parentclassifyid = attackComputer[j].parentclassifyid;
        if ("-1" == attackComputer[j].parentclassifyid) {
            attackObj2.attackColor = attackColor[0];
        } else {
            attackObj2.attackColor = attackColor[attackComputer[j].parentclassifyid];
        }

        // attackObj2.attackColor = attackColor[ attackComputer[j].group ];
        attackObj2.x1 = attackObj2.x1 + 10;
        attackObj2.y1 = attackObj2.y1 + 10;
        attackObj2.x2 = attackObj2.x2 + 10;
        attackObj2.y2 = attackObj2.y2 + 10;
        attackObj2.num = num;

        attackObj2.uuid = attackComputer[j].uuid;

        //去除外界的被攻击电脑
        if (map[attackComputer[j].toip] != null) {

            var attImg = map[attackComputer[j].toip].type;
            //被攻击的图标类型
            if ("PC" == attImg) {
                attackObj2.attImg = "../vendor/apt/images/computer2.png";
            } else if ("SERVER" == attImg) {
                attackObj2.attImg = "../vendor/apt/images/server2.png";
            }
        } else {
            //外界区域统一为PC图标
            attackObj2.attImg = "../vendor/apt/images/computer2.png";
        }






        //分别处理关联数据和无关联数据
        if ("" == attackComputer[j].uuid) {
            if (relateArr.length > 0) {
                relateAtt.push(relateArr);
                relateArr = [];
            }
            noRelateAtt.push(attackObj2);
        } else {
            //判断是否开始放入一个新的数组relateArr中
            if (lastUuid != attackComputer[j].uuid) {
                if (relateArr.length > 0) {
                    relateAtt.push(relateArr);
                }
                relateArr = [];
                if (relateColor == 19) {
                    relateColor = 0;
                }
                relateColor++;
                relateArr.push(attackObj2);
                lastUuid = attackComputer[j].uuid;
            } else
                //uuid相同的情况下放入一个数组，再push到relateAtt中
            {
                relateArr.push(attackObj2);
            }
            attackObj2.attackColor = attackColor[relateColor];
            attackObj1.attackColor = attackColor[relateColor];
        }



        var showobj = new Object();
        showobj.fromip = attackComputer[j].fromip;
        showobj.toip = attackComputer[j].toip;
        showobj.attacktime = attackComputer[j].attacktime;
        showobj.attackType = attackObj2.attackType;
        attackObj2.showobj = [showobj];


        var sameip = false;
        //处理线条重复的信息叠加
        for (var k = 0 ; k < realAttackLine.length ; k++) {
            //fromip与toip相同, 信息叠加
            if ((realAttackLine[k].fromip == attackComputer[j].fromip) && (realAttackLine[k].toip == attackComputer[j].toip)) {
                //attackObj2.showobj.push( realAttackLine[k].showobj )
                realAttackLine[k].showobj.push(showobj);
                sameip = true;
            }
        }

        if (!sameip) {
            num++;
            realAttackPoint.push(attackObj1);
            realAttackLine.push(attackObj2);
        }




    }





    attack = new Object();
    attack.realAttackPoint = realAttackPoint;
    attack.realAttackLine = realAttackLine;
    attack.outsideCom = outsideCom;
    attack.noRelateAtt = noRelateAtt;
    attack.relateAtt = relateAtt;

    return attack;

}

//计算区域攻击路径
function getRectAttack(rect, areaData, computerData, attackComputer) {

    var map1 = {};
    var attack;
    for (var i = 0; i < computerData.length; i++) {
        map1[computerData[i].ip] = computerData[i];
    }
    var map2 = {};
    for (var i = 0 ; i < areaData.length ; i++) {
        map2[areaData[i].id] = areaData[i];
    }
    var map3 = {};
    for (var i = 0 ; i < rect.length ; i++) {
        map3[rect[i].id] = rect[i];
    }
    var rectAttack;
    var rectAttackPoint = [];
    var rectAttackLine = [];

    var marginleft = window.innerWidth * 0.05 + 100;



    for (var j = 0 ; j < attackComputer.length ; j++) {

        var attPoint = new Object();
        var attLine = new Object();


        //未录入的机器fromip
        if (map1[attackComputer[j].fromip] == null) {
            attLine.x1 = marginleft;
            attLine.y1 = 180;
        }
            //已录入的机器他toip
        else {
            //找到电脑对应的区域id
            //找到区域的父区域,这里只处理两层
            var fromid = (map1[attackComputer[j].fromip]).areacode;
            var fatherFromId = (map2[fromid]).pid;
            //在区域中直接有电脑的情况
            if (fatherFromId == 0) {
                fatherFromId = fromid;
            }
            attLine.x1 = map3[fatherFromId].x + map3[fatherFromId].width / 2;
            attLine.y1 = map3[fatherFromId].y + 80;

        }


        //未录入的机器
        if (map1[attackComputer[j].toip] == null) {

            attPoint.x = marginleft;
            attPoint.y = 180;
            attLine.x2 = marginleft;
            attLine.y2 = 180;
        }
            //已录入的机器他toip
        else {
            //找到电脑对应的区域id
            //找到区域的父区域,这里只处理两层
            var toid = (map1[attackComputer[j].toip]).areacode;
            var fatherToId = (map2[toid]).pid;
            //在区域中直接有电脑的情况
            if (fatherToId == 0) {
                fatherToId = toid;
            }

            attPoint.x = map3[fatherToId].x + map3[fatherToId].width / 2;
            attPoint.y = map3[fatherToId].y + 80;
            attLine.x2 = attPoint.x;
            attLine.y2 = attPoint.y;
        }


        //区域攻击的point和line的color赋值
        attPoint.attackColor = attackColor[attackComputer[j].parentclassifyid];
        attLine.attackColor = attackColor[attackComputer[j].parentclassifyid];


        rectAttackPoint.push(attPoint);
        rectAttackLine.push(attLine);
    }

    rectAttack = new Object();
    rectAttack.rectAttackPoint = rectAttackPoint;
    rectAttack.rectAttackLine = rectAttackLine;

    return rectAttack;
}



function alertMsg(str) {
    ymPrompt.alert({ message: str, width: 250, height: 160, title: "提示", titleBar: true, showShadow: true });

    $("#loadbg").css('display', 'none');
    $("#loadimg").css('display', 'none');
}




