#include "weixin4c_public.h"

int PUBReadEntireFile( char *filename , char *mode , char *p_buf , long *p_file_size )
{
	FILE	*fp = NULL ;
	long	file_size ;
	int	n ;
	
	fp = fopen( filename , mode ) ;
	if( fp == NULL )
	{
		return -1;
	}
	
	fseek( fp , 0 , SEEK_END );
	file_size = ftell( fp ) ;
	fseek( fp , 0 , SEEK_SET );
	
	if( p_file_size && (*p_file_size) < file_size )
		file_size = (*p_file_size) ;
	
	memset( p_buf , 0x00 , file_size + 1 );
	n = (int)fread( p_buf , file_size , 1 , fp ) ;
	if( n != 1 )
	{
		fclose( fp );
		return -2;
	}
	
	fclose( fp );
	
	if( p_file_size )
		(*p_file_size) = file_size ;
	
	return 0;
}

int PUBReadEntireFileSafely( char *filename , char *mode , char **pp_buf , long *p_file_size )
{
	FILE	*fp = NULL ;
	long	file_size ;
	char	*p_buf = NULL ;
	int	n ;
	
	fp = fopen( filename , mode ) ;
	if( fp == NULL )
	{
		return -1;
	}
	
	fseek( fp , 0 , SEEK_END );
	file_size = ftell( fp ) ;
	p_buf = (char*)malloc( file_size + 1 ) ;
	if( p_buf == NULL )
	{
		fclose( fp );
		return -2;
	}
	memset( p_buf , 0x00 , file_size + 1 );
	
	fseek( fp , 0 , SEEK_SET );
	
	n = (int)fread( p_buf , file_size , 1 , fp ) ;
	if( n != 1 )
	{
		free( p_buf );
		fclose( fp );
		return -2;
	}
	
	fclose( fp );
	
	if( pp_buf )
		(*pp_buf) = p_buf ;
	else
		free( p_buf );
	if( p_file_size )
		(*p_file_size) = file_size ;
	
	return 0;
}

int PUBWriteEntireFile( char *filename , char *mode , char *p_buf , long file_size )
{
	FILE	*fp = NULL ;
	int	n ;
	
	fp = fopen( filename , mode ) ;
	if( fp == NULL )
	{
		return -1;
	}
	
	if( file_size >= 0 )
	{
		n = (int)fwrite( p_buf , file_size , 1 , fp );
		if( n != 1 )
		{
			return -2;
		}
	}
	else
	{
		fprintf( fp , "%s" , p_buf );
	}
	
	fclose( fp );
	
	return 0;
}

