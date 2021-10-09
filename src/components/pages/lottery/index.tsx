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
import { getGameBoardInfo, fetchPlayerAccount, insertBulkTicket } from 'lib/utilities/utils';
import { buyBulkTicket } from 'lib/program/lottery-commands';
import { HOST_NAME } from 'data/constants';
import ViewSubmit from 'components/astoms/modalSection/ViewSubmit';

const Lottery: React.FC = () => {
  const classes = useStyles();
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
    fetch(`${HOST_NAME}/api/next-game-info/${playerData.data.publicKey}`)
      .then(async response => {
        const response_data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (response_data && response_data.message) || response.statusText;
          return Promise.reject(error);
        }
        const round_no = response_data.result.round_no; 
        const your_tickets = response_data.result.your_tickets;
        const created_time = new Date(response_data.result.created_time);
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
    debugger
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
    setDataModal({
      data: {
        ...dataModal.data,
        show: true,
      }
    })
    if (getDataHeader.getDataHeader !== undefined && getDataHeader.publicKey !== '') {
      fetchPlayerAccount(getDataHeader.publicKey).then(item => {
        setPlayerData({
          data: {
            is_connect: getDataHeader.is_connect,
            adapter_type: getDataHeader.adapter_type,
            lamportUnit: item.lamportUnit,
            publicKey: getDataHeader.publicKey,
            balanceUSDT: item.balanceUSDT,
            balanceSOL: item.balanceSOL,
          }
        })
      });
    }
  }

  const dataGiveFromWallet = (getDataWallet: any) => {
    debugger
    if (getDataWallet.is_connect) {
      fetchPlayerAccount(getDataWallet.publicKey).then(item => setPlayerData({
        data: {
          adapter_type: getDataWallet.adapter_type,
          is_connect: true,
          lamportUnit: item.lamportUnit,
          publicKey: getDataWallet.publicKey,
          balanceUSDT: item.balanceUSDT,
          balanceSOL: item.balanceSOL,
        }
      }));
      setDataModal({
        data: {
          ...dataModal.data,
          show: false,
        }
      })
    } 
  }

  const dataGiveFromModal = (getDataModalTolottery: any) => {
    setDataModal({
      data: getDataModalTolottery,
    })
    if (getDataModalTolottery.flag_submit && getDataModalTolottery.your_ticket.length > 0) {
      buyBulkTicket(partyData.data.programId,
        getDataModalTolottery.your_ticket,
        playerData.data.lamportUnit,
        partyData.data.gamePubkey,
        partyData.data.ownerPubkey,
        playerData.data.adapter_type)
        .then(async results => {
          setDataModal({
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
          insertBulkTicket(partyData.data.programId, playerData.data.publicKey, results);
          

          <ViewSubmit dataSendViewSubmit={true}></ViewSubmit>

        }).catch(error => {
          <ViewSubmit dataSendViewSubmit={false}></ViewSubmit>
          console.log(error)
        });
    }
  }


  return (
    <>
      <Star></Star>
      <Header playerData={playerData} dataGiveFromHeader={dataGiveFromHeader}></Header>
      <div className={`${classes.root}`}>
        <PartySection partyData={partyData.data} sendDataPartyToLottery={sendDataPartyToLottery}></PartySection>
        <NextSection playerData={nextPartyData.data} sendDataNextToLottery={sendDataNextToLottery}></NextSection>
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