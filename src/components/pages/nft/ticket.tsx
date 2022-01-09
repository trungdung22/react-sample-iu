import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useStyles from './styles';
import { useWindowSize } from 'data/constants';
import { NFTTypes, deserializeNFTTicket, MILLI_NFT_ACCOUNT_DATA_LAYOUT } from '../../../lib/program/state';
import { CLUSTERS, getConnection } from '../../../lib/program/connection';
import { Commitment, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { format2digitNumber } from 'lib/utilities/format';

interface MilliNFTAccountDataLayout {
  status: String;
  nft_type: String;
  milli_nft_pubkey: String;
  user_pubkey: String;
  mint_pubkey: String;
  token_account_pubkey: String;
  amount: Uint8Array;
  level: Uint8Array;
  num_one: String;
  num_two: String;
  num_three: String;
  num_four: String;
  num_five: String;
  num_six: String;
  price: Number;
}

type Props = {
  nftAccountPubkey: any,
  swipableView: (value: any) => void,
  isShowPopupDesktop: (isShown: boolean) => void,
  emitTicketData: (ticketNumber: any) => void,
}

const Ticket: React.FC<Props> = ({
  nftAccountPubkey,
  swipableView,
  isShowPopupDesktop,
  emitTicketData
}) => {
  const [isLoaded, settIsLoaded] = useState(false);

  const [ticketNumber, setTicketNumber] = useState('######');
  const [nftData, setNftData] = useState<MilliNFTAccountDataLayout>();

  const size = useWindowSize();
  const COMMITMENT: Commitment = "singleGossip";

  const connection = new Connection('https://api.devnet.solana.com',
    COMMITMENT
  );

  useEffect(() => {
    connection.getAccountInfo(
      new PublicKey(nftAccountPubkey)
    ).then(res => {
      setTicketNumber('#');
      let nftInfo = {} as MilliNFTAccountDataLayout;
      const nftDecodedInfo = deserializeNFTTicket(res);
      
      nftInfo.milli_nft_pubkey = nftAccountPubkey;
      nftInfo.price = nftDecodedInfo.price;
      nftInfo.status = nftDecodedInfo.status;

      nftInfo.token_account_pubkey = nftDecodedInfo.token_account_pubkey;
      nftInfo.mint_pubkey = nftDecodedInfo.mint_pubkey;
      nftInfo.user_pubkey = nftDecodedInfo.user_pubkey

      nftInfo.num_one = format2digitNumber(nftDecodedInfo.num_one);
      nftInfo.num_two = format2digitNumber(nftDecodedInfo.num_two);
      nftInfo.num_three = format2digitNumber(nftDecodedInfo.num_three);

      setTicketNumber(prevNumber => prevNumber + nftInfo.num_one + nftInfo.num_two);

      nftInfo.num_four = format2digitNumber(nftDecodedInfo.num_four);
      nftInfo.num_five = format2digitNumber(nftDecodedInfo.num_five);
      nftInfo.num_six = format2digitNumber(nftDecodedInfo.num_six);
      switch (nftDecodedInfo.nft_type) {
        case NFTTypes[0]:
          setTicketNumber(prevNumber => prevNumber + nftInfo.num_three);
          break;
        case NFTTypes[1]:
          setTicketNumber(prevNumber => prevNumber + nftInfo.num_four);
          break;
        case NFTTypes[2]:
          setTicketNumber(prevNumber => prevNumber + nftInfo.num_five);
          break;
        case NFTTypes[3]:
          setTicketNumber(prevNumber => prevNumber + nftInfo.num_six);
          break;
      }

      setNftData(nftInfo);
      settIsLoaded(true);
    }).catch(err => {
      console.log("Could not find nft ticket info!");
      console.log(err);
    });
  }, [])

  const cardOnClickHandler = () => {
    if (!isLoaded)
      return;
    if (size.width < 768) {
      swipableView(1);
    } else {
      isShowPopupDesktop(true);
    }

    emitTicketData({
      ticketNumber: ticketNumber,
      token_account_pubkey: nftData.token_account_pubkey,
      mint_pubkey: nftData.mint_pubkey,
      user_pubkey: nftData.user_pubkey,
      milli_nft_pubkey: nftData.milli_nft_pubkey,
      price: nftData.price,
      status: nftData.status,
    });
  }

  return (
    <>
      <div className='col-span-1 bg-gray-151515 text-gray-EBEBEB rounded-5 md:rounded-10 border border-solid border-blue-0B7880 p-1 md:p-2 md:cursor-pointer'
        onClick={cardOnClickHandler}
      >
        <p className='bg-no-repeat bg-center bg-cover h-24 md:h-184 rounded-5 md:rounded-10' style={{ 'backgroundImage': 'url("/assets/nft/under_popup.png")' }}></p>
        <div className='mt-1 md:mt-4'>
          <p className='text-16 md:text-24 text-blue-17F0FF font-bungee leading-6 md:mb-3'>{ticketNumber}
          </p>
          <p className='text-8 md:text-12'>
            <span className='font-bold block md:inline-block mr-1'>
              Lottery:
            </span>Lifetime drawing with match 4 &amp; 3.
          </p>
          <p className='text-8 md:text-12'>
            <span className='font-bold uppercase block md:inline-block mr-1'>
              MILLIGO:
            </span>
            4 slots for every IGO round.
          </p>
          <p className='w-full h-px bg-gray-A9A9A9 opacity-50 mt-2 md:mt-8'></p>
          <p className='flex justify-between items-center font-bold text-14 md:text-18 text-pink-D47DFF pt-1 md:pt-2'>
            <span className='text-10 md:text-14 font-normal'>
              ~50$
            </span>
            <span>0.27 MILLI</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Ticket