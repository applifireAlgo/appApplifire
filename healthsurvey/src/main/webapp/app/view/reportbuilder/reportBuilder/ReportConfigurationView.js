Ext.define('Healthsurvey.view.reportbuilder.reportBuilder.ReportConfigurationView', {
	extend : 'Ext.panel.Panel',
	requires: ['Healthsurvey.view.reportbuilder.querycriteria.QueryCriteriaView',
	           'Healthsurvey.view.reportbuilder.gridconfig.GridConfigView',
	           'Healthsurvey.view.reportbuilder.properties.PropertiesPanelView',
	           'Healthsurvey.view.reportbuilder.sql.SqlListPanelView'],
    xtype:'report-config',
   	layout:'border', 
   	items:[
   	       {
   	    	   region:'west',
   	    	   xtype:'sql-panel'
   	       },
   	       {
   	    	   region:'center',
   	    	   xtype:'panel',
   	    	   itemId:'center-config',
   	    	   layout: {
   	    		   type: 'vbox',
   	    		   align : 'stretch',
   	    	   },
   	    	   items:[
   	    	          {
					 	  title:'Step 1: Grid Configuration',
					 	  xtype:'grid-config-view',
					 	  flex:0.5
   	    	          },
   	    	          {
   	    	        	  title:'Step 2: Query Criteria',
   	    	        	  xtype:'query-criteria-view',
   	    	        	  flex:0.5
   	    	          }],
   	    	   tbar: [
  		        	   {
  		        	       xtype:'textfield',
  		        	       fieldLabel:'Report Name ',
  		        	       itemId:'topReportNameField',
  		        	       value:'New Report',
  		        	       readOnly:true
  		        	   },
  		        	   '->',
  		        	   {
  							xtype:'button',
  							//margin:'10 20 0 40',
  							text:'Edit Report Info',
  							icon:'images/edit.png',
  							tooltip:'Edit Report Information',
  							listeners:{
  								click:'onEditReportInfoClick'
  							} 
  		        	   }
  		       ] 
   	       },
   	       {
   	    	   region:'east',
   	    	   xtype:'property-panel',
   	    	   title:'Properties'
   	       }
   	],
   	buttons:[{
		        text:'Save',
		        icon:'images/greenFlopy_save.png',
		        listeners:{
		        	click:'onSaveReportClick'
		         }
		     },
		     {
			    text:'Delete',
			    icon:'images/trash.png',
			    listeners:{
			       click:'onDeleteReportClick'
			    }
			  },]
});