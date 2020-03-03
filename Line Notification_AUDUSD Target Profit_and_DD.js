//TP Notification
function myFunction() {
  var sh1 = SpreadsheetApp.getActiveSpreadsheet();
  var tpBlock = sh1.getSheetByName("AUDUSD Note").getRange(4,1).getValue();
  var tpPrice = sh1.getSheetByName("AUDUSD Note").getRange(4,2).getValue();
  var token = "put line token here";
  var message = "Your AUDUSD order reach tp, you can close position"+" "+tpBlock+" "+"@"+tpPrice.toFixed(5);
  sendLineNotify(message, token);
}

function sendLineNotify(message, token){
  var options =
   {
     "method"  : "post",
     "payload" : {"message" : message},
     "headers" : {"Authorization" : "Bearer " + token}
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}


//DD Notification
function myFunction2() {
  var sh1 = SpreadsheetApp.getActiveSpreadsheet();
  var ddBlock = sh1.getSheetByName("AUDUSD Note").getRange(18,1).getValue();
  var ddPrice = sh1.getSheetByName("AUDUSD Note").getRange(18,2).getValue();
  var ddPercent = sh1.getSheetByName("AUDUSD Note").getRange(18,4).getValue();
  var ddType = sh1.getSheetByName("AUDUSD Note").getRange(18,5).getValue();
  var preBlock = sh1.getSheetByName("AUDUSD Note").getRange(18,6).getValue();
  var prePrice = sh1.getSheetByName("AUDUSD Note").getRange(18,7).getValue();
  var token = "8DCu9pNbbwrBQVYz8XPDuJyz6I6PT9nkCIMWojp4X4C";
  var message ="นายท่าน AUDUSD ต่ำกว่า "+(ddPercent*100)+"%"+" "+ddType+"นายท่านสามารถเปิด"+" "+"block"+ddBlock+" "+"@"+ddPrice.toFixed(5)+" ได้เลย";
  sendLineNotify(message, token);
}

function sendLineNotify(message, token){
  var options =
   {
     "method"  : "post",
     "payload" : {"message" : message},
     "headers" : {"Authorization" : "Bearer " + token}
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

//AUDUSD Monitor
function AUDUSDPrice() {
 var sh1 = SpreadsheetApp.getActiveSpreadsheet();
 var auPrice = sh1.getSheetByName("AUDUSD Monitor").getRange(1, 10).getValue();
 var tpPrice = sh1.getSheetByName("AUDUSD Note").getRange(4,2).getValue();
 var ddPrice = sh1.getSheetByName("AUDUSD Note").getRange(18,2).getValue();
  //Logger.log(ddBlock); 
  
if(auPrice >= tpPrice)
{
  myFunction()
  }

  else if(auPrice <= ddPrice)
{
  myFunction2()
}
  
}

//Create Trigger
function customTrigger(){
  var date = new Date();  
  var day = Utilities.formatDate(date, "GMT+7", "u");
  var hrs = date.getHours();
  
  Logger.log(date);
  if(day==1 && hrs>=4)
  {
    ScriptApp.newTrigger("AUDUSDPrice").timeBased().everyMinutes(5).create();
  }
  
  else if(day==6 && hrs>=4)
  {
    deleteTrigger();
  }
}

function deleteTrigger() {
  var Triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < Triggers.length; i++) {
    if (Triggers[i].getHandlerFunction() == "AUDUSDPrice") {
      ScriptApp.deleteTrigger(Triggers[i])
    }
  }
}