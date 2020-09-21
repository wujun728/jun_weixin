using System;


namespace FokiteQQcore_http://fokite.com/
{
    /// <summary>
    /// 用于安装的类
    /// </summary>
    [RunInstaller(true)]
    public class FokiteCoreInstaller : Installer
    {
        private ServiceInstaller serviceInstaller;
        private ServiceProcessInstaller processInstaller;

        /// <summary>
        /// 用于安装的类
        /// </summary>
        public FokiteCoreInstaller()
        {
            AssemblyDescriptionAttribute description = (AssemblyDescriptionAttribute)AssemblyDescriptionAttribute.GetCustomAttribute(Assembly.GetExecutingAssembly(),typeof(AssemblyDescriptionAttribute));

            AssemblyTitleAttribute title = (AssemblyTitleAttribute)AssemblyTitleAttribute.GetCustomAttribute(Assembly.GetExecutingAssembly(),typeof(AssemblyTitleAttribute));

            AssemblyProductAttribute displayname = (AssemblyProductAttribute)AssemblyProductAttribute.GetCustomAttribute(Assembly.GetExecutingAssembly(), typeof(AssemblyProductAttribute));

            using (processInstaller = new ServiceProcessInstaller())
            {
                serviceInstaller = new ServiceInstaller();
                processInstaller.Account = ServiceAccount.LocalSystem;
                serviceInstaller.StartType = ServiceStartMode.Automatic;
                serviceInstaller.ServiceName = title.Title;
                serviceInstaller.DisplayName = displayname.Product;
                serviceInstaller.Description = description.Description;
                Installers.Add(serviceInstaller);
                Installers.Add(processInstaller);
            }
        }

        /// <summary>
        /// 安装自身
        /// </summary>
        public static void InStallSelf()
        {
            System.Collections.Hashtable installcode = new System.Collections.Hashtable();
            using (TransactedInstaller ti = new TransactedInstaller())
            {
                try
                {                    
                    AssemblyInstaller ass = new AssemblyInstaller(Assembly.GetExecutingAssembly().Location, new String[0]);
                    ti.Installers.Add(ass);
                    ti.Install(installcode);
                }
                catch
                {
                    ti.Rollback(installcode);
                }
            }
        }
    }
}
