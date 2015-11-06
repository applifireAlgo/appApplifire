package com.app.app.util;
import java.io.IOException;
import java.net.HttpURLConnection;

public class BatchConnection {
	   
    public HttpURLConnection openConnection(String urlString,String urlParameter,String methodType) throws Exception
    {
    	try
    	{
    		 java.net.URL url;
    	        java.net.HttpURLConnection connection = null;
    	        String targetURL =urlString;
    	        String urlParameters = urlParameter;
    	        url = new java.net.URL(targetURL);
                connection = (java.net.HttpURLConnection) url.openConnection();
                connection.setRequestMethod(methodType);
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestProperty("Job-Execution", "true");
                connection.setRequestProperty("Content-Length", Integer.toString(urlParameters.getBytes().length));
                connection.setRequestProperty("Content-Language", "en-US");
                connection.setUseCaches(false);
                connection.setDoInput(true);
                connection.setDoOutput(true);
                return connection;

    	}
    	catch(IOException e)
    	{
    		throw e;
    	}
    }
    
    public HttpURLConnection sendPayLoad(HttpURLConnection connection,String urlParameters) throws IOException
    {
    	try
    	{
    		 java.io.DataOutputStream wr = new java.io.DataOutputStream(connection.getOutputStream());
             wr.writeBytes(urlParameters);
             wr.flush();
             wr.close();
             return connection;
    	}
    	catch(IOException e)
    	{
    		throw e;
    	}
    }
    
    public HttpURLConnection getResponse(HttpURLConnection connection) throws IOException
    {
    	try
    	{
    		 java.io.InputStream is = connection.getInputStream();
             java.io.BufferedReader rd = new java.io.BufferedReader(new java.io.InputStreamReader(is));
             String line;
             StringBuffer response = new StringBuffer();
             while ((line = rd.readLine()) != null) {
                 response.append(line);
                 response.append('\r');
             }
             rd.close();
             System.out.println("message=" + response.toString());
             return connection;
    	}
    	catch(IOException e)
    	{
    		throw e;
    	}
    }
    
    public void closeConnection(HttpURLConnection connection) throws Exception
    {
    	try
    	{
    		 if (connection != null) {
                 connection.disconnect();
             }
    	}
    	catch(Exception e)
    	{
    		throw e;
    	}
    }

}
