//actions panel stuff
var actionsWidth = 150;
var statusCodetraceWidth = 420;

var isCreateOpen = false;
var isRMQOpen = false;
var isUpdateOpen = false;

function openCreate() {
	if(!isCreateOpen) {
		$('.create').fadeIn('fast');
		isCreateOpen = true;
	}
}
function closeCreate() {
	if(isCreateOpen) {
		$('.create').fadeOut('fast');
		$('#create-err').html("");
		isCreateOpen = false;
	}
}
function openRMQ() {
	if(!isRMQOpen) {
		$('.rmq').fadeIn('fast');
		isRMQOpen = true;
	}
}
function closeRMQ() {
	if(isRMQOpen) {
		$('.rmq').fadeOut('fast');
		$('#rmq-err').html("");
		isRMQOpen = false;
	}
}
function openUpdate() {
	if(!isUpdateOpen) {
		$('.update').fadeIn('fast');
		isUpdateOpen = true;
	}
}
function closeUpdate() {
	if(isUpdateOpen) {
		$('.update').fadeOut('fast');
		$('#update-err').html("");
		isUpdateOpen = false;
	}
}


//
function hideEntireActionsPanel() {
	closeCreate();
	closeRMQ();
	hideActionsPanel();
}

$( document ).ready(function() {
	//action pullouts
	$('#create').click(function() {
		closeUpdate();
		closeRMQ();
		openCreate();
	});
	$('#rmq').click(function() {
		closeCreate();
		closeUpdate();
		openRMQ();
	});
	$('#update').click(function() {
		closeCreate();
		closeRMQ();
		openUpdate();
	})
});