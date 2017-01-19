<?php

namespace App\Repositories;

interface UserRepositoryInterface
{

	public function selectAll();

	public function find($id);
}