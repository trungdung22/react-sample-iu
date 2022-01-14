import React, { useState } from 'react';
import All from './all';
import Jackpots from './jackpots';
import Yours from './yours';
import Detail from './detail';
import useStyles from './styles';
type Props = {
  playerData: any
  dataGiveFromFinished: (getDataFinished: any) => void
}
const FinishedSection: React.FC<Props> = ({playerData, dataGiveFromFinished}) => {
  const [component, setComponent] = useState('all');
  const [dataBackYour, setDataBackYour] = useState(false);
  const [dataYours, setDataYours] = useState(0);
  const classes = useStyles();
  const handleSetComponent = (item: string) => {
    try {
      setComponent(item);
    } finally {
      handerRenderComponent(component);
    }
  }
  
  const dataGiveFromYours = (getDataFromYours: any) => {
    setDataYours(getDataFromYours)
    setDataBackYour(false)
  }

  const dataGiveAll = (getDataAll: any) => {
    if (getDataAll.back_your) {
      setDataBackYour(getDataAll.back_your);
    } else {
      dataGiveFromFinished(getDataAll);
    }
  }

  const handerRenderComponent = (item: string) => {
    switch (component) {
      case 'jackpots':
        return (<Jackpots></Jackpots>);
      case 'yours':
        return (<Yours playerData={playerData} dataGiveFromYours={dataGiveFromYours}></Yours>);
      case 'detail': 
        return (<Detail dataSendToDetail={dataYours} dataGiveDetail={dataGiveAll}></Detail>);
      default:
        return (<All dataSendToAll={0} dataGiveAll={dataGiveAll}></All>)
    }
  }

  return (
    <div className={`${classes.root} px-3/100 py-16 md:pb-20 md:pt-10`}>
      <div className='max-w-700 mx-auto'>
        <h3 className='font-bungee text-center text-20 md:text-32 text-pink-D47DFF mb-6 md:mb-12 uppercase'>Millionsy airboard</h3>
        <div className='rounded-10 bg-gray-151515 overflow-hidden border border-solid border-gray-575757-50'>
          <ul className='flex justify-center font-semibold text-white bg-gray-575757-30 py-3 md:py-4'>
            <li className={`rounded-5 cursor-pointer w-20 flex justify-center items-center h-32px md:h-34px md:w-92 text-center transition-all ${component === 'jackpots' ? 'bg-pink-8C24BF' : 'hover:bg-gray-575757-50'}`} onClick={() =>{
              setDataYours(0)
              setDataBackYour(false)
              handleSetComponent('jackpots')
            }}>Jackpots</li>
            <li className={`rounded-5 cursor-pointer w-20 flex justify-center items-center h-32px md:h-34px md:w-92 text-center transition-all mx-1 ${component === 'all' ? 'bg-pink-8C24BF' : 'hover:bg-gray-575757-50'}`} onClick={() => {
              setDataYours(0)
              setDataBackYour(false)
              handleSetComponent('all')
            }}>All History</li>
            <li className={`rounded-5 cursor-pointer w-20 flex justify-center items-center h-32px md:h-34px md:w-92 text-center transition-all ${component === 'yours' ? 'bg-pink-8C24BF' : 'hover:bg-gray-575757-50'}`} onClick={() => {
              setDataYours(0)
              setDataBackYour(false)
              handleSetComponent('yours')
            }}>Yours</li>
          </ul>
          {dataYours !== 0 && dataBackYour === false ? (<Detail dataSendToDetail={dataYours} dataGiveDetail={dataGiveAll}></Detail>) : (handerRenderComponent('detail'))}
        </div>
      </div>
    </div>
  )
}

export default FinishedSection