import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { gql, useMutation } from "@apollo/client";
import Noty from 'noty';

export const CreatePage = () => {

    const history = useHistory()

    const [form, setForm] = useState({
        name: '',
        description: '' ,
        slug: '',
        text: '',
    })   

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const createCase = gql`
        mutation {
            caseStudy {
                create(input: {
                    name: "${form.name}",
                    description: "${form.description}",
                    slug: "${form.slug}",
                    text: "${form.text}"
                }) {
                    id
                }
            }
        }
    `

    const [gqlCreate, { data }] = useMutation(createCase)

    const createHandler = async (event) => {
        event.preventDefault()
        try {
            await gqlCreate(createCase)
            const notyfy = new Noty({
                text: "Case was Created!",
                layout: "topRight",
                theme: "bootstrap-v4",
                type: "success",
                progressBar: true,
                timeout: 2500,
            })
            notyfy.show()
            history.push('/cases')
        } catch (e) {
            console.log(e)
            const notyfy = new Noty({
                text: "Something went wrong...",
                layout: "topRight",
                theme: "bootstrap-v4",
                type: "error",
                progressBar: true,
                timeout: 2500,
            })
            notyfy.show()
        }
    }

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>You can create item right here!</h1>

                    <form onSubmit={createHandler}>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Name" name="name" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Description" name="description" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Slug" name="slug" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={changeHandler} placeholder="Text" name="text" type="text" className="form-control" />
                        </div>
                        {/* <div className="form-group">
                            <input onChange={changeHandler} type="file" name="imageURL" class="form-control-file" />
                        </div> */}
                        <button type="submit" className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}