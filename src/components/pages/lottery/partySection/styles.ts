import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '11rem 0',
    marginBottom: '5rem',
    background: 'url(assets/lottery/bg_left.png) bottom right calc(50% + 450px) no-repeat, url(assets/lottery/bg_right.png) bottom 30% left calc(50% + 440px) no-repeat',
    backgroundSize: '282px 488px, 316px 314px',
    '& h3': {
      fontWeight: 400,
      marginBottom: '2rem',
      textAlign: 'center',
      fontSize: 76,
      fontFamily: '\'Bungee\', cursive',
      color: '#17F0FF',
      textShadow: '0 10px 10px rgba(23, 240, 255, 0.43), 0 15px 15px rgba(212, 125, 255, 0.25)',

      '& span': {
        display: 'block',
        textShadow: 'none',
        fontWeight: 700,
        fontSize: 24,
        fontFamily: '\'Lexend\', sans-serif',
        color: '#F4E0FF',
        lineHeight: '3.5rem',
      },
      '@media screen and (max-width: 768px)': {
        fontSize: 56,
        marginBottom: '0.5rem',
        '& span': {
          fontSize: 24,
          lineHeight: '5rem',
        },
      }
    },
    '@media screen and (max-width: 768px)': {
      padding: '10rem 0',
      marginBottom: '0',
      background: 'url(assets/lottery/bg_left_sp.png) top 60% right calc(50% + 130px) no-repeat, url(assets/lottery/bg_right_sp.png) center left calc(50% + 150px) no-repeat',
      backgroundSize: '54px 375px, 28px 354px',
    },
  },
  container: {
    maxWidth: 1640,
    margin: '0 auto',
    transition: 'all 0.2s ease',
  },
  buyticket: {
    position: 'relative',
    width: 250,
    margin: '0 auto',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '& span': {
      display: 'inline-block',
      fontSize: 20,
      fontWeight: 700,
      textAlign: 'center',
      width: 180,
      padding: '0.75rem 0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
      background: '#A819FA',
      boxShadow: '0 1px 0px #FA00FF',
      borderRadius: 20,
    },
    '&:hover': {
      opacity: 0.8,
    },
    '@media screen and (max-width: 768px)': {
      width: 200,
      '& span': {
        fontSize: 20,
        padding: '0.6rem 0',
        borderRadius: 10,
        width: 135,
      },
    },
  }
}));

export default useStyles;