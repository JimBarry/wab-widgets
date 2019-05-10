define(['dojo/_base/declare', 
'dojo/_base/html', 
'jimu/BaseWidget', 
"esri/geometry/Point", 
"esri/geometry/Polyline",
"esri/geometry/Polygon",
"esri/symbols/SimpleMarkerSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"esri/Color",
"esri/graphic",
"esri/layers/GraphicsLayer"
],
function(declare, html, BaseWidget, Point, Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, GraphicsLayer) {

  return declare([BaseWidget], {

    baseClass: 'jimu-widget-mouseevents',

    postCreate: function() {
      this.inherited(arguments);

      // create a new graphics layer, then add it to the map
      this.gLayer = new GraphicsLayer();
      this.map.addLayer(this.gLayer);
      
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);

      console.log('startup');
    },

    onOpen: function(){
      
      // create graphics, add to the graphics layer, then listen to mouse events
      this._createGraphics();
      this._enableMouseEvents();

      console.log('onOpen');
    },

    _createGraphics: function(){

      var colRed = new Color([255,0,0,0.5]);

      // create shapes
      var pt1 = new Point({
        x: -74.01, y: 40.74
      });
      var pl1 = new Polyline({
        paths: [[[-74.01,40.66], [-73.96,40.74], [-73.99,40.81]]]
      });
      var pg1 = new Polygon({
        rings: [[[-73.94,40.66], [-73.92,40.81], [-73.89,40.74], [-73.94,40.66]]] 
      });

      // create symbols (style property works best with "set~" method)
      var sms = new SimpleMarkerSymbol({size: 12, color: colRed});
      sms.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);

      var sls = new SimpleLineSymbol({width: 4, color: colRed});
      sls.setStyle(SimpleLineSymbol.STYLE_SOLID);
      
      var sfs = new SimpleFillSymbol({outline: sls, color: colRed});
      sfs.setStyle(SimpleFillSymbol.STYLE_SOLID);

      // create graphics
      var gpt = new Graphic(); 
      gpt.setGeometry(pt1);
      gpt.setSymbol(sms);
      var gpl = new Graphic();
      gpl.setGeometry(pl1);
      gpl.setSymbol(sls);
      var gpg = new Graphic();
      gpg.setGeometry(pg1);
      gpg.setSymbol(sfs);

      // add graphics to the map
      this.gLayer.add(gpt);
      this.gLayer.add(gpl);
      this.gLayer.add(gpg); 

      console.log('_createGraphics() num: ' + this.gLayer.graphics.length);  
    },

    _enableMouseEvents: function(){

      // enable mouse events  
      this.gLayer.enableMouseEvents();
      // create mouse event listeners - OPEN AND WATCH THE CONSOLE
      this.gLayer.on("mouse-down", function(){console.log('mouse-down on a graphic');});
      this.gLayer.on("mouse-up",   function(){console.log('mouse-up on a graphic');});
      this.gLayer.on("mouse-over", function(){console.log('mouse-over on a graphic');});  
      this.gLayer.on("mouse-out",  function(){console.log('mouse-out on a graphic');});  

      console.log('_enableMouseEvents() called');
    }, 

    onClose: function(){

      // disable mouse events, then clear the graphics layer
      this.gLayer.disableMouseEvents();
      this.gLayer.clear();

      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    }

  });
});