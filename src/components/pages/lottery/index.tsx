import React, { useState, useEffect } from 'react';
import FinishedSection from './finishSection';
import GetSection from './getSection';
import NextSection from './nextSection';
import PartySection from './partySection';
import ModalContent from 'components/astoms/modalSection';
import useStyles from './styles';
import { isConnect } from 'data/db';
import Star from 'components/astoms/star';
import Header from 'components/astoms/header';
import Footer from 'components/astoms/footer';
import { getGameBoardInfo, fetchPlayerAccount, insertBulkTicket, updateMiliPadPlayer } from 'lib/utilities/utils';
import { buyBulkTicket, buyMilliPad } from 'lib/program/lottery-commands';
import { HOST_NAME } from 'data/constants';

const Lottery: React.FC = () => {
  const classes = useStyles();
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [dataModal, setDataModal] = useState({
    data: {
      is_connect: isConnect,
      show: false,
      first: false,
      second: false,
      third: false,
      four: false,
      view_ticket: false,
      view_your: false,
      submit: false,
      flag_submit: false,
      your_ticket: [],
      history_round: {
        id: -1, 
        your_ticket: []
      },
      next_round: {
        next_id: -1,
        your_ticket: []
      },
    }
  });

  

  const [playerData, setPlayerData] = useState({
    data: {
      is_connect: false,
      adapter_type: '',
      publicKey: '',
      lamportUnit: 0,
      balanceUSDT: 0,
      balanceSOL: 0,
    }
  });

  const [nextPartyData, setNextPartyData] = useState({
    data: {
      view_ticket: false,
      get_ticket: false,
      next_id: 0,
      created_time: new Date(),
      closed_time : new Date(),
      your_tickets: [],
    }
  })

  const [partyData, setPartyData] = useState({
    data: {
      programId: '',
      ownerPubkey: '',
      gameStatus: '',
      gamePubkey: '',
      gameBalanceSol: '',
      gameBalanceUSDT: '',
      gameRollNums: [],
    }
  });

  const fetchNextGame = () => {
    fetch(`${HOST_NAME}/api/next-game-info/${playerData.data.publicKey}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(async response => {
        const response_data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (response_data && response_data.message) || response.statusText;
          return Promise.reject(error);
        }
        const created_time_response = new Date(response_data.result.created_time);
        const created_time_response_custom = `${monthName[created_time_response.getMonth()]} ${created_time_response.getDate()}, ${created_time_response.getFullYear()} 09:00:00`;
        const round_no = response_data.result.round_no; 
        const your_tickets = response_data.result.your_tickets;
        const created_time = new Date(created_time_response_custom);
        const closed_time = new Date(created_time.getTime() + 24 * 60 * 60 * 1000);
        setNextPartyData({
          data: {
            view_ticket: nextPartyData.data.view_ticket,
            get_ticket: nextPartyData.data.get_ticket,
            next_id: round_no,
            created_time: created_time,
            closed_time: closed_time,
            your_tickets: your_tickets
          }
        });
      })
  }

  useEffect(() => {
    fetchNextGame()
  }, []);

  useEffect(() => {
    fetchNextGame()
  }, [playerData.data]);

  useEffect(() => {

    if (window.sessionStorage.getItem("data_connect") === "true") {
      setDataModal({
        data: {
          ...dataModal.data,
          is_connect: true,
        }
      }) 
  
      fetchPlayerAccount(
        window.sessionStorage.getItem("publicKey"),
        window.sessionStorage.getItem("adapter_type")
      ).then(item => setPlayerData({
        data: {
          adapter_type: window.sessionStorage.getItem("adapter_type"),
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: window.sessionStorage.getItem("publicKey"),
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
    }
    getGameBoardInfo().then(item => setPartyData({
      data: {
        ...partyData.data,
        programId: item.programId,
        ownerPubkey: item.ownerPubkey,
        gameStatus: item.gameStatus,
        gamePubkey: item.gamePubkey,
        gameBalanceSol: item.gameBalanceSOL,
        gameBalanceUSDT: item.gameBalanceUSDT,
        gameRollNums: item.gameRollNums
      }
    }));
  }, [])

  const sendDataPartyToLottery = (getDataPartyTolottery: boolean) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        first: getDataPartyTolottery,
      }
    })
  }
  const sendDataNextToLottery = (getDataNextTolottery: any) => {
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        view_ticket: getDataNextTolottery.view_ticket,
        first: getDataNextTolottery.get_ticket,
        next_round: getDataNextTolottery.next_round,
      }
    })
  }
  const dataGiveFromFinished = (getDataFinished: any) => {
    
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
        view_your: getDataFinished.view_your,
        your_ticket: getDataFinished.your_ticket,
        history_round: {
          id: getDataFinished.game_no, 
          your_ticket: getDataFinished.your_ticket
        }
      }
    })
  }

  const dataGiveFromHeader = (getDataHeader: any) => {
    if (getDataHeader.disconnect) {
      setPlayerData({
        data: {
          is_connect: false,
          adapter_type: '',
          publicKey: '',
          lamportUnit: 0,
          balanceUSDT: 0,
          balanceSOL: 0,
        }
      })
    }
    if (getDataHeader !== undefined && getDataHeader.data.publicKey !== '' && getDataHeader.data.publicKey !== undefined) {
      fetchPlayerAccount(
        getDataHeader.data.publicKey,
        getDataHeader.data.adapter_type
      ).then(item => {
        setPlayerData({
          data: {
            is_connect: getDataHeader.data.is_connect,
            adapter_type: getDataHeader.data.adapter_type,
            lamportUnit: item.lamportUnit,
            publicKey: getDataHeader.data.publicKey,
            balanceUSDT: item.balanceUSDT,
            balanceSOL: item.balanceSOL,
          }
        })
      });
    }
  }

  const dataGiveFromWallet = (getDataWallet: any) => {
    
    if (getDataWallet.is_connect) {
      fetchPlayerAccount(
        getDataWallet.publicKey,
        getDataWallet.adapter_type
      ).then(item => setPlayerData({
        data: {
          adapter_type: getDataWallet.adapter_type,
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: getDataWallet.publicKey,
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
      resetModalData();
    } 
  }

  const resetModalData = () => {
    setDataModal({
      data: {
        is_connect: dataModal.data.is_connect,
        show: false,
        first: false,
        second: false,
        third: false,
        four: false,
        view_ticket: false,
        view_your: false,
        submit: false,
        flag_submit: false,
        your_ticket: [],
        history_round: {
          id: -1, 
          your_ticket: []
        },
        next_round: {
          next_id: -1,
          your_ticket: []
        },
      }
    })
  }

  const dataGiveFromModal = (getDataModalTolottery: any) => {
    setDataModal({
      data: getDataModalTolottery,
    })
    if (getDataModalTolottery.flag_submit && getDataModalTolottery.your_ticket.length > 0) {
      buyBulkTicket(partyData.data.programId,
        getDataModalTolottery.your_ticket,
        partyData.data.gamePubkey,
        partyData.data.ownerPubkey,
        playerData.data.adapter_type)
        .then(async results => {
          resetModalData();
          try {
            await insertBulkTicket(partyData.data.gamePubkey, playerData.data.publicKey, results);
            
            setDataModal({
              data: {
                ...dataModal.data,
                show: true,
                flag_submit: true, 
                submit: true
              }
            })
            fetchNextGame();
          } catch (error) {
            setDataModal({
              data: {
                ...dataModal.data,
                show: true,
                submit: true,
                flag_submit: false
              }
            })
          }
          
        }).catch(error => {
          
          resetModalData();
          setDataModal({
            data: {
              ...dataModal.data,
              show: true,
              submit: true,
              flag_submit: false
            }
          })
          console.log(error)
        });
    }
  }

  useEffect(() => {
    if(dataModal.data.show) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [dataModal])

  return (
    <>
      <Header playerData={playerData.data} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <PartySection partyData={partyData.data} playerData={playerData.data} sendDataPartyToLottery={sendDataPartyToLottery}></PartySection>
        <NextSection playerData={playerData.data} nextData={nextPartyData.data} sendDataNextToLottery={sendDataNextToLottery}></NextSection>
        <FinishedSection playerData={playerData.data} dataGiveFromFinished={dataGiveFromFinished}></FinishedSection>
        <GetSection></GetSection>
        <ModalContent dataModal={dataModal.data} playerData={playerData.data}
          dataGiveFromModal={dataGiveFromModal} dataGiveFromWallet={dataGiveFromWallet}></ModalContent>
      </div>
      <Footer></Footer>
    </>

  )
}

export default Lottery