import React, { useState } from 'react';
import EmailGuesser from '../components/EmailGuesser';
import { deriveEmail } from '../api';
import { validateForm } from '../validation/formValidation';

const EmailGuesserContainer = () => {
    const [fullName, setFullName] = useState('');
    const [domain, setDomain] = useState('');
    const [emails, setEmails] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const validation = validateForm(fullName, domain);
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setLoading(true);
        setError('');
        setEmails([]); // Reset emails

        try {
            const response = await deriveEmail(fullName, domain);
            setLoading(false);

            if (response.success) {
                setEmails(response.data.emails || []); // Ensure emails is an array
            } else {
                setError(response.error);
            }
        } catch (err) {
            setLoading(false);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <EmailGuesser
            fullName={fullName}
            domain={domain}
            emails={emails} // Pass emails array to component
            loading={loading}
            error={error}
            setFullName={setFullName}
            setDomain={setDomain}
            handleSubmit={handleSubmit}
        />
    );
};

export default EmailGuesserContainer;
