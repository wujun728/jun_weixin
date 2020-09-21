/**
 * SmsNotification_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.wasoft.websocket.sms.santong;



public interface SmsNotification extends java.rmi.Remote {
    public void notifySmsReception(String registrationIdentifier, SmsMessage message) throws java.rmi.RemoteException;
    public void notifySmsDeliveryReceipt(String correlator, DeliveryInformation deliveryStatus) throws java.rmi.RemoteException;
}
