#ifndef _H_WEIXIN4C_PRIVATE_
#define _H_WEIXIN4C_PRIVATE_

#include "weixin4c_public.h"
#include "weixin4c.h"

#include "openssl/sha.h"

struct Weixin4cEnv
{
	struct Weixin4cConfig	*pconf ;
} ;

int VerifyServer( struct Weixin4cEnv *penv , char *signature , char *timestamp , char *nonce , char *echostr );
int ReceiveEvent( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveText( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveImage( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveVoice( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveVideo( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveShortVideo( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveLocation( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );
int ReceiveLink( struct Weixin4cEnv *penv , char *post_data , int post_data_len , xml *p_req );

#endif

