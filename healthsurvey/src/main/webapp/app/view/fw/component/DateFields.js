Ext.define('Healthsurvey.view.fw.component.DateFields',{
	extend:'Ext.form.Date',
	xtype:'datefields',
	
	getValue:function()
	{
		if(this.value)
			return this.value.getTime();
	}
});