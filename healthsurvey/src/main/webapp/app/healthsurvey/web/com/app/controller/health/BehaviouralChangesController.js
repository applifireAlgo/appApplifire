Ext.define('Healthsurvey.healthsurvey.web.com.app.controller.health.BehaviouralChangesController', {
     extend: 'Healthsurvey.view.fw.frameworkController.FrameworkViewController',
     alias: 'controller.BehaviouralChangesController',
     onSubmitclick: function(me, e, eOpts) {
          var jsonData = this.getData(this.view);
          var scope = this.getView();
          Ext.Ajax.request({
               url: 'secure/SurveyResultProcessingWS/process',
               method: 'POST',
               sender: scope,
               jsonData: jsonData,
               me: me,
               success: function(response, scope) {
                    responseData = Ext.JSON.decode(response.responseText);
                    Ext.Msg.alert('Server Response', responseData.response.message);
                    scope.sender.reset();
               },
               failure: function(response, scope) {
                    Ext.Msg.alert('Server Response', 'process failed');
               }
          }, scope);
     }
});