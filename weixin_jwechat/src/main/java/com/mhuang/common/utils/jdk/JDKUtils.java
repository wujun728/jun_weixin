package com.mhuang.common.utils.jdk;

public class JDKUtils {

	private static final String javaVersion;
	private static boolean isJAVA8;
	
	static{
		 javaVersion = System.getProperty("java.version");  
		 if (javaVersion.contains("1.8.")) {  
			 isJAVA8 = true;  
        }
	}
	public static String getJavaVersion() {  
        return javaVersion;  
    }  
	  
    public static boolean isJAVA8() {  
        return isJAVA8;  
    }  
    
    public static void main(String[] args) {
		System.out.println(JDKUtils.isJAVA8);
	}
}
