<?php

namespace app\services\translate;

use AlibabaCloud\SDK\Alimt\V20181012\Alimt;
use Darabonba\OpenApi\Models\Config;
use AlibabaCloud\SDK\Alimt\V20181012\Models\TranslateRequest;

class AliTranslate extends TranslateAbstract
{
    /**
     * @param string $content
     * @param string $from
     * @param string $to
     * @return mixed
     */
    public function translate(string $content,string $from='en', string $to = 'zh')
    {
        //
        $client = self::createClient();
        $request = new TranslateRequest([
            "formatType" => 'text',
            "scene" => 'social',
            "sourceLanguage" => $from,
            "targetLanguage" => $to,
            "sourceText" => $content
        ]);
        return $client->translate($request);
    }


    /**
     * 使用凭据初始化账号 Client
     * @return Alimt Client
     */
    public static function createClient(){
        // 工程代码建议使用更安全的无 AK 方式，凭据配置方式请参见：https://help.aliyun.com/document_detail/311677.html。

        $config = new Config([
            // 您的 AccessKey ID
            "accessKeyId" => 'LTAI5t9MWEqg1ChEmLXxUgGb',
            // 您的 AccessKey Secret
            "accessKeySecret" => 'i9weNChHhKX8Ii7wyPtREyGaQ033rV'
        ]);
        $config->regionId="cn-hongkong";
        // Endpoint 请参考 https://api.aliyun.com/product/alimt
//        $config->endpoint = "mt.aliyuncs.com";
        return new Alimt($config);
    }

}