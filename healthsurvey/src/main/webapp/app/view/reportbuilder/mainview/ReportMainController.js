Ext.define('Healthsurvey.view.reportbuilder.mainview.ReportMainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportMainController',
    window:null,
    init:function()
    {	
    	view=this.getView();
    	this.window=this.getWindow(view);
    },
    
    getWindow:function(view)
    {
    	return new Ext.Window({
    	    	   title: 'Create New Report', 
    	    	   bodyPadding:'7',
    	    	   layout:'vbox',
    	    	   view:view,
    	    	   width:'50%',
    	    	   modal:true,
    	    	   closeAction:'close',
    	    	   items:[{
    	    		   		xtype:'panel',
    	    		   		layout:'hbox',
    	    		   		width:'100%',
    	    		   		margin : "0 0 15 0",
    	    		   		items:[
    	    		   		       {
    	    		   		    	   xtype:'textfield',
    	    		   		    	   fieldLabel:'Report Name ',	
    	    		   		    	   itemId:'new-report-name',
    	    		   		    	   margin : "0 15 0 0",
    	    		   		    	   emptyText:'Enter Report Name' 	    		    		     	    		 
    	    		   		       },
    	    		   		       {
    	    		   		    	   xtype: 'radiogroup',
    	    		   		    	   fieldLabel:'Display Type',
    	    		   		    	   margin:'0,4,0,4',
    	    		   		    	   itemId:'displayRadioField',
    	    		   		    	   items: [
    	    		   		             { boxLabel: 'Tab', name: 'radio', inputValue: '0', checked: true },
    	    		   		             { boxLabel: 'Panel', name: 'radio', inputValue: '1'},
    	    		   		             ]
    	    		   		       }
    	    		   		 ]},
    	    		       {
    	     		       	  xtype: 'htmleditor',
    	     		       	  fieldLabel:'Synopsis',
    	     		       	  width:'100%',
    	     		       	  margin : "0 0 15 0",
    	     		       	  itemId : "txtSynopsis"
    	     		       },
    	     		       {			
    	     		       	  xtype: 'htmleditor',
    	     		       	  fieldLabel:'Help',
    	     		       	  width:'100%',
    	     		       	  margin : "0 0 15 0",
    	     		       	  itemId : "txtHelp"
    	     		       }],
    	     		buttons:[{
    	   		    		  text:'Save',
        		    		  itemId:'create-button',
   	    		    		  icon:'images/greenFlopy_save.png',
   	    		    		 // margin:'4,4,0,0',
   	    		    		  style:'float:right',
   	    		    		  listeners:{
   	    		    			  click:function(id,opt,event)
   	    		    			  {	    		    		 
    	    		    		   	 debugger;
    	    		    		   	 if(this.up().up().isEdit==false) //checking window is in new mode or edit mode
    	    		    	    	 {
    	    		    	    		 var newReportName=this.up().up().down('#new-report-name').value;
        	       	    		    	 var synopsis=this.up().up().down('#txtSynopsis').value;
        	       	    		    	 var help=this.up().up().down('#txtHelp').value;
        	       	    		    	 var displayType=this.up().up().down('#displayRadioField').getChecked()[0].inputValue;
        	    		    		   	 if(newReportName!="")
        	       		    		   	 {
        	       		    		   		debugger;     	       		    		    		
        	       		    	    		//var mainReportView=Ext.ComponentQuery.query('#mainReportBuilderView')[0];
        	       		    	    		var tabs= view.down("#reportsTabPanel");     		    		    			   
        	       		   		    		var tab=Ext.create('Healthsurvey.view.reportbuilder.reportBuilder.ReportBuilderView',
        	       		   		    		{
        	       		   		    			closable:true,
        	       		   		    			title:newReportName,
        	       		   		    			iconCls:'newTabIcon',
        	       		   		    			queryId:'',
        	       		   		    			jpqlQuery:'',
        	       		   		    			queryJson:''
        	       	    		    		});
        	       	    		    		tabs.add(tab);
        	     		   		    		tabs.setActiveTab(tab);
        	       		    		    		
        	       		   		    		var activeTab=tabs.getActiveTab(); //equivalent to var tab
        	       		
        	       		   		    		var reportNameField=activeTab.down("#topReportNameField");
        	       	    		    		reportNameField.setValue(newReportName);
        	       		    		    		
        	       	    		    		//Storing window data in activeTab global variable || tab{help:help}     	       		    				
        	     		    	    		activeTab.reportName=newReportName;
        	       		    	    		activeTab.synopsis=synopsis;
        	       		   		    		activeTab.help=help;
        	       		   		    		activeTab.displayType=displayType;
        	       		    		    		
        	       		   		    		if(newReportName!="")
    	       		    	    				this.up().up().down('#new-report-name').setValue('');  	       		    		    				
        	       	    		    		if(synopsis!="")
        	       	    		    			this.up().up().down('#txtSynopsis').setValue('');	
        	     		    	    		if(help!="")
        	       		    	    			this.up().up().down('#txtHelp').setValue('');
        	     		    	    		if(displayType!="")
        	     		    	    			this.up().up().down('#displayRadioField').reset();
        	       		    		    		
        	       		   		    		this.up().up().close();//window close 
        	       		   		    	}
        	       		   		    	else{
        	       		   		    			Ext.Msg.alert({title: 'Info',msg: "Please Enter Report Name",icon: Ext.MessageBox.INFO});
        	       	    		    	}
    	    	    		    	 }
    	    		    		   	 else{
	    	    		    		    	debugger;	    	    		    		    		
	    	    		    		    	var newReportName=this.up().up().down('#new-report-name').value;
	        	       		    	    	var synopsis=this.up().up().down('#txtSynopsis').value;
	        	       		    	    	var help=this.up().up().down('#txtHelp').value;
	        	       		    	    	var displayType=this.up().up().down('#displayRadioField').getChecked()[0].inputValue;
	        	       		    	    	
	        	       		   		    	var tabs=view.down("#reportsTabPanel"); 
	        	       		   		    	var activeTab=tabs.getActiveTab();
	        	       		    		    	
        	       		    	    		activeTab.reportName=newReportName;
        	       		   		    		activeTab.synopsis=synopsis;
        	       		   		    		activeTab.help=help;
        	       		   		    		activeTab.displayType=displayType;
	    	       		    		    		
	    	       		   		    		activeTab.setTitle(newReportName);
	    	       		   		    		activeTab.down("#topReportNameField").setValue(newReportName);
	    	       		    		    		
	    	       	    		    		if(newReportName!="")
		       	    		    				this.up().up().down('#new-report-name').setValue('');		
	    	      		    		   		if(synopsis!="")
	    	       		    	    			this.up().up().down('#txtSynopsis').setValue('');	
	    	       		    	    		if(help!="")
	    	       		   		    			this.up().up().down('#txtHelp').setValue('');
	    	       		    	    		if(displayType!="")
        	     		    	    			this.up().up().down('#displayRadioField').reset();
	    	       		   		    		
	    	       		   		    		this.up().up().close();//window close 	       		    		    		
    	    		    		    }	       		    		    	 
    	    		    	 }//click ends
   	    		    	}//listeners ends
    	    		},{
	    		    	  text:'Cancel',
	    		   		  icon:'images/delete_icon.png',
	    		   		 // margin:'4,4,0,4',
	    		    	  style:'float:right',
	    		    	  listeners:{
	    		   		     click:function(id,opt,event)
	    		   		     {   
	    		   		    	 debugger;
    	    	    		    var newReportName=this.up().up().down('#new-report-name').value;
    	       	    		    var synopsis=this.up().up().down('#txtSynopsis').value;
    	   		    		    var help=this.up().up().down('#txtHelp').value;
    	   		    		    var displayType=this.up().up().down('#displayRadioField').getChecked()[0].inputValue;
    	       		    		    	 
    	   		    		    if(newReportName!="")
	   		    		    		this.up().up().down('#new-report-name').setValue('');		
 	      		    	    	if(synopsis!="")
 	       		   		    		this.up().up().down('#txtSynopsis').setValue('');	
 	       		   		    	if(help!="")
 	       		   		    		this.up().up().down('#txtHelp').setValue('');
 	       		   		    	if(displayType!="")
 	       		   		    		this.up().up().down('#displayRadioField').reset();
 	       		    		    		
	    		   		    	this.up().up().close();//window close   		 
	    	    		    }//click ends
	    	    		 }//listeners ends
	   		          }] 
    	       	});  
    	;
    }//getWindow ends
});