function userIsSignedIn() {

	const token = localStorage.getItem('token') || getCookie('token');

	return !!token;

}




function showUserOptions() {

	if (userIsSignedIn()) {
		document.querySelector('#btn-edit-blog').style.display = 'inline-block';

		document.querySelector('#btn-edit-blog').style.display = 'inline-block';

		// Add other buttons or elements you want to show for signed-in users

	}

	else {

		console.log("user not signd in");

	}

}