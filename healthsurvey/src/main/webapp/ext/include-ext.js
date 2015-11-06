
debugger;

/*l*/

/**
 * This file includes the required ext-all js and css files based upon "theme" and "rtl"
 * url parameters.  It first searches for these parameters on the page url, and if they
 * are not found there, it looks for them on the script tag src query string.
 * For example, to include the neptune flavor of ext from an index page in a subdirectory
 * of extjs/examples/:
 * <script type="text/javascript" src="../../examples/shared/include-ext.js?theme=neptune"></script>
 */
(function() {
	debugger;
    function getQueryParam(name) {
        var regex = RegExp('[?&]' + name + '=([^&]*)');

        var match = regex.exec(location.search) || regex.exec(path);
        return match && decodeURIComponent(match[1]);
    }

    function hasOption(opt, queryString) {
    	debugger;
        var s = queryString || location.search;
        var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
        var m = re.exec(s);

        return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
    }

    function getCookieValue(name){
    	debugger;
        var cookies = document.cookie.split('; '),
            i = cookies.length,
            cookie, value;

        while(i--) {
        	debugger;
           cookie = cookies[i].split('=');
           if (cookie[0] === name) {
               value = cookie[1];
           }
        }

        return value;
    }

    var scriptEls = document.getElementsByTagName('script'),
        path = scriptEls[scriptEls.length - 1].src,
        rtl = getQueryParam('rtl'),
        theme = getQueryParam('theme') || 'crisp',
        includeCSS = !hasOption('nocss', path),
        hasOverrides = !hasOption('nooverrides', path) && !!{
            // TODO: remove neptune
            neptune: 1,
            classic: 1,
            gray: 1,
            'neptune-touch': 1,
            crisp: 1,
            'crisp-touch': 1
        }[theme],
        repoDevMode = getCookieValue('ExtRepoDevMode'),
        packagePath,
        themePath,
        i = 3,
        overridePath;

    rtl = rtl && rtl.toString() === 'true';

    while (i--) {
    	debugger;
        path = path.substring(0, path.lastIndexOf('/'));
    }
    // path == root of ext
        
    theme = 'ext-theme-' + theme;
    //ss packagePath = path + '/packages/' + theme + '/build/';
   //ss packagePath = path + 'ext/packages/' + theme + '/build/';
    packagePath = 'ext/packages/' + theme + '/build/';
    themePath = packagePath + 'resources/' + theme + (rtl ? '-all-rtl' : '-all');
debugger;
    if (includeCSS) {
    	debugger;
        document.write('<link rel="stylesheet" type="text/css" href="' + themePath + '-debug.css"/>');
    }
//run
   // document.write('<script type="text/javascript" src="' + path + '/ext-all' + (rtl ? '-rtl' : '') + '.js"></script>');

  //  document.write('<script type="text/javascript" src="'+'ext/ext-all' + (rtl ? '-rtl' : '') + '.js"></script>');
    
   
    
    
    if (hasOverrides) {
    	debugger;
        // since document.write('<script>') does not block execution in IE, we need to 
        // makes sure we prevent ext-theme-neptune.js from executing before ext-all.js
        // normally this can be done using the defer attribute on the script tag, however
        // this method does not work in IE when in repoDevMode.  It seems the reason for
        // this is because in repoDevMode ext-all.js is simply a script that loads other
        // scripts and so Ext is still undefined when the neptune overrides are executed.
        // To work around this we use the _beforereadyhandler hook to load the neptune
        // overrides dynamically after Ext has been defined.
        overridePath = packagePath + theme + (repoDevMode ? '-debug' : '') + '.js';

        if (repoDevMode &&  window.ActiveXObject) {
        	debugger;
            Ext = {
                _beforereadyhandler: function() {
                    Ext.Loader.loadScript({ url: overridePath });
                }
            };
        } else {
        	debugger;
            document.write('<script type="text/javascript" src="' + overridePath + '" defer></script>');
        }
    }

})();
