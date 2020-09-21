#include "weixin4c.h"

int main()
{
	struct Weixin4cConfig	conf ;
	
	memset( & conf , 0x00 , sizeof(conf) );
	conf.run_mode = WEIXIN4C_RUNMODE_PRODUCT ;
	conf.home = "/home/demo" ;
	conf.project_name = "demo" ;
	conf.funcs.pfuncInitEnvProc = & InitEnvProc ;
	conf.funcs.pfuncCleanEnvProc = & CleanEnvProc ;
	conf.funcs.pfuncReceiveEventProc = & ReceiveEventProc ;
	conf.funcs.pfuncReceiveEventProc = & ReceiveEventProc ;
	conf.funcs.pfuncReceiveTextProc = & ReceiveTextProc ;
	conf.funcs.pfuncReceiveImageProc = & ReceiveImageProc ;
	conf.funcs.pfuncReceiveVoiceProc = & ReceiveVoiceProc ;
	conf.funcs.pfuncReceiveVideoProc = & ReceiveVideoProc ;
	conf.funcs.pfuncReceiveShortVideoProc = & ReceiveShortVideoProc ;
	conf.funcs.pfuncReceiveLocationProc = & ReceiveLocationProc ;
	conf.funcs.pfuncReceiveLinkProc = & ReceiveLinkProc ;
	
	return -weixin4c( & conf );
}

