<?php
// error_reporting(E_ALL);

require_once "include/apiResponseGenerator.php";
require_once "include/dbConnection.php";
class CAROUSELMODEL extends APIRESPONSE
{
    private function processMethod($data, $loginData)
    {

        switch (REQUESTMETHOD) {
            case 'GET':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] == "get") {
                    $result = $this->getCarousel($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'POST':
                if ($loginData['role_name'] == 'admin') {
                    $urlPath = $_GET['url'];
                    $urlParam = explode('/', $urlPath);
                    if ($urlParam[1] === 'create') {
                        $result = $this->createCarousel($data, $loginData);
                        return $result;
                    } elseif ($urlParam[1] === 'list') {
                        $result = $this->getCarouselDetails($data, $loginData);
                        return $result;
                    } elseif ($urlParam[1] === 'delete') {
                        $result = $this->deleteCarousel($data);
                    } else {
                        throw new Exception("Methon Not Allowed");
                    }
                } else {
                    throw new Exception("You Don't Have Access.");
                }
                break;
            case 'PUT':
                $urlPath = $_GET['url'];
                $urlParam = explode('/', $urlPath);
                if ($urlParam[1] === "update") {
                    $result = $this->updateCarousel($data, $loginData);
                } else {
                    throw new Exception("Methon Not Allowed");
                }
                return $result;
                break;
            case 'DELETE':


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
    public function getCarouselDetails($data, $loginData)
    {
        try {

            $responseArray = "";
            $res = array();
            $db = $this->dbConnect();
            // $totalRecordCount = $this->getTotalCount($loginData);

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
            $sql = "SELECT id,folder_name,img_url FROM tbl_carousel  WHERE status = 1 and carousel_status = " . '1' . " and status=" . '1' . "";

            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                while ($data = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                    array_push($res, $data);
                }
                $responseArray = array(
                    'carouselData' => $res,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Carousel details fetched successfully"
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
    public function getCarousel($data, $loginData)
    {
        try {
            $id = $data[2];
            $db = $this->dbConnect();
            if (empty($data[2])) {
                throw new Exception("Bad request");
            }

            $responseArray = "";
            $db = $this->dbConnect();
            $sql = "SELECT id,Carousel_name FROM tbl_Carousels  WHERE status = 1 and Carousel_status = " . '1' . " and status=" . '1' . " and id =$id";

            $result = $db->query($sql);
            $row_cnt = mysqli_num_rows($result);
            if ($row_cnt > 0) {
                $data = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $responseArray = array(
                    'CarouselData' => $data,
                );
            }
            if ($responseArray) {
                $resultArray = array(

                    "code" => "200",
                    "message" => "Carousel details fetched successfully"
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


    private function createCarousel($data, $loginData)
    {
        try {
            $db = $this->dbConnect();




            foreach ($_FILES as $file => $fileArray) {
                if (isset($fileArray['name'])) {

                    $getFileExtension = pathinfo($fileArray['name'], PATHINFO_EXTENSION);
                    if (($getFileExtension == 'jpg') || ($getFileExtension == 'jpeg') || ($getFileExtension == 'png')) {
                        $breakImgName = explode(".", $fileArray['name']);
                        $imageOldNameWithOutExt = $breakImgName[0];
                        $imageOldExt = $breakImgName[1];
                        $fileName = $_POST["carousel_name"];

                        $folderName = $_POST["folder_name"];
                        if (empty($fileName)) {
                            $fileName = $imageOldNameWithOutExt;
                        }

                        $sql = "SELECT id FROM tbl_carousel WHERE  status = 1 AND folder_name='" . $folderName . "' AND img_url='" . $fileName . "'";

                        $result = mysqli_query($db, $sql);
                        $row_cnt = mysqli_num_rows($result);
                        if ($row_cnt > 0) {
                            throw new Exception("Carousel Name already added please use diffrent name");
                        }

                        $newFileName = $fileName . "." . $imageOldExt;
                        // Specify your desired directory path here

                        $targetDirectory = "images/carousel/" . $folderName . "/";
                        $targetPath = $targetDirectory . $fileArray['name'];
                        if (move_uploaded_file($fileArray["tmp_name"], $targetPath)) {
                            $dateNow = date("Y-m-d H:i:s");
                            $insertQuery = "INSERT INTO tbl_carousel (folder_name,img_url, created_by, created_date) VALUES ('" . $folderName . "','" . $fileName . "','" . $loginData['id'] . "','$dateNow')";
                            if ($db->query($insertQuery) === true) {
                                $db->close();
                                $statusCode = "200";
                                $statusMessage = "Carousel details created successfully";

                            } else {
                                $statusCode = "500";
                                $statusMessage = "Unable to create Carousel details, please try again later";
                            }
                            $resultArray = array(

                                "code" => $statusCode,
                                "message" => $statusMessage

                            );

                            return $resultArray;
                        } else {
                            throw new Exception("Failed to move uploaded file.");
                        }
                    } else {
                        throw new Exception($getFileExtension . " Format not Allowed");
                    }
                } else {
                    throw new Exception("No file uploaded.");
                }
            }

            // $db = $this->dbConnect();
            // $validationData = array("Carousel_name" => $data['Carousel_name']);
            // // print_r($validationData);exit;
            // $this->validateInputDetails($validationData);
            // $sql = "SELECT id FROM tbl_Carousels WHERE   AND status = 1 AND Carousel_name='" . $data['Carousel_name'] . "'";
            // $result = mysqli_query($db, $sql);
            // $row_cnt = mysqli_num_rows($result);
            // if ($row_cnt > 0) {
            //     throw new Exception("Carousel Name already added in Carousel");
            // } else {
            // }
            // $dateNow = date("Y-m-d H:i:s");
            // $insertQuery = "INSERT INTO tbl_Carousels (Carousel_name, created_by, created_date) VALUES ('" . $data['Carousel_name'] . "','" . $loginData['id'] . "','$dateNow')";
            // if ($db->query($insertQuery) === true) {
            //     $db->close();
            //     $statusCode = "200";
            //     $statusMessage = "Carousel details created successfully";

            // } else {
            //     $statusCode = "500";
            //     $statusMessage = "Unable to create Carousel details, please try again later";
            // }
            // $resultArray = array(

            //     "code" => $statusCode,
            //     "message" => $statusMessage

            // );
            // return $resultArray;
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
    private function updateCarousel($data, $loginData)
    {
        try {
            $db = $this->dbConnect();
            $validationData = array("Id" => $data['id'], "Carousel_name" => $data['Carousel_name'], "Carousel_status" => $data['Carousel_status']);
            $this->validateInputDetails($validationData);
            $dateNow = date("Y-m-d H:i:s");
            $updateQuery = "UPDATE tbl_Carousels SET Carousel_name = '" . $data['Carousel_name'] . "', Carousel_status = '" . $data['Carousel_status'] . "',updated_by = '" . $loginData['id'] . "',updated_date = '$dateNow' WHERE id = " . $data['id'] . "";
            if ($db->query($updateQuery) === true) {
                $db->close();
                $statusCode = "200";
                $statusMessage = "Carousel details updated successfully";

            } else {
                $statusCode = "500";
                $statusMessage = "Unable to update Carousel details, please try again later";
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




    private function deleteCarousel($data)
    {
        try {

            // $id = $data[2];
            $db = $this->dbConnect();
            // if (empty($data[2])) {
            //     throw new Exception("Bad request");
            // }
            // $deleteQuery = "UPDATE tbl_Carousels set status=0 WHERE id = " . $id . "";

            // print_r($data);

            $filePath = "images/carousel/home/" . $data['fileName'];
            // echo $filePath = "images/carousel/home/" . $data['fileName'];
            if (file_exists($filePath)) {
                // Attempt to delete the file
                if (unlink($filePath)) {
                    $statusCode = "200";
                    $statusMessage = "Carousel details deleted successfully";
                } else {
                    $statusCode = "500";
                    $statusMessage = "Unable to delete Carousel details, please try again later";
                }
            } else {
                throw new Exception("File does not exist.");
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
            $sql = "SELECT * FROM tbl_Carousels WHERE status = 1  and Carousel_status=" . '1' . " and status=" . '1' . "";

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
