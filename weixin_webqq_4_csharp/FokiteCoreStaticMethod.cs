using System;


namespace FokiteQQcore_http://fokite.com/
{
    /// <summary>
    /// 此分拆类包含运行所需的静态方法
    /// </summary>
    public partial class FokiteCore
    {
        #region 静态工具方法

        private static String binl2hex(byte[] buffer)
        {
            StringBuilder builder = new StringBuilder();
            foreach (var item in buffer)
            {
                builder.Append(item.ToString("x2"));
            }
            return builder.ToString();
        }
        /// <summary>
        /// 慢速MD5
        /// </summary>
        /// <param name="encodingstring">多个待加密字符串</param>
        /// <returns>加密成功字符串</returns>
        public static String getmd5(params String[] encodingstring)
        {
            if (encodingstring.Length == 0)
            {
                return String.Empty;
            }
            byte[] buffer = null;

            using (var mdf5 = MD5.Create())
            {
                buffer = mdf5.ComputeHash(Encoding.Default.GetBytes(String.Concat(encodingstring)));
            }
            return binl2hex(buffer);
        }
        /// <summary>
        /// 三次MD5加密
        /// </summary>
        /// <param name="encodingstring"></param>
        /// <returns></returns>
        private static String md5threeconsecutive(String encodingstring)
        {
            using (MD5 md = MD5.Create())
            {
                byte[] buffer = md.ComputeHash(Encoding.Default.GetBytes(encodingstring));
                buffer = md.ComputeHash(buffer);
                buffer = md.ComputeHash(buffer);
                return binl2hex(buffer);
            }
        }
        /// <summary>
        /// 快速返回一次MD5加密字符串
        /// </summary>
        /// <param name="encodingstring">待加密字符串</param>
        /// <returns>加密后的MD5，32位</returns>
        public static String getmd5(String encodingstring)
        {
            using (var hashmd5 = new MD5CryptoServiceProvider())//System.Security.Cryptography安全.密码系统
            {
                return BitConverter.ToString(hashmd5.ComputeHash(Encoding.UTF8.GetBytes(encodingstring))).Replace("-", String.Empty).ToLower();
            }
        }

        private static String getPassword(String password, String verifycode)
        {
            return getmd5(md5threeconsecutive(password).ToUpper(), verifycode.ToUpper()).ToUpper();
        }

        private static String getClientID()
        {
            return String.Concat(new Random(Guid.NewGuid().GetHashCode()).Next(0, 99), getTime(DateTime.Now) / 1000000).TrimStart('.');
        }
        /// <summary>
        /// 获取UNIX时间戳
        /// </summary>
        /// <param name="dateTime">DateTime时间表示法</param>
        /// <returns>UNINX时间戳</returns>
        public static double getTime(DateTime dateTime)
        {
            //dateTime = (dateTime == null) ? DateTime.Now : dateTime;            
            //DateTime startDate = new DateTime(1970, 1, 1);
            //DateTime endDate = dateTime.ToUniversalTime();
            //TimeSpan span = endDate - startDate;
            //return (Int64)(span.TotalMilliseconds + 0.5);
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            return (dateTime - startTime).TotalSeconds;
        }
        /// <summary>
        /// 获取当前时间的UNIX时间戳
        /// </summary>
        /// <returns>UNINX时间戳</returns>
        public static double getTime()
        {
            return getTime(DateTime.Now);
        }
        /// <summary>
        /// 转换来自UNIX的时间戳
        /// </summary>
        /// <param name="timestamp">UNIX的时间戳</param>
        /// <param name="format">时间格式化文本</param>
        /// <returns>yyyy年M月d日 H:mm:ss dddd 格式化的时间文本</returns>
        public static String convertFromUnixTimestamp(String timestamp, String format)
        {
            return convertFromUnixTimestamp(Double.Parse(timestamp)).ToString(String.IsNullOrEmpty(format) ? "yyyy年M月d日 H:mm:ss dddd" : format);
        }
        /// <summary>
        /// 转换来自UNIX的时间戳
        /// </summary>
        /// <param name="timestamp">UNIX的时间戳</param>
        /// <returns>DateTime</returns>
        public static DateTime convertFromUnixTimestamp(double timestamp)
        {
            //System.DateTime time = System.DateTime.MinValue;
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            return startTime.AddSeconds(timestamp);
        }
        /// <summary>
        /// 获取某个类的详细描述文本
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static String getEnumDescription(Object e)
        {
            //获取字段信息
            System.Reflection.FieldInfo[] ms = e.GetType().GetFields();

            //Type t = e.GetType();
            foreach (System.Reflection.FieldInfo f in ms)
            {
                //判断名称是否相等
                if (f.Name != e.ToString()) { continue; }

                //反射出自定义属性
                foreach (Attribute attr in f.GetCustomAttributes(true))
                {
                    //类型转换找到一个Description，用Description作为成员名称
                    System.ComponentModel.DescriptionAttribute dscript = attr as System.ComponentModel.DescriptionAttribute;
                    if (dscript != null)
                    {
                        return dscript.Description;
                    }
                }
            }
            //如果没有检测到合适的注释，则用默认名称
            return e.ToString();
        }

        /// <summary>
        /// 获取枚举类子项描述信息
        /// </summary>
        /// <param name="enumitem">枚举类子项</param>
        /// <returns>返回该项的自定义描述</returns>
        public static String getEnumDescription(Enum enumitem)
        {
            String strValue = enumitem.ToString();
            Object[] objs = enumitem.GetType().GetField(strValue).GetCustomAttributes(typeof(DescriptionAttribute), false);
            if (objs == null || objs.Length == 0)
            {
                return strValue;
            }
            else
            {
                DescriptionAttribute da = (DescriptionAttribute)objs[0];
                return da.Description;
            }
        }

        /// <summary>
        /// 数字转换成IP
        /// </summary>
        /// <param name="ipAddress"></param>
        /// <returns></returns>
        public static String long2ip(Object ipAddress)
        {
            System.Net.IPAddress ip;
            if (System.Net.IPAddress.TryParse(ipAddress.ToString(), out ip))
            {
                return ip.ToString();
            }
            return String.Empty;
        }

        /// <summary>
        /// 获取Objcet数组里面的Dictionary的某个值找某个键名的值
        /// </summary>
        /// <param name="objs"></param>
        /// <param name="value">要找的值</param>
        /// <param name="key">去找的集合名</param>
        /// <returns></returns>
        public static Object dictionaryValue(Object[] objs, Object value, String key)
        {
            IEnumerable<Dictionary<String, Object>> o = from Dictionary<String, Object> d in objs where d.Values.SingleOrDefault(v => v.ToString().Equals(value.ToString())) != null select d;
            if (o.ElementAtOrDefault(0) == null)
            {
                return String.Empty;
            }
            return o.ElementAtOrDefault(0)[key];
        }

        /// <summary>
        /// 接收消息格式化
        /// </summary>
        /// <param name="dicObject">jsonengine["result"][0]["value"]["content"]</param>
        /// <param name="msgformat">返回的格式信息</param>
        /// <param name="simplewords">是否使用简单词汇描述表情和图片</param>
        /// <returns>转化后的消息内容</returns>
        public static String receiveMsgFormat(Object[] dicObject, ref Object[] msgformat, Boolean simplewords)
        {
            StringBuilder msgs = new StringBuilder();
            foreach (var dicObjectitem in dicObject)
            {
                if (dicObjectitem is Object[])
                {
                    msgformat = (Object[])dicObjectitem;
                    if (Array.IndexOf((Object[])msgformat, "face") != -1 && simplewords)
                    {
                        msgs.Append(getEnumDescription(Enum.Parse(typeof(QQexpression), msgformat[1].ToString())));
                    }
                    else if (Array.IndexOf(msgformat, "cface") != -1 && simplewords)
                    {
                        msgs.Append("【图片】");
                    }
                }
                else
                {
                    msgs.Append(dicObjectitem);
                }
            }
            return msgs.ToString();
        }

        /// <summary>
        /// 发送混合式消息处理，默认表情用枚举或者数字，自定义表情用String[]，字符串等，字体颜色等功能的期待完善
        /// </summary>
        /// <param name="msg">消息内容</param>
        /// <returns>格式化以后的消息内容</returns>
        public static String messaGing(params Object[] msg)
        {
            if (msg.Length == 0) { return "\\\"\\\""; }//没有参数
            if (msg.Length == 1)
            {//只有一个参数加引号
                return String.Format("\\\"{0}\\\"", msg[0]);
            }
            var msgcontent = new StringBuilder();

            foreach (var itemmsg in msg)
            {
                if (itemmsg is QQexpression || itemmsg is Int32 || itemmsg is Int64)
                {
                    msgcontent.AppendFormat("[\\\"face\\\",{0}],", itemmsg.GetHashCode());//"[\"face\",{0}],"                    
                }else{
                    msgcontent.Append("\\\"").Append(itemmsg).Append("\\\",");
                }
            }
            return msgcontent.Replace("\\\",\\\"", String.Empty).ToString().TrimEnd(','); //替换掉全字符串的情况，以及去掉最后多余的逗号
        }

        #endregion
    }
}
