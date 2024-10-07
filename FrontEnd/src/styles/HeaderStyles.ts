// src/styles/HeaderStyles.ts
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles'; // הוספת השורה הזו

const useStyles = makeStyles((theme: Theme) => ({ // עדכון כאן
    header: {
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        color: 'white',
    },
  

}));

export default useStyles;
