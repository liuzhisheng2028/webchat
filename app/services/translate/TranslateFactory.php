<?php

namespace app\services\translate;

class TranslateFactory
{
    public static function make(string $type){

        switch ($type){

            case 'ali':
                return new AliTranslate();
                break;
            default:
                return new AliTranslate();

        }

    }


}
