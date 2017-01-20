<?php

namespace App\Repositories;

interface UserRepositoryInterface
{
	public function create($data);

	public function selectAll();

	public function find($id);

	public function destroy($id);
}