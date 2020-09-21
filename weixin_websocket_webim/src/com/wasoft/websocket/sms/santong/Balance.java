/**
 * Balance.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class Balance  implements java.io.Serializable {
    private boolean isSuccess;

    private int smsBalance;

    private int mmsBalance;

    public Balance() {
    }

    public Balance(
           boolean isSuccess,
           int smsBalance,
           int mmsBalance) {
           this.isSuccess = isSuccess;
           this.smsBalance = smsBalance;
           this.mmsBalance = mmsBalance;
    }


    /**
     * Gets the isSuccess value for this Balance.
     * 
     * @return isSuccess
     */
    public boolean isIsSuccess() {
        return isSuccess;
    }


    /**
     * Sets the isSuccess value for this Balance.
     * 
     * @param isSuccess
     */
    public void setIsSuccess(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }


    /**
     * Gets the smsBalance value for this Balance.
     * 
     * @return smsBalance
     */
    public int getSmsBalance() {
        return smsBalance;
    }


    /**
     * Sets the smsBalance value for this Balance.
     * 
     * @param smsBalance
     */
    public void setSmsBalance(int smsBalance) {
        this.smsBalance = smsBalance;
    }


    /**
     * Gets the mmsBalance value for this Balance.
     * 
     * @return mmsBalance
     */
    public int getMmsBalance() {
        return mmsBalance;
    }


    /**
     * Sets the mmsBalance value for this Balance.
     * 
     * @param mmsBalance
     */
    public void setMmsBalance(int mmsBalance) {
        this.mmsBalance = mmsBalance;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Balance)) return false;
        Balance other = (Balance) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.isSuccess == other.isIsSuccess() &&
            this.smsBalance == other.getSmsBalance() &&
            this.mmsBalance == other.getMmsBalance();
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
        _hashCode += (isIsSuccess() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += getSmsBalance();
        _hashCode += getMmsBalance();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Balance.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://3tong.cn:8080/ema_new/services/SmsOperator", "Balance"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("isSuccess");
        elemField.setXmlName(new javax.xml.namespace.QName("", "isSuccess"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("smsBalance");
        elemField.setXmlName(new javax.xml.namespace.QName("", "smsBalance"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("mmsBalance");
        elemField.setXmlName(new javax.xml.namespace.QName("", "mmsBalance"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
