import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {},
  footer: {},
  listButton: {
    '& li': {
      fontWeight: 700,
      display: 'block',
      borderRadius: 5,
      background: '#17F0FF',
      border: '1px solid transparent',
      color: '#0B7880',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      cursor: 'pointer',
      margin: '0 auto',
      fontSize: 16,
      width: 140,
      padding: '0.6rem',
      '&:hover': {
        opacity: 0.6,
      }
    }
  },
  listTickets: {
    overflowY: 'auto',
    marginBottom: 0,
    marginTop: '5px',
    maxHeight: 190,
    '& dl + dl': {
      marginTop: '18px',
    },
    '& dt': {
      fontSize: 12,
      marginBottom: '0.25rem',
      color: '#EBEBEB',
    },
    '& ul': {
      padding: '3px 12px',
      background: '#0B7880',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #ADFAFF',
      borderRadius: 5,
      display: 'flex',
      fontWeight: 600,
      color: '#fff',
      width: 'fit-content',
      '& li + li': {
        marginLeft: 23,
      }
    },
  },
}));

export default useStyles;