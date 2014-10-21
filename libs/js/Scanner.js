function Scanner(){
  var _thisObj = this;
  var _maxRows=null,_maxCols=null,_selRow=null,_selCol=null,_currentIndex=0;
  var _element=null;
  var _elemRaw=null;
  this.scanSpeed=600;
  this.selectColor='blue',this.deselectColor='';
  this.controllerDivStyle ='background-color: yellow; width: 200px;';
  this.controlBarStyle = 'background-color:yellow;';
  this.actions=[[]];
  var _timer = 0;
  /*
   *
   *@return mixed
   */
  _thisObj.init= function(elem){
    _element = elem;
    console.log("scanner init: "+_element+"\n");  
    _setMaxRows(elem);
    if (_maxRows!=null) {
      _elemRaw =_element.substr(1,_element.length); //Remove # of _element
       console.log(_currentIndex);
       console.log(_maxRows);
    }else   {
      console.error(_element+" selector doesn't exist\n"); 
      return 1;
    }
  }//init

  /* Start timer for scanning rows or columns in table.
   *@para type: row/col, 
   *@para time: Scan cycles in ms
   *@return mixed
   */
  _thisObj.startTimer= function(type,time){
    console.log("_element "+_element);//TODO good
    _timer = setInterval(function(){_startScanItems(type);},time);
  }//startTimer

  /*
   *
   *@return mixed
  *TODO ADD type arg to reset var correctly
  * */
  _thisObj.stopTimer= function(type){
    _resetColor();
    console.log("_currentIndex: "+_currentIndex+" _thisObj._timer: "+_timer);
    _timer=clearInterval(_timer);
    console.log("Timer stop");
    _timer=0;
     console.log("_currentIndex: "+_currentIndex+" _thisObj._timer: "+_timer);
    //Reset counters
    if (type==='row') {
      _currentIndex = 0;
      _selCol=null;    
    
    }else if(type==='col'){
      _selRow=null;
      _currentIndex = 0; 
    }else{
      _selRow=null;
      _selCol=null;
      _currentIndex = 0; 
    }    
  }//stopTimer
/*
   *
   *@return mixed
  */

  _thisObj.getElem = function(){
    return _element;
  }  //getElem
  /*
   *
   *@return mixed
  */

  _thisObj.getSelCol = function(){
    if (_selCol!=null) {
      return _selCol;
    }
  }  //getSelCol
  /*
   *
   *@return mixed
  */

  _thisObj.getSelRow = function(){
    if (_selRow!=null) {
      return _selRow;
    }
  }  //getSelRow
  var _setMaxRows= function(elem){//private function
    try {
      if ($(elem).length) {
        _maxRows = $(elem).find('tr').length;
        return _maxRows;
      }
      if (_maxRows===null) {
        console.log(elem+" selector doesn't exist\n"); 
      }
    } 
    catch(e){
      console.error(e.name + "\n" + e.message);           /* handle error */
    }
  } //_setMaxRows

  /*
   *
   *@return void
   */
  var _scanItem = function(type) {
    if (type==='row') {
    var row = $(_element +' tr');
    }else if(type==='col'){
      var row = $(_element +' tr:eq('+_selRow+') td');  
    }else{}    
    
    console.log(_currentIndex+"  "+_maxRows); 
    row.eq(_currentIndex).css('background', _thisObj.selectColor);
    // Unselect last item when loop is done
    if (_currentIndex===0) {
      row.eq(_maxRows-1).css('background', _thisObj.deselectColor);
    }
    if (_currentIndex>0) {
      row.eq(_currentIndex-1).css('background', _thisObj.deselectColor);
    }
  }//_scanItem

  /*
   *
   *@return void
   */
  var _startScanItems = function(type){
    console.log("_element "+_element);//TODO, false. _element is wrong by scanning #navBoardItems
    _scanItem(type);
    if (type==="row") {
     var maxItems=_maxRows; 
    } else if (type==="col") {
              var maxItems=_maxCols; 
    }
    // Reset to create loop effect
    if (_currentIndex===maxItems) {
      _currentIndex=0;
    }else{
      _currentIndex++;
    }
  }//_startScanItems

  /*
   *
   *@return void
   */
  var _resetColor = function(){
    $(_element +' td').css('background',_thisObj.deselectColor);
    $(_element +' tr').css('background',_thisObj.deselectColor);
  }//_resetColor

  var _setMaxCols = function (rowIndex){
    _maxCols = $(_element +' tr:eq('+rowIndex+') td').length; 
    return _maxCols;
  }//_setMaxCols

  /*
   *
   *@return void
   */
  _thisObj.selectItem = function(){
    //Checks what it scans
    // Scans columns
    if (_selRow===null) {
      _selRow = _currentIndex-1;//Timer finish whole block before it stops
      _thisObj.stopTimer("row");
      _setMaxCols(_selRow);
      console.log("_maxCols " +_maxCols);
      _thisObj.startTimer('col',_thisObj.scanSpeed);
    }
    // Reset all, execute item cmd
    // Restart scanning rows

    else {
      _selCol = _currentIndex -1;
      // console.log(_getCmd());
      _getCmd();
      _thisObj.stopTimer("col");
      console.log("_selCol "+ _selCol);
     // _thisObj.startTimer('row',_thisObj.scanSpeed);
    }
  }//_selectItem

  /*
   * Pre: actions needs to be defined by user (see init.js for example
   *@return void
   */
 var _getCmd = function() {
    if (_selRow===null||_selCol===null) {
      console.error("_selRow or _selCol null");
      return false;
    }
    if(typeof actions != "undefined" && actions != null && actions.length > 0){
      console.log("_getCmd");
      /*TODO Check if actions item is a function*/
      _thisObj.actions[_selRow][_selCol].call();
    }
    else     {
      console.error("Actions not defined.");
    }
 }//_getCmd


 /*
  *@return void
  *@POST: if controlBarStyle is already set by an other the style won't changed
  */
 _thisObj.setControlBar = function(){
   if (_elemRaw===null) {
     console.error("_elemRaw is null");
     return false;

   }
   var controlBar=$('#controlBar');
   //Checks if controlBar already exists
   if (controlBar.length===0) {
     var mPanel ='<div id="controlBar" style="'+_thisObj.controlBarStyle+'" >';
     mPanel +='<a id="scanModeOnOff_'+_elemRaw+'" title="'+_elemRaw+'" href="#" >Scan mode off</a>';
     mPanel +='</div>';

     //Set control bar at top of page
     $(document.body).children().first().before(mPanel);
   }else {
     var mPanel =' <a id="scanModeOnOff_'+_elemRaw+'" title="'+_elemRaw+'" href="#" >Scan mode off</a>';
     controlBar.append(mPanel);
   }
 } //setControlBar

 /*
  * Style of controllerDiv can be changed
  *@return void
  */
 _thisObj.setScanPanel = function(){
   if (_elemRaw===null) {
     console.error("_elemRaw is null");
     return false;

   }
   
  var panel =
      '<div id="controllerDiv_'+_elemRaw+'" style="'+_thisObj.controllerDivStyle+'">';
    panel += 'scan NxM</br >  ';
    panel += '<input type="button" value="start" name="" id="start_'+_elemRaw+'" title="Start scanning items."/>';
    panel += '<input type="button" value="stop" name="" id="stop_'+_elemRaw+'" disabled="true"/> ';
    panel += '<input type="button" value="select" name="" id="select_'+_elemRaw+'" />';
    panel += '</br>';
    panel += '<font size="0.4px">Scan Speed:</font>   <input type="text" title="Set scan speed in ms." id="scanSpeed_'+_elemRaw+'" name="scanSpeed" value="600" style="width:60px;">';
    panel += '<input type="button" name="btnChangeSpeed" value="Change" id="changeScanSpeed_'+_elemRaw+'" disabled="true" >';

        //Sets control panel after _element
    $(_element).after(panel);
    // Disable select, stop button    
    _thisObj.toggleButtonDisable('#stop_'+_elemRaw,true);
    _thisObj.toggleButtonDisable('#select_'+_elemRaw,true);
    return panel;
  }//setScanPanel

  /*
   *
   */
  _thisObj.setSpeedScan = function(speed){
    speed = parseInt(speed);
    _thisObj.scanSpeed = speed;
    console.log("Scan speed set to: "+_thisObj.scanSpeed);
  }//setScanPanel
  
  /*
   *
   */
  _thisObj.toggleScanOnOff = function(){
     var sMOO = $('#scanModeOnOff_'+_elemRaw);
     var valA = sMOO.text();
     if (valA == 'Scan mode on') {
       sMOO.text("Scan mode off");
       $('#controllerDiv_'+_elemRaw).show();
     }
     if (valA == 'Scan mode off') {
       sMOO.text("Scan mode on");
       $('#controllerDiv_'+_elemRaw).hide();
     }

  }//_toggleScanOnOff


  /*
   *
   */
  _thisObj.toggleButtonDisable = function(elem, toState){
    if (typeof toState === "boolean"){
      $(elem).prop('disabled',toState);
    }else{
      return false;
    }
   }//toggleButtonDisable
}
