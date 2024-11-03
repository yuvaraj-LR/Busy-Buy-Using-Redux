import React from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-xl-5 col-xxl-5 col-xxxl-4 bg-white p-4 rounded-4 shadow-lg">
                    <div className="d-flex align-items-center pb-3">
                        <img src="./logo.png" alt="Logo" className="login_logo"/>
                    </div>
                    <p className="text-muted pb-4">Enter your credentials to access and utilize all account features.</p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light text-muted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </span>
                                <input type="email" className="form-control" id="email" placeholder="name@company.com" autoComplete="off" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light text-muted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                        <path d="M12 8v8"></path>
                                        <path d="m8.5 14 7-4"></path>
                                        <path d="m8.5 10 7 4"></path>
                                    </svg>
                                </span>
                                <input type="password" className="form-control" id="password" placeholder="••••••••••" autoComplete="new-password" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-4">Sign In</button>
                        <p className="text-muted text-center">Don't have an accout yet? <Link className="login_redirect" to="/signup">Sign Up</Link></p>
                    </form>
                    <div className="d-flex align-items-center my-4">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-muted fw-medium">OR</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button type="button" className="btn btn-dark d-flex align-items-center gap-2 w-100">
                            <i className="fa-brands fa-google"></i>
                            <span className="mx-auto">Google</span>
                        </button>
                        <button type="button" className="btn btn-info d-flex align-items-center gap-2 w-100">
                            <i className="fa-brands fa-facebook fa-lg"></i>
                            <span className="mx-auto">Facebook</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn