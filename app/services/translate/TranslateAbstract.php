<?php

namespace app\services\translate;

abstract class TranslateAbstract
{
    /**
     * 翻译
     * @param string $content
     * @param string $from
     * @param string $to
     * @return mixed
     */
    abstract public function translate(string $content,string $from='en', string $to = 'zh');


}