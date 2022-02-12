import React from 'react';
import useStyles from './styles';
const Jackpots: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className='p-3.5 md:px-8 md:pt-3 md:pb-5'>
        <div className='flex justify-between'>
          <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-2.5'>Round</p>
          <ul className='flex justify-end items-center'>
            <li className='cursor-pointer transition-all hover:opacity-70'>
              <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.646681 3.64645C0.45142 3.84171 0.45142 4.15829 0.646681 4.35356L3.82866 7.53554C4.02392 7.7308 4.34051 7.7308 4.53577 7.53554C4.73103 7.34027 4.73103 7.02369 4.53577 6.82843L1.70734 4L4.53577 1.17157C4.73103 0.976312 4.73103 0.65973 4.53577 0.464468C4.34051 0.269206 4.02392 0.269206 3.82866 0.464468L0.646681 3.64645ZM16.6719 3.5L1.00023 3.5L1.00023 4.5L16.6719 4.5L16.6719 3.5Z" fill="#f9f9f9"/>
              </svg>
            </li>
            <li className='cursor-pointer transition-all hover:opacity-70 mx-4'>
              <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6224 4.35355C16.8176 4.15829 16.8176 3.84171 16.6224 3.64645L13.4404 0.464466C13.2451 0.269204 12.9285 0.269204 12.7333 0.464466C12.538 0.659728 12.538 0.976311 12.7333 1.17157L15.5617 4L12.7333 6.82843C12.538 7.02369 12.538 7.34027 12.7333 7.53553C12.9285 7.7308 13.2451 7.7308 13.4404 7.53553L16.6224 4.35355ZM0.597168 4.5H16.2688V3.5H0.597168V4.5Z" fill="#f9f9f9"/>
              </svg>
            </li>
            <li className='cursor-pointer transition-all hover:opacity-70'>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7269 7.35355C16.9221 7.15829 16.9221 6.84171 16.7269 6.64645L13.5449 3.46447C13.3496 3.2692 13.033 3.2692 12.8378 3.46447C12.6425 3.65973 12.6425 3.97631 12.8378 4.17157L15.6662 7L12.8378 9.82843C12.6425 10.0237 12.6425 10.3403 12.8378 10.5355C13.033 10.7308 13.3496 10.7308 13.5449 10.5355L16.7269 7.35355ZM0.70166 7.5H16.3733V6.5H0.70166V7.5Z" fill="#F9F9F9"/>
                <line x1="17.5" y1="0.5" x2="17.5" y2="13.5" stroke="#F9F9F9" strokeLinecap="round"/>
              </svg>
            </li>
          </ul>
        </div>
        <p className='bg-gray-lightbox text-right rounded-5 flex justify-between items-center pr-2.5'>
          <span className='text-h3-sp md:text-h3-pc font-bold text-gray-primary p-2 md:px-8 text-center bg-pink-primary rounded-5 inline-block'>#0</span>
          Otc 26, 2021, 2:00 PM UTC
        </p>
      </div>
      <div className='bg-gray-lightbox p-3.5 md:px-8 md:pt-6 md:pb-4'>
        <div className='md:flex justify-between md:items-end'>
          <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-0'>Prize pot</p>
          <div className='flex justify-between md:w-3/5'>
            <p className='text-28 md:text-h1-pc font-bungee text-blue-primary leading-none'>~$0</p>
            <p className='text-h2-pc font-bungee text-blue-primary relative top-0.5'>0 MILLI</p>
          </div>
        </div>
      </div>
      <p className='text-gray-primary text-center p-3.5'>u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w</p>
    </>
  )
}

export default Jackpots