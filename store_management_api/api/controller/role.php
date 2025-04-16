<?php
// Include Deals Model
require_once "model/role.php";
require_once "model/login.php";
class ROLE extends ROLEMODEL
{
	public function roleCtrl($request, $tokenParms)
	{
		try {
			$response = $this->processList($request, $tokenParms);
			echo $this->json($response);
			exit();
		} catch (Exception $e) {
			return $e->getMessage();
		}
	}
}

// Initiate controller & Response method
$classActivate = new ROLE();
// Reponse for the request
$classActivate->roleCtrl($data, $token);

?>