/**
 * SmsNewOperator_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;

public interface SmsNewOperator extends java.rmi.Remote {
    public void sendSms(java.lang.String account, java.lang.String password, MtNewMessage message, javax.xml.rpc.holders.StringHolder sendResMsg, javax.xml.rpc.holders.StringHolder errMsg) throws java.rmi.RemoteException;
    public void getBalance(java.lang.String account, java.lang.String password, javax.xml.rpc.holders.StringHolder resMsg, javax.xml.rpc.holders.StringHolder errMsg) throws java.rmi.RemoteException;
    public void getSms(java.lang.String account, java.lang.String password, javax.xml.rpc.holders.StringHolder resMsg, javax.xml.rpc.holders.StringHolder errMsg) throws java.rmi.RemoteException;
    public void batchSendSms(java.lang.String account, java.lang.String password, MtNewMessage[] messages, javax.xml.rpc.holders.StringHolder sendResMsg, javax.xml.rpc.holders.StringHolder errMsg) throws java.rmi.RemoteException;
    public void getReport(java.lang.String account, java.lang.String password, MtNewMessage[] message, javax.xml.rpc.holders.StringHolder reportMsg, javax.xml.rpc.holders.StringHolder errMsg) throws java.rmi.RemoteException;
}
