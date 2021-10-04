import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& h3': {
      fontWeight: 400,
      marginBottom: '2rem',
      textAlign: 'center',
      fontSize: 72,
      fontFamily: '\'Bungee\', cursive',
      color: '#D47DFF',
      textShadow: '0 10px 10px rgba(212, 125, 255, 0.25), 0 15px 15px rgba(212, 125, 255, 0.25)',
      '& sup': {
        fontSize: 50,
      },
      '& span': {
        display: 'block',
        textShadow: 'none',
        fontWeight: 700,
        fontSize: 24,
        fontFamily: '\'Lexend\', sans-serif',
        color: '#FFE0FD',
        marginTop: '1rem',
      },
      // '@media screen and (max-width: 1640px)': {
      //   fontSize: '7.5vw',
      //   marginBottom: '4vw',
      //   '& sup': {
      //     fontSize: '4.5vw',
      //   },
      //   '& span': {
      //     fontSize: '2.15vw',
      //   },
      // },
      '@media screen and (max-width: 768px)': {
        marginBottom: '2rem',
        fontSize: 56,
        '& sup': {
          fontSize: 40,
        },
        '& span': {
          display: 'block',
          textShadow: 'none',
          fontWeight: 700,
          fontSize: 20,
          fontFamily: '\'Lexend\', sans-serif',
          color: '#FFE0FD',
          marginTop: '1rem',
        },
      },
    },
    '@media screen and (max-width: 768px)': {
      marginTop: '-2rem',
    }
  },
  container: {
    maxWidth: 700,
    margin: '0 auto',
    transition: 'all 0.2s ease',

    '@media screen and (max-width: 768px)': {
      maxWidth: 425,
      padding: '0 3%',
    }
  },
  content: {
    maxWidth: 900,
    margin: '0 auto',
    background: '#303030',
    borderRadius: 10,
    border: '1px solid #17F0FF',
    overflow: 'hidden',
    '@media screen and (max-width: 768px)': {
      maxWidth: '100%',
    }
  },
  header: {
    padding: '1.5rem 2rem',
    '& .title': {
      fontSize: 20,
      fontWeight: 700,
      color: '#F4E0FF',
      marginBottom: '1rem',
    },
    // '@media screen and (max-width: 1640px)': {
    //   padding: '2.5vw 3vw',
    //   '& .title': {
    //     fontSize: '2vw',
    //     marginBottom: '2vw',
    //   },
    // },
    '@media screen and (max-width: 768px)': {
      padding: '1.25rem 1rem 1.75rem',
      '& .title': {
        fontSize: 20,
        marginBottom: '0.75rem',
      },
    },
  },
  infoRound: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    color: '#F4E0FF',
    background: 'rgba(255, 255, 255, 0.25)',
    paddingRight: '1rem',
    borderRadius: 5,
    overflow: 'hidden',
    '& span': {
      display: 'inline-block',
      fontWeight: 700,
      background: 'rgba(140, 36, 191, 0.5)',
      borderRadius: 5,
      width: 100,
      padding: '0.5rem 0',
      textAlign: 'center',
    },
    // '@media screen and (max-width: 1640px)': {
    //   fontSize: '1.5vw',
    //   paddingRight: '1vw',
    //   borderRadius: '0.75vw',
    //   '& span': {
    //     display: 'inline-block',
    //     borderRadius: '0.75vw',
    //     width: '12vw',
    //     padding: '1.25vw 0',
    //   },
    // },
    '@media screen and (max-width: 768px)': {
      fontSize: 16,
      paddingRight: '0.75rem',
      borderRadius: '10px',
      '& span': {
        width: 72,
        borderRadius: '10px',
        padding: '1rem 0',
      },
    },
  },
  footer: {
    borderTop: '1px solid #616161',
    padding: '1.5rem 2rem',
    color: '#F4E0FF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& .yourticket': {
      '& p:nth-child(1)': {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: '0.75rem',
        color: '#F4E0FF',
      },
      '& p:nth-child(2)': {
        fontSize: 18,
        '& span': {
          fontWeight: 700,
          cursor: 'pointer',
        }
      },
      '@media screen and (max-width: 768px)': {
        marginBottom: '1.5rem',
        '& p:nth-child(1)': {
          fontSize: 20,
          marginBottom: '0.25rem',
        },
        '& p:nth-child(2)': {
          fontSize: 16,
        }
      }
    },
    '& .getticket': {
      background: '#17F0FF',
      textAlign: 'center',
      width: 180,
      color: '#0B7880',
      borderRadius: 10,
      padding: '1rem 0',
      fontSize: 20,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        opacity: 0.8,
      }
    },
    '@media screen and (max-width: 768px)': {
      padding: '1.25rem 1rem 1.75rem',
      display: 'block',
      '& .getticket': {
        width: 150,
        padding: '1rem 0',
        fontSize: 16,
        margin: '0 auto',
        borderRadius: '10px',
      }
    },
  },
}));

export default useStyles;