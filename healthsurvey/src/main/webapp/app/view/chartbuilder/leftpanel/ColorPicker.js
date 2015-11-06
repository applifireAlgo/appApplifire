Ext.define('Healthsurvey.view.chartbuilder.leftpanel.ColorPicker', {
	extend: 'Ext.form.field.Picker',
    alias: 'widget.vdColorPicker',
    editable: false,
    hideTrigger: false,
    pickerOffset: [ 0, 0],
    createPicker: function() {
        var me = this;
        colorPicker = Ext.create('Ext.picker.Color', {
            constrain :true,
            floating:true,
            allowReselect : true,
            shadow :true,
            shrinkWrap:3,
            //colors:["DCDCDC","D3D3D3"	,"C0C0C0","A9A9A9","808080","696969","778899","708090","32F4F4F","000000","800000","D2B48C","BC8F8F"	,"F4A460","DAA520","B8860B","CD853F","D2691E","8B4513","A0522D","00CED1","5F9EA0","4682B4","B0C4DE","1E90FF","6495ED","7B68EE","4169E1","0000FF","0000CD","00008B","000080","191970","8B008B","800080","4B0082","6A5ACD","FFD700","FFFF00","FFFFE0","FFFACD","FFE4B5","FFDAB9","EEE8AA","F0E68C"],
            cusomEditor : me,
            draggable  :true,
            listeners:{
            	select :function(picker	, selColor){
                    var me = this;
                    calledBY = me.cusomEditor.up().up();
                    
                    me.cusomEditor.setValue('#'+selColor);
                    me.hide();
            	}
            }
        });
        
        return colorPicker;
    }
});