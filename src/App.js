import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState([]);
    const [view, setView] = useState({});

    // GET DATA API
    const getApi = () => {
        axios
            .get("http://localhost:3001/posts")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // POST DATA API
    const submit_handler = async () => {
        await axios.post("http://localhost:3001/posts", view);
        view.title = "";
        view.author = "";
    };

    // DELETE DATA API
    const delete_handler = async (id) => {
        await axios.delete(`http://localhost:3001/posts/${id}`);
    };

    // PUT DATA API
    const view_handler = (val) => {
        setView(val);
    };
    const update_handler = () => {
        axios
            .put(`http://localhost:3001/posts/${view.id}`, view)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        view.title = "";
        view.author = "";
    };
    useEffect(() => {
        getApi();
    }, [data]);

    const input_handler = (e) => {
        setView({ ...view, [e.target.name]: e.target.value });
    };
const emptyInput = () =>{
    view.title = "";
    view.author = "";
}
    return (
        <>
            <div className="container">
                <h1 className="text-center m-5">TO-DO using AXIOS</h1>
                <div>
                    <input name="title" id="title" value={view.title} className="w-25 my-2 p-2 mx-auto d-block" onChange={input_handler} placeholder="TASK" />
                </div>
                <div>
                    <input name="author" id="author" value={view.author} className="w-25 my-2 p-2 mx-auto d-block" onChange={input_handler} placeholder="CLIENT" />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={submit_handler} className="btn btn-success me-2">
                        ADD NEW DATA
                    </button>
                    <button
                        className="btn btn-dark"
                        onClick={emptyInput}
                    >
                        RESET
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="row m-4">
                    {data?.map((val, index) => {
                        return (
                            <>
                                <div className="col-4 mb-4" key="index">
                                    <div className="p-3 border border-3">
                                        <h4>Task : {val.title}</h4>
                                        <h4>Client : {val.author}</h4>

                                        <div className="mt-3">
                                            <button
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                className="btn btn-warning me-2"
                                                onClick={() => {
                                                    view_handler(val);
                                                }}
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    delete_handler(val.id);
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                Edit Task
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <label htmlFor="title">Task</label>
                                <input name="title" id="title" value={view.title} className="w-100 my-2 p-2 mx-auto d-block" onChange={input_handler} placeholder="TASK" />
                            </div>
                            <div>
                                <label htmlFor="author">Client</label>
                                <input name="author" id="author" value={view.author} className="w-100 my-2 p-2 mx-auto d-block" onChange={input_handler} placeholder="CLIENT" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={emptyInput}>
                                CANCEL
                            </button>
                            <button
                                data-bs-dismiss="modal"
                                className="btn btn-dark me-2"
                                onClick={() => {
                                    update_handler(view.id);
                                }}
                            >
                                UPDATE DATA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};
export default App;


