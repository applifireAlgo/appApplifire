package com.app.app.server.service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.app.app.server.businessservice.AttendanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import com.athena.framework.server.bean.ResponseBean;
import org.springframework.http.HttpEntity;
import com.app.app.shared.survey.health.QuestionAnswer;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/AttendanceServiceImplWS")
public class AttendanceServiceImplWS {

    @Autowired
    private AttendanceServiceImpl attendanceserviceimpl;

    @RequestMapping(value = "/calculateScore", consumes = "application/json", method = RequestMethod.POST)
    public HttpEntity<ResponseBean> calculateScore(@RequestBody List<QuestionAnswer> questionanswer) throws Exception {
        ResponseBean responseBean = new ResponseBean();
        org.springframework.http.HttpStatus httpStatus = org.springframework.http.HttpStatus.OK;
        com.app.app.shared.survey.health.SurveyResult surveyresult = attendanceserviceimpl.calculateScore(questionanswer);
        responseBean.add("success", true);
        responseBean.add("message", "Successfully retrived ");
        responseBean.add("data", surveyresult);
        return new org.springframework.http.ResponseEntity<ResponseBean>(responseBean, httpStatus);
    }
}
