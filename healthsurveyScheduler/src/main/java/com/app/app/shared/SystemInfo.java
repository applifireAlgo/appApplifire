package com.app.app.shared;import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.Column;
import com.fasterxml.jackson.annotation.JsonProperty;

@Embeddable
public class SystemInfo implements Serializable {

    @Column(name = "activeStatus")
    @JsonProperty("activeStatus")
    private Integer activeStatus = 1;

    @Column(name = "txnAccessCode")
    @JsonProperty("txnAccessCode")
    private Integer txnAccessCode;

    public Integer getActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(Integer _activeStatus) {
        this.activeStatus = _activeStatus;
    }

    public Integer getTxnAccessCode() {
        return txnAccessCode;
    }

    public void setTxnAccessCode(Integer _txnAccessCode) {
        this.txnAccessCode = _txnAccessCode;
    }
}
