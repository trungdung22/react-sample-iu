import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '8rem 0 10rem',
    // background: 'url(assets/lottery/bg_finished.svg) center top no-repeat',
    // backgroundSize: 'cover',
    background: 'url(assets/lottery/bg_christmas.svg) center bottom no-repeat',
    backgroundSize: '100% auto',
    marginTop: '7.5rem',
    '& h3': {
      color: '#D47DFF',
      fontSize: 48,
      fontWeight: 700,
      marginBottom: '2.25rem',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    '@media screen and (max-width: 767px)': {
      background: 'url(assets/lottery/bg_christmas.svg) right bottom no-repeat',
      backgroundSize: '150% auto',
      padding: '4rem 0 8rem',
      marginTop: '4rem',
      '& h3': {
        fontSize: 26,
        marginBottom: '1.25rem',
      },
    },
  },
  container: {
    maxWidth: 700,
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 767px)': {
      padding: '0 3%',
      maxWidth: 425,
    }
  },
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4rem',
    gridGap: '4rem',
    marginBottom: '3rem',
    '& li': {
      border: '1px solid #A819FA',
      borderRadius: 5,
      fontSize: 20,
      fontWeight: 700,
      width: 160,
      textAlign: 'center',
      padding: '0.3rem 0',
      boxSizing: 'border-box',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&.active, &:hover': {
        background: '#A819FA',
      },
    },

    '@media screen and (max-width: 767px)': {
      gap: '1rem',
      gridGap: '1rem',
      marginBottom: '2rem',
      '& li': {
        padding: '0.3rem 0 0.4rem',
        fontSize: 14,
      }
    },
  },
}));

export default useStyles;