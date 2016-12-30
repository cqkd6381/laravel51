/**===================================JQuery================================================**/
/*设置全局 AJAX 默认选项*/
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// $.fn.serializeObject = function() {
//     var o = {};
//     var a = this.serializeArray();
//     $.each(a, function() {
//         if (o[this.name]) {
//             if (!o[this.name].push) {
//                 o[this.name] = [o[this.name]];
//             }
//             o[this.name].push(this.value || '');
//         } else {
//             o[this.name] = this.value || '';
//         }
//     });
//     return o;
// };

/*日期时间插件初始化设置*/
// $(function(){
//
//     //时间日期选择器
//     $('.date-timepicker').datetimepicker({
//         autoclose:true,
//         language:"zh-CN",
//         format:"yyyy-mm-dd hh:ii:ss",
//     }).on('changeDate',function(event){
//         var startTime = $('#start-time').val();
//         var endTime = $('#end-time').val();
//         $('#end-time').datetimepicker('setStartDate',startTime);
//         $('#start-time').datetimepicker('setEndDate',endTime);
//     });
//
//
//     //当前主菜单的自动展示
//     $('.treeview-menu li').each(function(){
//         if ($(this).hasClass('open'))
//         {
//             $(this).closest('.treeview').addClass('active');
//             return false;
//         }
//     });
//
// });

/**===================================End JQuery================================================**/


function tipMessage($vue,statusCode,messageCode,appCode) {
    $vue.alert.status = statusCode;
    $vue.alert.message = messageCode;
    $vue.alert.code = appCode;
}


//*************************VueJS**************************


//*************************FUNCTION**************************

function exports(url,object) {
    var param = $(object).closest('form').serialize();
    window.location.href = url+'?'+param;
}

function success(response) {
    $tool.message(response.body.message,function(){
        parent.layer.close(parent.layer.getFrameIndex(window.name));
        parent.window.location.reload();
    });
}

function error(response) {
    $tool.message(response.body.message);
}

function layerOpen(title,url,width,height) {
    var object = {
        type:2,
        content:url,
        'title':title,
    };

    if (width && !height) {
        object.area = ['700px',width+'px'];
    } else {
        object.area = [width+'px',height+'px'];
    }

    layer.open(object);
}

function alert_tip()
{
    if ($(document).find('.win-alert').hasClass('alert-danger'))
    {
        $(document).find('.alert-danger').show();
    }
    else
    {
        $(document).find('.alert-success').delay(2000).fadeOut(800);
    }
}