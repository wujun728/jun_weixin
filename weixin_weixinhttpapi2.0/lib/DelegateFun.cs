using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;
using System.Reflection;

//veelee 2006.8.1
namespace HttpSocket
{
    public class DelegateFun
    {
        #region
        delegate void delegateSetControlValue(Control ctl, string key, object value);
        delegate object delegateGetControlValue(Control ctl, string key);

       

        static void _FunSetControlValue(Control ctl, string key, object value)
        {
            if (ctl.InvokeRequired)
                ctl.Invoke(new delegateSetControlValue(_FunSetControlValue), new object[] { ctl, key, value });
            else
                ctl.GetType().GetProperty(key).SetValue(ctl, value, null);
        }

        static object _FunGetControlValue(Control ctl, string key)
        {
            if (ctl.InvokeRequired)
                return ctl.Invoke(new delegateGetControlValue(_FunGetControlValue), new object[] { ctl, key });
            else
                return ctl.GetType().GetProperty(key).GetValue(ctl, null);
        }

        public static void SetControlValue(Control _this, Control ctl, string key, object value)
        {
            _this.Invoke(
              new delegateSetControlValue(_FunSetControlValue),
              ctl,
              key,
              value
              );
        }

        public static object GetControlValue(Control _this, Control ctl, string key)
        {
            return _this.Invoke(
              new delegateGetControlValue(_FunGetControlValue),
              ctl,
              key
              );
        }
        #endregion

        #region
        delegate void delegateSetControlValueInvokeRequired(object ctl,  string key, object value);
        delegate object delegateGetControlValueInvokeRequired(object ctl, string key);

        static void _FunSetControlValueInvokeRequired(object ctl, string key, object value)
        {
            ctl.GetType().GetProperty(key).SetValue(ctl,value,null);
        }

        static object _FunGetControlValueInvokeRequired(object ctl, string key)
        {
            return ctl.GetType().GetProperty(key).GetValue(ctl, null);
        }

        public static void SetControlValue(Control InvokeRequiredCtl, object ctl, string key, object value)
        {
            if (InvokeRequiredCtl.InvokeRequired)
            {
                InvokeRequiredCtl.Invoke(new delegateSetControlValueInvokeRequired(_FunSetControlValueInvokeRequired), new object[] { ctl, key, value });
            }
            else
                ctl.GetType().GetProperty(key).SetValue(ctl, value, null);
        }

        public static object GetControlValue(Control InvokeRequiredCtl, object ctl, string key)
        {
            if (InvokeRequiredCtl.InvokeRequired)
            {
                return InvokeRequiredCtl.Invoke(new delegateGetControlValueInvokeRequired(_FunGetControlValueInvokeRequired), new object[] { ctl, key });
            }
            else
                return ctl.GetType().GetProperty(key).GetValue(ctl, null);
        }
        #endregion

        //下面再加入一个执行方法的
        public delegate void delegateExeControlFun();
        public static void ExeControlFun(Control InvokeRequiredCtl, Delegate del)
        {
            if (InvokeRequiredCtl.InvokeRequired)
            {
                InvokeRequiredCtl.Invoke(del);
            }
            else
                del.DynamicInvoke();
        }
    }
}
