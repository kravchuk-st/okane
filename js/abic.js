	checkbox=function(base,img,opt){
		var self=this;
		self.options=opt || {};
		self.base=typeof base == 'object' ? base : $(base);
		self.img=typeof img == 'object' ? img : $(img);
		self.show=self.getopt('show',false);
		self.img.css('display',(self.show ? 'block' : 'none'));
		self.base.bind("mousedown touchstart",self,self.oncheck);
	};
	checkbox.prototype={
		getopt: function(name, defvalue){
			return this.options[name] !== undefined ? this.options[name] : defvalue;
		},
		oncheck: function(e){
			var self=e.data;
			e.preventDefault();

			self.show=!self.show;

			self.img.css('display',(self.show ? 'block' : 'none'));
		}
	};
	radio=function(data,callback){
		var self=this;
		self.data=[];
		self.callback=callback;
		self.len=data.length;
		self.value=0;
		for (var i=0;i<self.len;i++){
			var col=new Object;
			col.radio=self;
			col.value=i;
			var base=data[i][0];
			var p=data[i][1];
			col.base=typeof base == 'object' ? base : $(base)
			var x=~~col.base.css('left');
			var y=~~col.base.css('top');
			col.on=typeof p.on == 'object' ? p.on : $(p.on)
			col.on.css('display',(self.value==i ? 'block' : 'none')).
				   css('position','absolute').
				   css('left',(x+p.x)+'px').
				   css('top',(y+p.y)+'px');
			if (p.w!=undefined){
				col.on.css('width',p.w+'px').
						css('height',p.h+'px');
			}
			col.off=typeof p.off == 'object' ? p.off : $(p.off)
			col.off.css('display',(self.value!=i ? 'block' : 'none')).
				   css('position','absolute').
				   css('left',(x+p.x)+'px').
				   css('top',(y+p.y)+'px');
			if (p.w!=undefined){
				col.off.css('width',p.w+'px').
				   css('height',p.h+'px');
			}
			col.base.bind("mousedown",col,self.oncheck);
			self.data[i]=col;
		}
	};
	radio.prototype={
		oncheck: function(e){
			var col=e.data;
			var self=col.radio;
			e.preventDefault();
			self.value=col.value;
			for (var i=0;i<self.len;i++){
        
        // console.log(self);

				var c=self.data[i];
				c.on.css('display',(self.value==i ? 'block' : 'none'));
				c.off.css('display',(self.value!=i ? 'block' : 'none'));
			}
			if (self.callback!=undefined){
				self.callback();
			}
		}
	};
	link=function(base,callback){
		var self=this;
		self.base=typeof base == 'object' ? base : $(base);
		self.callback=callback;
		self.base.bind("mouseup",self.callback,self.linkto);
	};
	link.prototype={
		linkto: function(e){
			var data=e.data;
			if (typeof data=="function"){
				data();
			}else{
				location.href=data;
			}
		}
	};
	button=function(base,img,opt){
		var self=this;
		self.name=base;
		self.options=opt || {};
		self.callback=self.getopt('callback',function(val){});
		self.value=self.getopt('value',false);
		self.base=typeof base == 'object' ? base : $(base);
		self.base.css('display',(!self.value ? 'block' : 'none'));
		self.img=typeof img == 'object' ? img : $(img);
		self.img.css('display',(self.value ? 'block' : 'none'));
		self.base.bind("mousedown touchstart",self,self.onpush);
		$('body').bind("mouseup touchend",self,self.onrelease);
	};
	button.prototype={
		getopt: function(name, defvalue){
			return this.options[name] !== undefined ? this.options[name] : defvalue;
		},
		onpush: function(e){
			var self=e.data;
			if (self.value)
				return;
			e.preventDefault();
			self.value=true;
			self.base.css('display',(!self.value ? 'block' : 'none'));
			self.img.css('display',(self.value ? 'block' : 'none'));
			if (self.callback!=undefined){
				self.callback(self.value);
			}
		},
		onrelease: function(e){
			var self=e.data;
			if (! self.value)
				return;
			e.preventDefault();
			self.value=false;
			self.base.css('display',(!self.value ? 'block' : 'none'));
			self.img.css('display',(self.value ? 'block' : 'none'));
		}
	};

	var pagelist={
		0:	{offset:384,title:'menu',count:0,sublist:[]},
		100:{offset:732,title:'nichijo',count:0,sublist:['二人以上','単身']},
		200:{offset:592,title:'kekkon',count:3,sublist:['挙式費用','夫婦の貯蓄額','親からの援助']},
		300:{offset:732,title:'shussan',count:2,sublist:['出産費用','出産・育児支援']},
		400:{offset:732,title:'kyouiku',count:2,sublist:['教育費用','おこづかい']},
		500:{offset:732,title:'juutaku',count:2,sublist:['住宅購入','増改築']},
		600:{offset:732,title:'nyuuin',count:2,sublist:['入院費用','介護費用']},
		700:{offset:872,title:'jidousha',count:1,sublist:['自動車費用']},
		800:{offset:872,title:'ryokou',count:1,sublist:['旅行費用']},
		900:{offset:732,title:'teinen',count:2,sublist:['セカンドライフ','退職金']},
		1000:{offset:732,title:'rougo',count:2,sublist:['二人以上','単身']},
		1100:{offset:592,title:'rougoshikin',count:3,sublist:['公的年金','必要準備額','長生きリスク']},
		1200:{offset:732,title:'manichi',count:2,sublist:['必要保障額','葬儀費用']},
		1300:{offset:384,title:'dentaku',count:0,sublist:[]}
	};
	linkto=function(no){
		var n=100*~~(no/100);
		var page=pagelist[n];
		var str='0000'+no;
		str=str.slice(-4);
		str+='_';
		str+=page.title;
		str+='.html';
		location.href=str;
	};
	set_button=function(no){
		var n=100*~~(no/100);
		var page=pagelist[n];
		var str='';
		var max=page.count;
		var x=page.offset-140;
		for (var i=0;i<max;i++){
			if (i==~~((no-n)/10)){
				var onoff='on';
				var onclick='';
			}else{
				var onoff='off';
				var onclick=' onclick="linkto(' + (i*10+~~n) + ')"';
			}
			str+='<div style="position: absolute; width: 130px; height 48px; left: '+x+'px; top: 0px;" class="sub_'+onoff+'"'+onclick+'>';
			str+='<div>　　';
			str+=page.sublist[i]+'</div></div>';
			x+=140;
		}
		if (no%10!=1 && fplist[10 * ~~(no/10)][0]!=''){
		    str+='<div class="fp_btn_off" style="left: '+(x+11)+'px; top: '+(0-5)+'px;" onclick="linkto(' + (1+~~no) + ')"></div>';
        }
		if (no%10==1){
			str+='<div class="fp_btn_on" style="left: '+(x+11)+'px; top: '+(0-5)+'px;"></div>';
		}
		$('.page').append(str);
		if (no%10==1){	//FP画面
			var subtitle=page.sublist[~~((no-n)/10)];
			var fp_no=10*~~(no/10);
			var fp_t=fplist[fp_no][0];
			var fp_b=fplist[fp_no][1];
			var fp_img=fplist[fp_no][2];
			fp_t='<b>'+fp_t+'</b><br><br>'+fp_b;
			if (fp_img!=''){
				fp_t+='<br><img src="'+fp_img+'" style="margin: 0px auto; display: block">';
			}
			$('#fpscreen_body_text').html(fp_t);
			$("#fp_back").show();
			$("#fp_back").bind("mouseup",function(){linkto(no-1);});
			$("#fpscreen").bind("mouseup",function(){linkto(no-1);});
			$("#fpscreen").show();
			return;
		}
	};
	set_menu=function(no){
		// '<div id="link0000" style="position:absolute; left: 0px; top: 0px; width: 230px; height: 80px;"></div>'
    var html= ''+
			'<div id="link0100" style="position:absolute; left: 0px; top: 39px; width: 230px; height: 40px;"></div>'+
			'<div id="link0200" style="position:absolute; left: 0px; top: 89px; width: 230px; height: 40px;"></div>'+
			'<div id="link0300" style="position:absolute; left: 0px; top: 135px; width: 230px; height: 40px;"></div>'+
			'<div id="link0400" style="position:absolute; left: 0px; top: 180px; width: 230px; height: 40px;"></div>'+
			'<div id="link0500" style="position:absolute; left: 0px; top: 225px; width: 230px; height: 40px;"></div>'+
			'<div id="link0600" style="position:absolute; left: 0px; top: 271px; width: 230px; height: 40px;"></div>'+
			'<div id="link0700" style="position:absolute; left: 0px; top: 319px; width: 230px; height: 40px;"></div>'+
			'<div id="link0800" style="position:absolute; left: 0px; top: 365px; width: 230px; height: 40px;"></div>'+
			'<div id="link0900" style="position:absolute; left: 0px; top: 410px; width: 230px; height: 40px;"></div>'+
			'<div id="link1000" style="position:absolute; left: 0px; top: 455px; width: 230px; height: 40px;"></div>'+
			'<div id="link1100" style="position:absolute; left: 0px; top: 509px; width: 230px; height: 40px;"></div>'+
			'<div id="link1200" style="position:absolute; left: 0px; top: 550px; width: 230px; height: 40px;"></div>'+
			'<div id="link1300" style="display: none; position:absolute; left: 700px; bottom: 0; width: 304px; height: 108px;"><img src="img/opacity.gif" width="304" height="108" alt="" /></div>';
		html+='<div id="fp_back" class="fp_bg"></div><div id="fpscreen" class="fp2"><div class="fp_head">ＦＰからのアドバイス</div><div class="fp_body"><div id="fpscreen_body_text" class="fp_body_text"></div></div></div>';
		$('.page').append(html);
		if (no!=0)		new link('#link0000','0000_menu.html');
		if (no!=100)	new link('#link0100','0100_nichijo.html');
		if (no!=200)	new link('#link0200','0200_kekkon.html');
		if (no!=300)	new link('#link0300','0300_shussan.html');
		if (no!=400)	new link('#link0400','0400_kyouiku.html');
		if (no!=500)	new link('#link0500','0500_juutaku.html');
		if (no!=600)	new link('#link0600','0600_nyuuin.html');
		if (no!=700)	new link('#link0700','0700_jidousha.html');
		if (no!=800)	new link('#link0800','0800_ryokou.html');
		if (no!=900)	new link('#link0900','0900_teinen.html');
		if (no!=1000)	new link('#link1000','1000_rougo.html');
		if (no!=1100)	new link('#link1100','1100_rougoshikin.html');
		if (no!=1200)	new link('#link1200','1200_manichi.html');
		if (no!=1300){
			$('#link1300').show();
			new link('#link1300','1300_dentaku.html');
		}else{
			$('#link1300').hide();
		}
	};


$( document ).ready(function() {
    try {
      var current_year = new Date().getFullYear();
      $('.current_year').each(function() {
        $( this ).html(current_year);
      });
    } catch (error) {
    }

});
  