<?php
  require ('db.php');
  include ('header.php');
?>

<div class="basic-pay-deduction">
  <span class="span_heading">Deductions</span>
  <button id="add_basic_pay_deduction" onclick="basicPayDeductionFormShow(null)" class="action_btn">&plus; Add</button> <img id="filter_deduction" src="<?=$base_url?>img/setting.png" />
  <div id="data" class="mt-15"></div>
</div>
<?php include ('footer.php'); ?>