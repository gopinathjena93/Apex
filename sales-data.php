<?php
  require ('db.php');
  include ('header.php');



?>



<div class="sales-data">

  <span class="span_heading">Sales Data</span>

  <div id="sales-data-filter">

    <label>Choose Start Date:</label>

    <input id="start-date" type="date" /><br />

    <label>Choose End Date:</label>

    <input id="end-date" type="date" /><br />

    <button id="get_sales_report" class="action_btn">Get Report</button>

  </div>

  <div id="data"></div>

</div>



<?php include ('footer.php'); ?>