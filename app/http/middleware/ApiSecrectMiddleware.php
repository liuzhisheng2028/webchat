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

namespace app\http\middleware;


use app\Request;
use app\services\ApplicationServices;
use crmeb\interfaces\MiddlewareInterface;

/**
 * Class InstallMiddleware
 * @package app\http\middleware
 */
class ApiSecrectMiddleware implements MiddlewareInterface
{

    public function handle(Request $request, \Closure $next)
    {
        $apiSecret = input('access_token');
        if (!$apiSecret) {
            return app('json')->fail(lang('apiSecret缺失'));
        }
        $applicationServices = app(ApplicationServices::class);
        $applicationInfo = $applicationServices->getApplicationId($apiSecret);
        if (empty($applicationInfo)) {
            return app('json')->fail('apiSecret错误');
        }
        $request->withHeader(['appid'=> $applicationInfo['appid']]);

        return $next($request);
    }
}
