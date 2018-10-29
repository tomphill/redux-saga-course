import React, {Component} from 'react';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import {connect} from 'react-redux';
import {getUsersRequest, createUserRequest, deleteUserRequest} from '../actions/users';

class App extends Component {
    constructor(props){
        super(props);
        this.props.getUsersRequest();
    }

    handleCreateUserSubmit = ({firstName, lastName}) => {
        console.log(firstName, lastName);
        this.props.createUserRequest({
            firstName,
            lastName
        });
    };

    handleDeleteUserClick = (userId) => {
        console.log(userId);
        this.props.deleteUserRequest(userId);
    };

    render(){
        const users = this.props.users;
        return (
            <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
                <h2>
                    Users
                </h2>
                <NewUserForm onSubmit={this.handleCreateUserSubmit} />
                {!!users.items && !!users.items.length &&
                <UserList onDeleteUserClick={this.handleDeleteUserClick} users={users.items}/>
                }
            </div>
        );
    }
}

export default connect(({users}) => ({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest
})(App);