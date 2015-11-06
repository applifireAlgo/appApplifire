Ext.define('Healthsurvey.view.main.TopPanel.TopPanelController', {
	extend : 'Ext.app.ViewController',

	requires : [ 'Ext.MessageBox' ],

	alias : 'controller.topPanelController',

	init : function() {
		this.control({
			'container button[action=menuBtnToggle]' : {
				toggle : this.onButtonPress
			}
		});
		this.callParent();
	},

	onButtonPress : function(button, pressed) {
		debugger;
		var westPanel = this.getView().up().up().down('#westPanel');
		if (!pressed) {
			debugger;
			//westPanel.responsiveConfig.tall.region="center";
			westPanel.show();
		} else {
			debugger;
			westPanel.hide();
		}

	},
	onSearchClick : function(button) {

		//	"Healthsurvey.view.scheduler.scheduler"
		var component = Ext.create(
				"Healthsurvey.view.searchengine.search.SearchEngineMainPanel", {
					closable : true,
					title : "Search Engine",
					refId : "-1"
				});

		var tabs = Ext.getCmp('appMainTabPanel');
		;
		var tab = tabs.add({
			xtype : component,
			title : "Search Engine"
		});
		tabs.setActiveTab(tab);
	},
	onCloudClick : function(button)
	{
		var component = Ext.create(
				"Healthsurvey.view.clouddrive.CloudDrive", {
					closable : true,
					title : "Cloud Drive",
					//refId : "-1"
				});

		var tabs = Ext.getCmp('appMainTabPanel');
		;
		var tab = tabs.add({
			xtype : component,
			title : "Cloud Drive"
		});
		tabs.setActiveTab(tab);
	},
	onLogoutClick : function() {
		Ext.Ajax.request({
			url : "secure/Logout",
			method : 'POST',
			jsonData : {},
			success : function(response, scope) {
				debugger;
				var jsonRespone = Ext.JSON.decode(response.responseText);
				if (jsonRespone.response.success == "true") {
					this.location.reload();
				} else {
					Ext.Msg
							.alert('Logout failed',
									jsonRespone.response.message);
				}
			},
			failure : function() {
				Ext.Msg.alert('Error', 'Cannot connect to server');
			}
		});
	}
});
