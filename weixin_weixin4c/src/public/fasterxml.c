#include "fasterxml.h"

#ifndef STRCMP
#define STRCMP(_a_,_C_,_b_) ( strcmp(_a_,_b_) _C_ 0 )
#define STRNCMP(_a_,_C_,_b_,_n_) ( strncmp(_a_,_b_,_n_) _C_ 0 )
#endif

#ifndef STRICMP
#if ( defined _WIN32 )
#define STRICMP(_a_,_C_,_b_) ( stricmp(_a_,_b_) _C_ 0 )
#define STRNICMP(_a_,_C_,_b_,_n_) ( strnicmp(_a_,_b_,_n_) _C_ 0 )
#elif ( defined __unix ) || ( defined __linux )
#define STRICMP(_a_,_C_,_b_) ( strcasecmp(_a_,_b_) _C_ 0 )
#define STRNICMP(_a_,_C_,_b_,_n_) ( strncasecmp(_a_,_b_,_n_) _C_ 0 )
#endif
#endif

#ifndef MAX
#define MAX(_a_,_b_) (_a_>_b_?_a_:_b_)
#endif

int __FASTERXML_VERSION_1_0_3 ;

#define MAXCNT_SKIPTAG		16

char	*g_pcSkipXmlTags[ MAXCNT_SKIPTAG + 1 ] = { NULL } ;
int	g_nSkipXmlTagsLen[ MAXCNT_SKIPTAG + 1 ] = { 0 } ;
int	g_nSkipXmlTagCount = 0 ;

#define FASTERXML_INFO_END_OF_BUFFER		13

int AddSkipXmlTag( char *tag )
{
	if( g_nSkipXmlTagCount + 1 > MAXCNT_SKIPTAG )
		return FASTERXML_ERROR_TOO_MANY_SKIPTAGS;
	
	g_pcSkipXmlTags[g_nSkipXmlTagCount] = strdup( tag ) ;
	if( g_pcSkipXmlTags[g_nSkipXmlTagCount] == NULL )
		return FASTERXML_ERROR_ALLOC;
	g_nSkipXmlTagsLen[g_nSkipXmlTagCount] = strlen(g_pcSkipXmlTags[g_nSkipXmlTagCount]) ;
	
	g_nSkipXmlTagCount++;
	
	return 0;
}

void CleanSkipXmlTags()
{
	for( g_nSkipXmlTagCount-- ; g_nSkipXmlTagCount >= 0 ; g_nSkipXmlTagCount-- )
	{
		if( g_pcSkipXmlTags[g_nSkipXmlTagCount] != NULL )
		{
			free( g_pcSkipXmlTags[g_nSkipXmlTagCount] );
			g_pcSkipXmlTags[g_nSkipXmlTagCount] = NULL ;
			g_nSkipXmlTagsLen[g_nSkipXmlTagCount] = 0 ;
		}
	}
	return;
}

#define FASTERXML_TOKEN_EOF		0	
#define FASTERXML_TOKEN_LAB		1	/* < */
#define FASTERXML_TOKEN_LAB_SP		2	/* <? or <! */
#define FASTERXML_TOKEN_SLASH		3	/* / or ? */
#define FASTERXML_TOKEN_RAB		4	/* > */
#define FASTERXML_TOKEN_RHAB		5	/* ?> */
#define FASTERXML_TOKEN_TEXT		6
#define FASTERXML_TOKEN_TEXT_CDATA	61	/* <![CDATA[...]]> */
#define FASTERXML_TOKEN_PROPNAME	11
#define FASTERXML_TOKEN_PROPVALUE	12
#define FASTERXML_TOKEN_EQ		15

#define TOKENPROPERTY(_base_,_begin_,_len_,_eof_ret_)			\
	do								\
	{								\
		if( (_base_) == NULL )					\
		{							\
			return _eof_ret_;				\
		}							\
		while(1)						\
		{							\
			for( ; *(_base_) ; (_base_)++ )			\
			{						\
				if( ! strchr( " \t\r\n" , *(_base_) ) )	\
					break;				\
			}						\
			if( *(_base_) == '\0' )				\
			{						\
				return _eof_ret_;			\
			}						\
			else if( (_base_)[0] == '<' && (_base_)[1] == '!' && (_base_)[2] == '-' && (_base_)[3] == '-' )	\
			{												\
				for( (_base_)+=4 ; *(_base_) ; (_base_)++ )						\
				{											\
					if( (_base_)[0] == '-' && (_base_)[1] == '-' && (_base_)[2] == '>' )		\
						break;									\
				}											\
				if( *(_base_) == '\0' )									\
				{											\
					return _eof_ret_;								\
				}											\
				(_base_)+=3;										\
				continue;										\
			}												\
			break;						\
		}							\
		(_begin_) = (_base_) ;					\
		if(	( (_base_)[0] == '>' )				\
			|| ( (_base_)[0] == '/' && (_base_)[1] == '>' )	\
			|| ( (_base_)[0] == '?' && (_base_)[1] == '>' ) )	\
		{							\
			return _eof_ret_;				\
		}							\
		else if( (_base_)[0] == '"' || (_base_)[0] == '\'' )	\
		{							\
			char	mark = (_base_)[0] ;			\
			(_base_)++;					\
			(_begin_) = (_base_) ;				\
			for( ; *(_base_) ; (_base_)++ )			\
			{						\
				if( *(_base_) == mark )			\
					break;				\
			}						\
			(_len_) = (_base_) - (_begin_) ;		\
			(_base_)++;					\
			break;						\
		}							\
		else if( (_base_)[0] == '=' )				\
		{							\
			(_begin_) = (_base_) ;				\
			(_len_) = 1 ;					\
			(_base_)++;					\
			break;						\
		}							\
		else							\
		{							\
			(_begin_) = (_base_) ;				\
			for( ; *(_base_) ; (_base_)++ )			\
			{						\
				if( strchr( " \t\r\n=?/>" , *(_base_) ) )	\
					break;				\
			}						\
			(_len_) = (_base_) - (_begin_) ;		\
			break;						\
		}							\
	}								\
	while(0);							\

int TravelXmlPropertiesBuffer( char *properties , int properties_len , char *xpath , int xpath_len , int xpath_size , funcCallbackOnXmlProperty *pfuncCallbackOnXmlProperty , void *p )
{
	char		*begin = NULL ;
	int		len ;
	
	char		*propname = NULL ;
	int		propname_len ;
	char		*propvalue = NULL ;
	int		propvalue_len ;
	
	int		xpath_newlen = 0 ;
	
	int		nret = 0 ;
	
	while(1)
	{
		TOKENPROPERTY( properties , begin , len , 0 )
		propname = begin ;
		propname_len = len ;
		
		TOKENPROPERTY( properties , begin , len , FASTERXML_ERROR_XML_INVALID )
		if( ! ( begin[0] == '=' && len == 1 ) )
			return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_EQ;
		
		TOKENPROPERTY( properties , begin , len , FASTERXML_ERROR_XML_INVALID )
		propvalue = begin ;
		propvalue_len = len ;
		
		if( pfuncCallbackOnXmlProperty )
		{
			if( xpath )
			{
				if( xpath_len + 1 + propname_len < xpath_size-1 - 1 )
				{
					sprintf( xpath + xpath_len , ".%.*s" , (int)propname_len , propname );
					xpath_newlen = xpath_len + 1 + propname_len ;
				}
				else if( xpath_len + 1 + 1 <= xpath_size-1 )
				{
					sprintf( xpath + xpath_len , ".*" );
					xpath_newlen = xpath_len + 1 + 1 ;
				}
				else
				{
					xpath_newlen = xpath_len ;
				}
			}
			
			nret = (*pfuncCallbackOnXmlProperty)( xpath , xpath_newlen , xpath_size , propname , propname_len , propvalue , propvalue_len , p ) ;
			if( nret > 0 )
				break;
			else if( nret < 0 )
				return nret;
		}
	}
	
	return 0;
}

#define TOKENCONTENT(_base_,_begin_,_len_,_tag_)			\
	do								\
	{								\
		int	CDATA_flag = 0 ;				\
		(_begin_) = (_base_) ;					\
		for( ; *(_base_) ; (_base_)++ )				\
		{							\
			if( (unsigned char)*(_base_) > 127 )		\
				continue;				\
			if( CDATA_flag == 0 && *(_base_) == '<' )	\
			{						\
				if( memcmp((_base_+1),"![CDATA[",8) == 0 )\
					CDATA_flag = 1 ;		\
				else					\
					break;				\
			}						\
			else if( CDATA_flag == 1 && *(_base_) == ']' )	\
			{						\
				if( memcmp((_base_+1),"]>",2) == 0 )	\
				{					\
					(_base_) += 3 ;			\
					break;				\
				}					\
			}						\
		}							\
		if( *(_base_) == '\0' )					\
		{							\
			return FASTERXML_ERROR_XML_INVALID;		\
		}							\
		(_len_) = (_base_) - (_begin_) ;			\
		if( CDATA_flag == 0 )					\
			(_tag_) = FASTERXML_TOKEN_TEXT ;		\
		else							\
			(_tag_) = FASTERXML_TOKEN_TEXT_CDATA ;		\
	}								\
	while(0);							\

#define TOKENXML(_base_,_begin_,_len_,_tag_,_eof_ret_)			\
	do								\
	{								\
		if( (_base_) == NULL )					\
		{							\
			return _eof_ret_;				\
		}							\
		(_tag_) = 0 ;						\
		while(1)						\
		{							\
			for( ; *(_base_) ; (_base_)++ )			\
			{						\
				if( ! strchr( " \t\r\n" , *(_base_) ) )	\
					break;				\
			}						\
			if( *(_base_) == '\0' )				\
			{						\
				return _eof_ret_;			\
			}						\
			if( (_base_)[0] == '<' && (_base_)[1] == '!' && (_base_)[2] == '-' && (_base_)[3] == '-' )	\
			{						\
				for( (_base_)+=4 ; *(_base_) ; (_base_)++ )	\
				{					\
					if( (_base_)[0] == '-' && (_base_)[1] == '-' && (_base_)[2] == '>' )	\
						break;			\
				}					\
				if( *(_base_) == '\0' )			\
				{					\
					return _eof_ret_;		\
				}					\
				(_base_)+=3;				\
				continue;				\
			}						\
			break;						\
		}							\
		if( (_tag_) )						\
			break;						\
		if( (_base_)[0] == '<' )				\
		{							\
			if( (_base_)[1] == '?' )			\
			{						\
				(_begin_) = (_base_) ;			\
				(_len_) = 2 ;				\
				(_base_)+=2;				\
				(_tag_) = FASTERXML_TOKEN_LAB_SP ;	\
			}						\
			else if( (_base_)[1] == '!' )			\
			{						\
				(_begin_) = (_base_) ;			\
				(_len_) = 2 ;				\
				(_base_)+=2;				\
				(_tag_) = FASTERXML_TOKEN_LAB_SP ;	\
			}						\
			else						\
			{						\
				(_begin_) = (_base_) ;			\
				(_len_) = 1 ;				\
				(_base_)++;				\
				(_tag_) = FASTERXML_TOKEN_LAB ;		\
			}						\
			break;						\
		}							\
		if( (_base_)[0] == '/' || (_base_)[0] == '?' )		\
		{							\
			(_begin_) = (_base_) ;				\
			(_len_) = 1 ;					\
			(_base_)++;					\
			(_tag_) = FASTERXML_TOKEN_SLASH ;		\
			break;						\
		}							\
		if( (_base_)[0] == '>' )				\
		{							\
			(_begin_) = (_base_) ;				\
			(_len_) = 1 ;					\
			(_base_)++;					\
			(_tag_) = FASTERXML_TOKEN_RAB ;			\
			break;						\
		}							\
		(_begin_) = (_base_) ;					\
		for( ++(_base_) ; *(_base_) ; (_base_)++ )		\
		{							\
			if( (unsigned char)*(_base_) > 127 )		\
				continue;				\
			if( strchr( " \t\r\n</?>" , *(_base_) ) )	\
			{						\
				(_len_) = (_base_) - (_begin_) ;	\
				(_tag_) = FASTERXML_TOKEN_TEXT ;	\
				break;					\
			}						\
		}							\
		if( *(_base_) == '\0' )					\
		{							\
			return _eof_ret_;				\
		}							\
	}								\
	while(0);							\

static int _TravelXmlBuffer( register char **xml_ptr , char *xpath , int xpath_len , int xpath_size
	, funcCallbackOnXmlNode *pfuncCallbackOnXmlNode
	, funcCallbackOnXmlNode *pfuncCallbackOnEnterXmlNode
	, funcCallbackOnXmlNode *pfuncCallbackOnLeaveXmlNode
	, funcCallbackOnXmlNode *pfuncCallbackOnXmlLeaf
	, void *p , char *preread_node , int preread_node_len )
{
	char		*begin = NULL ;
	int		len ;
	signed char	tag , tag2 ;
	
	int		close_flag ;
	int		i ;
	
	char		*node = NULL ;
	int		node_len ;
	char		*properties ;
	int		properties_len ;
	char		*content = NULL ;
	int		content_len ;
	
	int		xpath_newlen = 0 ;
	
	int		nret = 0 ;
	
	while(1)
	{
		close_flag = 0 ;
		
		if( preread_node )
		{
			node = preread_node ;
			node_len = preread_node_len ;
			preread_node = NULL ;
			goto _PREREAD_GO;
		}
		
		while(1)
		{
			TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_INFO_END_OF_BUFFER)
			if( tag == FASTERXML_TOKEN_LAB || tag == FASTERXML_TOKEN_LAB_SP )
				break;
		}
		if( tag == FASTERXML_TOKEN_LAB_SP )
			close_flag = 1 ;
		
		TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_SLASH)
		if( tag == FASTERXML_TOKEN_SLASH )
		{
			char	*p = (*xml_ptr) ;
			TOKENXML(p,begin,len,tag,FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_TEXT)
			if( tag != FASTERXML_TOKEN_TEXT )
				return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_TEXT;
			
			for( i = 0 ; i < g_nSkipXmlTagCount ; i++ )
			{
				if( len == g_nSkipXmlTagsLen[i] && STRNCMP( begin , == , g_pcSkipXmlTags[i] , len ) )
					break;
			}
			if( i < g_nSkipXmlTagCount )
				continue;
			
			break;
		}
		
		node = begin ;
		node_len = len ;
		
_PREREAD_GO :
		properties = (*xml_ptr) ;
		
		for( ; *(*xml_ptr) ; (*xml_ptr)++ )
		{
			if( strchr( "\"'" , *(*xml_ptr) ) )
			{
				begin = (*xml_ptr) ;
				for( (*xml_ptr)++ ; *(*xml_ptr) ; (*xml_ptr)++ )
				{
					if( *(*xml_ptr) == (*begin) )
						break;
				}
				if( *(*xml_ptr) == '\0' )
					return FASTERXML_ERROR_XML_INVALID;
			}
			else if( *(*xml_ptr) == '/' )
			{
				close_flag = 1 ;
			}
			else if( *(*xml_ptr) == '>' )
			{
				(*xml_ptr)++;
				break;
			}
		}
		if( *(*xml_ptr) == '\0' )
			return FASTERXML_ERROR_XML_INVALID;
		
		for( i = 0 ; i < g_nSkipXmlTagCount ; i++ )
		{
			if( node_len == g_nSkipXmlTagsLen[i] && STRNCMP( node , == , g_pcSkipXmlTags[i] , node_len ) )
				break;
		}
		if( i < g_nSkipXmlTagCount )
			continue;
		
		if( xpath )
		{
			if( xpath_len + 1 + node_len < xpath_size-1 - 1 )
			{
				sprintf( xpath + xpath_len , "/%.*s" , (int)node_len , node );
				xpath_newlen = xpath_len + 1 + node_len ;
			}
			else if( xpath_len + 1 + 1 <= xpath_size-1 )
			{
				sprintf( xpath + xpath_len , "/*" );
				xpath_newlen = xpath_len + 1 + 1 ;
			}
			else
			{
				xpath_newlen = xpath_len ;
			}
		}
		
		properties_len = (*xml_ptr) - properties ;
		
		if( close_flag )
		{
			if( pfuncCallbackOnXmlNode )
			{
				nret = (*pfuncCallbackOnXmlNode)( FASTERXML_NODE_BRANCH , xpath , xpath_newlen , xpath_size , node , node_len , properties , properties_len , NULL , 0 , p ) ;
				if( nret > 0 )
					break;
				else if( nret < 0 )
					return nret;
			}
			continue;
		}
		
		TOKENCONTENT(*xml_ptr,begin,len,tag2)
		content = begin ;
		content_len = len ;
		
		TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
		if( tag != FASTERXML_TOKEN_LAB )
			return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_LAB;
		
		TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
		if( tag == FASTERXML_TOKEN_SLASH )
		{
			TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
			if( STRNICMP( begin , != , node , MAX(len,node_len) ) )
				return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_TEXT;
			
			TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
			if( tag != FASTERXML_TOKEN_RAB )
				return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_RAB;
			
			if( pfuncCallbackOnXmlLeaf )
			{
				nret = (*pfuncCallbackOnXmlLeaf)( FASTERXML_NODE_LEAF , xpath , xpath_newlen , xpath_size , node , node_len , properties , properties_len , content , content_len , p ) ;
				if( nret > 0 )
					break;
				else if( nret < 0 )
					return nret;
			}
		}
		else
		{
			if( pfuncCallbackOnEnterXmlNode )
			{
				nret = (*pfuncCallbackOnEnterXmlNode)( FASTERXML_NODE_ENTER | FASTERXML_NODE_BRANCH , xpath , xpath_newlen , xpath_size , node , node_len , properties , properties_len , content , content_len , p ) ;
				if( nret > 0 )
					break;
				else if( nret < 0 )
					return nret;
			}
			
			nret = _TravelXmlBuffer( xml_ptr , xpath , xpath_newlen , xpath_size
						, pfuncCallbackOnXmlNode
						, pfuncCallbackOnEnterXmlNode
						, pfuncCallbackOnLeaveXmlNode
						, pfuncCallbackOnXmlLeaf
						, p , begin , len ) ;
			if( nret )
				return nret;
			
			TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
			if( STRNICMP( begin , != , node , MAX(len,node_len) ) )
				return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_TEXT;
			
			if( xpath )
			{
				if( xpath_len + 1 + node_len < xpath_size-1 - 1 )
				{
					sprintf( xpath + xpath_len , "/%.*s" , (int)node_len , node );
					xpath_newlen = xpath_len + 1 + node_len ;
				}
				else if( xpath_len + 1 + 1 <= xpath_size-1 )
				{
					sprintf( xpath + xpath_len , "/*" );
					xpath_newlen = xpath_len + 1 + 1 ;
				}
				else
				{
					xpath_newlen = xpath_len ;
				}
			}
			
			if( pfuncCallbackOnLeaveXmlNode )
			{
				nret = (*pfuncCallbackOnLeaveXmlNode)( FASTERXML_NODE_LEAVE | FASTERXML_NODE_BRANCH , xpath , xpath_newlen , xpath_size , node , node_len , NULL , 0 , content , content_len , p ) ;
				if( nret > 0 )
					break;
				else if( nret < 0 )
					return nret;
			}
			
			TOKENXML(*xml_ptr,begin,len,tag,FASTERXML_ERROR_XML_INVALID)
			if( tag != FASTERXML_TOKEN_RAB )
				return FASTERXML_ERROR_XML_INVALID-FASTERXML_TOKEN_RAB;
		}
	}
	
	return 0;
}

int TravelXmlBuffer( char *xml_buffer , char *xpath , int xpath_size
		    , funcCallbackOnXmlNode *pfuncCallbackOnXmlNode
		    , void *p )
{
	char		*xml_ptr = xml_buffer ;
	
	int		nret = 0 ;
	
	nret = _TravelXmlBuffer( & xml_ptr , xpath , 0 , xpath_size
				, pfuncCallbackOnXmlNode
				, pfuncCallbackOnXmlNode
				, pfuncCallbackOnXmlNode
				, pfuncCallbackOnXmlNode
				, p , NULL , 0 ) ;
	if( nret == 0 || nret == FASTERXML_INFO_END_OF_BUFFER )
		return 0;
	else
		return nret;
}

int TravelXmlBuffer4( char *xml_buffer , char *xpath , int xpath_size
		    , funcCallbackOnXmlNode *pfuncCallbackOnXmlNode
		    , funcCallbackOnXmlNode *pfuncCallbackOnEnterXmlNode
		    , funcCallbackOnXmlNode *pfuncCallbackOnLeaveXmlNode
		    , funcCallbackOnXmlNode *pfuncCallbackOnXmlLeaf
		    , void *p )
{
	char		*xml_ptr = xml_buffer ;
	
	int		nret = 0 ;
	
	nret = _TravelXmlBuffer( & xml_ptr , xpath , 0 , xpath_size
				, pfuncCallbackOnXmlNode
				, pfuncCallbackOnEnterXmlNode
				, pfuncCallbackOnLeaveXmlNode
				, pfuncCallbackOnXmlLeaf
				, p , NULL , 0 ) ;
	if( nret == 0 || nret == FASTERXML_INFO_END_OF_BUFFER )
		return 0;
	else
		return nret;
}

