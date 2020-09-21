package com.github.sd4324530.fastweixin.api.response;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.List;

/**
 * @author Baishui2004
 */
public class GetUserInfosResponse extends BaseResponse {

    @JSONField(name = "user_info_list")
    private List<GetUserInfoResponse> userInfoList;

    public List<GetUserInfoResponse> getUserInfoList() {
        return userInfoList;
    }

    public void setUserInfoList(List<GetUserInfoResponse> userInfoList) {
        this.userInfoList = userInfoList;
    }

}
