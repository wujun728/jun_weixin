/*
 * FileName：Configuration.java 
 * <p>
 * Copyright (c) 2017-2020, <a href="http://www.webcsn.com">hermit (794890569@qq.com)</a>.
 * <p>
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/gpl-3.0.html
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.wxmp.core.common;

import com.wxmp.core.util.FileUtil;
import com.wxmp.core.util.StringUtil;
import com.wxmp.core.util.ValidateUtil;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.XMLConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.File;
import java.text.MessageFormat;
import java.util.*;

/**
 * @author : hermit
 */
public class Configuration
{
  public static XMLConfiguration Config = null;
  private static final String _RES_BASE_NAME = "resources";
  public static String ROOT;
  public static String CURRENT_PATH;
  public static String TEMPLATE_PATH;
  public static String TEMPLATE_WEB_PATH;
  public static String TEMPORARY_PATH;
  public static String LOG_PATH;
  public static String CLASSPATH;
  public static String CONFIG_PATH;
  public static String TEMPLATE_URI = "/WEB-INF/template/views";

  public static final String LINE_SEPARATOR = System.getProperty("line.separator");
  public static final String PATH_SEPARATOR = System.getProperty("path.separator");
  private static final String SECRET_CONFIG = "site.secret";
  private static final String DEFAULT_SECRET_KEY = "SECRET_CONFIG";

  static
  {
    ROOT = new File(Configuration.class.getResource("/").getPath()).getParentFile().getParent().toString();
    CURRENT_PATH = new File(Configuration.class.getResource("/").getPath()).toString();
    TEMPLATE_PATH = StringUtil.concat(new Object[] { ROOT, File.separator, "WEB-INF", File.separator, "template" });
    TEMPLATE_WEB_PATH = StringUtil.concat(new Object[] { TEMPLATE_PATH, File.separator, "views" });
    TEMPORARY_PATH = StringUtil.concat(new Object[] { ROOT, File.separator, "WEB-INF", File.separator, "tmp" });
    CONFIG_PATH = StringUtil.concat(new Object[] { ROOT, File.separator, "WEB-INF", File.separator, "conf" });
    LOG_PATH = StringUtil.concat(new Object[] { ROOT, File.separator, "WEB-INF", File.separator, "logs" });
    StringBuilder sb = new StringBuilder();
    List<File> files = FileUtil.getFiles(new File(StringUtil.concat(new Object[] { ROOT, File.separator, "WEB-INF", File.separator, "lib" })));
    sb.append(".");
    for (File file : files) {
      sb.append(System.getProperty("path.separator"));
      sb.append(file.getAbsolutePath());
    }
    sb.append(System.getProperty("path.separator"));
    sb.append(CURRENT_PATH);
    CLASSPATH = sb.toString();
    try {
      Config = new XMLConfiguration();
      Config.setFile(new File(StringUtil.concat(new Object[] { CURRENT_PATH, File.separator, "system.cfg.xml" })));
      Config.setReloadingStrategy(new FileChangedReloadingStrategy());
      Config.load();
      Config.setEncoding("UTF-8");
    }
    catch (ConfigurationException e)
    {
      e.printStackTrace();
    }
  }

  public static String get(String key)
  {
    return Config.getString(key);
  }

  public static String getSecurityKey()
  {
    return StringUtil.get(get("site.secret"), "SECRET_CONFIG");
  }

  public static String getEncoding()
  {
    return "utf-8";
  }

  public static String getContentType()
  {
    return "text/html;charset=UTF-8";
  }

  public static String getResource(String key, Object[] params)
  {
    if ((params == null) || (params.length < 1)) {
      return ResourceBundle.getBundle("resources", Locale.CHINA).getString(key);
    }
    return MessageFormat.format(ResourceBundle.getBundle("resources", Locale.CHINA).getString(key), params);
  }

  public static String getResource(String key)
  {
    String value = key;
    try {
      ResourceBundle resource = ResourceBundle.getBundle("resources", Locale.CHINA);
      String temp = resource.getString(key);
      if (temp != null) value = temp; 
    }
    catch (Exception localException)
    {
    }
    return value;
  }

  public static Map<String, String> getElementChildNodesNameAndTextContent(String tagName)
  {
    Map childNodesMap = new HashMap();
    try {
      Document p = Config.getDocument();
      NodeList nodeList = p.getElementsByTagName(tagName).item(0).getChildNodes();
      for (int i = 0; i < nodeList.getLength(); i++) {
        Node node = nodeList.item(i);
        if (ValidateUtil.isNotNull(node.getTextContent()))
          childNodesMap.put(node.getNodeName(), node.getTextContent());
      }
    }
    catch (Exception e) {
      childNodesMap = null;
    }
    return childNodesMap;
  }
}
