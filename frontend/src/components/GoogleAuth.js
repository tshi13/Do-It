import React from "react";
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import { gapi } from 'gapi-script';
import { useEffect } from "react";

export default function GoogleAuth(props) {

	const clientId = '311523881473-odufi85njfn04idsir7pr8ckmarl9hak.apps.googleusercontent.com';
	

	useEffect(() => {
		const initClient = () => {
					gapi.client.init({
					clientId: clientId,
					scope: ''
				});
			};
			gapi.load('client:auth2', initClient);
	});

	
	const onSuccess = (res) => {
		const data = res.profileObj;
		props.handleGoogle(data);
	};
	
	const onFailure = (err) => {
			console.log('failed:', err);
	};
	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Google"
				render={renderProps => (
					<GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</GoogleButton>
				)}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
   	 		prompt="select_account"
		/>
		</div>
	);
}