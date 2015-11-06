package com.app.app.config;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Component;
import com.athena.config.appsetUp.model.AppConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class StartSchedulerApp {

	@Autowired
	AppConfiguration appConfig;

	public void init() {

		URL url;
		HttpURLConnection connection = null;
		String targetURL = appConfig.getSchedulerConfig().getSchedulerUrl() + "/secure/initiateBatch/";// here
		// is
		// my
		// local
		// server
		// url

		try {
			// Create connection
			url = new URL(targetURL);
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestProperty("Content-Type", "application/json");
			connection.setRequestProperty("Job-Execution", "true");
			connection.setUseCaches(false);
			connection.setDoOutput(true);
			connection.setConnectTimeout(120000);
			// //Get Response
			InputStream is = connection.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(is));
			String line;
			StringBuffer response = new StringBuffer();
			while ((line = rd.readLine()) != null) {
				response.append(line);
				response.append('\r');
			}
			rd.close();
			System.out.println("message=" + response.toString());

		} catch (Exception e) {

			e.printStackTrace();

		} finally {

			if (connection != null) {
				connection.disconnect();
			}
		}

	}
}
