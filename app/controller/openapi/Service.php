<?php
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

namespace app\controller\openapi;

use app\services\chat\ChatServiceServices;
use \crmeb\traits\Help;


/**
 * Class Service
 * @package app\controller\kefu
 */
class Service
{
    use Help;


    public function getCustomerServiceList()
    {

        $appId = request()->header('appid');
        $chatServiceServices = app(ChatServiceServices::class);
        $list = $chatServiceServices->getCustomerServiceList($appId);
        return $this->success('success', $list);
    }


}
