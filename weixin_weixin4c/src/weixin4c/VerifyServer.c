#include "weixin4c_public.h"
#include "weixin4c_private.h"

static int sort_strcmp( const void *p1 , const void *p2 )
{
	return strcmp((char*)p1,(char*)p2);
}

int VerifyServer( struct Weixin4cEnv *penv , char *signature , char *timestamp , char *nonce , char *echostr )
{
	char	etc_pathfilename[ 256 + 1 ] ;
	char	*token = NULL ;
	
	char	array[3][64] ;
	
	char	data[ 1024 + 1 ] ;
	char	result[ SHA_DIGEST_LENGTH * 2 + 1 ] ;
	char	result_exp[ SHA_DIGEST_LENGTH * 2 + 1 ] ;
	int	result_exp_len ;
	
	InfoLog( __FILE__ , __LINE__ , "--- plistQuery ---" );
	InfoLog( __FILE__ , __LINE__ , "signature[%s]" , signature );
	InfoLog( __FILE__ , __LINE__ , "timestamp[%s]" , timestamp );
	InfoLog( __FILE__ , __LINE__ , "nonce    [%s]" , nonce );
	InfoLog( __FILE__ , __LINE__ , "echostr  [%s]" , echostr );
	InfoLog( __FILE__ , __LINE__ , "------------------" );
	
	memset( etc_pathfilename , 0x00 , sizeof(etc_pathfilename) );
	snprintf( etc_pathfilename , sizeof(etc_pathfilename)-1 , "%s/etc/%s/Token" , penv->pconf->home , penv->pconf->project_name );
	PUBReadEntireFileSafely( etc_pathfilename , "r" , & token , NULL );
	PUBStringNoEnter( token );
	
	strcpy( array[0] , token );
	strcpy( array[1] , timestamp );
	strcpy( array[2] , nonce );
	qsort( array , 3 , sizeof(array[0]) , sort_strcmp );
	
	memset( data , 0x00 , sizeof(data) );
	snprintf( data , sizeof(data)-1 , "%s%s%s" , array[0] , array[1] , array[2] );
	InfoLog( __FILE__ , __LINE__ , "data[%s]" , data );
	
	memset( result , 0x00 , sizeof(result) );
	SHA1( (unsigned char *)data , strlen(data) , (unsigned char *)result );
	memset( result_exp , 0x00 , sizeof(result_exp) );
	PUBHexExpand( result , SHA_DIGEST_LENGTH , result_exp);
	result_exp_len = strlen(result_exp) ;
	InfoLog( __FILE__ , __LINE__ , "result_exp[%s]" , result_exp );
	
	if( result_exp_len == strlen(signature) && strncmp( result_exp , signature , result_exp_len ) == 0 )
	{
		InfoLog( __FILE__ , __LINE__ , "verify matched" );
		printf( "%s" , echostr );
	}
	else
	{
		ErrorLog( __FILE__ , __LINE__ , "verify not matched" );
	}
	
	free( token );
	
	return 0;
}

