/**
 * SmsOperatorServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class SmsOperatorServiceLocator extends org.apache.axis.client.Service implements SmsOperatorService {

    public SmsOperatorServiceLocator() {
    }


    public SmsOperatorServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SmsOperatorServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SmsOperator
    private java.lang.String SmsOperator_address = "http://192.168.3.140:8081/ema/services/SmsOperator";

    public java.lang.String getSmsOperatorAddress() {
        return SmsOperator_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SmsOperatorWSDDServiceName = "SmsOperator";

    public java.lang.String getSmsOperatorWSDDServiceName() {
        return SmsOperatorWSDDServiceName;
    }

    public void setSmsOperatorWSDDServiceName(java.lang.String name) {
        SmsOperatorWSDDServiceName = name;
    }

    public SmsOperator getSmsOperator() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SmsOperator_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSmsOperator(endpoint);
    }

    public SmsOperator getSmsOperator(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            SmsOperatorSoapBindingStub _stub = new SmsOperatorSoapBindingStub(portAddress, this);
            _stub.setPortName(getSmsOperatorWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSmsOperatorEndpointAddress(java.lang.String address) {
        SmsOperator_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (SmsOperator.class.isAssignableFrom(serviceEndpointInterface)) {
                SmsOperatorSoapBindingStub _stub = new SmsOperatorSoapBindingStub(new java.net.URL(SmsOperator_address), this);
                _stub.setPortName(getSmsOperatorWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("SmsOperator".equals(inputPortName)) {
            return getSmsOperator();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://3tong.cn:8080/ema_new/services/SmsOperator", "SmsOperatorService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://3tong.cn:8080/ema_new/services/SmsOperator", "SmsOperator"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SmsOperator".equals(portName)) {
            setSmsOperatorEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
