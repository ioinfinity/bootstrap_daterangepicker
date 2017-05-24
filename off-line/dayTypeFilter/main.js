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
  	window.dayTypeFilter = {};
    var options = {};
    
	options.ranges = {
	        'Today': [moment(), moment()],
	        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	        'This Month': [moment().startOf('month'), moment().endOf('month')],
	        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	      };
    
    var idArray = [];
	$('.date_range_selection').each(function () {
		
		var show_date_format = 'YYYY/MM/DD'
		var data_date_format = 'YYYY/MM/DD'
		
		if ( typeof this.name == 'undefined' || this.name == null || this.name == '' ) {
			var uuid = generateUUID();
  			options.date_range_text_input_name = uuid;
  			$(this).attr('name', uuid);
		} else {
			options.date_range_text_input_name  = this.name;
		}
		options.startDate = moment();
    	options.endDate = moment().subtract(-7, 'days');
    	defaultStartDate = $(this).attr('startdate');
    	defaultEndDate = $(this).attr('enddate');
    	console.log("Attribute value of start date is " + defaultStartDate + " / Attribute value of end date is " + defaultEndDate);
    	if ( typeof defaultStartDate !== 'undefined' && defaultStartDate !== null && defaultStartDate !== '' &&
    			typeof defaultEndDate !== 'undefined' && defaultEndDate !== null && defaultEndDate !== ''){
    		options.startDate = moment(defaultStartDate, show_date_format);
    		options.endDate = moment(defaultEndDate, show_date_format);
    	}
    	
	    $(this).daterangepicker(options, function(start, end, label) { console.log('New date range selected: ' + start.format(show_date_format) + ' to ' + end.format(show_date_format) + ' (predefined range: ' + label + ')'); });
	    hidden_inputs = 
	    	'<input type="hidden" name="dateRanagePickerStartDate_' + options.date_range_text_input_name+ '" id="dateRanagePickerStartDate_' + options.date_range_text_input_name + '" value="'+ options.startDate.format(data_date_format) +'"/>' +
            '<input type="hidden" name="dateRanagePickerEndDate_' + options.date_range_text_input_name + '" id="dateRanagePickerEndDate_' + options.date_range_text_input_name + '"  value="'+ options.endDate.format(data_date_format)  + '"/>' +
            '<input type="hidden" name="dateRanagePickerFilter_' + options.date_range_text_input_name + '" id="dateRanagePickerFilter_' + options.date_range_text_input_name + '" />' ;
	    
	    $(this).after(hidden_inputs);
	});
    
  }
  
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

});
});
