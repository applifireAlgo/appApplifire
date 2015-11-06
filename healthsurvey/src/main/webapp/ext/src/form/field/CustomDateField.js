Ext.define('Ext.form.field.CustomDateField', {
	extend : 'Ext.form.field.Date',
	xtype : "customDateField",
	
	getSubmitValue : function(){
		var date = new Date(this.value);
		return date.valueOf();
	}
});