import React from 'react';
// import { post } from 'axios';
import axios from 'axios';


class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null, 
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
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
                fileName:''
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

    render() {
        return (
            <form onSubmit={this.handleForSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChanged}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChanged}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChanged}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChanged}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }

}

export default CustomerAdd;