<?php
    require ('db.php');
  include ('header.php');



?>



<style>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}




#working_details_print {

    margin-top: 20px;

    display: flex;

    flex-direction: row;

    flex-wrap: wrap;

}





#working_details_print div {

    width: 30%;

    background-color: #f1f1f1;

    padding: 1%;

    float: left;

    margin: 0 0 1% 1%;

}



#working_details_print div:nth-child(3n + 1) {

    margin-left: 0;

}



#working_details_print button {

    margin-top: 12px;

    margin-bottom: 6px;

}

</style>







<div class="wages-data">

  <div class="wage-filter-wrapper">

    <div class="wage-filter">

    <span class="span_heading">Employee Wage Report</span><br /><br />

      <label>Choose Employee:</label><br />

      <select id="employee_name">

      </select>

      <br />

      <label>From Date </label><br />

      <input type="date" name="from_date" id="from_date"><br />

      <label>To Date </label><br />

      <input type="date" name="to_date" id="to_date">



      <button id="get_wage_report" class="action_btn">Get Report</button>

    </div>



    <div class="wage-filter">

    <span class="span_heading">Cashier Wage Report</span><br /><br />

      <label>Choose Cashier:</label><br />

      <select id="cashier_name">

      </select>



      <br />



      <label>From Date </label><br />

      <input type="date" name="cashier_from_date" id="cashier_from_date"><br />

      <label>To Date </label><br />

      <input type="date" name="cashier_to_date" id="cashier_to_date">

      <button id="get_cashier_report" class="action_btn">Get Cashier Report</button>

    </div>

  </div>

  <div id="data"></div>

  <!-- <div id="print_cashier"></div> -->

</div>



<!-- <button onclick="printWageReport()" type="button">Print</button> -->

<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>Deductions Remarks</h2>
    </div>
    <div class="modal-body">
      <p class="pl-10" id="remarks"></p>
    </div>
  </div>

</div>

<?php include ('footer.php'); ?>