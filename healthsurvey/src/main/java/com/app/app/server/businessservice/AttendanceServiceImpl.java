package com.app.app.server.businessservice;
import org.springframework.stereotype.Service;
import com.athena.deo.camel.utility.ExternalIntegrationCaller;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.app.shared.survey.health.QuestionAnswer;
import com.app.app.shared.survey.health.SurveyResult;
import java.util.List;

@Service
public class AttendanceServiceImpl {

    @Autowired
    private ExternalIntegrationCaller externalIntegrationCaller;

    public SurveyResult calculateScore(List<QuestionAnswer> questionanswer) throws Exception {
        try {
            java.util.HashMap map = new java.util.HashMap();
            map.put("questionanswer", questionanswer);
            com.app.app.shared.survey.health.SurveyResult surveyresult = (com.app.app.shared.survey.health.SurveyResult) externalIntegrationCaller.executeRoute("D21B397B-4094-4783-8B0D-60F6F1B607C1", map);
            return surveyresult;
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
