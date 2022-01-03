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
    console.log(el);
    
    if (el.player_tickets.length > 0) {
      const date = new Date(el.updatedAt);
      const formatTime = (time: number) => {
        return time < 10 ?  '0' + time : time;
      }
      return (
        <li key={el.id} onClick={() => dataGiveFromYours(el)}>
          <p>{el.game_no}</p>
          <p>
            <span>{`${formatTime(date.getDate())} thg ${date.getMonth() + 1}, ${date.getFullYear()}`}</span>
            <span>{`${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`}</span>
          </p>
          <p>
            <span>{el.player_tickets.length}</span>
            <span><img src="/assets/common/icon_arrow_circle.svg" alt="arrow circle" /></span>
          </p>
        </li>
      )
    }
  }
  
  return (
    <div className={`${classes.root} relative`}>
      <p className='absolute -top-5 md:-top-6 left-0 w-24 md:w-auto'><img src="./assets/lottery/sky_02.svg" alt="" /></p>
      {
        data.items.length > 0 ? (
          <>
            <div className={`${classes.header}`}>
              <p className="title">Round</p>
            </div>
            <div className={`${classes.body}`}>
              <ul className="listLabel">
                <li>#</li>
                <li>Date</li>
                <li>Your<br className="sp-768"/> tickets</li>
              </ul>
              {
                stateItem > 0 ? 
                <ul className="listRound">
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
                : <p className='text-14 md:text-16 lg:text-18 text-pink-50'>You don't have any ticket.</p>
              }
              
            </div>
          </>
        ) : (
          <ContentLoader
            viewBox="0 0 700 312"
            backgroundColor="#fff"
            foregroundColor="#dcdcdc"
          >
            <rect x="32" y="32" rx="4" ry="4" width="180" height="20" />
            <rect x="32" y="72" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="112" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="152" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="192" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="232" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="272" rx="4" ry="4" width="642" height="20" />
            <rect x="32" y="312" rx="4" ry="4" width="642" height="20" />
          </ContentLoader>
        )
      }
      
    </div>
  )
}

export default Yours