/**
 * MtNewMessage.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class MtNewMessage  implements java.io.Serializable {
    private java.lang.String smsId;

    private java.lang.String phoneNumber;

    private java.lang.String content;

    private java.util.Calendar scheduleTime;

    public MtNewMessage() {
    }

    public MtNewMessage(
           java.lang.String smsId,
           java.lang.String phoneNumber,
           java.lang.String content,
           java.util.Calendar scheduleTime) {
           this.smsId = smsId;
           this.phoneNumber = phoneNumber;
           this.content = content;
           this.scheduleTime = scheduleTime;
    }


    /**
     * Gets the smsId value for this MtNewMessage.
     * 
     * @return smsId
     */
    public java.lang.String getSmsId() {
        return smsId;
    }


    /**
     * Sets the smsId value for this MtNewMessage.
     * 
     * @param smsId
     */
    public void setSmsId(java.lang.String smsId) {
        this.smsId = smsId;
    }


    /**
     * Gets the phoneNumber value for this MtNewMessage.
     * 
     * @return phoneNumber
     */
    public java.lang.String getPhoneNumber() {
        return phoneNumber;
    }


    /**
     * Sets the phoneNumber value for this MtNewMessage.
     * 
     * @param phoneNumber
     */
    public void setPhoneNumber(java.lang.String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    /**
     * Gets the content value for this MtNewMessage.
     * 
     * @return content
     */
    public java.lang.String getContent() {
        return content;
    }


    /**
     * Sets the content value for this MtNewMessage.
     * 
     * @param content
     */
    public void setContent(java.lang.String content) {
        this.content = content;
    }


    /**
     * Gets the scheduleTime value for this MtNewMessage.
     * 
     * @return scheduleTime
     */
    public java.util.Calendar getScheduleTime() {
        return scheduleTime;
    }


    /**
     * Sets the scheduleTime value for this MtNewMessage.
     * 
     * @param scheduleTime
     */
    public void setScheduleTime(java.util.Calendar scheduleTime) {
        this.scheduleTime = scheduleTime;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MtNewMessage)) return false;
        MtNewMessage other = (MtNewMessage) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.smsId==null && other.getSmsId()==null) || 
             (this.smsId!=null &&
              this.smsId.equals(other.getSmsId()))) &&
            ((this.phoneNumber==null && other.getPhoneNumber()==null) || 
             (this.phoneNumber!=null &&
              this.phoneNumber.equals(other.getPhoneNumber()))) &&
            ((this.content==null && other.getContent()==null) || 
             (this.content!=null &&
              this.content.equals(other.getContent()))) &&
            ((this.scheduleTime==null && other.getScheduleTime()==null) || 
             (this.scheduleTime!=null &&
              this.scheduleTime.equals(other.getScheduleTime())));
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
        if (getSmsId() != null) {
            _hashCode += getSmsId().hashCode();
        }
        if (getPhoneNumber() != null) {
            _hashCode += getPhoneNumber().hashCode();
        }
        if (getContent() != null) {
            _hashCode += getContent().hashCode();
        }
        if (getScheduleTime() != null) {
            _hashCode += getScheduleTime().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(MtNewMessage.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("urn:SmsNewOperator", "MtNewMessage"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("smsId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "smsId"));
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
        elemField.setFieldName("scheduleTime");
        elemField.setXmlName(new javax.xml.namespace.QName("", "scheduleTime"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(true);
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
