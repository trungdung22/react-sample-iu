import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import { numberWithCommas} from '../../../../../lib/utilities/format';
import ContentLoader from 'react-content-loader';


type Props = {
  dataSendToAll: any,
  dataGiveAll: (getDataAll: any) => void
}
const All: React.FC<Props> = ({ dataSendToAll, dataGiveAll }) => {

  const [slide, setSlide] = useState(true);
  const [data, setData] = useState({
    id: 0,
    info: []
  });
  const classes = useStyles();
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatTime = (time: number) => {
    return time < 10 ? '0' + time : time;
  }
  const handleViewTicket = (event: React.MouseEvent) => {
    if (dataSendToAll.your_tickets.length > 0) {
      dataGiveAll({
        your_ticket: dataSendToAll,
        view_your: true,
      })
    }
  }

  // This object is used to test Match results below
  // const dataS = {
  //   "_id": "6171500ae9b59ad5b38f7f57",
  //   "status": "Completed",
  //   "game_no": 24,
  //   "total_pool": 51717680426,
  //   "owner_pubkey": "545r1f24HobBVA9WkVVtUToeH58BAcjUtFo6K9DfArRc",
  //   "game_pubkey": "HmxdbmR8byGaLqKD2YUtSZhtNhFryDNKnTC27PnAwZH4",
  //   "duration": 86400000,
  //   "roll_nums": [
  //       27,
  //       8,
  //       33,
  //       31,
  //       10,
  //       36
  //   ],
  //   "num_one": 27,
  //   "num_two": 8,
  //   "num_three": 33,
  //   "num_four": 31,
  //   "num_five": 10,
  //   "num_six": 36,
  //   "createdAt": "2021-10-21T11:33:30.294Z",
  //   "updatedAt": "2021-10-22T11:01:25.403Z",
  //   "__v": 0,
  //   "burn_pool": 0,
  //   "match_pool3": 1,
  //   "match_pool3_count": 0,
  //   "match_pool4": 0,
  //   "match_pool4_count": 0,
  //   "match_pool5": 0,
  //   "match_pool5_count": 0,
  //   "match_pool6": 0,
  //   "match_pool6_count": 0,
  //   "reward_type": "Uninitialized",
  //   "closed_date": "2021-10-22T11:01:24.381Z",
  //   "total_player": 0,
  //   "total_pool_usdt": "1.013e+4",
  //   "total_pool_sol": "51.72",
  //   "match_pool3_usdt": "0.000",
  //   "match_pool3_sol": "0.000",
  //   "match_pool4_usdt": "0.000",
  //   "match_pool4_sol": "0.000",
  //   "match_pool5_usdt": "0.000",
  //   "match_pool5_sol": "0.000",
  //   "match_pool6_usdt": "0.000",
  //   "match_pool6_sol": "0.000",
  //   "burn_pool_usdt": "0.000",
  //   "burn_pool_sol": "0.000",
  //   "id": "6171500ae9b59ad5b38f7f57"
  // }

  useEffect(() => {
    
    fetch(`${HOST_NAME}/api/game-history-all`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json();
        //data.results[0] = dataS;
        //console.log("data:",data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        
        setData({
          id: 0,
          info: JSON.parse(JSON.stringify(data.results))
        });
      })
  }, []);

  return (
    <div className=''>
      {
        data['info'].length > 0 ? (
          <>
            <div className='p-3.5 md:px-8 md:pt-3 md:pb-5'>
              <div className='flex justify-between'>
                <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-2.5'>Round</p>
                {
                  dataSendToAll === 0 ? (
                    <ul className='flex justify-end items-center'>
                      <li className='cursor-pointer transition-all hover:opacity-70' onClick={() => setData({ id: data['id'] === data['info'].length - 1 ? data['id'] : data['id'] + 1, info: data['info'] })}>
                        <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.646681 3.64645C0.45142 3.84171 0.45142 4.15829 0.646681 4.35356L3.82866 7.53554C4.02392 7.7308 4.34051 7.7308 4.53577 7.53554C4.73103 7.34027 4.73103 7.02369 4.53577 6.82843L1.70734 4L4.53577 1.17157C4.73103 0.976312 4.73103 0.65973 4.53577 0.464468C4.34051 0.269206 4.02392 0.269206 3.82866 0.464468L0.646681 3.64645ZM16.6719 3.5L1.00023 3.5L1.00023 4.5L16.6719 4.5L16.6719 3.5Z" fill="#f9f9f9"/>
                        </svg>
                      </li>
                      <li className='cursor-pointer transition-all hover:opacity-70 mx-4' onClick={() => setData({ id: data['id'] === 0 ? data['id'] : data['id'] - 1, info: data['info'] })}>
                        <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.6224 4.35355C16.8176 4.15829 16.8176 3.84171 16.6224 3.64645L13.4404 0.464466C13.2451 0.269204 12.9285 0.269204 12.7333 0.464466C12.538 0.659728 12.538 0.976311 12.7333 1.17157L15.5617 4L12.7333 6.82843C12.538 7.02369 12.538 7.34027 12.7333 7.53553C12.9285 7.7308 13.2451 7.7308 13.4404 7.53553L16.6224 4.35355ZM0.597168 4.5H16.2688V3.5H0.597168V4.5Z" fill="#f9f9f9"/>
                        </svg>
                      </li>
                      <li className='cursor-pointer transition-all hover:opacity-70' onClick={() => setData({ id: data['info'].length-(data['info'].length), info: data['info'] })}>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.7269 7.35355C16.9221 7.15829 16.9221 6.84171 16.7269 6.64645L13.5449 3.46447C13.3496 3.2692 13.033 3.2692 12.8378 3.46447C12.6425 3.65973 12.6425 3.97631 12.8378 4.17157L15.6662 7L12.8378 9.82843C12.6425 10.0237 12.6425 10.3403 12.8378 10.5355C13.033 10.7308 13.3496 10.7308 13.5449 10.5355L16.7269 7.35355ZM0.70166 7.5H16.3733V6.5H0.70166V7.5Z" fill="#F9F9F9"/>
                          <line x1="17.5" y1="0.5" x2="17.5" y2="13.5" stroke="#F9F9F9" strokeLinecap="round"/>
                        </svg>
                      </li>
                    </ul>
                  ) : ''
                }
              </div>
              <p className='bg-gray-lightbox text-right rounded-5 flex justify-between items-center pr-2.5'>
                <span className='text-h3-sp md:text-h3-pc font-bold text-gray-primary p-2 md:px-8 text-center bg-pink-primary rounded-5 inline-block'>{`#${data['info'][data.id]['game_no']}`}</span>
                {`${monthName[new Date(data['info'][data.id]['updatedAt']).getMonth()]} 
                ${new Date(data['info'][data.id]['updatedAt']).getDate()}, 
                ${new Date(data['info'][data.id]['updatedAt']).getFullYear()}, 11:00 AM`}
              </p>
            </div>
            <div className={`md:flex md:items-center justify-between p-3.5 md:px-8 md:py-5 border-t border-solid border-gray-boxline-50 ${slide ? 'border-b' : ''}`}>
              <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-0'>Winning Number</p>
              {
                data['info'][data.id]['roll_nums'].length > 0 ? (
                  <ul className='flex justify-between screen475:block'>
                  {
                    [...data['info'][data.id]['roll_nums']].map((element, index) => (
                        <li key={index} className={`w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full ${index < 5 ? 'screen475:mr-5' : ''}`}>
                          <p className='flex justify-center items-center w-full h-full text-h2-sp md:text-h2-pc font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>{element < 10 ? `0${element}` : element}</span></p>
                        </li>
                      )
                    )
                  }
                  </ul>
                ) : <strong>IN PROGRESS</strong>
              }
            </div>
            <div className={`slideToggle ${slide ? 'hidden' : 'block'}`}>
              <div className='bg-gray-lightbox p-3.5 md:px-8 md:pt-6 md:pb-4'>
                <div className='md:flex justify-between md:items-end mb-4'>
                  <p className='text-gray-primary text-h3-sp md:text-h3-pc font-bold mb-2 md:mb-0'>Prize pot</p>
                  <div className='flex justify-between md:w-3/5'>
                    <p className='text-28 md:text-h1-pc font-bungee text-blue-primary leading-none'>{`~$${numberWithCommas(data['info'][data.id]['total_pool_usdt'])}`}</p>
                    <p className='text-h2-pc font-bungee text-blue-primary relative top-0.5'>{Math.round(data['info'][data.id]['total_pool_sol'])} MILLI</p>
                  </div>
                </div>
                <p className='h-px opacity-50 bg-gray-575757 block md:hidden mb-4'></p>
                <ul className='flex flex-wrap justify-between'>
                  <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                    <p className='w-fit md:w-auto'>
                      <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 3</span>
                      <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{data['info'][data.id]['total_pool_sol']/100*8} MILLI</span>
                      <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{data['info'][data.id]['match_pool3_count']} Winners</span>
                    </p>
                  </li>
                  <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                    <p className='w-fit md:w-auto mx-auto md:mx-0'>
                      <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 4</span>
                      <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{data['info'][data.id]['total_pool_sol']/100*12} MILLI</span>
                      <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{data['info'][data.id]['match_pool4_count']} Winners</span>
                    </p>
                  </li>
                  <li className='text-center w-1/3 md:w-auto mb-4 md:mb-0'>
                    <p className='w-fit md:w-auto ml-auto md:ml-0'>
                      <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 5</span>
                      <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{data['info'][data.id]['total_pool_sol']/100*16} MILLI</span>
                      <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{data['info'][data.id]['match_pool5_count']} Winners</span>
                    </p>
                  </li>
                  <li className='text-center w-1/3 md:w-auto'>
                    <p className='w-fit md:w-auto'>
                      <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Match 6</span>
                      <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{data['info'][data.id]['total_pool_sol']/100*40} MILLI</span>
                      <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'>{data['info'][data.id]['match_pool6_count']} Winners</span>
                    </p>
                  </li>
                  <li className='text-center w-1/3 md:w-auto'>
                    <span className='text-gray-primary text-h3-sp md:text-h3-pc font-bold'>Burn</span>
                    <span className='text-h3-sp md:text-h3-pc font-bold text-blue-primary block leading-none md:mt-1.5 md:mb-0.5'>{data['info'][data.id]['total_pool_sol']/100*24} MILLI</span>
                    <span className='text-gray-primary text-bodybox-sp md:text-bodybox-pc'><br/></span>
                  </li>
                  <li className='w-1/3 flex items-center justify-end md:hidden'>
                    <p className='text-white text-bodybox-sp text-right leading-tight'>Total players <br />this round<span className='text-h3-sp font-bold block'>{data['info'][data.id]['total_player']}</span></p>
                  </li>
                </ul>
                <p className='text-white text-bodybox-pc text-right mt-2 hidden md:block'>Total players this round: <span className='text-h3-pc font-bold'>{data['info'][data.id]['total_player']}</span></p>
              </div>
            </div>
            <p className='text-gray-primary text-button-sp md:text-button-sp font-semibold flex justify-center items-center cursor-pointer py-3.5 transition-all hover:opacity-70' onClick={() => setSlide(!slide)}>
              {slide ? (
                <>
                  Detail
                  <span className='inline-block ml-1.5'>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.0166 1.16669L4.4416 4.59169C4.59774 4.7469 4.80895 4.83401 5.0291 4.83401C5.24926 4.83401 5.46047 4.7469 5.6166 4.59169L8.94994 1.25835" stroke="white" stroke-linecap="round" stroke-linejoin="bevel"/>
                    </svg>
                  </span>
                </>
              ) :
                <>
                  Hide
                  <span className='inline-block ml-1.5'>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.9834 4.83331L5.5584 1.40831C5.40226 1.2531 5.19105 1.16599 4.9709 1.16599C4.75074 1.16599 4.53953 1.2531 4.3834 1.40831L1.05006 4.74165" stroke="white" stroke-linecap="round" stroke-linejoin="bevel"/>
                    </svg>
                  </span>
                </>
              }
            </p>
          </>
        ) : (
          <ContentLoader
            viewBox="0 0 700 306"
            backgroundColor="#293333"
            foregroundColor="#575757"
          >
            <rect x="32" y="32" rx="4" ry="4" width="80" height="15" />
            <rect x="32" y="64" rx="4" ry="4" width="636" height="50" />
            <rect x="32" y="180" rx="4" ry="4" width="180" height="15" />
            <circle cx="265" cy="190" r="24" />
            <circle cx="345" cy="190" r="24" />
            <circle cx="425" cy="190" r="24" />
            <circle cx="500" cy="190" r="24" />
            <circle cx="575" cy="190" r="24" />
            <circle cx="645" cy="190" r="24" />
            <rect x="265" y="265" rx="4" ry="4" width="180" height="15" />
          </ContentLoader>
        )
      }
    </div>
  )
}

export default All