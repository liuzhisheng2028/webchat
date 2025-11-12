<?php

namespace app\controller\mobile;

use app\Request;
use app\services\chat\ChatServiceDialogueRecordServices;
use app\services\translate\TranslateFactory;
use \LanguageDetection\Language;
use think\exception\ValidateException;

class TransController
{
    public function trans(Request $request){
        $data = $request->param();

        //语言检测
        $from_lang = $data['from_lang'] ?? 'auto';
        $to_lang = $data['to_lang'] ?? 'zh';
        if($to_lang== 'auto'){
          //查询上一条的反译语言
            $chatServerDialogueRecordServices = app()->make(ChatServiceDialogueRecordServices::class);
            $last_record = $chatServerDialogueRecordServices->getLastRecord(['to_user_id'=>$data['user_id'],'user_id'=>$data['to_user_id']]);
            if(empty($last_record)){
                $to_lang = 'en';
            }else{
            $transinfo = current($last_record->msn_trans);

                $to_lang = $transinfo["detectedLanguage"];
                if(empty($to_lang)){
                    $to_lang = 'en';
                }
            }

        }

            try {
                $transinfo = TranslateFactory::make('ali')->translate($data['msn'],$from_lang,$to_lang);
                $msn_trans = [$to_lang=>$transinfo->body->data];
                return app('json')->success(compact('msn_trans'));
            }catch (\Exception $e){
                $saveData['msn_trans'] = [];
                throw new ValidateException($e->getMessage());

            }



    }



}