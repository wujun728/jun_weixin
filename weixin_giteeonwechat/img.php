<?php
header("Content-type: image/jpeg");
$url = empty($_GET['url'])?"":$_GET['url'];
if($url){
    $url = "https://images.gitee.com/".$url;
    echo file_get_contents($url);die;
}