function changeLabelText(user_type) { 
  let text = '';
  if(user_type ==1){
    text = `<input type="password" id="user-password" placeholder="Admin Password" /> <br/>
      <button onclick="login_submit(1)">Submit</button>
    `;
    document.getElementById("cashier_user").classList.remove("active");
    document.getElementById("employee_user").classList.remove("active");
    document.getElementById("admin_user").classList.add("active");
  }
  if(user_type ==2){
    text = `<input type="password" id="user-password" placeholder="Cashier Password" /> <br/>
      <button onclick="login_submit(2)">Submit</button>`;
    document.getElementById("admin_user").classList.remove("active");
    document.getElementById("employee_user").classList.remove("active");
    document.getElementById("cashier_user").classList.add("active");
  }
  if(user_type ==3){
    text = `<input type="emp_name" id="emp_name" placeholder="Name" /><br>
      <input type="password" id="emp_password" placeholder="Password" /> <br/>
      <button onclick="login_submit(3)">Submit</button>`;
    document.getElementById("admin_user").classList.remove("active");
    document.getElementById("cashier_user").classList.remove("active");
    document.getElementById("employee_user").classList.add("active");
  }
  document.getElementById("password_ask").innerHTML = text;
}

function login_submit(user_type) {
  
  if(user_type == 3) {
    const emp_name = document.getElementById("emp_name").value;
    const emp_password = document.getElementById("emp_password").value;
    jsonData = { 
        do_action: "login_application",
        userTypeId: user_type,
        emp_name: emp_name,
        emp_password : emp_password   
    }
  } else { 
    const password = document.getElementById("user-password").value;
    jsonData = { 
        do_action: "login_application",
        userTypeId: user_type,
        password: password       
    }
  }
  let xhr = new XMLHttpRequest(); 
  let jsonString = JSON.stringify(jsonData);
  xhr.open("POST", "functions.php", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(jsonString);
  xhr.onload = function() {
    let loginInfo = {};
    let loginobj = JSON.parse(this.responseText);
    if(loginobj.status=="failed") { 
        alert(loginobj.message);
        return false;
    } else {  
        loginInfo.userType = loginobj.userType;
        loginInfo.token = loginobj.token;
        sessionStorage.setItem("login_info",JSON.stringify(loginInfo))
        window.location.href='./';       
    }
  }
}

checkUserLoginStatus();

function checkUserLoginStatus() {
  const login_info = sessionStorage.getItem("login_info");
  if(login_info)    {
      window.location.href='./';
  }
}