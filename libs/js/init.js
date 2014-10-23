$(document).ready(function (){

   var scanner = new Scanner();
   scanner.init('#test0');
   scanner.controllerDivStyle=''; 
   scanner.controlBarStyle='background-color:#999;';
   scanner.setControlBar();
  //Insert scanPanel before #test0 div
   scanner.setScanPanel("#test0",'before');
   //set actions to each buttons in #test0
   for (var j = 0, len = 5; j < len; j+=1) {
     scanner.actions[j]=[];
     for (var i = 0, slen = 5; i < slen; i+=1) {
       scanner.actions[j].push(function(){
         var elem=scanner.getElem();
         var col = scanner.getSelCol();
         var row = scanner.getSelRow();
       var val = $(elem +' tr:eq('+row+') td:eq('+col+')').children().first().prop('id');
        alert(val);
       }
                              );
     }
   }

   scanner.toggleButtonDisable('#stop_test0',true);

   $('#txtPB').click(function (){
   });
   $('#stop_test0').click(function (){
     scanner.stopTimer();
     scanner.toggleButtonDisable('#start_test0',false);
     scanner.toggleButtonDisable('#select_test0',true);
     scanner.toggleButtonDisable('#stop_test0',true);
   });
   $('#start_test0').on('click',function(){
     scanner.startTimer('row',scanner.scanSpeed);
     scanner.toggleButtonDisable('#start_test0',true);
     scanner.toggleButtonDisable('#changeScanSpeed_test0',true);
     scanner.toggleButtonDisable('#select_test0',false);
     scanner.toggleButtonDisable('#stop_test0',false);
   });
   scanner.toggleButtonDisable('#start_test0',false);
   $('#select_test0').on('click',function(){
     scanner.selectItem();
     scanner.toggleButtonDisable('#start_test0',true);
   });
   $('#scanModeOnOff_test0').on('click',function(){
     scanner.toggleScanOnOff();
   });
   $('#scanModeOnOff_test0').mouseenter(function(){ 
     $('#test0').css('background-color','red');
   }).mouseleave(function(){ 
     $('#test0').css('background-color','');
   });
   $('#changeScanSpeed_test0').on('click',function(){ 
     scanner.setSpeedScan($('#scanSpeed_test0').val());
   });
   $('#scanSpeed_test0').keyup(function(){
     if (($(this).val().length>0 && !isNaN(parseInt($(this).val())))) {
       scanner.toggleButtonDisable('#changeScanSpeed_test0',false);
     }else{
       scanner.toggleButtonDisable('#changeScanSpeed_test0',true);
     }
   });
});


$(document).ready(function (){
  //Set click event to each buttons in #test0
  $('#test0 :button').on('click',function(){
    alert($(this).val()+' is clicked.');
});
});

$(document).ready(function (){

  var scanner = new Scanner();
  scanner.init('#test');
  scanner.controllerDivStyle='background-color: yellow; width: 200px;'; 
  scanner.selectColor='green';
  scanner.setControlBar();
  //Insert scanPanel after #test3 div
   scanner.setScanPanel("#test3"); 
     scanner.toggleButtonDisable('#stop_test',true);

   $('#txtPB').click(function (){
   });
   $('#stop_test').click(function (){
     scanner.stopTimer();
     scanner.toggleButtonDisable('#start_test',false);
     scanner.toggleButtonDisable('#select_test',true);
     scanner.toggleButtonDisable('#stop_test',true);
   });
   $('#start_test').on('click',function(){
     scanner.startTimer('row',scanner.scanSpeed);
     scanner.toggleButtonDisable('#start_test',true);
     scanner.toggleButtonDisable('#changeScanSpeed_test',true);
     scanner.toggleButtonDisable('#select_test',false);
     scanner.toggleButtonDisable('#stop_test',false);
   });
 scanner.toggleButtonDisable('#start_test',false);
   $('#select_test').on('click',function(){
     scanner.selectItem();
     scanner.toggleButtonDisable('#start_test',true);
   });
   $('#scanModeOnOff_test').on('click',function(){
     scanner.toggleScanOnOff();
   });
   $('#scanModeOnOff_test').mouseenter(function(){ 
     $('#test').css('background-color','red');
      }).mouseleave(function(){ 
             $('#test').css('background-color','');
      });
      $('#changeScanSpeed_test').on('click',function(){ 
        scanner.setSpeedScan($('#scanSpeed_test').val());
      });
      $('#scanSpeed_test').keyup(function(){
         if (($(this).val().length>0 && !isNaN(parseInt($(this).val())))) {
           scanner.toggleButtonDisable('#changeScanSpeed_test',false);
         }else{
           scanner.toggleButtonDisable('#changeScanSpeed_test',true);
         }
      });
});

