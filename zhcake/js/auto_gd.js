$(function(){
    //@Mr.Think***����
    var $cur = 1;//��ʼ����ʾ�İ���
    var $i = 4;//ÿ����ʾ��
    var $len = $('.showbox>ul>li').length;//�����б��ܳ���(����)
    var $pages = Math.ceil($len / $i);//����չʾ��������
    var $w = $('.ibox').width();//ȡ��չʾ����Χ���
    var $showbox = $('.showbox');
    var $num = $('span.num li')
    var $pre = $('div#movel')
    var $next = $('div#mover');
    var $autoFun;
	//@Mr.Think***�����Զ�����
    autoSlide();
	//@Mr.Think***��ǰ����
    $pre.click(function(){
        if (!$showbox.is(':animated')) {  //�ж�չʾ���Ƿ񶯻�
            if ($cur == 1) {   //�ڵ�һ������ʱ,����ǰ���������һ������
                $showbox.animate({
                    left: '-=' + $w * ($pages - 1)
                }, 500); //�ı�leftֵ,�л���ʾ����,500(ms)Ϊ����ʱ��,��ͬ
                $cur = $pages; //��ʼ������Ϊ���һ������
            }
            else { 
                $showbox.animate({
                    left: '+=' + $w
                }, 500); //�ı�leftֵ,�л���ʾ����
                $cur--; //�����ۼ�
            }
            $num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //Ϊ��Ӧ�İ������ּ��ϸ�����ʽ,���Ƴ�ͬ��Ԫ�صĸ�����ʽ
        }
    });
    //@Mr.Think***������
    $next.click(function(){
        if (!$showbox.is(':animated')) { //�ж�չʾ���Ƿ񶯻�
            if ($cur == $pages) {  //�����һ������ʱ,������������һ������
                $showbox.animate({
                    left: 0
                }, 500); //�ı�leftֵ,�л���ʾ����,500(ms)Ϊ����ʱ��,��ͬ
                $cur = 1; //��ʼ������Ϊ��һ������
            }
            else {
                $showbox.animate({
                    left: '-=' + $w
                }, 500);//�ı�leftֵ,�л���ʾ����
                $cur++; //�������ۼ�
            }
            $num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //Ϊ��Ӧ�İ������ּ��ϸ�����ʽ,���Ƴ�ͬ��Ԫ�صĸ�����ʽ
        }
    });
    //@Mr.Think***���ֵ���¼�
    $num.click(function(){
        if (!$showbox.is(':animated')) { //�ж�չʾ���Ƿ񶯻�
            var $index = $num.index(this); //��������ǰ������б��е�λ��ֵ
            $showbox.animate({
                left: '-' + ($w * $index) 
            }, 500); //�ı�leftֵ,�л���ʾ����,500(ms)Ϊ����ʱ��
            $cur = $index + 1; //��ʼ������ֵ,��һ��ɱ��⵱������������ʱ,������ť,����հװ�.index()ȡֵ�Ǵ�0��ʼ��,�ʼ�1
            $(this).addClass('numcur').siblings().removeClass('numcur'); //Ϊ��ǰ������ϸ�����ʽ,���Ƴ�ͬ��Ԫ�صĸ�����ʽ
        }
    });
    //@Mr.Think***ֹͣ����
    clearFun($showbox);
    clearFun($pre);
    clearFun($next);
    clearFun($num);
    //@Mr.Think***�¼�����ʱֹͣ�Զ�����
    function clearFun(elem){
        elem.hover(function(){
            clearAuto();
        }, function(){
            autoSlide();
        });
    }
    //@Mr.Think***�Զ�����
    function autoSlide(){
        $next.trigger('click');
        $autoFun = setTimeout(autoSlide, 3000);//�˴�����ʹ��setInterval,setInterval���ظ�ִ�д��뺯��,�������ڶ��λ���ʱֹͣʧЧ
    }
    //@Mr.Think***����Զ�����
    function clearAuto(){
        clearTimeout($autoFun);
    }
});