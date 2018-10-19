let butSend = document.getElementById('but_send_form');

//=====  GET IF-MES BLOCKS
let mesSuc = document.getElementById('mes-suc');
let mesEror = document.getElementById('mes-error');

let masData = {
	'name': '',
	'group': '',
	'group_id': '',
	'icon': '',
	'background': '',
	'title': ''
};


ajaxTake();  //=====  FULL SELECT

getDataPage();  //=====  TAKE DATA-PAGE


function choice(color) {
	document.getElementById('background').value = color;
}


let colorInp = document.querySelectorAll('.js-back-cont__item');

//=====  GET COLOR
for (let i = 0; i < colorInp.length; i++ ) {
	let colorInpOne = colorInp[i];
	colorInpOne.addEventListener('click', function (event) {
		document.getElementById('background').value = this.getAttribute('data-color');
		event.preventDefault();
	});
}


//=====  SENT DATA
if (butSend) {
	
	butSend.addEventListener('click', function () {
		
		masData['name'] = document.getElementById('name').value;
		masData['name'] = masData['name'].trim();
		
		const $elemSel = document.getElementById('select');
		masData['group'] = $elemSel.options[$elemSel.selectedIndex].text;
		masData['group_id'] = $elemSel.options[$elemSel.selectedIndex].value;
		
		masData['icon'] = document.getElementById('icon').value;
		masData['icon'] = masData['icon'].trim();
		
		masData['background'] = document.getElementById('background').value;
		
		masData['title'] = document.getElementById('title_text').value;
		
		ajaxSend();
	});
}


function getXhrObject(){
	if(typeof XMLHttpRequest === 'undefined'){
		XMLHttpRequest = function() {
			try { return new window.ActiveXObject( "Microsoft.XMLHTTP" ); }
			catch(e) {}
		};
	}
	return new XMLHttpRequest();
}


//=====  FILL THE SELECT
function fillSel (data) {
	let select = document.getElementById('select');
	data['name'].forEach(function (n, i) {
		let selOpot = document.createElement('option');
		selOpot.setAttribute('value', data['id'][i]);
		selOpot.innerHTML = n;
		if (selOpot && select) select.appendChild(selOpot);
	});
}


//=====  TAKE CATEGORIES
function ajaxTake() {
	var params = [];
	params.push('directories=true');
	
	// var url = 'http://ruraeghw.beget.tech/ajax-text/add_del_group.php';
	var url = 'http://localhost/ajax-text/add_del_group.php';
	var xhr = getXhrObject();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			let con = JSON.parse(xhr.responseText);
			fillSel(con);
		}
	}
	xhr.send(params.join('&'));
}


//=====  SEND DATA
function ajaxSend() {
	
	let params = [];
	
	for (let key in masData) {
		params.push(key + '=' + masData[key]);
	}
	
    // let url = 'http://ruraeghw.beget.tech/ajax-text/creatLink.php';
    let url = 'http://localhost/ajax-text/creatLink.php';
	
	let xhr = getXhrObject();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			let con = JSON.parse(xhr.responseText);
			if (con == 1) {
				mesEror.style.display = 'block';
				setTimeout( () => { mesEror.style.display = 'none'; }, 2000);
			} else {
				mesSuc.style.display = 'block';
				setTimeout( () => { mesSuc.style.display = 'none'; }, 2000);
			}
		}
	}
	xhr.send(params.join('&'));
}


//=====  GET DATA-PAGE
function getDataPage() {
	
	if (chrome && chrome.tabs && chrome.tabs.executeScript) {
		
		chrome.tabs.executeScript({
			code: '(' + function() {
				
				let sel = ()=>{
					
					var range;
					if (document.selection && document.selection.createRange) {
						range = document.selection.createRange();
						return range.htmlText;
					}
					else if (window.getSelection) {
						var selection = window.getSelection();
						if (selection.rangeCount > 0) {
							range = selection.getRangeAt(0);
							var clonedSelection = range.toString();
							return clonedSelection;
						}
						else {
							return '';
						}
					}
					else {
						return '';
					}
				}
				
				
				return {title: window.document.title, url: window.location.href, text: sel() };
			} + ')();'
		}, function(results) {
			document.getElementById('name').value = results[0]['text'].trim();
		});
	}
}
