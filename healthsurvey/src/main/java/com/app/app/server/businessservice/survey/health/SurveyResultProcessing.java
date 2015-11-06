package com.app.app.server.businessservice.survey.health;
import com.app.app.server.repository.SurveyResultRepository;
import com.app.app.shared.health.SurveyResult;
import com.athena.framework.server.helper.RuntimeLogInfoHelper;
import com.athena.ruleengine.server.bzservice.RuleEngineInterface;
import com.spartan.shield.sessionService.SessionDataMgtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.app.app.shared.survey.health.SurveyResultDto;
import com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException;
import com.athena.framework.server.exception.biz.SpartanDataNotFoundException;
import com.athena.framework.server.exception.biz.SpartanIncorrectDataException;
import com.athena.framework.server.exception.repository.SpartanPersistenceException;
import java.util.List;

@Component
public class SurveyResultProcessing {

    @Autowired
    private SessionDataMgtService sessionService;

    @Autowired
    private RuntimeLogInfoHelper runtimeLogInfoHelper;

    @Autowired
    private RuleEngineInterface ruleEngineInterface;

    @Autowired
    private SurveyResultRepository<SurveyResult> surveyResultRepository;

    public void process(List<SurveyResultDto> _surveyResult) throws SpartanIncorrectDataException, Exception, SpartanBusinessValidationFailedException, SpartanPersistenceException, SpartanDataNotFoundException {
        for (com.app.app.shared.survey.health.SurveyResultDto surveyResult : _surveyResult) {
            try {
                ruleEngineInterface.initialize("6c9e3db2-d966-4aec-b1d6-68bde4203ffa");
                ruleEngineInterface.add(runtimeLogInfoHelper);
                ruleEngineInterface.add(surveyResult);
                ruleEngineInterface.executeRule();
                if ((com.app.app.shared.health.SurveyResult) ruleEngineInterface.getResult("surveyresult_0") == null) {
                    throw new com.athena.framework.server.exception.biz.SpartanDataNotFoundException("invalid parameter");
                }
                com.app.app.shared.health.SurveyResult surveyresult_1 = surveyResultRepository.save((com.app.app.shared.health.SurveyResult) ruleEngineInterface.getResult("surveyresult_0"));
            } catch (com.athena.framework.server.exception.biz.RuleInitException | com.athena.framework.server.exception.biz.RuleExecuteException | com.athena.framework.server.exception.biz.RuleWorkingMemoryException | com.athena.framework.server.exception.biz.RuleDataException e) {
                e.printStackTrace();
                throw new com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException("3005");
            } catch (Exception e) {
                e.printStackTrace();
                throw new com.athena.framework.server.exception.biz.SpartanBusinessValidationFailedException(e.getCause().getMessage());
            }
        }
    }
}
