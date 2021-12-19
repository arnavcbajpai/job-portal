import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { jobAPI, candidateAPI, recruiterAPI } from 'constants/api'
import { selectAuth } from 'redux/auth/auth.selector'
import ApplicantsModal from './ApplicantsModal'
import './Dashboard.css'

const Dashboard = ({ auth }) => {
  console.log('Auth', auth)
  const [jobsList, setJobsList] = useState([])
  const [jobDetail, setJobDetail] = useState({})
  const [jobApplicants, setJobApplicants] = useState([])
  const [page, setPage] = useState(1)
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(null)
  const [userRole] = useState(auth.userRole)
  const [isApplicantModalActive, setIsApplicantModalActive] = useState(false)
  useEffect(() => {
    if (userRole === 'candidate') {
      axios
        .get(candidateAPI, {
          headers: {
            Authorization: auth.token,
          },
        })
        .then((res) => res.json())
        .then((response) => {
          const { code, data, metadata } = response
          if (code === 200) {
            setJobsList([...data])
            setTotalNumberOfPages(Math.ceil(metadata.count / 20))
          }
        })
        .catch((error) => console.log(error))
    } else {
      axios
        .get(recruiterAPI, {
          headers: {
            Authorization: auth.token,
          },
        })
        .then((response) => {
          console.log(response)
          const { data } = response
          if (data.code === 200) {
            setJobsList([...data.data.data])
            setTotalNumberOfPages(Math.ceil(data.data.metadata.count / 20))
          }
        })
        .catch((error) => console.log(error))
    }
  }, [])
  const handleClick = (e) => {
    const jobId = e.target.value
    console.log(userRole, jobId)
    if (userRole === 'candidate') {
      // get job details and then the popup will have the apply to job api
      fetch(jobAPI, {
        method: 'post',
        body: JSON.stringify({ jobId }),
      })
        .then((res) => res.json())
        .then((response) => {
          const { data } = response
          if (data.code === 200) {
            setJobDetail({ ...data })
          }
        })
        .catch((error) => console.log(error))
    } else {
      axios
        .get(`${recruiterAPI}/${jobId}/candidates`, {
          headers: {
            Authorization: auth.token,
          },
        })
        .then((response) => {
          const { data } = response
          console.log(data)
          if (data.code === 200) {
            data?.data?.length > 0
              ? setJobApplicants([...data.data])
              : setJobApplicants([])
            setIsApplicantModalActive(true)
          }
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <div>
      <header className="text-white text-sm ml-[173px] mt-3 flex items-center">
        <ion-icon name="home"></ion-icon> <span className="ml-1">Home</span>
      </header>
      <section className="text-white ml-[173px] mt-6">
        Jobs posted by you
      </section>
      {jobsList.length > 0 ? (
        <div className="flex flex-col justify-center mx-[150px]">
          <section className="flex flex-wrap">
            {jobsList.map(({ title, description, location, id }, index) => (
              <div className="card" key={index}>
                <p className="ml-4 mt-4 text-base ">{title}</p>
                <p className="ml-4 mt-2 text-sm h-16 opacity-80">
                  {description}
                </p>
                <p className="flex justify-between">
                  <span className="inline-flex items-center text-dodger-blue-500 text-sm ml-4">
                    <ion-icon name="location"></ion-icon>
                    <span className="opacity-80">{location}</span>
                  </span>
                  <button
                    className="ml-auto mr-4 text-xs w-32 bg-[#43AFFF33] px-3 py-2 rounded"
                    value={id}
                    onClick={handleClick}
                  >
                    {userRole === 'recruiter'
                      ? 'View Applicants'
                      : 'Apply for jobs'}
                  </button>
                </p>
              </div>
            ))}
          </section>
          <footer className="w-full justify-center">
            {totalNumberOfPages}
          </footer>
        </div>
      ) : userRole === 'recruiter' ? (
        <div className="">
          Your posted job will show here!
          <Link to="/post-job">Post a job</Link>
        </div>
      ) : (
        <div>No jobs to show!!</div>
      )}

      {isApplicantModalActive && (
        <ApplicantsModal
          jobApplicants={jobApplicants}
          setIsApplicantModalActive={setIsApplicantModalActive}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // handleUserLogin: (state) => dispatch(handleUserLogin(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
