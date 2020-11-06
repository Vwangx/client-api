import React from 'react';
import { connect } from 'react-redux';
import noavatar from '../static/images/noavatar.png'

const ProfilePage = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>User Page</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="avatar">
                        <picture className="ml-auto mr-auto w-auto">
                            <img className="rounded" src={props.user.avatarURL ? props.user.avatarURL : noavatar} alt="avatar"/>
                        </picture>
                    </div>
                    <div className="info d-flex flex-column align-items-start">
                        <span> <b>Email:</b> {props.user.email} </span>
                        <span> <b>Name:</b> {props.user.name}</span>
                        <span> <b>Position:</b> {props.user.position} </span>

                    </div>
                </div>
                <div className="col-8">Dashboard</div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => {
    return app;
};

export default connect(mapStateToProps, null)(ProfilePage);