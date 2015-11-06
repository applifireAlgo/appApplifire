/**
 * An explorer component for navigating hierarchical content.  Consists of a breadcrumb bar
 * at the top, tree navigation on the left, and a center panel which displays the contents
 * of a given node.
 */
Ext.define('Ext.ux.Img', {
    extend : 'Ext.Img',
    xtype  : 'ux-img',

    onRender : function() {
        this.callParent(arguments);

        this.imgEl.on('click', this.onClick, this);
    },

    onClick : function(e, t) {
        this.fireEvent('click', this, e, t);
    }
});