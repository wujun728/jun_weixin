<?php 
<?php
define('APPID', '码云APPID');
define('SECRET', '码云Secret');
if (empty($_GET['GiteeAPI'])) {
    header('Location: https://gitee.com/hamm');
} else {
    header("content:application/json;chartset=uft-8");
    define('API_URL', $_GET['GiteeAPI']);
    $postData = [];
    if (empty($_POST)) {
        $postData = file_get_contents('php://input');
        $postData = json_decode($postData, true);
    } else {
        $postData = $_POST;
    }
    if (API_URL == '/oauth/token') {
        $postData = array_merge($postData, [
            'client_id' => APPID,
            'client_secret' => SECRET
        ]);
    }
    $extend = empty($postData['extend'])?"":$postData['extend'];
    $result;
    $header = [
        'Accept-Language: zh-CN,zh;q=0.9'
    ];
    if (array_key_exists('method', $postData) && strtolower($postData['method']) == 'get') {
        header('test:'."https://gitee.com/" . API_URL . "?" . http_build_query($postData));
        $result = httpGetFull("https://gitee.com/" . API_URL . "?" . http_build_query($postData),$header);
    }else if(array_key_exists('method', $postData) && strtolower($postData['method']) == 'delete'){
        $result = httpDelete("https://gitee.com/" . API_URL, $postData);
    }else if(array_key_exists('method', $postData) && strtolower($postData['method']) == 'patch'){
        $result = httpPatch("https://gitee.com/" . API_URL, $postData);
    }else {
        $result = httpPostFull("https://gitee.com/" . API_URL, http_build_query($postData),$header);
    }
    switch($extend){
        case 'readme':
            $result = json_decode($result,true);
            if(!array_key_exists('content',$result)){
                echo json_encode(['message'=>'该仓库没有README文件或无权访问！']);die;
            }
            $result['content'] = base64_decode($result['content']);
            $result['content'] = str_replace('https://images.gitee.com/','https://gitee.hamm.cn/img.php?url=',$result['content']);
            $result['content'] = base64_encode($result['content']);
            echo json_encode($result);die;
            break;
        default:
    }
    print_r($result);die;
    
}
function httpPatch($url,$data){    
      $data  = json_encode($data);    
      $ch = curl_init();   
      curl_setopt ($ch,CURLOPT_URL,$url);    
      curl_setopt ($ch, CURLOPT_HTTPHEADER, array('Content-type:application/json'));    
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);    
      curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
      curl_setopt($ch, CURLOPT_POSTFIELDS,$data);       
      $output = curl_exec($ch);    
      curl_close($ch);      
      return $output;
}
function httpDelete($url,$data){    
    $data  = json_encode($data);
    $ch = curl_init();
    curl_setopt ($ch,CURLOPT_URL,$url);
    curl_setopt ($ch, CURLOPT_HTTPHEADER, array('Content-type:application/json'));
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");   
    curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}
function  httpPostFull($url, $data = null, $header = [], $cookies = "", $returnHeader = false, $isBackGround = false, $timeout = 0, $proxy = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36");
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_COOKIE, $cookies);
    curl_setopt($ch, CURLOPT_POST, 1);
    if ($timeout) {
        //curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,$timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    }
    if (!empty($proxy)) {
        curl_setopt($ch, CURLOPT_PROXY, $proxy['ip']);
        curl_setopt($ch, CURLOPT_PROXYPORT, $proxy['port']);
        curl_setopt($ch, CURLOPT_PROXYUSERPWD, "taras:taras-ss5");
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, $isBackGround ? 0 :
        1);
    curl_setopt($ch, CURLOPT_HEADER, $returnHeader ? 1 :
        0);
    $output = curl_exec($ch);
    if ($timeout) {
        if ($output === FALSE) {
            if (curl_errno($ch) == CURLE_OPERATION_TIMEOUTED) {
                $output = 'TIMEOUT';
            } else {
                $output = 'ERROR';
            }
        }
    }
    curl_close($ch);
    return $output;
}
function  httpGetFull($url, $header = [], $cookies = "", $returnHeader = false, $isBackGround = false, $timeout = 0, $proxy = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36");
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_COOKIE, $cookies);
    if ($timeout) {
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    }
    if (!empty($proxy)) {
        curl_setopt($ch, CURLOPT_PROXY, $proxy['ip']);
        curl_setopt($ch, CURLOPT_PROXYPORT, $proxy['port']);
        curl_setopt($ch, CURLOPT_PROXYUSERPWD, "taras:taras-ss5");
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, $isBackGround ? 0 :
        1);
    curl_setopt($ch, CURLOPT_HEADER, $returnHeader ? 1 :
        0);
    $output = curl_exec($ch);
    if ($timeout) {
        if ($output === FALSE) {
            if (in_array(curl_errno($ch), [28])) {
                $output = 'TIMEOUT';
            } else {
                $output = 'ERROR';
            }
        }
    }
    curl_close($ch);
    return $output;
}
