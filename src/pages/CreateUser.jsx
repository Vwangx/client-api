import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createUser } from '../redux/actions'

const CreateUser = (props) => {
    // const history = useHistory()
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '',
        password: '' ,
        name: '',
        position: '',
    })   

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }

    const createUserHandler = (e) => {
        try {
            e.preventDefault();
            dispatch(createUser(form))
            // history.push('/users') Подумать как это сделать с помощью Redux 
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>You can create item right here!</h1>

                    <form onSubmit={createUserHandler}>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Email..." name="email" type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Password..." name="password" type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Name..." name="name" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Position..." name="position" type="text" className="form-control" />
                        </div>
                        {/* <div className="form-group">
                            <input onChange={changeHandler} type="file" name="image" className="form-control-file" />
                        </div> */}
                        <button type="submit" className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state
}

// const mapDispatchToProps = {
//     createUser
// }

export default connect(mapStateToProps, null)(CreateUser);