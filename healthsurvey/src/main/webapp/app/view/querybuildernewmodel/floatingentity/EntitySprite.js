Ext.define('Healthsurvey.view.querybuildernewmodel.floatingentity.EntitySprite',{
    extend: 'Ext.draw.Sprite',//Ext.draw.sprite.Rect
    xtype:'entitysprite',
    alias: ['widget.entitysprite'],
    bConnections: false,
    type: 'rect',
    draggable: true,
    height : 190,
	width : 210,
    currPosition:[10,10],
    x: 10,
    y: 10,
    attr:{},
    show:true,
    fillStyle: 'yellow',
    //surface:{},
});