import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: 'url(assets/lottery/banner_light.png) center top no-repeat',
    backgroundSize: 'cover',
  },
  buyticket: {
    position: 'relative',
    width: 260,
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '& span': {
      display: 'inline-block',
      fontSize: 22,
      fontWeight: 700,
      textAlign: 'center',
      width: 180,
      padding: '0.5rem 0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -63%)',
      background: '#A819FA',
      boxShadow: '0 1px 1px 1px #FA00FF',
      borderRadius: 10,
    },
    '@media screen and (max-width: 767px)': {
      width: 195,
      '& span': {
        fontSize: 20,
        width: 135,
        padding: '0.25rem 0',
      },
    },
  }
}));

export default useStyles;