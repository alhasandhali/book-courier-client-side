import React from 'react';
import { useRouteError, Link } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
            <p className="text-lg mt-2 opacity-70">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            {error && (
                <p className="text-sm mt-4 text-red-500 font-mono bg-red-100 p-2 rounded">
                    {error.statusText || error.message}
                </p>
            )}
            <Link to="/" className="btn btn-primary mt-8">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
