Ext.define('Healthsurvey.view.reportui.ModifiedProxy', {
	extend : 'Ext.data.proxy.Ajax',
	alias : 'proxy.modifiedproxy',

	defaultParams : 'param',
	removeDefaultParams : true,

	buildRequest : function(operation) {
		var me = this, request, defaultParams = me.getParams(operation);

		me.extraParams = me.extraParams || {};
		if (me.defaultParams && defaultParams) {
			Ext.Object.merge(me.extraParams,defaultParams);
		//	me.extraParams[me.defaultParams] = me.applyEncoding(defaultParams);
		}

		var params = operation.params = Ext.apply({}, operation.params,
				me.extraParams);
		if (me.removeDefaultParams != true) {
			Ext.applyIf(params, defaultParams);
		}

		request = new Ext.data.Request({
			params : JSON.stringify(me.extraParams),
			gridParams : params,
			action : operation.action,
			records : operation.records,
			operation : operation,
			url : this.url,
			proxy : me
		});
		request.url = me.buildUrl(request);
		operation.request = request;

		return request;
	}
});