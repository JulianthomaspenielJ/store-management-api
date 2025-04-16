<?php
// error_reporting(E_ALL);

require_once "include/apiResponseGenerator.php";
require_once "include/dbConnection.php";
class PRODUCTMODEL extends APIRESPONSE
{
    private function processMethod($data, $loginData)
    {

        switch (REQUESTMETHOD) {
            case 'GET':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "get") {
                    $result = $this->getProduct($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'POST':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === 'create') {
                    $result = $this->createProduct($data, $loginData);
                    return $result;
                } elseif ($urlParam[1] === 'list') {
                    $result = $this->getProductDetails($data, $loginData);
                    return $result;
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                break;
            case 'PUT':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === "update") {
                    $result = $this->updateProduct($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'DELETE':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === "delete") {
                    $result = $this->deleteProduct($data);
                } else {
                    throw new Exception("Methon Not Allowed");
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
    public function getProductDetails($data, $loginData)
    {
        try {

            $responseArray = "";
            $res = array();
            $db = $this->dbConnect();
            $totalRecordCount = $this->getTotalCount($loginData);

            $start_index = $data['pageIndex'] * $data['dataLength'];
            $end_index = $data['dataLength'];
            // if ($data['invoiceNumber'] != "") {
            //     $invoiceFilter = " and invoice_number = '" . $data['invoiceNumber'] . "'";
            // } else {
            //     $invoiceFilter = "";
            // }
            // if ($data["vendorName"] != "") {
            //     $vendorName = " and vendor_name = '" . $data['vendorName'] . "'";
            //     ;
            // } else {
            //     $vendorName = "";
            // }
            // if ($data["paymentStatus"] != "") {
            //     $paymentStatus = " and payment_status = '" . $data['paymentStatus'] . "'";
            //     ;
            // } else {
            //     $paymentStatus = "";
            // }
            $sql = "SELECT id,item_number,description,price,img_url,category_id  FROM tbl_products  WHERE status = 1  ORDER BY id DESC LIMIT " . $start_index . "," . $end_index . "";

            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                while ($data = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    $sql = "SELECT name,code,product_type FROM tbl_category WHERE status = 1 and id='".$data['category_id']."' ORDER BY id DESC LIMIT " . $start_index . "," . $end_index . "";

                    $result2 = $db->query($sql);
                    while ($data2 = mysqli_fetch_array($result2, MYSQLI_ASSOC)) {
                        $product = array(
                            "id"=>$data['id'],
                           
                            "item_number"=>$data['item_number'],
                            "description"=>$data['description'],
                            "price"=>$data['price'],
                             "category_name"=>$data2['name'],
                            "code"=>$data2['code'],
                            "product_type"=>$data2['product_type'],
                            "img_url"=>$data['img_url'],
                        );
                    }
                    
                    array_push($res,  $product);
                }
                $responseArray = array(
                    "totalRecordCount" => $totalRecordCount,
                    'productData' => $res,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Product details fetched successfully"
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
    public function getProduct($data, $loginData)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }

            $responseArray = "";
            $db = $this->dbConnect();
            $sql = "SELECT id,notification,user_id,product_id FROM tbl_Products WHERE status = 1 and user_id = " . $loginData['id'] . " and id =$id";
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                $data = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $responseArray = array(
                    'ProductData' => $data,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Product details fetched successfully"
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
     * Post/Add sale
     *
     * @param array $data
     * @return multitype:string
     */


    private function createProduct($data, $loginData)
    {

        try {
            $db = $this->dbConnect();
            $validationData = array("product_id" => $data['product_id'], "is_add_to_Product" => $data['is_add_to_Product']);
            // print_r($validationData);exit;
            $this->validateInputDetails($validationData);
            $sql = "SELECT id FROM tbl_Products WHERE user_id = '" . $loginData['id'] . "' AND status = 1 AND product_id='" . $data['product_id'] . "'";
            $result = mysqli_query($db, $sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                throw new Exception("Product already added in Product");
            } else {
            }
            $dateNow = date("Y-m-d H:i:s");
            $insertQuery = "INSERT INTO tbl_Products (notification,user_id, product_id,is_add_to_Product_list, created_by, created_date) VALUES ('" . $data['notification'] . "','" . $loginData['id'] . "','" . $data['product_id'] . "','" . $data['is_add_to_Product'] . "','" . $loginData['id'] . "','$dateNow')";
            if ($db->query($insertQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Product details created successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to create Product details, please try again later";
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
     * Put/Update a Sale
     *
     * @param array $data
     * @return multitype:string
     */
    private function updateProduct($data, $loginData)
    {
        try {
            $db = $this->dbConnect();
            $validationData = array("Id" => $data['id'], "notification" => $data['notification'], "product_id" => $data['product_id'], "is_add_to_Product" => $data['is_add_to_Product']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $updateQuery = "UPDATE tbl_Products SET notification = '" . $data['notification'] . "', is_add_to_Product_list = '" . $data['is_add_to_Product'] . "',updated_by = '" . $loginData['id'] . "',updated_date = '$dateNow' WHERE id = " . $data['id'] . "";
            if ($db->query($updateQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Product details updated successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to update Product details, please try again later";
            }
            $resultArray = array(

                "code" => $statusCode,

            );
            return $resultArray;
        } catch (Exception $e) {
            return array(

                "code" => "401",
                "message" => $e->getMessage()

            );
        }
    }




    private function deleteProduct($data)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }
            $deleteQuery = "UPDATE tbl_Products set status=0 WHERE id = " . $id . "";
            if ($db->query($deleteQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Product details deleted successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to delete Product details, please try again later";
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
     * Validate function for sale create
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


    private function getTotalCount($loginData)
    {
        try {

            $db = $this->dbConnect();
            $sql = "SELECT * FROM tbl_Products WHERE status = 1 and user_id = '" . $loginData['id'] . "' and is_add_to_Product_list=" . '1' . " and status=" . '1' . "";

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
