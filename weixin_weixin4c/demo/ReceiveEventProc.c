#include "weixin4c.h"

funcReceiveEventProc ReceiveEventProc ;
int ReceiveEventProc( void *user_data , xml *p_req , char *output_buffer , int *p_output_buflen , int *p_output_bufsize )
{
	if( strcmp( p_req->Event , "<![CDATA[subscribe]]>" ) == 0 )
	{
		(*p_output_buflen) += snprintf( output_buffer+(*p_output_buflen) , (*p_output_bufsize)-1 - (*p_output_buflen) ,
			"欢迎订阅"
			);
	}
	else if( strcmp( p_req->Event , "<![CDATA[unsubscribe]]>" ) == 0 )
	{
		(*p_output_buflen) += snprintf( output_buffer+(*p_output_buflen) , (*p_output_bufsize)-1 - (*p_output_buflen) ,
			"再见"
			);
	}
	
	InfoLog( __FILE__ , __LINE__ , "文本编码前[%s]" , output_buffer );
	(*p_output_buflen) = PUBConvCharacterCode( "GB18030" , "UTF-8" , output_buffer , (*p_output_buflen) , (*p_output_bufsize) );
	if( (*p_output_buflen) < 0 )
	{
		ErrorLog( __FILE__ , __LINE__ , "PUBConvCharacterCode failed[%d]" , (*p_output_buflen) );
		return -1;
	}
	InfoLog( __FILE__ , __LINE__ , "文本编码后[%s]" , output_buffer );
	
	return 0;
}

