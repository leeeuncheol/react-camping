import './App.css';
import { Component } from 'react';
import Customer  from './components/customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CustomerAdd  from './components/CustomerAdd';

// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { AppBar } from "@mui/material";

const styles =  ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    // marginTop: 50,
    // overflowX: "auto"
    minWidth: 1080
  },
  // table: {
  //   minWidth: 1000
// },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    //margin: theme.spacing.unit * 2
    marginTop: 50
  },
  tableHead: {
   fontSize: "1.0rem" 
  },
  menu: {
    marginTop: 15,
    marginBottom: 15, 
    display: 'flex',
    justifyContent: 'center'
  }
  
})


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



//값이 변경되는 변수
class App extends Component{

  // state = {
  //   customers: "",
  //   completed : 0
  // }

    constructor(props){
      super(props);
      this.state = {
        customers: '',
        completed: 0,
        searchKeyword: ''
      }
    }

      stateRefresh = () => {
        this.setState({
          customers: '',
          completed : 0,
          searchKeyword: ''
        });
        this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));

      }
   

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

    callApi = async() => {
      const response = await fetch('/api/customers');
      const body = await response.json();
      return body;
  }


  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nexState = {}; 
    nexState[e.target.name] = e.target.value;
    this.setState(nexState);

  }

  render(){
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지","이름", "생년월일", "성별", "직업", "삭제"]
    return(

      <div className={classes.root}>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                고객 관리 시스템
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색하기..."
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>

        <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>

       <Paper className = {classes.paper}>
        {/* <Paper> */}
          <Table className = {classes.table}>
          {/* <Table> */}
            <TableHead>
              <TableRow>
                {/* <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.customers ? 
              
              filteredComponents(this.state.customers) :

              // this.state.customers.map(c => {
              // return(
              // <Customer stateRefresh={this.stateRefresh}
              // key = {c.id}
              // id = {c.id} 
              // image = {c.image}
              // name = {c.name}
              // birthday={c.birthday}
              // gender={c.gender}
              // job ={c.job}
              // />);
              // }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} varient="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            
            </TableBody>
          </Table>
      </Paper>
      
      </div>

    );
  }
}

// export default App;

export default withStyles(styles)(App);


