requirejs.config({
    "paths": {
      "jquery": "https://code.jquery.com/jquery-1.11.3.min",
      "moment": "../../moment",
      "daterangepicker": "../../daterangepicker"
    }
});

requirejs(['jquery', 'moment', 'daterangepicker'] , function ($, moment) {
$(document).ready(function() {

  $('#config-text').keyup(function() {
    eval($(this).val());
  });

  $('.daytypefilter i').click(function() {
    $(this).parent().find('input').click();
  });
  
  updateConfig();

  function updateConfig() {
    var options = {};
    window.dayTypeFilter = {};
	options.ranges = {
	        'Today': [moment(), moment()],
	        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	        'This Month': [moment().startOf('month'), moment().endOf('month')],
	        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	      };

   	options.startDate = moment()
    options.endDate = moment().subtract(-7, 'days')
    $('.date_range_selection').daterangepicker(options, function(start, end, label) { console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')'); });

  }

});
});
