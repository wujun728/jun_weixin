package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 操作系统enum
 *
 * @author Allen
 */
@Getter
@AllArgsConstructor
public enum OperatingSystem {
    DARWIN("darwin"),
    WINDOWS("windows"),
    LINUX("linux"),
    MAC_OS("mac"),
    OTHER("other");

    private String value;

    public static OperatingSystem currentOperatingSystem() {
        String osName = System.getProperty("os.name").toLowerCase();
        if (osName.contains(OperatingSystem.DARWIN.getValue())) {
            return OperatingSystem.DARWIN;
        } else if (osName.contains(OperatingSystem.WINDOWS.getValue())) {
            return OperatingSystem.WINDOWS;
        } else if (osName.contains(OperatingSystem.LINUX.getValue())) {
            return OperatingSystem.LINUX;
        } else if (osName.contains(OperatingSystem.MAC_OS.getValue())) {
            return OperatingSystem.MAC_OS;
        }
        return OperatingSystem.OTHER;
    }
}
