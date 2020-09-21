#ifndef _H_PUBLIC_
#define _H_PUBLIC_

#include "fcgi_stdio.h"
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <math.h>
#include <dlfcn.h>
#include <iconv.h>
#include <stdarg.h>

#include "LOGC.h"

#include "curl/curl.h"

#ifndef MAX
#define MAX(_a_,_b_) (_a_>_b_?_a_:_b_)
#endif

#ifndef MIN
#define MIN(_a_,_b_) (_a_<_b_?_a_:_b_)
#endif

char *PUBStringNoEnter( char *str );
int PUBHexExpand( char *HexBuf , int HexBufLen , char *AscBuf );
void PUBTakeoffCDATA( char *str_with_cdata );
int PUBCountChar( char *str , char ch );
int PUBTrimTailChar( char *str , char ch );
int PUBTrimHeadCharset( char *str , char *charset );
int PUBTrimHead( char *str );
int PUBTrimTail( char *str );
int PUBTrim( char *str );
int PUBSnprintF( char *str , size_t size , const char *format , ... );
void PUBSrand();
int PUBRand( int min, int max );

int PUBReadEntireFile( char *filename , char *mode , char *p_buf , long *p_file_size );
int PUBReadEntireFileSafely( char *filename , char *mode , char **pp_buf , long *p_file_size );
int PUBWriteEntireFile( char *filename , char *mode , char *p_buf , long file_size );

int PUBConvCharacterCodeEx( char *from_character_code , char *in_buf , int in_len , char *to_character_code , char *out_buf , int out_len );
int PUBConvCharacterCode( char *from_character_code , char *to_character_code , char *buf , int len , int size );
char *PUBConvCharacterCodeStatic( char *from_character_code , char *to_character_code , char *buf , int len );
void PUBFreeCharacterCodeStatic();
int PUBDupConvCharacterCode( char *from_character_code , char *to_character_code , char *buf , int len , char **out_dup );

/*
int PUBDecodingUnicode( char *str );
*/

#define WEIXIN5C_URLOPTIONS_STRING_LOCATION	0x01
#define WEIXIN5C_URLOPTIONS_STRINGNEEDED	0x00
#define WEIXIN5C_URLOPTIONS_FULLSTRING		0x01

#define WEIXIN5C_URLOPTIONS_OVERFLOW_LOCATION	0x02
#define WEIXIN5C_URLOPTIONS_OVERFLOW_ERROR	0x00
#define WEIXIN5C_URLOPTIONS_OVERFLOW_TRIM	0x02

int PUBGetUrlParamPtr( char *key , char **pp_value , int *p_value_len );
int PUBGetUrlParam( char *key , char *value , int value_size );
int PUBDupUrlParam( char *key , char **pp_value );

int PUBUrlExpand( char *str , char *expand , int *p_expand_len , unsigned long options );

void PUBSendContentTypeHtml();

int PUBReallocPostBuffer( int post_len );
int PUBReadPostBuffer();
char *PUBGetPostBufferPtr();
int PUBGetPostBufferLength();
void PUBFreePostBuffer();

struct CurlResponseBuffer
{
	int		buf_size ;
	int		str_len ;
	char		*base ;
} ;

size_t CurlResponseProc( char *buffer , size_t size , size_t nmemb , void *p );
void CurlCleanBuffer( struct CurlResponseBuffer *pbuf );
void CurlFreeBuffer( struct CurlResponseBuffer *pbuf );

#endif

