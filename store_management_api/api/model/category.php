<?php
// error_reporting(E_ALL);

require_once "include/apiResponseGenerator.php";
require_once "include/dbConnection.php";
class CATEGORYMODEL extends APIRESPONSE
{
    private function processMethod($data, $loginData)
    {

        switch (REQUESTMETHOD) {
            case 'GET':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "get") {
                    $result = $this->getCategory($data, $loginData);
                } else {
                    throw new Exception("Method Not Allowed!");
                }
                return $result;
                break;
            case 'POST':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === 'create') {
                    $result = $this->createCategory($data, $loginData);
                    return $result;
                } elseif ($urlParam[1] === 'list') {
                    $result = $this->getCategoryDetails($data, $loginData);
                    return $result;
                } else {
                    throw new Exception("Method Not Allowed!");
                }
                break;
            case 'PUT':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "update") {
                    $result = $this->updateCategory($data, $loginData);
                } else {
                    throw new Exception("Method Not Allowed!");
                }
                return $result;
                break;
            case 'DELETE':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "delete") {
                    $result = $this->deleteCategory($data);
                } else {
                    throw new Exception("Method Not Allowed!");
                }
                return $result;
                break;
            default:
                $result = $this->handle_error();
                return $result;
                break;
        }
    }
    // Initiate db connection
    private function dbConnect()
    {
        $conn = new DBCONNECTION();
        $db = $conn->connect();
        return $db;
    }

    /**
     * Function is to get the for particular record
     *
     * @param array $data
     * @return multitype:
     */
    public function getCategoryDetails($data, $loginData)
    {
        try {
            $responseArray = "";
            $res = array();
            $db = $this->dbConnect();

            $start_index = $data['page_index'] * $data['data_length'];
            $end_index = $data['data_length'];
            if ($data['name'] != "") {
                $nameFilter = " and name = '" . $data['name'] . "'";
            } else {
                $nameFilter = "";
            }
            if ($data["code"] != "") {
                $codeName = " and code = '" . $data['code'] . "'";
                ;
            } else {
                $codeName = "";
            }
            $totalRecordCount = $this->getTotalCount($nameFilter, $codeName);

            $sql = "SELECT id,name,code  FROM tbl_category  WHERE status = 1" . $nameFilter . $codeName . " ORDER BY id DESC LIMIT " . $start_index . "," . $end_index . "";
         
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                while ($data = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    array_push($res, $data);
                }
                $responseArray = array(
                    "pageIndex" => $start_index,
                    "dataLength" => $end_index,
                    "totalRecordCount" => $totalRecordCount,
                    'categoryData' => $res,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Category details fetched successfully"
                    ,
                    "result" => $responseArray,
                );
                return $resultArray;
            } else {
                return array(

                    "code" => "404",
                    "message" => "No data found..."

                );
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Function is to get the for particular record
     *
     * @param array $data
     * @return multitype:
     */
    public function getCategory($data, $loginData)
    {
        try {

            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }

            $responseArray = "";
            $db = $this->dbConnect();
            $sql = "SELECT id,name,code FROM tbl_category	WHERE status = 1 and id=" . $id . "";
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                $data = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $responseArray = array(
                    'categoryData' => $data,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Category details fetched successfully"
                    ,
                    "result" => $responseArray,
                );
                return $resultArray;
            } else {
                return array(

                    "code" => "404",
                    "message" => "No data found..."

                );
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    /**
     * Post/Add Category
     *
     * @param array $data
     * @return multitype:string
     */
    private function createCategory($data, $loginData)
    {

        try {
            $db = $this->dbConnect();
            $validationData = array("code" => $data['code']);
            $this->validateInputDetails($validationData);
            $sql = "SELECT id FROM tbl_Category WHERE code = '" . $data['code'] . "' AND status = 1";
            $result = mysqli_query($db, $sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                throw new Exception("Category Code is already exist");
            }
            $dateNow = date("Y-m-d H:i:s");
            $insertQuery = "INSERT INTO tbl_Category (name,code,created_by, created_date) VALUES ('" . $data['name'] . "','" . $data['description'] . "','" . $data['code'] . "','" . $$loginData['id'] . "','$dateNow')";
            // echo($insertQuery);exit;
            if ($db->query($insertQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Category details created successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to create category details, please try again later";
            }
            $resultArray = array(

                "code" => $statusCode,
                "message" => $statusMessage

            );
            return $resultArray;
        } catch (Exception $e) {
            return array(

                "code" => "401",
                "message" => $e->getMessage()

            );
        }
    }


    /**
     * Put/Update a Category
     *
     * @param array $data
     * @return multitype:string
     */
    private function updateCategory($data, $loginData)
    {
        try {
            $db = $this->dbConnect();
            $validationData = array("Id" => $data['id'], "Category Code" => $data['code']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $updateQuery = "UPDATE tbl_category SET name = '" . $data['name'] . "', code = '" . $data['code'] . "', updated_by = '" . $loginData['id'] . "',updated_date = '$dateNow' WHERE id = " . $data['id'] . "";
            if ($db->query($updateQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Category details updated successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to update category details, please try again later";
            }
            $resultArray = array(

                "code" => $statusCode,
                "message" => $statusMessage

            );
            return $resultArray;
        } catch (Exception $e) {
            return array(

                "code" => "401",
                "message" => $e->getMessage()

            );
        }
    }




    private function deleteCategory($data)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }
            $deleteQuery = "UPDATE tbl_category set status=0 WHERE id = " . $id . "";
            if ($db->query($deleteQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Category details deleted successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to delete category details, please try again later";
            }
            $resultArray = array(

                "code" => $statusCode,
                "message" => $statusMessage

            );
            return $resultArray;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());

        }
    }
    /**
     * Validate function for Category create
     *
     * @param array $data
     * @throws Exception
     * @return multitype:string NULL
     */
    public function validateInputDetails($validationData)
    {
        foreach ($validationData as $key => $value) {
            if (empty($value) || trim($value) == "") {
                throw new Exception($key . " should not be empty!");
            }
        }
    }


    private function getTotalCount($nameFilter, $codeName)
    {
        try {
            $db = $this->dbConnect();

            $sql = "SELECT * FROM tbl_category WHERE status = 1 ";
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            return $row_cnt;
        } catch (Exception $e) {
            return array(
                "result" => "401",
                "message" => $e->getMessage(),
            );
        }
    }
    private function getTotalPages($dataCount)
    {
        try {
            $pages = null;
            if (MAX_LIMIT) {
                $pages = ceil((int) $dataCount / (int) MAX_LIMIT);
            } else {
                $pages = count($dataCount);
            }
            return $pages;
        } catch (Exception $e) {
            return array(
                "result" => "401",
                "message" => $e->getMessage(),
            );
        }
    }
    // Unautherized api request
    private function handle_error()
    {
    }
    /**
     * Function is to process the crud request
     *
     * @param array $request
     * @return array
     */
    public function processList($request, $token)
    {
        try {
            $responseData = $this->processMethod($request, $token);
            $result = $this->response($responseData);
            return $responseData;
        } catch (Exception $e) {
            return array(

                "code" => "401",
                "message" => $e->getMessage()

            );
        }
    }
}
