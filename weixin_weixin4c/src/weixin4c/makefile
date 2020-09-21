# 此文件由makeobj.sh自动生成
############################################################
# 项目名 : 
# 模块名 : 
# 备  注 : 
############################################################

###### 源文件配置区
#@ c_FILE
c_FILE		=	\
			weixin4c.c \
			VerifyServer.c \
			ReceiveEvent.c \
			ReceiveText.c \
			ReceiveImage.c \
			ReceiveVoice.c \
			ReceiveVideo.c \
			ReceiveShortVideo.c \
			ReceiveLocation.c \
			ReceiveLink.c \
			IDL_xml.dsc.c \

###### 目标文件、安装目录配置区
include ../makeinstall
LIB		=	libweixin4c.a
LIBINST		=	$(_LIBINST)
HDER		=	weixin4c.h IDL_xml.dsc.h
HDERINST	=	$(_HDERINST)


###### 编译选项
CFLAGS		=	-D_DEFINE_FASTCGI_ \
			$(_CFLAGS) \
			-I$(HOME)/include/fasterxml \
			-I$(HOME)/include/weixin4c \

###### 链接选项
LFLAGS		=	$(_LFLAGS) \
			-L$(HOME)/lib \
			-lfasterxml \
			-lweixin4c_public \
			-lcrypto \

###### 额外宏定义区
CLEAN_ADDITION	=

###### 加载mktpl模板库
#@ make_all
#@ make_clean
#@ make_install
#@ make_install_BININST
#@ make_install_HDERINST
#@ make_install_DFTHDERINST
#@ make_uninstall
#@ make_uninstall_BININST
#@ make_uninstall_HDERINST
#@ make_uninstall_DFTHDERINST
include $(MKTPLDIR)/makeobj_$(MKTPLOS).inc

###### 目标文件依赖关系
libweixin4c.a	:	$(c_FILE_o)
	$(AR) $(ARFLAGS) $@ $(c_FILE_o)

