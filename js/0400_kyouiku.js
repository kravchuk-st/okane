
func5=function(){
	new link('#link1','index.html');
	new link('#link2','index_2.html');
	new link('#link3','index_3.html');
	new link('#link4','index_4.html');
	new link('#link5','index_5.html');
	new link('#link6','index_6.html');
	new link('#link7','index_7.html');
	new link('#link8','index_8.html');
	new link('#link9','index_9.html');
	new link('#link10','index_10.html');
	new link('#link11','index_11.html');
	new link('#link12','index_12.html');

	recalc=function(){
		var v1=0,v2=0,v3=0,v4=0,v5=0,v6=0;
		//幼稚園公立年額
		if (radio1.value==0){
			$('#input1').html('公立');
			v1=22.3647;
		//幼稚園私立年額
		}else{
			$('#input1').html('私立');
			v1=52.7916;
		}
		//小学校公立年額
		if (radio2.value==0){
			$('#input2').html('公立');
			v2=32.1281;
		//小学校私立年額
		}else{
			$('#input2').html('私立');
			v2=159.8691;
		}
		//中学校公立年額
		if (radio3.value==0){
			$('#input3').html('公立');
			v3=48.8397;
		//中学校私立年額
		}else{
			$('#input3').html('私立');
			v3=140.6433;
		}
		//高校公立年額
		if (radio4.value==0){
			$('#input4').html('公立');
			v4=45.7380;
		//高校私立年額
		}else{
			$('#input4').html('私立');
			v4=96.9911;
		}
		var type=0;
				
		//大学初年度 
		var table1=[81.7800, //文系（国公立）
					116.6922,//文系（私立）
					81.7800, //理系（国公立）
					154.4962,//理系（私立）
					81.7800, //医歯系（国公立）
					482.2395,//医歯系（私立）
					90.3000,//下宿生活費
					39.3000];//入学諸経費
		//大学2年目以降
		var table2=[53.5800, //文系（国公立）
					78.5581, //文系（私立）
					53.5800, //理系（国公立）
					110.5616,//理系（私立）
					53.5800, //医歯系（国公立）
					286.7802,//医歯系（私立）
					90.3000,//下宿生活費
					0.0000]; //入学諸経費（なし）
					
		if (radio5.value==0){
			var n='国公立';
			type=0;
		}else{
			var n='私立';
			type=1;
		}
		var years=4;
		if (radio6.value==0){
			n+='文系';
		}else if (radio6.value==1){
			n+='理系';
			type+=2;
		}else{
			n+='医歯系';
			type+=4;
			years=6;
		}
		
		//大学年額（初年度）
		v5=table1[type];
		//大学年額（2年目以降）
		v6=table2[type];
		
		//下宿費追加
		if (radio7.value==0){
			n+='(自宅)';
		}else{
			n+='(下宿)';
			v5+=table1[6]+table1[7];
			v6+=table2[6]+table2[7];
		}
		$('#input5').html(n);

		//合計
		total=v1*3+v2*6+v3*3+v4*3+v5*1+v6*(years-1);

		v1=Math.round(v1)+'万円';
		v2=Math.round(v2)+'万円';
		v3=Math.round(v3)+'万円';
		v4=Math.round(v4)+'万円';
		v5=Math.round(v5)+'万円';
		v6=Math.round(v6)+'万円';

		$('#input6').html(v1);
		$('#input7').html(v2);
		$('#input8').html(v3);
		$('#input9').html(v4);
		$('#input10').html(v5);
		$('#input11').html(v6);

		total=Math.round(total);
		$('#input12').html(total);
	}

	radio1=new radio([	['#radio1_1',{on:'#radio1_1on',off:'#radio1_1off',x:18,y:14,w:21,h:21}],
						['#radio1_2',{on:'#radio1_2on',off:'#radio1_2off',x:10,y:14,w:21,h:21}]],recalc);
	radio2=new radio([	['#radio2_1',{on:'#radio2_1on',off:'#radio2_1off',x:18,y:14,w:21,h:21}],
						['#radio2_2',{on:'#radio2_2on',off:'#radio2_2off',x:10,y:14,w:21,h:21}]],recalc);
	radio3=new radio([	['#radio3_1',{on:'#radio3_1on',off:'#radio3_1off',x:18,y:14,w:21,h:21}],
						['#radio3_2',{on:'#radio3_2on',off:'#radio3_2off',x:9,y:14,w:21,h:21}]],recalc);
	radio4=new radio([	['#radio4_1',{on:'#radio4_1on',off:'#radio4_1off',x:20,y:14,w:21,h:21}],
						['#radio4_2',{on:'#radio4_2on',off:'#radio4_2off',x:10,y:14,w:21,h:21}]],recalc);
	radio5=new radio([	['#radio5_1',{on:'#radio5_1on',off:'#radio5_1off',x:18,y:14,w:21,h:21}],
						['#radio5_2',{on:'#radio5_2on',off:'#radio5_2off',x:11,y:14,w:21,h:21}]],recalc);
	radio6=new radio([	['#radio6_1',{on:'#radio6_1on',off:'#radio6_1off',x:19,y:14,w:21,h:21}],
						['#radio6_2',{on:'#radio6_2on',off:'#radio6_2off',x:9,y:14,w:21,h:21}],
						['#radio6_3',{on:'#radio6_3on',off:'#radio6_3off',x:9,y:14,w:21,h:21}]],recalc);
	radio7=new radio([	['#radio7_1',{on:'#radio7_1on',off:'#radio7_1off',x:20,y:14,w:21,h:21}],
						['#radio7_2',{on:'#radio7_2on',off:'#radio7_2off',x:10,y:14,w:21,h:21}]],recalc);

	recalc();
};
