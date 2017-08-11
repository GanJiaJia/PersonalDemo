$(window).load(function() {
	centerMiddle();
});
$(window).resize(function() {
 centerMiddle();
});
// 点击添加设备弹窗
$('body').on('click','#equipment',function(){
	$('#add_equipments,.list_mask').fadeIn();
	$('.equipment_name').val('');
	$('.equipment_url').val('');
	$('.equipment_remark').text('');
})
//关闭弹窗
$('body').on('click','.close,.add_cancle',function(){
	$('.add_account,.list_mask').fadeOut();
})
// 确认添加设备
$('body').on('click','#add_equipment_btn',function(){
	var equipment_name = $('.equipment_name').val(),
		equipment_url = $('.equipment_url').val(),
		equipment_lurl = $('.equipment_lurl').val(),
		equipment_remark = $('.equipment_remark').text();
	if (equipment_name == '') {
		$('.addaccount_tips.ln').text('请输入设备型号');
	} else {
		$('.addaccount_tips.ln').text('');
		var html = '<tr><td>1231313</td><td class="xh">'+equipment_name+'</td><td>2016/12/5 12:10:30</td><td>2017/1/11 14:10:40</td><td>运行正常</td><td><span class="edit icon-pencil"></span></td></tr>';
		$('.accontlist').prepend(html);
		$('.add_account,.list_mask').fadeOut();
	}
	
})
// 编辑弹窗
var thisText = '';
$('body').on('click','.edit',function(){
	$('#edit_equipment,.list_mask').fadeIn();
	var xh = $(this).parent().parent().find('.xh').text();
	$('.edit_equipment_name').val(xh);
	thisText = $(this);
})
//确认修改设备信息
$('body').on('click','#edit_equipment_btn',function(){
	var xhName = $('.edit_equipment_name').val();
	if (xhName == '') {
		$('.addaccount_tips.ln').text('请输入设备型号');
	} else {
		thisText.parent().parent().find('.xh').text(xhName);
		$('.add_account,.list_mask').fadeOut();
	}
})