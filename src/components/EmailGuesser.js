import React, { useState } from 'react';

const EmailGuesser = ({
  fullName,
  domain,
  emails = [], // Default to empty array
  loading,
  error,
  setFullName,
  setDomain,
  handleSubmit,
}) => {
  const [fullNameError, setFullNameError] = useState('');
  const [domainError, setDomainError] = useState('');

  const validateFullName = (value) => {
    // Regex to allow alphabets, spaces, common umlauts, and ß
    return /^[a-zA-ZäöüÄÖÜß\s]*$/.test(value);
  };

  const validateDomain = (value) => {
    // Regex to allow alphabets, numbers, dots, and hyphens
    return /^[a-zA-Z0-9äöüÄÖÜß.-]*$/.test(value);
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    if (validateFullName(value)) {
      setFullName(value);
      setFullNameError('');
    } else {
      setFullNameError('Invalid characters in full name.');
      setFullName(value);
    }
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    if (validateDomain(value)) {
      setDomain(value);
      setDomainError('');
    } else {
      setDomainError('Invalid characters in domain.');
      setDomain(value);
    }
  };

  const isFormValid = () => {
    return validateFullName(fullName) && validateDomain(domain);
  };

  return (
    <div className="email-guesser">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormValid()) {
            handleSubmit();
          }
        }}
      >
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Full Name"
            required
          />
          {fullNameError && (
            <p className="error-message">* {fullNameError}</p>
          )}
        </div>
        <div>
          <label>Company Domain:</label>
          <input
            type="text"
            value={domain}
            onChange={handleDomainChange}
            placeholder="Company Domain"
            required
          />
          {domainError && (
            <p className="error-message">* {domainError}</p>
          )}
        </div>
        <button type="submit" disabled={loading || !isFormValid()}>Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {emails.length > 0 && (
        <div className="email-list-container">
          <b>Derived Emails:</b>
          <ul className="email-list">
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmailGuesser;
