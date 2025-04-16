<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, X-Requested-With, Content-Type, Authorization");
// ini_set ( "display_errors", 1 );
include "include/config.php";

// Turn off error reporting
error_reporting(0);

class APIREQUESTPROCESSING
{
	/*
	 * Process Client Request
	 * Public method for access api.
	 * This method dynmically call the method based on the query string
	 *
	 */
	public function apiRequestBuild()
	{

		$urlParam = $_GET['url'];
		$param = explode('/', $urlParam);
		$apiRequest = $param[0];

		$request = isset($apiRequest) ? (trim(@$apiRequest)) : "";
		$headers = apache_request_headers();

		if ($_SERVER['REQUEST_METHOD'] != "GET" && $_SERVER['REQUEST_METHOD'] != "DELETE") {

			$data = "";
			$request_body = file_get_contents('php://input');


			$data = json_decode($request_body, true);

		} else {

			// Get request payload data from API
			$data = $param;


		}




		$token = isset($headers['authorization']) ? (trim(@$headers['authorization'])) : "";
		if (!$token) {
			$token = isset($headers['Authorization']) ? (trim(@$headers['Authorization'])) : "";
		}

		$token = explode(' ', $token)[1];

		if ($request != "") {
			// Include request controller
			require_once "controller/" . $request . ".php";
		}
	}
}

$apiRequstProcess = new APIREQUESTPROCESSING();
$apiRequstProcess->apiRequestBuild();
?>