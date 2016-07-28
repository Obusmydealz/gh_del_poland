// ==UserScript==
// @name        gh_del_whiltelist
// @namespace   gh_space
// @include     http://geizhals.de/?bpnew=*
// @include     http://geizhals.de/?thres=*
// @include     https://geizhals.de/?bpnew=*
// @include     https://geizhals.de/?thres=*
// @version     1
// @grant       none
// ==/UserScript==

var white_list = ['.de', '-de', 'alternate', 'computeruniverse.net', 'BIT-electronix', 'talk-point', 'Cyberport', 'GmbH', 'Mindfactory', 'XXXLutz', 'HardwareRogge', 'Onlineshop', 'Online-Shop', 'Compuland', 'Abholshop', 'ATELCO','Rakuten', 'Allyouneed.com','check24','DriveCity','VibuOnline','Elektronik','direkt','exklusiv','handel','versand'];
var black_list = [];


var spans = document.querySelectorAll('span.notrans');
var br_list = [];
var parent=-1;
var modified=false;
var counter = 0;
var spans_length = spans.length;
var curr_year = new Date().getFullYear();

if(parent==-1){
    br_list=document.getElementsByTagName('br');
    parent=br_list[0].parentNode;
    br_length=br_list.length;
}


if (spans_length==0) {
    console.log('Modify HTML DOM.');
    var tmp = document.createElement('div');
    for (var i=0;i<parent.childNodes.length;i++) {
        var item = parent.childNodes.item(i);
        if (!(item.nodeType === 1 && item.nodeName === 'SCRIPT')) {
          var cloned_node = item.cloneNode();
          cloned_node.innerHTML = item.innerHTML;
          tmp.appendChild(cloned_node);
        }
    }
    var lines = tmp.innerHTML.split('<br>').filter(function(x){
                  return x && x.trim() != ''
              });
    tmp.innerHTML = lines.map(function(x){
                  return '<span class="notrans">' + x.trim() + '<br></span>'
              }).join('\n');
    parent.innerHTML = tmp.innerHTML;
    spans = document.querySelectorAll('span.notrans');
    spans_length = spans.length;
    modified = true;
    console.log('Done.');
}


for(i=spans_length-1;i>=0;i=i-1)
  { 
    if (spans[i].innerHTML.substring(6,10)==curr_year){
      var delete_item = true;
      var curr_len = spans[i].innerHTML.length;
      if (modified){
          curr_len -= 4;
      }
      counter++;
      
      // if(parent==-1){
        // parent=spans[i].parentNode;
        // br_list=parent.getElementsByTagName('br');
        // br_length=br_list.length;
      // }
     
    
      //Check white_list
      for(index=0;index<white_list.length;index++){
        elem = white_list[index];
        if(spans[i].innerHTML.substring(curr_len-elem.length,curr_len).toLowerCase()==elem.toLowerCase()){
          delete_item=false;
          break;
        }
      }
      
      //Check black_list
      for(index=0;index<black_list.length;index++){
        elem = black_list[index];
        if(spans[i].innerHTML.substring(curr_len-elem.length,curr_len).toLowerCase()==elem.toLowerCase()){
          delete_item=true;
          break;
        }
      }
      
      // Delete elements
      if (delete_item){
         //parent.removeChild(br_list[br_length-counter]);
         //parent.removeChild(spans[i]);
        spans[i].style.display = "none";
        if(!modified){
            br_list[br_length-counter].style.display = "none";
        }
      }
    }
}
