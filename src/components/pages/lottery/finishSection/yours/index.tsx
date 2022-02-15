import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { HOST_NAME } from 'data/constants';
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import ContentLoader from 'react-content-loader';

type Props = {
  playerData: any,
  dataGiveFromYours: (getDataFromYours: any) => void,
}
const Yours: React.FC<Props> = ({playerData, dataGiveFromYours}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    items: [],
    isLoading: true,
    currGameNo: 0, 
    loadAll: false
  });
  
  const [error, setError] = useState('');
  const [stateItem, setStateItem] = useState(0);

  const loadMore = () => {
    if (playerData.publicKey !== undefined && playerData.publicKey !== '') {
      setData({ ...data, isLoading: true});
      fetch(`${HOST_NAME}/api/game-history/${playerData.publicKey}?currGameNo=${data.currGameNo}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(
          res => {
            res.results.map(item => {
              if (item.player_tickets.length > 0) {
                setStateItem(stateItem + 1);
              }
            })
            setData({
              items: [...data.items, ...res.results], 
              currGameNo: res.currGameNo,
              isLoading: false,
              loadAll: res.results.length > 0 ? false : true 
            })
          },
          error => {
            setError(error.toString());
            setData({ ...data, isLoading: false});
          }
      )
    }
  }

  useEffect(()=>{
    loadMore();
  }, [])
  

  const handleRenderRoundItems = (el: any) => {
    // if (el.player_tickets.length > 0) {
      const date = new Date(el.updatedAt);
      const formatTime = (time: number) => {
        return time < 10 ?  '0' + time : time;
      }
      return (
        <li key={el.id} onClick={() => dataGiveFromYours(el)} className='font-semibold flex items-center relative cursor-pointer transition-all hover:opacity-70 py-1 md:py-2'>
          <p className='font-medium text-center w-12 flex-shrink-0 md:w-14 mr-4 sm:mr-12 md:mr-16'>{el.game_no}</p>
          <p className='w-28 md:w-52 mr-8 md:mr-16'>
            <span className='block md:inline-block w-full md:w-28 mr-8'>{`${formatTime(date.getDate())} thg ${date.getMonth() + 1}, ${date.getFullYear()}`}</span>
          </p>
          <p>
            <span className='font-bold text-12 md:text-16 text-center w-14 md:w-28 inline-block'>{el.player_tickets.length}</span>
            <span className='inline-block absolute top-0.5 md:top-2 right-1 w-3.5 md:w-auto'>
              <svg className='max-w-full' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" stroke="#EBEBEB"/>
                <path d="M8.16699 13.9834L11.592 10.5584C11.7472 10.4022 11.8343 10.191 11.8343 9.97088C11.8343 9.75073 11.7472 9.53952 11.592 9.38338L8.25866 6.05005" stroke="#EBEBEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel"/>
              </svg>
            </span>
          </p>
        </li>
      )
    // }
  }
  
  return (
    <>
      {
        playerData.is_connect ?
        <div className='p-3.5 md:px-8 md:py-4'>
          {
            data.items.length > 0 ? (
              // stateItem > 0 ? 
              <div className=''>
                <ul className='flex items-center'>
                  <li className='text-14 md:text-16 text-pink-secondary font-bold uppercase leading-none md:leading-normal w-12 md:w-14 mr-4 sm:mr-12 md:mr-16'>Round</li>
                  <li className='text-14 md:text-16 text-pink-secondary font-bold uppercase leading-none md:leading-normal w-28 md:w-52 mr-8 md:mr-16'>Date</li>
                  <li className='text-14 md:text-16 text-pink-secondary font-bold uppercase leading-none md:leading-normal text-center md:text-left'>Your<br className='block md:hidden'/> tickets</li>
                </ul>
                
                  <ul className='h-64 md:h-72 overflow-y-auto overflow-x-hidden'>
                    <InfiniteScroll
                      throttle={100}
                      threshold={30}
                      isLoading={data.isLoading}
                      hasMore={!data.loadAll}
                      onLoadMore={loadMore}
                    >
                      {data.items.map(item => (handleRenderRoundItems(item)))}
                    </InfiniteScroll>
                  </ul>
              </div>
              // : <p className='text-gray-primary text-center'>You have no recorded history.</p>
            ) : (
              <ContentLoader
                viewBox="0 0 700 312"
                backgroundColor="#293333"
                foregroundColor="#575757"
              >
                <rect x="0" y="32" rx="4" ry="4" width="180" height="20" />
                <rect x="265" y="32" rx="4" ry="4" width="180" height="20" />
                <rect x="520" y="32" rx="4" ry="4" width="180" height="20" />
                <rect x="0" y="72" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="112" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="152" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="192" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="232" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="272" rx="4" ry="4" width="700" height="20" />
                <rect x="0" y="312" rx="4" ry="4" width="700" height="20" />
              </ContentLoader>
            )
          }
        </div>
        :
        <p className='text-gray-primary text-center p-3.5'>Connect wallet first.</p>
      }
    </>
    
  )
}

export default Yours