/**
* Copyright 2016 Nick Bourdakos. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* global $:true */

'use strict';

// conversation variables
var context = null;
var messages = new Array();
var sub_total = 0;
var game_over = false;

$(document).ready(function () {


   var loading = function() {
      var $chatBox = $('#content');
   }

   var $chatInput = $('#field');

   $chatInput.keypress(function (e) {
      if (e.ctrlKey || e.shiftKey && e.keyCode == 13) {
         return true;
      } else if (e.which == 13) {
         converse($(this).val());
         return false;
      }
   });

   $( ".wrapper" ).click(function() {
      $chatInput.focus();
   });

   $(function(){
      $('#content').css({
         height: $(window).innerHeight() - ($chatInput.innerHeight() + $('#title').innerHeight())
      });
      $(window).resize(function(){
         $('#content').css({
            height: $(window).innerHeight() - ($chatInput.innerHeight() + $('#title').innerHeight())
         });
      });
   });

   var converse = function(userText) {
      // check if the user typed text or not
      if (typeof(userText) == undefined || $.trim(userText) == '') {
         return;
      }

      // Display the users message to the screen
      submitMessage(userText);

      // If the order is done ask them to refresh
      if (game_over) {
         talk(true, 'Refresh the page to restart');
         return;
      }

      else {
         parseMessage(userText);
      }
   };

   var scrollChatToBottom = function() {
      var element = $('#content');
      element.animate({
         scrollTop: element[0].scrollHeight
      }, 300);
   };


   var talk = function(origin, text) {
      var d = new Date();
      var n = d.getTime();
      messages.push({incoming: origin, message: text, timestamp: n});
      var $chatBox = $('#content');
      var html = '';
      for (var i = 0; i < messages.length; i++) {
         if (i == 0) {
            // html += '</br>';
         }
         var message = messages[i];

         var prevText = null;
         if (i > 0) {
            prevText = messages[i - 1];
         }

         var nextText = null;
         if (i < messages.length - 1) {
            nextText = messages[i + 1];
         }

         // Get the date of the current, previous and next message.
         var dateCurrent = message.timestamp;
         var datePrevious = 0;
         var dateNext = 0;

         // Get the sender of the current, previous and next message. (returns true if you)
         var userCurrent = message.incoming;
         var userPrevious = message.incoming;
         var userNext = !message.incoming;

         // Check if previous message exists, then get the date and sender.
         if (prevText != null) {
            datePrevious = prevText.timestamp;
            userPrevious = prevText.incoming;
         }

         // Check if next message exists, then get the date and sender.
         if (nextText != null) {
            dateNext = nextText.timestamp;
            userNext = nextText.incoming;
         }

         // Calculate time gap.
         var largePC = (dateCurrent - datePrevious) > (60 * 1000);
         var largeCN = (dateNext - dateCurrent) > (60 * 1000);
         var top = false;
         html += '<div class="clearfix">';
         if (!userCurrent && (userPrevious || largePC) && (!userNext && !largeCN)) {
            html += '<span class="bubble right rtop">' + messages[i].message + '</span>';
         } else if (!userCurrent && (!userPrevious && !largePC) && (!userNext && !largeCN)) {
            html += '<span class="bubble right rmiddle">' + messages[i].message + '</span>';
         } else if (!userCurrent && (!userPrevious && !largePC)) {
            top = true;
            html += '<span class="bubble right rbottom">' + messages[i].message + '</span>';
         } else if (!userCurrent) {
            top = true;
            html += '<span class="bubble right single">' + messages[i].message + '</span>';
         } else if ((!userPrevious || largePC) && (userNext && !largeCN)) {
            html += '<span class="bubble left ltop">' + messages[i].message + '</span>';
         } else if ((userPrevious && !largePC) && (userNext && !largeCN)) {
            html += '<span class="bubble left lmiddle">' + messages[i].message + '</span>';
         } else if (userPrevious && !largePC) {
            html += '<span class="bubble left lbottom">' + messages[i].message + '</span>';
         } else {
            html += '<span class="bubble left single">' + messages[i].message + '</span>';
         }
         html += '</div>';
         if (i == messages.length - 1) {
            html += '<div class="clearfix">';
            if (top) {
               html += '<span style="height: 34px; display: inline-block;"></span>';
            } else {
               html += '<span style="height: 20px; display: inline-block;"></span>';
            }
            html += '</div>';
         }
      }
      $chatBox.html(html);
      setTimeout(function() {
      }, 100);
   };

   var submitMessage = function(text) {
      talk(false, text);
      scrollChatToBottom();
      clearInput();
   };

   var clearInput = function() {
      $('#field').val('');
   };

   // Initialize the conversation
   var $chatBox = $('#content');
   var html = '<span style="height: 34px; display: inline-block;"></span>';
   $chatBox.append(html);
   loading();
   talk(true, 'Hi there! I am fetch, how can I help?');
});
