#ifndef _H_FASTERXML_
#define _H_FASTERXML_

#ifdef __cplusplus
extern "C" {
#endif

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* util */

#if ( defined _WIN32 )
#ifndef _WINDLL_FUNC
#define _WINDLL_FUNC		_declspec(dllexport)
#endif
#elif ( defined __unix ) || ( defined __linux__ )
#ifndef _WINDLL_FUNC
#define _WINDLL_FUNC
#endif
#endif

#define XMLESCAPE_EXPAND(_buf_,_buf_len_,_buf_remain_len_)		\
	if( (_buf_len_) > 0 )						\
	{								\
		int	_newlen_ ;					\
		for( _newlen_ = 0 ; _newlen_ < (_buf_len_) ; )		\
		{							\
			if( *(_buf_) == '<' )				\
			{						\
				if( (_buf_remain_len_) < 4-1 )		\
				{					\
					(_buf_len_) = -1 ;		\
					break;				\
				}					\
				else if( memcmp((_buf_)+1,"![CDATA[",8) == 0 )	\
				{						\
					(_buf_) += (_buf_len_) ;		\
					(_buf_remain_len_) -= (_buf_len_) ;	\
					break;					\
				}						\
				memmove( (_buf_)+4 , (_buf_)+1 , (_buf_len_)-_newlen_-1 );	\
				memcpy( (_buf_) , "&lt;" , 4 );		\
				(_buf_) += 4 ;				\
				(_buf_len_) += 4-1 ;			\
				_newlen_ += 4 ;				\
				(_buf_remain_len_) -= 4-1 ;		\
			}						\
			else if( *(_buf_) == '&' )			\
			{						\
				if( (_buf_remain_len_) < 5-1 )		\
				{					\
					(_buf_len_) = -1 ;		\
					break;				\
				}					\
				memmove( (_buf_)+5 , (_buf_)+1 , (_buf_len_)-_newlen_-1 );	\
				memcpy( (_buf_) , "&amp;" , 5 );	\
				(_buf_) += 5 ;				\
				(_buf_len_) += 5-1 ;			\
				_newlen_ += 5 ;				\
				(_buf_remain_len_) -= 5-1 ;		\
			}						\
			else if( *(_buf_) == '>' )			\
			{						\
				if( (_buf_remain_len_) < 4-1 )		\
				{					\
					(_buf_len_) = -1 ;		\
					break;				\
				}					\
				memmove( (_buf_)+4 , (_buf_)+1 , (_buf_len_)-_newlen_-1 );	\
				memcpy( (_buf_) , "&gt;" , 4 );		\
				(_buf_) += 4 ;				\
				(_buf_len_) += 4-1 ;			\
				_newlen_ += 4 ;				\
				(_buf_remain_len_) -= 4-1 ;		\
			}						\
			else						\
			{						\
				_newlen_++;				\
				(_buf_)++;				\
				(_buf_remain_len_)--;			\
			}						\
		}							\
	}								\

#define XMLUNESCAPE_FOLD(_src_,_src_len_,_dst_)				\
	if( (_src_len_) > 0 )						\
	{								\
		char	*_p_src_ = (_src_) ;				\
		char	*_p_src_end_ = (_src_) + (_src_len_) - 1 ;	\
		char	*_p_dst_ = (_dst_) ;				\
		for( (_src_len_) = 0 ; (_p_src_) <= _p_src_end_ ; )	\
		{							\
			if( strncmp( (_p_src_) , "&lt;" , 4 ) == 0 )	\
			{						\
				*(_p_dst_) = '<' ;			\
				(_p_dst_)++;				\
				(_p_src_) += 4 ;			\
				(_src_len_)++;				\
			}						\
			else if( strncmp( (_p_src_) , "&amp;" , 5 ) == 0 )	\
			{						\
				*(_p_dst_) = '&' ;			\
				(_p_dst_)++;				\
				(_p_src_) += 5 ;			\
				(_src_len_)++;				\
			}						\
			else if( strncmp( (_p_src_) , "&gt;" , 4 ) == 0 )	\
			{						\
				*(_p_dst_) = '>' ;			\
				(_p_dst_)++;				\
				(_p_src_) += 4 ;			\
				(_src_len_)++;				\
			}						\
			else						\
			{						\
				*(_p_dst_) = *(_p_src_) ;		\
				(_p_dst_)++;				\
				(_p_src_)++;				\
				(_src_len_)++;				\
			}						\
		}							\
	}								\

/* fastxml */

#define FASTERXML_ERROR_ALLOC			-9
#define FASTERXML_ERROR_INTERNAL		-11
#define FASTERXML_ERROR_FILENAME		-14
#define FASTERXML_ERROR_TOO_MANY_SKIPTAGS	-15
#define FASTERXML_ERROR_XML_INVALID		-100

#define FASTERXML_NODE_BRANCH		0x10
#define FASTERXML_NODE_LEAF		0x20
#define FASTERXML_NODE_ENTER		0x01
#define FASTERXML_NODE_LEAVE		0x02

typedef int funcCallbackOnXmlProperty( char *xpath , int xpath_len , int xpath_size , char *propname , int propname_len , char *propvalue , int propvalue_len , void *p );
_WINDLL_FUNC int TravelXmlPropertiesBuffer( char *properties , int properties_len , char *xpath , int xpath_len , int xpath_size
					   , funcCallbackOnXmlProperty *pfuncCallbackOnXmlProperty
					   , void *p );

typedef int funcCallbackOnXmlNode( int type , char *xpath , int xpath_len , int xpath_size , char *node , int node_len , char *properties , int properties_len , char *content , int content_len , void *p );
_WINDLL_FUNC int TravelXmlBuffer( char *xml_buffer , char *xpath , int xpath_size
				 , funcCallbackOnXmlNode *pfuncCallbackOnXmlNode
				 , void *p );
_WINDLL_FUNC int TravelXmlBuffer4( char *xml_buffer , char *xpath , int xpath_size
				 , funcCallbackOnXmlNode *pfuncCallbackOnXmlNode
				 , funcCallbackOnXmlNode *pfuncCallbackOnEnterXmlNode
				 , funcCallbackOnXmlNode *pfuncCallbackOnLeaveXmlNode
				 , funcCallbackOnXmlNode *pfuncCallbackOnXmlLeaf
				 , void *p );

_WINDLL_FUNC int AddSkipXmlTag( char *tag );
_WINDLL_FUNC void CleanSkipXmlTags();

#ifdef __cplusplus
}
#endif

#endif

