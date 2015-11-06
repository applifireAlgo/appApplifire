package com.app.app.server.businessservice.survey.health;
import com.app.app.server.repository.SurveyQuestionRepository;
import com.app.app.shared.health.SurveyQuestion;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.spartan.shield.sessionService.SessionDataMgtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException;
import com.athena.framework.server.exception.biz.SpartanDataNotFoundException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.util.List;

@Component
public class LifeStyleQuestions {

    @Autowired
    private SessionDataMgtService sessionService;

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Autowired
    private SurveyQuestionRepository<SurveyQuestion> surveyQuestionRepository;

    public List<SurveyQuestion> retriveLifeStyle() throws SpartanIncorrectDataException, Exception, SpartanBusinessValidationFailedException, SpartanPersistenceException, SpartanDataNotFoundException {
        java.util.List<com.app.app.shared.health.SurveyQuestion> surveyquestion_2 = null;
        try {
            surveyquestion_2 = surveyQuestionRepository.LifeStyleQuestions();
            return surveyquestion_2;
        } catch (Exception e) {
            e.printStackTrace();
            throw new com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException(e.getCause().getMessage());
        }
    }
}
