import React, { useState, useEffect } from 'react';
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

function AccommodationsStats() {
  const [accommodations, setAccommodations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:3000/api/accommodations') 
      .then(response => response.json())
      .then(data => {
        setAccommodations(data);
        fetchUsers(data);
      })
      .catch(error => console.error('Error fetching accommodations:', error));
  }, []);

  const fetchUsers = async (accommodations) => {
    try {
      const usersData = await Promise.all(
        accommodations.map(accommodation => 
          fetch(`http://localhost:3000/api/users/${accommodation.host_id}`)
            .then(response => response.json())
        )
      );
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.accommodation_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredAccommodations].sort((a, b) => {
    if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const removeAccommodations = async (accommodationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/accommodations/delete/${accommodationId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        alert(
          "you cannot remove a listing if it has pending reports or upcoming reservations"
        );
        throw new Error("ERROR DELETING LISTING:NETWORK ERROR\n ");
      }
      console.log("listing deleted");
      setAccommodations((prevAccommodations) =>
        prevAccommodations.filter((accommodation) => accommodation.id !== accommodationId)
      );
    } catch (error) {
      console.error("error deleting listing: " + error);
    }
  };
  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this listing?")) {
      removeAccommodations(id);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className='the-Stats'>
        <Link className="link-decoration" to="/AdminStats">
          <div className='users-stats'>USERS </div>
        </Link>
        <Link className="link-decoration" to="/AccommodationsStats">
          <div className='accommodations-StatsB'>ACCOMMODATIONS</div>
        </Link>
        <Link className="link-decoration" to="/reports">
          <div className='users-stats'>REPORTS </div>
        </Link>
      </div>

      <div className='stats'>
        <div className='statsheader'>
          <div className='statsSearch'>
            <div className="user-input">
              <input
                type="text"
                placeholder="Search By Accommodation Type . . . "
                value={searchTerm}
                onChange={handleInputChange} 
              />
              <div><ImSearch /></div>
            </div>
          </div>
          <div className='userstats'>
            <div className='emailstats' onClick={() => handleSort('first_name')}>
              Host Name {sortConfig.key === 'first_name' && (
                  sortConfig.direction === 'ascending' ? '▲' : '▼'
                )}
            </div>
            <div className='otherstats' onClick={() => handleSort('location')}>
              Location {sortConfig.key === 'location' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </div>
            <div className='otherstats' onClick={() => handleSort('payment_type')}>
              Payment Type {sortConfig.key === 'payment_type' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </div>
            <div className='otherstats' onClick={() => handleSort('accommodation_type')}>
              Accommodation Type {sortConfig.key === 'accommodation_type' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </div>
            <div className='idstats' onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </div>
            <div className='idstats' >
              Remove
            </div>
          </div>
        </div>
        
        {sortedUsers.map((accommodation, index) => (
          <div className='userstats' key={accommodation.id}>
            <div className='profileclick' onClick={() => navigate(`/listings/${accommodation.id}`)}>
              <div className='emailstats'>{users[index]?.first_name}</div>
              <div className='otherstats'>{accommodation.location}</div>
              <div className='otherstats'>{accommodation.payment_type}</div>
              <div className='otherstats'>{accommodation.accommodation_type}</div>
              <div className='idstats'>{accommodation.id}</div>
            </div>
            <div className='idstats'>
              <button className="admin_ban" onClick={() => handleRemove(accommodation.id)} >REMOVE</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AccommodationsStats;