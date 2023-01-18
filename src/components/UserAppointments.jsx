import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isStyledComponent } from "styled-components";
import "./UserAppointment.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [deleted]);

  const handleCancel = (id) => {
    fetch(`http://localhost:3000/appointments/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        alert("Appointment has been cancelled");
        setDeleted(!deleted);
      } else {
        alert("Appointment was not cancelled");
      }
    });
  };
  console.log(appointments);
  return (
    <div className="up">
      <div className="row m-auto justify-center">
        {appointments.map((ap) => {
          return (
            <div
              key={ap.id}
              className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 appointment"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="icon-box icon-box-green">
                <div className="icon">
                  <i className="bx bx-tachometer"></i>
                </div>
                <h4 className="title">
                  <a href="">Dr. {ap.doctor.name}</a>
                </h4>
                <p className="description">
                  <h5>Day: {ap.appointment_date}</h5>
                  <h5>Time: {ap.appointment_time}</h5>
                  <h5>Issue: {ap.issue}</h5>
                  <h5>Status: {ap.status}</h5>
                  <button
                    onClick={() => handleCancel(ap.id)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserAppointments;
