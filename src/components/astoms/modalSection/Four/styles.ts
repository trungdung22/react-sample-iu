import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '0.5rem 1rem 1rem',
  },
  footer: {},
  chooseNumber: {
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      marginRight: '17.5px',
      marginBottom: '5px',
      width: '28px',
      height: '28px',
      '&:nth-child(7n)': {
        marginRight: 0,
      },

      '@media screen and (max-width: 767px)': {
        marginRight: '8px',
        marginBottom: '2px',
      }
    }
  },
}));

export default useStyles;