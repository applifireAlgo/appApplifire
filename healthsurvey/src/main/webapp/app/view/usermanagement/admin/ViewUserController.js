Ext.define('Healthsurvey.view.usermanagement.admin.ViewUserController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.viewUserController',
	requires:['Healthsurvey.view.usermanagement.admin.UserForm'],
	commTypeAllData:null,
	cityData:null,
	stateData:null,
	
	onUserTreeLoad:function(currentObject, records, successful, operation, node, eOpts )
    {
		debugger;
        var tempView = this.getView();
        Ext.Ajax.request(
    	{
    		url : "secure/Login/findAll",
    		method : 'GET',
    		jsonData : {},
    		currentView:tempView,
    		success : function(response, currentObject,options) 
    		{
    			debugger;
    			var jsonResponse = Ext.JSON.decode(response.responseText);
    			if(jsonResponse.response.success==true)
            	{
					var data = jsonResponse.response.data;
					var tree =currentObject.currentView.down('#usersTreeId');
					var rootNode = tree.getRootNode();
					rootNode.removeAll();
					for (var i = 0; i < data.length; i++)
					{
						var childNode = {
								text : data[i].coreContacts.firstName,
								userId:data[i].userId,
								versionId:data[i].versionId,
								leaf : true,
								icon : 'images/user/roles.png'
						};
						rootNode.appendChild(childNode);
					}
					tree.getStore().sort('text', 'ASC');
            	}else{
            		Ext.Msg.alert('Error', 'Data Load Failed!');
            	}
    		},
    		failure : function() {
    			debugger;
    			Ext.Msg.alert('Error', 'Cannot connect to server!');
    		}
    	});
    },//onUserTreeLoad ends
    
    onUserListClick:function(item, record, item, index, e, eOpts)
    {
    	debugger;
    	var me=this;
    	var currentView=this.getView();
    	this.userId=record.data.userId;
    	Ext.Ajax.request({
    	    url : "secure/Login/findByUserId",
    	    method : 'POST',
    	    me:me,
    	    currentView:currentView,
    	    jsonData :{
        			findKey:record.data.userId
    	    },
    	    success : function(response, currentObject,options) 
    	    {
    	    	debugger;
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    	    	if(jsonResponse.response.success==true)
            	{
	    			var data = jsonResponse.response.data;
	    			var userDetaisPanel=currentObject.currentView.down('#userDetailsPanel');
	    			userDetaisPanel.removeAll();
	    			userDetaisPanel.add({xtype:'userForm'});
	    			var form=currentObject.me.getView().down('#userForm');
	    			
	    			currentObject.me.loadTitleCombo(form.down('#titleId'),data[0].coreContacts.titleId);
	    			currentObject.me.loadTitleCombo(form.down('#nativeTitle'),data[0].coreContacts.nativeTitle);
	    			currentObject.me.loadNativeLangCombo(form.down('#nativeLangCombo'),data[0].coreContacts.nativeLanguageCode);
	    			
	    			form.getViewModel().setData(data[0]);
	    			
	    			if(data[0].coreContacts.genderId!=null)
	    			{
	    				form.down('#genderId').query("[inputValue="+data[0].coreContacts.genderId+"]")[0].setValue(true);
	    			}
	    			if(data[0].coreContacts.dateofbirth!=null){
	    				form.down('#dateofbirth').setValue(new Date(data[0].coreContacts.dateofbirth));
	    			}
	    			if(data[0].coreContacts.approximateDOB != null) {
	    				form.down('#approximateDOB').setValue(new Date(data[0].coreContacts.approximateDOB));
	    			}
	    			
	    			currentObject.currentView.down('#commGrid').getStore().loadData(data[0].coreContacts.communicationData);
	    			currentObject.currentView.down('#addrGrid').getStore().loadData(data[0].coreContacts.address);
	    			
	    			currentObject.me.makeFormReadOnly(form);
            	}else{
            		Ext.Msg.alert('Error', 'Data Loading failed!');
            	}		
    	    },
    	    failure : function() {
    	    	Ext.Msg.alert('Error', 'Cannot connect to server!');
    	    }
    	});   	
    },// onUserListClick ends
    
    makeFormReadOnly:function(form)
    {
    	form.getForm().getFields().each (function (field) {
    		field.setReadOnly (true); 
    		});
    },
    loadTitleCombo:function(combo,titleId)
	{
		Ext.Ajax.request({
    	    		url : "secure/Title/findAll",
    	    		method : 'GET',
    	    		combo:combo,
    	    		titleId:titleId,
    	    		jsonData:{},
    	    		success : function(response, currentObject,options) 
    	    		{
    	    			debugger;
    	    			var jsonResponse = Ext.JSON.decode(response.responseText);
    					var data = jsonResponse.response.data;
    	    			currentObject.combo.getStore().loadData(data);
    	    			currentObject.combo.setValue(currentObject.titleId);	
    	    		},
    	    		failure : function() 
    	    		{
    	    			Ext.Msg.alert('Error', 'Cannot connect to server');
    	    		}
    	    	});
	},
	loadNativeLangCombo:function(combo,value)
	{
		Ext.Ajax.request({
					url : "secure/Language/findAll",
    	    		method : 'GET',
    	    		combo:combo,
    	    		value:value,
    	    		jsonData:{},
    	    		success : function(response, currentObject,options) 
    	    		{
    	    			debugger;
    	    			var jsonResponse = Ext.JSON.decode(response.responseText);
    					var data = jsonResponse.response.data;
    	    			currentObject.combo.getStore().loadData(data);
    	    			currentObject.combo.setValue(currentObject.value);	
    	    		},
    	    		failure : function() 
    	    		{
    	    			Ext.Msg.alert('Error', 'Cannot connect to server');
    	    		}
    	    	});
	},
    
    onTriggerFieldChange : function(me) 
    {
		var tree = me.up().up();
		var v;
		try {
			v = new RegExp(me.getValue(), 'i');
			tree.store.filter({filterFn : function(node) {
							var children = node.childNodes, len = children
									&& children.length, visible = node
									.isLeaf() ? v.test(node
									.get('text')) : false, i;
							for (i = 0; i < len && !(visible = children[i].get('visible')); i++);
							return visible;
						},
						id : 'titleFilter'
					});
		} catch (e) {
			me.markInvalid('Invalid regular expression');
		}
	},//onTriggerFieldChange ends

	commGroupColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		var addUserController=this.getView().up().down('#addUserDetails').controller;
		var matchRec = addUserController.commGroupComboStore.findRecord('commGroupId',value);
		return matchRec.data.commGroupName;
	},
	commTypeColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		for(var i=0;i<this.commTypeAllData.length;i++)
		{
			if(this.commTypeAllData[i].commType==value)
			{
				return this.commTypeAllData[i].commTypeName;
			}
		}
	},
	addrTypeColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		var addUserController=this.getView().up().down('#addUserDetails').controller;
		var matchRec = addUserController.addrTypeComboStore.findRecord('addressTypeId',value);
		return matchRec.data.addressType;
	},
	countryColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		var addUserController=this.getView().up().down('#addUserDetails').controller;
		var matchRec = addUserController.countryComboStore.findRecord('countryId',value);
		return matchRec.data.countryName;
	},
	cityColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		for(var i=0;i<this.cityData.length;i++)
		{
			if(this.cityData[i].cityId==value)
			{
				return this.cityData[i].cityName;
			}
		}
	},
	stateColRenderer:function(value , metaData ,record ,rowIndex, colIndex, store, view)
	{
		for(var i=0;i<this.stateData.length;i++)
		{
			if(this.stateData[i].stateId==value)
			{
				return this.stateData[i].stateName;
			}
		}
	},
	
	afterUserDetailPanelRender:function()
	{
		var me=this;
		Ext.Ajax.request({
    	    url : "secure/CommunicationType/findAll",
    	    method : 'GET',
    	    me:me,
    	    jsonData:{},
    	    success : function(response, currentObject,options) 
    	    {
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    	    	var data = jsonResponse.response.data;
    	    	currentObject.me.commTypeAllData=data;
    	    },
    	    failure : function() {
    	   			Ext.Msg.alert('Error', 'Cannot connect to server');
      		}
    	 });
		Ext.Ajax.request({
    	    url : "secure/State/findAll",
    	    method : 'GET',
    	    me:me,
    	    jsonData:{},
    	    success : function(response, currentObject,options) 
    	    {
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    	    	var data = jsonResponse.response.data;
    	    	currentObject.me.stateData=data;
    	    },
    	    failure : function() {
    	   			Ext.Msg.alert('Error', 'Cannot connect to server');
      		}
    	 });
		Ext.Ajax.request({
    	    url : "secure/City/findAll",
    	    method : 'GET',
    	    me:me,
    	    jsonData:{},
    	    success : function(response, currentObject,options) 
    	    {
    	    	var jsonResponse = Ext.JSON.decode(response.responseText);
    	    	var data = jsonResponse.response.data;
    	    	currentObject.me.cityData=data;
    	    },
    	    failure : function() {
    	   			Ext.Msg.alert('Error', 'Cannot connect to server');
      		}
    	 });
	}
	
});