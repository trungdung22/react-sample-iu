import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NONAME } from 'dns';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#071526',
    padding: '0.5rem 0',
    borderBottom: '1px solid #0B7880',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 100,
    '&.active': {
      top: '-100%',
    },
    '& ul': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2.75rem',
      '& a': {
        display: 'inline-block',
        fontSize: 16,
        color: '#fff',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#B2FAFF',
        },
        '&.active': {
          color: '#B2FAFF',
          fontWeight: 700,
        },

        // '@media screen and (max-width: 1640px)': {
        //   fontSize: '1.5vw',
        // },
        '@media screen and (max-width: 768px)': {
          fontSize: '10px',
          color: '#F4E0FF',
          '&:hover': {
            color: '#F4E0FF',
          },
        }
      },
      '@media screen and (max-width: 768px)': {
        display: 'none',
      }
    },

    // '@media screen and (max-width: 1640px)': {
    //   padding: '1em 0',
    //   '& ul': {
    //     gap: '3.5vw',
    //   },
    // }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1560,
    width: '100%',
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 1640px)': {
      padding: '0 3%',
    }
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    '& img': {
      maxWidth: 40,
      transition: 'all 0.2s ease',
    },
    '& span': {
      display: 'inline-block',
      fontSize: 20,
      fontFamily: '\'Bungee\', cursive',
      fontWeight: 400,
      transition: 'all 0.2s ease',
    },

    // '@media screen and (max-width: 1640px)': {
    //   gap: '1.75vw',
    //   '& img': {
    //     maxWidth: '3.25vw',
    //   },
    //   '& span': {
    //     fontSize: '1.6vw',
    //   },
    // },
    '@media screen and (max-width: 768px)': {
      gap: '0',
      '& img': {
        maxWidth: '37px',
      },
      '& span': {
        fontSize: 14,
        marginLeft: '0.75rem',
      },
    }
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
    // '@media screen and (max-width: 1640px)': {
    //   gap: '3.5vw',
    // },
  },
}));

export default useStyles;