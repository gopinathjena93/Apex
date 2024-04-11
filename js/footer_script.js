const url = window.location.pathname;
const urlParts = url.split('/');
const pageURL = '/'+ urlParts[urlParts.length - 1];console.log('pageURL',pageURL);
const cashierPermissionUrl = ["/working-details.php", "/cashiers-daily-report.php", "/treatment-note.php","/"];
const EmployeePermissionUrl = ["/working-details.php","/treatment-note.php","/"];
checkUserLoginStatus();
const base_url = "https://backoffice.kingthaimassage.com/";

//Configuration Section
if (pageURL == "/configuration.php") {
	window.addEventListener("load", showConfiguration);
	function showConfiguration() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_configuration"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let configObj = JSON.parse(this.responseText);
			for (let cnt in configObj) {
				if(configObj[cnt].id == 1 ) {
					document.getElementById("config_value").value = configObj[cnt].config_value;
				}
			}
		}
	}
}
function updateConfiguration(id) {
	let xhr = new XMLHttpRequest();
	const config_value = document.getElementById('config_value').value;
	let jsonData = {
		id: id,
		config_value: config_value,
		do_action: "update_configuration"
	}
	let jsonString = JSON.stringify(jsonData);
	xhr.open("POST", "functions.php", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(jsonString);
	xhr.onload = function () {
		window.location.reload();
	}
}

// Location Section
if (pageURL == "/locations.php") {
	let addLocationButton = document.querySelector('#add_location');
	addLocationButton.addEventListener("click", locationFormShow);
	function locationFormShow() {
		let text = '\
      <div class="location_action_form">\
        <input type="text" name="locations_address" placeholder="Address" size="49" />\
        <button class="action_btn" onclick="locationAdd();">Submit</button>\
      </div>\
    ';
		document.getElementById("data").innerHTML = text;
	}
	function locationAdd() {
		let locationsAddress = document.querySelector('.location_action_form input').value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			address: locationsAddress,
			do_action: "add_location"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function locationDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let locationsId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: locationsId,
				do_action: "delete_location"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	window.addEventListener("load", showLocations);
	function showLocations() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_locations"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let locationsObj = JSON.parse(this.responseText);
			let text = '<table border="1" class="ktm_table">'
			for (let x in locationsObj) {
				text += '\
          <tr>\
          <td>' + locationsObj[x].address + '</td> \
          <td><button class="action_btn" onclick="locationDelete(this);" data-id="'+ locationsObj[x].id + '">Delete</button></td>\
          </tr>\
        ';
			}
			text += '</table>'
			document.getElementById("data").innerHTML = text;
		}
	}
}
// Employee Section
if (pageURL == "/employees.php") {
	let addEmployeeButton = document.querySelector('#add_employee');
	addEmployeeButton.addEventListener("click", employeeFormShow);
	function employeeFormShow() {
		let text = '\
      <div id="employee-action-form">\
        <label> Name : </label><br>\
        <input type="text" name="name" /><br />\
        <label> Password : </label><br>\
        <input type="text" name="password" /><br />\
        <label> Nickname : </label><br>\
        <input type="text" name="nickname" /><br />\
        <label> Email : </label><br>\
        <input type="email" name="email"  /><br />\
        <label> Phone : </label><br>\
        <input type="text" name="phone" /><br />\
        <label> Address : </label><br>\
        <input type="text" name="address" /><br />\
        <label> Social Insurance Number : </label><br>\
        <input type="text" name="sin" /><br />\
        <label> HST Number : </label><br>\
        <input type="text" name="hst"  /><br />\
        <label> Basic Payment : </label><br>\
        <input type="text" name="basic_payment" /><br />\
        <label> Receipt Rate : </label><br>\
        <input type="text" name="commission_rate" /><br />\
        <label> Commission Rate : </label><br>\
        <input type="text" name="commission_rate_masseuse" /><br />\
        <label> Commission After : </label><br>\
        <input type="text" name="commission_after" /><br />\
        <button class="action_btn" onclick="employeeAdd();">Submit</button>\
      </div>\
    ';
		document.getElementById("data").innerHTML = text;
	}
	function employeeAdd() {
		let employeeName = document.querySelector("#employee-action-form input[name='name']").value;
		let employeePassword = document.querySelector("#employee-action-form input[name='password']").value;
		let employeeNickname = document.querySelector("#employee-action-form input[name='nickname']").value;
		let employeeEmail = document.querySelector("#employee-action-form input[name='email']").value;
		let employeePhone = document.querySelector("#employee-action-form input[name='phone']").value;
		let employeeAddress = document.querySelector("#employee-action-form input[name='address']").value;
		let employeeSIN = document.querySelector("#employee-action-form input[name='sin']").value;
		let employeeHST = document.querySelector("#employee-action-form input[name='hst']").value;
		let employeeBasicPayment = document.querySelector("#employee-action-form input[name='basic_payment']").value;
		let employeeCommissionRate = document.querySelector("#employee-action-form input[name='commission_rate']").value;
		let commissionRateMasseuse = document.querySelector("#employee-action-form input[name='commission_rate_masseuse']").value;
		let employeeCommissionAfter = document.querySelector("#employee-action-form input[name='commission_after']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			name: employeeName,
			password: employeePassword,
			nickname: employeeNickname,
			email: employeeEmail,
			phone: employeePhone,
			address: employeeAddress,
			sin: employeeSIN,
			hst: employeeHST,
			basic_payment: employeeBasicPayment,
			commission_rate: employeeCommissionRate,
			commission_rate_masseuse: commissionRateMasseuse,
			commission_after: employeeCommissionAfter,
			do_action: "add_employee"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}

	function employeeDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let employeeId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: employeeId,
				do_action: "delete_employee"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}

	function employeeEdit(obj) {
		let employeeId = obj.getAttribute('data-id');
		let xhr = new XMLHttpRequest();
		let jsonData = {
			id: employeeId,
			do_action: "edit_employee"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let employeeObj = JSON.parse(this.responseText);
			let text = '\
        <div id="employee-action-form">\
          <label> Name : </label><br>\
          <input type="text" disabled name="name" value="' + employeeObj.name + '" /><br />\
          <label> Password : </label><br>\
          <input type="text"  name="password" value="" /><br />\
          <label> Nickname : </label><br>\
          <input type="text" name="nickname" value="' + employeeObj.nickname + '" /><br />\
          <label> Email : </label><br>\
          <input type="email" name="email"  value="' + employeeObj.email + '" /><br />\
          <label> Phone : </label><br>\
          <input type="text" name="phone"  value="' + employeeObj.phone + '" /><br />\
          <label> Address : </label><br>\
          <input type="text" name="address"  value="' + employeeObj.address + '" /><br />\
          <label> Social Insurance Number : </label><br>\
          <input type="text" name="sin"  value="' + employeeObj.sin + '" /><br />\
          <label> HST Number : </label><br>\
          <input type="text" name="hst"  value="' + employeeObj.hst + '" /><br />\
          <label> Basic Payment : </label><br>\
          <input type="text" name="basic_payment"  value="' + employeeObj.basic_payment + '" /><br />\
          <label> Receipt Rate: </label><br>\
          <input type="text" name="commission_rate" value="' + employeeObj.commission_rate + '" /><br />\
          <label> Commission Rate: </label><br>\
          <input type="text" name="commission_rate_masseuse" value="' + employeeObj.commission_rate_masseuse + '" /><br />\
          <label> Commission After : </label><br>\
          <input type="text" name="commission_after" value="' + employeeObj.commission_after + '" /><br />\
          <button class="action_btn" onclick="employeeUpdate(this);" data-id="'+ employeeObj.id + '">Update</button>\
        </div>\
      ';
			document.querySelector('.ktm_table').style.display = "none";
			document.getElementById("data").innerHTML = text;
			document.querySelector('#employee-action-form input[name="name"]').focus();
		}
	}

	function employeeUpdate(obj) {
		let employeeId = obj.getAttribute('data-id');
		let employeePassword = document.querySelector("#employee-action-form input[name='password']").value;
		let employeeNickname = document.querySelector("#employee-action-form input[name='nickname']").value;
		let employeeEmail = document.querySelector("#employee-action-form input[name='email']").value;
		let employeePhone = document.querySelector("#employee-action-form input[name='phone']").value;
		let employeeAddress = document.querySelector("#employee-action-form input[name='address']").value;
		let employeeSIN = document.querySelector("#employee-action-form input[name='sin']").value;
		let employeeHST = document.querySelector("#employee-action-form input[name='hst']").value;
		let employeeBasicPayment = document.querySelector("#employee-action-form input[name='basic_payment']").value;
		let employeeCommissionRate = document.querySelector("#employee-action-form input[name='commission_rate']").value;
		let commissionRateMasseuse = document.querySelector("#employee-action-form input[name='commission_rate_masseuse']").value;
		let employeeCommissionAfter = document.querySelector("#employee-action-form input[name='commission_after']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			id: employeeId,
			password: employeePassword,
			nickname: employeeNickname,
			email: employeeEmail,
			phone: employeePhone,
			address: employeeAddress,
			sin: employeeSIN,
			hst: employeeHST,
			basic_payment: employeeBasicPayment,
			commission_rate: employeeCommissionRate,
			commission_rate_masseuse: commissionRateMasseuse,
			commission_after: employeeCommissionAfter,
			do_action: "update_employee"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		//xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}

	window.addEventListener("load", showEmployees);
	function showEmployees() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_employees"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let employeesObj = JSON.parse(this.responseText);
			let text = '\
      <table class="ktm_table">\
      <tr>\
        <th>Name</th>\
        <th>Nickname</th>\
        <th>Email</th>\
        <th>Phone</th>\
        <th>Address</th>\
        <th>SIN</th>\
        <th>HST</th>\
        <th>Basic Pay</th>\
        <th>Rcpt. Rate</th>\
        <th>Comm. Rate</th>\
        <th>Comm. After</th>\
        <th colspan="2">Action</th>\
      </tr>\
      ';
			for (let x in employeesObj) {
				text += '\
          <tr>\
          <td>' + employeesObj[x].name + '</td> \
          <td>' + employeesObj[x].nickname + '</td> \
          <td>' + employeesObj[x].email + '</td> \
          <td>' + employeesObj[x].phone + '</td> \
          <td>' + employeesObj[x].address + '</td> \
          <td>' + employeesObj[x].sin + '</td> \
          <td>' + employeesObj[x].hst + '</td> \
          <td>' + employeesObj[x].basic_payment + '</td> \
          <td>' + employeesObj[x].commission_rate + '</td> \
          <td>' + employeesObj[x].commission_rate_masseuse + '</td> \
          <td>' + employeesObj[x].commission_after + '</td> \
          <td><button class="action_btn" onclick="employeeEdit(this);" data-id="'+ employeesObj[x].id + '">Edit</button></td> \
          <td><button class="action_btn" onclick="employeeDelete(this);" data-id="'+ employeesObj[x].id + '">Delete</button></td>\
          </tr>\
        ';
			}
			text += '</table>'
			document.getElementById("data").innerHTML = text;
		}
	}
}
// Cashiers Section
if (pageURL == "/cashiers.php") {
	let addCashierButton = document.querySelector('#add_cashier');
	addCashierButton.addEventListener("click", cashierFormShow);
	function cashierFormShow() {
		let text = '\
      <div id="cashier-action-form">\
        <label>Name : </label><br />\
        <input type="text" name="name" autocomplete="off" /><br />\
        <label>Nickname : </label><br />\
        <input type="text" name="nickname" autocomplete="off"  /><br />\
        <label>Email : </label><br />\
        <input type="email" name="email" autocomplete="off"  /><br />\
        <label>Phone : </label><br />\
        <input type="text" name="phone" autocomplete="off" /><br />\
        <label>Address : </label><br />\
        <input type="text" name="address" autocomplete="off"  /><br />\
        <label>Social Insurance Number : </label><br />\
        <input type="text" name="sin" autocomplete="off"  /><br />\
        <label>HST Number : </label><br />\
        <input type="text" name="hst" autocomplete="off"  /><br />\
        <label>Hourly Rate : </label><br />\
        <input type="text" name="hourly_rate" autocomplete="off" /><br />\
        <button class="action_btn" onclick="cashierAdd();">Submit</button>\
      </div>\
    ';
		document.getElementById("data").innerHTML = text;
	}
	function cashierAdd() {
		let cashierName = document.querySelector("#cashier-action-form input[name='name']").value;
		let cashierNickname = document.querySelector("#cashier-action-form input[name='nickname']").value;
		let cashierEmail = document.querySelector("#cashier-action-form input[name='email']").value;
		let cashierPhone = document.querySelector("#cashier-action-form input[name='phone']").value;
		let cashierAddress = document.querySelector("#cashier-action-form input[name='address']").value;
		let cashierSIN = document.querySelector("#cashier-action-form input[name='sin']").value;
		let cashierHST = document.querySelector("#cashier-action-form input[name='hst']").value;
		let hourlyRate = document.querySelector("#cashier-action-form input[name='hourly_rate']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			name: cashierName,
			nickname: cashierNickname,
			email: cashierEmail,
			phone: cashierPhone,
			address: cashierAddress,
			sin: cashierSIN,
			hst: cashierHST,
			hourly_rate: hourlyRate,
			do_action: "add_cashier"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function cashierDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let cashierId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: cashierId,
				do_action: "delete_cashier"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	function cashierEdit(obj) {
		let cashierId = obj.getAttribute('data-id');
		let xhr = new XMLHttpRequest();
		let jsonData = {
			id: cashierId,
			do_action: "edit_cashier"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let cashierObj = JSON.parse(this.responseText);
			let text = '\
        <div id="cashier-action-form">\
        <label>Name : </label><br />\
        <input type="text" name="name" autocomplete="off" value="' + cashierObj.name + '" /><br />\
        <label>Nickname : </label><br />\
        <input type="text" name="nickname" autocomplete="off" value="' + cashierObj.nickname + '" /><br />\
        <label>Email : </label><br />\
        <input type="email" name="email" autocomplete="off" value="' + cashierObj.email + '" /><br />\
        <label>Phone : </label><br />\
        <input type="text" name="phone" autocomplete="off" value="' + cashierObj.phone + '" /><br />\
        <label>Address : </label><br />\
        <input type="text" name="address" autocomplete="off" value="' + cashierObj.address + '" /><br />\
        <label>Social Insurance Number : </label><br />\
        <input type="text" name="sin" autocomplete="off" value="' + cashierObj.sin + '" /><br />\
        <label>HST Number : </label><br />\
        <input type="text" name="hst" autocomplete="off" value="' + cashierObj.hst + '" /><br />\
        <label>Hourly Rate : </label><br />\
        <input type="text" name="hourly_rate" autocomplete="off" value="' + cashierObj.hourly_rate + '"  /><br />\
        <button class="action_btn" onclick="cashierUpdate(this);" data-id="'+ cashierObj.id + '">Update</button>\
      </div>\
      ';
			document.querySelector('.ktm_table').style.display = "none";
			document.getElementById("data").innerHTML = text;
			document.querySelector('#cashier-action-form input[name="name"]').focus();
		}
	}
	function cashierUpdate(obj) {
		let cashierId = obj.getAttribute('data-id');
		let cashierName = document.querySelector("#cashier-action-form input[name='name']").value;
		let cashierNickname = document.querySelector("#cashier-action-form input[name='nickname']").value;
		let cashierEmail = document.querySelector("#cashier-action-form input[name='email']").value;
		let cashierPhone = document.querySelector("#cashier-action-form input[name='phone']").value;
		let cashierAddress = document.querySelector("#cashier-action-form input[name='address']").value;
		let cashierSIN = document.querySelector("#cashier-action-form input[name='sin']").value;
		let cashierHST = document.querySelector("#cashier-action-form input[name='hst']").value;
		let hourlyRate = document.querySelector("#cashier-action-form input[name='hourly_rate']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			id: cashierId,
			name: cashierName,
			nickname: cashierNickname,
			email: cashierEmail,
			phone: cashierPhone,
			address: cashierAddress,
			sin: cashierSIN,
			hst: cashierHST,
			hourly_rate: hourlyRate,
			do_action: "update_cashier"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	window.addEventListener("load", showCashiers);
	function showCashiers() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_cashiers"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let cashiersObj = JSON.parse(this.responseText);
			let text = '\
      <table class="ktm_table">\
      <tr>\
        <th>Cashier Id</th>\
        <th>Name</th>\
        <th>Nickname</th>\
        <th>Email</th>\
        <th>Phone</th>\
        <th>Address</th>\
        <th>SIN</th>\
        <th>HST</th>\
        <th>Hourly Rate</th>\
        <th colspan="2">Action</th>\
      </tr>\
      ';
			for (let x in cashiersObj) {
				text += '\
          <tr>\
          <td>KTM' + cashiersObj[x].id + '</td> \
          <td>' + cashiersObj[x].name + '</td> \
          <td>' + cashiersObj[x].nickname + '</td> \
          <td>' + cashiersObj[x].email + '</td> \
          <td>' + cashiersObj[x].phone + '</td> \
          <td>' + cashiersObj[x].address + '</td> \
          <td>' + cashiersObj[x].sin + '</td> \
          <td>' + cashiersObj[x].hst + '</td> \
          <td>' + cashiersObj[x].hourly_rate + '</td> \
          <td><button class="action_btn" onclick="cashierEdit(this);" data-id="'+ cashiersObj[x].id + '">Edit</button></td> \
          <td><button class="action_btn" onclick="cashierDelete(this);" data-id="'+ cashiersObj[x].id + '">Delete</button></td>\
          </tr>\
        ';
			}
			text += '</table>'
			document.getElementById("data").innerHTML = text;
		}
	}
}
// Payment Method Section
if (pageURL == "/payment-methods.php") {
	let addLocationButton = document.querySelector('#add_payment_method');
	addLocationButton.addEventListener("click", paymentMethodFormShow);
	function paymentMethodFormShow() {
		let text = '\
      <div id="payment_method_action_form">\
        <input type="text" name="payment_method" placeholder="Payment Method" size="49" />\
        <button class="action_btn" onclick="paymentMethodAdd();">Submit</button>\
      </div>\
    ';
		document.getElementById("data").innerHTML = text;
	}
	function paymentMethodAdd() {
		let paymentMethod = document.querySelector('#payment_method_action_form input').value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			payment_method: paymentMethod,
			do_action: "add_payment_method"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function paymentMethodDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let paymentMethodId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: paymentMethodId,
				do_action: "delete_payment_method"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	window.addEventListener("load", showPaymentMethods);
	function showPaymentMethods() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_payment_methods"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let paymentMethodsObj = JSON.parse(this.responseText);
			let text = '<table class="ktm_table">'
			for (let x in paymentMethodsObj) {
				text += '\
          <tr>\
          <td>' + paymentMethodsObj[x].payment_method + '</td> \
          <td><button class="action_btn" onclick="paymentMethodDelete(this);" data-id="'+ paymentMethodsObj[x].id + '">Delete</button></td>\
          </tr>\
        ';
			}
			text += '</table>'
			document.getElementById("data").innerHTML = text;
		}
	}
}
// Services Section
if (pageURL == "/services.php") {
	let addServiceButton = document.querySelector('#add_service');
	addServiceButton.addEventListener("click", serviceFormShow);
	function serviceFormShow() {
		let text = '\
      <div id="service_action_form">\
        <input type="text" name="service" placeholder="Service Name" size="49" />\
        <button class="action_btn" onclick="serviceAdd();">Submit</button>\
      </div>\
    ';
		document.getElementById("data").innerHTML = text;
	}
	function serviceAdd() {
		let service = document.querySelector('#service_action_form input').value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			service: service,
			do_action: "add_service"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function serviceDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let serviceId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: serviceId,
				do_action: "delete_service"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	window.addEventListener("load", showServices);
	function showServices() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "show_services"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let servicesObj = JSON.parse(this.responseText);
			let text = '<table class="ktm_table">'
			for (let x in servicesObj) {
				text += '\
          <tr>\
          <td>' + servicesObj[x].service + '</td> \
          <td><button class="action_btn" onclick="serviceDelete(this);" data-id="'+ servicesObj[x].id + '">Delete</button></td>\
          </tr>\
        ';
			}
			text += '</table>'
			document.getElementById("data").innerHTML = text;
		}
	}
}
// Working details section
if (pageURL == "/working-details.php") {
	let addWorkingDetailsButton = document.querySelector('#add_working_details');
	addWorkingDetailsButton.addEventListener("click", workingDetailsFormShow);
	let workingObj = {};
	function formatName(name) {
		name = name.toLowerCase();
		name = name.split(' ').join('_');
		return name;
	}
	function toggleAmountField(obj) {
		if (obj.checked == true) {
			let text = '\
      <label>Amount:</label><br />\
      <input type="text" name="' + obj.value + '_amount" id="' + obj.value + '_amount" />\
      ';
			document.getElementById(obj.value).innerHTML = text;
			if (obj.value == "5") { // EClaim
				let text = '\
        <br /><label>EClaim Code:</label><br />\
        <input type="text" name="eclaim_code" id="' + obj.value + '_code"/>\
        ';
				document.getElementById(obj.value).innerHTML += text;
			}
		} else {
			document.getElementById(obj.value).innerHTML = '';
		}
	}
	function workingDetailsFormShow() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "working_details_form_show"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let workingObj = JSON.parse(this.responseText);
			let text = '\
      		<div id="working_details_form">\
      		<label>Cashier:</label><br />\
      		<select name="cashier_name">';
			for (let x in workingObj.cashiers) {
				text += '<option>' + workingObj.cashiers[x].name + '</option>';
			}
			text += '\
      		</select>\<br />\
      		<label>Location:</label><br />\
        	<select name="location">';
			for (let x in workingObj.addresses) {
				text += '<option>' + workingObj.addresses[x] + '</option>';
			}
			text += '\
	        </select>\<br />\
	        <label>Date:</label><br />\
	        <input type="date" name="booking_date" min="'+ workingObj.config_date +'"/><br />\
	        <label>Client\'s Name:</label><br />\
	        <input type="text" name="client_name" /><br />\
	        <label>Service:</label><br />\
	        <select name="service">';
			for (let x in workingObj.services) {
				text += '<option>' + workingObj.services[x] + '</option>';
			}
			text += '\
	        </select><br />\
	        <label>Receipt Time (in minutes):</label><br />\
	        <input type="text" name="receipt_time" /><br />\
	        <label>Receipt Date:</label><br />\
	        <input type="date" name="receipt_date" /><br />\
	        <label>Practitioner Name:</label><br />\
	        <select name="rmt_name">\
	        <option value="">Select Practitioner Name</option>';
			for (let x in workingObj.employees) {
				text += '<option>' + workingObj.employees[x] + '</option>';
			}
			text += '\
	        </select><br />\
	        <label>Masseuse Name:</label><br />\
	        <select name="masseuse_name">\
	        <option value="">Select Masseuse Name</option>';
			for (let x in workingObj.employees) {
				text += '<option>' + workingObj.employees[x] + '</option>';
			}
			text += '\
	        </select><br />\
	        <label>Work Time (in minutes):</label><br />\
	        <input type="text" name="work_time" /><br />\
	        <label>Payment Method:</label><br />';
			for (let x in workingObj.payment_methods) {
				text += '\
         		<input type="checkbox" name="pmethod" value="' + workingObj.payment_methods[x].id + '" onchange="toggleAmountField(this)"/>\
          		<label for="' + workingObj.payment_methods[x].id + '"> ' + workingObj.payment_methods[x].payment_method + '</label><br />\
          		<div id="' + workingObj.payment_methods[x].id + '"></div>\
          		';
			}
			text += '\
	        <label>Refund Amount:</label><br />\
	        <input type="number" name="refund_amount" min="1" onkeyup="negativeValueCheck(this)" /><br />\
	        <label>Tips:</label><br />\
	        <input type="text" name="tips_amount" /><br />\
	        <label>Document: </label><br />\
	        <input type="file" name="attachment_doc" id="attachment_doc" /><br />\
	        <label>Comments: </label><br />\
	        <textarea name="comments" style="height:100px"></textarea><br /><br />\
	        <button class="action_btn" onclick="workingDetailsAdd();">Submit</button>\
      		</div>\
      		';
			document.getElementById("data").innerHTML = text;
		}
	}
	function negativeValueCheck(obj) {
		if (obj.value < 0) {
			obj.value = 0;
		}
	}
	function workingDetailsAdd() {
		let cashier_name = document.querySelector("select[name='cashier_name']").value;
		let location = document.querySelector("select[name='location']").value;
		let bookingDate = document.querySelector("input[name='booking_date']").value;
		let clientName = document.querySelector("input[name='client_name']").value;
		let service = document.querySelector("select[name='service']").value;
		let receiptTime = document.querySelector("input[name='receipt_time']").value;
		let receiptDate = document.querySelector("input[name='receipt_date']").value;
		let rmtName = document.querySelector("select[name='rmt_name']").value;
		let masseuseName = document.querySelector("select[name='masseuse_name']").value;
		let workTime = document.querySelector("input[name='work_time']").value;
		let comments = document.querySelector("textarea[name='comments']").value;
		let refund_amount = document.querySelector("input[name='refund_amount']").value;
		let pmethods = document.querySelectorAll("input[name='pmethod']:checked");
		let payments = {};
		for (let i = 0; i < pmethods.length; i++) {
			let key = pmethods[i].value;
			let value = document.querySelector(`input[name='${key}_amount']`).value;
			payments[key] = value;
		}
		let eclaimCode = "";
		if (document.querySelector("input[name='eclaim_code']")) {
			eclaimCode = document.querySelector("input[name='eclaim_code']").value;
		}
		let tipsAmount = document.querySelector("input[name='tips_amount']").value;
		let xhr = new XMLHttpRequest();
		const fileInput = document.getElementById('attachment_doc');
		let selectedFile = null;
		selectedFile = fileInput.files[0];
		const formData = new FormData();
		formData.append('attachment_doc', selectedFile);
		formData.append('do_action', "add_working_details");
		formData.append('location', location);
		formData.append('bookingDate', bookingDate);
		formData.append('clientName', clientName);
		formData.append('service', service);
		formData.append('receiptTime', receiptTime);
		formData.append('receiptDate', receiptDate);
		formData.append('rmtName', rmtName);
		formData.append('masseuseName', masseuseName);
		formData.append('workTime', workTime);
		formData.append('payments', JSON.stringify(payments));
		formData.append('tipsAmount', tipsAmount);
		formData.append('eclaimCode', eclaimCode);
		formData.append('cashierName', cashier_name);
		formData.append('comments', comments);
		formData.append('refundAmount', refund_amount);
		xhr.open("POST", "functions.php", true);
		xhr.send(formData);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	let getsearchWorkObj = JSON.parse(sessionStorage.getItem("searchWorkObj"));
	const toSearchDate = (new Date()).toISOString().split('T')[0];
	let fromDate = new Date();
	fromDate.setDate(fromDate.getDate() - 7);
	const fromSearchDate = fromDate.toISOString().split('T')[0];
	if (getsearchWorkObj != null) getsearchWorkObj = getsearchWorkObj;
	else getsearchWorkObj = { search_client_name: "", search_from_date: fromSearchDate, search_to_date: toSearchDate, search_emp_name: "", search_location: "" };
	window.addEventListener("load", showWorkingDetails("", getsearchWorkObj));

	function showWorkingDetails(page_number = "", searchObj = { search_client_name: "", search_from_date: "", search_to_date: "", search_emp_name: "", search_location: "" }) {
		let per_page_record, total_record, page, total_pages;
		per_page_record = 30;
		let login_info = JSON.parse(sessionStorage.getItem("login_info"));
		let xhr = new XMLHttpRequest();
		if (page_number == "") {
			sessionStorage.removeItem("Pagination");
			jsonData = {
				token: login_info.token,
				do_action: "show_working_details",
				per_page_record: per_page_record,
				page: 1,
				searchObj: searchObj
			}
		} else {
			const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
			jsonData = {
				token: login_info.token,
				do_action: "show_working_details",
				per_page_record: Pagination.per_page_record,
				page: Pagination.page,
				searchObj: searchObj
			}
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = async function () {
			let workingDetailsObj = JSON.parse(this.responseText);
			if (page_number == "") {
				total_record = workingDetailsObj.total_record;
				page = 1;
				per_page_record = per_page_record;
				const newPagination = { per_page_record: per_page_record, page: page, total_record: total_record }
				sessionStorage.setItem("Pagination", JSON.stringify(newPagination));
			} else {
				const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
				total_record = Pagination.total_record;
				per_page_record = Pagination.per_page_record;
				page = Pagination.page;
			}
			total_pages = Math.ceil(total_record / per_page_record);
			let text = '\
          <div id="cdw-filter-working-details"> \
          <input type="text" autocomplete="off" id="search_client_name" value="'+ workingDetailsObj.payload.searchObj?.search_client_name + '" placeholder="Clients Name">\
          <select id="search_emp_name">';
			text += '<option value=""> All Employees </option>';
			for (let x in workingDetailsObj.emp_master) {
				const selectedValue = (workingDetailsObj.emp_master[x].name == workingDetailsObj.payload.searchObj.search_emp_name) ? 'selected' : '';
				text += '<option  ' + selectedValue + ' value="' + workingDetailsObj.emp_master[x].name + '">' + workingDetailsObj.emp_master[x].name + '</option>';
			}
			text += '\
        </select>\
		<select id="search_location" style="width:300px">';
			text += '<option value=""> All Location </option>';
			for (let z in workingDetailsObj.location_master) {
				const selectedValue = (workingDetailsObj.location_master[z].address == workingDetailsObj.payload.searchObj.search_location) ? 'selected' : '';
				text += '<option ' + selectedValue + ' value="' + workingDetailsObj.location_master[z].address + '">' + workingDetailsObj.location_master[z].address + '</option>';
			}
			text += '\
        </select>\
          <input type="date" id="search_from_date" value="'+ workingDetailsObj.payload.searchObj.search_from_date + '" >\
          <input type="date" id="search_to_date" value="'+ workingDetailsObj.payload.searchObj.search_to_date + '">\
          <button type="button" onclick="searchWorkingDetails()" class="action_btn">Search</button>\
        </div>';
		   if(searchObj.search_emp_name != "") {
				text +='<div id="work_detail_print">';
				text += '<div style="margin-top: 20px; display: flex; flex-direction: row; flex-wrap: wrap;">';
					text += '<table width="100%" border="1">\
					<tbody>\
						<tr>\
							<th>Date</th>\
							<th>Employee Name</th>\
							<th>Total Massage </th>\
							<th>Total Receipts </th>\
							<th>Tips Amount</th>\
						</tr>';
						for (let z in workingDetailsObj.report_data.working_details_print) {
							const workTime = workingDetailsObj.report_data.working_details_print[z].work_time;
							const workHours = workingDetailsObj.report_data.working_details_print[z].work_time/60;
							const receiptTime = workingDetailsObj.report_data.working_details_print[z].receipt_time;
							const receiptHours = workingDetailsObj.report_data.working_details_print[z].receipt_time/60;
							text += '<tr>\
							<td>'+ workingDetailsObj.report_data.working_details_print[z].booking_date + '</td>\
							<td>'+ searchObj.search_emp_name + '</td>\
							<td>'+ workTime + ' ('+ workHours +')</td>\
							<td>'+ receiptTime +' ('+ receiptHours +')</td>\
							<td>'+ workingDetailsObj.report_data.working_details_print[z].tips_amount + '</td></tr>';
						}
					text +='</tbody>\
				</table>';
				text +='<div style="width: 100%; margin-top: 1%; margin-bottom: 1%;">';
				for (let y in workingDetailsObj.report_data.wage_reports) {
					text += '<div style="background-color: #f1f1f1; padding: 1%;">\
					<strong>Location: </strong>'+ workingDetailsObj.report_data.wage_reports[y].location_name + '<br>\
					<strong>Tips:</strong>$'+ workingDetailsObj.report_data.wage_reports[y].tips_amount + '<br>\
					</div>\
					';
				}
				text += '</div></div>';
				text +='</div>';
		   }
		   if(searchObj.search_emp_name == "") {
			text +='<div id="work_detail_print">';
			text += '<div style="margin-top: 20px; display: flex; flex-direction: row; flex-wrap: wrap;">';
				text += '<table width="100%" border="1">\
				<tbody>\
					<tr>\
						<th>Date</th>\
						<th>Employee Name</th>\
						<th>Total Massage</th>\
						<th>Total Receipts</th>\
						<th>Tips Amount</th>\
					</tr>';
					for (let za in workingDetailsObj.report_data.wage_reports) {
						let counter = 0;
						for(let zb in workingDetailsObj.report_data.wage_reports[za]) {
							counter++;
							text += '<tr>';
							if(counter == 1) text += '<td style="text-align:center" rowspan="' + Object.keys(workingDetailsObj.report_data.wage_reports[za]).length + '">'+ workingDetailsObj.report_data.wage_reports[za][zb].booking_date + '</td>';
							text +='<td>'+ workingDetailsObj.report_data.wage_reports[za][zb].emp_name + '</td>\
							<td>'+ workingDetailsObj.report_data.wage_reports[za][zb].work_time_cal + ' (' + (workingDetailsObj.report_data.wage_reports[za][zb].work_time_cal/60).toFixed(2)+ ')</td>\
							<td>'+ workingDetailsObj.report_data.wage_reports[za][zb].receipt_time_cal + ' ('+ (workingDetailsObj.report_data.wage_reports[za][zb].receipt_time_cal/60).toFixed(2)+')</td>\
							<td>'+ Number(workingDetailsObj.report_data.wage_reports[za][zb].tips_amount_cal).toFixed(2) + '</td></tr>';
						}
					}
				text +='</tbody>\
			</table>';
			text += '</div>';
			text +='</div>';
	   }
			text += '<div id="working-details">';
			for (let x in workingDetailsObj.working_details) {
				const COLOR_PALLET = (workingDetailsObj.working_details[x].color_pallet != null) ? `style="background-color : ${ workingDetailsObj.working_details[x].color_pallet}"` : "";
				let working_details_id = workingDetailsObj.working_details[x].id;
				text += '\
          <div '+COLOR_PALLET+'>\
          <strong>Location: </strong>' + workingDetailsObj.working_details[x].location + '<br /> \
          <strong>Date: </strong>' + workingDetailsObj.working_details[x].booking_date + '<br /> \
          <strong>Client\'s Name: </strong>' + workingDetailsObj.working_details[x].client_name + '<br /> \
          <strong>Service: </strong>' + workingDetailsObj.working_details[x].service + '<br /> \
          <strong>Receipt Time: </strong>' + workingDetailsObj.working_details[x].receipt_time + ' Mins<br /> \
          <strong>Receipt Date: </strong>' + workingDetailsObj.working_details[x].receipt_date + '<br /> \
          <strong>Practitioner Name: </strong>' + workingDetailsObj.working_details[x].rmt_name + '<br /> \
          <strong>Masseuse Name: </strong>' + workingDetailsObj.working_details[x].masseuse_name + '<br /> \
          <strong>Work Time: </strong>' + workingDetailsObj.working_details[x].work_time + ' Mins<br /> \
          <strong>Comment: </strong>' + workingDetailsObj.working_details[x].comments + '<br /> \
          <strong>Tips: </strong>' + workingDetailsObj.working_details[x].tips_amount + '<br />';
				for (let y in workingDetailsObj.working_details[x].payments) {
					text += '\
              <strong>' + workingDetailsObj.working_details[x].payments[y].method + ': </strong>' + workingDetailsObj.working_details[x].payments[y].amount + '<br /> \
            ';
				}
				// for (let x in workingDetailsObj.payments) {
				//   if (working_details_id == workingDetailsObj.payments[x].working_details_id){
				//     text += '\
				//       <strong>' + workingDetailsObj.payments[x].method + ': </strong>' + workingDetailsObj.payments[x].amount + '<br /> \
				//     ';
				//   }
				// }
				if (workingDetailsObj.working_details[x].eclaim_code) {
					text += '\
          <strong>Eclaim Code: </strong>' + workingDetailsObj.working_details[x].eclaim_code + '<br />';
				}
			text += '\
        	<strong>Refund : </strong>' + workingDetailsObj.working_details[x].refund_amount + '<br />\
        	<strong>Total Amount : </strong>' + workingDetailsObj.working_details[x].total_amount + '<br />';
			const login_info = JSON.parse(sessionStorage.getItem("login_info"));
			if((login_info.userType == 2 & workingDetailsObj.working_details[x].color_pallet != "#ffff0063") || login_info.userType == 1) {
				text +='\<button class="action_btn ml-5" onclick="workingDetailsEdit(this);" data-id="' + workingDetailsObj.working_details[x].id + '">Edit</button>\
				<button class="action_btn ml-5" onclick="workingDetailsDelete(this);" data-id="'+ workingDetailsObj.working_details[x].id + '">Delete</button>';
			}
			if(workingDetailsObj.working_details[x].doc_fullpath != null ) {
	    		text += '<a target="_blank" href="'+workingDetailsObj.working_details[x].doc_fullpath+'" class="view_doc_btn" >View Doc</a>';
	    	}

	    	const noteClass = (workingDetailsObj.working_details[x].note_exists && workingDetailsObj.working_details[x].note_file != "" ) ? 'view_green_btn':'view_doc_btn';

	    	text += '<a href="'+base_url+'treatment-note.php?data='+workingDetailsObj.working_details[x].id+'" class="'+noteClass+'">T Note</a><br />';

			if(login_info.userType == 1) {
				text += '<select name="colorPiker" onchange="changeColorPiker(this,' + working_details_id + ')">';
				text += '<option value="#f1f1f1">Color Piker</option>';
				const colorArr = [{ id:"#ff000085", name : "Red"},{ id:"#0000ff85", name : "Blue"},{ id:"#0080009e", name : "Green"},{ id:"#ffff0063", name : "Yellow"}];
				for(col = 0; col < colorArr.length; col++) {
					const ID = colorArr[col].id;
					const NAME = colorArr[col].name;
					const SELECTED = (colorArr[col].id == workingDetailsObj.working_details[x].color_pallet) ? "selected" : "";
					text +='<option '+SELECTED+' value="'+ ID +'">'+ NAME +'</option>';
				}
				text += '</select>';
			}
		  	text +='</div>';
		}
			text += '</div>';
			text += `<div class="pagination">`;
			let PageLink = ``;
			if (page >= 2) {
				PageLink = `<button onclick="Pagination(${parseInt(page) - 1})" >  Prev </button>`;
			}
			for (i = 1; i <= total_pages; i++) {
				if (i == page) {
					PageLink += `<button  onclick="Pagination(${i})" class = 'active' >${i}</button>`;
				}
				else {
					PageLink += `<button  onclick="Pagination(${i})" >${i}</button>`
				}
			};
			if (page < total_pages) {
				PageLink += `<button onclick="Pagination(${parseInt(page) - 1})">  Next </button>`;
			}
			text += PageLink;
			text += `</div>`;
			document.getElementById("data").innerHTML = text;
		}
		document.getElementById("filter_working_details").addEventListener("click", function () {
			this.classList.toggle("fbtn-act");
			document.getElementById("cdw-filter-working-details").classList.toggle("cdw-filter-act");
		});
	}

	function workingDetailsDelete(obj) {
		let workingDetailsId = obj.getAttribute('data-id');
		makeSure = confirm("Are you sure to remove the working detail?");
		if (makeSure) {
			let xhr = new XMLHttpRequest();
			let jsonData = {
				id: workingDetailsId,
				do_action: "delete_working_details"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	function workingDetailsEdit(obj) {
		let workingId = obj.getAttribute('data-id');
		let xhr = new XMLHttpRequest();
		let jsonData = {
			id: workingId,
			do_action: "edit_working_details"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let workingObj = JSON.parse(this.responseText);
			let text = '\
      <div id="working_details_form">\
      <label>Cashier:</label><br />\
      <select name="cashier_name">';
			for (let x in workingObj.cashiers) {
				const selectedCashier = (workingObj.cashiers[x] == workingObj.working_details.cashier_name) ? 'selected' : '';
				text += '<option ' + selectedCashier + '>' + workingObj.cashiers[x].name + '</option>';
			}
			text += '\
      </select>\<br />\
      <div id="working_details_form">\
        <label>Location:</label><br />\
        <select name="location">';
			for (let x in workingObj.addresses) {
				const selectedAddress = (workingObj.addresses[x] == workingObj.working_details.location) ? 'selected' : '';
				text += '<option ' + selectedAddress + '>' + workingObj.addresses[x] + '</option>';
			}
			text += '\
        </select>\<br />\
        <label>Date:</label><br />\
        <input type="date" name="booking_date" value="' + workingObj.working_details.booking_date + '" min="'+ workingObj.config_date +'"/><br />\
        <label>Client\'s Name:</label><br />\
        <input type="text" name="client_name" value="' + workingObj.working_details.client_name + '" /><br />\
        <label>Service:</label><br />\
        <select name="service">';
			for (let x in workingObj.services) {
				const selectedserviced = (workingObj.services[x] == workingObj.working_details.service) ? 'selected' : '';
				text += '<option ' + selectedserviced + '>' + workingObj.services[x] + '</option>';
			}
			text += '\
        </select><br />\
        <label>Receipt Time (in minutes):</label><br />\
        <input type="text" name="receipt_time" value="' + workingObj.working_details.receipt_time + '"/><br />\
        <label>Receipt Date:</label><br/>\
        <input type="date" name="receipt_date" value="' + workingObj.working_details.receipt_date + '"/><br />\
        <label>Practitioner Name:</label><br />\
        <select name="rmt_name">\
        <option value="">Select Practitioner Name</option>';
			for (let x in workingObj.employees) {
				const selectedrmtName = (workingObj.employees[x] == workingObj.working_details.rmt_name) ? 'selected' : '';
				text += '<option ' + selectedrmtName + '>' + workingObj.employees[x] + '</option>';
			}
			text += '\
        </select><br />\
        <label>Masseuse Name:</label><br />\
        <select name="masseuse_name">\
        <option value="">Select Masseuse Name</option>';
			for (let x in workingObj.employees) {
				const selectedMasseuseName = (workingObj.employees[x] == workingObj.working_details.masseuse_name) ? 'selected' : '';
				text += '<option ' + selectedMasseuseName + '>' + workingObj.employees[x] + '</option>';
			}
			text += '\
        </select><br />\
        <label>Work Time (in minutes):</label><br />\
        <input type="text" name="work_time" value="' + workingObj.working_details.work_time + '"/><br />\
        <label>Payment Method:</label><br />';
			for (let x in workingObj.payment_methods) {
				//const selectedPayment= (workingObj.payment_methods[x].id == workingObj.working_payment_details)?'checked':'';
				const selectedPayment = (workingObj.working_payment_details.includes(workingObj.payment_methods[x].id)) ? 'checked' : '';
				text += '\
            <input type="checkbox"  '+ selectedPayment + ' id="pay_method_' + workingObj.payment_methods[x].id + '" name="pmethod" value="' + workingObj.payment_methods[x].id + '" onchange="toggleAmountField(this)"/>\
            <label for="' + workingObj.payment_methods[x].id + '"> ' + workingObj.payment_methods[x].payment_method + '</label><br />\
            <div id="' + workingObj.payment_methods[x].id + '"></div>\
            ';
			}
			text += '\
        <label>Refund Amount:</label><br />\
        <input type="text" name="refund_amount" value="' + workingObj.working_details.refund_amount + '" onkeyup="negativeValueCheck(this)"/><br />\
        <label>Tips:</label><br />\
        <input type="text" name="tips_amount" value="' + workingObj.working_details.tips_amount + '"/><br />\
        <label>Document: </label><br />\
	    <input type="file" name="attachment_doc" id="attachment_doc" />';
	    if(workingObj.working_details.doc_fullpath != null ) {
	    	text += '<a target="_blank" href="'+workingObj.working_details.doc_fullpath+'" class="view_doc_btn" >View Doc</a><br />';
	    } else {
	    	text += '<br />'
	    }
        text +='<label>Comments : </label><br />\
        <textarea name="comments" style="height:100px; width:270px"> '+ workingObj.working_details.comments + '</textarea><br /><br />\
        <button class="action_btn" onclick="workingDetailsUpdate(this);" data-id="'+ workingObj.working_details.id + '">Update</button>\
      </div>\
      ';
			document.getElementById("data").innerHTML = text;
			for (let x in workingObj.payment_methods) {
				if (workingObj.working_payment_details.includes(workingObj.payment_methods[x].id)) {
					paymentObj = document.getElementById('pay_method_' + workingObj.payment_methods[x].id);
					toggleAmountField(paymentObj);
					const payInfo = workingObj.payment_info.find(({ method_id }) => method_id === workingObj.payment_methods[x].id);
					document.getElementById(workingObj.payment_methods[x].id + '_amount').value = payInfo.amount;
					if (payInfo.method_id == 5) document.getElementById(workingObj.payment_methods[x].id + '_code').value = workingObj.working_details.eclaim_code;
				}
			}
		}
	}
	function negativeValueCheck(obj) {
		if (obj.value < 0) {
			obj.value = 0;
		}
	}
	function workingDetailsUpdate(obj) {
		let workingId = obj.getAttribute('data-id');
		let location = document.querySelector("select[name='location']").value;
		let bookingDate = document.querySelector("input[name='booking_date']").value;
		let clientName = document.querySelector("input[name='client_name']").value;
		let service = document.querySelector("select[name='service']").value;
		let receiptTime = document.querySelector("input[name='receipt_time']").value;
		let receiptDate = document.querySelector("input[name='receipt_date']").value;
		let rmtName = document.querySelector("select[name='rmt_name']").value;
		let masseuseName = document.querySelector("select[name='masseuse_name']").value;
		let workTime = document.querySelector("input[name='work_time']").value;
		let comments = document.querySelector("textarea[name='comments']").value;
		let pmethods = document.querySelectorAll("input[name='pmethod']:checked");
		let cashier_name = document.querySelector("select[name='cashier_name']").value;
		let refund_amount = document.querySelector("input[name='refund_amount']").value;
		let payments = {};
		for (let i = 0; i < pmethods.length; i++) {
			let key = pmethods[i].value;
			let value = document.querySelector(`input[name='${key}_amount']`).value;
			payments[key] = value;
		}
		let eclaimCode = "";
		if (document.querySelector("input[name='eclaim_code']")) {
			eclaimCode = document.querySelector("input[name='eclaim_code']").value;
		}
		let tipsAmount = document.querySelector("input[name='tips_amount']").value;
		let xhr = new XMLHttpRequest();
		const fileInput = document.getElementById('attachment_doc');
		const selectedFile = fileInput.files[0];
		const formData = new FormData();
		formData.append('attachment_doc', selectedFile);
		formData.append('do_action', "update_working_details");
		formData.append('id',workingId);
		formData.append('location', location);
		formData.append('bookingDate', bookingDate);
		formData.append('clientName', clientName);
		formData.append('service', service);
		formData.append('receiptTime', receiptTime);
		formData.append('receiptDate', receiptDate);
		formData.append('rmtName', rmtName);
		formData.append('masseuseName', masseuseName);
		formData.append('workTime', workTime);
		formData.append('payments', JSON.stringify(payments));
		formData.append('tipsAmount', tipsAmount);
		formData.append('eclaimCode', eclaimCode);
		formData.append('cashierName', cashier_name);
		formData.append('comments', comments);
		formData.append('refundAmount', refund_amount);
		xhr.open("POST", "functions.php", true);
		//xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(formData);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function Pagination(page_value) {
		const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
		newPagination = { ...Pagination, page: page_value }
		sessionStorage.setItem("Pagination", JSON.stringify(newPagination));
		const search_client_name = document.getElementById("search_client_name").value;
		const search_from_date = document.getElementById("search_from_date").value;
		const search_to_date = document.getElementById("search_to_date").value;
		const search_emp_name = document.getElementById("search_emp_name").value;
		const search_location = document.getElementById("search_location").value;
		const param = { "search_client_name": search_client_name, "search_from_date": search_from_date, "search_to_date": search_to_date, "search_emp_name": search_emp_name,"search_location":search_location };
		showWorkingDetails(page_value, param);
	}
	function searchWorkingDetails() {
		const search_client_name = document.getElementById("search_client_name").value;
		const search_from_date = document.getElementById("search_from_date").value;
		const search_to_date = document.getElementById("search_to_date").value;
		const search_emp_name = document.getElementById("search_emp_name").value;
		const search_location = document.getElementById("search_location").value;
		const param = { "search_client_name": search_client_name, "search_from_date": search_from_date, "search_to_date": search_to_date, "search_emp_name": search_emp_name,"search_location":search_location };
		sessionStorage.setItem("searchWorkObj", JSON.stringify(param));
		showWorkingDetails("", param);
		location.reload();
	}
}
// Cashiers Daily Report Section
if (pageURL == "/cashiers-daily-report.php") {
	let addCashierReportButton = document.querySelector('#add_cashier_daily_report');
	let getsearchCashObj = JSON.parse(sessionStorage.getItem("searchCashObj"));
	if (getsearchCashObj != null) getsearchCashObj = getsearchCashObj;
	else getsearchCashObj = {};
	addCashierReportButton.addEventListener("click", cashierReportFormShow);
	window.addEventListener("load", showCashiersReport("", getsearchCashObj));
	function showCashiersReport(page_number, searchObj = {}) {
		let per_page_record, total_record, page, total_pages;
		per_page_record = 10;
		if (page_number == "") {
			jsonData = {
				do_action: "show_cashiers_daily_report",
				per_page_record: per_page_record,
				page: 1,
				searchObj: searchObj
			}
		} else {
			const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
			jsonData = {
				do_action: "show_cashiers_daily_report",
				per_page_record: Pagination.per_page_record,
				page: Pagination.page,
				searchObj: searchObj
			}
		}
		let xhr = new XMLHttpRequest();
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let cashiersObj = JSON.parse(this.responseText);
			if (page_number == "") {
				total_record = cashiersObj.total_record;
				page = 1;
				per_page_record = per_page_record;
				const newPagination = { per_page_record: per_page_record, page: page, total_record: total_record }
				sessionStorage.setItem("Pagination", JSON.stringify(newPagination));
			} else {
				const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
				total_record = Pagination.total_record;
				per_page_record = Pagination.per_page_record;
				page = Pagination.page;
			}
			total_pages = Math.ceil(total_record / per_page_record);
			let text = '\
      <div id="cdw-filter"> \
        <select id="search_cashier_name">';
			text += '<option value=""> All Cashier </option>';
			for (let x in cashiersObj.cashier_master) {
				const selectedValue = (cashiersObj.cashier_master[x].id == cashiersObj.payload.searchObj.cashier_id) ? 'selected' : '';
				text += '<option  ' + selectedValue + ' value="' + cashiersObj.cashier_master[x].id + '">' + cashiersObj.cashier_master[x].name + '</option>';
			}
			text += '\
        </select>\
        <input type="date" id="search_from_date" value="'+ cashiersObj.payload.searchObj.from_date + '" >\
        <input type="date" id="search_to_date" value="'+ cashiersObj.payload.searchObj.to_date + '">\
        <button onclick="searchButton()" class="action_btn">Search</button>\
      </div> \
      <table class="ktm_table">\
      <tr>\
        <th>Date</th>\
        <th>Cashier Name</th>\
        <th>Start Time</th>\
        <th>End Time</th>\
        <th width="200">Location</th>\
        <th>Bonous</th>\
        <th colspan= "2"> Action</th>\
      </tr>\
      ';
			if (cashiersObj.cashier_reports.length > 0) {
				for (let x in cashiersObj.cashier_reports) {
					text += '\
            <tr>\
            <td>'+ cashiersObj.cashier_reports[x].date + '</td> \
            <td>' + cashiersObj.cashier_reports[x].cachier_name + '</td> \
            <td>' + cashiersObj.cashier_reports[x].start_time + '</td> \
            <td>' + cashiersObj.cashier_reports[x].end_time + '</td> \
            <td>' + cashiersObj.cashier_reports[x].location + '</td> \
            <td>' + cashiersObj.cashier_reports[x].bonus + '</td> \
            <td><button class="action_btn" onclick="cashierReportEdit(this);" data-id="'+ cashiersObj.cashier_reports[x].id + '">Edit</button></td>\
            <td><button class="action_btn" onclick="cashierReportDelete(this);" data-id="'+ cashiersObj.cashier_reports[x].id + '">Delete</button></td>\
            </tr>\
          ';
				}
			} else {
				text += '\
          <tr>\
            <td colspan="7" style="text-align: center;font-weight: bold;">No Record Found</td>\
          </tr>\
          ';
			}
			text += '</table>';
			text += `<div class="pagination">`;
			let PageLink = ``;
			if (page >= 2) {
				PageLink = `<button onclick="PaginationCash(${parseInt(page) - 1})" >  Prev </button>`;
			}
			for (i = 1; i <= total_pages; i++) {
				if (i == page) {
					PageLink += `<button  onclick="PaginationCash(${i})" class = 'active' >${i}</button>`;
				}
				else {
					PageLink += `<button  onclick="PaginationCash(${i})" >${i}</button>`
				}
			};
			if (page < total_pages) {
				PageLink += `<button onclick="PaginationCash(${parseInt(page) + 1})">  Next </button>`;
			}
			text += PageLink;
			text += `</div>`;
			document.getElementById("data").innerHTML = text;
		}
		document.getElementById("filter_cashier_daily_wage").addEventListener("click", function () {
			this.classList.toggle("fbtn-act");
			document.getElementById("cdw-filter").classList.toggle("cdw-filter-act");
		});
	}
	function cashierReportFormShow() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "cashier_report_form_show"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let cashierReportObj = JSON.parse(this.responseText);
			let text = '\
        <div id="cashier-report-action-form">\
          <label>Date:</label><br />\
          <input type="date" name="date" /><br />\
          <label>Cashier\'s Name:</label><br />\
          <select name="cashier_name">';
			for (let x in cashierReportObj.names) {
				text += '<option value="' + cashierReportObj.names[x].id + '">' + cashierReportObj.names[x].name + '</option>';
			}
			text += '\
          </select><br />\
          <label>Start Time:</label><br />\
          <input type="datetime-local" name="start_time"><br />\
          <label>End Time:</label><br />\
          <input type="datetime-local" name="end_time"><br />\
          <label>Location:</label><br />\
          <select name="location_name">';
			for (let x in cashierReportObj.addresses) {
				text += '<option>' + cashierReportObj.addresses[x] + '</option>';
			}
			text += '</select><br />\
        <label>Bonous for the Day:</label><br />\
          <input type="text" name="bonus"><br />\
          <button class="action_btn" onclick="cashierReportAdd();">Submit</button>\
        </div>\
      ';
			document.getElementById("data").innerHTML = text;
		}
	}
	function cashierReportAdd() {
		let date = document.querySelector("#cashier-report-action-form input[name='date']").value;
		let location_name = document.querySelector("#cashier-report-action-form select[name='location_name']").value;
		let cashier_name = document.querySelector("#cashier-report-action-form select[name='cashier_name']").value;
		let startTime = document.querySelector("#cashier-report-action-form input[name='start_time']").value;
		let endTime = document.querySelector("#cashier-report-action-form input[name='end_time']").value;
		let bonus = document.querySelector("#cashier-report-action-form input[name='bonus']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			date: date,
			location_name: location_name,
			cashier_name: cashier_name,
			start_time: startTime,
			end_time: endTime,
			bonus: bonus,
			do_action: "add_cashier_report"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function cashierReportEdit(obj) {
		let cashierId = obj.getAttribute('data-id');
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "cashier_report_edit_form_show",
			cashierId: cashierId
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let cashierReportObj = JSON.parse(this.responseText);
			let text = '\
        <div id="cashier-report-action-form">\
          <label>Date:</label><br />\
          <input type="date" name="date" value="'+ cashierReportObj.cashier_report.date + '"/><br />\
          <label>Cashier\'s Name:</label><br />\
          <select name="cashier_name">';
			for (let x in cashierReportObj.names) {
				const selectedValue = (cashierReportObj.names[x].id == cashierReportObj.cashier_report.casher_id) ? 'selected' : '';
				text += '<option ' + selectedValue + ' value="' + cashierReportObj.names[x].id + '">' + cashierReportObj.names[x].name + '</option>';
			}
			text += '\
          </select><br />\
          <label>Start Time:</label><br />\
          <input type="datetime-local" name="start_time" value="'+ cashierReportObj.cashier_report.start_time + '"><br />\
          <label>End Time:</label><br />\
          <input type="datetime-local" name="end_time" value="'+ cashierReportObj.cashier_report.end_time + '"><br />\
          <label>Cashier\'s Name:</label><br />\
          <select name="location_name">';
			for (let x in cashierReportObj.addresses) {
				const selectedValue1 = (cashierReportObj.addresses[x] == cashierReportObj.cashier_report.location) ? 'selected' : '';
				text += '<option ' + selectedValue1 + ' value="' + cashierReportObj.addresses[x] + '">' + cashierReportObj.addresses[x] + '</option>';
			}
			text += '\
          </select><br />\
          <label>Bonous for the Day:</label><br />\
          <input type="text" name="bonus" value="'+ cashierReportObj.cashier_report.bonus + '"><br />\
          <button class="action_btn" onclick="cashierReportUpdate(this);" data-id="'+ cashierReportObj.cashier_report.id + '">Update</button>\
        </div>\
      ';
			document.getElementById("data").innerHTML = text;
		}
	}
	function cashierReportUpdate(obj) {
		let cashierReportId = obj.getAttribute('data-id');
		let date = document.querySelector("#cashier-report-action-form input[name='date']").value;
		let location_name = document.querySelector("#cashier-report-action-form select[name='location_name']").value;
		let cashier_name = document.querySelector("#cashier-report-action-form select[name='cashier_name']").value;
		let startTime = document.querySelector("#cashier-report-action-form input[name='start_time']").value;
		let endTime = document.querySelector("#cashier-report-action-form input[name='end_time']").value;
		let bonus = document.querySelector("#cashier-report-action-form input[name='bonus']").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			cashierReportId: cashierReportId,
			date: date,
			location_name: location_name,
			cashier_name: cashier_name,
			start_time: startTime,
			end_time: endTime,
			bonus: bonus,
			do_action: "update_cashier_report"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			window.location.reload();
		}
	}
	function cashierReportDelete(obj) {
		let makeSure = confirm("Are you sure to permanently delete it?");
		if (makeSure) {
			let cashierReportId = obj.getAttribute('data-id');
			let xhr = new XMLHttpRequest();
			let jsonData = {
				cashierReportId: cashierReportId,
				do_action: "delete_cashier_report"
			}
			let jsonString = JSON.stringify(jsonData);
			xhr.open("POST", "functions.php", true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(jsonString);
			xhr.onload = function () {
				window.location.reload();
			}
		}
	}
	function PaginationCash(page_value) {
		const Pagination = JSON.parse(sessionStorage.getItem("Pagination"));
		newPagination = { ...Pagination, page: page_value }
		sessionStorage.setItem("Pagination", JSON.stringify(newPagination));
		const cashier_id = document.getElementById("search_cashier_name").value;
		const search_from_date = document.getElementById("search_from_date").value;
		const search_to_date = document.getElementById("search_to_date").value;
		const param = { "cashier_id": cashier_id, "from_date": search_from_date, "to_date": search_to_date };
		showCashiersReport(page_value, param);
	}
	function searchButton() {
		const cashier_id = document.getElementById("search_cashier_name").value;
		const search_from_date = document.getElementById("search_from_date").value;
		const search_to_date = document.getElementById("search_to_date").value;
		const param = { "cashier_id": cashier_id, "from_date": search_from_date, "to_date": search_to_date };
		sessionStorage.setItem("searchCashObj", JSON.stringify(param))
		showCashiersReport("", param);
		document.getElementById("filter_cashier_daily_wage").classList.remove("fbtn-act");
	}
}
// Sales data section
if (pageURL == "/sales-data.php") {
	document.querySelector('#get_sales_report').addEventListener("click", getSalesReport);
	function getSalesReport() {
		let startDate = document.getElementById("start-date").value;
		let endDate = document.getElementById("end-date").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			start_date: startDate,
			end_date: endDate,
			do_action: "get_sales_report"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let saleObj = JSON.parse(this.responseText);
			text = '<div id="working-details">';
			for (let x in saleObj.sale_reports) {
				text += '<div>\
      <strong>Location: </strong>'+ saleObj.sale_reports[x].location_name + '<br>\
      <strong>Total Non Taxable Sales:</strong> $'+ saleObj.sale_reports[x].nt_gross_sale + '<br>\
      <strong>Total Taxable Sales:</strong> $'+ saleObj.sale_reports[x].gross_sale + '<br>\
      <strong>Total Sales:</strong> $'+ saleObj.sale_reports[x].net_sales + '<br>\
      <strong>Total Tax:</strong> $'+ saleObj.sale_reports[x].tax_amount + '<br>\
      <strong>Cash Amount:</strong> $'+ saleObj.sale_reports[x].cash_amount + '<br>\
      <strong>Tips Amount:</strong> $'+ saleObj.sale_reports[x].tips_amount + '<br>\
      <strong>Net Sales (Excluding Tax):</strong> $'+ saleObj.sale_reports[x].net_sales_excluding_tax + '<br>\
      </div>\
      ';
			}
			text += '</div>';
			text += '<div class="total_amount">\
      <h3>Sales Data (Including All Locations)</h3>\
      <strong>Total Non Taxable Sales: </strong>'+ saleObj.total_res.total_nt_gross_sale + '<br>\
      <strong>Total Taxable Sales:</strong> $'+ saleObj.total_res.total_gross_sale + '<br>\
      <strong>Total Tax:</strong> $'+ saleObj.total_res.total_tax_amount + '<br>\
      <strong>Total Sales:</strong> $'+ saleObj.total_res.total_net_sales + '<br>\
      <strong>Total Cash Amount:</strong> $'+ saleObj.total_res.total_cash_amount + '<br>\
      <strong>Total Tips Amount:</strong> $'+ saleObj.total_res.total_tips_amount + '<br>\
      <strong>Net Sales (Excluding Tax):</strong> $'+ saleObj.total_res.total_net_sales_excluding_tax + '<br>\
      </div>';
			document.getElementById("data").innerHTML = text;
		}
	}
}
// if(pageURL == "/sales-data.php") {
//   document.querySelector('#get_sales_report').addEventListener("click", getSalesReport);
//   function getSalesReport() {
//     let startDate = document.getElementById("start-date").value;
//     let endDate = document.getElementById("end-date").value;
//     let xhr = new XMLHttpRequest();
//     let jsonData = {
//       start_date: startDate,
//       end_date: endDate,
//       do_action: "get_sales_report"
//     }
//     let jsonString = JSON.stringify(jsonData);
//     xhr.open("POST", "functions.php", true);
//     xhr.setRequestHeader("Content-type", "application/json");
//     xhr.send(jsonString);
//     xhr.onload = function() {
//       let saleObj = JSON.parse(this.responseText);
//       text = '<div id="working-details">';
//       for (let x in saleObj.sale_reports) {
//       text +='<div>\
//       <strong>Location: </strong>'+saleObj.sale_reports[x].location_name+'<br>\
//       <strong>Total Sales (Non Taxable):</strong>$'+saleObj.sale_reports[x].nt_gross_sale+'<br>\
//       <strong>Gross Sale:</strong>$'+saleObj.sale_reports[x].gross_sale+'<br>\
//       <strong>Tax :</strong>$'+saleObj.sale_reports[x].tax_amount+'<br>\
//       <strong>Net Sale:</strong>$'+saleObj.sale_reports[x].net_sales+'<br>\
//       </div>\
//       ';
//       }
//       text +='</div>';
//       text += '<div class="total_amount">\
//       <h3>Sales Data (Including All Locations)</h3>\
//       <strong>Total Sales (Non Taxable): </strong>'+saleObj.total_res.total_nt_gross_sale+'<br>\
//       <strong>Total Gross Sale:</strong>$'+saleObj.total_res.total_gross_sale+'<br>\
//       <strong>Total Tax:</strong>$'+saleObj.total_res.total_tax_amount+'<br>\
//       <strong>Total Net Sales:</strong>$'+saleObj.total_res.total_net_sales+'<br>\
//       <strong>Total Sales :</strong>$'+saleObj.total_res.total_sale+'<br>\
//       </div>';
//       document.getElementById("data").innerHTML = text;
//     }
//   }
// }
// Wage Report Section
if (pageURL == "/wage-report.php") {
	document.querySelector('#get_wage_report').addEventListener("click", getWageReport);
	document.querySelector('#get_cashier_report').addEventListener("click", getCashierReport);
	function getWageReport() {
		let from_date = document.getElementById("from_date").value;
		let to_date = document.getElementById("to_date").value;
		let employeeName = document.getElementById("employee_name").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			employee_name: employeeName,
			from_date: from_date,
			to_date: to_date,
			do_action: "get_wage_report"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let wageObj = JSON.parse(this.responseText);
			text = '<div style="margin-top: 20px; display: flex; flex-direction: row; flex-wrap: wrap;">';
				text += '<table width="100%" border="1">\
				<tbody>\
					<tr>\
						<th>Date</th>\
						<th>Employee Name</th>\
						<th>Total Massage</th>\
						<th>Tips Amount</th>\
						<th>Card Charges</th>\
						<th>Total Receipts</th>\
						<th>Commission Amount</th>\
						<th>Basic Payment</th>\
						<th>Total Pay</th>\
					</tr>';
					for (let z in wageObj.working_details_print) {
						let commissionPrice = (wageObj.working_details_print[z].commission_price != undefined )? wageObj.working_details_print[z].commission_price:0;
						text += '<tr>\
						<td>'+ wageObj.working_details_print[z].booking_date + '</td>\
						<td>'+ employeeName + '</td>\
						<td>'+ wageObj.working_details_print[z].work_time + ' ('+ wageObj.working_details_print[z].work_hour +')</td>\
						<td>'+ wageObj.working_details_print[z].tips_amount + '</td>\
						<td>'+ wageObj.working_details_print[z].card_charge + '</td>\
						<td>'+ wageObj.working_details_print[z].receipt_time + ' ('+ wageObj.working_details_print[z].receipt_hour +')</td>\
						<td>'+ commissionPrice + '</td>\
						<td>'+ wageObj.working_details_print[z].basic_payment + '</td>\
						<td>'+ wageObj.working_details_print[z].total_price_day_wise + '</td></tr>';
					}
				text +='</tbody>\
				</table>\
			</div>';
			text += '<div id="working-details">';
			for (let x in wageObj.wage_reports) {
				text += '<div>\
				<strong>Location: </strong>'+ wageObj.wage_reports[x].location_name + '<br>\
				<strong>Basic Salary:</strong>$'+ wageObj.wage_reports[x].basic_salary + '<br>\
				<strong>Commission  :</strong>$'+ wageObj.wage_reports[x].commission_salary + '<br>\
				<strong>Tips:</strong>$'+ wageObj.wage_reports[x].tips_amount + '<br>\
				<strong>HST Amount:</strong>$'+ wageObj.wage_reports[x].location_hst_amount + '<br>\
				<strong>Basic+Commission+Tips+HST:</strong>$'+ wageObj.wage_reports[x].pass_amount + '<br>\
				</div>\
				';
			}
			text += '</div>';
			text += '<div class="total_amount">\
			<h3>Total Salary from all Locations:</h3>\
			<strong>Total Commission : </strong>$'+ wageObj.grand_total_commission + '<br>\
			<strong>Total Tips : </strong>$'+ wageObj.grand_tatal_tips + '<br>\
			<strong>Total Amount : </strong> $'+ wageObj.total_salary_amount + '<br>\
			</div>\
			';
			text += '<button style="margin-top:15px" class="action_btn" type="button" onclick="printEmpReport()">Print</button>';
			text +='<div id="work_detail_print" style="display:none">';
			text += '<div style="margin-top: 20px; display: flex; flex-direction: row; flex-wrap: wrap;">';
				text += '<table width="100%" border="1">\
				<tbody>\
					<tr>\
						<th>Date</th>\
						<th>Employee Name</th>\
						<th>Total Massage</th>\
						<th>Tips Amount</th>\
						<th>Card Charges</th>\
						<th>Total Receipts</th>\
						<th>Commission Amount</th>\
						<th>Basic Payment</th>\
						<th>Total Pay</th>\
					</tr>';
					for (let z in wageObj.working_details_print) {
						let commissionPrice = (wageObj.working_details_print[z].commission_price != undefined )? wageObj.working_details_print[z].commission_price:0;
						text += '<tr>\
						<td>'+ wageObj.working_details_print[z].booking_date + '</td>\
						<td>'+ employeeName + '</td>\
						<td>'+ wageObj.working_details_print[z].work_time +' ('+ wageObj.working_details_print[z].work_hour +')</td>\
						<td>'+ wageObj.working_details_print[z].tips_amount + '</td>\
						<td>'+ wageObj.working_details_print[z].card_charge + '</td>\
						<td>'+ wageObj.working_details_print[z].receipt_time +' ('+ wageObj.working_details_print[z].receipt_hour +')</td>\
						<td>'+ commissionPrice + '</td>\
						<td>'+ wageObj.working_details_print[z].basic_payment + '</td>\
						<td>'+ wageObj.working_details_print[z].total_price_day_wise + '</td></tr>';
					}
				text +='</tbody>\
			</table>';
			text +='<div style="width: 100%; margin-top: 1%; margin-bottom: 1%;">';
			for (let y in wageObj.wage_reports) {
				text += '<div style="background-color: #f1f1f1; padding: 1%;">\
				<strong>Location: </strong>'+ wageObj.wage_reports[y].location_name + '<br>\
				<strong>Basic Salary:</strong>$'+ wageObj.wage_reports[y].basic_salary + '<br>\
				<strong>Commission  :</strong>$'+ wageObj.wage_reports[y].commission_salary + '<br>\
				<strong>Tips:</strong>$'+ wageObj.wage_reports[y].tips_amount + '<br>\
				<strong>HST Amount:</strong>$'+ wageObj.wage_reports[y].location_hst_amount + '<br>\
				<strong>Basic+Commission+Tips+HST:</strong>$'+ wageObj.wage_reports[y].pass_amount + '<br>\
				</div>\
				';
			}
			text += '</div>';
			text += '<div style="width: 100%; background-color: #ddd; padding: 1%;">\
			<h3>Total Salary from all Locations:</h3>\
			<strong>Total Commission : </strong>$'+ wageObj.grand_total_commission + '<br>\
			<strong>Total Tips : </strong>$'+ wageObj.grand_tatal_tips + '<br>\
			<strong>Total Amount : </strong> $'+ wageObj.total_salary_amount + '<br>\
			</div>';
			text +='</div>';
			document.getElementById("data").innerHTML = text;
		}
	}
	function getEmployeeMaster() {
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "get_wage_report_master"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let wageObj = JSON.parse(this.responseText);
			text = '';
			for (let x in wageObj.employees) {
				text += '\
      <option value="'+ wageObj.employees[x].name + '">' + wageObj.employees[x].name + '</option>\
      ';
			}
			document.getElementById("employee_name").innerHTML = text;
			text1 = '';
			for (let x in wageObj.cashiers) {
				text1 += '\
      <option value="'+ wageObj.cashiers[x].id + '">' + wageObj.cashiers[x].name + '</option>\
      ';
			}
			document.getElementById("cashier_name").innerHTML = text1;
		}
	}
	function getCashierReport() {
		//let year = document.getElementById("cashier_year").value;
		let from_date = document.getElementById("cashier_from_date").value;
		let to_date = document.getElementById("cashier_to_date").value;
		let cashierName = document.getElementById("cashier_name").value;
		let xhr = new XMLHttpRequest();
		let jsonData = {
			cashierId: cashierName,
			from_date: from_date,
			to_date: to_date,
			do_action: "get_cashier_wage_report"
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let wageObj = JSON.parse(this.responseText);
			text = '<button style="margin-top:15px" class="action_btn" type="button" onclick="printWageReport()">Print</button>\
			<div id="working-details">';
			for (let x in wageObj.cash_report) {
				text += '<div>\
				<strong>Location Name:</strong>'+ wageObj.cash_report[x].location_name + '<br>\
				<strong>Basic Salary:</strong>$'+ wageObj.cash_report[x].basic_salary + '<br>\
				<strong>Bonus  :</strong>$'+ wageObj.cash_report[x].bonus + '<br>\
				<strong>Total :</strong>$'+ wageObj.cash_report[x].total_salary + '<br>\
				<strong>Vacation Fee :</strong>$'+ wageObj.cash_report[x].total_vacation_fee + '<br>\
				</div>\
				';
			}
			text += '</div>';
			text += '<div class="total_amount">\
			<strong>Total Basic Salary:</strong>$'+ wageObj.total_result.basic_salary + '<br>\
			<strong>Total Bonus  :</strong>$'+ wageObj.total_result.bonus + '<br>\
			<strong>Total Salary :</strong>$'+ wageObj.total_result.total_salary + '<br>\
			<strong>Total Vacation Fee :</strong>$'+ wageObj.total_result.total_vacation_fee + '<br>\
			</div>\
			';
			text += '<div id="working_details_print" style="display:none">\
			<table width="100%" border="1">\
				<tbody>\
					<tr>\
						<th>Date</th>\
						<th>Cashier Name</th>\
						<th>Start Time</th>\
						<th>End Time</th>\
						<th width="200">Location</th>\
						<th>Bonous</th>\
					</tr>';
					for (let z in wageObj.cashier_print) {
						text += '<tr>\
						<td>'+ wageObj.cashier_print[z].date + '</td>\
						<td>'+ wageObj.cashier_print[z].cachier_name + '</td>\
						<td>'+ wageObj.cashier_print[z].start_time + '</td>\
						<td>'+ wageObj.cashier_print[z].end_time + '</td>\
						<td>'+ wageObj.cashier_print[z].location + '</td>\
						<td>'+ wageObj.cashier_print[z].bonus + '</td>\</tr>';
					}
				text +='</tbody>\
			</table>\
			<div style="margin-top: 20px;display: flex;flex-direction: row;flex-wrap: wrap;">';
			for (let x in wageObj.cash_report) {
				text += '<div style="width: 30%; background-color: #f1f1f1; padding: 1%; float: left; margin: 0 0 1% 1%;">\
				<strong>Location Name:</strong>'+ wageObj.cash_report[x].location_name + '<br>\
				<strong>Basic Salary:</strong>$'+ wageObj.cash_report[x].basic_salary + '<br>\
				<strong>Bonus  :</strong>$'+ wageObj.cash_report[x].bonus + '<br>\
				<strong>Total :</strong>$'+ wageObj.cash_report[x].total_salary + '<br>\
				<strong>Vacation Fee :</strong>$'+ wageObj.cash_report[x].total_vacation_fee + '<br>\
				</div>\
				';
			}
			text += '</div>';
			text += '<div style="width: 98%; background-color: #ddd; padding: 1%; margin-top:15px;">\
			<strong>Total Basic Salary:</strong>$'+ wageObj.total_result.basic_salary + '<br>\
			<strong>Total Bonus  :</strong>$'+ wageObj.total_result.bonus + '<br>\
			<strong>Total Salary :</strong>$'+ wageObj.total_result.total_salary + '<br>\
			<strong>Total Vacation Fee :</strong>$'+ wageObj.total_result.total_vacation_fee + '<br>\
			</div>\
			<div>\
			';
			document.getElementById("data").innerHTML = text;
		}
	}
	getEmployeeMaster();
}

function fetchSideBar() {
	let xhr = new XMLHttpRequest();
	const login_info = JSON.parse(sessionStorage.getItem("login_info"));
	let jsonData = {
		do_action: "fetch_sidebar",
		token : login_info.token
	}
	let jsonString = JSON.stringify(jsonData);
	xhr.open("POST", "functions.php", true);
	xhr.setRequestHeader("Content-type", "text/html");
	xhr.send(jsonString);
	xhr.onload = function () {
		if(this.responseText != '') {
			document.getElementById("sidebar_aside").innerHTML = this.responseText;
		} else {
			logout()
		}
	}
}
fetchSideBar();
function logout() {
	sessionStorage.removeItem("login_info");
	window.location.href = './login.php';
}

function checkUserLoginStatus() {
	const login_info = JSON.parse(sessionStorage.getItem("login_info"));
	if (login_info == undefined || login_info == null || login_info == '') {
		logout();
	} else if (login_info.userType == 2 && !cashierPermissionUrl.includes(pageURL)) {
		logout();
	} else if (login_info.userType == 3 && !EmployeePermissionUrl.includes(pageURL)) {
		logout();
	}
}

function printWageReport() {
	var prtContent = document.getElementById("working_details_print");
	var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
	WinPrint.document.write(prtContent.innerHTML);
	WinPrint.print();
}
function printEmpReport() {
	var prtContent = document.getElementById("work_detail_print");
	var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
	WinPrint.document.write(prtContent.innerHTML);
	WinPrint.print();
}
async function changeColorPiker(obj,workId) {
	data = {do_action : "update_color_palette","color_palette": obj.value, workingId : workId};
	await fetch("functions.php", {
		method: "POST",
		body: JSON.stringify(data),
	});
	obj.parentNode.style.backgroundColor=obj.value;
}
// xhr.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     document.getElementById("data").innerHTML = xhr.responseText;
//   }
// }

// Treatment Note
if (pageURL == "/treatment-note.php") {
	window.addEventListener("load", treatmentNoteForm());

	function toggleOtherFieldArea(obj) {
		if (obj.checked == true && obj.value == 99) {
			let text = '<input type="text" name="area_other" id="area_other" />';
			document.getElementById('area_other_div').innerHTML = text;
		} else {
			document.getElementById('area_other_div').innerHTML = '';
		}
	}

	function toggleOtherFieldTech(obj) {
		if (obj.checked == true && obj.value == 99) {
			let text = '<input type="text" name="tech_other" id="tech_other" />';
			document.getElementById('tech_other_div').innerHTML = text;
		} else {
			document.getElementById('tech_other_div').innerHTML = '';
		}
	}

	function toggleOtherFieldConsent(obj) {
		if (obj.checked == true && obj.value == 99) {
			let text = '<label>Other Consent</label><br><input type="text" name="consent_other" id="consent_other" />';
			document.getElementById('consent_div').innerHTML = text;
		} else {
			document.getElementById('consent_div').innerHTML = '';
		}
	}

	function treatmentNoteForm() {
		const url = new URL(window.location.href);
		const workId = url.searchParams.get("data");
		let xhr = new XMLHttpRequest();
		let jsonData = {
			do_action: "treatment_note_show",
			work_id : workId
		}
		let jsonString = JSON.stringify(jsonData);
		xhr.open("POST", "functions.php", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(jsonString);
		xhr.onload = function () {
			let noteObj = JSON.parse(this.responseText);
			const treatment_note_for = (noteObj.tech_data.treatment_note_for != undefined ) ? noteObj.tech_data.treatment_note_for : '';
			const treatment_date = (noteObj.tech_data.treatment_date != undefined ) ? noteObj.tech_data.treatment_date : '';
			const treatment_time = (noteObj.tech_data.treatment_time != undefined ) ? noteObj.tech_data.treatment_time : '';
			const duration_time = (noteObj.tech_data.duration_time != undefined ) ? noteObj.tech_data.duration_time : '';
			const fee = (noteObj.tech_data.fee != undefined ) ? noteObj.tech_data.fee : '';
			const therapist_name = (noteObj.tech_data.therapist_name != undefined ) ? noteObj.tech_data.therapist_name : '';
			const clinical_finding = (noteObj.tech_data.clinical_finding != undefined ) ? noteObj.tech_data.clinical_finding : '';
			const clinical_reaction = (noteObj.tech_data.clinical_reaction != undefined ) ? noteObj.tech_data.clinical_reaction : '';
			const recommended_selfcare = (noteObj.tech_data.recommended_selfcare != undefined ) ? noteObj.tech_data.recommended_selfcare : '';

			const grade = (noteObj.tech_data.grade != undefined ) ? noteObj.tech_data.grade : '';

			const area_treated_other = (noteObj.tech_data.area_treated_other != undefined ) ? noteObj.tech_data.area_treated_other : '';
			const tech_used_other = (noteObj.tech_data.tech_used_other != undefined ) ? noteObj.tech_data.tech_used_other : '';
			const consent_other = (noteObj.tech_data.consent_other != undefined ) ? noteObj.tech_data.consent_other : '';

			let treatmentChecked = assessmentChecked = otherChecked = '';
			if(noteObj.tech_data.consent_recived) {
				const consentRecived = noteObj.tech_data.consent_recived.split(',');
				treatmentChecked = (consentRecived.includes("1")) ? 'checked' : '';
				assessmentChecked = (consentRecived.includes("2")) ? 'checked' : '';
				otherChecked = (consentRecived.includes("99")) ? 'checked' : '';
			}

			let text = '\
      		<div id="treatment_note_form">\
      		<label>Treatment Note For : </label><br />\
	        <input type="text" name="treatment_note_for" value="'+treatment_note_for+'"/><br />\
	        <label>Treatment Date:</label><br />\
	        <input type="date" name="treatment_date" value="'+treatment_date+'" /><br />\
	        <label>Treatment Time:</label><br />\
	        <input type="time" name="treatment_time" value="'+treatment_time+'" /><br />\
	        <label>Duration (in minutes):</label><br />\
	        <input type="number" name="duration_time" value="'+duration_time+'" /><br />\
	        <label>Fee :</label><br />\
	        <input type="number" name="fee"  min="1" onkeyup="negativeValueCheck(this)" value="'+fee+'"/><br />\
	        <label>Informed Consent Received:</label><br />\
	        <input type="checkbox" name="consent_recived" value="1" '+treatmentChecked+'>Treatment\
	        <input type="checkbox" name="consent_recived" value="2" '+assessmentChecked+'>Assessment\
	        <input type="checkbox" name="consent_recived" id="other_consent_element" value="99" '+otherChecked+' onchange="toggleOtherFieldConsent(this)">Other<br>';
	        text +='<div id="consent_div"></div>';
	        text +='<label>Therapist:</label><br />\
	        <input type="text" name="therapist_name" value="'+therapist_name+'"/><br />\
	        <label>Techniques Used : </label><br />';
	        for(let techCnt = 0; techCnt < noteObj.tech_used.length; techCnt++) {
	        	const techId = noteObj.tech_used[techCnt].id;
	        	const techName = noteObj.tech_used[techCnt].name;
	        	let techArray = Array();

	        	if(noteObj.tech_data.tech_used != undefined ) {
		        	techArray = noteObj.tech_data.tech_used.filter(function(obj) {
					    return Number(obj.treatment_id) === Number(techId);
					});
				}

	        	const selectedTech = (techArray.length > 0) ? 'checked' : '';
	        	text +='<input type="checkbox" name="techniques_used" id="techniques_used_'+techCnt+'"  value="'+techId+'" '+selectedTech+' onchange="toggleOtherFieldTech(this)"/>'+techName+'<br />';

	        }

	        text +='<div id="tech_other_div"></div>\
	        <label>Grade:</label><br />\
	        <input type="text" name="grade" value="'+grade+'"/><br />\
	        <label>Area Treated : </label><br />';
	        for(let areaCnt = 0; areaCnt < noteObj.area_treated.length; areaCnt++) {
	        	const areaId = noteObj.area_treated[areaCnt].id;
	        	const areaName = noteObj.area_treated[areaCnt].name;
	        	let areaArray = Array();
	        	if(noteObj.tech_data.area_treated != undefined) {
		        	areaArray = noteObj.tech_data.area_treated.filter(function(obj) {
					    return Number(obj.area_treated_id) === Number(areaId);
					});
				}
	        	const selectedArea = (areaArray.length > 0) ? 'checked' : '';

	        	text +='<input type="checkbox" name="area_treated" id="area_treated_'+areaCnt+'" value="'+areaId+'" '+selectedArea+' onchange="toggleOtherFieldArea(this)"/>'+areaName+'<br />';
	        }
	        text +='<div id="area_other_div"></div>';
	        text +='<label>Clinical Findings : </label><br />\
	        <textarea name="clinical_finding" id="clinical_finding" class="height_100"/>'+clinical_finding+'</textarea><br />\
	        <label>Clients Reaction / Feedback : </label><br />\
	        <textarea name="clinical_reaction" class="height_100">'+clinical_reaction+'</textarea><br />\
	        <label>Recommended Self-Care : </label><br />\
	        <textarea name="recommended_selfcare" class="height_100">'+recommended_selfcare+'</textarea><br /><br />\
	        <input type="hidden" name="note_id" value="'+noteObj.tech_data.note_id+'">';
	        if(noteObj.tech_data.note_id) {
	        	text +='<button class="action_btn" onclick="treatmentNoteAdd();">Update</button>';
	        	text += '<a target="_blank" href="'+noteObj.tech_data.file_fullpath+'" class="view_doc_btn" >Download Treatment Note</a>';
	        } else {
	        	text +='<button class="action_btn" onclick="treatmentNoteAdd();">Submit</button>';
	        }

      		text += '</div>';
			document.getElementById("data").innerHTML = text;


			for (let x in noteObj.tech_used) {
				const objTechSelected = document.getElementById('techniques_used_'+x);
				toggleOtherFieldTech(objTechSelected);
			}

			for (let y in noteObj.area_treated) {
				const objAreaSelected = document.getElementById('area_treated_'+y);
				toggleOtherFieldArea(objAreaSelected);
			}

			if (otherChecked) {
				const objConsentSelected = document.getElementById("other_consent_element");
				toggleOtherFieldConsent(objConsentSelected);
			}

			if(tech_used_other.trim() != "") document.getElementById('tech_other').value = tech_used_other;
			if(area_treated_other.trim() != "") document.getElementById('area_other').value = area_treated_other;
			if(consent_other.trim() != "") {
				document.getElementById('consent_other').value = consent_other;
			}
		}
	}

	function treatmentNoteAdd() {
		let noteId = document.querySelector("input[name='note_id']").value;
		let treatmentNoteFor = document.querySelector("input[name='treatment_note_for']").value;
		let treatmentDate = document.querySelector("input[name='treatment_date']").value;
		let durationTime = document.querySelector("input[name='duration_time']").value;
		let fee = document.querySelector("input[name='fee']").value;
		let therapistName = document.querySelector("input[name='therapist_name']").value;

		let treatmentTime = document.querySelector("input[name='treatment_time']").value;
		let techOther = document.querySelector("input[name='tech_other']")?.value;
		let grade = document.querySelector("input[name='grade']").value;
		let areaOther = document.querySelector("input[name='area_other']")?.value;
		let consentOther = document.querySelector("input[name='consent_other']")?.value;

		let consent_recived = document.querySelectorAll("input[name='consent_recived']:checked");
		let consentRecived = [];
		if(consent_recived) {
			for (let consent_cnt = 0; consent_cnt < consent_recived.length; consent_cnt++) {
				consentRecived.push(consent_recived[consent_cnt].value);
			}
		}

		let tech_used = document.querySelectorAll("input[name='techniques_used']:checked");
		let techUsed = {};
		for (let tech_cnt = 0; tech_cnt < tech_used.length; tech_cnt++) {
			techUsed[tech_cnt] = tech_used[tech_cnt].value;
		}

		let area_treated = document.querySelectorAll("input[name='area_treated']:checked");
		let areaTrated = {};
		for (let area_cnt = 0; area_cnt < area_treated.length; area_cnt++) {
			areaTrated[area_cnt] = area_treated[area_cnt].value;
		}

		let clinicalFinding = document.querySelector("textarea[name='clinical_finding']").value;
		let clinicalReaction = document.querySelector("textarea[name='clinical_reaction']").value;
		let recommendedSelfcare = document.querySelector("textarea[name='recommended_selfcare']").value;

		const url = new URL(window.location.href);
		const workId = url.searchParams.get("data");
		if (workId !== null) {
			let xhr = new XMLHttpRequest();
			const formData = new FormData();
			formData.append('do_action', "treatment_note_add");
			formData.append('noteId',noteId);
			formData.append('workId',workId);
			formData.append('treatmentNoteFor',treatmentNoteFor);
			formData.append('treatmentDate',treatmentDate);
			formData.append('durationTime',durationTime);
			formData.append('fee',fee);
			formData.append('consentRecived',consentRecived.join(','));
			formData.append('therapistName',therapistName);
			formData.append('techUsed',JSON.stringify(techUsed));
			formData.append('areaTrated',JSON.stringify(areaTrated));
			formData.append('clinicalFinding',clinicalFinding);
			formData.append('clinicalReaction',clinicalReaction);
			formData.append('recommendedSelfcare',recommendedSelfcare);

			formData.append('treatmentTime',treatmentTime);
			formData.append('techOther',techOther);
			formData.append('grade',grade);
			formData.append('areaOther',areaOther);
			formData.append('consentOther',consentOther);

			xhr.open("POST", "functions.php", true);
			//xhr.setRequestHeader("Content-type", "application/json");
			xhr.send(formData);
			xhr.onload = function () {
				if (xhr.status === 200) {
			    	const response = JSON.parse(xhr.responseText);
			    	alert(response.message);
			    	window.location.reload();
			    }
			}
		}
	}
}