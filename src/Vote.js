import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Vote.css'; // Import CSS file
import { Toaster, toast } from 'react-hot-toast';

const Vote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aadhar, setAadhar] = useState('');
  const [parties, setParties] = useState([
    { partyName: 'Janasena', partySymbol: 'jsp.png' },
    { partyName: 'Telugu Desam Party', partySymbol: 'tdp.png' },
    { partyName: 'YSRCP', partySymbol: 'ycp.jpeg' },
    { partyName: 'BJP', partySymbol: 'bjp.jpg' },
    { partyName: 'Congress', partySymbol: 'congress.png' },
    { partyName: 'NOTA', partySymbol: 'nota.png' },
  ]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false); // State to track if vote is submitted

  useEffect(() => {
    if (!location.state || !location.state.aadhar) {
      navigate('/aadhar-check'); // Redirect to AadharCheck if no aadhar is found in state
    } else {
      setAadhar(location.state.aadhar);
    }
  }, [location.state, navigate]);

  const handleVote = async (party) => {
    if (!party) {
      setMessage('Please select a party to vote');
      return;
    }

    setSelectedParty(party); // Set selected party for confirmation modal
    setShowModal(true); // Show confirmation modal
  };

  const confirmVote = async () => {
    try {
      const response = await axios.post('http://localhost:5000/vote', { aadhar, party: selectedParty.partyName });
      setMessage(response.data.message);
      handleCloseModal();
      toast.success("Voted Successfully"); // Display success toast message
      setVoteSubmitted(true); // Disable all vote buttons after successful vote
      setTimeout(() => {
        navigate('/vote-count'); // Redirect to /votecounts after 5 seconds
      }, 5000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
    }
  };

  const handleCloseModal = () => {
    setSelectedParty(null);
    setShowModal(false);
  };

  return (
    <div className="vote-container">
      <h1>Vote for Your Party</h1>
      <table className="party-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Party Logo</th>
            <th>Party Name</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={party.partyName}>
              <td>{index + 1}</td>
              <td><img src={party.partySymbol} alt={party.partyName} className="party-logo" /></td>
              <td>{party.partyName}</td>
              <td><button className="btn btn-primary" onClick={() => handleVote(party)} disabled={voteSubmitted}>Vote</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Confirm Vote</h2>
            <p>Are you sure you want to vote for {selectedParty && selectedParty.partyName}?</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={confirmVote}>Vote</button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-success mt-3">{message}</p>
      <Toaster /> {/* Place the Toaster component to display toasts */}
    </div>
  );
};

export default Vote;
