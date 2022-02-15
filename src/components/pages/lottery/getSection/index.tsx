import React from 'react';
import useStyles from './styles';
const GetSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div className='px-3/100 py-16 md:pt-20 md:pb-32 bg-black'>
      <div className='max-w-700 mx-auto'>
        <h3 className='font-bungee text-center text-h1-sp md:text-h1-pc text-blue-primary mb-6 md:mb-8 uppercase'>HOW TO BUY</h3>
        <div className='bg-gray-box p-1.5 md:p-2.5 rounded-10'>
          <ul className='border border-solid border-gray-boxline-50 grid grid-cols-1 md:grid-cols-3 px-1 md:px-0 md:py-4 rounded-5 md:rounded-10 mb-4'>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0'>
              <h6 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold md:mb-0.5'>Get the tickets</h6>
              <p>Every ticket equals to 2$ and can be bought with $MILLI token. Price will be set when the round begins.</p>
            </li>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0 border-t border-b md:border-l md:border-r md:border-t-0 md:border-b-0 border-solid border-gray-boxline-50'>
              <h6 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold md:mb-0.5'>Choose 6 numbers</h6>
              <p>Freely choose 6 different numbers from 1 to 45 (the order doesn't matter). You can select by yourself or let the machine choose randomly.</p>
            </li>
            <li className='col-span-1 px-1 md:px-4 py-2 md:py-0'>
              <h6 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold md:mb-0.5'>Wait for the party</h6>
              <p>There is 1 draw every day, ends at 2AM UTC and starts 35 minutes after that. The prize is automatically sent to the winner's wallet.</p>
            </li>
          </ul>
          <h5 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold pl-4 mb-4'>Lottery Winning Conditions</h5>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-gray-lightbox p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>The Winning Number is</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>40</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>15</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>35</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>28</span></p>
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-gray-lightbox p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>Your ticket</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5 opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>05</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5 opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>32</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>35</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full opacity-50'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-lightbox rounded-full'><span className='text-blue-primary'>22</span></p>
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:items-center justify-between rounded-3 md:rounded-5 bg-gray-page p-2.5 md:px-4 md:py-3.5 mb-2.5'>
            <p className='mb-2 md:mb-0'>Then you match 3 numbers and win the PRIZE!</p>
            <ul>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-page rounded-full'><span className='text-blue-primary'>20</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full mr-15px screen475:mr-5'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-page rounded-full'><span className='text-blue-primary'>12</span></p>
              </li>
              <li className='w-10 h-10 md:w-50 md:h-50 bg-blue-primary p-px inline-block rounded-full'>
                <p className='flex justify-center items-center w-full h-full text-18 md:text-h1-sp font-bungee bg-gray-page rounded-full'><span className='text-blue-primary'>35</span></p>
              </li>
            </ul>
          </div>
          <p className='py-1 px-2.5 md:px-4 md:py-3.5 mb-2.5'>PRIZE bracket can't be ‘stack’. If you match 5 numbers, you shall win prize from the ‘Match 5’ bracket and shall not stack PRIZE from ‘Match 4’ and ‘Match 3’ brackets. </p>
          <div className='rounded-3 md:rounded-5 bg-gray-lightbox p-2.5 md:px-4 md:py-2 mb-2.5'>
            <p className='mb-2 md:mb-3.5'>The order doesn’t matter, two tickets below are absolute the same:</p>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
              <ul className='bg-gray-box px-2.5 py-1.5 md:py-2.5 md:px-5 inline-block rounded-full mb-2.5 md:mb-0'>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>40</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>15</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>12</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>20</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>35</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>28</span></p>
                </li>
              </ul>
              <ul className='bg-gray-box px-2.5 py-1.5 md:py-2.5 md:px-5 inline-block rounded-full'>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>40</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>15</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>12</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>20</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full mr-2.5'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>35</span></p>
                </li>
                <li className='w-30 h-30 bg-blue-primary p-px inline-block rounded-full'>
                  <p className='flex justify-center items-center w-full h-full text-body-sp font-bungee bg-gray-box rounded-full'><span className='text-blue-primary'>28</span></p>
                </li>
              </ul>
            </div>
          </div>
          <div className='py-1.5 md:flex justify-between items-center'>
            <p className='mx-auto md:mx-0 w-130 md:w-230 flex-shrink-0'><img src="./assets/lottery/howtobuy_img01.png" alt="" /></p>
            <div className='md:pl-5'>
              <h5 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold mb-1'>How Drawing Works?</h5>
              <p>There’s no assurance that every drawing will result in a Jackpot. The prize rolls over to the next drawing if no one correctly chooses all six winning numbers (the order does not matter). The MILLIONSY Lottery offers one Jackpot, which increases every time that no winning Jackpot ticket is sold. When more tickets are purchased, the PRIZE grows until the Jackpot. <br />There are a total of four ways to win a prize. The holder of a winning Ticket can win in only one prize and shall be paid the highest prize won. Match 6 numbers = Jackpot. Or just match at least 3 to win a SHARED PRIZE.</p>
            </div>
          </div>
          <div className='py-1.5 flex justify-between flex-row-reverse items-center'>
            <p className='w-100 flex-shrink-0'><img src="./assets/lottery/howtobuy_img02.png" alt="" /></p>
            <div>
              <h5 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold mb-1'>PRIZE POOL allocation</h5>
              <p>The PRIZE for each bracket is different when there is a Jackpot winner or not. So, when someone hits the Jackpot, there are bigger prizes for the brackets. For more details, visit PRIZE POOL.</p>
            </div>
          </div>
          <div className='py-1.5 flex justify-between items-center'>
            <p className='w-100 flex-shrink-0'><img src="./assets/lottery/howtobuy_img03.png" alt="" /></p>
            <div className='pl-2 md:pl-5'>
              <h5 className='text-h3-sp md:text-h3-pc text-pink-secondary font-bold mb-1'>Viewing your tickets after buying</h5>
              <p>You can view your tickets in the "Next party” board after buying at any time you want when you've already connected your wallet to the website. See your history in "Yours'' in MILLIONSY AIRBOARD.</p>
            </div>
          </div>
          <p className='py-2 md:py-4'>More question? <a href="https://docs.millionsy.io/lottery/how-to-play " className='text-blue-secondary transition-all hover:opacity-70 underline' target={`_blank`}>Read this article.</a></p>
        </div>
      </div>
    </div>
  )
}

export default GetSection