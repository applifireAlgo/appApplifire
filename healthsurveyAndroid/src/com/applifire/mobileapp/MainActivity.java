package com.applifire.mobileapp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {
private WebView webView = null;
	@SuppressLint("SetJavaScriptEnabled")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		webView = (WebView) findViewById(R.id.webView1);
		webView.setWebViewClient(new MyWebViewClient());
		webView.getSettings().setJavaScriptEnabled(true);
		webView.loadUrl(getResources().getString(R.string.app_url));	
	}

	private class MyWebViewClient extends WebViewClient {
		 final ProgressDialog pd = ProgressDialog.show(MainActivity.this, "", "Loading...", true);

	    @Override
	    public boolean shouldOverrideUrlLoading(WebView view, String url) {
	        view.loadUrl(url);
	        return false;
	    }

		@Override
		public void onPageStarted(WebView view, String url, Bitmap favicon) {
			// TODO Auto-generated method stub
			super.onPageStarted(view, url, favicon);
			pd.show();
			
		}

		@Override
		public void onPageFinished(WebView view, String url) {
			// TODO Auto-generated method stub
			super.onPageFinished(view, url);
			pd.hide();
		}

		@Override
		public void onReceivedError(WebView view, int errorCode,
				String description, String failingUrl) {
			// TODO Auto-generated method stub
			pd.hide();
			super.onReceivedError(view, errorCode, description, failingUrl);
			 Toast.makeText(MainActivity.this, "Could not load application!", Toast.LENGTH_SHORT).show();
		}
	    
	}
}
