"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const TokenGenerator = () => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const fetchToken = async () => {
        try {
            const response = await fetch('../api/generateToken.js', { method: 'POST' });
            const data = await response.json();

            if (data.token) {
                setToken(data.token);
                setError(null);
            } else {
                setError(data.error || 'Failed to generate token');
            }
        } catch (error) {
            setError('An error occurred while fetching the token');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Token Generator</h1>

 <Link href="/roommain">
 <button 
                onClick={fetchToken} 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Generate Token
            </button>
 </Link>

       
            {token && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <strong>Token:</strong> <pre>{token}</pre>
                </div>
            )}
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

export default TokenGenerator;
