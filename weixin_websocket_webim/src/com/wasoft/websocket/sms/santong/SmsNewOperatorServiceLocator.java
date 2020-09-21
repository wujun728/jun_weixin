/**
 * SmsNewOperatorServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public class SmsNewOperatorServiceLocator extends org.apache.axis.client.Service implements SmsNewOperatorService {

    public SmsNewOperatorServiceLocator() {
    }


    public SmsNewOperatorServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SmsNewOperatorServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SmsNewOperator
    private java.lang.String SmsNewOperator_address = "http://192.168.3.140:8081/ema/services/SmsNewOperator";

    public java.lang.String getSmsNewOperatorAddress() {
        return SmsNewOperator_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SmsNewOperatorWSDDServiceName = "SmsNewOperator";

    public java.lang.String getSmsNewOperatorWSDDServiceName() {
        return SmsNewOperatorWSDDServiceName;
    }

    public void setSmsNewOperatorWSDDServiceName(java.lang.String name) {
        SmsNewOperatorWSDDServiceName = name;
    }

    public SmsNewOperator getSmsNewOperator() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SmsNewOperator_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSmsNewOperator(endpoint);
    }

    public SmsNewOperator getSmsNewOperator(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            SmsNewOperatorSoapBindingStub _stub = new SmsNewOperatorSoapBindingStub(portAddress, this);
            _stub.setPortName(getSmsNewOperatorWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSmsNewOperatorEndpointAddress(java.lang.String address) {
        SmsNewOperator_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (SmsNewOperator.class.isAssignableFrom(serviceEndpointInterface)) {
                SmsNewOperatorSoapBindingStub _stub = new SmsNewOperatorSoapBindingStub(new java.net.URL(SmsNewOperator_address), this);
                _stub.setPortName(getSmsNewOperatorWSDDServiceName());
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
        if ("SmsNewOperator".equals(inputPortName)) {
            return getSmsNewOperator();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("urn:SmsNewOperator", "SmsNewOperatorService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("urn:SmsNewOperator", "SmsNewOperator"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SmsNewOperator".equals(portName)) {
            setSmsNewOperatorEndpointAddress(address);
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
