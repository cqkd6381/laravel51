<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
	public function boot()
	{
		view()->composer(
			['users.*'],
			'App\Http\ViewComposers\BreadCrumbComposer'
		);
	}

	public function register()
	{

	}
}