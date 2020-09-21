#include "weixin4c_public.h"

#include "IDL_accesstoken.dsc.h"

static int AccessToken( char *project_name , int loop_flag )
{
	char				etc_pathfilename[ 256 + 1 ] ;
	char				*AppID = NULL ;
	char				*AppSecret = NULL ;
	
	CURL				*curl = NULL ;
	CURLcode			res ;
	char				url[ 1024 + 1 ] ;
	struct CurlResponseBuffer	buf ;
	accesstoken			at ;
	
	int				nret = 0 ;
	
	curl_global_init( CURL_GLOBAL_ALL );
	
	memset( & buf , 0x00 , sizeof(struct CurlResponseBuffer) );
	
	memset( & at , 0x00 , sizeof(accesstoken) );
	
	do
	{
		InfoLog( __FILE__ , __LINE__ , "sleep [%d]seconds ..." , at.expires_in / 2 );
		sleep( at.expires_in / 2 );
		InfoLog( __FILE__ , __LINE__ , "sleep [%d]seconds done" , at.expires_in / 2 );
		
		memset( etc_pathfilename , 0x00 , sizeof(etc_pathfilename) );
		SNPRINTF( etc_pathfilename , sizeof(etc_pathfilename)-1 , "%s/etc/%s/AppID" , getenv("HOME") , project_name );
		PUBReadEntireFileSafely( etc_pathfilename , "r" , & AppID , NULL );
		PUBStringNoEnter( AppID );
		InfoLog( __FILE__ , __LINE__ , "AppID[%s]" , AppID );
		
		memset( etc_pathfilename , 0x00 , sizeof(etc_pathfilename) );
		SNPRINTF( etc_pathfilename , sizeof(etc_pathfilename)-1 , "%s/etc/%s/AppSecret" , getenv("HOME") , project_name );
		PUBReadEntireFileSafely( etc_pathfilename , "r" , & AppSecret , NULL);
		PUBStringNoEnter( AppSecret );
		InfoLog( __FILE__ , __LINE__ , "AppSecret[%s]" , AppSecret );
		
		curl = curl_easy_init() ;
		if( curl == NULL )
		{
			ErrorLog( __FILE__ , __LINE__ , "curl_easy_init failed" );
			break;
		}
		
		memset( url , 0x00 , sizeof(url) );
		SNPRINTF( url , sizeof(url)-1 , "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s" , AppID , AppSecret );
		curl_easy_setopt( curl , CURLOPT_URL , url );
		
		curl_easy_setopt( curl , CURLOPT_WRITEFUNCTION , & CurlResponseProc );
		if( buf.buf_size )
		{
			memset( buf.base , 0x00 , buf.buf_size );
			buf.str_len = 0 ;
		}
		curl_easy_setopt( curl , CURLOPT_WRITEDATA , (void*) & buf );
		
		InfoLog( __FILE__ , __LINE__ , "curl_easy_perform[%s] ..." , url );
		res = curl_easy_perform( curl );
		InfoLog( __FILE__ , __LINE__ , "curl_easy_perform[%s] return[%d]" , url , res );
		curl_easy_cleanup( curl );
		if( res == CURLE_OK )
		{
			memset( & at , 0x00 , sizeof(accesstoken) );
			nret = DSCDESERIALIZE_JSON_accesstoken( NULL , buf.base , & (buf.str_len) , & at ) ;
			if( nret )
			{
				ErrorLog( __FILE__ , __LINE__ , "DSCDESERIALIZE_JSON_accesstoken failed[%d] , json[%.*s]" , nret , buf.str_len , buf.base );
				break;
			}
			else
			{
				InfoLog( __FILE__ , __LINE__ , "DSCDESERIALIZE_JSON_accesstoken ok , json[%.*s]" , buf.str_len , buf.base );
			}
			
			memset( etc_pathfilename , 0x00 , sizeof(etc_pathfilename) );
			SNPRINTF( etc_pathfilename , sizeof(etc_pathfilename)-1 , "%s/etc/%s/AccessToken" , getenv("HOME") , project_name );
			PUBWriteEntireFile( etc_pathfilename , "w" , at.access_token , -1 );
			InfoLog( __FILE__ , __LINE__ , "write[%s] to file[%s]" , at.access_token , etc_pathfilename );
		}
		
		free( AppID ); AppID = NULL ;
		free( AppSecret ); AppSecret = NULL ;
	}
	while( loop_flag );
	
	curl_global_cleanup();
	
	if( AppID )
	{
		free( AppID ); AppID = NULL ;
	}
	if( AppSecret )
	{
		free( AppSecret );  AppSecret = NULL ;
	}
	
	if( buf.base )
	{
		free( buf.base ); buf.base = NULL ;
		buf.buf_size = 0 ;
		buf.str_len = 0 ;
	}
	
	return 0;
}

static void usage()
{
	printf( "USAGE : access_token project_name once_flag\n" );
	printf( "                     once_flag : 0 : fetch once\n" );
	printf( "                                 1 : fetch for-ever\n" );
	return;
}

int main( int argc , char *argv[] )
{
	if( argc == 1 + 2 )
	{
		SetLogFile( "%s/log/%s_accesstoken.log" , getenv("HOME") , argv[1] );
		SetLogLevel( LOGLEVEL_DEBUG );
		
		return -AccessToken( argv[1] , atoi(argv[2]) );
	}
	else
	{
		usage();
		exit(9);
	}
}

