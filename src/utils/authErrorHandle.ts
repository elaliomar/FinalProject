import  { AxiosError } from 'axios';
import { Alert } from 'react-native';

const handleApiResponseError = (error: AxiosError, context: 'login' | 'signup' ) => {
    if (error.response) {
        switch (error.response.status) {
            case 201:  
                if (context === 'signup') {
                    Alert.alert("Success", "User created successfully.");
                }
                break;
            case 200:
                if (context === 'login') {
                    Alert.alert("New access token generated.");
                }
                break;
            case 400:
                if (context === 'signup') {
                    Alert.alert("Signup Error", "Bad request or user already exists. Please try again.");
                } else {
                    Alert.alert("Authentication Error", "User not found. Please check your details and try again.");
                }
                break;
            case 401:
                if (context === 'login') {
                    Alert.alert("Authentication Error", "Invalid password. Please try again.");
                }
                break;
            case 500:
                Alert.alert("Server Error", "Internal server error. Please try again later.");
                break;
            default:
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
                break;
        }
    } else {
        Alert.alert("Network Error", "An error occurred while trying to connect to the server. Please check your network connection and try again.");
    }
};


export default handleApiResponseError
