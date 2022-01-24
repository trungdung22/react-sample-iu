import { HOST_NAME } from 'data/constants';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
type Props = {
  dataSendViewTicket: any,
  dataGiveViewTicket: (getDataViewTicket: boolean) => void,
}
const ViewTicket: React.FC<Props> = ({ dataSendViewTicket, dataGiveViewTicket }) => {
  const classes = useStyles();
  const [showTooltipConnect, setShowTooltipConnect] = useState(false);
  const [tickets, setTickets] = useState(dataSendViewTicket.next_round.your_ticket)

  const ticketsLottery = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  const ticketsNFT = [
    // [2, 2, 2],
    // [2, 2, 2, 2],
    // [2, 2, 2, 2, 2],
    // [2, 2, 2, 2, 2, 2],
  ];

  const [nftTickets, setNftTickets] = useState([])

  const [activeLabel, setActiveLabel] = useState('lottery');

  useEffect(() => {
    if (!dataSendViewTicket.is_connect)
      return;

    const userPubkey = window.sessionStorage.getItem('publicKey');
    fetch(`${HOST_NAME}/api/nft-ticket?isSole=true&user_pubkey=${userPubkey}`)
      .then(async res => {
        let data = await res.json();
        if (!res.ok) {
          const error = (data && data.message) || res.statusText;
          return Promise.reject(error);
        }
        let nfts = data.items.map(el => el.roll_nums);
        setNftTickets(nfts)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const [dataRender, setDataRender] = useState(tickets);

  const handleRenderTicket = (data: any) => {
    if (data.length > 0 && window.sessionStorage.getItem('data_connect') === 'true') {
      return (
        data.map((el: [], index: number) => (
          <dl key={index}>
            <dt className='text-body-sp md:text-body-pc'>#{index < 9 ? `00${index + 1}` : `0${index + 1}`}</dt>
            <dd>
              <ul className='border border-solid border-blue-secondary bg-gray-lightbox'>
                {
                  el.map((item, index) => (
                    <li key={index} className='text-h3-sp md:text-h3-pc font-semibold text-gray-primary'>{item < 10 ? `0${item}` : item}</li>
                  ))
                }
              </ul>
            </dd>
          </dl>
        ))
      )
    }

    return (
      <p className='text-body-sp md:text-body-pc font-bold text-pink-secondary mt-2'>You have no ticket</p>
    )
  }

  return (
    <>
      <div className='p-4 pt-2'>
        <ul className='mb-2'>
          <li className={`cursor-pointer transition-all text-h3-sp md:text-h3-pc font-semibold rounded-5 w-115 md:w-32 inline-flex justify-center text-gray-primary items-center h-32px mr-4 ${activeLabel === 'lottery' ? 'bg-pink-primary' : 'hover:bg-gray-boxline hover:text-gray-body'}`}
            onClick={() => {
              setDataRender(tickets);
              setActiveLabel('lottery');
            }}
          >Lottery tickets</li>
          <li className={`cursor-pointer transition-all text-h3-sp md:text-h3-pc font-semibold rounded-5 w-90 md:w-100 inline-flex justify-center text-gray-primary items-center h-32px ${activeLabel === 'nft' ? 'bg-pink-primary' : 'hover:bg-gray-boxline hover:text-gray-body'}`}
            onClick={() => {
              setDataRender(nftTickets);
              setActiveLabel('nft');
            }}
          >NFT tickets</li>
        </ul>
        <div className={`${classes.listTickets}`} data-tickes='nft'>
          {handleRenderTicket(dataRender)}
        </div>
      </div>
      <div className='p-4 bg-gray-lightbox'>
        <div className='relative'>
          <p className='transition-all hover:opacity-70 text-center col-span-1 font-semibold text-button-sp md:text-button-pc cursor-pointer rounded-3 border border-solid text-gray-box bg-blue-primary w-28 h-32px flex justify-center items-center mx-auto'
            onClick={() => {
              if (window.sessionStorage.getItem('data_connect') === 'true') {
                dataGiveViewTicket(true)
              }
            }}
            onMouseLeave={() => {
              setShowTooltipConnect(false);
            }}
            onMouseEnter={() => {
              if (window.sessionStorage.getItem('data_connect') !== 'true') {
                setShowTooltipConnect(true);
              }
            }}
          >Buy ticket</p>
          {showTooltipConnect && <p className='absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 z-100 border border-solid border-pink-primary bg-gray-box rounded-5 text-center py-1 w-32 md:w-36 text-pink-primary font-medium'>Connect wallet first</p>}
        </div>
      </div>
    </>
  )
}

export default ViewTicket