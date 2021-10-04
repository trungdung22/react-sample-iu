import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  submitIcon: {
    padding: '0 1rem',

  },
  submitContent: {
    padding: '1.5rem 1rem',
    borderLeft: '1px solid #17F0FF',
    '&.error': {
      borderLeft: '1px solid #A819FA'
    }
  },
  submitTitle: {
    fontSize: 18,
    fontWeight: 700,
    '&.error': {
      fontSize: 22,
    }
  },
  submitDes: {
    fontSize: 16,
    lineHeight: '1.3rem',
  },
}));

export default useStyles;