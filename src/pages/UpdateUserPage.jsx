import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateCurrentUser, refreshUser } from '../redux/actions';
import { client } from "../index";
import { loader } from 'graphql.macro';

const UpdateUserPage = ({ app: { user } }) => {
    // const dispatch = useDispatch();

    const [form, setForm] = useState({})

    const changeHandler = (e) => {
        setForm({ ...form,  [e.target.name]: e.target.value })
        console.log(form)
    };
    
    const fileHandler = (e) => {
        setForm({...form, image: e.target.files[0] })
        console.log(form)
    }

    const updateUserMutation = loader("../gql/UpdateUserMutation.graphql")
    
    const updateHandler = async (e) => {
        e.preventDefault();
        // dispatch(updateCurrentUser({
        //     id: user.id,
        //     form,
        // }));
        try {
            const { data } = await client.mutate({ mutation: updateUserMutation, variables: { id: user.id, ...form } })
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1> {user.name} - Update: </h1>

                    <form onSubmit={updateHandler}>
                        <div className="form-group">
                            <input onChange={changeHandler} type="text" name="name" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} type="email" name="email" className="form-control" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} type="text" name="position" className="form-control" placeholder="Position"/>
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} type="text" name="bio" className="form-control" placeholder="Bio"/>
                        </div>
                        <div className="form-group">
                            <input onChange={fileHandler} type="file" className="form-control-file" />
                        </div>
                        <button className="btn btn-success" type="submit">Create</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchtoProps = {
    updateCurrentUser,
    refreshUser,
}

export default connect(mapStateToProps, mapDispatchtoProps)(UpdateUserPage);