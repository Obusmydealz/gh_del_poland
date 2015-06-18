// ==UserScript==
// @name        gh_del_whiltelist
// @namespace   gh_space
// @include     http://geizhals.de/?bpnew=*
// @include     http://geizhals.de/?thres=*
// @version     1
// @grant       none
// ==/UserScript==

var white_list = ['.de', '-de', 'computeruniverse.net', 'BIT-electronix', 'talk-point', 'Cyberport', 'Multimedia-Handels GmbH', 'Mindfactory', 'XXXLutz', 'HardwareRogge', 'Onlineshop', 'Online-Shop', 'Compuland', 'Abholshop', 'ATELCO','Rakuten', 'Allyouneed.com'];
var black_list = [];


var spans = document.getElementsByTagName('span');
var br_list = [];
var parent=-1;
var counter = 0;
var spans_length = spans.length;
var curr_year = new Date().getFullYear();

for(i=spans_length-1;i>=0;i=i-1)
  { 
    if (spans[i].innerHTML.substring(6,10)==curr_year){
      var delete_item = true;
      var curr_len = spans[i].innerHTML.length;
      counter++;
      
      if(parent==-1){
        parent=spans[i].parentNode;
        br_list=parent.getElementsByTagName('br');
        br_length=br_list.length;
      }
    
    
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
         parent.removeChild(br_list[br_length-counter]);
         parent.removeChild(spans[i]);
      }
    }
  }
