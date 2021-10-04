import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewSubmit: boolean
}
const ViewSubmit: React.FC<Props> = ({dataSendViewSubmit}) => {
  const classes = useStyles();
  return (
    <>
      <div className={`${classes.root}`}>
        <div className={`${classes.submitIcon}`}>
          {dataSendViewSubmit ? (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" stroke="#17F0FF" strokeWidth="2"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M29.2512 14.8645C29.7898 15.3732 29.7898 16.198 29.2512 16.7067L19.596 25.8255C19.0573 26.3342 18.184 26.3342 17.6454 25.8255L12.1281 20.6148C11.5895 20.106 11.5895 19.2812 12.1281 18.7725C12.6668 18.2638 13.5401 18.2638 14.0788 18.7725L18.6207 23.0621L27.3005 14.8645C27.8392 14.3557 28.7125 14.3557 29.2512 14.8645Z" fill="#17F0FF"/>
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22H28C29.1046 22 30 21.1046 30 20C30 18.8954 29.1046 18 28 18H12Z" fill="#A819FA"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM4 20C4 11.1634 11.1634 4 20 4C28.8366 4 36 11.1634 36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20Z" fill="#A819FA"/>
            </svg>
          )}
        </div>
        <div className={`${classes.submitContent} ${dataSendViewSubmit ? '' : 'error'}`}>
          <p className={`${classes.submitTitle} ${dataSendViewSubmit ? '' : 'error'}`}>{dataSendViewSubmit ? 'Successful purchased!' : 'Error.'}</p>
          {dataSendViewSubmit ? '' : <p className={`${classes.submitDes}`}>Please try again. Confirm the transaction and make sure you are paying enough gas!</p>}
        </div>
      </div>
    </>
  )
}

export default ViewSubmit