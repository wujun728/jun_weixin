/**
 * SmsMessage.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class SmsMessage  implements java.io.Serializable {
    private java.lang.String message;

    private org.apache.axis.types.URI senderAddress;

    private org.apache.axis.types.URI smsServiceActivationNumber;

    public SmsMessage() {
    }

    public SmsMessage(
           java.lang.String message,
           org.apache.axis.types.URI senderAddress,
           org.apache.axis.types.URI smsServiceActivationNumber) {
           this.message = message;
           this.senderAddress = senderAddress;
           this.smsServiceActivationNumber = smsServiceActivationNumber;
    }


    /**
     * Gets the message value for this SmsMessage.
     * 
     * @return message
     */
    public java.lang.String getMessage() {
        return message;
    }


    /**
     * Sets the message value for this SmsMessage.
     * 
     * @param message
     */
    public void setMessage(java.lang.String message) {
        this.message = message;
    }


    /**
     * Gets the senderAddress value for this SmsMessage.
     * 
     * @return senderAddress
     */
    public org.apache.axis.types.URI getSenderAddress() {
        return senderAddress;
    }


    /**
     * Sets the senderAddress value for this SmsMessage.
     * 
     * @param senderAddress
     */
    public void setSenderAddress(org.apache.axis.types.URI senderAddress) {
        this.senderAddress = senderAddress;
    }


    /**
     * Gets the smsServiceActivationNumber value for this SmsMessage.
     * 
     * @return smsServiceActivationNumber
     */
    public org.apache.axis.types.URI getSmsServiceActivationNumber() {
        return smsServiceActivationNumber;
    }


    /**
     * Sets the smsServiceActivationNumber value for this SmsMessage.
     * 
     * @param smsServiceActivationNumber
     */
    public void setSmsServiceActivationNumber(org.apache.axis.types.URI smsServiceActivationNumber) {
        this.smsServiceActivationNumber = smsServiceActivationNumber;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SmsMessage)) return false;
        SmsMessage other = (SmsMessage) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.message==null && other.getMessage()==null) || 
             (this.message!=null &&
              this.message.equals(other.getMessage()))) &&
            ((this.senderAddress==null && other.getSenderAddress()==null) || 
             (this.senderAddress!=null &&
              this.senderAddress.equals(other.getSenderAddress()))) &&
            ((this.smsServiceActivationNumber==null && other.getSmsServiceActivationNumber()==null) || 
             (this.smsServiceActivationNumber!=null &&
              this.smsServiceActivationNumber.equals(other.getSmsServiceActivationNumber())));
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
        if (getMessage() != null) {
            _hashCode += getMessage().hashCode();
        }
        if (getSenderAddress() != null) {
            _hashCode += getSenderAddress().hashCode();
        }
        if (getSmsServiceActivationNumber() != null) {
            _hashCode += getSmsServiceActivationNumber().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SmsMessage.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://www.chinatelecom.com.cn/schema/ctcc/sms/v2_1", "SmsMessage"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("message");
        elemField.setXmlName(new javax.xml.namespace.QName("", "message"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("senderAddress");
        elemField.setXmlName(new javax.xml.namespace.QName("", "senderAddress"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyURI"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("smsServiceActivationNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("", "smsServiceActivationNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyURI"));
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
