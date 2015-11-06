Ext.define('Healthsurvey.view.querybuildernewmodel.floatingentity.FloatingEntity', {
	extend : 'Ext.window.Window',
	requires:['Healthsurvey.view.querybuildernewmodel.floatingentity.FloatingEntityController',
	          ],
	controller:'floating-entity',
	xtype : 'floating-entity',
	extend : 'Ext.window.Window',
	entConfig:null,
	cascadeOnFirstShow : 20,
	startpoint:null,
	bMouseDown:false,
	height : 180,
	width : 160,
	connectionUUIDs:[],
	bodyPadding:'5 0 5 0',
	shadowSprite : {},
	layout : {
		type : 'fit'
	},
	x:10,
	y:10,
	closable : false,
	 header: {
	        titlePosition: 0},
	tools:[
	    ],
	listeners: {
		scope:'controller',
        show: 'initFloatingEntity',
        move :'onMouseMove',
     //   close:'closeFloatingEntity',
    //    beforeclose:'onBeforeClose'
    }
});