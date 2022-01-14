import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Second from './Second/indext';
import Third from './Third/indext';
import Four from './Four/indext';
import Five from './Five/indext';
import ViewTicket from './viewTicket/indext'; 
import ConnectWallet from './ConnectWallet/indext';
import ViewYour from './viewYour/indext';
import ViewSubmit from './ViewSubmit';

type Props = {
  dataModal: any,
  playerData: any,
  dataGiveFromModal: (getDataModalTolottery: any) => void,
  dataGiveFromWallet: (getDataWalletTolottery: any) => void,
}

const ModalContent: React.FC<Props> = ({dataModal, playerData, dataGiveFromModal, dataGiveFromWallet}) => {
  const classes = useStyles();
  const [dataSendLottery, setDataSendLottery] = useState({
    data: {
      is_connect: playerData.is_connect,
      show: false,
      first: false,
      second: false,
      third: false,
      four: false,
      five: false,
      submit: false,
      flag_submit: false,
      view_ticket: false,
      next_round: {
        next_id: -1,
        your_ticket: []
      },
      view_your: false,
      your_ticket: [],
    }
  });

  const [dataWalletSendLottery, setDataWalletSendLottery] = useState({
    data: {
      is_connect: false,
      adapter_type: '',
      publicKey: '',
      lamportUnit: 0,
      balanceUSDT: 0,
      balanceSOL: 0,
    }
  });

  const [dataTicketModal, setDataTicketModal] = useState({
    data: {
    }
  })

  const dataGiveSecond = (getDataSecond: any) => {
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: false,
        second: false,
        third: getDataSecond.third,
        four: false,
        five: getDataSecond.five,
        submit: false,
        flag_submit: getDataSecond.five,
        view_ticket: false,
        view_your: false,
        your_ticket: getDataSecond.tickets,
      }
    })
    
    setDataTicketModal({
      data: {
        ...dataTicketModal.data,
        ticketCount: getDataSecond.ticketCount,
        price: getDataSecond.price,
        unit: getDataSecond.unit,
        tickets: getDataSecond.tickets
      }
    })
  }
  const dataGiveThird = (getDataThird: any) => {
    let flag_submit = getDataThird.five; 
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: false,
        second: getDataThird.second,
        third: false,
        four: getDataThird.four,
        five: getDataThird.five,
        submit: false,
        flag_submit: flag_submit,
        view_ticket: false,
        view_your: false,
        your_ticket: getDataThird.tickets,
      }
    })
    
    setDataTicketModal({
      data: {
        ...dataTicketModal.data,
        tickets: getDataThird.tickets,
        ticketChanges: getDataThird.ticketChanges
      }
    })
  }
  const dataGiveFour = (getDataFour: any) => {
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: false,
        second: false,
        third: true,
        four: false,
        five: false,
        submit: false,
        flag_submit: false,
        view_ticket: false,
        view_your: false,
        your_ticket: [],
      }
    })
    setDataTicketModal({
      data: {
        ...dataTicketModal.data,
        tickets: getDataFour.tickets,
        ticketChanges: getDataFour.ticketChanges
      }
    })
  }
  
  const dataGiveFive = (getDataFive: any) => {
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: false,
        second: false,
        third: getDataFive.third,
        four: false,
        five: false,
        submit: getDataFive.submit,
        flag_submit: getDataFive.flag_submit,
        view_ticket: false,
        view_your: false,
        your_ticket: getDataFive.tickets,
      }
    })
  }
  const dataGiveViewTicket = (getDataViewTicket: boolean) => {
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: getDataViewTicket,
        second: false,
        third: false,
        four: false,
        five: false,
        submit: false,
        flag_submit: false,
        view_ticket: false,
        view_your: false,
        your_ticket: [],
      }
    })
  }

  const dataGiveWallet = (data: any) => {
    setDataWalletSendLottery({
        data: {
          ...dataWalletSendLottery.data,
          is_connect: data.is_connect, 
          publicKey: data.publicKey,
          adapter_type: data.adapter_type
        }
      }
    )
  }
  
  const handleClosedModal = () => {
    dataGiveFromModal({
      show: false,
      first: false,
      second: false,
      third: false,
      four: false,
      five: false,
      submit: false,
      flag_submit: false,
      view_ticket: false,
      is_connect: dataModal.is_connect,
      next_round: {
        next_id: -1,
        your_ticket: []
      },
      view_your: false,
      your_ticket: [],
    })
  }

  const handleClosedPurchaseStep = () => {
    setDataSendLottery({
      data: {
        next_round: {
          next_id: -1,
          your_ticket: []
        },
        is_connect: dataModal.is_connect,
        show: true,
        first: false,
        second: true,
        third: false,
        four: false,
        five: false,
        submit: false,
        flag_submit: false,
        view_ticket: false,
        view_your: false,
        your_ticket: [],
      }
    })
  }

  useEffect(() => {
    dataGiveFromModal(dataSendLottery.data);
  }, [dataSendLottery])
  
  useEffect(() => {
    dataGiveFromWallet(dataWalletSendLottery.data);
  }, [dataWalletSendLottery])
  

  return (
    <>
      {/* { window.sessionStorage.getItem('show_connect') === 'true' && !playerData.is_connect &&
        <div className='fixed top-0 left-0 z-1000 bg-gray-400 h-full w-full'>
          <p className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2.5 text-16 font-bold text-gray-750 rounded-5 text-center bg-white max-w-320'>
            Connecting
            <span className='inline-block ml-3'>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93287 13.779C3.63991 14.0737 3.16493 14.0737 2.87197 13.779L0.219719 11.1116C-0.0732398 10.8169 -0.0732398 10.3392 0.219719 10.0446L2.87197 7.3771C3.16493 7.08246 3.63991 7.08246 3.93287 7.3771C4.22583 7.67174 4.22583 8.14945 3.93287 8.44409L2.56205 9.82277H12.3763C12.7906 9.82277 13.1265 9.48498 13.1265 9.0683V8.50882C13.1265 8.09214 13.4624 7.75435 13.8767 7.75435C14.291 7.75435 14.6268 8.09214 14.6268 8.50882V9.0683C14.6268 10.3183 13.6192 11.3317 12.3763 11.3317H2.56042L3.93287 12.712C4.22583 13.0067 4.22583 13.4844 3.93287 13.779Z" fill="#999999"/>
                <path d="M11.0671 6.6229C11.3601 6.91754 11.8351 6.91754 12.128 6.6229L14.7803 3.95543C15.0732 3.66079 15.0732 3.18309 14.7803 2.88845L12.128 0.22098C11.8351 -0.0736599 11.3601 -0.0736599 11.0671 0.22098C10.7742 0.515621 10.7742 0.993327 11.0671 1.28797L12.4415 2.67025H2.62413C1.38121 2.67025 0.373619 3.68361 0.373619 4.93366V5.49093C0.373619 5.90761 0.709481 6.2454 1.12379 6.2454C1.5381 6.2454 1.87396 5.90761 1.87396 5.49093V4.93366C1.87396 4.51698 2.20982 4.17919 2.62413 4.17919H12.436L11.0671 5.55591C10.7742 5.85055 10.7742 6.32826 11.0671 6.6229Z" fill="#999999"/>
              </svg>
            </span>
          </p>
        </div>
      } */}
      {dataModal.show && !dataModal.submit ? (
        <div className={`${classes.root}`}>
          <div className={`${classes.backgroundModal}`} onClick={() => handleClosedModal()}></div>
          <div className={`${classes.content}`}>
            <div className={`${classes.header} ${dataModal.view_your && playerData.is_connect ? 'hasID' : ''}`}>
              {dataModal.first && playerData.is_connect ? (<p className="title">Buy tickets</p>) : ''}
              {dataModal.second && playerData.is_connect ? (<p className="title">Buy Tickets</p>) : ''}
              {dataModal.third && playerData.is_connect ? (
                <p className="title">
                  <span 
                    className='inline-block mr-2 cursor-pointer'
                    onClick={() => handleClosedPurchaseStep()}
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7249 5H1.6416" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                      <path d="M4.94174 1.0166L1.51674 4.4416C1.36153 4.59774 1.27441 4.80895 1.27441 5.0291C1.27441 5.24926 1.36153 5.46047 1.51674 5.6166L4.85008 8.94994" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.four && playerData.is_connect ? (
                <p className="title">
                  <span
                    className='inline-block mr-2 cursor-pointer'
                    onClick={() => handleClosedPurchaseStep()}
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7249 5H1.6416" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                      <path d="M4.94174 1.0166L1.51674 4.4416C1.36153 4.59774 1.27441 4.80895 1.27441 5.0291C1.27441 5.24926 1.36153 5.46047 1.51674 5.6166L4.85008 8.94994" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.five && playerData.is_connect ? (
                <p className="title">
                  <span
                    className='inline-block mr-2 cursor-pointer'
                    onClick={() => handleClosedPurchaseStep()}
                  >
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7249 5H1.6416" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                      <path d="M4.94174 1.0166L1.51674 4.4416C1.36153 4.59774 1.27441 4.80895 1.27441 5.0291C1.27441 5.24926 1.36153 5.46047 1.51674 5.6166L4.85008 8.94994" stroke="#F9F9F9" strokeLinecap="round" strokeLinejoin="bevel"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.view_ticket && playerData.is_connect ? (
                <p className="title">Your tickets this round</p>
              ) : ''}
              {dataModal.view_your && playerData.is_connect ? (
                <p className="title">
                  Round
                  <span>#{dataModal.your_ticket.game_no}</span>
                </p>
              ) : ''}
              {!playerData.is_connect ? (
                <p className="title">Connect Wallet</p>
              ) : ''}
              <p className="close p-4 pr-0" onClick={() => handleClosedModal()}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.80474 1.13807C8.06509 0.877722 8.06509 0.455612 7.80474 0.195262C7.54439 -0.0650874 7.12228 -0.0650874 6.86193 0.195262L4 3.05719L1.13807 0.195263C0.877722 -0.0650867 0.455612 -0.0650867 0.195262 0.195263C-0.0650874 0.455612 -0.0650874 0.877722 0.195262 1.13807L3.05719 4L0.195262 6.86193C-0.0650874 7.12228 -0.0650874 7.54439 0.195262 7.80474C0.455612 8.06509 0.877722 8.06509 1.13807 7.80474L4 4.94281L6.86193 7.80474C7.12228 8.06509 7.54439 8.06509 7.80474 7.80474C8.06509 7.54439 8.06509 7.12228 7.80474 6.86193L4.94281 4L7.80474 1.13807Z" fill="#F9F9F9"/>
                </svg>
              </p>
            </div>
            {dataModal.first && playerData.is_connect ? (<Second dataGiveSecond={dataGiveSecond} dataSendSecond={dataTicketModal} playerData={playerData}></Second>) : ''}
            {dataModal.second && playerData.is_connect ? (<Second dataGiveSecond={dataGiveSecond} dataSendSecond={dataTicketModal} playerData={playerData}></Second>) : ''}
            {dataModal.third && playerData.is_connect ? (<Third dataGiveThird={dataGiveThird} dataSendThird={dataTicketModal}></Third>) : ''}
            {dataModal.four && playerData.is_connect ? (<Four dataGiveFour={dataGiveFour} dataSendFour={dataTicketModal}></Four>) : ''}
            {dataModal.five && playerData.is_connect ? (<Five dataGiveFive={dataGiveFive} dataSendFive={dataTicketModal}></Five>) : ''}
            {dataModal.view_ticket && playerData.is_connect ? (<ViewTicket dataGiveViewTicket={dataGiveViewTicket} dataSendViewTicket={dataModal}></ViewTicket>) : ''}
            {dataModal.view_your && playerData.is_connect ? (<ViewYour dataSendViewYour={dataModal}></ViewYour>) : ''}
            {!playerData.is_connect ? (<ConnectWallet dataGiveWallet={dataGiveWallet}></ConnectWallet>) : ''}
          </div>
        </div>
      ) : (
        dataModal.show && dataModal.submit ? (
          <div className={`${classes.root}`}>
            <div className={`${classes.backgroundModal}`} onClick={() => handleClosedModal()}></div>
            <div className={`${classes.content} ${dataModal.flag_submit ? 'success' : 'error'}`}>
              <div className={`${classes.closeSubmit}`} onClick={() => handleClosedModal()}>
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.3736 1.70711C12.7641 1.31658 12.7641 0.683417 12.3736 0.292893C11.9831 -0.0976311 11.3499 -0.0976311 10.9594 0.292893L6.6665 4.58579L2.37361 0.292894C1.98309 -0.0976301 1.34992 -0.0976301 0.959397 0.292894C0.568873 0.683419 0.568873 1.31658 0.959397 1.70711L5.25229 6L0.959397 10.2929C0.568873 10.6834 0.568873 11.3166 0.959397 11.7071C1.34992 12.0976 1.98309 12.0976 2.37361 11.7071L6.6665 7.41421L10.9594 11.7071C11.3499 12.0976 11.9831 12.0976 12.3736 11.7071C12.7641 11.3166 12.7641 10.6834 12.3736 10.2929L8.08072 6L12.3736 1.70711Z" fill="white"/>
                </svg>
              </div>
              <ViewSubmit dataSendViewSubmit={dataModal.flag_submit}></ViewSubmit>
            </div>
          </div>
        ) : ''
      )}
    </>
  )
}

export default ModalContent