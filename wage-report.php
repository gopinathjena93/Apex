<?php
    require ('db.php');
  include ('header.php');



?>



<style>

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



<?php include ('footer.php'); ?>