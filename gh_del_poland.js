//Einfügen erlauben
// ==UserScript==
// @name        gh_del_poland
// @namespace   gh_space
// @include     http://geizhals.de/*
// @version     1
// @grant       none
// ==/UserScript==

var bad_list = ['.pl','Polska'];

var spans = document.getElementsByTagName('span');
var br_list = [];
var parent=-1;
var counter = 0;
var spans_length = spans.length;
var curr_year = new Date().getFullYear();

for(i=spans_length-1;i>=0;i=i-1)
  { 
    var delete_item = false;
    var curr_len = spans[i].innerHTML.length;
    if (spans[i].innerHTML.substring(6,10)==curr_year){
      counter++;
      
      if(parent==-1){
        parent=spans[i].parentNode;
        br_list=parent.getElementsByTagName('br');
        br_length=br_list.length;
      }
    
      for(index=0;index<bad_list.length;index++){
        elem = bad_list[index];
        if(spans[i].innerHTML.substring(curr_len-elem.length,curr_len)==elem){
          delete_item=true;
        }
      }

      if (delete_item){
         parent.removeChild(br_list[br_length-counter]);
         parent.removeChild(spans[i]);
      }
    }
  }
