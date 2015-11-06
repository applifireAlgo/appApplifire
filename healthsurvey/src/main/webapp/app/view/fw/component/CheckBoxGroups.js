Ext.define('Healthsurvey.view.fw.component.CheckBoxGroups', {
    extend:'Ext.form.CheckboxGroup',
    xtype : 'checkboxsgroups',
    
    getValues : function(){
    	var value = this.getValue();
    	if(this.bindable && value[this.bindable])
    		return value[this.bindable];
    	return value ;
    },
	/*
	getValue : function(){
		return this.getValues();
	}*/
})
