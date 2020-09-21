using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        #region ServiveBase 成员

        /// <summary>
        /// 初始化本服务信息，无系统报告、不能暂停
        /// </summary>
        private void ConfigServiceBase()
        {
            AssemblyTitleAttribute title = (AssemblyTitleAttribute)AssemblyTitleAttribute.GetCustomAttribute(Assembly.GetExecutingAssembly(), typeof(AssemblyTitleAttribute));

            base.ServiceName = title.Title;
            base.CanHandlePowerEvent = true;
            base.CanPauseAndContinue = true;
            base.CanShutdown = true;
            base.AutoLog = false;
            base.CanStop = true;
            base.CanHandleSessionChangeEvent = false;
        }

        /// <summary>
        /// 启动服务
        /// </summary>
        /// <param name="args"></param>
        protected override void OnStart(params String[] args)
        {
            //Login(QQstatus.Away);
            if(args.LongLength != 0){
                foreach (var item in args)
                {
                    SimpleLog(String.Format("服务启动参数：{0}", item), null);
                    --badcount;
                }
            }
        }

        /// <summary>
        /// 停止服务
        /// </summary>
        protected override void OnStop()
        {
            Logout();
        }

        /// <summary>
        /// 重新恢复成5秒轮询
        /// </summary>
        protected override void OnContinue()
        {
            //此处要判断QQ当前状态
            this.ChangerStatus(QQstatus.Online);
            timers.Interval = TimeSpan.FromSeconds(5).TotalMilliseconds;
        }

        /// <summary>
        /// 轮询改为15秒，状态改为忙碌
        /// </summary>
        protected override void OnPause()
        {
            this.ChangerStatus(QQstatus.Busy);
            timers.Interval = TimeSpan.FromSeconds(15).TotalMilliseconds;
        }

        ///// <summary>
        ///// 交互什么的
        ///// </summary>
        ///// <param name="changedescription"></param>
        //protected override void OnSessionChange(SessionChangeDescription changedescription)
        //{
        //    switch (changedescription.Reason)
        //    {
        //        case SessionChangeReason.ConsoleConnect:

        //        case SessionChangeReason.ConsoleDisconnect:
        //            break;

        //        case SessionChangeReason.RemoteDisconnect:
        //            break;

        //        case SessionChangeReason.RemoteConnect:
        //            break;

        //        case SessionChangeReason.SessionRemoteControl:
        //            break;
                
        //        case SessionChangeReason.SessionLock:
        //            break;

        //        case SessionChangeReason.SessionLogoff:
        //            break;
        //        case SessionChangeReason.SessionLogon:
        //            break;

                
        //        case SessionChangeReason.SessionUnlock:
        //            break;
        //        default:
        //            break;
        //    }
        //}

        ///// <summary>
        ///// 电源事件
        ///// </summary>
        ///// <param name="pbstatus"></param>
        //protected override Boolean OnPowerEvent(PowerBroadcastStatus pbstatus)
        //{
        //    //WindowsIdentity wi = WindowsIdentity.GetCurrent();
            
        //    switch (pbstatus)
        //    {
        //        case PowerBroadcastStatus.BatteryLow:
        //            break;
        //        case PowerBroadcastStatus.OemEvent:
        //            break;
        //        case PowerBroadcastStatus.PowerStatusChange:
        //            break;
        //        case PowerBroadcastStatus.QuerySuspend:
        //            break;
        //        case PowerBroadcastStatus.QuerySuspendFailed:
        //            break;
        //        case PowerBroadcastStatus.ResumeAutomatic:
        //            break;
        //        case PowerBroadcastStatus.ResumeCritical:
        //            break;
        //        case PowerBroadcastStatus.ResumeSuspend:
        //            break;
        //        case PowerBroadcastStatus.Suspend:
        //            break;
        //        default:
        //            break;
        //    }
        //    return true;
        //}

        /// <summary>
        /// 关机退出
        /// </summary>
        protected override void OnShutdown()
        {
            this.Logout();
            base.OnShutdown();
        }

        /// <summary>
        /// 移除资源
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(Boolean disposing)
        {
            if (disposing)
            {
                Logout();
                timers.Dispose();
                NetworkChange.NetworkAvailabilityChanged -= new NetworkAvailabilityChangedEventHandler(NetworkChange_NetworkAvailabilityChanged);
                //SystemEvents.PowerModeChanged -= new PowerModeChangedEventHandler(SystemEvents_PowerModeChanged);
            }

            base.Dispose(disposing);
        }
        #endregion
    }
}
