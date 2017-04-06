(function () {
	function AtsCalculator() {
		if (!this instanceof AtsCalculator) {
			return new AtsCalculator();
		}

		var calBox = document.createElement('div');
		calBox.className = 'calBox';
		calBox.style.display = 'none';
		calBox.innerHTML = '' +
			'    <div class="calu">' +
			'    	<input type="text" id="text" readonly="true">  ' +
			'        <ul class="one clearfix">' +
			'            <li class="orange"></li>' +
			'            <li class="orange back">退格</li>' +
			'            <li class="orange clea">清屏</li>' +
			'            <li class="black zheng">+/-</li>' +
			'            <li class="black rec">1/x</li>' +
			'            <li class="num">7</li>' +
			'            <li class="num">8</li>' +
			'            <li class="num">9</li>' +
			'            <li class="gray oper">/</li>' +
			'            <li class="black oper">%</li>' +
			'            <li class="num">4</li>' +
			'            <li class="num">5</li>' +
			'            <li class="num">6</li>' +
			'            <li class="gray oper">*</li>' +
			'            <li class="black sq">√</li>' +
			'        </ul>' +
			'        <div class="clearfix">' +
			'            <div class="twoBox fl">' +
			'            	<ul class="one fl two">' +
			'                    <li class="num">1</li>' +
			'                    <li class="num">2</li>' +
			'                    <li class="num">3</li>' +
			'                    <li class="gray oper">-</li>' +
			'                    <li class="zero num">0</li>' +
			'                    <li class="num">.</li>' +
			'                    <li class="gray oper">+</li>' +
			'                </ul>' +
			'            </div>' +
			'            <ul class="one three clearfix fl">' +
			'                <li class="black deng fl">=</li>' +
			'            </ul>' +
			'        </div>' +
			'    </div>' +
			'';

		document.body.appendChild(calBox);

		//数字
		var numArr = document.getElementsByClassName('num');
		//显示区域
		var oText = document.getElementById('text');
		//加、减、乘、除、取余
		var operArr = document.getElementsByClassName('oper');

		//等号
		var oDeng = document.getElementsByClassName('deng')[0];
		//开根号
		var oSq = document.getElementsByClassName('sq')[0];
		//倒数
		var oRec = document.getElementsByClassName('rec')[0];
		//正负号
		var oZheng = document.getElementsByClassName('zheng')[0];
		//清屏
		var oClea = document.getElementsByClassName('clea')[0];
		//删除
		var oBack = document.getElementsByClassName('back')[0];
		//显示的是否是计算结果
		var isResult = false;


		oText.value = '0'

		//数字按钮注册点击事件
		for (var i = 0; i < numArr.length; i++) {

			numArr[i].onclick = function () {
				var innerHTML = this.innerHTML;

				if (isResult) {
					oText.value = '0';
				}

				var value = oText.value;
				if (value === '0') {
					value = '';
				}

				var lastValue = value.substr(value.length - 1, 1);

				if (lastValue == '.' && innerHTML == '.') {
					return;
				}

				if (innerHTML == '.' && (/[\+\-\*\/\%]/.test(lastValue) || value == '')) {
					innerHTML = '0' + innerHTML;
				}

				oText.value = value + innerHTML;
				isResult = false;

			}

		}

		//加、减、乘、除、取余
		for (var j = 0; j < operArr.length; j++) {

			operArr[j].onclick = function () {
				var value = oText.value;
				var lastValue = value.substr(value.length - 1, 1);
				if (/[\+\-\*\/\%]/.test(lastValue)) {
					value = value.substring(0, value.length - 1);
				} else if (/^\-?\d+[\+\-\*\/\%]/.test(value)) {
					oDeng.click();
					value = oText.value;
				}

				oText.value = value + this.innerHTML;
				isResult = false;

			}

		}

		//点击等号的时候
		oDeng.onclick = function () {
			//由于js小数计算精度有问题，所以先把小数转换成整数再计算
			var value = oText.value;
			var firstValue = value.substr(0, 1);
			var tmpArr = [];

			if (firstValue == '-') {
				tmpArr.push('-');
				value = value.substring(1);
			}

			value = value.replace('+', ',+,').replace('-', ',-,').replace('*', ',*,').replace('/', ',/,').replace('%', ',%,');
			value = value.split(',');

			//if(value[1] != '/' && value[1] != '%'){
			value[0] = value[0] * 1000000;
			value[2] = value[2] * 1000000;
			//}

			tmpArr = tmpArr.concat(value);

			var n = eval(tmpArr.join(''));

			if (value[1] != '/') {
				if (value[1] == '*') {
					n = n / 1000000000000;
				} else {
					n = n / 1000000;
				}
			}

			oText.value = n;
			isResult = true;

		}

		//点击开根号的时候
		oSq.onclick = function () {
			var value = oText.value;

			if (!/^\-?\d+\.?(\d+)?$/.test(value)) {
				return;
			}

			if (value.indexOf('.')) {
				value = parseFloat(value);
			} else {
				value = parseInt(value);
			}

			var m = Math.sqrt(value);

			oText.value = m;
			isResult = true;

		}

		//点击倒数的时候
		oRec.onclick = function () {
			var value = oText.value;

			if (!/^\-?\d+\.?(\d+)?$/.test(value)) {
				return;
			}

			if (value.indexOf('.')) {
				value = parseFloat(value);
			} else {
				value = parseInt(value);
			}

			var a = 1 / value;

			oText.value = a;
			isResult = true;

		}

		//正负号的时候
		oZheng.onclick = function () {
			var value = oText.value;

			if (!/^\-?\d+\.?(\d+)?$/.test(value)) {
				return;
			}

			if (value.indexOf('.')) {
				value = parseFloat(value);
			} else {
				value = parseInt(value);
			}

			if (value > 0) {
				oText.value = -value;
			} else {
				oText.value = -value;
			}

		}

		//清屏的时候
		oClea.onclick = function () {

			oText.value = '0';
			isResult = false;

		}

		//删除
		oBack.onclick = function () {
			var value = oText.value;

			value = value.substr(0, value.length - 1);
			if (value == '') {
				value = 0;
			}

			oText.value = value;
		}

		this.show = function () {
			calBox.style.display = 'block';
		}
		this.hide = function () {
			calBox.style.display = 'none';
		}

	}

	window.AtsCalculator = AtsCalculator;

})();