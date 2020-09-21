#ifndef _H_WEIXIN4C_
#define _H_WEIXIN4C_

#include "weixin4c_public.h"

#include "IDL_xml.dsc.h"

typedef int funcInitEnvProc( void *user_data );
typedef int funcCleanEnvProc( void *user_data );
funcInitEnvProc InitEnvProc ;
funcCleanEnvProc CleanEnvProc ;

typedef int funcReceiveEventProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
funcReceiveEventProc ReceiveEventProc ;

typedef int funcReceiveTextProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveImageProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveVoiceProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveVideoProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveShortVideoProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveLocationProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
typedef int funcReceiveLinkProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize );
funcReceiveTextProc ReceiveTextProc ;
funcReceiveImageProc ReceiveImageProc ;
funcReceiveVoiceProc ReceiveVoiceProc ;
funcReceiveVideoProc ReceiveVideoProc ;
funcReceiveShortVideoProc ReceiveShortVideoProc ;
funcReceiveLocationProc ReceiveLocationProc ;
funcReceiveLinkProc ReceiveLinkProc ;

struct Weixin4cProcFuncs
{
	funcInitEnvProc			*pfuncInitEnvProc ;
	funcCleanEnvProc		*pfuncCleanEnvProc ;
	
	funcReceiveEventProc		*pfuncReceiveEventProc ;
	
	funcReceiveTextProc		*pfuncReceiveTextProc ;
	funcReceiveImageProc		*pfuncReceiveImageProc ;
	funcReceiveVoiceProc		*pfuncReceiveVoiceProc ;
	funcReceiveVideoProc		*pfuncReceiveVideoProc ;
	funcReceiveShortVideoProc	*pfuncReceiveShortVideoProc ;
	funcReceiveLocationProc		*pfuncReceiveLocationProc ;
	funcReceiveLinkProc		*pfuncReceiveLinkProc ;
} ;

#define WEIXIN4C_RUNMODE_DEBUG		1
#define WEIXIN4C_RUNMODE_PRODUCT	0

struct Weixin4cConfig
{
	int				run_mode ;
	char				*home ;
	char				*project_name ;
	void				*user_data ;
	
	struct Weixin4cProcFuncs	funcs ;
} ;

int weixin4c( struct Weixin4cConfig *pconf );

#endif

