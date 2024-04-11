<?php
require_once(dirname(__FILE__).'/html2pdf/html2pdf.class.php');
require('db.php');
$json_data = file_get_contents('php://input');
// $data = json_decode($json_data);
if(!empty($json_data)) {
	$data = json_decode($json_data);
} else {
	$data = (object) $_POST;
}
$do_action = $data->do_action;

//Configuration Section
if($do_action == "show_configuration") {
	$sql = "SELECT id,config_value FROM configuration";
	$config_array = array();
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$config_array[] = $row;
	}
	echo json_encode($config_array);
	$conn->close();
}

if($do_action == "update_configuration") {
	$config_value = $data->config_value;
	$id = $data->id;
	$update_config = "UPDATE configuration SET config_value = '$config_value' WHERE id = '$id'";
	$result = $conn->query($update_config);
	$conn->close();
}

// Location Section
if ($do_action == "add_location") {
	$address = $data->address;
	$sql = "INSERT INTO locations (address) VALUES ('$addgettyperess')";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "show_locations") {
	$sql = "SELECT id, address FROM locations";
	$locations_array = array();
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$locations_array[] = $row;
	}
	echo json_encode($locations_array);
	$conn->close();
}
if ($do_action == "delete_location") {
	$location_id = $data->id;
	$sql = "DELETE FROM locations WHERE id='$location_id'";
	$result = $conn->query($sql);
	$conn->close();
}
// Employee Section
	if ($do_action == "add_employee") {
		$name = trim($data->name);
		$password = $data->password;
		$nickname = $data->nickname;
		$email = $data->email;
		$phone = $data->phone;
		$address = $data->address;
		$sin = $data->sin;
		$hst = $data->hst;
		$basic_payment = $data->basic_payment;
		$commission_rate = $data->commission_rate;
		$commission_rate_masseuse = $data->commission_rate_masseuse;
		$commission_after = $data->commission_after;

		$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

		$sql = "INSERT INTO employees (name, password, nickname, email, phone, address, sin, hst,basic_payment, commission_rate,commission_rate_masseuse, commission_after) VALUES ('$name','$hashedPassword','$nickname', '$email', '$phone', '$address', '$sin', '$hst','$basic_payment', '$commission_rate','$commission_rate_masseuse', '$commission_after')";
		$result = $conn->query($sql);
		$conn->close();
	}

	if ($do_action == "show_employees") {
		$sql = "SELECT * FROM employees";
		$employees_array = array();
		$result = $conn->query($sql);
		if ($result) {
			while ($row = $result->fetch_object()) {
				$employees_array[] = $row;
			}
			echo json_encode($employees_array);
			$conn->close();
		}
	}
	if ($do_action == "delete_employee") {
		$employee_id = $data->id;
		$sql = "DELETE FROM employees WHERE id='$employee_id'";
		$result = $conn->query($sql);
		$conn->close();
	}
	if ($do_action == "edit_employee") {
		$employee_id = $data->id;
		$sql = "SELECT * FROM employees WHERE id='$employee_id'";
		$result = $conn->query($sql);
		$row = $result->fetch_object();
		echo json_encode($row);
		$conn->close();
	}
	if ($do_action == "update_employee") {
		$employee_id = $data->id;
		$password = $data->password;
		$nickname = $data->nickname;
		$email = $data->email;
		$phone = $data->phone;
		$address = $data->address;
		$sin = $data->sin;
		$hst = $data->hst;
		$basic_payment = $data->basic_payment;
		$commission_rate = $data->commission_rate;
		$commission_after = $data->commission_after;
		$commission_rate_masseuse = $data->commission_rate_masseuse;
		$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

		$sql = "UPDATE employees SET password='$hashedPassword', nickname='$nickname', email='$email', phone='$phone', address='$address', sin='$sin', hst='$hst', basic_payment='$basic_payment', commission_rate='$commission_rate',commission_rate_masseuse='$commission_rate_masseuse', commission_after='$commission_after'  WHERE id='$employee_id'";

		$result = $conn->query($sql);
		$conn->close();
	}

// Cashier Section
if ($do_action == "add_cashier") {
	$name = $data->name;
	$nickname = $data->nickname;
	$email = $data->email;
	$phone = $data->phone;
	$address = $data->address;
	$sin = $data->sin;
	$hst = $data->hst;
	$hourly_rate = $data->hourly_rate;
	$sql = "INSERT INTO cashiers (name, nickname, email, phone, address, sin, hst,hourly_rate) VALUES ('$name', '$nickname', '$email', '$phone', '$address', '$sin', '$hst','$hourly_rate')";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "show_cashiers") {
	$sql = "SELECT * FROM cashiers";
	$cashiers_array = array();
	$result = $conn->query($sql);
	if ($result) {
		while ($row = $result->fetch_object()) {
			$cashiers_array[] = $row;
		}
		echo json_encode($cashiers_array);
		$conn->close();
	}
}
if ($do_action == "delete_cashier") {
	$cashier_id = $data->id;
	$sql = "DELETE FROM cashiers WHERE id='$cashier_id'";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "edit_cashier") {
	$cashier_id = $data->id;
	$sql = "SELECT * FROM cashiers WHERE id='$cashier_id'";
	$result = $conn->query($sql);
	$row = $result->fetch_object();
	echo json_encode($row);
	$conn->close();
}
if ($do_action == "update_cashier") {
	$cashier_id = $data->id;
	$name = $data->name;
	$nickname = $data->nickname;
	$email = $data->email;
	$phone = $data->phone;
	$address = $data->address;
	$sin = $data->sin;
	$hst = $data->hst;
	$location_address = $data->address;
	$hourly_rate = $data->hourly_rate;
	$sql = "UPDATE cashiers SET name='$name', nickname='$nickname', email='$email', phone='$phone', address='$address', sin='$sin', hst='$hst',hourly_rate = '$hourly_rate' WHERE id='$cashier_id'";
	$result = $conn->query($sql);
	$conn->close();
}
// Payment Method Section
if ($do_action == "add_payment_method") {
	$payment_method = $data->payment_method;
	$sql = "INSERT INTO payment_methods (payment_method) VALUES ('$payment_method')";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "show_payment_methods") {
	$sql = "SELECT id, payment_method FROM payment_methods";
	$payment_methods_array = array();
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$payment_methods_array[] = $row;
	}
	echo json_encode($payment_methods_array);
	$conn->close();
}
if ($do_action == "delete_payment_method") {
	$payment_method_id = $data->id;
	$sql = "DELETE FROM payment_methods WHERE id='$payment_method_id'";
	$result = $conn->query($sql);
	$conn->close();
}
// Service Section
if ($do_action == "add_service") {
	$service = $data->service;
	$sql = "INSERT INTO services (service) VALUES ('$service')";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "show_services") {
	$sql = "SELECT id, service FROM services";
	$services_array = array();
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$services_array[] = $row;
	}
	echo json_encode($services_array);
	$conn->close();
}
if ($do_action == "delete_service") {
	$service_id = $data->id;
	$sql = "DELETE FROM services WHERE id='$service_id'";
	$result = $conn->query($sql);
	$conn->close();
}
// Working details section
if ($do_action == "working_details_form_show") {
	$sql1 = "SELECT address FROM locations";
	$addresses;
	$result1 = $conn->query($sql1);
	while ($row = $result1->fetch_object()) {
		$addresses[] = $row->address;
	}
	$sql2 = "SELECT service FROM services";
	$services;
	$result2 = $conn->query($sql2);
	while ($row = $result2->fetch_object()) {
		$services[] = $row->service;
	}
	$sql3 = "SELECT name FROM employees";
	$employees;
	$result3 = $conn->query($sql3);
	while ($row = $result3->fetch_object()) {
		$employees[] = $row->name;
	}
	$sql4 = "SELECT id,payment_method FROM payment_methods";
	$payment_methods;
	$result4 = $conn->query($sql4);
	while ($row = $result4->fetch_object()) {
		$payment_methods[] = $row;
	}
	$sql5 = "SELECT id,name FROM cashiers";
	$cashiers;
	$result5 = $conn->query($sql5);
	while ($row5 = $result5->fetch_object()) {
		$cashiers[] = $row5;
	}

	$sql6 = "SELECT id,config_value FROM configuration";
	$config_date = date("Y-m-d",strtotime(date()));
	$result6 = $conn->query($sql6);
	$row6 = $result6->fetch_object();
	$config_date = date("Y-m-d",strtotime($row6->config_value));

	$combined_array = array("addresses" => $addresses, "services" => $services, "employees" => $employees, "payment_methods" => $payment_methods, "cashiers" => $cashiers,"config_date"=>$config_date);
	echo json_encode($combined_array);
	$conn->close();
}
if ($do_action == "add_working_details") {
	$fileName = null;
	if(!empty($_FILES['attachment_doc'])) {
		echo "SDFSDF";
		$attachment_doc = $_FILES['attachment_doc'];
		$uuid = time().rand(1,9999999);
		$fileInfo = pathinfo($attachment_doc['name']);
		$fileExtension = strtolower($fileInfo["extension"]);
		$fileName = "attachment_".$uuid.'.'.$fileExtension;
		$destination = $file_path.$fileName;
		move_uploaded_file($attachment_doc['tmp_name'], $destination);
	}
	$location = trim($data->location);
	$booking_date = $data->bookingDate;
	$client_name = $conn->real_escape_string($data->clientName);
	$service = trim($data->service);
	$receipt_time = $data->receiptTime;
	$receipt_date = $data->receiptDate;
	$rmt_name = trim($data->rmtName);
	$masseuse_name = trim($data->masseuseName);
	$work_time = $data->workTime;
	$tips_amount = $data->tipsAmount;
	$eclaim_code = $data->eclaimCode;
	$refund_amount = $data->refundAmount;
	$comments = $conn->real_escape_string($data->comments);
	$cashier_name = trim($data->cashierName);
	$sql = "INSERT INTO working_details (location, booking_date, client_name, service, receipt_time, receipt_date, rmt_name, masseuse_name, work_time, tips_amount, eclaim_code,refund_amount,comments,cashier_name,attachment_doc) VALUES ('$location', '$booking_date', '$client_name', '$service', '$receipt_time', '$receipt_date', '$rmt_name', '$masseuse_name', '$work_time', '$tips_amount', '$eclaim_code','$refund_amount','$comments','$cashier_name','$fileName')";
	if ($conn->query($sql) === true) {
		$working_details_id = $conn->insert_id;
	};
	$payments = json_decode($data->payments, true);
	foreach ($payments as $method => $amount) {
		$sql = "INSERT INTO payments (working_details_id, method_id, amount) VALUES ('$working_details_id', '$method', '$amount')";
		$conn->query($sql);
	}
	$conn->close();
}

if ($do_action == "show_working_details") {
	$verified_payload = verifyToken($data->token);
	$login_user_type = 0;
	$login_emp_name ="";
	if ($verified_payload) {
		$login_user_type = $verified_payload['user_type'];
		$login_emp_name = $verified_payload['name'];
	}


	$per_page_record = $data->per_page_record;
	$search_client_name = mysqli_real_escape_string($conn, trim($data->searchObj->search_client_name));
	$search_from_date = $data->searchObj->search_from_date;
	$search_to_date = $data->searchObj->search_to_date;
	$search_emp_name = trim($data->searchObj->search_emp_name);
	$search_location = trim($data->searchObj->search_location);

	$page_count = ($data->page - 1) * $per_page_record;
	$where = "where a.status=1";

	if($login_user_type ==3 && $login_emp_name != "" ) $where .= " and (a.rmt_name = '$login_emp_name' or a.masseuse_name = '$login_emp_name')";

	if ($data->searchObj->search_client_name && $data->searchObj->search_client_name != "") $where .= " and a.client_name = '$search_client_name'";

	if ($data->searchObj->search_location && $data->searchObj->search_location != "") $where .= " and a.location = '$search_location'";

	if ($data->searchObj->search_emp_name && $data->searchObj->search_emp_name != "") $where .= " and (a.rmt_name = '$search_emp_name' or a.masseuse_name = '$search_emp_name')";

	if ($data->searchObj->search_from_date && $data->searchObj->search_to_date) $where .= " and a.booking_date BETWEEN '$search_from_date' AND '$search_to_date'";

	$per_page_record = $data->per_page_record;
	$page_count = ($data->page - 1) * $per_page_record;
	$sql = "SELECT a.*,b.file_name as note_file FROM working_details as a left join treatment_note as b on a.id=b.work_id $where order by a.id desc limit $page_count,$per_page_record";

	$working_details = [];
	$result = $conn->query($sql);
	$couter = 0;
	while ($row = $result->fetch_object()) {
		$work_id = $row->id;
		$pSql = "SELECT a.amount,b.payment_method as method FROM payments as a LEFT JOIN payment_methods as b ON a.method_id = b.id WHERE a.working_details_id = '$work_id'";
		$pQry = $conn->query($pSql);
		$wPay = array();
		$totalAmount = 0;
		while ($pRes = $pQry->fetch_object()) {
			$totalAmount += $pRes->amount;
			$wPay[] = $pRes;
		}

		$row->doc_fullpath = null;
		if(file_exists($file_path.$row->attachment_doc) && $row->attachment_doc != "") {
			$row->doc_fullpath = $base_url.$file_path.$row->attachment_doc;
		}


		$row->note_exists = false;
		if(file_exists($pdf_path.$row->note_file) && $row->note_file != "") {
			$row->note_exists = true;
		}

		if ($row->refund_amount > 0) $totalAmount  = $totalAmount - $row->refund_amount;
		$working_details[$couter] = $row;
		$working_details[$couter]->payments = $wPay;		
		$working_details[$couter]->total_amount = number_format($totalAmount,2,".","");
		$couter++;
	}

	$emp_where = "";
	if($login_user_type ==3 && $login_emp_name != "" ) $emp_where = "where emp.name = '$login_emp_name'";

	$sql3 = "SELECT emp.id,emp.name FROM employees as emp $emp_where order by emp.name asc ";
	$emp_master = [];
	$result3 = $conn->query($sql3);
	while ($row3 = $result3->fetch_object()) {
		$emp_master[] = $row3;
	}

	$sql_location = "SELECT id,address FROM locations order by address asc";
	$location_master = [];
	$result_location = $conn->query($sql_location);
	while ($row_location = $result_location->fetch_object()) {
		$location_master[] = $row_location;
	}

	$sql2 = "SELECT id FROM working_details as a $where";
	$total_record = 0;
	$result2 = $conn->query($sql2);
	$total_record = mysqli_num_rows($result2);

	if($search_emp_name != "") $funRes = getWageReport($conn,$search_from_date,$search_to_date,$search_emp_name,$search_location,$search_client_name);
	if($search_emp_name == "") $funRes = getEmpDetail($conn,$search_from_date,$search_to_date,$search_emp_name,$search_location,$search_client_name,$login_user_type,$login_emp_name);

	$newArray = array();
	foreach ($funRes['working_details_print'] as $resKey => $resVal) {
		unset($resVal['total_price_day_wise'],$resVal['commission_price']);
		$newArray[$resKey] = $resVal;
	}

	$newArray1 = array();
	foreach ($funRes['wage_reports'] as $resKey1 => $resVal1) {
		unset($resVal1['commission_salary'],$resVal1['basic_salary'],$resVal1['tips_amount_card_charge']);
		$newArray1[$resKey1] = $resVal1;
	}

	$funRes['working_details_print'] = $newArray;
	$funRes['wage_reports'] = $newArray1;
	unset($funRes['total_salary_amount']);

	$combined_array = array("working_details" => $working_details, "total_record" => $total_record, "payload" => $data, "emp_master" => $emp_master,"report_data"=> $funRes,"location_master" => $location_master);
	echo json_encode($combined_array);
	$conn->close();
}

if ($do_action == "delete_working_details") {
	$working_details_id = $data->id;
	$doc_sql = "SELECT attachment_doc FROM working_details WHERE id = '$working_details_id' limit 1";
	$doc_qry = $conn->query($doc_sql);
	if($doc_qry->num_rows) {
		$doc_res = $doc_qry->fetch_object();
		if(file_exists($file_path.$doc_res->attachment_doc)) {
			unlink($file_path.$doc_res->attachment_doc);
		}
	}
	$sql = "DELETE FROM payments WHERE working_details_id='$working_details_id'";
	$result = $conn->query($sql);
	$sql = "DELETE FROM working_details WHERE id='$working_details_id'";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "edit_working_details") {
	$working_details_id = $data->id;
	$sql = "SELECT * FROM working_details WHERE id = $working_details_id limit 1";
	$working_details = [];
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$workingId = $row->id;
		$PaySql1 = "SELECT * FROM payments WHERE working_details_id = $workingId";
		$PayQry1 = $conn->query($PaySql1);
		$Payresult1 = [];
		while ($PayRow1 = $PayQry1->fetch_object()) {
			$Payresult1[] = $PayRow1;
		}
		$PaySql = "SELECT method_id FROM payments WHERE working_details_id = $workingId";
		$PayQry = $conn->query($PaySql);
		$Payresult = [];
		while ($PayRow = $PayQry->fetch_object()) {
			$Payresult[] = $PayRow->method_id;
		}
		$doc_fullpath = null;
		if(file_exists($file_path.$row->attachment_doc) && $row->attachment_doc != "") {
			$doc_fullpath = $base_url.$file_path.$row->attachment_doc;
		}
		$row->doc_fullpath = $doc_fullpath;
		$working_details = $row;
	}
	// $sql = "SELECT * FROM payments";
	// $payments = [];
	// $result = $conn->query($sql);
	// while ($row = $result->fetch_object()) {
	// 	$payments[] = $row;
	// }
	$sql1 = "SELECT address FROM locations";
	$addresses;
	$result1 = $conn->query($sql1);
	while ($row = $result1->fetch_object()) {
		$addresses[] = $row->address;
	}
	$sql2 = "SELECT service FROM services";
	$services;
	$result2 = $conn->query($sql2);
	while ($row = $result2->fetch_object()) {
		$services[] = $row->service;
	}
	$sql3 = "SELECT name FROM employees";
	$employees;
	$result3 = $conn->query($sql3);
	while ($row = $result3->fetch_object()) {
		$employees[] = $row->name;
	}
	$sql4 = "SELECT id,payment_method FROM payment_methods";
	$payment_methods = [];
	$result4 = $conn->query($sql4);
	while ($row = $result4->fetch_object()) {
		$payment_methods[] = $row;
	}
	$sql5 = "SELECT id,name FROM cashiers";
	$cashiers;
	$result5 = $conn->query($sql5);
	while ($row5 = $result5->fetch_object()) {
		$cashiers[] = $row5;
	}

	$sql6 = "SELECT id,config_value FROM configuration";
	$config_date = date("Y-m-d",strtotime(date()));
	$result6 = $conn->query($sql6);
	$row6 = $result6->fetch_object();
	$config_date = date("Y-m-d",strtotime($row6->config_value));

	$combined_array = array("working_details" => $working_details, "working_payment_details" => $Payresult, "payment_info" => $Payresult1, "payments" => $payments, "addresses" => $addresses, "services" => $services, "employees" => $employees, "payment_methods" => $payment_methods, "cashiers" => $cashiers,"config_date"=>$config_date);
	echo json_encode($combined_array);
	$conn->close();
}

if ($do_action == "update_working_details") {
	$workingId = $data->id;
	$fileName = null;
	$doc_sql = "SELECT attachment_doc FROM working_details WHERE id = '$workingId' limit 1";
	$doc_qry = $conn->query($doc_sql);
	if($doc_qry->num_rows) {
		$doc_res = $doc_qry->fetch_object();
		$fileName = $doc_res->attachment_doc;
	}


	if(!empty($_FILES['attachment_doc'])) {
		if($fileName != null ) {
			if(file_exists($file_path.$doc_res->attachment_doc)) {
				unlink($file_path.$doc_res->attachment_doc);
			}
		}
		$attachment_doc = $_FILES['attachment_doc'];
		$uuid = time().rand(1,9999999);
		$fileInfo = pathinfo($attachment_doc['name']);
		$fileExtension = strtolower($fileInfo["extension"]);
		$fileName = "attachment_".$uuid.'.'.$fileExtension;
		$destination = $file_path.$fileName;
		move_uploaded_file($attachment_doc['tmp_name'], $destination);
	}
	$location = trim($data->location);
	$booking_date = $data->bookingDate;
	$client_name = $conn->real_escape_string($data->clientName);
	$service = trim($data->service);
	$receipt_time = $data->receiptTime;
	$receipt_date = $data->receiptDate;
	$rmt_name = trim($data->rmtName);
	$masseuse_name = trim($data->masseuseName);
	$work_time = $data->workTime;
	$tips_amount = $data->tipsAmount;
	$eclaim_code = $data->eclaimCode;
	$comments = $conn->real_escape_string($data->comments);
	$cashier_name = trim($data->cashierName);
	$refund_amount = $data->refundAmount;
	$sql1 = "UPDATE working_details SET location='$location', booking_date='$booking_date', client_name='$client_name', service='$service', receipt_time='$receipt_time', receipt_date='$receipt_date', rmt_name='$rmt_name', masseuse_name='$masseuse_name', work_time='$work_time', tips_amount='$tips_amount', eclaim_code='$eclaim_code', comments='$comments', cashier_name='$cashier_name', refund_amount='$refund_amount',attachment_doc='$fileName' WHERE id='$workingId'";
	$conn->query($sql1);
	$payments = json_decode($data->payments, true);
	$conn->query("DELETE FROM payments WHERE working_details_id = $workingId");
	foreach ($payments as $method => $amount) {
		$sql = "INSERT INTO payments (working_details_id, method_id, amount) VALUES ('$workingId', '$method', '$amount')";
		$conn->query($sql);
	}
	$conn->close();
}
// Cashier Report Section
if ($do_action == "cashier_report_form_show") {
	$sql = "SELECT id,name FROM cashiers";
	$names = array();
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$names[] = $row;
	}
	$addresses;
	$sql1 = "SELECT address FROM locations";
	$result1 = $conn->query($sql1);
	while ($row1 = $result1->fetch_object()) {
		$addresses[] = $row1->address;
	}
	$combined_array = array("names" => $names, "addresses" => $addresses);
	echo json_encode($combined_array);
	$conn->close();
	exit();
}
if ($do_action == "add_cashier_report") {
	$date = $data->date;
	$location_name = $data->location_name;
	$cashier_id = $data->cashier_name;
	$start_time = $data->start_time;
	$end_time = $data->end_time;
	$bonus = $data->bonus;
	$sql = "INSERT INTO cashiers_report (date, casher_id, start_time, end_time, bonus,location) VALUES ('$date', '$cashier_id', '$start_time', '$end_time', '$bonus','$location_name')";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "show_cashiers_daily_report") {
	$per_page_record = $data->per_page_record;
	$page = $data->page;
	$cashier_id = $data->searchObj->cashier_id;
	$from_date = $data->searchObj->from_date;
	$to_date = $data->searchObj->to_date;
	$page_count = ($data->page - 1) * $per_page_record;
	$where = "where a.status=1";
	if ($data->searchObj->cashier_id) $where .= " and a.casher_id = $cashier_id";
	if ($data->searchObj->from_date && $data->searchObj->to_date) $where .= " and a.date BETWEEN '$from_date' AND '$to_date'";
	$sql = "SELECT a.*,b.name as cachier_name FROM cashiers_report as a LEFT JOIN cashiers as b on a.casher_id = b.id $where order by a.id desc limit $page_count,$per_page_record";
	$cashier_reports = [];
	$result = $conn->query($sql);
	while ($row = $result->fetch_object()) {
		$res = $row;
		$res->start_time = date("Y-m-d H:i", strtotime($row->start_time));
		$res->end_time = date("Y-m-d H:i", strtotime($row->end_time));
		$cashier_reports[] = $row;
	}
	$sql2 = "SELECT a.id FROM cashiers_report as a $where";
	$total_record = 0;
	$result2 = $conn->query($sql2);
	$total_record = mysqli_num_rows($result2);
	$sql3 = "SELECT id,name FROM cashiers";
	$result3 = $conn->query($sql3);
	$cashier_master = [];
	while ($row3 = $result3->fetch_object()) {
		$cashier_master[] = $row3;
	}
	$combined_array = array("cashier_reports" => $cashier_reports, "total_record" => $total_record, "cashier_master" => $cashier_master, "payload" => $data);
	echo json_encode($combined_array);
	$conn->close();
}
if ($do_action == "cashier_report_edit_form_show") {
	$cashierId = $data->cashierId;
	$sql = "SELECT * FROM cashiers_report WHERE id = '$cashierId' limit 1";
	$result = $conn->query($sql);
	$cashier_report = [];
	while ($row = $result->fetch_object()) {
		$cashier_report = $row;
	}
	$sql1 = "SELECT * FROM cashiers";
	$names = array();
	$result1 = $conn->query($sql1);
	while ($row1 = $result1->fetch_object()) {
		$names[] = $row1;
	}
	$addresses;
	$sql1 = "SELECT address FROM locations";
	$result1 = $conn->query($sql1);
	while ($row1 = $result1->fetch_object()) {
		$addresses[] = $row1->address;
	}
	$combined_array = array("names" => $names, "cashier_report" => $cashier_report, "addresses" => $addresses);
	$json = json_encode($combined_array);
	echo $json;
	$conn->close();
}
if ($do_action == "update_cashier_report") {
	$cashierReportId = $data->cashierReportId;
	$date = $data->date;
	$location_name = $data->location_name;
	$cashier_id = $data->cashier_name;
	$start_time = $data->start_time;
	$end_time = $data->end_time;
	$bonus = $data->bonus;
	$sql = "UPDATE cashiers_report SET date='$date',casher_id=$cashier_id,start_time='$start_time',end_time='$end_time',bonus=$bonus,location='$location_name' WHERE id = $cashierReportId";
	$result = $conn->query($sql);
	$conn->close();
}
if ($do_action == "delete_cashier_report") {
	$cashierReportId = $data->cashierReportId;
	$sql = "DELETE FROM cashiers_report WHERE id = $cashierReportId";
	$result = $conn->query($sql);
	$conn->close();
}
// Sales report section
if ($do_action == "get_sales_report") {
	$non_taxable_service = array("Acupuncture", "Osteopath", "NON RMT", "NONRMT Couple", "NO RMT PKG", "NON RMT MM");
	$tax_rate = 13;
	$start_date = $data->start_date;
	$end_date = $data->end_date;
	$sql = "SELECT address FROM locations";
	$qry = $conn->query($sql);
	$counter = 0;
	$result = [];
	if ($start_date != "" && $end_date != "") {
		$where = "AND a.booking_date BETWEEN '$start_date' AND '$end_date'";
	} else {
		$where = "";
	}
	$total_sale = $total_nt_gross_sale + $total_gross_sale + $total_tax_amount + $total_net_sales = $total_cash_amount =  0;
	$grand_total_tips = 0;
	while ($row = $qry->fetch_assoc()) {
		$location_name = $row['address'];
		//$location_name= "398 Steeles Ave west";
		$sql1 = "SELECT a.service,a.tips_amount,a.refund_amount,b.* FROM working_details as a
    LEFT JOIN payments as b ON a.id = b.working_details_id
    WHERE a.location='$location_name' $where";
		$qry1 = $conn->query($sql1);
		$gross_sale = $tax_amount = $nt_gross_sale = $total_tips = $cash_amount = 0;
		$working_details_array = array();
		while ($row1 = $qry1->fetch_assoc()) {
			if (in_array($row1['working_details_id'], $working_details_array)) {
				$tips_amount = 0;
			} else {
				$total_tips += $tips_amount = $row1['tips_amount'];
				array_push($working_details_array, $row1['working_details_id']);
			}
			$refund_amount = $total_amt = 0;
			if ($row1['refund_amount'] > 0) $refund_amount = $row1['refund_amount'];
			if (in_array($row1['service'], $non_taxable_service)) {
				$nt_gross_sale += $row1['amount'] - $refund_amount;
			} else {
				$total_amt = $row1['amount'] - $refund_amount;
				$gross_sale += $total_amt;
				$tax_amount += ($total_amt / 100) * $tax_rate;
			}
			if ($row1['method_id'] == 4) { // cash amount calculation
				$cash_amount += $row1['amount'];
			}
		}
		$grand_total_tips += $total_tips;
		$total_cash_amount += $cash_amount;
		$nt_gross_sale = $nt_gross_sale + $total_tips;
		$total_sale += $nt_gross_sale + $gross_sale;
		$total_nt_gross_sale += $nt_gross_sale;
		$total_gross_sale += $gross_sale;
		$total_tax_amount += $tax_amount;
		$total_net_sales += ($gross_sale + $nt_gross_sale);
		$result[$counter]['tips_amount'] = sprintf("%0.2f", $total_tips);
		$result[$counter]['cash_amount'] = sprintf("%0.2f", $cash_amount);
		$result[$counter]['nt_gross_sale'] = sprintf("%0.2f", $nt_gross_sale);
		$result[$counter]['tax_amount'] = sprintf("%0.2f", $tax_amount);
		$result[$counter]['gross_sale'] = sprintf("%0.2f", $gross_sale);
		$result[$counter]['net_sales'] = sprintf("%0.2f", $gross_sale + $nt_gross_sale);
		$result[$counter]['net_sales_excluding_tax'] = sprintf("%0.2f", ($gross_sale + $nt_gross_sale) - $tax_amount);
		$result[$counter]['location_name'] = $row['address'];
		$counter++;
	}
	$result1['total_tips_amount'] = sprintf("%0.2f", $grand_total_tips);
	$result1['total_cash_amount'] = sprintf("%0.2f", $total_cash_amount);
	$result1['total_sale'] = sprintf("%0.2f", $total_sale);
	$result1['total_nt_gross_sale'] = sprintf("%0.2f", $total_nt_gross_sale);
	$result1['total_gross_sale'] = sprintf("%0.2f", $total_gross_sale);
	$result1['total_tax_amount'] = sprintf("%0.2f", $total_tax_amount);
	$result1['total_net_sales'] = sprintf("%0.2f", $total_net_sales);
	$result1['total_net_sales'] = sprintf("%0.2f", $total_net_sales);
	$result1['total_net_sales_excluding_tax'] = sprintf("%0.2f", ($total_net_sales - $total_tax_amount));
	$combined_array = array("sale_reports" => $result, "total_res" => $result1);
	echo json_encode($combined_array);
}
if ($do_action == "get_wage_report") {
	$employee_name = trim($data->employee_name);
	$from_date = $data->from_date;
	$to_date = $data->to_date;
	$search_location = "";
	$funRes = getWageReport($conn,$from_date,$to_date,$employee_name,$search_location);
	echo json_encode($funRes);
}
if ($do_action == "get_wage_report_master") {
	$sql =  "SELECT id,name FROM employees order by name asc";
	$result = $conn->query($sql);
	$emp_lists = array();
	while ($row = $result->fetch_assoc()) {
		$emp_lists[] = $row;
	}
	$combined_array = array("employees" => $emp_lists);
	$sql1 =  "SELECT id,name FROM cashiers order by name asc";
	$result1 = $conn->query($sql1);
	$cashier_lists = array();
	while ($row1 = $result1->fetch_assoc()) {
		$cashier_lists[] = $row1;
	}
	$combined_array = array("employees" => $emp_lists, "cashiers" => $cashier_lists);
	echo json_encode($combined_array);
}
if ($do_action == "get_cashier_wage_report") {
	$vacation_fee = 4;
	$cashierId = $data->cashierId;
	$sql1 = "SELECT hourly_rate FROM cashiers WHERE id = '$cashierId'";
	$qry1 = $conn->query($sql1);
	$hourly_rate = $qry1->fetch_assoc()['hourly_rate'];
	$month = $data->month;
	$from_date = $data->from_date;
	$to_date = $data->to_date;
	$where = "";
	if ($from_date != "" &&  $to_date != "") $where .= " and date BETWEEN '$from_date' AND '$to_date'";
	$sql = "SELECT address FROM locations";
	$qry = $conn->query($sql);
	$total_location = mysqli_num_rows($qry);
	$counter = 0;
	$location_count = 0;
	$result = array();
	$grand_total_bonus = $grand_total_basic_salary = $grand_total_vacation_fee = $grand_total_salary_amount = 0;
	while ($row = $qry->fetch_assoc()) {
		$total_location_work_time = $total_location_receipt_time = 0;
		$location_name = $row['address'];
		$sql1 = "SELECT id,start_time,end_time,bonus FROM cashiers_report WHERE casher_id = '$cashierId' $where and location='$location_name'";
		$qry1 = $conn->query($sql1);
		$grand_total_work_time = 0;
		$total_bonus = $total_basic_salary = $total_salary_amount = 0;
		while ($row1 = $qry1->fetch_assoc()) {
			$total_work_time = (strtotime($row1['end_time']) - strtotime($row1['start_time'])) / 60 / 60;
			if ($total_work_time >= 0) $grand_total_work_time += $total_work_time;
			$total_bonus += $row1['bonus'];
		}
		$total_basic_salary = ($grand_total_work_time * $hourly_rate);
		$total_salary_amount = $total_basic_salary + $total_bonus;
		$total_vacation_fee = $total_salary_amount * ($vacation_fee / 100);
		$grand_total_bonus += $total_bonus;
		$grand_total_basic_salary += $total_basic_salary;
		$grand_total_salary_amount += $total_salary_amount;
		$grand_total_vacation_fee += $total_vacation_fee;
		//$grand_total_vacation_fee = $grand_total_salary_amount;
		$result[$location_count]['location_name'] = $location_name;
		$result[$location_count]['bonus'] = sprintf("%0.2f", $total_bonus);
		$result[$location_count]['basic_salary'] = sprintf("%0.2f", $total_basic_salary);
		$result[$location_count]['total_salary'] = sprintf("%0.2f", $total_salary_amount);
		$result[$location_count]['total_vacation_fee'] = sprintf("%0.2f", $total_vacation_fee);
		$location_count++;
	};
	$result1 = array();
	$result1['location_name'] = $location_name;
	$result1['bonus'] = sprintf("%0.2f", $grand_total_bonus);
	$result1['basic_salary'] = sprintf("%0.2f", $grand_total_basic_salary);
	$result1['total_salary'] = sprintf("%0.2f", $grand_total_salary_amount);
	$result1['total_vacation_fee'] = sprintf("%0.2f", $grand_total_vacation_fee);
	/***********for print option ****** */
	$where_print = "where a.status=1";
	if ($data->cashierId) $where_print .= " and a.casher_id = $cashierId";
	if ($data->from_date && $data->to_date) $where_print .= " and a.date BETWEEN '$from_date' AND '$to_date'";
	$sql_print = "SELECT a.bonus,a.date,a.end_time,a.start_time,a.location,b.name as cachier_name FROM cashiers_report as a LEFT JOIN cashiers as b on a.casher_id = b.id $where_print order by a.id desc";
	$cashier_print = [];
	$result_print = $conn->query($sql_print);
	while ($row_print = $result_print->fetch_object()) {
		$res_print = $row_print;
		$res_print->start_time = date("Y-m-d H:i", strtotime($row_print->start_time));
		$res_print->end_time = date("Y-m-d H:i", strtotime($row_print->end_time));
		$cashier_print[] = $row_print;
	}
	/************ for print option *********** */
	$combined_array = array("cash_report" => $result, "total_result" => $result1,"cashier_print" => $cashier_print);
	//print_r($combined_array); exit();
	echo json_encode($combined_array);
}

if ($do_action == "login_application") {
	$admin_password = "Kingthai**";
	$cashier_password = "cashier$123";
	$userTypeId = $data->userTypeId;
	$password = $data->password;
	$result = array();
	if ($userTypeId == 1 && $password === $admin_password) {
		$token = generateToken($userTypeId,"Admin");
		$result['userType'] = 1;
		$result['status'] = "success";
		$result['message'] = "Login Successfully";
		$result['token'] = $token;
	} else if ($userTypeId == 2 && $password === $cashier_password) {
		$token = generateToken($userTypeId,"Cashier");
		$result['userType'] = 2;
		$result['status'] = "success";
		$result['message'] = "Login Successfully";
		$result['token'] = $token;
	} else if($userTypeId == 3 ) {
		$emp_name = $data->emp_name;
		$emp_password = $data->emp_password;
		$login_sql = "select password from employees where name = '$emp_name' limit 1";
		$login_qry = $conn->query($login_sql);
		$login_result = $login_qry->fetch_assoc();
		$hashedPassword = $login_result['password'];

		if (password_verify($emp_password, $hashedPassword)) {
			$token = generateToken($userTypeId, $emp_name);
			$result['userType'] = 3;
		   	$result['status'] = "success";
			$result['message'] = "Login Successfully";
			$result['token'] = $token;
		} else {
		   	$result['status'] = "failed";
			$result['message'] = "Login Failed";
			$result['token'] = null;
		}
	} else {
		$result['status'] = "failed";
		$result['message'] = "Login Failed";
		$result['token'] = null;
	}
	echo json_encode($result);
}

function generateToken($user_type, $name) {
    $secret_key = "havellsindia2023";
    $payload = array(
        "user_type" => $user_type,
        "name" => $name,
        "exp" => time() + 3600
    );
    return jwt_encode($payload, $secret_key);
}

function jwt_encode($payload, $key) {
    $header = json_encode(["typ" => "JWT", "alg" => "HS256"]);
    $header_base64 = base64_encode($header);
    $payload_base64 = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', "$header_base64.$payload_base64", $key, true);
    $signature_base64 = base64_encode($signature);
    return "$header_base64.$payload_base64.$signature_base64";
}

function verifyToken($token) {
     $secret_key = "havellsindia2023";
    list($header_base64, $payload_base64, $signature) = explode('.', $token);
    $data = "$header_base64.$payload_base64";
    $signature_calculated = base64_encode(hash_hmac('sha256', $data, $secret_key, true));
    if ($signature === $signature_calculated) {
        $payload = json_decode(base64_decode($payload_base64), true);
        if ($payload['exp'] >= time()) {
            return $payload; // Token is valid
        }
    }
    return null;
}
//file_put_contents("error_log", print_r($payments, true));
// $sql = "CREATE TABLE cashiers LIKE employees;";
// if ($conn->query($sql) === TRUE) {
//   echo "Cahiers table created successfully";
// } else {
//   echo "Error creating table: " . $conn->error;
// }
// $conn->close();
function getWageReport ($conn,$from_date="",$to_date="",$employee_name="",$search_location="",$search_client_name="") {
	$percentage_of_tips = 97;
	$hst_percentage = 13;
	$where = "";
	if ($from_date != "" &&  $to_date != "") $where .= " and a.booking_date BETWEEN '$from_date' AND '$to_date'";
	if ($search_location != "") $where .= " and a.location = '$search_location'";
	if ($search_client_name != "") $where .= " and a.client_name = '$search_client_name'";
	$initial_location_count = 0;
	$sql5 = "SELECT count(distinct a.location) as initial_location_count FROM working_details as a WHERE '$employee_name' in (a.rmt_name,a.masseuse_name) $where limit 1";
	$qry5 = $conn->query($sql5);
	$initial_location_count = $qry5->fetch_assoc()['initial_location_count'];
	$sql4 = "SELECT count(distinct a.booking_date) as no_of_working_day FROM working_details as a WHERE '$employee_name' in (a.rmt_name,a.masseuse_name) $where limit 1";
	$qry4 = $conn->query($sql4);
	$no_of_working_days = $qry4->fetch_assoc()['no_of_working_day'];
	$sql2 = "SELECT basic_payment,commission_rate,commission_after,commission_rate_masseuse,hst FROM employees WHERE name = '$employee_name' limit 1";
	$qry2 = $conn->query($sql2);
	$row2 = $qry2->fetch_assoc();
	//$basic_payment = $row2['basic_payment'] * $no_of_working_days;
	$basic_payment = $row2['basic_payment'];
	$commission_rate = $row2['commission_rate'] / 60;  // divided 60 mins add the commission rate is hourly basic;
	$commission_rate_masseuse = $row2['commission_rate_masseuse'] / 60;  // divided 60 mins add the commission rate is hourly basic;
	$commission_after = $row2['commission_after'];
	$loc_where = ($search_location != "") ? "where address= '$search_location'" : "";
	$sql = "SELECT address FROM locations $loc_where";
	$qry = $conn->query($sql);
	$total_location = mysqli_num_rows($qry);
	$counter = 0;
	$total_location_work_time = $total_location_receipt_time = 0;
	$masseuse_array = array();
	while ($row = $qry->fetch_assoc()) {
		$location_name = $row['address'];
		$sql1 = "SELECT a.id,a.masseuse_name,a.rmt_name,a.receipt_time,a.work_time,a.booking_date,a.tips_amount FROM working_details as a WHERE a.location='$location_name' and (a.rmt_name = '$employee_name' or a.masseuse_name = '$employee_name') $where";
		$qry1 = $conn->query($sql1);
		$basic_salary = $tips_amount = $receipt_time = $work_time = $total_work_time = 0;
		while ($row1 = $qry1->fetch_assoc()) {
			$newArray = array();
			if ($row1['rmt_name'] == $employee_name) {
				$newArray['booking_date'] = $row1['booking_date'];
				$newArray['receipt_time'] = $row1['receipt_time'];
				$receipt_time += $row1['receipt_time'];
			}
			if ($row1['masseuse_name'] == $employee_name) {
				if($newArray['booking_date'] == $row1['booking_date']) {
					$newArray['work_time'] = $row1['work_time'];
				} else {
					$newArray['booking_date'] = $row1['booking_date'];
					$newArray['work_time'] = $row1['work_time'];
					$newArray['receipt_time'] = 0;
				}
				$newArray['tips_amount'] = $row1['tips_amount'];
				$work_time += $row1['work_time'];
			}
			if(count($newArray) > 0 ) array_push($masseuse_array, $newArray);
			$total_work_time = $work_time;
		}
		$total_location_work_time += $total_work_time;
		$total_location_receipt_time += $receipt_time;
		if ($total_work_time == 0) $total_location = $total_location - 1;
		$counter++;
	}
	//print_r($masseuse_array); exit();
	$newarray = array();
	foreach ($masseuse_array as $ar) {
		foreach ($ar as $k => $v) {
			if (array_key_exists($v, $newarray)) {
				$newarray[$v]['work_time'] = $new_work_time = $newarray[$v]['work_time'] + $ar['work_time'];
				$newarray[$v]['work_time_effective'] = ($new_work_time > $commission_after) ? $new_work_time - $commission_after : '0';
				$newarray[$v]['commission_price'] = $newarray[$v]['work_time_effective'] * $commission_rate_masseuse;
				$newarray[$v]['receipt_time'] = $newarray[$v]['receipt_time'] + $ar['receipt_time'];
				$newarray[$v]['tips_amount'] = $newarray[$v]['tips_amount'] + $ar['tips_amount'];
			} else if ($k == 'booking_date') {
				$ar['work_time_effective'] = ($ar['work_time'] > $commission_after) ? $ar['work_time'] - $commission_after : '0';
				$ar['commission_price'] = $ar['work_time_effective'] * $commission_rate_masseuse;
				$newarray[$v] = $ar;
			}
		}
	}
	$commission_amount = 0;
	$basicSalaryArr =  array();
	$locCount = 0;


	foreach ($newarray as $new) {
		/* Basic Salary Calculation */
		$bookingDate = $new['booking_date'];
		$locQry = "SELECT a.location FROM working_details as a WHERE a.booking_date='$bookingDate' and (a.rmt_name = '$employee_name' or a.masseuse_name = '$employee_name') $where limit 1";


		$locRaw = $conn->query($locQry);
		$basicSalaryArr[$bookingDate] = trim($locRaw->fetch_assoc()['location']);
		/* Basic Salary Calculation */
		$commission_amount += $new['commission_price'];
		$locCount++;
	}

	$NoOfDaysCalculation = array_count_values($basicSalaryArr);
	$commission_receipt_amount = 0;
	if ($total_location_receipt_time > 0) {
		$commission_receipt_amount = $total_location_receipt_time * $commission_rate;
	}
	$counter3 = $total_salary_amount = 0;
	$result = array();
	$sql3 = "SELECT address FROM locations $loc_where";
	$qry3 = $conn->query($sql);
	$grand_tatal_tips = $grand_total_record = $grand_total_commission = $grand_hst_amount = $grand_basic_payment = 0;
	$basicSalaryArr = array();
	while ($row3 = $qry3->fetch_assoc()) {
		$location_name = $row3['address'];
		$dtm_commission_amt = 0;
		foreach ($newarray as $new) {
			$booking_date = $new['booking_date'];
			$dtm_work_time = $new['work_time'];
			$dtm_commission_price = $new['commission_price'];
			$sql5 = "SELECT a.id,a.work_time FROM working_details as a
    		WHERE a.location='$location_name' and (a.masseuse_name = '$employee_name') and booking_date = '$booking_date'";
			$qry5= $conn->query($sql5);
			$dtm_total_work_time = 0;
			while ($row5 = $qry5->fetch_assoc()) {
				$dtm_total_work_time += $row5['work_time'];
			}
			$dtm_commission_amt +=($dtm_work_time != 0)?($dtm_total_work_time/$dtm_work_time) * $dtm_commission_price: 0;
		}
		$sql1 = "SELECT a.id,a.service,a.tips_amount,a.masseuse_name,a.rmt_name,a.receipt_time,a.work_time FROM working_details as a
    	WHERE a.location='$location_name' and (a.rmt_name = '$employee_name' or a.masseuse_name = '$employee_name') $where";
		$qry1 = $conn->query($sql1);
		$basic_salary = $tips_amount = $receipt_time = $work_time = $total_work_time = $tips_amount_without_card_charge = $tips_amount_card_charge = 0;
		while ($row1 = $qry1->fetch_assoc()) {
			if ($row1['masseuse_name'] == $employee_name) $tips_amount += $row1['tips_amount'];
			if ($row1['rmt_name'] == $employee_name) $receipt_time += $row1['receipt_time'];
			if ($row1['masseuse_name'] == $employee_name) $work_time += $row1['work_time'];
		}
		if ($tips_amount > 0) {
			$tips_amount_without_card_charge = $tips_amount ;
			$tips_amount = $tips_amount * ($percentage_of_tips / 100);  // 97 % tips and 3 % card fee;
			$tips_amount_card_charge = $tips_amount_without_card_charge - $tips_amount;
		}
		$grand_tatal_tips += $tips_amount;
		$total_record = mysqli_num_rows($qry1);
		$grand_total_record += $total_record;
		if (($work_time != 0 || $receipt_time != 0) &&  $total_record > 0) {
			$no_of_working_day = $NoOfDaysCalculation[$location_name];


			//$no_of_working_day = $basicPayQrRow['no_of_working_day'];

			$grand_basic_payment += $basic_salary = $no_of_working_day * $basic_payment;
			$pass_amount = 0;
			$location_wise_commission = $dtm_commission_amt + ($receipt_time * $commission_rate);
			$grand_total_commission += $location_wise_commission;
			$location_hst_amount = ($row2['hst'] != "") ? ($basic_salary + $location_wise_commission) * ($hst_percentage / 100): 0;
			$pass_amount = $basic_salary  + $location_wise_commission + $tips_amount + $location_hst_amount;
			$grand_hst_amount += $location_hst_amount;
			$result[$counter3]['tips_amount'] = sprintf("%0.2f", $tips_amount);
			//$result[$counter3]['tips_amount_card_charge'] = sprintf("%0.2f", $tips_amount_card_charge); // client not require this field
			$result[$counter3]['basic_salary'] = sprintf("%0.2f", $basic_salary );
			$result[$counter3]['commission_salary'] = sprintf("%0.2f", ($location_wise_commission));
			$result[$counter3]['location_hst_amount'] = sprintf("%0.2f", ($location_hst_amount));
			$result[$counter3]['location_name'] = $row3['address'];
			$result[$counter3]['pass_amount'] = sprintf("%0.2f", ($pass_amount));
			$counter3++;
		}
	}
	/**************for print **************** */
	$working_details_print = array();
	$couter_print = 0;
	foreach ($newarray as $key => $row) {
		$card_charge = $new_comm = 0;
		$new_comm = $row['commission_price'] + ($row['receipt_time'] * $commission_rate);
		$card_charge = $row['tips_amount'] * ((100 - $percentage_of_tips) / 100);
		$working_details_print[$couter_print] = $row;
		$working_details_print[$couter_print]['work_time'] = ($row['work_time']) ? $row['work_time'] : 0;
		$working_details_print[$couter_print]['tips_amount'] = sprintf("%0.2f", ($row['tips_amount']));
		$working_details_print[$couter_print]['card_charge'] = sprintf("%0.2f", ($card_charge));
		$working_details_print[$couter_print]['receipt_hour'] = $row['receipt_time']/60 ;
		$working_details_print[$couter_print]['work_hour'] = $row['work_time']/60;
		$working_details_print[$couter_print]['commission_price'] = $new_comm;
		$working_details_print[$couter_print]['basic_payment'] = sprintf("%0.2f", ($row2['basic_payment']));
		$working_details_print[$couter_print]['total_price_day_wise'] = $row2['basic_payment'] + $row['tips_amount'] + $new_comm;
		$couter_print++;
	}
	array_multisort($working_details_print, SORT_ASC, $newarray);
	/************* for print ************** */
	if ($grand_total_record > 0) $total_salary_amount = $grand_total_commission + $grand_basic_payment + $grand_tatal_tips + $grand_hst_amount;
	else $total_salary_amount = 0;
	$combined_array = array("wage_reports" => $result, "total_salary_amount" => sprintf("%0.2f", $total_salary_amount),"working_details_print" => $working_details_print,"grand_total_commission"=>$grand_total_commission,"grand_tatal_tips" => $grand_tatal_tips);
	return $combined_array;
}


function getEmpDetail ($conn,$from_date="",$to_date="",$employee_name="",$search_location="",$search_client_name="",$login_user_type=0,$login_emp_name="") {
	$where = $whereNew = "";
	if ($from_date != "" &&  $to_date != "") $where .= " and a.booking_date BETWEEN '$from_date' AND '$to_date'";
	if ($search_location != "") $whereNew .= $where .= " and a.location = '$search_location'";
	if ($search_client_name != "") $whereNew .= $where .= " and a.client_name = '$search_client_name'";
	//$employee_name = "Gerry";
	if ($login_emp_name != "" && $login_user_type == 3) $whereNew .= $where .= " and a.rmt_name = '$login_emp_name'";
	$loc_where = ($search_location != "") ? "where address= '$search_location'" : "";
	$sql = "SELECT address FROM locations $loc_where";
	$qry = $conn->query($sql);
	$allEmp = array();
	while ($row = $qry->fetch_assoc()) {
		$location_name = $row['address'];
		$sql1 = "SELECT a.booking_date FROM working_details as a WHERE a.location='$location_name' $where";
		$qry1 = $conn->query($sql1);
		while ($row1 = $qry1->fetch_assoc()) {
			$oneEmp = array();
			$oneEmp['booking_date'] = $row1['booking_date'];
			if($oneEmp['booking_date'] != $row1['booking_date']) {
			 	$oneEmp['booking_date'] = $row1['booking_date'];
			}
			if(count($oneEmp) > 0 ) array_push($allEmp, $oneEmp);
		}
	}
	$booking_date =  array_map("unserialize", array_unique(array_map("serialize", $allEmp)));
	$key_values = array_column($booking_date, 'booking_date');
	array_multisort($key_values, SORT_ASC, $booking_date);
	$mainarr = array();
	foreach($booking_date as $b_date) {
		$bookingDate = ($b_date['booking_date']) ? date("Y-m-d",strtotime($b_date['booking_date'])) : "";
		$sql2 = "SELECT a.id,a.receipt_time,a.work_time,a.tips_amount,a.masseuse_name,a.rmt_name,a.booking_date FROM working_details as a WHERE a.booking_date='$bookingDate' and (masseuse_name != '' or rmt_name != '') $whereNew";
		$qry2 = $conn->query($sql2);
		$newarray = array();
		$newArray1= array();
		while ($row2 = $qry2->fetch_assoc()) {
			foreach ($row2 as $k => $v) {
				if($v != "" && ($k == "masseuse_name" || $k == "rmt_name")) {
					if (array_key_exists($v, $newarray)) {
						if($newarray[$v]['emp_name'] == $row2['masseuse_name'] && $newarray[$v]['emp_name'] == $row2['rmt_name']) {
							if(!in_array($row2['id'],$newArray1)) {
								$newarray[$v]['work_time_cal'] = $newarray[$v]['work_time_cal'] + $row2['work_time'];
								$newarray[$v]['tips_amount_cal'] = $newarray[$v]['tips_amount_cal'] + $row2['tips_amount'];
								$newarray[$v]['receipt_time_cal'] = $newarray[$v]['receipt_time_cal'] + $row2['receipt_time'];
								array_push($newArray1,$row2['id']);
							}
						} else {
							if($newarray[$v]['emp_name'] == $row2['masseuse_name']) {
								$newarray[$v]['work_time_cal'] = $newarray[$v]['work_time_cal'] + $row2['work_time'];
								$newarray[$v]['tips_amount_cal'] = $newarray[$v]['tips_amount_cal'] + $row2['tips_amount'];
							}
							if($newarray[$v]['emp_name'] == $row2['rmt_name']) {
								$newarray[$v]['receipt_time_cal'] = $newarray[$v]['receipt_time_cal'] + $row2['receipt_time'];
							}
						}
					} else if ($k == 'masseuse_name') {
						$row4=$row2;
						$row4['emp_name'] = $v;
						$row4['work_time_cal'] = $row2['work_time'];
						$row4['tips_amount_cal'] = $row2['tips_amount'];
						$row4['receipt_time_cal'] = ($row2['rmt_name'] == $v) ? $row2['receipt_time'] : 0;
						$newarray[$v] = $row4;
						if (!array_key_exists($row2['rmt_name'], $newarray) && $row2['rmt_name'] != "") {
							$row3=$row2;
							$row3['emp_name'] = $row2['rmt_name'];
							$row3['work_time_cal'] = 0;
							$row3['tips_amount_cal'] = 0;
							$row3['receipt_time_cal'] = $row2['receipt_time'];
							$newarray[$row2['rmt_name']] = $row3;
						}
						break;
					} else if ($k == 'rmt_name') {
						$row5 = $row2;
						$row5['work_time_cal'] = 0;
						$row5['receipt_time_cal'] = $row2['receipt_time'];
						$row5['tips_amount_cal'] = 0;
						$row5['emp_name'] = $v;
						$newarray[$v] = $row5;
						break;
					}
				}
			}
		}
		$mainarr[$bookingDate] = $newarray;
	}
	$combined_array = array("wage_reports" => $mainarr);
	return $combined_array;
}
if($do_action == "update_color_palette") {
	$color_pallet = $data->color_palette;
	$workingId = $data->workingId;
	$sql = "UPDATE working_details SET color_pallet='$color_pallet' WHERE id='$workingId'";
	$result = $conn->query($sql);
	$response['message'] = "Color Palette Update Successfully";
	echo json_encode($response);
}

if ($do_action == "treatment_note_show") {
	$workId = $data->work_id;
	$tech_data = array();
	if($workId != "") {
		$sql = "SELECT file_name,note_id,treatment_note_for,treatment_date,duration_time,fee,consent_recived,therapist_name,clinical_finding,clinical_reaction,recommended_selfcare,treatment_time,grade,area_treated_other,tech_used_other,consent_other from treatment_note WHERE work_id = '$workId' order by note_id desc limit 1";
		$qry = $conn->query($sql);
		while ($row = $qry->fetch_assoc()) {


			$file_fullpath = null;


			if(file_exists($pdf_path.$row['file_name']) && $row['file_name'] != "") {
				$file_fullpath = $base_url.$pdf_path.$row['file_name'];
			}
			$row['file_fullpath'] = $file_fullpath;


			$noteId = $row['note_id'];
			$sql1 = "SELECT treatment_id,treatment_name FROM treatment_used WHERE noteId = '$noteId'";
			$qry1 = $conn->query($sql1);
			$tech_used = array();
			$tech_count = 0;
			while ($row1 = $qry1->fetch_assoc()) {
				$tech_used[$tech_count] = $row1;
				$tech_count++;
			}

			$sql2 = "SELECT area_treated_id,area_treated_name FROM area_trated WHERE noteId = '$noteId'";
			$qry2 = $conn->query($sql2);
			$area_trated= array();
			$area_count = 0;
			while ($row2 = $qry2->fetch_assoc()) {
				$area_trated[$area_count] = $row2;
				$area_count++;
			}

			$tech_data = $row;
			$tech_data['tech_used'] = $tech_used;
			$tech_data['area_treated'] = $area_trated;
		}
	}


	$result['tech_used'] = $TECH_USED;
	$result['area_treated'] = $AREA_TREATED;
	$result['tech_data'] = $tech_data;
	echo json_encode($result);
}

if($do_action == "treatment_note_add") {
	$response['message'] = "Treatment Note Add Successfully";
	$conn->begin_transaction();
	try {
		$noteId = $data->noteId;
		$workId = $data->workId;
		$treatment_note_for = mysqli_real_escape_string($conn, trim($data->treatmentNoteFor));
		$treatment_date = $data->treatmentDate;
		$duration_time = $data->durationTime;
		$fee = $data->fee;
		$consent_recived = $data->consentRecived;
		$therapist_name = mysqli_real_escape_string($conn, trim($data->therapistName));
		$clinical_finding = mysqli_real_escape_string($conn, trim($data->clinicalFinding));
		$clinical_reaction = mysqli_real_escape_string($conn, trim($data->clinicalReaction));
		$recommended_selfcare = mysqli_real_escape_string($conn, trim($data->recommendedSelfcare));

		$treatment_time = $data->treatmentTime;
		$tech_used_other = ($data->techOther !== undefined) ? mysqli_real_escape_string($conn, trim($data->techOther)) : null;
		$area_treated_other = ($data->areaOther !== undefined) ? mysqli_real_escape_string($conn, trim($data->areaOther)) : null;
		$consent_other = ($data->consentOther !== undefined) ? mysqli_real_escape_string($conn, trim($data->consentOther)) : null;
		$grade = trim($data->grade);


		if($noteId !== undefined && $noteId !== "") {
			$update_sql = "UPDATE treatment_note SET work_id='$workId', treatment_note_for='$treatment_note_for', treatment_date='$treatment_date', duration_time='$duration_time', fee='$fee', consent_recived='$consent_recived', therapist_name='$therapist_name', clinical_finding='$clinical_finding', clinical_reaction='$clinical_reaction', recommended_selfcare='$recommended_selfcare',treatment_time='$treatment_time',tech_used_other='$tech_used_other',area_treated_other='$area_treated_other',grade='$grade',consent_other='$consent_other' WHERE note_id = '$noteId'";
				$conn->query($update_sql);
				$response['message'] = "Treatment Note Updated Successfully";
		} else {
			$sql = "INSERT INTO treatment_note (work_id, treatment_note_for, treatment_date, duration_time, fee, consent_recived, therapist_name, clinical_finding, clinical_reaction, recommended_selfcare,treatment_time,tech_used_other,area_treated_other,grade,consent_other) VALUES ('$workId', '$treatment_note_for', '$treatment_date', '$duration_time', '$fee', '$consent_recived', '$therapist_name', '$clinical_finding', '$clinical_reaction','$recommended_selfcare','$treatment_time','$tech_used_other','$area_treated_other','$grade','$consent_other')";
			if ($conn->query($sql) === true) {
				$noteId = $conn->insert_id;
			};
			$response['message'] = "Treatment Note Add Successfully";
		}

		$techUsed = json_decode($data->techUsed, true);
		$techUsedArr = array();
		if(count($techUsed) > 0) {
			if($noteId !== undefined) {
				$delete_sql = "DELETE from treatment_used WHERE noteId = '$noteId'";
				$conn->query($delete_sql);
			}
			foreach ($techUsed as $tech_key => $treatment_id) {
				$techArr = array_filter($TECH_USED, function($tech_item) use ($treatment_id) {
					return $tech_item['id'] === (int) $treatment_id;
				});
				if (!empty($techArr)) {
					$techReset = reset($techArr);
					$treatment_name = $techReset['name'];
					array_push($techUsedArr, $treatment_name);
					$sql1 = "INSERT INTO  treatment_used (noteId , treatment_id, treatment_name) VALUES ('$noteId', '$treatment_id', '$treatment_name')";
					$conn->query($sql1);
				}
			}
		}


		$areaTrated = json_decode($data->areaTrated, true);
		$areaTratedArr = array();
		if(count($areaTrated) > 0 && $noteId !== undefined ) {
			if($noteId !== undefined) {
				$delete_sql1 = "DELETE from area_trated WHERE noteId = '$noteId'";
				$conn->query($delete_sql1);
			}
			foreach ($areaTrated as $area_key => $area_treated_id) {
				$resultArray = array_filter($AREA_TREATED, function($item) use ($area_treated_id) {
				    return $item['id'] === (int) $area_treated_id;
				});
				if (!empty($resultArray)) {
				    $getReset = reset($resultArray);
				    $area_treated_name = $getReset['name'];
				    array_push($areaTratedArr,$area_treated_name);
					$sql2 = "INSERT INTO area_trated (noteId, area_treated_id, area_treated_name) VALUES ('$noteId', '$area_treated_id','$area_treated_name')";
					$conn->query($sql2);
				}
			}
		}



		$consentRecived = array();
		$consent_recived_val = explode(",",$consent_recived);
		if(in_array("1",$consent_recived_val)) array_push($consentRecived,"Treatment");
		if(in_array("2",$consent_recived_val)) array_push($consentRecived,"Assessment");
		if(in_array("99",$consent_recived_val)) array_push($consentRecived,"Other");

		$techUsedExplode = implode(", ",$techUsedArr);
		$areaTratedExplode = implode(", ",$areaTratedArr);
		$treat_time = date("H:i A",strtotime($treatment_time));
		$consentRecivedString = implode(",",$consentRecived);

		$finalcontents = "<html>
			<body>
			    <table style='width: 100%;'>
			        <tr>
			            <td colspan='4'>
			                <h4 style='margin-bottom: 45px'>Treatment Notes For: $treatment_note_for</h4>
			            </td>
			        </tr>
			        <tr>
			           	<td style='width: 25%;'>Date: $treatment_date</td> <!-- Adjust column widths -->
                		<td style='width: 25%;'>Time: $treat_time</td>
                		<td style='width: 25%;'>Duration: $duration_time Min</td>
                		<td style='width: 25%;'>Fees $: $fee</td>

			        </tr>
			        <tr>
			        	<td colspan='2' style='width: 50%;'>Informed Consent Received: $consentRecivedString</td>
                		<td colspan='2' style='width: 50%;'>Therapist: $therapist_name</td>
			        </tr>";

			        if($consent_other != '') { $finalcontents .="<tr>
                			<td colspan='4' style='width: 100%;'>Informed Consent Other : $consent_other</td>
			        	</tr>";
			        }

			    	$finalcontents .="</table>
			    		<table style='width: 100%;'>

			    	<tr>
			    	 <td colspan='4'>
			                <h5>Techniques used:</h5>
			            </td>
			    	</tr>
			        <tr>

			            <td style='width:400px;'>$techUsedExplode</td>
			        </tr>";
				if($tech_used_other != null ) {
					$finalcontents .= "<tr>
						         <td style='width:300px;'><h5>Other :  $tech_used_other </h5></td>
						        </tr>";
				}
				$finalcontents .= " <tr><td style='width:300px;'>Grade: $grade </td>
			        </tr>
			    </table>
			    <table style='width: 100%;'>

			    	<tr>
			    	 <td colspan='4'>
			                <h5>Area Treated:</h5>
			            </td>
			    	</tr>

			        <tr>
			            <td style='width:400px;'>$areaTratedExplode</td>
			        </tr>";
				if($area_treated_other != null ) {
				$finalcontents .= "<tr>
				         <td style='width:300px;'><h5>Other : $area_treated_other </h5>  </td>
				        </tr>";
				}
				$finalcontents .= "</table>
			    <table style='width: 100%;'>
			        <tr>
			            <td>
			                <h5>Clinical Findings:</h5> $clinical_finding
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <h5>Clinical Reaction / Feedback:</h5> $clinical_reaction
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <h5>Recommended Self-care:</h5> $recommended_selfcare
			            </td>
			        </tr>
			    </table>
			</body>
		</html>";

		if($noteId != "" && $noteId != undefined) {
			$select_filename_sql = "SELECT file_name from treatment_note WHERE note_id = '$noteId'";
		    $select_qry = $conn->query($select_filename_sql);
		    $res_file_name = $select_qry->fetch_object();

			if(file_exists($pdf_path.$res_file_name->file_name)) {
				unlink($pdf_path.$res_file_name->file_name);
			}
		    $html2pdf = new HTML2PDF('P', 'A4', 'en', true, 'UTF-8', array(5, 5, 5, 5));
		    $html2pdf->setTestTdInOnePage(false);
		    $html2pdf->pdf->SetDisplayMode('real','continuous');
		    $html2pdf->pdf->SetLineWidth('1');
		    $html2pdf->setDefaultFont("helvetica");
		    $html2pdf->writeHTML($finalcontents);
		    $pdffilename = time().rand(1,9999999).$noteId.".pdf";
		    $pdffilepath=$pdf_path.$pdffilename;
		    $html2pdf->Output($pdffilepath,'F');

		    $update_filename_sql = "UPDATE treatment_note SET file_name='$pdffilename' WHERE note_id = '$noteId'";
		    $conn->query($update_filename_sql);
		}
		$conn->commit();
	} catch (Exception $e) {
    	$conn->rollback();
    	$response['message'] = "Error: " . $e->getMessage();
	}
	$conn->close();
	echo json_encode($response);
}

if($do_action == "fetch_sidebar") {
	$text = '';
	$verified_payload = verifyToken($data->token);
	$user_type = 0;
	$name ="";
	if ($verified_payload) {
		$user_type = $verified_payload['user_type'];
		$name = $verified_payload['name'];
	}
	if ($user_type == 1) {
		$text = '<ul>
           	<li><a href="'.$base_url.'employees.php">Practitioners</a></li>
           	<li><a href="'.$base_url.'cashiers.php">Cashiers</a></li>
           	<li><a href="'.$base_url.'locations.php">Locations</a></li>
           	<li><a href="'.$base_url.'payment-methods.php">Payment Methods</a></li>
           	<li><a href="'.$base_url.'services.php">Services</a></li>
           	<li><a href="'.$base_url.'working-details.php">Working Details</a></li>
           	<li><a href="'.$base_url.'cashiers-daily-report.php">Cashiers Daily Wage</a></li>
           	<li><a href="'.$base_url.'sales-data.php">Sales Data</a></li>
           	<li><a href="'.$base_url.'wage-report.php">Wage Report</a></li>
			<li><a href="'.$base_url.'configuration.php">Configuration</a></li>
           	<li><a href="javascript:void(0)" onclick="logout()">Logout</a></li>
        </ul>';
	} else if ($user_type == 2) {
		$text = '<ul>
	           <li><a href="'.$base_url.'working-details.php">Working Details</a></li>
	           <li><a href="/cashiers-daily-report.php">Cashiers Daily Wage</a></li>
	           <li><a href="javascript:void(0)" onclick="logout()">Logout</a></li>
	         </ul>';
	} else if ($user_type == 3) {
		$text = '<ul>
	           <li><a href="'.$base_url.'working-details.php">Working Details</a></li>
	           <li><a href="javascript:void(0)" onclick="logout()">Logout</a></li>
	         </ul>';
	}
	echo $text; exit();
}