import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const DismissableAlert = ({alert, setAlert}) => {

  return (
    <>
      <Alert show={true} variant={alert.error ? "danger" : "success"} onClose={() => setAlert({message: '', error: false})} className="pt-0 pb-0 mt-3 " >
      

        <div className="d-flex justify-content-between align-items-center p-1 m-0">
        <span>
          {alert.message}
        </span>
        
          <button type="button" className="btn-close p-0 m-0" aria-label="Close alert" onClick={() => setAlert({message: '', error: false})}></button>
        </div>

      </Alert>
    </>
  );
}