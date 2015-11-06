package com.app.app.shared.survey.health;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SurveyResult {

    private date date;

    private Integer point;

    private Integer score;

    private Integer type;

    public date getDate() {
        return date;
    }

    public void setDate(date _date) {
        this.date = _date;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer _point) {
        this.point = _point;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer _score) {
        this.score = _score;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer _type) {
        this.type = _type;
    }
}
