import React from 'react';
// import { post } from 'axios';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import  TextField  from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/styles'
import { withStyles } from '@mui/styles';

const styles = theme => ({
    hidden : {
        display: 'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null, 
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        }
    }


    handleForSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log('---------response.data----------');
                console.log(response.data);
                console.log('--------------------------------');
                this.props.stateRefresh();
            })
            
            this.setState({
                file : null,
                userName:'',
                birthday:'',
                gender:'',
                job:'',
                fileName:'',
                open: false
            })
            //일단 전체 새로고침
            //window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChanged = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formDate = new FormData();
        formDate.append('image', this.state.file);
        console.log(this.state.file);
        formDate.append('name', this.state.userName);
        console.log(this.state.userName);
        formDate.append('birthday', this.state.birthday);
        console.log(this.state.birthday);
        formDate.append('gender', this.state.gender);
        console.log(this.state.gender);
        formDate.append('job', this.state.job);
        console.log(this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formDate, config);
    }


    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file : null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <br/>
                <Button variant ="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>

                    <DialogTitle>고객 추가</DialogTitle>

                    <DialogContent>
                        <input className={classes.hidden} accept = "image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant ="contained" color ="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>

                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChanged}/><br/>
                        <TextField label="생년월일"type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChanged}/><br/>
                        <TextField label="성별"type="text" name="gender" value={this.state.gender} onChange={this.handleValueChanged}/><br/>
                        <TextField label="직업"type="text" name="job" value={this.state.job} onChange={this.handleValueChanged}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color ="primary" onClick={this.handleForSubmit}>추가</Button>
                        <Button variant="outlined" color ="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleForSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChanged}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChanged}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChanged}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChanged}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }

}

export default withStyles(styles) (CustomerAdd);