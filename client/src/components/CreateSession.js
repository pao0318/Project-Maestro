import React, { useContext, useEffect, useRef, useState } from "react";
import { AddSession } from "./AddSession";
import Sessionitem from "./SessionItems";
import sessionContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

export default function CreateSession(props) {
  const context = useContext(sessionContext);
  let navigate = useNavigate();
  const { sessions, getSessions, editSession } = context;
  const [session, setsession] = useState({
    _id: "",
    creator: "",
    title: "",
    subject: "",
    topic: "",
    classenrolled: "",
    date: "",
    time: "",
    description: "",
    link: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    editSession(session._id, session.creator, session.title,
    session.subject,
    session.topic,
    session.classenrolled,
    session.date,
    session.time,
    session.description,
    session.link );
    props.showAlert("Updated Succesfully", "success");
  };
  const onChange = (e) => {
    setsession({ ...session, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getSessions();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateSession = (currentSession) => {
    ref.current.click();
    setsession(currentSession);
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddSession showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Edit session modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Session
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleClick}>
              <div className="mb-3">
                  <label htmlFor="creator" className="form-label">
                    creator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="creator"
                    name="creator"
                    value={session.creator}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={session.title}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={session.subject}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">
                    topics
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="topic"
                    name="topic"
                    value={session.topic}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="classenrolled" className="form-label">
                    class
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="classenrolled"
                    name="classenrolled"
                    value={session.classenrolled}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    name="date"
                    value={session.date}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    name="time"
                    value={session.time}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={session.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="link" className="form-label">
                    links
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    name="link"
                    value={session.link}
                    onChange={onChange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Sessions</h1>
        <div className="container mx-1">
          <h6>{sessions.length === 0 && "No Sessions to Display"}</h6>
        </div>
        {sessions.map((session) => {
          return (
            <Sessionitem
              key={session._id}
              updateSession={updateSession}
              session={session}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}
