<?php
// error_reporting(E_ALL);

require_once "include/apiResponseGenerator.php";
require_once "include/dbConnection.php";
class CARTMODEL extends APIRESPONSE
{
    private function processMethod($data, $loginData)
    {

        switch (REQUESTMETHOD) {
            case 'GET':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "get") {
                    $result = $this->getCart($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'POST':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === 'create') {
                    $result = $this->createCart($data, $loginData);
                    return $result;
                } elseif ($urlParam[1] === 'list') {
                    $result = $this->getCartDetails($data, $loginData);
                    return $result;
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                break;
            case 'PUT':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === "update") {
                    $result = $this->updateCart($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'DELETE':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === "delete") {
                    $result = $this->deleteCart($data);
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
    public function getCartDetails($data, $loginData)
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
            $query = "SELECT SUM(price) as price  FROM tbl_carts u
            INNER JOIN tbl_products r ON u.product_id = r.id
            WHERE  u.status=1 and u.user_id ='".$loginData['id']."'";
            
                    //   $purchaseQuantityQuery = "SELECT SUM(price) as price  FROM tbl_products WHERE status = 1 and created_by = " . $loginData['id'] . $purchaseDateWiseFilter . $paymetWise . $vendorNameWise;
                $product_price = $this->totalAmountCalculation($query);
    
            $cartData=array();
            $sql = "SELECT id,notification,is_add_to_cart_list,user_id,product_id,quantity FROM tbl_carts  WHERE status = 1 and user_id = " . $loginData['id'] . " ORDER BY id DESC LIMIT " . $start_index . "," . $end_index . "";
            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                
                while ($data =$result->fetch_assoc()) {  
                  
                    $sql2 = "SELECT id,item_number,product_name,description,price,img_url,category_id FROM tbl_products WHERE status = 1 and  id =" . $data['product_id'];
                    $result1 = $db->query($sql2);
                  
                    while ($data2 = $result1->fetch_assoc()) {
                        $sql3 = "SELECT id,name,code,product_type FROM tbl_category  WHERE status = 1 and  id =" . $data2['category_id'];
                        $result2 = $db->query($sql3);
                        while ($data3 = $result2->fetch_assoc()) {

                            // array_push($productData, $res1);
                            //    array_push($categoryData, $data3);

                            $sql4 = "SELECT id,name, email_id,phone FROM tbl_users  WHERE status = 1 and  id =" . $data['user_id'];
                            $result3 = $db->query($sql4);

                           
                            while ($data4 = $result3->fetch_assoc()) {
                                $res1 = array(

                                    "id" => $data2['id'],
                                    "product_name"=>$data2['product_name'],
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

                            }}}
                            
                    $res = array(
                        "id" => $data['id'],
                        "notification" => $data['notification'],
                        "is_add_to_cart_list" => $data['is_add_to_cart_list'],
                        "quantity"=>$data['quantity'],
                        "userData" => $res2,
                        "productData" => $res1
                    );
                    array_push($cartData, $res);
                }
                $responseArray = array(
                    "totalRecordCount" => $totalRecordCount,
                    "totalCartPrice" => $product_price['price'],
                    'cartData' => $cartData,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Cart details fetched successfully",

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
    public function getCart($data, $loginData)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }

            $responseArray = "";
            $db = $this->dbConnect();
            $sql = "SELECT id,notification,user_id,product_id,is_add_to_cart_list FROM tbl_carts WHERE status = 1 and user_id = " . $loginData['id'] . " and id =$id";
            $result = $db->query($sql);
            
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                $data = $data =$result->fetch_assoc();
                
                $sql2 = "SELECT id,item_number,description,price,img_url,category_id FROM tbl_products WHERE status = 1 and  id =" . $data['product_id'];
                $result1 = $db->query($sql2);
                $data2 = $result1->fetch_assoc();
                $sql3 = "SELECT id,name,code,product_type FROM tbl_category  WHERE status = 1 and  id =" . $data2['category_id'];
                        $result2 = $db->query($sql3);
                       $data3 = $result2->fetch_assoc();

                            // array_push($productData, $res1);
                            //    array_push($categoryData, $data3);

                            $sql4 = "SELECT id,name, email_id,phone FROM tbl_users  WHERE status = 1 and  id =" . $data['user_id'];
                            $result3 = $db->query($sql4);

                           
                            $data4 = $result3->fetch_assoc();
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
                            $res = array(
                                "id" => $data['id'],
                                "notification" => $data['notification'],
                                "is_add_to_cart_list" => $data['is_add_to_cart_list'],
                                "userData" => $res2,
                                "productData" => $res1
                            );
                $responseArray = array(
                    'cartData' => $res,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Cart details fetched successfully",

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


    private function createCart($data, $loginData)
    {

        try {
            $db = $this->dbConnect();
            $validationData = array("product_id" => $data['product_id'], "is_add_to_cart" => $data['is_add_to_cart']);
            // print_r($validationData);exit;
            $this->validateInputDetails($validationData);
            $sql = "SELECT id FROM tbl_carts WHERE user_id = '" . $loginData['id'] . "' AND status = 1 AND product_id='" . $data['product_id'] . "'";
            $result = mysqli_query($db, $sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                throw new Exception("Product already added in cart");
            } else {
            }
            $dateNow = date("Y-m-d H:i:s");
            $insertQuery = "INSERT INTO tbl_carts (notification,user_id, product_id,is_add_to_cart_list, created_by, created_date) VALUES ('" . $data['notification'] . "','" . $loginData['id'] . "','" . $data['product_id'] . "','" . $data['is_add_to_cart'] . "','" . $loginData['id'] . "','$dateNow')";
            if ($db->query($insertQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Cart details created successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to create Cart details, please try again later";
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
    private function updateCart($data, $loginData)
    {
        try {
            $db = $this->dbConnect();
            $validationData = array("Id" => $data['id'], "notification" => $data['notification'], "product_id" => $data['product_id'], "is_add_to_cart" => $data['is_add_to_cart']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $updateQuery = "UPDATE tbl_carts SET notification = '" . $data['notification'] . "', is_add_to_cart_list = '" . $data['is_add_to_cart'] . "', quantity = '" . $data['quantity'] . "',updated_by = '" . $loginData['id'] . "',updated_date = '$dateNow' WHERE id = " . $data['id'] . "";
            if ($db->query($updateQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Cart details updated successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to update Cart details, please try again later";
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




    private function deleteCart($data)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }
            $deleteQuery = "UPDATE tbl_carts set status=0 WHERE id = " . $id . "";
            if ($db->query($deleteQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Cart details deleted successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to delete Cart details, please try again later";
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
    public function totalAmountCalculation($sql)
    {
      try {
        $db = $this->dbConnect();
        $result = $db->query($sql);
        $row_cnt = mysqli_num_rows($result);
        if ($row_cnt > 0) {
          $data = mysqli_fetch_array($result, MYSQLI_ASSOC);
          return $data;
        }
      } catch (Exception $e) {
        throw new Exception($e->getMessage());
      }
    }

    private function getTotalCount($loginData)
    {
        try {

            $db = $this->dbConnect();
            
            $sql = "SELECT * FROM tbl_carts WHERE status = 1 and is_add_to_cart_list=1 and user_id = " . $loginData['id'] ;
           
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
