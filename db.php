<?php

ini_set('display_errors', 1);

error_reporting(1);



$base_url = "http://localhost/Apex/";

$file_path = "uploads/";
$pdf_path = "pdffile/";



$servername = "localhost";
$username = "root";
$password = "";
$dbname = "apex";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {

  die("Connection failed: " . $conn->connect_error);

}

$TECH_USED =  array(array("id"=>1,"name"=>"Swedish"),array("id"=>2,"name"=>"Frictions"),array("id"=>3,"name"=>"Deep Facial"),array("id"=>4,"name"=>"Trigger Points"),array("id"=>5,"name"=>"Breast Massage"),array("id"=>6,"name"=>"Hydrotherapy"),array("id"=>7,"name"=>"Joint Mobilization"),array("id" => 99, "name"=> "Other"));

$AREA_TREATED = array(array("id"=>1,"name"=>"Back"),array("id"=>2,"name"=>"Neck"),array("id"=>3,"name"=>"Shoulders"),array("id"=>4,"name"=>"Face"),array("id"=>5,"name"=>"Hip Area"),array("id"=>6,"name"=>"Abdominals"),array("id"=>7,"name"=>"Chest"),array("id"=>8,"name"=>"Breast"), array("id" => 9, "name"=> "Left Arm"), array("id" => 10, "name"=> "Right Arm"), array("id" => 11, "name"=> "Left Leg"), array("id" => 12, "name"=> "Right Leg"),array("id" => 99, "name"=> "Other"));


?>