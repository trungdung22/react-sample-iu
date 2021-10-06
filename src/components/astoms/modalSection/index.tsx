import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import First from './First/indext';
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
      publicKey: '',
      is_connect: false,
    }
  });

  const [dataTicketModal, setDataTicketModal] = useState({
    data: {
    }
  })

  const dataGiveFirst = (getDataFirst: any) => {
    debugger
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
    
    setDataTicketModal({
      data: {
        ...dataTicketModal.data,
        ticketCount: getDataFirst.ticketCount,
        price: getDataFirst.price,
        unit: getDataFirst.unit,
        tickets: getDataFirst.tickets,
      }
    })
  }
  const dataGiveSecond = (getDataSecond: any) => {
    debugger
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
    debugger
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
    debugger
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
    debugger
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
    debugger
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
    debugger
    setDataWalletSendLottery({
        data: {
          is_connect: data.is_connect, 
          publicKey: data.publicKey
        }
      }
    )
  }
  
  useEffect(() => {
    dataGiveFromModal(dataSendLottery.data);
  }, [dataSendLottery])
  
  useEffect(() => {
    dataGiveFromWallet(dataWalletSendLottery.data);
  }, [dataWalletSendLottery])

  return (
    <>
      {dataModal.show && !dataModal.submit ? (
        <div className={`${classes.root}`}>
          <div className={`${classes.backgroundModal}`} onClick={() => dataGiveFromModal({
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
          })}></div>
          <div className={`${classes.content}`}>
            <div className={`${classes.header} ${(dataModal.view_ticket || dataModal.view_your) && playerData.is_connect ? 'hasID' : ''}`}>
              {dataModal.first && playerData.is_connect ? (<p className="title">Buy Tickets</p>) : ''}
              {dataModal.second && playerData.is_connect ? (<p className="title">Buy Tickets</p>) : ''}
              {dataModal.third && playerData.is_connect ? (
                <p className="title">
                  <span 
                    onClick={() => setDataSendLottery({
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
                    })}
                  >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F4E0FF"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.four && playerData.is_connect ? (
                <p className="title">
                  <span 
                    onClick={() => setDataSendLottery({
                      data: {
                        next_round: {
                          next_id: -1,
                          your_ticket: []
                        },
                        is_connect: playerData.is_connect,
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
                    })}
                  >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F4E0FF"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.five && playerData.is_connect ? (
                <p className="title">
                  <span 
                    onClick={() => setDataSendLottery({
                      data: {
                        next_round: {
                          next_id: -1,
                          your_ticket: []
                        },
                        is_connect: playerData.is_connect,
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
                    })}
                  >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z" fill="#F4E0FF"/>
                    </svg>
                  </span>
                  Edit numbers
                </p>
              ) : ''}
              {dataModal.view_ticket && playerData.is_connect ? (
                <p className="title">
                  Round
                  <span>#15</span>
                </p>
              ) : ''}
              {dataModal.view_your && playerData.is_connect ? (
                <p className="title">
                  Round
                  <span>#15</span>
                </p>
              ) : ''}
              {!playerData.is_connect ? (
                <p className="title">Connect Wallet</p>
              ) : ''}
              <p className="close" onClick={() => dataGiveFromModal({
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
              })}><img src="assets/common/icon_close.svg" alt="close"/></p>
            </div>
            {dataModal.first && playerData.is_connect ? (<First dataGiveFirst={dataGiveFirst} playerData={playerData}></First>) : ''}
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
            <div className={`${classes.backgroundModal}`} onClick={() => dataGiveFromModal({
              show: false,
              first: false,
              second: false,
              third: false,
              four: false,
              five: false,
              submit: false,
              flag_submit: false,
              view_ticket: false,
              is_connect: playerData.is_connect,
              next_round: {
                next_id: -1,
                your_ticket: []
              },
              view_your: false,
              your_ticket: [],
            })}></div>
            <div className={`${classes.content} ${dataModal.flag_submit ? '' : 'error'}`}>
              <div className={`${classes.closeSubmit}`} onClick={() => dataGiveFromModal({
                show: false,
                first: false,
                second: false,
                third: false,
                four: false,
                five: false,
                submit: false,
                flag_submit: false,
                view_ticket: false,
                is_connect: playerData.is_connect,
                next_round: {
                  next_id: -1,
                  your_ticket: []
                },
                view_your: false,
                your_ticket: [],
              })}>
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