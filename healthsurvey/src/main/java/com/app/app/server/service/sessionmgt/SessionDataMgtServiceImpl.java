package com.app.app.server.service.sessionmgt;import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import com.spartan.shield.server.authentication.interfaces.LoginSessionRepositoryInterface;
import com.spartan.shield.server.authentication.interfaces.LoginSessionInterface;
import com.spartan.shield.server.authentication.interfaces.LoginSessionDataRepository;
import com.spartan.shield.server.authentication.interfaces.SessionDataInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;

import java.sql.Timestamp;
import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

import com.spartan.shield.sessionService.SessionDataMgtService;
import com.athena.framework.server.helper.JSONObjectMapperHelper;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.spartan.shield.server.config.CookieValidation;
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionDataMgtServiceImpl implements SessionDataMgtService {

	@Autowired
	private LoginSessionRepositoryInterface loginSessionInterfaceRepository;
	
	@Autowired
	private LoginSessionDataRepository  loginSessionDataRepository ;
	
	@Autowired
	private RuntimeLogInfoHelper runtimeLogInfoHelper;
	
	@Autowired
	private CookieValidation cookieValidation;

	private enum DATA_TYPE {
		NUMBER(1), DATE_TIME(2), STRING(3), BOOLEAN(4), JSON(5);

		private int value;

		private DATA_TYPE(int value) {
			this.value = value;
		}
	}


	@Override
	public void setSessionAttributeForNumber(String key, Number value) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		session.setAttribute(key, value);
		LoginSessionInterface loginSession = null;
		SessionDataInterface sessionData=null;
		
		
		try{
			sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
			if(sessionData != null){
				sessionData.setNumberValue((Integer)value);
				sessionData.setDataType(DATA_TYPE.NUMBER.value);
				loginSessionDataRepository.update(sessionData);
			}else{
			
	            loginSessionDataRepository.saveSessionData(session.getAttribute("userId").toString(), runtimeLogInfoHelper.getCustomerId(), DATA_TYPE.NUMBER.value,
						(Integer) value, null, null, null, null,cookieValidation.getCookieValue(request,"XA_ID"), key);
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
}
	
    @Override
	public void setSessionAttributeForString(String key, String value) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		session.setAttribute(key, value);
		LoginSessionInterface loginSession = null;
		SessionDataInterface sessionData=null;	
		try{
			sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
			if(sessionData != null){
				sessionData.setStringValue(value);
				sessionData.setDataType(DATA_TYPE.STRING.value);
				loginSessionDataRepository.update(sessionData);
			}else{
loginSessionDataRepository.saveSessionData(session.getAttribute("userId").toString(), runtimeLogInfoHelper.getCustomerId(),   DATA_TYPE.STRING.value,
						null, value, null, null, null, cookieValidation.getCookieValue(request,"XA_ID"), key);
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}

@Override
public void setSessionAttributeForBoolean(String key, Boolean value) {
	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	HttpSession session = request.getSession();
	session.setAttribute(key, value);
	LoginSessionInterface loginSession = null;
	SessionDataInterface sessionData=null;	
	try{
		sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
		if(sessionData != null){
			sessionData.setBooleanValue(value);
			sessionData.setDataType(DATA_TYPE.BOOLEAN.value);
			loginSessionDataRepository.update(sessionData);
		}else{
			 loginSessionDataRepository.saveSessionData(session.getAttribute("userId").toString(), runtimeLogInfoHelper.getCustomerId(), DATA_TYPE.BOOLEAN.value,
						null, null, null, value, null,cookieValidation.getCookieValue(request,"XA_ID"), key);
		}
		
	}catch(Exception e){
		e.printStackTrace();
	}
}

@Override
public void setSessionAttributeForDateTime(String key, Timestamp value) {
	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	HttpSession session = request.getSession();
	session.setAttribute(key, value);
	LoginSessionInterface loginSession = null;
	SessionDataInterface sessionData=null;	
	try{
		sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
		if(sessionData != null){
			sessionData.setDateTimeValue(value);
			sessionData.setDataType(DATA_TYPE.DATE_TIME.value);
			loginSessionDataRepository.update(sessionData);
		}else{
			 loginSessionDataRepository.saveSessionData(session.getAttribute("userId").toString(), runtimeLogInfoHelper.getCustomerId(), DATA_TYPE.DATE_TIME.value,
						null, null, null, null, value, cookieValidation.getCookieValue(request,"XA_ID"), key);
		}
		
	}catch(Exception e){
		e.printStackTrace();
	}
}

@Override
public void setSessionAttributeForObject(String key, Object value) {
	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	HttpSession session = request.getSession();
	LoginSessionInterface loginSession = null;
	SessionDataInterface sessionData=null;	
	try{
		sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
		String jsonValue=new JSONObjectMapperHelper().toJsonString(value);
		session.setAttribute(key, jsonValue);
		
		if(sessionData != null){
			sessionData.setJsonValue(jsonValue);
			sessionData.setDataType(DATA_TYPE.JSON.value);
			loginSessionDataRepository.update(sessionData);
		}else{
			 loginSessionDataRepository.saveSessionData(session.getAttribute("userId").toString(), runtimeLogInfoHelper.getCustomerId(), DATA_TYPE.JSON.value,
						null, null, jsonValue, null, null, cookieValidation.getCookieValue(request,"XA_ID"), key);
		}
		
	}catch(Exception e){
		e.printStackTrace();
	}
}
	
	private void updateSession(LoginSessionInterface loginSession, String sessionData) {
		try {
			loginSessionInterfaceRepository.updateUserSession(loginSession, sessionData);
		} catch (com.athena.framework.server.exception.repository.SpartanPersistenceException e) {
			e.printStackTrace();
		}

	}

	@Override
	public void removeSessionAttribute(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		SessionDataInterface sessionData=null;	

		System.out.println("Removing session data for key: " + key);
		
		LoginSessionInterface loginSession = null;

		try {
			sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
			if(sessionData!=null){
				loginSessionDataRepository.delete(sessionData.getDataId());
				System.out.println("Remove data from Session data Table");
			}
		} catch (SpartanPersistenceException e1) {
			System.out.println("Requested Session Id not found");
		} catch (Exception e1) {
			System.out.println("Requested Session Id not found");
		}
		session.removeAttribute(key);

	}
	@Override
	public void removeSessionAllAttributes() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		List<SessionDataInterface> sessionDatalist = null;

		System.out.println("Removing session data for key: ");

		LoginSessionInterface loginSession = null;

		try {
			sessionDatalist = loginSessionDataRepository.findByAppSessionId(cookieValidation.getCookieValue(request,"XA_ID"));
			

					loginSessionDataRepository.deleteAll(cookieValidation.getCookieValue(request,"XA_ID"));
					System.out.println("Remove data from Session data Table");
		} catch (SpartanPersistenceException e1) {
			System.out.println("Requested Session Id not found");
		} catch (Exception e1) {
			System.out.println("Requested Session Id not found");
		}
		Enumeration<String> sessionNamesEnumeration = session.getAttributeNames();

		List<String> sessionattributeNames = new ArrayList<String>();

		while (sessionNamesEnumeration.hasMoreElements()) {
			session.removeAttribute(sessionNamesEnumeration.nextElement());
		}
	}

	@Override
	public Object getSessionData(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		if (session.getAttribute(key) != null) {
			System.out.println("Returning session data from session for key: " + key);
			return session.getAttribute(key);
		} else {
			try {
				SessionDataInterface sessionData=null;	
				sessionData=loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
          if(sessionData!=null){
        	  if(sessionData.getDataType()==1){
					session.setAttribute(key,sessionData.getNumberValue());
				}else if(sessionData.getDataType()==2){
					session.setAttribute(key,sessionData.getDateTimeValue());
					
				}else if(sessionData.getDataType()==3){
					session.setAttribute(key,sessionData.getStringValue());

				}else if(sessionData.getDataType()==4){
					session.setAttribute(key,sessionData.getBooleanValue());
				}
				else if (sessionData.getDataType() == 5) {
					session.setAttribute(key, sessionData.getJsonValue());

				}
				return session.getAttribute(key);
                 }
			
				return null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;

	}
	

	@Override
	public <T> Object getSessionDataForObject(String key, Class clazz) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		SessionDataInterface sessionData = null;
	try{
		if (session.getAttribute(key) != null) {
			return new JSONObjectMapperHelper().fromJSON(
					session.getAttribute(key).toString(), clazz);

		}
		sessionData = loginSessionDataRepository.findBySessionKey(cookieValidation.getCookieValue(request,"XA_ID"),key);
		if (sessionData != null) {
			if (sessionData.getDataType() == 5) {
				session.setAttribute(key, sessionData.getJsonValue());

				return new JSONObjectMapperHelper().fromJSON(
						sessionData.getJsonValue(), clazz);

			}
		}
}
catch(Exception e)
{
}
		return null;
	}
	
	@Override
	public void getAllSessionAttributes(String appSessionId) throws SpartanPersistenceException, Exception {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		// Iterate JSONObject
		List<SessionDataInterface> sessionData = loginSessionDataRepository.findByAppSessionId(appSessionId);
		for (SessionDataInterface sessiondata : sessionData) {
			if (sessiondata.getBooleanValue() != null) {
				session.setAttribute(sessiondata.getSessionKey(), sessiondata.getBooleanValue());
			}
			if (sessiondata.getNumberValue() != null) {
				session.setAttribute(sessiondata.getSessionKey(), sessiondata.getNumberValue());
			}
			if (sessiondata.getDateTimeValue() != null) {
				session.setAttribute(sessiondata.getSessionKey(), sessiondata.getDateTimeValue());
			}
			if (sessiondata.getJsonValue() != null) {
				session.setAttribute(sessiondata.getSessionKey(), sessiondata.getJsonValue());
			}
			if (sessiondata.getStringValue() != null) {
				session.setAttribute(sessiondata.getSessionKey(), sessiondata.getStringValue());
			}

		}
	}

	
}
