import { makeStyles } from '@material-ui/core/styles'
import colorTheme, { } from "../../Color"

const useStyle = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    content: {
        width: '100%',
        marginTop: '10vh',
    },
    gridContaiiner: {
        marginBottom: '40px',
        marginRight: "-15px",
        marginLeft: "-15px",
        width: "auto",
    },
    gridItem: {
        position: "relative",
        width: "100%",
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px",
        flexBasis: "auto",
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
    cardHeader: {
        width: 'fit-content',
        height: 'fit-content',
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
    cardBody: {
        marginTop: '10px',
        marginBottom: '5px',
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        padding: "0.9375rem 1.875rem",
        flex: "1 1 auto",
    },
    cardFooter: {
        paddingTop: "0rem",
        border: "0",
        borderRadius: "6px",
        justifyItems: "right",
        marginLeft: '20px',
        marginTop: '20px'
    },
    icon: {
        marginTop: '15px',
        marginBottom: '15px',
        marginLeft: '15px',
        marginRight: '15px',
        transform: 'scale(2)',
    },
    graphStyle: {
        '& .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-bar': { stroke: 'white', },
        '& .ct-grids line': {
            stroke: '#fff',
            'stroke-width': '.3px'
          },
        '& .ct-labels span': {
            color: '#fff'
        }
    },
}))

export default useStyle;