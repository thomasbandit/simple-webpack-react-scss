import React from 'react';

const ErrorMessage = () => (
  <div className="container-fluid mt-4 mb-5">
    <div className="row">
      <div className="col-sm-10 offset-sm-1 text-center">
        <h3>Unfortunately an error has occurred</h3>
        <p>Please try a different request or
          <button
            type="button"
            style={{
              padding: '0 5px 0',
              textDecoration: 'underline',
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => window.location.reload()}
          >
            reloading your browser
          </button>.
        </p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
