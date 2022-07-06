func12=function(){
  var keydown = function(e) {
    var key;
    if (window.event){
      key=window.event.keyCode;
      e=window.event;
    }else if (e){
      if (e.keyCode){
        key=e.keyCode;
      }else if (e.which){
        key=e.which;
      }
    }
    shift = typeof e.modifiers == 'undefined' ? e.shiftKey : e.modifiers & Event.SHIFT_MASK; 
    if (key==8 || key==46){  //BS or DEL
      column.bs();
      return false;
    }else if (key==38 || (key==9 && shift)){  //up
      column.setrow('up');
      return false;
    }else if (key==9 || key==40){  //tab or down
      column.setrow('down');
      return false;
    }else if (key==0x2E || key==110 || key==190){  //'.'
      column.add('.');
    }else if (key==13){  //ENTER
      recalc();
      return false;
    }else if (key>=0x30 && key<=0x39){  //0-9
      column.add(String.fromCharCode(key));
    }else if (key>=96 && key<=105){  //0-9
      column.add(String.fromCharCode(key-96+0x30));
    }
    return false;
  };
//  document.onkeypress = keydown;
  document.onkeydown = keydown;

	calc_0=function(){
		var s=parseFloat(column.row[0]);
		var x=parseFloat(column.row[1]);
		var r=parseFloat(column.row[2]);
		var html;
		var color='#ff0000';
		if (s<1 || s>99999){
			html='現在の資金残高は1万円以上99999万円以下の金額を入力してください。';
		}else if (x<1 || x>999){
			html='毎月の受取金額は1万円以上999万円以下の金額を入力してください。';
		}else if (s<x){
			html='毎月の受取金額には現在の資金残高以下の金額を入力して下さい。';
		}else{
			color='#333333';
			if (r==0){
				var result=s/x;
			}else{
				var r2=Math.pow(1+r/100,1/12)-1;
				var result=-Math.log((s/x+1)/(1+r2)-s/x)/Math.log(1+r2)-1;
			}
			var html='(受取期間)';
			if (r2>=x/s){
				html+='永久に';
			}else{
				var year=Math.floor(result/12);
				var mon=Math.floor(result-Math.floor(result/12)*12);
				if (year>0){
					html+=year+"年";
				}
				if (mon>0){
					html+=mon+"ヵ月";
				}else{
					html+="間";
				}
				html+='、毎月'+x+'万円を';
			}
			html+='受け取ることができます。';
		}
		$('#result').css('color',color).html(html);
	};
	calc_1=function(){
		var s=parseFloat(column.row[0]);
		var x=parseFloat(column.row[1]);
		var t=parseFloat(column.row[2]);
		var r=parseFloat(column.row[3]);
		var html;
		var color='#ff0000';
		if (s>9999){
			html='現在の資金残高は9999万円以下の金額を入力してください。';
		}else if (x<1 || x>999){
			html='毎月の積立金額は1万円以上999万円以下の金額を入力してください。';
		}else if (t>99999 || t<1){
			html='目標金額は1万円以上99999万円以下の金額を入力してください。';
		}else if (t<s+x){
			html='目標金額は現在の資金残高と毎月の積立金額の合計額以上の金額を入力してください。';
		}else{
			color='#333333';
			if (r==0){
				var result=(t-s)/x;
			}else{
				var r2=Math.pow(1+r/100,1/12)-1;
				var result=(Math.log(t+(1+r2)*x/r2)-Math.log(s+(1+r2)*x/r2))/Math.log(1+r2);
			}
			var html='（積立期間）';
			result=Math.ceil(result);
			var year=Math.floor(result/12);
			var mon=Math.ceil(result-year*12);
			if (year>0){
				html+=year+"年";
			}
			if (mon>0){
				html+=mon+"ヵ月";
			}else{
				html+="間";
			}
			html+='、毎月'+x+'万円を積み立てると目標金額';
			html+=t;
			html+='万円に達します。';
		}
		$('#result').css('color',color).html(html);
	};
	calc_2=function(){
		var s=parseFloat(column.row[0]);
		var y=parseFloat(column.row[1]);
		var r=parseFloat(column.row[2]);
		var html;
		var color='#ff0000';
		if (s>99999){
			html='現在の資金残高は99999万円以下の金額を入力してください。';
		}else if (y<1 || y>99){
			html='受取期間は1年以上99年以下の年数を入力してください。';
		}else{
			color='#333333';
			var m=y*12;
			if (r==0){
				var result=s/m;
			}else{
				var r2=Math.pow(1+r/100,1/12)-1;
				var result=s*r2*Math.pow(1+r2,m)/(Math.pow(1+r2,m)-1);
			}
			var html='（受取金額）毎月';
			result=Math.floor(result*100)/100;
			html+=result+'万円を'+y+'年間受け取ることができます。';
		}
		$('#result').css('color',color).html(html);
	};
	calc_3=function(){
		var s=parseFloat(column.row[0]);
		var y=parseFloat(column.row[1]);
		var t=parseFloat(column.row[2]);
		var r=parseFloat(column.row[3]);
		var html;
		var x=Math.pow(1+r/100,y);
		var color='#ff0000';
		if (s>9999){
			html='現在の資金残高は9999万円以下の金額を入力してください。';
		}else if (y<1 || y>99){
			html='積立期間は1年以上99年以下の年数を入力してください。';
		}else if (t<1 || t>99999){
			html='目標金額は1万円以上99999万円以下の金額を入力してください。';
		}else if (t-s*x < 0){
			if (r==0){
				html='目標金額は現在の資金残高以上の金額を入力してください。';
			}else{
				var x = Math.round(x*100)/100;
				html='目標金額は現在の資金残高の'+x+'倍以上の金額を入力してください。';				
			}
		}else{
			color='#333333';
			var m=y*12;
			if (r==0){
				var result=(t-s)/m;
			}else{
				var r2=Math.pow(1+r/100,1/12)-1;
				var result=(t-s*Math.pow(1+r2,m))*r2/(Math.pow(1+r2,m+1)-(1+r2));
			}
			var html='（積立金額）毎月';
			result=Math.ceil(result*100)/100;
			html+=''+result+'万円を'+y+'年間積み立てると、目標金額'+t+'万円に達します。';
		}
		$('#result').css('color',color).html(html);
	};
	calc_4=function(){
		var s=parseFloat(column.row[0]);
		var x=parseFloat(column.row[1]);
		var y=parseFloat(column.row[2]);
		var html;
		var color='#ff0000';
		if (s>99999){
			html='現在の資金残高は99999万円以下の金額を入力してください。';
		}else if (x<1 || x>999){
			html='毎月の受取金額は1万円以上999万円以下の金額を入力してください。';
		}else if (x*10>s){
			html='毎月の受取金額は現在の資金残高の10分の1以下の金額を入力してください。';
		}else if (s<x){
			html='毎月の受取金額は現在の資金残高以下の金額を入力してください。';
		}else if (y<1){
			html='受取期間は1年以上99年以下の年数を入力してください。';
		}else{
			color='#333333';
			var m=y*12;
			var r=0.0001;
			var r2=r/100;
			if (x*m<=s){
				r2="0.00";
			}else{
				var count=0;
				while (1){
					var ff=Math.pow(1+r2,m)*s-(Math.pow(1+r2,m)-1)*x/r2;
					var fv=m*Math.pow(1+r2,m-1)*s-(m-1)*Math.pow(1+r2,m-1)*x/r2-(Math.pow(1+r2,m)-1)*x/r2/r2;
					if (Math.abs(ff/fv) <= 0.0000000001 || count>2000){
						break;
					}
					r2=r2+ff/fv;
					count++;
				}
				r2=(Math.pow(1+r2,12)-1)*100;
				r2=Math.round(r2*100)/100;
			}
			html='（利回り）年';
			html+=r2+'%の利回りで運用すると、毎月'+x+'万円を'+y+'年間受け取ることができます。';
		}
		$('#result').css('color',color).html(html);
	};
	calc_5=function(){
		var s=parseFloat(column.row[0]);
		var x=parseFloat(column.row[1]);
		var y=parseFloat(column.row[2]);
		var t=parseFloat(column.row[3]);
		var max;
		max=Math.ceil((s+x*y*12)/10)*10;
		if (max<10)
			max=10;
		var html;
		var color='#ff0000';
		if (s>9999){
			html='現在の資金残高は9999万円以下の金額を入力してください。';
		}else if (x<1 || x>999){
			html='毎月の積立金額は1万円以上999万円以下の金額を入力してください。';
		}else if (t<10 || t>99999){
			html='目標金額は10万円以上99999万円以下の金額を入力してください。';
		}else if (t<s){
			html='目標金額は現在の資金残高以上の金額を入力してください。';
		}else if (t<max){
			html='目標金額は'+max+'万円以上の金額を入力してください。';
		}else if (y<1){
			html='積立期間は1年以上99年以下の年数を入力してください。';
		}else{
			color='#333333';
			var m=y*12;
			var r=0.0001;
			var r2=r/100;
			while (1){
				var ff=Math.pow(1+r2,m)*s+(Math.pow(1+r2,m+1)-(1+r2))*x/r2;
				var fv=m*Math.pow(1+r2,m-1)*s+((m+1)*Math.pow(1+r2,m)-1)*x/r2-(Math.pow(1+r2,m+1)-(1+r2))*x/r2/r2;
				r2=r2-(ff-t)/fv;
				if (Math.abs((ff-t)/fv) <= 0.0000000001){
					break;
				}
			}
			r2=(Math.pow(1+r2,12)-1)*100;
			r2=Math.round(r2*100)/100;
			html='（利回り）年';
			html+=r2+'%の利回りで運用しながら、毎月'+x+'万円を'+y+'年間積み立てると、目標金額に達します。';
		}
		$('#result').css('color',color).html(html);
	};
	var list=[
		{	calc: calc_0,
			title: '取崩計算（受取期間）',
			info: '手元資金から毎月一定の金額を取り崩していった場合、<br>どの位の期間受け取ることができるのかを計算します。',
			input: [
				{	def: 0,		left: '現在の資金残高：',	right: '万円',	num: 5, decimal: 1},
				{	def: 0,		left: '毎月の受取金額：',	right: '万円',	num: 3, decimal: 1},
				{	def: 0,		left: '運用利回り：',		right: '％',	num:1,	decimal: 1},
				{	def: undefined,	left: '',					right: '',		num:0,	decimal: 0}
			]
		},
		{	calc: calc_1,
			title: '積立計算（積立期間）',
			info: '毎月一定の金額を積み立てて運用し、目標額を達成するには、どの位の期間積み立てる必要があるのかを計算します。 ',
			input: [
				{	def: 0,		left: '現在の資金残高：',	right: '万円',	num: 4,	decimal: 1},
				{	def: 0,		left: '毎月の積立金額：',	right: '万円',	num: 3,	decimal: 1},
				{	def: 0,		left: '目標金額：',			right: '万円',	num: 5, decimal: 1},
				{	def: 0,		left: '運用利回り：',		right: '％',	num: 1, decimal: 1}
			]
		},
		{	calc: calc_2,
			title: '取崩計算（受取金額）',
			info: '手元資金から毎月一定の金額を取り崩し、一定期間もたせる場合、どの位の金額を受け取ることができるのかを計算します。 ',
			input: [
				{	def: 0,			left: '現在の資金残高：',	right: '万円',	num:5,	decimal: 1},
				{	def: 0,			left: '受取期間：',			right: '年',	num:2,	decimal: 0},
				{	def: 0,			left: '運用利回り：',		right: '％',	num:1,	decimal: 1},
				{	def: undefined,	left: '',					right: '',		num:0,	decimal: 0}
			]
		},
		{	calc: calc_3,
			title: '積立計算（積立金額）',
			info: '毎月一定の金額を積み立てて運用し、目標額を達成するには、どの位の金額を積み立てる必要があるのかを計算します。 ',
			input: [
				{	def: 0,			left: '現在の資金残高：',	right: '万円',	num: 4, decimal: 1},
				{	def: 0,			left: '積立期間：',			right: '年',	num: 2, decimal: 0},
				{	def: 0,			left: '目標金額：',			right: '万円',	num: 5, decimal: 1},
				{	def: 0,			left: '運用利回り：',		right: '％',	num: 1, decimal: 1}
			]
		},
		{	calc: calc_4,
			title: '取崩計算（運用利回り）',
			info: '手元資金から毎月一定の金額を取り崩し、一定期間もたせるには、どの位の利回りで運用する必要があるのかを計算します。 ',
			input: [
				{	def: 0,			left: '現在の資金残高：',	right: '万円',	num: 5, decimal: 1},
				{	def: 0,			left: '毎月の受取金額：',	right: '万円',	num: 3, decimal: 1},
				{	def: 0,			left: '受取期間：',			right: '年',	num: 2, decimal: 0},
				{	def: undefined,	left: '',					right: '',		num:0,	decimal: 0}
			]
		},
		{	calc: calc_5,
			title: '積立計算（運用利回り）',
			info: '毎月一定の金額を積み立てて運用し、目標額を達成するには、どの位の利回りで運用する必要があるのかを計算します。 ',
			input: [
				{	def: 0,		left: '現在の資金残高：',	right: '万円',	num: 4, decimal: 1},
				{	def: 0,		left: '毎月の積立金額：',	right: '万円',	num: 3, decimal: 1},
				{	def: 0,		left: '積立期間：',			right: '年',	num: 2, decimal: 0},
				{	def: 0,		left: '目標金額',			right: '万円',	num: 5, decimal: 1}
			]
		}
	];
	recalc=function(){
		list[_radio.value].calc();
	};

//="（受取期間）"&IF(ROUNDDOWN(G10/12,0)>0,ROUNDDOWN(G10/12,0)&"年"&IF(ROUNDDOWN(G10-ROUNDDOWN(G10/12,0)*12,0)>0,ROUNDDOWN(G10-ROUNDDOWN(G10/12,0)*12,0)&"ヵ月、","間、"),ROUNDDOWN(G10,0)&"ヵ月、")&"毎月"&TEXT(D6,"0")&"万円を受け取ることができます。"

	setcol=function(){
		var col=list[_radio.value];
		$('#info1').html(col.title);
		$('#info2').html(col.info);
		var input=col.input;
		for (var i=0;i<4;i++){
			$('#column'+(i+1)+'left').html(input[i].left);
			$('#column'+(i+1)+'right').html(input[i].right);
			column.row[i]=input[i].def;
			column.max[i]=input[i].num;
			column.decimal[i]=input[i].decimal;
			if (input[i].num==0){
				$('#column'+(i+1)).hide();
			}else{
				$('#column'+(i+1)).show();
			}
		}
		$('#result').html('');
		column.setrow(0);
		column.show(0);
		column.show(1);
		column.show(2);
		column.show(3);
	};

hash=[
			['#radio1',{on:'#radio1on',off:'#radio1off',x:0,y:0}],
			['#radio2',{on:'#radio2on',off:'#radio2off',x:0,y:0}],
			['#radio3',{on:'#radio3on',off:'#radio3off',x:0,y:0}],
			['#radio4',{on:'#radio4on',off:'#radio4off',x:0,y:0}],
			['#radio5',{on:'#radio5on',off:'#radio5off',x:0,y:0}],
			['#radio6',{on:'#radio6on',off:'#radio6off',x:0,y:0}]
		];
	_radio=new radio(hash,setcol);

	var curtime=0;
	blink=function(){
		$('#cursor').css('display',curtime%2==0?'none':'block');
		curtime++;
		setTimeout("blink()",500);
	};
	blink();
	function cursor(x,y){
		if (x>9){
			x=9;
		}
		var cur=$('#cursor');
		y=y*55+196;
		x=x*15+362;
		cur.css('left',x+'px');
		cur.css('top',y+'px');
	};
	column={
		max: [4,4,3,4],
		current: 0,
		lastnum: '',
		row: [],
		decimal: [],
		setrow: function(newrow){
			if (newrow=='up'){
				this.current=(this.current-1+4)%4;
				if (this.row[this.current]==undefined){
					this.current-=1;
				}
			}else if (newrow=='down'){
				this.current=(this.current+1)%4;
				if (this.row[this.current]==undefined){
					this.current=0;
				}
			}else{
				this.current=newrow;
			}
			cursor(9,this.current);
		},
		bs: function(){
			this.lastnum='';
			var str=""+this.row[this.current];
			str=str.substring(0,str.length-1);
			if (str=="")
				str="0";
			this.row[this.current]=parseFloat(str);
			this.show();
		},
		clearall: function(){
			this.lastnum='';
			this.row[0]=0;
			this.row[1]=0;
			this.row[2]=0;
			this.row[3]=0;
			this.show(0);
			this.show(1);
			this.show(2);
			this.show(3);
		},
		clear: function(){
			this.lastnum='';
			this.row[this.current]=0;
			this.show();
		},
		add: function(val){
			var str=""+this.row[this.current];
			if (val!="."){
				if (this.lastnum=="."){
					str+=".";
				}else if (str=="0"){
					str="";
				}
				str+=val;

				row=str.split(".")

				if (row[0].length>this.max[this.current]){
					return;
				}
				if (row[1]!=undefined && row[1].length>this.decimal[this.current]){
					return;
				}
				this.row[this.current]=str;
				this.show();
			}else{
				if (str.indexOf(".")!=-1){
					val="";
				}
			}
			this.lastnum=val;
		},
		show: function(num){
			num=(num!=undefined)?num:this.current;
			var idlist=["#column1","#column2","#column3","#column4"];
			var elem=$(idlist[num]);
			var str=""+this.row[num];
			str=str.substring(-this.max[num]);
      elem.val(str);
		}
	}
	setcol();
	for (var i=0;i<4;i++){
		column.show(i);
	}

	column.setrow(0);

	$('#column1').bind('mousedown touchstart', function(e){column.setrow(0)})
	$('#column2').bind('mousedown touchstart', function(e){column.setrow(1)})
	$('#column3').bind('mousedown touchstart', function(e){column.setrow(2)})
	$('#column4').bind('mousedown touchstart', function(e){column.setrow(3)})

	new button('#calc','#calcon',{'callback':function(e){recalc()}});
	new button('#calcclear','#calcclearon',{'callback':function(e){setcol()}}); //20210408修正
	new button('#num0','#num0img',{'callback':function(e){column.add('0')}});
	new button('#num00','#num00img',{'callback':function(e){column.add('00')}});
	new button('#num1','#num1img',{'callback':function(e){column.add('1')}});
	new button('#num2','#num2img',{'callback':function(e){column.add('2')}});
	new button('#num3','#num3img',{'callback':function(e){column.add('3')}});
	new button('#num4','#num4img',{'callback':function(e){column.add('4')}});
	new button('#num5','#num5img',{'callback':function(e){column.add('5')}});
	new button('#num6','#num6img',{'callback':function(e){column.add('6')}});
	new button('#num7','#num7img',{'callback':function(e){column.add('7')}});
	new button('#num8','#num8img',{'callback':function(e){column.add('8')}});
	new button('#num9','#num9img',{'callback':function(e){column.add('9')}});
	new button('#numdot','#numdotimg',{'callback':function(e){column.add('.')}});
	new button('#numclear','#numclearimg',{'callback':function(e){column.clear()}});
	new button('#numup','#numupimg',{'callback':function(e){column.setrow('up')}});
	new button('#numdown','#numdownimg',{'callback':function(e){column.setrow('down')}});
	new button('#numenter','#numenterimg',{'callback':function(e){recalc()}});
	new button('#numbs','#numbsimg',{'callback':function(e){column.bs()}});



  var select = $('#dentaku_select')[0];
  var options = '';
  
  list.forEach((el, i) => {
    options += `<option value="${i}">${el.title}</option>`
  });
  
  $(select).html(options);

  select.addEventListener('change', function(ev) {
    var index = $(ev.target).val();
    // TODO change 
    _radio.value = index;
    setcol()
  })
};
