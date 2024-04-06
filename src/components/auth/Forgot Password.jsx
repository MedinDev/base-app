import React, {useState} from 'react';
import {resetPassword} from '../utils/ApiFunctions';
import {useNavigate} from "react-router-dom";

function ForgotPassword() {
    const [contactMethod, setContactMethod] = useState('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return; // Exit the function if passwords don't match
        }
        const resetPasswordRequest = {
            email: contactMethod === 'email' ? email : '',
            phone: contactMethod === 'phone' ? phone : '',
            newPassword: newPassword
        };
        try {
            const response = await resetPassword(resetPasswordRequest);
            console.log('Password reset successful', response);
            navigate('/login', {state: {message: 'Password reset successful. Please login with your new password.'}});

        } catch (error) {
            console.error('Failed to reset password', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-center">
                        <label className="inline-flex items-center mr-6">
                            <input type="radio" name="contactMethod" value="email" checked={contactMethod === 'email'}
                                   onChange={(e) => setContactMethod(e.target.value)}/>
                            <span className="ml-2">Email</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="contactMethod" value="phone" checked={contactMethod === 'phone'}
                                   onChange={(e) => setContactMethod(e.target.value)}/>
                            <span className="ml-2">Phone</span>
                        </label>
                    </div>
                    {contactMethod === 'email' ? (
                        <div className="mb-4">
                            <label htmlFor="email"
                                   className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input type="email" name="email" id="email" required={contactMethod === 'email'}
                                   value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   placeholder="your@email.com"/>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="phone"
                                   className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                            <input type="tel" name="phone" id="phone" required={contactMethod === 'phone'} value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                                   className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   placeholder="Your phone number"/>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="newPassword"
                               className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New
                            Password</label>
                        <input type="password" name="newPassword" id="newPassword" required value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                               className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               placeholder="Enter your new password"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword"
                               className="block text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm
                            Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" required
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                               placeholder="Confirm your new password"/>
                    </div>
                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reset
                        Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
