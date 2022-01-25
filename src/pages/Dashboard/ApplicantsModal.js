import React from 'react'
import './ApplicantsModal.css'

const ApplicantsModal = ({ jobApplicants, setIsApplicantModalActive }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <header>
          <p>Applicants for this job</p>
          <span onClick={() => setIsApplicantModalActive(false)}>X</span>
        </header>
        <hr />
        <section className="flex flex-col">
          <p>Total {jobApplicants.length} applicants</p>
          <div className="popup-container">
            {jobApplicants.length > 0 ? (
              jobApplicants.map(({ email, name, skills, id }) => (
                <div className="card" key={id}>
                  <p>
                    <span className="w-[3.5vw] h-[3.5vw] rounded-full bg-[##D9EFFF] text-white">
                      {name?.toUpperCase().slice(0, 1)}
                    </span>
                    <span>
                      <span className="name">{name}</span>
                      <span className="email">{email}</span>
                    </span>
                  </p>
                  <p>Skills</p>
                  <p className="skills-list">{skills}</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ApplicantsModal
