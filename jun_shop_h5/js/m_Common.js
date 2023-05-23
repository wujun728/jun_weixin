/// <reference path="jquery.min.js"/>

//function sendPostRequest(targetUrl, parameters, successCallback, errorCallback) {
//  $.ajax({
//      type: "POST",
//      url: targetUrl,
//      data: parameters,
//      dataType: "json",
//      async: true,
//      success: function (response) {
//          //if (response.needLogin) {
//          //    location.href = '/m/login.aspx';
//          //}
//          if (response = "1") { successCallback && successCallback(response); }
//      },
//      timeout: 30000,
//      error: function (e) {
//          if (e.responseText == "") return;
//          if (e.statusText == "timeout") {
//              alert("服务器忙");
//              errorCallback && errorCallback(e);
//          } else if (e) {
//              errorCallback && errorCallback(e);
//          }
//      }
//  });
//}
//function sendRequest(targetUrl, parameters, successCallback, errorCallback) {
//  $.ajax({
//      type: "GET",
//      url: targetUrl,
//      data: parameters,
//      dataType: "json",
//      async: true,
//      success: function (response) {
//          //if (response.needLogin) {
//          //    location.href = '/m/login.aspx';
//          //}
//          if (response = "1") { successCallback && successCallback(response); }
//      },
//      timeout: 30000,
//      error: function (e) {
//          if (e.responseText == "") return;
//          if (e.statusText == "timeout") {
//              alert("服务器忙");
//              errorCallback && errorCallback(e);
//          } else if (e) {
//              errorCallback && errorCallback(e);
//          }
//      }
//  });
//}