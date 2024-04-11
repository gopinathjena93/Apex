<?php
include ('header.php');
require ('db.php');
?>

<div class="locations">
  <span class="span_heading">Configuration</span><br>
  <input type="date" id="config_value" />
  <button class="action_btn" onClick="updateConfiguration(1)"> Update </button>
  <div id="data"></div>
</div>

<?php include ('footer.php'); ?>