function gbc(classname, eltype, el){
	var elements = [];
	var patt = new RegExp(classname);
	var els = '';
	if (el) {
		els = el.getElementsByTagName(eltype);    
	} else {
		els = document.body.getElementsByTagName(eltype);
	}
	for(var i = 0; i<els.length;i++){
		if(patt.test(els[i].className)){
			elements.push(els[i]);
		}
	}
	return elements;
}

function strictgbc(classname, eltype, el){
	var elements = [];
	var els = '';
	if (el) {
		els = el.getElementsByTagName(eltype);    
	} else {
		els = document.body.getElementsByTagName(eltype);
	}
	for(var i = 0; i<els.length;i++){
		if(els[i].className == classname){
			elements.push(els[i]);
		}
	}
	return elements;
}

function smoothscroll (scrollto) {
	var scroll;
	var scrolledY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	var destination = gid(scrollto).getBoundingClientRect().top + scrolledY;
	var speed = Math.abs(scrolledY - destination)/50;
	if (destination > scrolledY) {
		scroll = setInterval(function () {
			scrolledY = scrolledY + speed;
			scrollTo(0, scrolledY);
			if (scrolledY > destination) {
				scrollTo(0, destination+3);
				clearInterval (scroll);
			}
		}, 1);
	} else {
		scroll = setInterval(function () {
			scrolledY = scrolledY - speed;
			scrollTo(0, scrolledY);
			if (scrolledY < destination) {
				scrollTo(0, destination-3);
				clearInterval (scroll); 
			}
		}, 1);
	}
}

if (gid('landingarea')) {
	var sliding = setInterval(function(){ auto_slide(); }, 5000); //auto sliding
}

if (gid('aboutpoints')) {
	var sliding_about = setInterval(function(){ auto_slide_about(); }, 5000); //auto sliding
}
window.onload=function () {
	//homepage
	
	if (gid('landingarea')) {
		videoheight(); //set landing video height
		slide_home (0); //start slider
		change_nav_homepage (); //navbar scroll
		slider_height ();
	}

	//about page
	if (gid('aboutpoints')) {
		slider_height();
		overlaysliders_build ();
		splitbg_response();
	}

	//hire form
	if (gid('hire_upload')) {
		checkfileupload();
	}

	//patientresource
	if(gid('step1')) {
		nowrapservices ();
	}
	//patientresource
	/*if (gid('patientintakeform')) {
		display_specify();
	}*/
}

window.onresize=function () {
	var windowwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (windowwidth > 768 && gid('primary').style.marginLeft == '-60%') {
		mobile_menu ();
	}

	//homepage
	if (gid('landingarea')) {
		videoheight();
		slider_height ();
	}

	//about page
	if (gid('aboutpoints')) {
		slider_height();
		overlaysliders_build ();
		splitbg_response();
	}

	//health history step 3
	if (gid('step3')) {
		nowrapboxes();
	}

	//patientresource
	if(gid('step1')) {
		nowrapservices ();
	}

	if (gbc('doc_section', 'div')) {
		var doc_sections = gbc ('doc_section', 'div');
		for (var i = 0; i < doc_sections.length; i++) {
			if (gid('docs_'+i).clientHeight > 0) gid('docs_'+i).style.height = gid('docs_height_'+i).clientHeight + 'px';
		}
	}

	if (gbc('side_item', 'div')) {
		var doc_sections = gbc ('side_item', 'div');
		for (var i = 0; i < doc_sections.length; i++) {
			if (gid('side_options_'+i).clientHeight > 0) gid('side_options_'+i).style.height = gid('side_optionsh_'+i).clientHeight+12 + 'px';
		}
	}
}

window.onscroll=function () {
	if (gid('landingarea')) change_nav_homepage ();
	else change_nav();
}


function change_box_content (boxid, override) {
	var titles = gbc('slider_title', 'div');
	var texts = gbc('slider_text', 'div');
	if (override == null) {
		if (titles[boxid].className == 'slider_title activebox' && texts[boxid].className == 'slider_text activebox') {
			titles[boxid].className = 'slider_title';
			texts[boxid].className = 'slider_text';
		} else {
			titles[boxid].className = 'slider_title activebox';
			texts[boxid].className = 'slider_text activebox';
		}
	}
	if (override == 0) {
		titles[boxid].className = 'slider_title activebox';
		texts[boxid].className = 'slider_text activebox';
	}
	if (override == 1) {
		titles[boxid].className = 'slider_title';
		texts[boxid].className = 'slider_text';
	} 
}

function change_nav_homepage () {
	var yscrolled = window.scrollY;
	var windowH = window.innerHeight;
	if (yscrolled > windowH) {
		gid('nav').style.top = 0;
	} else {
		gid('nav').style.top = -70 + 'px';
	}
}

function change_nav () {
	var yscrolled = window.scrollY;
	var bannerH = gid('banner').clientHeight;
	if (yscrolled > bannerH) {
		gid('nav').style.top = 0;
	} else {
		gid('nav').style.top = -70 + 'px';
	}
}

function mobile_menu () {
	if (gid('primary').style.marginLeft == '-60%') {
		gid('primary').style.marginLeft = '0';
		gid('footer').style.marginLeft = '0';
		gid('nav').style.left = '0';
		gid('mobile_nav').style.display = 'none';
	} else {
		gid('primary').style.marginLeft = '-60%';
		gid('footer').style.marginLeft = '-60%';
		gid('nav').style.left = '-60%';
		setTimeout (function () {gid('mobile_nav').style.display = 'block';}, 300);
	}
}

function slider_height () {
	var slider_items = gbc ('slider_item', 'div');
	var height = 0;

	for (i = 0; i < slider_items.length; i++) {
		slider_items[i].style.height = 'auto';
		if (slider_items[i].clientHeight > height) {
			height = slider_items[i].clientHeight;
		}
	}
	height = height + 40;
	for (i = 0; i < slider_items.length; i++) {
		slider_items[i].style.height = height+'px';
	}
}

function clear_slide () {
	clearInterval (sliding);
	setTimeout (function () {clearInterval (sliding); sliding = setInterval(function(){ auto_slide(); }, 5000);}, 5000);
}

function auto_slide () {
	var current = Math.round(-1 * parseInt(gid('slider').style.left) / 100);
	if (current < 4) current++;
	else current = 0;
	slide_home(current);
}

function slide_home (item) {
	var left_value =  -1 * item * 100; 
	gid('slider').style.left = left_value + "%"; 
	var dots = gbc ('dot', 'div');

	for (i=0;i<dots.length;i++) {
		gid('dot_'+i).style.background='#ffffff';
		gid('dot_'+i).style.border='1px solid #dddddd';
	}
	gid('dot_'+item).style.background='#54b6e7';
	gid('dot_'+item).style.border='none';
}

function clear_slide_about () {
	clearInterval (sliding_about);
	setTimeout (function () {clearInterval (sliding_about); sliding_about = setInterval(function(){ auto_slide_about(); }, 5000);}, 5000);
}

function auto_slide_about () {
	slide_about_main(1);
}

function slide_about_main (direction) {
	var left_value = parseInt(gid('main_bg_slider_track').style.left);
	var numofimgs = gbc('main_bg_img', 'div').length;
	var right_check = (numofimgs-1) * -100;
	var newimgnum = 0;
	//direction 0 means left
	if (direction == 0) {
		if (left_value < 0) left_value = left_value + 100;
		else left_value = right_check;
		gid('main_bg_slider_track').style.left = left_value + '%';
		newimgnum = (left_value/-100) + 1; 
		gid('current_img_num').innerHTML = newimgnum;
	}
	if (direction == 1) {
		if (left_value > right_check) left_value = left_value - 100;
		else left_value = 0;
		gid('main_bg_slider_track').style.left = left_value + '%';
		newimgnum = (left_value/-100) + 1; 
		gid('current_img_num').innerHTML = newimgnum;
	}
}

function slide_about_big (direction) {
	var left_value = parseInt(gid('overlay_slider_track_big').style.left);
	var numofimgs = gbc('big_img', 'div').length;
	var right_check = (numofimgs-1) * -100;
	//direction 0 means left
	if (direction == 0) {
		if (left_value < 0) left_value = left_value + 100;
		else left_value = right_check;
		gid('overlay_slider_track_big').style.left = left_value + '%';
	}
	if (direction == 1) {
		if (left_value > right_check) left_value = left_value - 100;
		else left_value = 0;
		gid('overlay_slider_track_big').style.left = left_value + '%';
	}
}

function overlaysliders_build () {
	var windowh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	windowh = windowh - gid('close_overlay').clientHeight - 30;
	gid('overlay_slider_window').style.height = windowh + 'px';

	//place arrows
	var arrowtop = gid('close_overlay').clientHeight + windowh/2 - (gid('slide_left').clientHeight/2);
	gid('slide_left').style.top = arrowtop + 'px';
	gid('slide_right').style.top = arrowtop + 'px';

	var big_imgs = gbc('big_img', 'div'); //wrapping div
	var big_div_ratio = big_imgs[0].clientWidth/big_imgs[0].clientHeight; //div ratio
	var big_img_ratio = 0; //img ratio
	var imgheight = 0;
	for (var i = 0; i < big_imgs.length; i++) {
		//resets
		big_imgs[i].getElementsByTagName('img')[0].style.height = 'auto';
		big_imgs[i].getElementsByTagName('img')[0].style.width = 'auto';
		big_imgs[i].getElementsByTagName('img')[0].style.top = 0;
		big_imgs[i].getElementsByTagName('img')[0].style.marginTop = 0;

		big_img_ratio = big_imgs[i].getElementsByTagName('img')[0].clientWidth/big_imgs[i].getElementsByTagName('img')[0].clientHeight; //img ratio
		if (big_div_ratio > big_img_ratio) {
			big_imgs[i].getElementsByTagName('img')[0].style.height = '100%';
			big_imgs[i].getElementsByTagName('img')[0].style.width = 'auto';
		} else {
			big_imgs[i].getElementsByTagName('img')[0].style.height = 'auto';
			big_imgs[i].getElementsByTagName('img')[0].style.width = '100%';
			big_imgs[i].getElementsByTagName('img')[0].style.top = '50%';
			imgheight = big_imgs[i].getElementsByTagName('img')[0].clientHeight;
			imgheight = imgheight/2 * -1;
			big_imgs[i].getElementsByTagName('img')[0].style.marginTop = imgheight + 'px';
		}
	}

	/*var small_imgs = gbc('small_img', 'img');
	smallsliderw = 0;
	for (var i = 0; i < small_imgs.length; i++) {
		smallsliderw = smallsliderw + small_imgs[i].clientWidth;
	}
	gid('overlay_slider_track_small').style.width = (smallsliderw + 5) +  'px';*/
}

function toggle_overlay() {
	if (gid('overlay_slider').style.zIndex == 0 && gid('overlay_slider').style.opacity == 0) {
		gid('overlay_slider').style.zIndex = 100000;
		gid('overlay_slider').style.opacity = 1;
	} else {
		setTimeout(function () {gid('overlay_slider').style.zIndex = 0;}, 300);
		gid('overlay_slider').style.opacity = 0;
	}
}

function videoheight() {
	windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	gid('landingarea').style.height = windowH + 'px';
	if (gid('video_bg')) gid('video_bg').style.opacity = '1';
	//console.log('x');
	document.body.style.height = 'auto';
	document.documentElement.style.height = 'auto';
	gid('page').style.height = 'auto';
	gid('content').style.height = 'auto';
	gid('primary').style.height = 'auto';
	gid('main').style.height = 'auto';
	gid('footer').style.height = 'auto';
}

function contactform() {
	var fname 		= gid('fname');
	var lname 		= gid('lname');
	var email 		= gid('email');
	var phone 		= gid('phone');
	var message		= gid('message');
	var url 		= gid('url');
	var complete 	= 1;

	fname.style.border='none';
	lname.style.border='none';
	email.style.border='none';
	phone.style.border='none';
	message.style.border='none';

	if (fname.value == '') {fname.style.border='1px solid #FF0000'; complete=0;}
	if (lname.value == '') {lname.style.border='1px solid #FF0000'; complete=0;}
	if (email.value == '') {email.style.border='1px solid #FF0000'; complete=0;}
	if (phone.value == '') {phone.style.border='1px solid #FF0000'; complete=0;}
	if (message.value == '') {message.style.border='1px solid #FF0000'; complete=0;}

	if (complete) {
		var params=[];
		params.push('fname='+fname.value);
		params.push('lname='+lname.value);
		params.push('email='+email.value);
		params.push('phone='+phone.value);
		params.push('url='+url.value);

		var rq = xmlHTTPRequestObject();
		rq.open('POST','/wp-admin/admin-ajax.php?action=contactform&'+params.join('&'), true);
		rq.setRequestHeader('Content-Type','text/plain; charset=utf-8;');
		rq.send(message.value);
		rq.onreadystatechange = function(){
			if (rq.readyState == 4){
				var res = rq.responseText;
				gid('contactform').innerHTML = res;	
				smoothscroll ('contactmap');
			}
		}
	}
}

function nlsignup() {
	var name 		= gid('nl_name');
	var email 		= gid('nl_email');
	var url			= gid('url');
	var complete=1;
	name.style.border='1px solid #000000';
	email.style.border='1px solid #000000';
	if (name.value == '') {name.style.border='1px solid #FF0000'; complete=0;}
	if (email.value == '') {email.style.border='1px solid #FF0000'; complete=0;}

	if (complete) {
		ajxpgn('nl_form', '/wp-admin/admin-ajax.php?action=nlsignup&name='+name.value+'&email='+email.value+'&url='+url.value);
	}
} 

/*function display_specify(){
	var other = gid('service').value;
	if (other == 1) {
		gid('ifother').style.display = 'block';
	} else {
		gid('ifother').style.display = 'none';
	}
}*/

function patientintakeform() {
	var checkedservice = 0;
	var nonmedical = 0;
	var naturopathic = 0;
	var services = gbc ('service', 'div');
	var selectedservices = [];
	var servicename = '';
	for (var i=0; i < services.length; i++) {
		if (gid('service_'+i).checked) {
			checkedservice = 1;
			var servicename = gid('service_name_'+i).innerHTML;
			selectedservices.push(servicename); 
			if (gid('service_'+i).className == 'Non-Medical') nonmedical = 1;
			if (gid('service_'+i).className == 'Naturopathic') naturopathic = 1;
		}
	}

	if (!checkedservice) {alert ('Please selected a service.'); return;}
	selectedservices = selectedservices.join('^!^');

	var fname 			= gid('fname');
	var lname 			= gid('lname');
	var email 			= gid('email');
	var phone 			= gid('phone');
	var bday_mm 		= gid('bday_mm');
	var bday_dd			= gid('bday_dd');
	var bday_yyyy 		= gid('bday_yyyy');
	var emergname		= gid('emergname');
	var emergphone		= gid('emergphone');
	var emergrelation 	= gid('emergrelation');
	var ohipnumber 		= gid('ohipnumber');
	var ohipversion 	= gid('ohipversion');
	var ohip_mm 		= gid('ohip_mm');
	var ohip_dd 		= gid('ohip_dd');
	var ohip_yyyy 		= gid('ohip_yyyy');
	var url				= gid('url');
	var complete 		= 1;

	fname.style.border		= '1px solid #d7d7d7';
	lname.style.border		= '1px solid #d7d7d7';
	email.style.border		= '1px solid #d7d7d7';
	phone.style.border		= '1px solid #d7d7d7';
	bday_mm.style.border	= '1px solid #d7d7d7';
	bday_dd.style.border	= '1px solid #d7d7d7';
	bday_yyyy.style.border	= '1px solid #d7d7d7';


	if (fname.value == '') {fname.style.border='1px solid #FF0000'; complete=0;}
	if (lname.value == '') {lname.style.border='1px solid #FF0000'; complete=0;}
	if (email.value == '') {email.style.border='1px solid #FF0000'; complete=0;}
	if (phone.value == '') {phone.style.border='1px solid #FF0000'; complete=0;}
	if (bday_mm.value == '') {bday_mm.style.border='1px solid #FF0000'; complete=0;}
	if (bday_dd.value == '') {bday_dd.style.border='1px solid #FF0000'; complete=0;}
	if (bday_yyyy.value == '') {bday_yyyy.style.border='1px solid #FF0000'; complete=0;}
	if (!gid('policy').checked) {gid('policytext').style.color='#FF0000'; complete=0;}


	if (complete) {
		var bday = encodeHTML(bday_mm.value)+'-'+encodeHTML(bday_dd.value)+'-'+encodeHTML(bday_yyyy.value);
		var ohipexpiry = encodeHTML(ohip_mm.value)+'-'+encodeHTML(ohip_dd.value)+'-'+encodeHTML(ohip_yyyy.value);
		if(ohipexpiry == '--') ohipexpiry = '';
		params = [];
		params.push('services='+encodeHTML(selectedservices));
		params.push('fname='+encodeHTML(fname.value));
		params.push('lname='+encodeHTML(lname.value));
		params.push('email='+encodeHTML(email.value));
		params.push('phone='+encodeHTML(phone.value));
		params.push('bday='+bday);
		params.push('emergname='+encodeHTML(emergname.value));
		params.push('emergphone='+encodeHTML(emergphone.value));
		params.push('emergrelation='+ encodeHTML(emergrelation.value));
		params.push('ohipnumber='+encodeHTML(ohipnumber.value));
		params.push('ohipversion='+encodeHTML(ohipversion.value));
		params.push('ohipexpiry='+ohipexpiry);
		params.push('url='+encodeHTML(url.value));
		params.push('nonmedical='+nonmedical);
		params.push('naturopathic='+naturopathic);
		ajxpgn('patientintakeform', '/wp-admin/admin-ajax.php?action=patientintakeform&'+params.join('&'),'','', '', nowrapboxes);
		smoothscroll ('prcontent');
	}
}

function nowrapboxes () {
	var hh_answers = gbc('hh_answer', 'label');
	if (hh_answers) {
		for (var i = 0; i < hh_answers.length; i++) {
			hh_answers[i].style.width = '33.3%';
			if (hh_answers[i].clientHeight > 15) { //font-size
				hh_answers[i].style.width = '66.6%';
				if (hh_answers[i].clientHeight > 15) {
					hh_answers[i].style.width = '100%';
				}
			}
		}
	}
}

function nowrapservices () {
	var services = gbc('service', 'div');
	if (services) {
		for (var i = 0; i < services.length; i++) {
			services[i].style.width = '50%';
			if (services[i].clientHeight > 16) { //div height
				services[i].style.width = '100%';
			}
		}
	}
}

function step1to2 () {
	var checkedservice = 0;
	var nonmedical = 0;
	var naturopathic = 0;
	var services = gbc ('service', 'div');
	for (var i=0; i < services.length; i++) {
		if (gid('service_'+i).checked) {
			checkedservice = 1;
			if (gid('service_'+i).className == 'Non-Medical') nonmedical = 1;
			if (gid('service_'+i).className == 'Naturopathic') naturopathic = 1;
		}
	}

	if (!checkedservice) {alert('Please select a service.'); return;}

	gid('step1').style.height = 0;
	gid('step2').style.height = 'auto';

	if (nonmedical || naturopathic) {
		gid('step2btn').value = 'Next';
	}
	smoothscroll ('prcontent');
}

function healthhistoryform (patientid) {
	var complaint = encodeHTML(gid('hh_complaint').value);
	var ratepain  = encodeHTML(gid('hh_ratepain').value);
	var noticesymptoms = encodeHTML(gid('hh_noticesymptoms').value);
	var describesymptoms = encodeHTML(gid('hh_describesymptoms').value);
	var aggravate = encodeHTML(gid('hh_aggravate').value);
	var relieve = encodeHTML(gid('hh_relieve').value);
	var worse = '';
	if (gid('hh_worse_yes').checked) worse = 'yes';
	if (gid('hh_worse_no').checked) worse = 'no';

	var interfere = [];
	var hh_interfere = document.getElementsByName('hh_interfere');
	for (var i = 0; i < hh_interfere.length; i++) {
		if (hh_interfere[i].checked) interfere.push(hh_interfere[i].value);
	}
	interfere = interfere.join('^!^');

	var diagnosis = gid('hh_diagnosis').value;
	var assessment = gid('hh_assessment').value;

	var imaging = [];
	var imagingdate = '';
	var hh_imaging = document.getElementsByName('hh_imaging');
	for (var i = 0; i < hh_imaging.length; i++) {
		if (hh_imaging[i].checked) {
			imagingdate = gid(hh_imaging[i].value + '_month').value + '-' + gid(hh_imaging[i].value + '_day').value + '-' + gid(hh_imaging[i].value + '_year').value;
			imaging.push(hh_imaging[i].value+' - Date: ' + imagingdate + ', Findings: ' + gid(hh_imaging[i].value + '_findings').value);
		}
	}
	imaging = imaging.join('^!^');

	var meds = [];
	if (gid('med_1').value != '') {meds.push('Med 1: '+encodeHTML(gid('med_1').value)+', Reason: ' + encodeHTML(gid('reason_1').value));} 
	if (gid('med_2').value != '') {meds.push('Med 2: '+encodeHTML(gid('med_2').value)+', Reason: ' + encodeHTML(gid('reason_2').value));} 
	if (gid('med_3').value != '') {meds.push('Med 3: '+encodeHTML(gid('med_3').value)+', Reason: ' + encodeHTML(gid('reason_3').value));} 
	meds = meds.join('^!^');

	var previous = encodeHTML(gid('hh_previous').value);
	var occupation = encodeHTML(gid('hh_occupation').value);
	var duties = encodeHTML(gid('hh_duties').value);

	var familyhistory = [];
	var hh_familyhistory = document.getElementsByName('hh_familyhistory');
	for (var i = 0; i < hh_familyhistory.length; i++) {
		//console.log(hh_familyhistory[i].value);
		//console.log(i);
		if (hh_familyhistory[i].checked) {
			if (hh_familyhistory[i].value == 'Other') familyhistory.push('Other: ' + gid('other_familyhistory').value);
			else familyhistory.push(hh_familyhistory[i].value);
		}
	}
	familyhistory = familyhistory.join('^!^');

	var conditions = [];
	var hh_conditions = document.getElementsByName('hh_condition');
	for (var i = 0; i < hh_conditions.length; i++) {
		if (hh_conditions[i].checked) {
			conditions.push(encodeHTML(hh_conditions[i].value));
		}
	}
	conditions = conditions.join('^!^');

	var pregbox = 0; 
	var duedate = '';
	var numpregs = '';
	if (gid('preg_box').checked) {
		pregbox = 1;
		duedate = encodeHTML(gid('due').value);
		numpregs = encodeHTML(gid('numpregnancies').value);
	}  

	var metal_what = encodeHTML(gid('hh_metal_what').value);
	var metal_where = encodeHTML(gid('hh_metal_where').value);
	//console.log(gid('hh_metal_where').value);
	params = [];
	params.push('patientid='+patientid);
	params.push('complaint='+complaint);
	params.push('ratepain='+ratepain);
	params.push('noticesymptoms='+noticesymptoms);
	params.push('describesymptoms='+describesymptoms);
	params.push('aggravate='+aggravate);
	params.push('relieve='+relieve);
	params.push('worse='+worse);
	params.push('interfere='+interfere);
	params.push('diagnosis='+diagnosis);
	params.push('assessment='+assessment);
	params.push('imaging='+imaging);
	params.push('meds='+meds);
	params.push('previous='+previous);
	params.push('occupation='+occupation);
	params.push('duties='+duties);
	params.push('familyhistory='+familyhistory);
	params.push('conditions='+conditions);
	params.push('duedate='+duedate);
	params.push('pregbox='+pregbox);
	params.push('numpregs='+numpregs);
	params.push('metalwhat='+metal_what);
	params.push('metalwhere='+metal_where);
	//console.log (params);
	var post = '/wp-admin/admin-ajax.php?action=healthhistoryform&'+params.join('&');
	post = post.replace(/#/g, '%23');
	ajxpgn('patientintakeform', post);
	smoothscroll ('prcontent');
}

function showconditions (heading, id) {
	if (gid(id).clientHeight > 0) {
		gid(id).style.height = 0;
		heading.getElementsByTagName('i')[0].style.display = 'block';
		heading.getElementsByTagName('i')[1].style.display = 'none';
	} else {
		gid(id).style.height = 'auto';
		heading.getElementsByTagName('i')[0].style.display = 'none';
		heading.getElementsByTagName('i')[1].style.display = 'block';
	}
}

function checkfileupload(){
	var f = gid('hire_upload');
	var message = gid('file_name');
	var submit = gid('hire_submit');

	var pat = /\S+\.(pdf|jpeg|png|gif|jpg|doc|docx|txt|rtf)/;
	if (!pat.test(f.value)) {
		if (f.value=='') message.innerHTML = "Please upload a file.";
		else message.innerHTML = "Invalid File";
		submit.style.display="none";
		return;
	} else{
		var file_name = f.value.replace('C:\\fakepath\\', '');
		if (file_name.length > 35) file_name = file_name.substring(0, 30) + '...';
		message.innerHTML = file_name;

		submit.style.display="block";
	}
	gid('rightbgcolor').style.height = (gid('split2').clientHeight + 1) + 'px';
}

function checkhireform () {
	var fname = gid('hire_fname');
	var lname = gid('hire_lname');
	var email = gid('hire_email');
	var file = gid('hire_upload');
	var complete=1;
	fname.style.border='1px solid #000000';
	lname.style.border='1px solid #000000';
	email.style.border='1px solid #000000';

	if (fname.value == '') {fname.style.border='1px solid #FF0000'; complete=0;}
	if (lname.value == '') {lname.style.border='1px solid #FF0000'; complete=0;}
	if (email.value == '') {email.style.border='1px solid #FF0000'; complete=0;}
	if (file.value == '') {alert ('Please upload a file.'); complete=0;}
	if (complete) {return true;}
	return false;
}

function toggle_docs (count) {
	if (gid('docs_'+count).clientHeight > 0) {
		gid('docs_'+count).style.height = 0;
		gid('doc_up_'+count).style.display = 'none';
		gid('doc_down_'+count).style.display = 'block';
	} else {
		gid('docs_'+count).style.height = gid('docs_height_'+count).clientHeight + 'px';
		gid('doc_up_'+count).style.display = 'block';
		gid('doc_down_'+count).style.display = 'none';
	}
}

function toggle_side (count) {
	if (gid('side_options_'+count).clientHeight > 0) {
		gid('side_options_'+count).style.height = 0;
		gid('side_up_'+count).style.display = 'none';
		gid('side_down_'+count).style.display = 'block';
	} else {
		gid('side_options_'+count).style.height = gid('side_optionsh_'+count).clientHeight+12+'px';
		gid('side_up_'+count).style.display = 'block';
		gid('side_down_'+count).style.display = 'none';
	}
}

function splitbg_response () {
	gid('rightbgcolor').style.height = (gid('split2').clientHeight + 1) + 'px';
}

if(gid('video_bg')) {
	gid('video_bg').oncanplaythrough=function () {
		videoheight();
	}
}
//loadeddata

document.onkeydown=function (e) {
	e = e || window.event;
	if (gid('overlay_slider')) {
		if (e.keyCode == 27) {
			setTimeout(function () {gid('overlay_slider').style.zIndex = 0;}, 300);
			gid('overlay_slider').style.opacity = 0;
		} 
		if (e.keyCode == 37) {
			slide_about_big(0);
		} 
		if (e.keyCode == 39) {
			slide_about_big(1);
		} 
	}
}

function detectmob() { 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
		return true;
}
else {
	return false;
}
}

if (gid('landingarea')) {
	//console.log (detectmob());
	if(detectmob()) {
		gid('video_bg').style.display = 'none';
		gid('landingarea').className = 'mobilelanding';
		gid('here4u').style.backgroundAttachment = 'scroll';
	}

	elm = document.createElement('div');
	var btag = gid('landingline').getElementsByTagName('b');
	var spantag = gid('landingline').getElementsByTagName('span');
	var itag = gid('landingline').getElementsByTagName('i');
	var livewell = gid('landingtitle').getElementsByTagName('i')[0];
	if (elm.style.animationName === undefined) {
		setTimeout (function () {
			for (i=0; i<itag.length; i++ ) {
				itag[i].style.opacity = 1;
			}
			for (i=0; i<spantag.length; i++ ) {
				spantag[i].style.opacity = 1;
			}
			for (i=0; i<btag.length; i++ ) {
				btag[i].style.opacity = 1;
			}
			livewell.style.opacity = 1; 
			livewell.style.top = '0'; 
		}, 3000);
	}
}

