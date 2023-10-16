import React, { Component } from "react";
import axios from "axios";
class MainComponent extends Component {
  state = {
    form: { method: "GET", url: "", data1: "" },
    response: {},
    timeTaken: "",
    error: false,
    header: 1,
    dataInputType: "",
    key1: "",
    key2: "",
    key3: "",
    value1: "",
    value2: "",
    value3: "",
    description1: "",
    description2: "",
    description3: "",
  };

  headerDataChange = (a) => {
    let s1 = { ...this.state };
    let { currentTarget: input } = a;
    s1[input.name] = input.value;
    this.setState(s1);
  };

  makeDropDown = (arr, value, name, label) => (
    <div className="form-group ">
      <select
        className="form-control bg-secondary bg-opacity-10"
        name={name}
        value={value}
        onChange={this.handleChange}
      >
        {arr.map((a) => (
          <option>{a}</option>
        ))}
      </select>
    </div>
  );

  handleChange = (a) => {
    let s1 = { ...this.state };
    let { currentTarget: input } = a;
    s1.form[input.name] = input.value;
    this.setState(s1);
  };

  submitFunction = () => {
    let { method, url, data1 } = this.state.form;
    let { key1, key2, key3, value1, value2, value3 } = this.state;

    let json = {};
    if (key1) {
      json[key1] = +value1;
    }
    if (key2) {
      json[key2] = value2;
    }
    if (key3) {
      json[key3] = value3;
    }
    if (method == "GET") {
      let response = this.getData(url, json);
    } else if (method == "POST") {
      let response = this.postData(url, data1, json);
    } else if (method == "PUT") {
      let response = this.putData(url, data1, json);
    } else if (method == "DELETE") {
      let response = this.DeleteData(url, json);
    }
  };

  getData = (url, json) => {
    let baseUrl = "http://localhost:2410/getData";
    let obj = { url: url, json: json };
    let startTime = performance.now();
    axios
      .post(baseUrl, obj)
      .then((result) => {
        let endTime = performance.now();
        this.setState({ response: result, timeTaken: endTime - startTime });
      })
      .catch((err) => {
        let endTime = performance.now();
        this.setState({
          response: err.response,
          timeTaken: endTime - startTime,
        });
      });
  };

  postData = (url, data1, json) => {
    let baseUrl = "http://localhost:2410/postData";
    let obj = { url: url, json: json, data: data1 };
    let startTime = performance.now();
    axios
      .post(baseUrl, obj)
      .then((result) => {
        let endTime = performance.now();
        this.setState({ response: result, timeTaken: endTime - startTime });
      })
      .catch((err) => {
        let endTime = performance.now();
        this.setState({
          response: err.response,
          timeTaken: endTime - startTime,
        });
      });
  };
  DeleteData = (url, json) => {
    let baseUrl = "http://localhost:2410/deleteData";
    let obj = { url: url, json: json };
    let startTime = performance.now();
    axios
      .post(baseUrl, obj)
      .then((result) => {
        let endTime = performance.now();
        this.setState({ response: result, timeTaken: endTime - startTime });
      })
      .catch((err) => {
        let endTime = performance.now();
        this.setState({
          response: err.response,
          timeTaken: endTime - startTime,
        });
      });
  };

  putData = (url, data1, json) => {
    let baseUrl = "http://localhost:2410/putData";
    let obj = { url: url, json: json, data: data1 };
    let startTime = performance.now();
    axios
      .post(baseUrl, obj)
      .then((result) => {
        let endTime = performance.now();
        this.setState({ response: result, timeTaken: endTime - startTime });
      })
      .catch((err) => {
        let endTime = performance.now();
        this.setState({
          response: err.response,
          timeTaken: endTime - startTime,
        });
      });
  };
  changeheader = (val) => {
    this.setState({ header: val });
  };

  makeRadioBox = (arr, values, name) => (
    <div>
      {arr.map((a) => {
        return (
          <div className="form-check form-check-inline" key={a}>
            <input
              className="form-check-input"
              type="radio"
              value={a}
              name={name}
              checked={values.indexOf(a) >= 0}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{a}</label>
          </div>
        );
      })}
    </div>
  );
  makeInput = (value, name, placeholder) => (
    <input
      className="form-control"
      name={name}
      value={value}
      onChange={this.headerDataChange}
      placeholder={placeholder}
    />
  );
  render() {
    let methods = ["GET", "POST", "PUT", "DELETE"];
    let { method, url, data1 } = this.state.form;
    let radioOptions = [
      "none",
      "form-data",
      "x-www..form-uri-encoded",
      "raw",
      "binary",
      "GraphQL",
    ];

    let {
      header,
      dataInputType,
      timeTaken,
      key1,
      key2,
      key3,
      value1,
      value2,
      value3,
      description1,
      description2,
      description3,
      response,
    } = this.state;

    let { status = "", data = {} } = response;
    return (
      <div className="container">
        <h2>Fake PostMan</h2>
        <br />
        <div className="row">
          <div className="col-4"></div>
          <div className="col-8">
            <div className="row ">
              <div className="col-2">
                {this.makeDropDown(methods, method, "method", "Method")}
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  name="url"
                  value={url}
                  onChange={this.handleChange}
                  placeholder="Enter Request URL"
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => this.submitFunction()}
                >
                  Submit
                </button>
              </div>
            </div>

            <br />
            <div className="row ">
              <div
                className="col-2 text-center "
                style={{ cursor: "pointer" }}
                onClick={() => this.changeheader(0)}
              >
                Query-Params
              </div>
              <div
                className="col-2 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => this.changeheader(1)}
              >
                Headers
              </div>
              <div
                className="col-2 text-center "
                style={{ cursor: "pointer" }}
                onClick={() => this.changeheader(2)}
              >
                Body
              </div>
            </div>
            <br />
            {this.makeRadioBox(radioOptions, dataInputType, "dataInputType")}
            <br />
            {header == 2 ? (
              <textarea
                value={data1}
                name="data1"
                className="form-control bg-secondary bg-opacity-10"
                style={{ height: 150 }}
                onChange={this.handleChange}
              />
            ) : (
              <div className="container border">
                <div className="row p-2">
                  <div className="col-3 border ">
                    <span className="m-2">
                      <b>Key</b>
                    </span>
                  </div>
                  <div className="col-6 border">
                    <span className="m-2">
                      <b>Value</b>
                    </span>
                  </div>
                  <div className="col-3 border">
                    <span className="m-2">
                      <b>Description</b>
                    </span>
                  </div>

                  <div className="col-3">
                    {this.makeInput(key1, "key1", "Key")}
                  </div>
                  <div className="col-6">
                    {this.makeInput(value1, "value1", "Value")}
                  </div>
                  <div className="col-3">
                    {this.makeInput(
                      description1,
                      "description1",
                      "Description"
                    )}
                  </div>

                  <div className="col-3">
                    {this.makeInput(key2, "key2", "Key")}
                  </div>
                  <div className="col-6">
                    {this.makeInput(value2, "value2", "Value")}
                  </div>
                  <div className="col-3">
                    {this.makeInput(
                      description2,
                      "description2",
                      "Description"
                    )}
                  </div>

                  <div className="col-3">
                    {this.makeInput(key3, "key3", "Key")}
                  </div>
                  <div className="col-6">
                    {this.makeInput(value3, "value3", "Value")}
                  </div>
                  <div className="col-3">
                    {this.makeInput(
                      description3,
                      "description3",
                      "Description"
                    )}
                  </div>
                </div>
              </div>
            )}

            <br />
            <div className="row">
              <div className="col-2 p-1">
                <h6 className="text-muted">Response</h6>
              </div>
              <div className="col-5"></div>
              <div className="col-2 p-1">
                Status :
                <span className="text-success">
                  {status
                    ? " " +
                      status +
                      (status == "200"
                        ? " Ok"
                        : status == "400"
                        ? " Bad Request"
                        : status == "401"
                        ? " Unauthorized"
                        : status == "404"
                        ? " Not Found"
                        : " ")
                    : ""}
                </span>
              </div>
              <div className="col-2 p-1">
                Time :
                <span className="text-success">
                  {timeTaken ? " " + timeTaken + " ms" : ""}
                </span>
              </div>
            </div>

            <textarea
              value={JSON.stringify(data)}
              className="form-control bg-secondary bg-opacity-10"
              style={{ height: 150 }}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent;
