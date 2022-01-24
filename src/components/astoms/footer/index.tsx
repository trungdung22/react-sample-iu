import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import useStyles from './styles';
import { useWindowSize } from 'data/constants';
type urlParams = {
  nameProject: string,
};
const Footer: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {nameProject} = useParams<urlParams>();
  const [location, setLocation] = useState(typeof nameProject !== 'undefined' ? '/milligo' : history.location.pathname.toLowerCase());
  return (
    <>
      <ul className={`${classes.footerSticky} bg-gray-box`}>
        <li>
          <a href="/lottery" className={location === '/lottery' ? 'active text-blue-primary bg-gray-lightbox': 'text-gray-primary' }>
            <span>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.632 10.3687C18.4578 9.89803 17.1893 9.01628 16.2591 7.8187C15.3104 6.59718 14.5458 5.04069 14.0479 3.31741L13.478 1.34534C13.4056 1.09464 13.1761 0.922058 12.9151 0.922058C12.6541 0.922058 12.4247 1.09464 12.3522 1.34534L11.7824 3.31741C11.2845 5.04069 10.5198 6.59725 9.57114 7.8187C8.64098 9.01628 7.52872 9.89803 6.3545 10.3687C6.13536 10.4566 5.99036 10.6674 5.98665 10.9034C5.98293 11.1395 6.12125 11.3548 6.33754 11.4494L6.51969 11.5291C8.85079 12.5495 10.7558 15.0624 11.7463 18.4237L12.353 20.4829C12.4265 20.7321 12.6553 20.9032 12.9151 20.9032C13.175 20.9032 13.4037 20.7321 13.4772 20.4829L14.084 18.4236C15.0745 15.0624 17.1357 12.5495 19.4669 11.5291L19.649 11.4494C19.8652 11.3547 20.0036 11.1394 19.9998 10.9034C19.9961 10.6673 19.8511 10.4566 19.632 10.3687Z" fill="#F9F9F9"/>
                <path d="M0.498716 6.75232L0.590044 6.79225C1.68001 7.26936 2.65423 8.46232 3.12657 10.0652L3.43091 11.0981C3.50434 11.3473 3.73313 11.5184 3.99298 11.5184C4.25274 11.5184 4.48157 11.3473 4.55505 11.0981L4.85942 10.0653C5.33177 8.46232 6.30595 7.26936 7.39591 6.79229L7.48728 6.75232C7.70357 6.65768 7.84192 6.44244 7.83821 6.20635C7.83454 5.97029 7.6895 5.75951 7.47036 5.67166C6.34892 5.22209 5.31731 3.97104 4.84169 2.32498L4.55591 1.33588C4.48341 1.08518 4.25391 0.912598 3.99294 0.912598C3.73196 0.912598 3.50243 1.08521 3.43001 1.33592L3.1443 2.32498C2.66868 3.97104 1.63708 5.22209 0.51563 5.67166C0.296489 5.75951 0.151489 5.97033 0.147778 6.20635C0.144067 6.44244 0.282426 6.65768 0.498716 6.75232Z" fill="#F9F9F9"/>
                <path d="M7.78505 15.8618C7.17126 15.6157 6.51481 14.92 6.24916 14.0007L6.08194 13.4218C6.02102 13.2109 5.82793 13.0657 5.60839 13.0657C5.38888 13.0657 5.1958 13.2109 5.13487 13.4218L4.96758 14.0007C4.70197 14.92 4.17693 15.6157 3.56317 15.8618C3.37882 15.9357 3.25681 16.113 3.25372 16.3116C3.2506 16.5102 3.36699 16.6912 3.54897 16.7709L3.60237 16.7942C4.19083 17.0518 4.69741 17.7325 4.95743 18.6148L5.13556 19.2193C5.19737 19.429 5.3898 19.5729 5.60839 19.5729C5.82698 19.5729 6.01941 19.429 6.08122 19.2193L6.25935 18.6148C6.51934 17.7324 7.15736 17.0519 7.74578 16.7943L7.79925 16.7709C7.98123 16.6913 8.09762 16.5102 8.0945 16.3116C8.09144 16.113 7.96943 15.9357 7.78505 15.8618Z" fill="#F9F9F9"/>
              </svg>
            </span>
            Lottery
          </a>
        </li>
        <li>
          <a href="/milligo" className={location === '/milligo' ? 'active text-blue-primary bg-gray-lightbox': 'text-gray-primary' }>
            <span>
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='special' d="M5.70908 15.0679C5.40069 14.7664 5.28455 14.9179 5.21596 14.9851C3.44009 16.7222 1.8635 20.9137 2.69698 20.5043C5.43062 19.675 6.23671 19.4577 8.01252 17.7207C8.08117 17.6536 8.23904 17.5429 7.92167 17.2323L5.70908 15.0679Z" stroke="#F9F9F9" strokeWidth="1.25"/>
                <path className='special' d="M16.1961 14.1623C16.1163 13.9085 16.2836 13.7862 16.354 13.7103C20.2437 9.51695 22.7158 3.93011 20.8839 2.1007C19.0615 0.281156 13.6391 2.82177 9.44077 6.67782C9.35772 6.75421 9.19401 6.89887 8.90114 6.83781L7.59311 6.52679C7.22994 6.44055 6.71679 6.58551 6.45281 6.8491L1.65323 11.6416C1.38925 11.9053 1.47501 12.1683 1.84384 12.2261L5.31522 12.7709C5.68405 12.8288 6.20177 12.6605 6.46569 12.3968C6.46569 12.3968 6.6448 12.2175 6.82476 12.3971C7.8176 13.3884 9.66256 15.2307 10.6085 16.1752C10.7965 16.3629 10.6164 16.5415 10.6164 16.5415C10.3524 16.8051 10.1838 17.322 10.2419 17.6903L10.7873 21.1566C10.8453 21.525 11.1087 21.6106 11.3727 21.347L16.1723 16.5543C16.4363 16.2907 16.5815 15.7785 16.495 15.4158L16.1961 14.1623ZM15.1216 7.97061C14.3086 7.15885 14.3086 5.84287 15.1216 5.03124C15.9344 4.21948 17.2523 4.21948 18.0653 5.03124C18.8782 5.84281 18.8782 7.15885 18.0653 7.97055C17.2523 8.7823 15.9344 8.7823 15.1216 7.97061Z" stroke="#F9F9F9" stroke-width="1.25"/>
              </svg>
            </span>
            MILLIGO
          </a>
          </li>
        <li className=' relative'>
          <a href="/nft-ticket" className={location === '/nft-ticket' ? 'active text-blue-primary bg-gray-lightbox': 'text-gray-primary' }>
            <span>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.954132 13.682L2.08373 14.8116C2.32333 15.0466 2.63422 15.1955 2.96759 15.2348C3.30095 15.274 3.63791 15.2015 3.92557 15.0285C4.21121 14.8656 4.54245 14.8011 4.86832 14.8449C5.19419 14.8887 5.49664 15.0384 5.72914 15.2709C5.96163 15.5034 6.1113 15.8059 6.1551 16.1317C6.19891 16.4576 6.13443 16.7888 5.97158 17.0745C5.79859 17.3621 5.72602 17.6991 5.76528 18.0325C5.80454 18.3658 5.9534 18.6767 6.18849 18.9163L7.31809 20.0459C7.74005 20.4679 8.31235 20.7049 8.90908 20.7049C9.50582 20.7049 10.0781 20.4679 10.5001 20.0459L12.6214 17.9246L10.5001 15.8033C10.3594 15.6626 10.2804 15.4719 10.2804 15.2729C10.2804 15.074 10.3594 14.8833 10.5001 14.7426C10.6407 14.602 10.8315 14.5229 11.0304 14.5229C11.2293 14.5229 11.4201 14.602 11.5607 14.7426L13.6821 16.8639L18.9854 11.5606C19.6875 10.8568 20.0818 9.90318 20.0818 8.90898C20.0818 7.91478 19.6875 6.96117 18.9854 6.25733L18.9164 6.18839C18.6768 5.9533 18.3659 5.80444 18.0326 5.76518C17.6992 5.72592 17.3622 5.79848 17.0746 5.97148C16.7889 6.13433 16.4577 6.19881 16.1318 6.155C15.806 6.11119 15.5035 5.96153 15.271 5.72903C15.0385 5.49653 14.8888 5.19408 14.845 4.86821C14.8012 4.54235 14.8657 4.21111 15.0286 3.92547C15.2016 3.63781 15.2741 3.30085 15.2349 2.96748C15.1956 2.63412 15.0467 2.32323 14.8117 2.08363L14.7427 2.01469C14.0389 1.31253 13.0853 0.918198 12.0911 0.918198C11.0969 0.918198 10.1433 1.31253 9.43941 2.01469L4.13611 7.31799L6.25743 9.43931C6.39809 9.57996 6.4771 9.77073 6.4771 9.96964C6.4771 10.1686 6.39809 10.3593 6.25743 10.5C6.11678 10.6406 5.92601 10.7196 5.7271 10.7196C5.52819 10.7196 5.33743 10.6406 5.19677 10.5L3.07545 8.37865L0.954132 10.5C0.532175 10.9219 0.295122 11.4942 0.295122 12.091C0.295122 12.6877 0.532175 13.26 0.954132 13.682ZM8.37875 11.5606L9.43941 12.6213C9.58007 12.7619 9.65908 12.9527 9.65908 13.1516C9.65908 13.3505 9.58007 13.5413 9.43941 13.6819C9.29876 13.8226 9.108 13.9016 8.90908 13.9016C8.71017 13.9016 8.51941 13.8226 8.37875 13.6819L7.31809 12.6213C7.17744 12.4806 7.09842 12.2899 7.09842 12.091C7.09842 11.892 7.17744 11.7013 7.31809 11.5606C7.45875 11.42 7.64951 11.341 7.84842 11.341C8.04734 11.341 8.2381 11.42 8.37875 11.5606V11.5606Z" fill="#f9f9f9"/>
              </svg>
            </span>
            NFT Ticket
          </a>
        </li>
      </ul>
      <footer className='bg-gray-box'>
        <div className='px-3/100'>
          <div className='max-w-1200 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 py-8 md:py-14'>
              <div className='col-span-1 mb-5 md:mb-0'>
                <p className='text-pink-secondary font-bold mb-2 md:mb-6 text-14 md:text-16'>Platform</p>
                <ul>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://forms.gle/ERJc45o4btDsoerT6" className='text-blue-primary transition-all hover:opacity-70' target={`_blank`}>Apply for IGO</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://docs.millionsy.io/lottery/how-to-play " className='transition-all hover:opacity-70' target={`_blank`}>How to buy ticket</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://docs.millionsy.io" className='transition-all hover:opacity-70' target={`_blank`}>Documents</a></li>
                  <li><a href="https://www.millionsy.io/whitepaper/" className='transition-all hover:opacity-70' target={`_blank`}>Whitepaper</a></li>
                </ul>
              </div>
              <div className='col-span-1 mb-5 md:mb-0'>
                <p className='text-pink-secondary font-bold mb-2 md:mb-6 text-14 md:text-16'>Token</p>
                <ul>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://solscan.io/token/HDLRMKW1FDz2q5Zg778CZx26UgrtnqpUDkNNJHhmVUFr" className='transition-all hover:opacity-70' target={`_blank`}>Token contract</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://docs.millionsy.io/tokenomic/milli" className='transition-all hover:opacity-70' target={`_blank`}>Tokenomics</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://www.coingecko.com/en/coins/millionsy" className='transition-all hover:opacity-70' target={`_blank`}>Coingecko</a></li>
                  <li><a href="https://coinmarketcap.com/currencies/millionsy/" className='transition-all hover:opacity-70' target={`_blank`}>CoinMarketCap</a></li>
                </ul>
              </div>
              <div className='col-span-1 mb-5 md:mb-0'>
                <p className='text-pink-secondary font-bold mb-2 md:mb-6 text-14 md:text-16'>Social</p>
                <ul>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://twitter.com/MILLIONSYio" className='transition-all hover:opacity-70' target={`_blank`}>Twitter</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://t.me/MILLIONSYio" className='transition-all hover:opacity-70' target={`_blank`}>Telegram</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://t.me/MILLIONSYchannel" className='transition-all hover:opacity-70' target={`_blank`}>Medium</a></li>
                  <li><a href="http://millionsyio.medium.com" className='transition-all hover:opacity-70' target={`_blank`}>Telegram Channel</a></li>
                </ul>
              </div>
              <div className='col-span-1'>
                <p className='text-pink-secondary font-bold mb-2 md:mb-6 text-14 md:text-16'>Animation</p>
                <ul>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://www.youtube.com/c/MILLIONSYio" className='transition-all hover:opacity-70' target={`_blank`}>Youtube</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="https://www.instagram.com/millionsyio/" className='transition-all hover:opacity-70' target={`_blank`}>Instagram</a></li>
                  <li className='mb-2.5 md:mb-3.5'><a href="http://www.tiktok.com/@millionsyio" className='transition-all hover:opacity-70' target={`_blank`}>Tiktok</a></li>
                  <li><a href="https://t.me/addstickers/MILLIONSY" className='transition-all hover:opacity-70' target={`_blank`}>Sticker</a></li>
                </ul>
              </div>
            </div>
            <p className='h-px bg-gray-boxline opacity-50'></p>
            <div className='pt-4 pb-8 md:py-16'>
              <p className='font-bungee text-blue-primary text-36 md:text-56 mb-1 md:mb-5 leading-8'><a href="/">Millionsy</a></p>
              <p className='text-bodybox-sp md:text-bodybox-pc text-gray-body opacity-50'>Ver 2.1. Copyright 2021 | MILLIONSY Limited</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer