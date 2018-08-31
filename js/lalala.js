var slider = {
    //判断设备是否支持touch事件
    touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    slider:document.getElementById('slider'),

    //�¼�
    events:{
    	totalPage:1, 
        index:0,     //显示元素的索引
        slider:document.getElementById('slider'),     
        section:document.getElementsByTagName('section'),
        statu:0,//1为正在移动,
        direction:0,//1为上，2为下
        zIndex:10,//z-index
        hheight:document.documentElement.clientHeight,//最为准确
        prevPoint:{x:null,y:null},
        handleEvent:function(event){
            var self = this;     //this指events对象
            if(event.type == 'touchstart'){
                self.start(event);
            }else if(event.type == 'touchmove'){
                self.move(event);
            }else if(event.type == 'touchend'){
                self.end(event);
            }
        },
        //滑动开始
        start:function(event){
        	if(!(event.offsetHeight<event.scrollHeight) && event.target.nodeName != 'INPUT' && event.target.className != 'botton'){
            	event.preventDefault();
            	}
            var touch = event.targetTouches[0];      //touches数组对象获得屏幕上所有的touch，取第一个touch
            startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值ֵ
            isScrolling = 0;   ///这个参数判断是垂直滚动还是水平滚动
            slider.slider.addEventListener('touchmove',this,false);
            slider.slider.addEventListener('touchend',this,false);
            slider.prevPoint = {x:touch.pageX,y:touch.pageY};
        },
        //移动
        move:function(event){
        	if(!(event.offsetHeight<event.scrollHeight) && event.target.nodeName != 'INPUT' && event.target.className != 'botton'){
            	event.preventDefault();
            	}
            //当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            var touch = event.targetTouches[0];
            endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
            movePos = {x:touch.pageX - slider.prevPoint.x,y:touch.pageY - slider.prevPoint.y};
            isScrolling = Math.abs(startPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示向下滑动，0为向上滑动
            if(movePos.y>0){//向下
            		if(!this.statu){
            			if(this.index == 0){
            				this.index = this.totalPage;
            			}else{
    	            		this.index -= 1;	
            			}
            			$('section').removeClass('active');
        				$(this.section[this.index]).addClass('active');
	            		this.statu = 1;
	            		this.section[this.index].style.transition = 'bottom 0s'
	            		this.section[this.index].style.zIndex = ++this.zIndex;
                		this.section[this.index].style.bottom = this.hheight+'px';
	            	}else{
	            		this.setZIndex(this.section,(this.index),'d',movePos.y);	
	            	}
            	
            }else if(movePos.y<0){
            	///向上
            		if(!this.statu){

            			if(this.index == this.totalPage){
            				this.index = 0;
            			}else{
                    		this.index += 1;
            			}
           				$('section').removeClass('active');
           				$(this.section[this.index]).addClass('active');
                		this.statu = 1;
                		this.section[this.index].style.transition = 'bottom 0s'
	            		this.section[this.index].style.zIndex = ++this.zIndex;
                		this.section[this.index].style.bottom = '-'+this.hheight+'px';
            		}else{
                		this.setZIndex(this.section,(this.index),'u',movePos.y);
            		}
            }
            
            slider.prevPoint = {x:touch.pageX,y:touch.pageY};//上一个移动点
        },
         //滑动释放
        end:function(event){ 
        	if(!(event.offsetHeight<event.scrollHeight) && event.target.nodeName != 'INPUT' && event.target.className != 'botton'){
            	event.preventDefault();
            	}
            if(this.section[this.index].style.bottom.replace('px','').replace('-','') != 0){
            	this.section[this.index].style.transition = 'bottom 0.4s';
            	this.section[this.index].style.bottom = 0;	
            }
            //解绑事件
            slider.slider.removeEventListener('touchmove',this,false);
            slider.slider.removeEventListener('touchend',this,false);
            this.statu = 0;
        },
        setZIndex:function(sec,num,direction,moveY){
        	var bbottom = this.section[num].style;
        	var bottomval = bbottom.bottom;
       		bottomval = (bottomval.indexOf('px')>-1)?bottomval.replace('px',''):bottomval;
  			bbottom.bottom = bottomval*1-moveY*1+'px';
        }
    },
    
    //初始化
    init:function(){
        var self = this;     //this指slider对象
        if(!!self.touch) self.slider.addEventListener('touchstart',self.events,false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
    }
};

slider.init();
$(function(){
	$('section:first').addClass('active');
})
$('.botton').click(function(){
	alert('submit');
})