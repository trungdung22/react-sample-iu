import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  submitIcon: {
    padding: '0 0.75rem',

  },
  submitContent: {
    padding: '1.25rem 1rem',
    borderLeft: '1px solid #17F0FF',
    '&.error': {
      borderLeft: '1px solid #A819FA'
    }
  },
  submitTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  submitDes: {
    fontSize: 12,
  },
}));

export default useStyles;