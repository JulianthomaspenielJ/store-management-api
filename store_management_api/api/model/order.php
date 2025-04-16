<?php
error_reporting(1);
error_reporting(E_ALL);

require_once "include/apiResponseGenerator.php";
require_once "include/dbConnection.php";
class ORDERMODEL extends APIRESPONSE
{
    private function processMethod($data, $loginData)
    {

        switch (REQUESTMETHOD) {
            case 'GET':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "get") {
                    $result = $this->getOrder($data, $loginData);
                } else {
                    throw new Exception("Method Not Allowed");
                }
                return $result;
                break;
            case 'POST':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === 'create') {
                    $result = $this->createOrder($data, $loginData);
                    return $result;
                } elseif ($urlParam[1] === 'list') {
                    $result = $this->getOrderDetails($data, $loginData);
                    return $result;
                } else {
                    throw new Exception("Method Not Allowed");
                }
                break;
            case 'PUT':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "update") {
                    $result = $this->updateOrder($data, $loginData);
                } else {
                    throw new Exception("Method Not Allowed");
                }
                return $result;
                break;
            case 'DELETE':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "delete") {
                    $result = $this->deleteOrder($data);
                } else {
                    throw new Exception("Method Not Allowed");
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
    public function getOrderDetails($data, $loginData)
    {
        try {
            $responseArray = "";
            $res = array();
            $resData = array();
            $db = $this->dbConnect();
            $totalRecordCount = $this->getTotalCount($loginData);
            $start_index = $data['pageIndex'] * $data['dataLength'];
            $end_index = $data['dataLength'];
            $sql = "SELECT id,address,order_status, user_id, product_id FROM tbl_orders WHERE status = 1  ORDER BY id DESC LIMIT " . $start_index . "," . $end_index . "";

            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {

                while ($data1 = $result->fetch_assoc()) {

                    $sql2 = "SELECT id,item_number,description,price,img_url,category_id FROM tbl_products WHERE status = 1 and  id =" . $data1['product_id'];
                    $result1 = $db->query($sql2);

                    while ($data2 = $result1->fetch_assoc()) {
                        $sql3 = "SELECT id,name,code,product_type FROM tbl_category  WHERE status = 1 and  id =" . $data2['category_id'];
                        $result2 = $db->query($sql3);
                        while ($data3 = $result2->fetch_assoc()) {

                            // array_push($productData, $res1);
                            //    array_push($categoryData, $data3);

                            $sql4 = "SELECT id,name, email_id,phone FROM tbl_users  WHERE status = 1 and  id =" . $data1['user_id'];
                            $result3 = $db->query($sql4);


                            while ($data4 = $result3->fetch_assoc()) {

                                $res1 = array(

                                    "id" => $data2['id'],
                                    "item_number" => $data2['item_number'],
                                    "description" => $data2['description'],
                                    "price" => $data2['price'],
                                    "img_url" => $data2['img_url'],
                                    "categoryData" => $data3,


                                );
                                $res2 = array(
                                    "id" => $data4['id'],
                                    "name" => $data4['name'],
                                    "email_id" => $data4['email_id'],
                                    "phone" => $data4['phone'],
                                );


                            }
                        }
                    }

                    $res = array(
                        "id" => $data1['id'],
                        "order_status" => $data1['order_status'],
                        "address" => $data1['address'],
                        "userData" => $res2,
                        "productData" => $res1
                    );
                    array_push($resData, $res);
                }

                $responseArray = array(
                    "totalRecordCount" => $totalRecordCount,
                    'orderData' => $resData,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Order details fetched successfully"
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
    public function getOrder($data, $loginData)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }

            $responseArray = "";
            $db = $this->dbConnect();
            $sql = "SELECT id,address,order_status, user_id, product_id FROM tbl_orders WHERE status = 1 and  id =$id";
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                $data = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $product_id = $data['product_id'];
                $sql = "SELECT id,item_number,description,price,img_url,category_id FROM tbl_products WHERE status = 1 and  id =$product_id";
                $result = $db->query($sql);
                $data2 = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $category_id = $data2['category_id'];
                $sql = "SELECT id,name,code,product_type FROM tbl_category  WHERE status = 1 and  id =$category_id";
                $result = $db->query($sql);
                $data3 = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $user_id = $data['user_id'];
                $sql = "SELECT id,name, email_id,phone FROM tbl_users  WHERE status = 1 and  id =$user_id";
                $result = $db->query($sql);
                $data4 = mysqli_fetch_array($result, MYSQLI_ASSOC);


                $res1 = array(
                    "id" => $data2['id'],
                    "item_number" => $data2['item_number'],
                    "description" => $data2['description'],
                    "price" => $data2['price'],
                    "img_url" => $data2['img_url'],
                    "categoryData" => $data3
                );
                $res = array(
                    "id" => $data['id'],
                    "order_status" => $data['order_status'],
                    "address" => $data['address'],
                    "userData" => $data4,
                    "productData" => $res1

                );
                $responseArray = array(
                    'orderData' => $res,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Order details fetched successfully"
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
    private function createOrder($data, $loginData)
    {

        try {
            $db = $this->dbConnect();
            $validationData = array("product_id" => $data['product_id']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $insertQuery = "INSERT INTO tbl_orders (address,order_status, user_id, product_id, created_by, created_date) VALUES ('" . $data['address'] . "','" . $data['order_status'] . "','" . $loginData['id'] . "','" . $data['product_id'] . "','" . $loginData['id'] . "','$dateNow')";
            if ($db->query($insertQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Order details created successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to create order details, please try again later";
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
    private function updateOrder($data, $loginData)
    {
        try {
            $db = $this->dbConnect();
            $validationData = array("Id" => $data['id'], "address" => $data['address'], "order_status" => $data['order_status'], "product_id" => $data['product_id']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $updateQuery = "UPDATE tbl_orders SET address = '" . $data['address'] . "', order_status = '" . $data['order_status'] . "',product_id = '" . $data['product_id'] . "',updated_by = '" . $loginData['id'] . "',updated_date = '$dateNow' WHERE id = " . $data['id'] . "";
            if ($db->query($updateQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Order details updated successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to update order details, please try again later";
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




    private function deleteOrder($data)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }
            $deleteQuery = "UPDATE tbl_orders set status=0 WHERE id = " . $id . "";
            if ($db->query($deleteQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Order details deleted successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to delete order details, please try again later";
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
            $sql = "SELECT * FROM tbl_orders WHERE status = 1";
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
