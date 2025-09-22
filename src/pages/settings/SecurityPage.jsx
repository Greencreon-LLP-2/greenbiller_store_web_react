import React, { useState } from "react";
import "../../styles/settings/SecurityPage.css";
import { FaEnvelope, FaGoogle, FaMobileAlt, FaLock, FaCheck } from "react-icons/fa";

const SecurityPage = () => {
    const [twoFactor, setTwoFactor] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

    return (
        <div className="security-container">
            <div className="security-card">
                {/* Password Section */}
                <div className="security-row">
                    <div className="security-info">
                        <FaLock className="security-icon" />
                        <div>
                            <h4>Password</h4>
                            <p>Last Changed 22 July 2023, 10:30 AM</p>
                        </div>
                    </div>
                    <button className=" btn-orange" onClick={() => setShowPasswordModal(true)}>Change Password</button>
                </div>
    {/* Two-Factor */}
                <div className="security-row">
                    <div className="security-info">
                        <FaLock className="security-icon" />
                        <div>
                            <h4>Two Factor</h4>
                            <p>Receive code via SMS or email every time you login</p>
                        </div>
                    </div>
                    <div className="security-buttons-group">
                        <button className={twoFactor ? "btn-Disable" : "btn-Enable"} onClick={() => setTwoFactor(!twoFactor)}>
                            {twoFactor ? "Disable" : "Enable"}
                        </button>
                        <div
                            className={twoFactor ? "security-toggle enabled" : "security-toggle"}
                            onClick={() => setTwoFactor(!twoFactor)}
                        ></div>
                    </div>
                </div>

               
               
                {/* Google Authentication */}
                <div className="security-row">
                    <div className="security-info">
                        <FaGoogle className="security-icon" />
                        <div>
                            <h4>Google Authentication</h4>
                            <p>Connect to Google</p>
                        </div>
                    </div>
                    <div className="security-buttons-group">
                        <button
                            className={googleAuth ? "btn-connected" : "btn-connect"}
                            onClick={() => setGoogleAuth(!googleAuth)}
                        >
                            {googleAuth ? "Connected" : "Connect"}
                        </button>
                        <div
                            className={googleAuth ? "security-toggle enabled" : "security-toggle"}
                            onClick={() => setGoogleAuth(!googleAuth)}
                        ></div>
                    </div>
                </div>


                {/* Phone Verification */}
                <div className="security-row">
                    <div className="security-info">
                        <FaMobileAlt className="security-icon" />
                        <div>
                            <h4>Phone Number Verification</h4>
                            <p>Verified Mobile Number: +81699799974</p>
                        </div>
                    </div>
                    <div className="security-buttons-group">
                        <FaCheck className="checkmark-icon" />
                        <button className="btn-orange" onClick={() => setShowPhoneModal(true)}>Change</button>
                        <button className="btn-red">Remove</button>
                    </div>
                </div>

                {/* Email Verification */}
                <div className="security-row">
                    <div className="security-info">
                        <FaEnvelope className="security-icon" />
                        <div>
                            <h4>Email Verification</h4>
                            <p>Verified Email: info@example.com</p>
                        </div>
                    </div>
                    <div className="security-buttons-group">
                         <FaCheck className="checkmark-icon" />
                        <button className="btn-orange" onClick={() => setShowEmailModal(true)}>Change</button>
                        <button className=" btn-red">Remove</button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showPasswordModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Password</h3>
                        <input type="password" placeholder="Enter New Password" />
                        <div className="modal-actions">
                            <button className="btn-red" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                            <button className="btn-orange">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showPhoneModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Phone Number</h3>
                        <input type="text" placeholder="Enter New Phone" />
                        <div className="modal-actions">
                            <button className="btn-red" onClick={() => setShowPhoneModal(false)}>Cancel</button>
                            <button className="btn-orange">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showEmailModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Email</h3>
                        <input type="email" placeholder="Enter New Email" />
                        <div className="modal-actions">
                            <button className="btn-red" onClick={() => setShowEmailModal(false)}>Cancel</button>
                            <button className="btn-orange">Change</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecurityPage;