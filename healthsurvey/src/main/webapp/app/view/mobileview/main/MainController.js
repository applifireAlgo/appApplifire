/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Healthsurvey.view.mobileview.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.main',
    
    onMenuClick: function (item)
    {
    	var customObject = [];
    	customObject.push(item.menuid);
    	customObject.push("");
    	var tabs = Ext.getCmp('appmainTabPanel');
    	tabs.controller.onRenderTab(customObject);
    },
    
    onSearchClick: function (item)
    {
    	var searchTerm = this.view.down('#searchItemId').value;
    	var customObject = [];
    	customObject.push(item.menuid);
    	customObject.push(searchTerm);
    	var tabs = Ext.getCmp('appmainTabPanel');
    	tabs.controller.onRenderTab(customObject);
    }
    
});
