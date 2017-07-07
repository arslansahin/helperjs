/*
 * Arslan Şahin
 * arsann@gmail.com
 * helperjs.com
 * 28-06-2017
 */
'use strict'
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;
document.querySelector('html').style.display='none';
var elementArray = ['div','a','p','span','h1','h2','h3','h4','h5','h6','table','tbody','thead','tr','td','th','ul','li','ol','hr'];
window.addEventListener("load",function(event) {
  //striptags
  document.querySelectorAll('[striptags*=true]').forEach((function(x){
    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
      x.innerHTML = x.innerHTML.trim().replace(/(<([^>]+)>)/ig,"");
    }
    else if(x.nodeName.toLowerCase() == 'input' || x.type.toLowerCase() == 'text'){
      x.getAttribute('value') ? x.setAttribute('value',x.getAttribute('value').trim().replace(/(<([^>]+)>)/ig,"")):'';
    }
    else if(x.nodeName.toLowerCase() == 'textarea' ){
      x.textContent ? x.textContent = x.textContent.trim().replace(/(<([^>]+)>)/ig,""):'';
    }
  }));
  //substr
  document.querySelectorAll('[substr*=true]').forEach((function(x){
      var start = !x.getAttribute('substr-start') ? 0 : x.getAttribute('substr-start');
      var end = x.getAttribute('substr-end');
      if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
        x.innerHTML = x.innerHTML.trim().substr(start,end);
      }
      else if(x.nodeName.toLowerCase() == 'input' || x.type.toLowerCase() == 'text'){
        x.getAttribute('value') ? x.setAttribute('value',x.getAttribute('value').trim().substr(start,end)):'';
      }
      else if(x.nodeName.toLowerCase() == 'textarea' ){
        x.textContent ? x.textContent = x.textContent.trim().substr(start,end):'';
      }
  }));
  //initialize function
  document.querySelectorAll('[function]').forEach(function(x){
      if(x.getAttribute('function')){
        eval(x.getAttribute('function'));
      }
  });
  //md5 encryption
  document.querySelectorAll('[md5*=true]').forEach(function(x){
    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
      if(x.innerHTML){
        x.innerHTML = helperjs.MD5(x.innerHTML);
      }
    }
    else if(x.nodeName.toLowerCase() == 'input' || x.type.toLowerCase() == 'text'){
      x.getAttribute('value') ? x.setAttribute('value',helperjs.MD5(x.getAttribute('value').trim())):'';
    }
    else if(x.nodeName.toLowerCase() == 'textarea' ){
      x.textContent ? x.textContent = helperjs.MD5(x.textContent.trim()):'';
    }
  });
  //file load
  document.querySelectorAll('[load-file]').forEach(function(x){
    var file = x.getAttribute('load-file');
    if(file){
      var info = (/[.]/.exec(file)) ? /[^.]+$/.exec(file) : undefined;
      if(info[0].toLowerCase() == 'css'){
        helperjs.loadCss([file]);
      }
      else if(info[0].toLowerCase() == 'js'){
        helperjs.loadJs([file]);
      }
    }
  });
  //include file
  document.querySelectorAll('[include]').forEach(function(x){
    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1 && x.getAttribute('include')){
      var rawFile = new XMLHttpRequest();
        rawFile.open("GET", x.getAttribute('include'), false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    x.innerHTML = rawFile.responseText;
                }
            }
        }-
        rawFile.send(null);
    }
  });
  //Convert first characters of text to uppercase
  document.querySelectorAll('[uppercase*=true]').forEach(function(x){
    var utf8Char1 = ['ş','i','ı','ö','ü','ğ','ç'];
    var utf8Char2 = ['Ş','İ','I','Ö','Ü','Ğ','Ç'];
    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
      x.innerHTML =  x.innerHTML.trim().split(' ').map(function(x){
        var rep = utf8Char1.indexOf(x.charAt(0)) < 0 ? x.charAt(0).toUpperCase() : utf8Char2[utf8Char1.indexOf(x.charAt(0))];
        return rep+x.slice(1);
      }).join(' ');
    }
    else if(x.nodeName.toLowerCase() == 'input' && x.type.toLowerCase() == 'text'){
      x.setAttribute('value',x.getAttribute('value').trim().split(' ').map(function(x){
        var rep = utf8Char1.indexOf(x.charAt(0)) < 0 ? x.charAt(0).toUpperCase() : utf8Char2[utf8Char1.indexOf(x.charAt(0))];
        return rep+x.slice(1);
      }).join(' '));
    }
    else if(x.nodeName.toLowerCase() == 'textarea'){
      x.textContent =  x.textContent.trim().split(' ').map(function(x){
        var rep = utf8Char1.indexOf(x.charAt(0)) < 0 ? x.charAt(0).toUpperCase() : utf8Char2[utf8Char1.indexOf(x.charAt(0))];
        return rep+x.slice(1);
      }).join(' ');
    }
  });
  //open iframe
  document.querySelectorAll('[iframe-open*=true]').forEach(function(x){
    //supported video streaming sites
    //youtube.com
    //dailymotion.com
    //vimeo.com
    //izlesene.com
    //vidivodo.com
    //break.com
    //alkislarlayasiyorum
    x.addEventListener('click',function (event){
      try {
        var id = helperjs.MD5(Math.random().toString(36).substring(7));
        if (!id) throw new Error('not generate random id.');
        var src = x.getAttribute('iframe-src');
        if(!src) throw new Error('iframe-src not found.');
        //width
        var width = x.getAttribute('iframe-width');
        var width = width ? width.indexOf('%') > -1 ? width:width+'px':'75%';
        //height
        var height = x.getAttribute('iframe-height');
        var height = height ? height.indexOf('%') > -1 ? height:height+'px':'auto';
        //youtube.com
        if(src.indexOf('youtube.com/watch?v=') > -1){
          src = '//www.youtube.com/embed/'+src.split('watch?v=')[1].split('&')[0];
        }
        //dailymotion
        else if(src.indexOf('dailymotion.com/video') > -1){
          var vid = src.str_replace(
            ['https://','http://','www.','dailymotion.com/video/'],
            ['','','','']
          ).split('_');
          src = vid[0] ? '//www.dailymotion.com/embed/video/'+vid[0]:src;
        }
        //vimeo.com
        else if(src.indexOf('vimeo.com') > -1){
          var vid = src.str_replace(['https://','http://','www.'],['','','']).split('/');
          src = vid[1] ? '//player.vimeo.com/video/'+vid[1]+'?title=0&byline=0&portrait=0&badge=0':src;
        }
        //izlesene.com
        else if(src.indexOf('izlesene.com/video') > -1){
          var vid = src.str_replace(
            ['https://','http://','www.','izlesene.com/video/'],
            ['','','','']
          ).split('/');
          src = '//www.izlesene.com/embedplayer/'+vid[1]+'/?showrel=1&loop=0&autoplay=0&autohide=1&showinfo=1&socialbuttons=1';
        }
        //vidivodo.com
        else if(src.indexOf('vidivodo.com') > -1){
          var vid = src.str_replace(['https://','http://','www.'],['','','']).split('/');
          src = vid[1] ? '//www.vidivodo.com/embed/'+vid[1]:src;
        }
        //break.com
        else if(src.indexOf('break.com/video') > -1){
          var vid = src.str_replace(
            ['https://','http://','www.','break.com/video/'],
            ['','','','']
          ).split('-');
          src = '//www.break.com/embed/'+vid[vid.length-1]+'?embed=1';
        }
        //alkislarlayasiyorum.com
        else if(src.indexOf('alkislarlayasiyorum.com/icerik') > -1){
          var vid = src.str_replace(
            ['https://','http://','www.','alkislarlayasiyorum.com/icerik/'],
            ['','','','']
          ).split('/');
          src = '//alkislarlayasiyorum.com/embedplayer/'+vid[0];
        }
        var open = '<div id="helperjs_ov_'+id+'" style="position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,0.4)">';
        open +='<div style="background-color:#fefefe;margin:5% auto;padding:20px;padding-bottom:30px;border:1px solid #888;width:'+width+';height:'+height+';">';
          open +='<span style="cursor:pointer;margin-top:-20px;margin-right:-11px;color: #aaa;float: right;font-size: 28px;font-weight: bold;" id="close_ov_'+id+'">&times;</span>';
          open +='<iframe src="'+src+'" style="width:100%;height:'+height+';border:none;"></iframe>';
        open +='</div>';
        open +='</div>';
        document.querySelector('body').insertAdjacentHTML('beforeend',open);
        //delete
        document.getElementById('close_ov_'+id).addEventListener('click',function(){
          var element = document.getElementById("helperjs_ov_"+id+"");
          if(element){
            element.parentNode.removeChild(element);
          }
        });
        //disable a element event
        x.nodeName.toLowerCase() == 'a'? event.preventDefault():'';
      } catch (e) {
       //console.log(e);
      }
    });
    //auto open iframe
    x.getAttribute('iframe-click') == "true" ? x.click():'';
  });
  //str-replace
  //Replace the text in the typed element str-replace = "[{searched text1, searched text2}, {newtext1, newtext2}]"
  document.querySelectorAll('[str-replace*="["]').forEach(function(x){
    try {
      var data = x.getAttribute('str-replace').trim().replace('[{','').replace('}]','').split('},{');
      if(!data[0] && !data[1]) throw new Error('Missing parameter.');
      if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
        if(x.innerHTML){
          x.innerHTML = x.innerHTML.str_replace(data[0].split(','),data[1].split(','));
        }
      }
      else if(x.nodeName.toLowerCase() == 'input' && x.type.toLowerCase() == 'text'){
        if(x.getAttribute('value')){
          x.setAttribute('value',x.getAttribute('value').str_replace(data[0].split(','),data[1].split(',')));
        }
      }
      else if(x.nodeName.toLowerCase() == 'textarea' ){
        if(x.textContent){
          x.textContent = x.textContent.str_replace(data[0].split(','),data[1].split(','));
        }
      }
    } catch (e) {
      //console.log(e);
    }

  });

  //image to canvas
  document.querySelectorAll('[img2canvas*=true]').forEach(function(x){
    var id = helperjs.MD5(Math.random().toString(36).substring(7));
    var canvas_width =  x.getAttribute('img2canvas-width');
    var canvas_height=  x.getAttribute('img2canvas-height');
    var img_class = x.getAttribute('class');
    x.insertAdjacentHTML('afterend','<canvas id="helperjs_canvas_'+id+'" '+(canvas_width?'width="'+canvas_width+'"':'')+' '+(img_class?'class="'+img_class+'"':'')+'"></canvas>');
    var cnv = document.getElementById("helperjs_canvas_"+id+"");
    var ctx = cnv.getContext("2d");
    var img = new Image();
    img.onload = function(data){
      cnv.height = cnv.width * (img.height / img.width);
      var oc = document.createElement('canvas');
      var octx = oc.getContext('2d');
      oc.width = img.width * 0.5;
      oc.height = img.height * 0.5;
      octx.drawImage(img, 0, 0, oc.width, oc.height);
      octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
      ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,0, 0, cnv.width, cnv.height);
    }
    img.src = x.src;
    x.remove();

  });

  //map
  document.querySelectorAll('[google-map*=true]').forEach(function(x){
    try {
      if(elementArray.indexOf(x.nodeName.toLowerCase()) < 0) throw new Error('You are using this feature incorrectly.');
      x.innerHTML = 'Yükleniyor...';
      var mapkey = x.getAttribute('map-key');
      var lat = x.getAttribute('map-lat');
      var lon = x.getAttribute('map-lon');
      if(!mapkey) throw new Error("map-key parameter not entered.");
      if(!lat) throw new Error("map-lat parameter not entered.");
      if(!lon) throw new Error("map-lon parameter not entered.");
      var defaultWidth = '400px';
      var defaultHeight= '300px';
      helperjs.loadJs('https://maps.googleapis.com/maps/api/js?key=' + mapkey + '&libraries=places&sensor=false', function () {

        if(x.getAttribute('style') == null){
          x.setAttribute('style','width:'+defaultWidth+';height:'+defaultHeight+';');
        }
        else if(x.getAttribute('style').indexOf('width') < 0 && x.getAttribute('style').indexOf('height') < 0){
          x.setAttribute('style','width:'+defaultWidth+';height:'+defaultHeight+';');
        }
        else if(x.getAttribute('style').indexOf('width') > -1 && x.getAttribute('style').indexOf('height') < 0){
          x.setAttribute('style','height:'+defaultHeight+';');
        }
        var zoom = x.getAttribute('map-zoom') ? parseFloat(x.getAttribute('map-zoom')):10;
        var title = x.getAttribute('map-title');
        var description = x.getAttribute('map-description');
        var map_marker = x.getAttribute('map-marker');
        var myLatlng = new google.maps.LatLng(lat, lon);
        var mapOptions = {
          center: myLatlng,
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(x, mapOptions);
        var image = map_marker !== null ? map_marker : 'http://www.google.com/mapfiles/marker.png';
        var description = description?description:title;
        if(description){
          var contentString = decodeURIComponent(description);
          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 250
          });
        }
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: decodeURIComponent(title),
          icon: image
        });
        description ? infowindow.open(map, marker):'';
      },[].filter.call(document.getElementsByTagName('script'), (scpt) => scpt.src.indexOf('key='+mapkey+'') >= 1 ).length);
    } catch (e) {
      //console.log("helperjs:"+e);
    }
  });

  //timer
  document.querySelectorAll('[timer*=true]').forEach(function(x){
    try {
      var duration = x.getAttribute('timer-duration');//minutes
      var callback = x.getAttribute('timer-callback') ? x.getAttribute('timer-callback') : '';
      if(duration < 1) throw new Error();
      helperjs.timer({
        duration:duration,
        display:x,
        callback:function(){
          callback && eval(callback);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });

  document.querySelector('html').style.display='block';

},false);

var helperjs = {
  ajax : function(obj){
    /*
      State  Description
      0      The request is not initialized
      1      The request has been set up
      2      The request has been sent
      3      The request is in process
      4      The request is complete
    */
    try {
      if(typeof obj != 'object') throw new Error();
      if(!Object.keys(obj).indexOf('type') < 0 || !Object.keys(obj).indexOf('url') < 0) throw new Error();
      var http = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      http.open(obj.type, obj.url, true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.onreadystatechange = function () {
        if(http.readyState == 2 && http.status == 200){
          obj.start && obj.start(http.status);
        }
        if (http.readyState == 4) {
          if (http.status == 200) {
            obj.success && obj.success(http.responseText);
          } else {
            obj.error && obj.error(http.status);
          }
        }
      };
      http.send(obj.data?obj.data:null);
    } catch (e) {
      //console.log(e);
    }
  },
  //multiple js file load
  loadJs : function(js_path,callback,count) {
    if(typeof js_path == 'object'){
      if(js_path.length > 0){
        for(var js in js_path){
          var create = document.createElement('script');
          create.type = 'text/javascript';
          //create.async = true;
          create.src = js_path[js];
          var tag = document.getElementsByTagName('script')[0];
          tag.parentNode.insertBefore(create,tag);
        }
      }
    }
    else if(typeof js_path == 'string'){
      if(count < 1){
        var head=document.getElementsByTagName("head")[0];
        var script=document.createElement('script');
        script.src=js_path;
        script.type='text/javascript';
        script.onload=callback;
        script.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            callback && callback();
          }
        }
        head.appendChild(script);
      }
      else {
        callback && callback();
      }
    }
  },
  //multiple css file load
  loadCss : function(css_path) {
    if(css_path.length > 0){
      for(var css in css_path){
        var f = document.createElement("link");
        f.setAttribute("rel", "stylesheet");
        f.setAttribute("type", "text/css");
        f.setAttribute("href", css_path[css]);
        if (typeof f != "undefined"){
          document.getElementsByTagName("head")[0].appendChild(f);
        }

      }
    }
  },
  //css propertiy repeat
  repeatCssPropertiy : function(data){
    try {
      var addStyle='';
      var start = parseFloat(data.repeatStart ? data.repeatStart:0);
      var end = parseFloat(data.repeatEnd);
      if(end < 1) throw new Error('How many times to repeat is not specified.');
      if(typeof data.className =='string' &&  typeof data.propertiy =='string') {
        if(!data.className) throw new Error('Class name not written.');
        if(data.propertiy.split(';').length > 1) throw new Error('This method only works for a single css propertiy.');
        for(var i=start;i<=end;i++){
          addStyle += '.'+data.className+i+' {'+data.propertiy+':'+i+'px;}';
        }
      }
      else if(typeof data.className =='object' &&  typeof data.propertiy =='object') {
        if(data.className.length < 1)throw new Error('Css class name string is empty.');
        if(data.propertiy.length < 1)throw new Error('Css propertiy array is empty');
        if(data.className.length !== data.propertiy.length) throw new Error('Class name array does not match propertiy array.');
        data.className.forEach(function(x,u){
          for(var i=start;i<=end;i++){
            addStyle += ' .'+x+i+' {'+data.propertiy[u]+':'+i+'px;}';
          }
        });
      }
      if(addStyle){
        var style = document.createElement('style');
        style.innerHTML=addStyle;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    } catch (e) {
      //console.log(e);
    }

  },
  //countdown timer
  timer: function (data) {
    //duration, display,callback
    var duration = data.duration;//minutes
    var timer = duration, minutes, seconds;
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    data.display.textContent = minutes + ":" + seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      data.display.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        timer = 0;
        data.callback && data.callback();
      }
    }, 1000);
  },
  //ismobile
  isMobile: function () {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },
  //md5 encryption
  MD5 : function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()},
};
String.prototype.str_replace = function(find, replace) {
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};
/*
Array.prototype.array_end = function(){
  return this[this.length-1];
};
*/
