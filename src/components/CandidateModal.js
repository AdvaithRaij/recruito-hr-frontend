import React, { useState } from "react";
import Toast from "./Toast";

const CandidateModal = ({ isOpen, setIsOpen, candidate }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState(candidate?.name);
  const [email, setEmail] = useState(candidate?.email);
  const [phone, setPhone] = useState(candidate?.phone);
  const [skillsQualifications, setSkillsQualifications] = useState(
    candidate?.skills
  );
  const [currentStatus, setCurrentStatus] = useState(candidate?.currentStatus);
  const [salary, setSalary] = useState(candidate?.expectedSalary);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastSuccess, setIsToastSuccess] = useState();
  console.log(candidate);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const body = {
        id: candidate?.id,
        name,
        email,
        phone,
        skillsQualifications,
        currentStatus,
        salary,
      };
      console.log("change");
      fetch("https://recruito-api.onrender.com/update-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (response) => {
        return response
          .json()
          .then((data) => {
            if (data?.affectedRows > 0) {
              setToastMessage("Information successfully saved");
              setIsToastSuccess(true);
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
              }, 3000);
              return;
            } else {
              setToastMessage("Information was not saved");
              setIsToastSuccess(false);
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          show={showToast}
          setShow={setShowToast}
          success={isToastSuccess}
        />
      )}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/5 h-4/5 my-6 mx-auto z-50">
          {/*content*/}
          <div
            style={{ width: "100%" }}
            className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
          >
            <div className="mx-16 max-w-2xl py-32 sm:py-48 lg:py-16">
              <form onSubmit={submitHandler}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        ATS Score: {candidate.score}
                      </h2>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue={name}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={email}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="phonenumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            defaultValue={phone}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Skills / Qualifications
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            defaultValue={skillsQualifications}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setSkillsQualifications(e.target.value)
                            }
                            placeholder="Skill - Experience (Eg: NodeJS - 4, ReactJS - 3, Express.js - 3)
                        "
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="current-status"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Current Status
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="current-status"
                            id="current-status"
                            defaultValue={currentStatus}
                            autoComplete="current-status"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setCurrentStatus(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="expected-salary"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Expected Salary
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="expected-salary"
                            id="expected-salary"
                            defaultValue={salary}
                            autoComplete="expected-salary"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setSalary(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CandidateModal;
