<?php

namespace App\Http\ViewComposers;

use Illuminate\Contracts\View\View;
use App\Repositories\UserRepository;

class BreadCrumbComposer
{
	protected $users;

	public function __construct(UserRepository $users)
	{
		$this->users = $users;
	}

	public function compose(View $view)
	{
		$view->with('breadcrumb', $this->getCurrentAction());
	}

	/**  
	 * 获取当前控制器与方法  
	 *  
	 * @return array  
	 */
	public function getCurrentAction()  
	{  
	    $action = \Route::current()->getActionName(); 
	    list($class, $method) = explode('@', $action);
	    return [$class,$method];  
	}  
}
