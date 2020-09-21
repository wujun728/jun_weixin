/**
 * MOMessage.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class MOMessage  implements java.io.Serializable {
    private java.lang.String sequenceId;

    private java.lang.String phoneNumber;

    private java.lang.String content;

    private java.util.Calendar receivedTime;

    private boolean isSuccess;

    public MOMessage() {
    }

    public MOMessage(
           java.lang.String sequenceId,
           java.lang.String phoneNumber,
           java.lang.String content,
           java.util.Calendar receivedTime,
           boolean isSuccess) {
           this.sequenceId = sequenceId;
           this.phoneNumber = phoneNumber;
           this.content = content;
           this.receivedTime = receivedTime;
           this.isSuccess = isSuccess;
    }


    /**
     * Gets the sequenceId value for this MOMessage.
     * 
     * @return sequenceId
     */
    public java.lang.String getSequenceId() {
        return sequenceId;
    }


    /**
     * Sets the sequenceId value for this MOMessage.
     * 
     * @param sequenceId
     */
    public void setSequenceId(java.lang.String sequenceId) {
        this.sequenceId = sequenceId;
    }


    /**
     * Gets the phoneNumber value for this MOMessage.
     * 
     * @return phoneNumber
     */
    public java.lang.String getPhoneNumber() {
        return phoneNumber;
    }


    /**
     * Sets the phoneNumber value for this MOMessage.
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(java.lang.String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    /**
     * Gets the content value for this MOMessage.
     * 
     * @return content
     */
    public java.lang.String getContent() {
        return content;
    }


    /**
     * Sets the content value for this MOMessage.
     * 
     * @param content
     */
    public void setContent(java.lang.String content) {
        this.content = content;
    }


    /**
     * Gets the receivedTime value for this MOMessage.
     * 
     * @return receivedTime
     */
    public java.util.Calendar getReceivedTime() {
        return receivedTime;
    }


    /**
     * Sets the receivedTime value for this MOMessage.
     * 
     * @param receivedTime
     */
    public void setReceivedTime(java.util.Calendar receivedTime) {
        this.receivedTime = receivedTime;
    }


    /**
     * Gets the isSuccess value for this MOMessage.
     * 
     * @return isSuccess
     */
    public boolean isIsSuccess() {
        return isSuccess;
    }


    /**
     * Sets the isSuccess value for this MOMessage.
     * 
     * @param isSuccess
     */
    public void setIsSuccess(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MOMessage)) return false;
        MOMessage other = (MOMessage) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.sequenceId==null && other.getSequenceId()==null) || 
             (this.sequenceId!=null &&
              this.sequenceId.equals(other.getSequenceId()))) &&
            ((this.phoneNumber==null && other.getPhoneNumber()==null) || 
             (this.phoneNumber!=null &&
              this.phoneNumber.equals(other.getPhoneNumber()))) &&
            ((this.content==null && other.getContent()==null) || 
             (this.content!=null &&
              this.content.equals(other.getContent()))) &&
            ((this.receivedTime==null && other.getReceivedTime()==null) || 
             (this.receivedTime!=null &&
              this.receivedTime.equals(other.getReceivedTime()))) &&
            this.isSuccess == other.isIsSuccess();
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getSequenceId() != null) {
            _hashCode += getSequenceId().hashCode();
        }
        if (getPhoneNumber() != null) {
            _hashCode += getPhoneNumber().hashCode();
        }
        if (getContent() != null) {
            _hashCode += getContent().hashCode();
        }
        if (getReceivedTime() != null) {
            _hashCode += getReceivedTime().hashCode();
        }
        _hashCode += (isIsSuccess() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(MOMessage.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://3tong.cn:8080/ema_new/services/SmsOperator", "MOMessage"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sequenceId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "sequenceId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("phoneNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("", "phoneNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("content");
        elemField.setXmlName(new javax.xml.namespace.QName("", "content"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("receivedTime");
        elemField.setXmlName(new javax.xml.namespace.QName("", "receivedTime"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("isSuccess");
        elemField.setXmlName(new javax.xml.namespace.QName("", "isSuccess"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
