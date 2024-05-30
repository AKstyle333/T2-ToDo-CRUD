import React, { useState } from "react";
import fake_data from "./fake_data";

const Appstate = () => {
    const [inputData, setInputData] = useState({});
    const [inputFakeData, setFakeInputData] = useState(fake_data);
    const [tempIndex, setTempIndex] = useState(0);

    //For Get Data From Input Field
    const inputHandler = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    //For Add New Data (===CREATE===)
    const addDataHandler = () => {
        setFakeInputData([...inputFakeData, inputData]);
        // document.getElementById("name").value = "";
        // document.getElementById("age").value = "";
        // inputData.name=""
        // inputData.age=""
    };

    //For Edit(View) Data (===READ===)
    const readDataHandler = (data, index) => {
        setInputData(data);
        setTempIndex(index);
    };

    //For Update(Change) Old Data (===UPDATE===)
    const updateDataHandler = (tempIndex) => {
        inputFakeData.splice(tempIndex, 1, inputData);
        setFakeInputData([...inputFakeData]);
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    };

    //For Delete Data (===DELETE===)
    const deleteDataHandler = (index) => {
        inputFakeData.splice(index, 1);
        setFakeInputData([...inputFakeData]);
    };
    console.log(inputData);

    const emptyInput = () => {
        // inputData.name=""
        // inputData.age=""
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    };
    return (
        <>
            <h1 className="text-center m-5">TO-DO using STATE</h1>
            <div className="container m-3 d-flex justify-content-center ">
                <input value={inputData.name} name="name" id="name" type="text" className="me-3 p-2" onChange={inputHandler} />
                <input value={inputData.age} name="age" id="age" type="text" className=" p-2" onChange={inputHandler} />
                {/* <button className="btn btn-primary mx-3" onClick={() => updateDataHandler(tempIndex)}>
                    Update Data
                </button> */}
                <button className="btn btn-dark ms-2" onClick={addDataHandler}>
                    Add New Data
                </button>
                <button className="btn btn-dark ms-2" onClick={emptyInput}>
                    Reset
                </button>
            </div>
            <div className="container">
                <div className="row">
                    {inputFakeData?.map((data, index) => {
                        return (
                            <div className="col-4">
                                <div className="border rounded rounded-3 p-3 my-3 border-3 ">
                                    <h3>Name : {data.name}</h3>
                                    <h3>Age : {data.age}</h3>
                                    <div className="my-3">
                                        <button className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => readDataHandler(data, index)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteDataHandler(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h5 className="text-end">Code By AK</h5>
            </div>
            {/* model */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                Edit Task
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={emptyInput}></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <label htmlFor="title" className="mb-2">
                                    Name
                                </label>
                                <input value={inputData.name} name="name" id="name" type="text" className="me-3 w-100 p-2" onChange={inputHandler} />
                            </div>
                            <div>
                                <label htmlFor="author" className="my-2">
                                    Age
                                </label>
                                <input value={inputData.age} name="age" id="age" type="text" className=" w-100 p-2" onChange={inputHandler} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={emptyInput}>
                                CANCEL
                            </button>
                            <button data-bs-dismiss="modal" className="btn btn-dark me-2" onClick={() => updateDataHandler(tempIndex)}>
                                UPDATE DATA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Appstate;
