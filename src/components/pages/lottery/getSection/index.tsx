import React from 'react';
import useStyles from './styles';
const GetSection: React.FC = () => {
  const classes = useStyles();
  const DataItemCards = [
    {
      title: 'Get the tickets',
      content: ['Every ticket equals to 2$ and can be bought with',<br className="sp-768"/>,' $SOL token. Price will be set when the round begins.'],
      has_arrow: false,
    },
    {
      title: 'Pick your card',
      content: ['Freely choose 6 different numbers from 1 to 45 (the',<br className="sp-768"/>,'order doesn\'t matter). You can select by yourself or',<br className="sp-768"/>,' let the machine choose randomly.'],
      has_arrow: false,
    },
    {
      title: 'Wait for the party',
      content: ['There is 1 draw every day, starts at 11am UTC and',<br className="sp-768"/>,' ends 5 minutes before the next round begins.'],
      has_arrow: false,
    },
    {
      title: 'Reward',
      content: ['Once the draw\'s out, come back to see if you\'re the',<br className="sp-768"/>,' lucky winner! The prize is automatically sent to the',<br className="sp-768"/>,' winner\'s wallet.'],
      has_arrow: false,
    },
    {
      title: 'Pop the champagne',
      content: ['Match all 6 digits from the winning numbers and you',<br className="sp-768"/>,' win the jackpot. Or just match at least 3 to win a',<br className="sp-768"/>,' SHARED PRIZE.'],
      has_arrow: true,
      link: 'https://docs.millionsy.io/lottery/how-to-play'
    },
    {
      title: 'Fund?',
      content: ['After every round, the $SOL in the unclaimed',<br className="sp-768"/>,' brackets will be rolled over into the next round and',<br className="sp-768"/>,' redistributed among the PRIZE POOL.'],
      has_arrow: true,
      link: 'https://docs.millionsy.io/lottery/prize-pool'
    },
  ]

  const handleRenderCard = (el: any) => {
    if (el.has_arrow) {
      return (
        <>
          <span className={`${classes.title}`}>{el.title}</span>
          <span className={`${classes.content}`}>{el.content}</span>
          <a href={el.link} target="_blank">
            <svg className='mx-auto' width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75L1 5.25ZM24.5303 6.53033C24.8232 6.23743 24.8232 5.76256 24.5303 5.46967L19.7574 0.696698C19.4645 0.403804 18.9896 0.403804 18.6967 0.696698C18.4038 0.989591 18.4038 1.46446 18.6967 1.75736L22.9393 6L18.6967 10.2426C18.4038 10.5355 18.4038 11.0104 18.6967 11.3033C18.9896 11.5962 19.4645 11.5962 19.7574 11.3033L24.5303 6.53033ZM1 6.75L24 6.75L24 5.25L1 5.25L1 6.75Z" fill="white"/>
            </svg>
          </a>
        </>
      )
    }
    return (
      <>
        <span className={`${classes.title}`}>{el.title}</span>
        <span className={`${classes.content}`}>{el.content}</span>
      </>
    )
  }
  return (
    <div className='px-3/100 py-16 md:pt-20 md:pb-32 bg-black'>
      <div className='max-w-700 mx-auto'>
        <h3 className='font-bungee text-center text-20 md:text-32 text-pink-D47DFF mb-6 md:mb-8 uppercase'>HOW TO BUY</h3>
        <div className='bg-gray-151515 p-1.5 md:p-2.5 rounded-10'>
          <ul className='border border-solid border-blue-0B7880-50 grid grid-cols-1 md:grid-cols-3 px-1 md:px-0 md:py-4 rounded-5 md:rounded-10 mb-4'>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0'>
              <h6 className='text-14 md:text-16 text-pink-D47DFF font-bold md:mb-0.5'>Get the tickets</h6>
              <p>Every ticket equals to 2$ and can be bought with $MILLI token. Price will be set when the round begins.</p>
            </li>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0 border-t border-b md:border-l md:border-r md:border-t-0 md:border-b-0 border-solid border-gray-575757-50'>
              <h6 className='text-14 md:text-16 text-pink-D47DFF font-bold md:mb-0.5'>Choose 6 numbers</h6>
              <p>Freely choose 6 different numbers from 1 to 45 (the order doesn't matter). You can select by yourself or let the machine choose randomly.</p>
            </li>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0'>
              <h6 className='text-14 md:text-16 text-pink-D47DFF font-bold md:mb-0.5'>Wait for the party</h6>
              <p>There is 1 draw every day, ends at 11am UTC and starts 35 minutes after that. The prize is automatically sent to the winner's wallet.</p>
            </li>
          </ul>
          <h5 className='text-12 md:text-16 text-pink-D47DFF font-bold pl-4 mb-4'>Lottery Winning Conditions</h5>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-gray-575757-20 p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>The Winning Number is</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>40</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>15</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>35</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>28</span></p>
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-gray-575757-20 p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>Your ticket</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5 opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>05</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5 opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>32</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>35</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-gray-222222 rounded-full'><span className='text-blue-17F0FF'>22</span></p>
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-blue-17F0FF-10 p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>Then you match 3 numbers and win the PRIZE!</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-blue-152b2c rounded-full'><span className='text-blue-17F0FF'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-blue-152b2c rounded-full'><span className='text-blue-17F0FF'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-17F0FF p-px inline-block rounded-full'>
                <p className='flex justify-center items-center w-full h-full text-18 font-bungee bg-blue-152b2c rounded-full'><span className='text-blue-17F0FF'>35</span></p>
              </li>
            </ul>
          </div>
          <p className='py-1 px-2.5 md:px-4 md:py-3.5 mb-2.5'>PRIZE bracket can't be ‘stack’. If you match 5 numbers, you shall win prize from the ‘Match 5’ bracket and shall not stack PRIZE from ‘Match 4’ and ‘Match 3’ brackets. </p>
          <div className='rounded-3 md:rounded-5 bg-gray-575757-20 p-2.5 md:px-4 md:py-2 mb-2.5'>
            <p className='mb-2 md:mb-3.5'>The order doesn’t matter, two tickets below are absolute the same:</p>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
              <ul className='bg-blue-17F0FF-10 px-2.5 py-1.5 md:py-2.5 md:px-5 inline-block rounded-full mb-2.5 md:mb-0'>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>40</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>15</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>12</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>20</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>35</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>28</span></p>
                </li>
              </ul>
              <ul className='bg-blue-17F0FF-10 px-2.5 py-1.5 md:py-2.5 md:px-5 inline-block rounded-full'>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>40</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>15</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>12</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>20</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>35</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-17F0FF p-px inline-block rounded-full'>
                  <p className='flex justify-center items-center w-full h-full text-12 font-bungee bg-blue-213638 rounded-full'><span className='text-blue-17F0FF'>28</span></p>
                </li>
              </ul>
            </div>
          </div>
          <div className='py-1.5 md:flex justify-between items-center'>
            <p className='mx-auto md:mx-0 w-130 md:w-230 flex-shrink-0'><img src="./assets/lottery/howtobuy_img01.png" alt="" /></p>
            <div className='md:pl-5'>
              <h5 className='text-12 md:text-16 text-pink-D47DFF font-bold mb-1'>How Drawing Works?</h5>
              <p>There’s no assurance that every drawing will result in a Jackpot. The prize rolls over to the next drawing if no one correctly chooses all six winning numbers (the order does not matter). The MILLIONSY Lottery offers one Jackpot, which increases every time that no winning Jackpot ticket is sold. When more tickets are purchased, the PRIZE grows until the Jackpot. <br />There are a total of four ways to win a prize. The holder of a winning Ticket can win in only one prize and shall be paid the highest prize won. Match 6 numbers = Jackpot. Or just match at least 3 to win a SHARED PRIZE.</p>
            </div>
          </div>
          <div className='py-1.5 flex justify-between flex-row-reverse items-center'>
            <p className='w-100 flex-shrink-0'><img src="./assets/lottery/howtobuy_img02.png" alt="" /></p>
            <div>
              <h5 className='text-12 md:text-16 text-pink-D47DFF font-bold mb-1'>PRIZE POOL allocation</h5>
              <p>The PRIZE for each bracket is different when there is a Jackpot winner or not. So, when someone hits the Jackpot, there are bigger prizes for the brackets. For more details, visit PRIZE POOL.</p>
            </div>
          </div>
          <div className='py-1.5 flex justify-between items-center'>
            <p className='w-100 flex-shrink-0'><img src="./assets/lottery/howtobuy_img03.png" alt="" /></p>
            <div className='pl-2 md:pl-5'>
              <h5 className='text-12 md:text-16 text-pink-D47DFF font-bold mb-1'>Viewing your tickets after buying</h5>
              <p>You can view your tickets in the "Next party” board after buying at any time you want when you've already connected your wallet to the website. See your history in "Yours'' in MILLIONSY AIRBOARD.</p>
            </div>
          </div>
          <p className='py-2 md:py-4'>More question? <a href="https://docs.millionsy.io/lottery/how-to-play " className='text-blue-ADFAFF hover:no-underline underline'>Read this article.</a></p>
        </div>
      </div>
    </div>
  )
}

export default GetSection