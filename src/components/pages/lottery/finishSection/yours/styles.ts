import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 975,
    margin: '0 auto',
    background: '#303030',
    borderRadius: 10,
    border: '1px solid #17F0FF',
    overflow: 'hidden',
    // '@media screen and (max-width: 1640px)': {
    //   maxWidth: '65vw'
    // },
    '@media screen and (max-width: 768px)': {
      maxWidth: '100%'
    }
  },
  header: {
    padding: '1.25rem 2rem',
    '& .title': {
      fontSize: 20,
      fontWeight: 700,
      color: '#F4E0FF',

    },
    '@media screen and (max-width: 768px)': {
      padding: '1rem',
      '& .title': {
        fontSize: 20,
      },
    },
  },

  body: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid #616161',

    '& .listLabel': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 700,
      color: '#D47DFF',
      fontSize: 18,
      textTransform: 'uppercase',
      marginBottom: '1.5rem',
      '& li:nth-child(1)': {
        width: '20%',
      },
      '& li:nth-child(2)': {
        width: '36%',
      },
      '& li:nth-child(3)': {
        width: '42%',
      },
      // '@media screen and (max-width: 1640px)': {
      //   fontSize: '1.5vw',
      //   marginBottom: '2vw',
      // },
      // '@media screen and (max-width: 1024px)': {
      //   fontSize: '2vw',
      //   '& li:nth-child(1)': {
      //     width: '20%',
      //   },
      //   '& li:nth-child(2)': {
      //     width: '44.5%',
      //   },
      //   '& li:nth-child(3)': {
      //     width: 'auto',
      //     textAlign: 'center',
      //   },
      // },
      '@media screen and (max-width: 768px)': {
        fontSize: 14,
        marginBottom: '1rem',
        '& li:nth-child(1)': {
          width: '18%',
        },
        '& li:nth-child(2)': {
          width: '42.5%',
        },
        '& li:nth-child(3)': {
          width: 'auto',
          textAlign: 'center',
        },
      },
    },

    '& .listRound': {
      maxHeight: 300,
      overflowY: 'auto',
      '& li': {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        color: '#F4E0FF',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '& p:nth-child(1)': {
          fontWeight: 700,
          width: '20%',
        },
        '& p:nth-child(2)': {
          width: '36%',
          '& span:nth-child(1)': {
            display: 'inline-block',
            minWidth: 135,

            // '@media screen and (max-width: 1024px)': {
            //   minWidth: '15vw',
            // },
            '@media screen and (max-width: 768px)': {
              minWidth: 'auto',
              display: 'block'
            }
          },
          '& span:nth-child(2)': {
            color: '#BCBCBC',
          }
        },
        '& p:nth-child(3)': {
          width: '42%',
          fontSize: 16,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },

        '& + li': {
          marginTop: '1.35rem',
        },

        '&:hover': {
          opacity: 0.6,
        },
        // '@media screen and (max-width: 1024px)': {
        //   fontSize: '1.75vw',
        //   '& p:nth-child(2)': {
        //     width: '45%',
        //     '& span:nth-child(1)': {
        //       '@media screen and (max-width: 768px)': {
        //         minWidth: 'auto',
        //         display: 'block'
        //       }
        //     },
        //     '& span:nth-child(2)': {
        //     }
        //   },
        //   '& p:nth-child(3)': {
        //     width: '35%',
        //     fontSize: '2vw',
        //   },
        // },
        '@media screen and (max-width: 768px)': {
          fontSize: '14px',
          alignItems: 'flex-start',
          lineHeight: '1.2rem',
          '& + li': {
            marginTop: '0.75rem',
          },
          '& p:nth-child(1)': {
            width: '18%',
          },
          '& p:nth-child(2)': {
            width: '52%',
          },
          '& p:nth-child(3)': {
            width: '30%',
            fontSize: 18,
            '& span:nth-child(2)': {
              maxWidth: 18,
              display: 'flex'
            },
          },
        },
      },
      '@media screen and (max-width: 768px)': {
        maxHeight: 300,
      },
    },
    // '@media screen and (max-width: 1640px)': {
    //   padding: '2.5vw 3vw',
    // },
    '@media screen and (max-width: 768px)': {
      padding: '1.25rem 1rem 1.25rem',
    },
  },
}));

export default useStyles;