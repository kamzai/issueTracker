import { makeStyles } from '@material-ui/core/styles'
import colorTheme, { } from '../../../Color'

const useStyle = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    content: {
        width: '100%',
        marginTop: '10vh',
    },
    heading: {
        fontSize: '20px', fontFamily: '"Roboto Condensed"',
    },
    cardHeader: {
        width: "auto",
        textAlign: "left",
        borderRadius: "3px",
        padding: "1rem 15px",
        marginLeft: "15px",
        marginRight: "15px",
        marginTop: "-30px",
        border: "0",
        marginBottom: "0",
    },
    primaryCardHeader: {
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        color: "#fff",
        background: `linear-gradient(60deg, ${colorTheme}, ${colorTheme})`,
        boxShadow:
            "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)",
    },
    card: {
        border: "0",
        marginBottom: "30px",
        borderRadius: "6px",
        color: "rgba(0, 0, 0, 0.87)",
        background: "#fff",
        width: "100%",
        boxShadow:
            "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem",
        transition: "all 300ms linear",
    },
    cardBody: {
        marginTop: '10px',
        marginBottom: '5px',
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        padding: "0.9375rem 1.875rem",
        flex: "1 1 auto",
    },
    button: {
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        color: '#ffffff',
        backgroundColor: `transparent`,
        borderColor: `#9c27b0`,
        marginBottom: '20px',
        marginRight: '20px',
        "&:hover": {
            backgroundColor: `#ab47bc`,
            boxShadow: '0 14px 26px -12px rgb(156 39 176 / 42%), 0 4px 23px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(156 39 176 / 20%)',
        },
    },
    media: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}))

export default useStyle