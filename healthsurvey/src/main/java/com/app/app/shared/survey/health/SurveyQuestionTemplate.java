package com.app.app.shared.survey.health;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import java.util.ArrayList;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SurveyQuestionTemplate {

    @Min(0)
    @Max(65535)
    private String surveyQuestionId;

    @Min(0)
    @Max(65535)
    private String surveyQuestionName;

    @Min(0)
    @Max(65535)
    private ArrayList<String> surveyAnswerId;

    public String getSurveyQuestionId() {
        return surveyQuestionId;
    }

    public void setSurveyQuestionId(String _surveyQuestionId) {
        this.surveyQuestionId = _surveyQuestionId;
    }

    public String getSurveyQuestionName() {
        return surveyQuestionName;
    }

    public void setSurveyQuestionName(String _surveyQuestionName) {
        this.surveyQuestionName = _surveyQuestionName;
    }

    public ArrayList<String> getSurveyAnswerId() {
        return surveyAnswerId;
    }

    public void setSurveyAnswerId(ArrayList<String> _surveyAnswerId) {
        this.surveyAnswerId = _surveyAnswerId;
    }
}
