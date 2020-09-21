#include "weixin4c_public.h"

size_t CurlResponseProc( char *buffer , size_t size , size_t nmemb , void *p )
{
	struct CurlResponseBuffer	*buf = (struct CurlResponseBuffer *)p ;
	
	if( (int)(size*nmemb) > buf->buf_size-1 - buf->str_len )
	{
		char	*tmp = NULL ;
		int	new_buf_size ;
		if( size * nmemb <= 4096 )
			new_buf_size = buf->buf_size + 4096 ;
		else
			new_buf_size = buf->buf_size + size * nmemb ;
		tmp = realloc( buf->base , new_buf_size ) ;
		if( tmp == NULL )
		{
			ErrorLog( __FILE__ , __LINE__ , "realloc failed , errno[%d]" , errno );
			return -1;
		}
		buf->base = tmp ;
		buf->buf_size = new_buf_size ;
		memset( buf->base + buf->str_len , 0x00 , buf->buf_size - buf->str_len );
	}
	
	memcpy( buf->base + buf->str_len , buffer , size*nmemb );
	buf->str_len += size*nmemb ;
	return size*nmemb;
}

void CurlCleanBuffer( struct CurlResponseBuffer *pbuf )
{
	if( pbuf->base )
	{
		memset( pbuf->base , 0x00 , pbuf->buf_size );
		pbuf->str_len = 0 ;
	}
}

void CurlFreeBuffer( struct CurlResponseBuffer *pbuf )
{
	if( pbuf && pbuf->base )
	{
		free( pbuf->base );
		memset( pbuf , 0x00 , sizeof(struct CurlResponseBuffer) );
	}
	
	return;
}

