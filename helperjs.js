/*
 * Arslan Şahin
 * arsann@gmail.com
 * helperjs.com
 * 28-06-2017
 */
'use strict'
document.querySelector('html').style.display='none';
var elementArray = ['div','p','span','h1','h2','h3','h4','h5','h6','table','tbody','thead','tr','td','th','ul','li','ol','hr];
window.addEventListener("load",function(event) {

  //striptags
  document.querySelectorAll('[striptags*=true]').forEach((function(x){

    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
      x.innerHTML = x.innerHTML.replace(/(<([^>]+)>)/ig,"");
    }

  }));

  //substr
  document.querySelectorAll('[substr*=true]').forEach((function(x){

      var start = !x.getAttribute('substr-start') ? 0 : x.getAttribute('substr-start');
      var end = x.getAttribute('substr-end');

      if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
        x.innerHTML = x.innerHTML.trim().substr(start,end);
      }

      else if( (x.nodeName == 'INPUT' && x.type == 'text') ||  x.nodeName == 'TEXTAREA' ){
        x.value = x.value.trim().substr(start,end);
      }

  }));

  //initialize function
  document.querySelectorAll('[function]').forEach(function(x){
      if(x.getAttribute('function')){
        eval(x.getAttribute('function'));
      }
  });

  document.querySelectorAll('[md5*=true]').forEach(function(x){

    if(elementArray.indexOf(x.nodeName.toLowerCase()) > -1){
      if(x.innerHTML){
        x.innerHTML = helperjs.MD5(x.innerHTML);
      }
    }

    else if( (x.nodeName == 'INPUT' && x.type == 'text') ||  x.nodeName == 'TEXTAREA' ){
      if(x.value){
        x.value = helperjs.MD5(x.value);
      }
    }

  });

  //file load
  document.querySelectorAll('[load-file]').forEach(function(x){

    var file = x.getAttribute('load-file');

    if(file){

      var info = (/[.]/.exec(file)) ? /[^.]+$/.exec(file) : undefined;

      if(info[0].toLowerCase() == 'css'){
        helperjs.loadcss([file]);
      }

      else if(info[0].toLowerCase() == 'js'){
        helperjs.loadjs([file]);
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
        }
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

    else if( (x.nodeName == 'INPUT' && x.type == 'text') ||  x.nodeName == 'TEXTAREA' ){
      x.value =  x.value.trim().split(' ').map(function(x){
        var rep = utf8Char1.indexOf(x.charAt(0)) < 0 ? x.charAt(0).toUpperCase() : utf8Char2[utf8Char1.indexOf(x.charAt(0))];
        return rep+x.slice(1);
      }).join(' ');
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
  loadjs : function(js_path) {
    if(js_path.length > 0){
      for(var js in js_path){
        document.write('<' + 'script src="' + js_path[js] + '"><' + '/script>');
      }
    }
  },
  //multiple css file load
  loadcss : function(css_path) {
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

  MD5 : function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()},

}
