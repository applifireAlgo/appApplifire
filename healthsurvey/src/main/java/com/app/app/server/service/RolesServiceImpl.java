package com.app.app.server.service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import com.athena.annotation.Complexity;
import com.athena.annotation.SourceCodeAuthorClass;
import com.app.app.server.businessservice.RolesBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.app.server.repository.RolesRepository;
import com.app.app.shared.authorization.Roles;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.spartan.sprinkler.core.Sprinkler;
import org.springframework.web.bind.annotation.RequestMapping;
import com.athena.framework.server.bean.ResponseBean;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.lang.Override;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import com.athena.framework.server.exception.repository.SpartanTransactionException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;
import com.athena.framework.server.bean.FindByBean;

@RestController
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@SourceCodeAuthorClass(createdBy = "john.doe", updatedBy = "", versionNumber = "1", comments = "Service for Roles Transaction table", complexity = Complexity.MEDIUM)
@RequestMapping("/Roles")
public class RolesServiceImpl extends RolesService {

    @Autowired
    private RolesBusinessService rolesbz;

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Autowired
    private Sprinkler sprinkler;

    @Autowired
    private RolesRepository<Roles> rolesrepo;

    @RequestMapping(value = "/findAll", consumes = "application/json", method = RequestMethod.GET)
    @Override
    public HttpEntity<ResponseBean> findAll() throws SpartanPersistenceException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        java.util.List<com.app.app.shared.authorization.Roles> lstroles = rolesrepo.findAll();
        responseBean.add("success", true);
        responseBean.add("message", "Successfully retrived ");
        responseBean.add("data", lstroles);
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(consumes = "application/json", method = RequestMethod.POST)
    @Override
    public HttpEntity<ResponseBean> save(@RequestBody Roles entity) throws SpartanPersistenceException, SpartanTransactionException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.CREATED;
        try {
            rolesrepo.save(entity);
            responseBean.add("success", true);
            responseBean.add("message", "Successfully Created");
            responseBean.add("data", entity);
            httpStatus = org.springframework.http.HttpStatus.CREATED;
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not save", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(consumes = "application/json", headers = { "isArray" }, method = RequestMethod.POST)
    @Override
    public HttpEntity<ResponseBean> save(@RequestBody List<Roles> entity, @RequestHeader("isArray") boolean request) throws SpartanPersistenceException, SpartanTransactionException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.CREATED;
        try {
            rolesrepo.save(entity);
            responseBean.add("success", true);
            responseBean.add("message", "Successfully Created");
            httpStatus = org.springframework.http.HttpStatus.CREATED;
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not save", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(value = "/{cid}", consumes = "application/json", method = RequestMethod.DELETE)
    @Override
    public HttpEntity<ResponseBean> delete(@PathVariable("cid") String entity) throws SpartanPersistenceException, SpartanTransactionException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        try {
            rolesrepo.delete(entity);
            httpStatus = org.springframework.http.HttpStatus.OK;
            responseBean.add("success", true);
            responseBean.add("message", "Successfully deleted ");
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not delete", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(consumes = "application/json", method = RequestMethod.PUT)
    @Override
    public HttpEntity<ResponseBean> update(@RequestBody Roles entity) throws SpartanPersistenceException, SpartanTransactionException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        try {
            rolesbz.update(entity);
            responseBean.add("success", true);
            responseBean.add("message", "Successfully updated ");
            responseBean.add("data", entity._getPrimarykey().toString());
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not update", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(consumes = "application/json", headers = { "isArray" }, method = RequestMethod.PUT)
    @Override
    public HttpEntity<ResponseBean> update(@RequestBody List<Roles> entity, @RequestHeader("isArray") boolean request) throws SpartanPersistenceException, SpartanTransactionException, Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        try {
            rolesbz.update(entity);
            responseBean.add("success", true);
            responseBean.add("message", "Successfully updated entities");
            httpStatus = org.springframework.http.HttpStatus.OK;
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not update", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }

    @RequestMapping(value = "/findById", method = RequestMethod.POST)
    @Override
    public HttpEntity<ResponseBean> findById(@RequestBody FindByBean findByBean) throws SpartanPersistenceException, Exception {
        com.athena.framework.server.bean.ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        try {
            com.app.app.shared.authorization.Roles lstroles = rolesrepo.findById((String) findByBean.getFindKey());
            responseBean.add("success", true);
            responseBean.add("message", "Successfully retrived ");
            responseBean.add("data", lstroles);
        } catch (org.springframework.transaction.TransactionException e) {
            throw new com.athena.framework.server.exception.repository.SpartanTransactionException("can not find ID", e.getRootCause());
        }
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }
}
