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
      <ul className={`${classes.footerSticky}`}>
        <li>
          <a href="/lottery" className={location === '/lottery' ? 'active ': '' }>
            <span>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.632 10.3687C18.4578 9.89803 17.1893 9.01628 16.2591 7.8187C15.3104 6.59718 14.5458 5.04069 14.0479 3.31741L13.478 1.34534C13.4056 1.09464 13.1761 0.922058 12.9151 0.922058C12.6541 0.922058 12.4247 1.09464 12.3522 1.34534L11.7824 3.31741C11.2845 5.04069 10.5198 6.59725 9.57114 7.8187C8.64098 9.01628 7.52872 9.89803 6.3545 10.3687C6.13536 10.4566 5.99036 10.6674 5.98665 10.9034C5.98293 11.1395 6.12125 11.3548 6.33754 11.4494L6.51969 11.5291C8.85079 12.5495 10.7558 15.0624 11.7463 18.4237L12.353 20.4829C12.4265 20.7321 12.6553 20.9032 12.9151 20.9032C13.175 20.9032 13.4037 20.7321 13.4772 20.4829L14.084 18.4236C15.0745 15.0624 17.1357 12.5495 19.4669 11.5291L19.649 11.4494C19.8652 11.3547 20.0036 11.1394 19.9998 10.9034C19.9961 10.6673 19.8511 10.4566 19.632 10.3687Z" fill="#D1D1D1"/>
                <path d="M0.498716 6.75232L0.590044 6.79225C1.68001 7.26936 2.65423 8.46232 3.12657 10.0652L3.43091 11.0981C3.50434 11.3473 3.73313 11.5184 3.99298 11.5184C4.25274 11.5184 4.48157 11.3473 4.55505 11.0981L4.85942 10.0653C5.33177 8.46232 6.30595 7.26936 7.39591 6.79229L7.48728 6.75232C7.70357 6.65768 7.84192 6.44244 7.83821 6.20635C7.83454 5.97029 7.6895 5.75951 7.47036 5.67166C6.34892 5.22209 5.31731 3.97104 4.84169 2.32498L4.55591 1.33588C4.48341 1.08518 4.25391 0.912598 3.99294 0.912598C3.73196 0.912598 3.50243 1.08521 3.43001 1.33592L3.1443 2.32498C2.66868 3.97104 1.63708 5.22209 0.51563 5.67166C0.296489 5.75951 0.151489 5.97033 0.147778 6.20635C0.144067 6.44244 0.282426 6.65768 0.498716 6.75232Z" fill="#D1D1D1"/>
                <path d="M7.78505 15.8618C7.17126 15.6157 6.51481 14.92 6.24916 14.0007L6.08194 13.4218C6.02102 13.2109 5.82793 13.0657 5.60839 13.0657C5.38888 13.0657 5.1958 13.2109 5.13487 13.4218L4.96758 14.0007C4.70197 14.92 4.17693 15.6157 3.56317 15.8618C3.37882 15.9357 3.25681 16.113 3.25372 16.3116C3.2506 16.5102 3.36699 16.6912 3.54897 16.7709L3.60237 16.7942C4.19083 17.0518 4.69741 17.7325 4.95743 18.6148L5.13556 19.2193C5.19737 19.429 5.3898 19.5729 5.60839 19.5729C5.82698 19.5729 6.01941 19.429 6.08122 19.2193L6.25935 18.6148C6.51934 17.7324 7.15736 17.0519 7.74578 16.7943L7.79925 16.7709C7.98123 16.6913 8.09762 16.5102 8.0945 16.3116C8.09144 16.113 7.96943 15.9357 7.78505 15.8618Z" fill="#D1D1D1"/>
              </svg>
            </span>
            Lottery
          </a>
        </li>
        <li>
          <a href="/milligo" className={location === '/milligo' ? 'active ': '' }>
            <span>
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.70908 14.4805C5.40069 14.179 5.28455 14.3305 5.21596 14.3977C3.44009 16.1348 1.8635 20.3263 2.69698 19.9169C5.43062 19.0876 6.23671 18.8703 8.01252 17.1333C8.08117 17.0661 8.23904 16.9555 7.92167 16.6449L5.70908 14.4805Z" stroke="#D1D1D1" strokeWidth="1.25"/>
                <path d="M16.1961 13.5749C16.1163 13.3211 16.2836 13.1988 16.354 13.1229C20.2437 8.92954 22.7158 3.34271 20.8839 1.5133C19.0615 -0.306246 13.6391 2.23437 9.44077 6.09042C9.35772 6.16681 9.19401 6.31146 8.90114 6.2504L7.59311 5.93939C7.22994 5.85315 6.71679 5.99811 6.45281 6.2617L1.65323 11.0542C1.38925 11.3179 1.47501 11.5809 1.84384 11.6387L5.31522 12.1835C5.68405 12.2414 6.20177 12.0731 6.46569 11.8094C6.46569 11.8094 6.6448 11.6301 6.82476 11.8097C7.8176 12.801 9.66256 14.6432 10.6085 15.5878C10.7965 15.7755 10.6164 15.9541 10.6164 15.9541C10.3524 16.2177 10.1838 16.7346 10.2419 17.1029L10.7873 20.5692C10.8453 20.9376 11.1087 21.0232 11.3727 20.7596L16.1723 15.9669C16.4363 15.7033 16.5815 15.191 16.495 14.8284L16.1961 13.5749ZM15.1216 7.3832C14.3086 6.57145 14.3086 5.25547 15.1216 4.44384C15.9344 3.63208 17.2523 3.63208 18.0653 4.44384C18.8782 5.25541 18.8782 6.57145 18.0653 7.38314C17.2523 8.1949 15.9344 8.1949 15.1216 7.3832Z" stroke="#D1D1D1" strokeWidth="1.25"/>
              </svg>
            </span>
            MILLIGO
          </a>
          </li>
        <li className=' relative'>
          <a href="/nft-ticket" className={location === '/nft-ticket' ? 'active ': '' }
            onClick={(e) => e.preventDefault()}
          >
            <span>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4854 5.66994L19.4164 5.601C19.1768 5.36591 18.8659 5.21705 18.5326 5.17779C18.1992 5.13853 17.8622 5.2111 17.5746 5.38409C17.2889 5.54694 16.9577 5.61142 16.6318 5.56761C16.306 5.52381 16.0035 5.37414 15.771 5.14164C15.5385 4.90915 15.3888 4.6067 15.345 4.28083C15.3012 3.95496 15.3657 3.62372 15.5286 3.33808C15.7016 3.05042 15.7741 2.71346 15.7349 2.38009C15.6956 2.04673 15.5467 1.73584 15.3117 1.49624L15.2427 1.4273C14.5389 0.72514 13.5853 0.330811 12.5911 0.330811C11.5969 0.330811 10.6433 0.72514 9.93941 1.4273L1.45413 9.91258C1.03218 10.3345 0.795122 10.9068 0.795122 11.5036C0.795122 12.1003 1.03217 12.6726 1.45413 13.0946L2.58373 14.2242C2.82333 14.4593 3.13422 14.6081 3.46759 14.6474C3.80095 14.6866 4.13791 14.6141 4.42557 14.4411C4.71121 14.2782 5.04245 14.2137 5.36832 14.2576C5.69419 14.3014 5.99664 14.451 6.22914 14.6835C6.46163 14.916 6.6113 15.2185 6.6551 15.5443C6.69891 15.8702 6.63443 16.2014 6.47158 16.4871C6.29859 16.7747 6.22602 17.1117 6.26528 17.4451C6.30454 17.7784 6.4534 18.0893 6.68849 18.3289L7.81809 19.4585C8.24005 19.8805 8.81235 20.1175 9.40908 20.1175C10.0058 20.1175 10.5781 19.8805 11.0001 19.4585L19.4854 10.9732C20.1875 10.2694 20.5818 9.31579 20.5818 8.32159C20.5818 7.32739 20.1875 6.37379 19.4854 5.66994V5.66994ZM8.87875 18.3979L7.77567 17.228C8.10113 16.6534 8.22792 15.9874 8.13637 15.3335C8.04481 14.6795 7.74004 14.074 7.26929 13.6108C6.79855 13.1477 6.18816 12.8528 5.53276 12.772C4.87737 12.6911 4.2136 12.8287 3.6444 13.1635L2.51479 12.0339C2.37414 11.8933 2.29512 11.7025 2.29512 11.5036C2.29512 11.3047 2.37414 11.1139 2.51479 10.9732L4.63611 8.85192L5.69677 9.91258C5.83743 10.0532 6.02819 10.1323 6.2271 10.1323C6.42601 10.1323 6.61678 10.0532 6.75743 9.91258C6.89809 9.77193 6.9771 9.58116 6.9771 9.38225C6.9771 9.18334 6.89809 8.99257 6.75743 8.85192L5.69677 7.79126L11.0001 2.48796C11.422 2.066 11.9943 1.82895 12.5911 1.82895C13.1878 1.82895 13.7601 2.066 14.1821 2.48796L14.2245 2.59721C13.9014 3.16872 13.7742 3.83025 13.8623 4.48082C13.9504 5.13139 14.2489 5.73527 14.7124 6.20027C15.1869 6.66675 15.8008 6.96547 16.4606 7.05095C17.1205 7.13644 17.7903 7.00403 18.3679 6.67386L18.4247 6.7306C18.8467 7.15256 19.0837 7.72485 19.0837 8.32159C19.0837 8.91833 18.8467 9.49062 18.4247 9.91258L13.1214 15.2159L12.0607 14.1552C11.9201 14.0146 11.7293 13.9356 11.5304 13.9356C11.3315 13.9356 11.1407 14.0146 11.0001 14.1552C10.8594 14.2959 10.7804 14.4866 10.7804 14.6856C10.7804 14.8845 10.8594 15.0752 11.0001 15.2159L12.0607 16.2765L9.93941 18.3979C9.79876 18.5385 9.608 18.6175 9.40908 18.6175C9.21017 18.6175 9.01941 18.5385 8.87875 18.3979Z" fill="#D1D1D1"/>
                <path d="M9.93938 12.0339L8.87872 10.9733C8.73807 10.8326 8.5473 10.7536 8.34839 10.7536C8.14947 10.7536 7.95871 10.8326 7.81806 10.9733C7.6774 11.1139 7.59838 11.3047 7.59838 11.5036C7.59838 11.7025 7.6774 11.8933 7.81805 12.0339L8.87871 13.0946C9.01936 13.2352 9.21013 13.3143 9.40904 13.3143C9.60795 13.3143 9.79872 13.2352 9.93937 13.0946C10.08 12.9539 10.159 12.7632 10.159 12.5642C10.159 12.3653 10.08 12.1746 9.93938 12.0339Z" fill="#D1D1D1"/>
              </svg>
            </span>
            NFT Ticket
          </a>
        </li>
      </ul>
      <footer className='bg-gray-151515'>
        <div className='px-3/100'>
          <div className='max-w-1200 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 py-6 md:py-14'>
              <div className='col-span-1 mb-2 md:mb-0'>
                <p className='text-pink-D47DFF font-bold mb-1 md:mb-4 text-16 md:text-18'>Platform</p>
                <ul>
                  <li className='mb-1'><a href="https://forms.gle/ERJc45o4btDsoerT6" className='text-14 text-blue-17F0FF hover:underline'>Apply for IGO</a></li>
                  <li className='mb-1'><a href="https://docs.millionsy.io/lottery/how-to-play " className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>How to buy ticket</a></li>
                  <li className='mb-1'><a href="https://docs.millionsy.io" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Documents</a></li>
                  <li className='mb-1'><a href="https://www.millionsy.io/whitepaper/" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Whitepaper</a></li>
                </ul>
              </div>
              <div className='col-span-1 mb-2 md:mb-0'>
                <p className='text-pink-D47DFF font-bold mb-1 md:mb-4 text-16 md:text-18'>Token</p>
                <ul>
                  <li className='mb-1'><a href="https://solscan.io/token/HDLRMKW1FDz2q5Zg778CZx26UgrtnqpUDkNNJHhmVUFr" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Token contract</a></li>
                  <li className='mb-1'><a href="https://docs.millionsy.io/tokenomic/milli" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Tokenomics</a></li>
                  <li className='mb-1'><a href="https://www.coingecko.com/en/coins/millionsy" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Coingecko</a></li>
                  <li className='mb-1'><a href="https://coinmarketcap.com/currencies/millionsy/" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>CoinMarketCap</a></li>
                </ul>
              </div>
              <div className='col-span-1 mb-2 md:mb-0'>
                <p className='text-pink-D47DFF font-bold mb-1 md:mb-4 text-16 md:text-18'>Social</p>
                <ul>
                  <li className='mb-1'><a href="https://twitter.com/MILLIONSYio" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Twitter</a></li>
                  <li className='mb-1'><a href="https://t.me/MILLIONSYio" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Telegram</a></li>
                  <li className='mb-1'><a href="https://t.me/MILLIONSYchannel" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Medium</a></li>
                  <li className='mb-1'><a href="http://millionsyio.medium.com" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Telegram Channel</a></li>
                </ul>
              </div>
              <div className='col-span-1'>
                <p className='text-pink-D47DFF font-bold mb-1 md:mb-4 text-16 md:text-18'>Animation</p>
                <ul>
                  <li className='mb-1'><a href="https://www.youtube.com/c/MILLIONSYio" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Youtube</a></li>
                  <li className='mb-1'><a href="https://www.instagram.com/millionsyio/" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Instagram</a></li>
                  <li className='mb-1'><a href="http://www.tiktok.com/@millionsyio" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Tiktok</a></li>
                  <li className='mb-1'><a href="https://t.me/addstickers/MILLIONSY" className='text-14 text-gray-A9A9A9 hover:text-white hover:underline'>Sticker</a></li>
                </ul>
              </div>
            </div>
            <p className='h-px bg-gray-575757-50'></p>
            <div className='py-6 md:pt-20 md:pb-16'>
              <p className='font-bungee text-blue-17F0FF text-36 md:text-56 mb-1 md:mb-6 leading-8'><a href="/">Millionsy</a></p>
              <p className='text-10 md:text-12 text-gray-F9F9F9-50'>Copyright 2021 | MILLIONSY Limited</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer