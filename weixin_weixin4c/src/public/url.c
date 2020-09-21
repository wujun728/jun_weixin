#include "weixin4c_public.h"

int PUBGetUrlParamPtr( char *key , char **pp_value , int *p_value_len )
{
	char	*QUERY_STRING = NULL ;
	char	*value = NULL ;
	char	*p = NULL ;
	
	QUERY_STRING = getenv("QUERY_STRING") ;
	if( QUERY_STRING == NULL )
		return -1;
	
	value = strstr( QUERY_STRING , key ) ;
	if( value == NULL )
		return -2;
	
	if( value != QUERY_STRING && (*(value-1)) != '&' )
		return -3;
	
	value += strlen(key) ;
	
	if( (*value) != '=' )
		return -4;
	
	value++;
	
	for( p = value ; (*p) && (*p) != '&' ; p++ )
		;
	if( pp_value )
		(*pp_value) = value ;
	if( p_value_len )
		(*p_value_len) = p - (*pp_value) ;
	
	return 0;
}

int PUBGetUrlParam( char *key , char *value , int value_size )
{
	char	*p_value = NULL ;
	int	value_len ;
	
	int	nret = 0 ;
	
	nret = PUBGetUrlParamPtr( key , & p_value , & value_len ) ;
	if( nret )
		return nret;
	
	if( value_len > value_size-1 )
		return -5;
	
	memset( value , 0x00 , value_size );
	memcpy( value , p_value , value_len );
	
	return 0;
}

int PUBDupUrlParam( char *key , char **pp_value )
{
	char	*p_value = NULL ;
	int	value_len ;
	
	int	nret = 0 ;
	
	nret = PUBGetUrlParamPtr( key , & p_value , & value_len ) ;
	if( nret )
		return nret;
	
	if( pp_value )
	{
		(*pp_value) = strndup( p_value , value_len ) ;
		if( (*pp_value) == NULL )
			return -5;
	}
	
	return 0;
}

int PUBUrlExpand( char *str , char *expand , int *p_expand_len , unsigned long options )
{
	int		len ;
	unsigned char	*p = NULL ;
	char		charset[] = "0123456789abcdefghijklmnopqrstuvwxyz" ;
	
	for( p = (unsigned char *)str , len = 0 ; (*p) ; p++ )
	{
		if( ( options & WEIXIN5C_URLOPTIONS_STRING_LOCATION ) == WEIXIN5C_URLOPTIONS_FULLSTRING )
		{
			if( len + 3 > (*p_expand_len) )
			{
				if( ( options & WEIXIN5C_URLOPTIONS_OVERFLOW_LOCATION ) == WEIXIN5C_URLOPTIONS_OVERFLOW_ERROR )
					return -1;
				else
					return 0;
			}
			
			expand[0] = '%' ;
			expand[1] = charset[(((*p)&0xF0)>>4)] ;
			expand[2] = charset[((*p)&0x0F)] ;
			len += 3 ;
			expand += 3 ;
		}
		else
		{
			if( isalnum(*p) )
			{
				if( len + 1 > (*p_expand_len) )
				{
					if( ( options & WEIXIN5C_URLOPTIONS_OVERFLOW_LOCATION ) == WEIXIN5C_URLOPTIONS_OVERFLOW_ERROR )
						return -1;
					else
						return 0;
				}
				
				expand[0] = p[0] ;
				len += 1 ;
				expand += 1 ;
			}
			else if( (*p) == ' ' )
			{
				expand[0] = '+' ;
				len += 1 ;
				expand += 1 ;
			}
			else
			{
				if( len + 3 > (*p_expand_len) )
				{
					if( ( options & WEIXIN5C_URLOPTIONS_OVERFLOW_LOCATION ) == WEIXIN5C_URLOPTIONS_OVERFLOW_ERROR )
						return -1;
					else
						return 0;
				}
				
				expand[0] = '%' ;
				expand[1] = charset[(((*p)&0xF0)>>4)] ;
				expand[2] = charset[((*p)&0x0F)] ;
				len += 3 ;
				expand += 3 ;
			}
		}
		
	}
	
	return 0;
}

