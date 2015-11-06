package com.app.app.shared.survey.health;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class QuestionAnswer {

    private String answerId;

    private String answerName;

    private Integer groupType;

    private String questionId;

    private String questionName;

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String _answerId) {
        this.answerId = _answerId;
    }

    public String getAnswerName() {
        return answerName;
    }

    public void setAnswerName(String _answerName) {
        this.answerName = _answerName;
    }

    public Integer getGroupType() {
        return groupType;
    }

    public void setGroupType(Integer _groupType) {
        this.groupType = _groupType;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String _questionId) {
        this.questionId = _questionId;
    }

    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String _questionName) {
        this.questionName = _questionName;
    }
}
