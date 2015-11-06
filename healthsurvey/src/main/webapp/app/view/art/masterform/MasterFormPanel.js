Ext.define('Healthsurvey.view.art.masterform.MasterFormPanel',
{
	extend :'Ext.form.Panel',
	xtype: 'masterFormPanel',
	itemId : 'masterFormPanel',
	
	requires: ['Healthsurvey.view.art.masterform.MasterFormModel','Healthsurvey.view.art.masterform.MasterFormViewModel','Healthsurvey.view.art.masterform.MasterFormPanelController'],

	//viewModel: 'masterFormViewModel',
	
	controller: 'masterFormPanelController'

});
	