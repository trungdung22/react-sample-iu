import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    padding: '1.5rem 2rem',
    '& .top': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      '& .title': {
        fontSize: 20,
        fontWeight: 700,
        color: '#F4E0FF',
        '& span': {
          marginRight: '1rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            opacity: 0.6
          }
        }
      },
      '& ul': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',
        '& li': {
          cursor: 'pointer',
          '& svg': {
            maxWidth: 20,
          },
          '&:hover path': {
            fill: '#fff',
          },
          '&:hover line': {
            stroke: '#fff',
          }
        }
      },
      '@media screen and (max-width: 767px)': {
        marginBottom: '0.75rem',
        '& .title': {
          fontSize: 20,
        },
        '& ul': {
          gap: '0',
          '& li': {
            padding: '0 0.6rem',
            '& svg': {
              maxWidth: 18
            },
          }
        },
      },
    },
    '@media screen and (max-width: 767px)': {
      padding: '1rem',
    },
  },
  infoRound: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
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
      padding: '0.4rem 0',
      textAlign: 'center',
    },
    '@media screen and (max-width: 767px)': {
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

  body: {
    borderTop: '1px solid #616161',
    borderBottom: '1px solid #616161',
    '& .content': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 2rem',
      gap: '3rem',
      '& .text': {
        fontSize: 20,
        fontWeight: 700,
        flexShrink: 0,
        color: '#F4E0FF',
      },
      '& .number': {
        display: 'flex',
        gap: '0.65rem',
        gridGap: '0.65rem',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        width: '100%',
        '& li': {
          color: '#17F0FF',
          width: 52,
          height: 52,
          border: '1px solid #17F0FF',
          background: 'rgba(4, 26, 41, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontFamily: '\'Bungee\', cursive',
        },
        '@media screen and (max-width: 767px)': {
          gap: '0',
          gridGap: '0',
          justifyContent: 'space-between',
          '& li': {
            width: 40,
            height: 40,
            justifyContent: 'center',
            fontSize: 18,
            fontFamily: '\'Bungee\', cursive',
          }
        },
      },
      '@media screen and (max-width: 767px)': {
        display: 'block',
        padding: '1.25rem 1rem',
        '& .text': {
          fontSize: 20,
          marginBottom: '1rem',
        },
      },
    },
    '& .slideToggle': {
      transition: 'height 0.2s ease',
      overflow: 'hidden',
      '&.active': {
        height: 0,
      }
    },
    '& .yourticket': {
      padding: '1.5rem 2rem',
      display: 'flex',
      '&>p': {
        fontSize: 16,
        fontWeight: 700,
        color: '#F4E0FF',
        minWidth: 220,
      },
      '&>div': {
        '& p:first-child': {
          paddingTop: 5,
          marginBottom: '0.25rem',
          '& span': {
            fontWeight: 700,
          },
        },
        '& p:last-child': {
          paddingTop: 5,
          marginBottom: '0.75rem',
          cursor: 'pointer',
          fontWeight: 700,
          color: '#17F0FF',
        },
        '@media screen and (max-width: 767px)': {
          fontSize: 16,
          lineHeight: '1.4rem',
          '& p:first-child': {
            paddingTop: 0,
            marginBottom: 0,
          },
        },
      },
      '@media screen and (max-width: 767px)': {
        padding: '0 1rem 1.25rem',
        display: 'block',
        '&>p': {
          fontSize: 20,
          marginBottom: '1vw',
        },
      }
    },
  },
  infoPrize: {
    background: 'rgba(28, 25, 25, 0.8)',
    padding: '1.5rem 2rem',
    '& .prizeTop': {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      '& .text': {
        fontSize: 20,
        fontWeight: 700,
        color: '#F4E0FF',
        alignSelf: 'center',
        width: '20%',
      },
      '& .total': {
        fontSize: 28,
        fontFamily: '\'Bungee\', cursive',
        color: '#17F0FF',
      },
      '& .unit': {
        fontSize: 22,
        fontFamily: '\'Bungee\', cursive',
        color: '#D47DFF',
        paddingBottom: 4,
      },
      '@media screen and (max-width: 767px)': {
        display: 'block',
        marginBottom: '1.5rem',
        '& .text': {
          fontSize: 20,
          width: '100%',
        },
        '& .total': {
          fontSize: 32,
          margin: '1rem 0 0.5rem'
        },
        '& .unit': {
          fontSize: 24,
          paddingBottom: 0,
        },
      },
    },
    '& .prizeMatch': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      '& li': {
        lineHeight: '1.6rem',
      },
      '& span': {
        display: 'block',
        textAlign: 'center',
        '&:nth-child(1)': {
          fontWeight: 400,
          color: '#F4E0FF',
        },
        '&:nth-child(2)': {
          fontSize: 20,
          fontWeight: 700,
          color: '#D47DFF',
        },
        '&:nth-child(3)': {
          lineHeight: '1.25rem',
          fontSize: '12px',
        },
        '@media screen and (max-width: 767px)': {
          textAlign: 'left',
          '&:nth-child(1)': {
            fontSize: 18,
          },
          '&:nth-child(2)': {
            fontSize: 24,
          },
          '&:nth-child(3)': {
            lineHeight: '1.25rem',
            fontSize: 14,
          },
        },
      },
      '@media screen and (max-width: 767px)': {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        '& li': {
          width: '155px',
          lineHeight: '1.7rem',
          marginBottom: '1.4rem',
        },
      },
    },
    '& .totalMatch': {
      textAlign: 'right',
      '& span': {
        fontSize: 18,
        fontWeight: 700,
      }
    },
    '@media screen and (max-width: 767px)': {
      padding: '1.25rem 1rem',
      '& .totalMatch': {
        marginTop: '-5.25rem',
        lineHeight: '1.5rem',
        fontSize: 14,
        '& span': {
          display: 'inline-block',
          fontSize: 18,
        }
      },
    },
  },
  footer: {
    textAlign: 'center',
    padding: '1rem 2rem',
    fontWeight: 700,
    fontSize: 18,
    color: '#17F0FF',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '& span': {
      display: 'inline-block',
      marginLeft: '0.5rem',
      position: 'relative',
      bottom: 3,
    },
    '&:hover': {
      opacity: 0.6,
    },
    '@media screen and (max-width: 767px)': {
      padding: '0.75rem 1rem',
      fontSize: 16,
      '& span': {
        bottom: 0,
        '& svg': {
          maxWidth: '10px',
        }
      },
    },
  },
}));

export default useStyles;