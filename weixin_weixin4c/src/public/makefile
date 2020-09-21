# 此文件由makeobj.sh自动生成
############################################################
# 项目名 : 
# 模块名 : 
# 备  注 : 
############################################################

###### 源文件配置区
#@ c_FILE
c_FILE		=	\
			LOGC.c \
			fasterxml.c \
			fasterjson.c \
			util.c \
			http.c \
			url.c \
			file.c \
			encoding.c \
			curl.c \

###### 目标文件、安装目录配置区
include ../makeinstall
LIB		=	libweixin4c_public.a
LIBINST		=	$(_LIBINST)
HDER		= \
			LOGC.h \
			fasterxml.h \
			fasterjson.h \
			weixin4c_public.h \

HDERINST	=	$(_HDERINST)

###### 编译选项
CFLAGS		=	$(_CFLAGS) \

###### 链接选项
LFLAGS		=	$(_LFLAGS) \

###### 额外宏定义区
CLEAN_ADDITION	=

###### 加载mktpl模板库
#@ make_all
#@ make_clean
#@ make_install
#@ make_install_LIBINST
#@ make_install_HDERINST
#@ make_install_DFTHDERINST
#@ make_uninstall
#@ make_uninstall_LIBINST
#@ make_uninstall_HDERINST
#@ make_uninstall_DFTHDERINST
include $(MKTPLDIR)/makeobj_$(MKTPLOS).inc

###### 目标文件依赖关系
libweixin4c_public.a		:	$(c_FILE_o)
	$(AR) $(ARFLAGS) $@ $(c_FILE_o)

