/**
 * SmsOperator_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public interface SmsOperator extends java.rmi.Remote {
    public MTResponse[] sendSms(java.lang.String account, java.lang.String password, MTMessage message) throws java.rmi.RemoteException;
    public Balance getBalance(java.lang.String account, java.lang.String password) throws java.rmi.RemoteException;
    public MOMessage[] getSms(java.lang.String account, java.lang.String password) throws java.rmi.RemoteException;
    public MTResponse[] batchSendSms(java.lang.String account, java.lang.String password, MTMessage[] messages) throws java.rmi.RemoteException;
    public MTReport[] getReport(java.lang.String account, java.lang.String password, MTMessage message) throws java.rmi.RemoteException;
    public MTReport[] getReports(java.lang.String account, java.lang.String password, MTMessage[] message) throws java.rmi.RemoteException;
}
