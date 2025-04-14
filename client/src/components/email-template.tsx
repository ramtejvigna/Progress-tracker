import * as React from 'react';

interface EmailTemplateProps {
    otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    otp,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
        <h2 style={{ color: '#333' }}>Verify Your Account</h2>
        <p>Thank you for registering with the Lab Attendance System. Please use the following OTP to verify your account:</p>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', letterSpacing: '5px', margin: '20px 0' }}>
            ${otp}
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you did not request this verification, please ignore this email.</p>
    </div>
);