import { makeStyles } from '@material-ui/core/styles'
import colorTheme from "../../Color"
const drawerWidth = 260


const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer - 10,
        backgroundColor: `${colorTheme}`,
        background: `linear-gradient(60deg, #3C3B3F, ${colorTheme})`,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        marginLeft: '17%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    list: {
        marginTop: "20px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset"
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:focus,&:visited,&": {
            color: '#fff',
        },
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "30px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 'normal',
        lineHeight: "1.5em",
    },
    itemText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: "14px",
        fontWeight: "normal",
        margin: "5px 5px 0 5px",
        lineHeight: "30px",
        color: "rgb(255,255,255,.8)"
    },
    itemIcon: {
        // width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgb(255,255,255,.8)"
    },
    sidebarWrapper: {
        // position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4",
        overflowScrolling: "touch",
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "inline-block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: '#000',
            opacity: ".8"
        }
    },
    logo: {
        position: "relative",
        padding: "15px 15px",
        zIndex: "4",
        "&:after": {
            content: '""',
            position: "absolute",
            bottom: "0",

            height: "1px",
            right: "15px",
            width: "calc(100% - 30px)",
            backgroundColor: "rgba(169, 169, 169, 0.3)"
        }
    },
    logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    img: {
        width: "35px",
        top: "22px",
        position: "absolute",
        verticalAlign: "middle",
        border: "0"
    },
    logoLink: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textTransform: "uppercase",
        padding: "5px 0",
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "30px",
        textDecoration: "none",
        backgroundColor: "transparent",
        "&,&:hover": {
            color: '#fff'
        }
    },
    highlight: {
        backgroundColor: `${colorTheme}`,
        "&,&:hover": {
            backgroundColor: `${colorTheme}`,
        }
    },
    down: {
        position: "absolute",
        width: "93%",
        bottom: "30px",
        backgroundColor: `${colorTheme}`,
        "&,&:hover": {
            backgroundColor: `${colorTheme}`,
        }
    },
}));


export default useStyle;