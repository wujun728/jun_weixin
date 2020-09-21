#include "weixin4c_public.h"

int PUBConvCharacterCodeEx( char *from_character_code , char *in_buf , int in_len , char *to_character_code , char *out_buf , int out_len )
{
	char	*in_ptr = NULL ;
	char	*out_ptr = NULL ;
	size_t	in_left ;
	size_t	out_left ;
	iconv_t	v ;
	size_t	r ;
	int	converted ;
	
	in_ptr = in_buf ;
	in_left = in_len ;
	out_ptr = out_buf ;
	out_left = out_len ;
	
	v = iconv_open( to_character_code , from_character_code ) ;
	if( v == (iconv_t)-1 )
		return -1;
	
	r = iconv( v , & in_ptr , & in_left , & out_ptr , & out_left ) ;
	iconv_close( v );
	if( r == (size_t)-1 )
		return -2;
	
	converted = out_len - (int)out_left ;
	out_buf[ out_len-out_left ] = '\0' ;
	
	return out_len-out_left;
}

int PUBConvCharacterCode( char *from_character_code , char *to_character_code , char *buf , int len , int size )
{
	char	*tmp = NULL ;
	int	converted ;
	
	tmp = (char*)malloc( size ) ;
	if( tmp == NULL )
		return -5;
	memset( tmp , 0x00 , size );
	
	if( len == -1 )
		len = strlen( buf ) ;
	converted = PUBConvCharacterCodeEx( from_character_code , buf , len , to_character_code , tmp , size-1 ) ;
	if( converted >= 0 )
	{
		memcpy( buf , tmp , converted );
		buf[ converted ] = '\0' ;
	}
	free( tmp );
	
	return converted;
}

int PUBDupConvCharacterCode( char *from_character_code , char *to_character_code , char *buf , int len , char **out_dup )
{
	int	size ;
	char	*tmp = NULL ;
	int	converted ;
	
	size = len * 2 + 1 ;
	
	tmp = (char*)malloc( size ) ;
	if( tmp == NULL )
		return -5;
	memset( tmp , 0x00 , size );
	
	if( len == -1 )
		len = strlen( buf ) ;
	converted = PUBConvCharacterCodeEx( from_character_code , buf , len , to_character_code , tmp , size-1 ) ;
	if( converted >= 0 )
	{
		if( out_dup )
		{
			(*out_dup) = tmp ;
		}
	}
	
	return converted;
}

/*
int PUBDecodingUnicode( char *str )
{
	char	*p = NULL ;
	char	charset[] = "0123456789abcdef" ;
	
	while(1)
	{
		p = strstr( str , "\\u" ) ;
		if( p == NULL )
			break;
		
		p[0] = ((strchr(charset,*(p+4))-charset)<<4) + (strchr(charset,*(p+5))-charset) ;
		p[1] = ((strchr(charset,*(p+2))-charset)<<4) + (strchr(charset,*(p+3))-charset) ;
		memmove( p+2 , p+6 , strlen(p+6)+1 );
	}
	
	return strlen(str);
}
*/

