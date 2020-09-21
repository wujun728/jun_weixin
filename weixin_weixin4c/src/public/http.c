#include "weixin4c_public.h"

void PUBSendContentTypeHtml()
{
	printf("Content-type: text/html\r\n\r\n");
	return;
}

char	*g_post_buffer = NULL ;
int	g_post_buffer_size = 0 ;
int	g_post_buffer_len = 0 ;

int PUBReallocPostBuffer( int post_len )
{
	if( g_post_buffer == NULL || post_len+1 > g_post_buffer_size )
	{
		char	*tmp = NULL ;
		
		tmp = (char*)realloc( g_post_buffer , post_len+1 ) ;
		if( tmp == NULL )
			return -1;
		g_post_buffer = tmp ;
		g_post_buffer_size = post_len+1 ;
		g_post_buffer_len = 0 ;
	}
	
	memset( g_post_buffer , 0x00 , g_post_buffer_size );
	
	return 0;
}

int PUBReadPostBuffer()
{
	char		*p = NULL ;
	int		post_len ;
	int		read_remain_len ;
	int		read_len ;
	int		len ;
	
	int		nret = 0 ;
	
	p = getenv("CONTENT_LENGTH") ;
	if( p == NULL )
	{
		PUBFreePostBuffer();
		return -1;
	}
	post_len = atoi(p) ;
	nret = PUBReallocPostBuffer( post_len ) ;
	if( nret )
		return nret;
	
	read_remain_len = post_len ;
	read_len = 0 ;
	while( read_remain_len > 0 )
	{
		len = FCGI_fread( g_post_buffer + read_len , 1 , read_remain_len , FCGI_stdin ) ;
		if( len == 0 )
			break;
		read_remain_len -= len ;
		read_len += len ;
	}
	
	g_post_buffer_len = read_len ;
	
	return 0;
}

char *PUBGetPostBufferPtr()
{
	return g_post_buffer;
}

int PUBGetPostBufferLength()
{
	return g_post_buffer_len;
}

void PUBFreePostBuffer()
{
	if( g_post_buffer )
	{
		free(g_post_buffer);
		g_post_buffer = NULL ;
		g_post_buffer_size = 0 ;
		g_post_buffer_len = 0 ;
	}
	
	return;
}

