import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { useState } from 'react';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '2.5rem 0' }}>
        <span
          style={{
            marginInline: 'auto',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: '#f3f4f6',
            color: '#F83002',
            fontWeight: '500',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          University 1st Job Hunt Website
        </span>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          lineHeight: '1.2',
          color: '#333',
          margin: '1rem 0',
        }}>
          Search, Apply & <br />
          Get Your <span style={{ color: "#6A38C2" }}>Dream Jobs</span>
        </h1>

        <p style={{
          color: "#555",
          fontSize: '1.125rem',
          marginTop: '1rem',
          marginBottom: '1.5rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6',
        }}>
          A comprehensive job portal for Chandigarh University students.
        </p>

        <div style={{
          display: 'flex',
          width: '50%',
          maxWidth: '600px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB',
          paddingLeft: '0.75rem',
          borderRadius: '9999px',
          alignItems: 'center',
          gap: '1rem',
          margin: '0 auto',
          transition: 'all 0.3s ease',
        }}>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '9999px',
              color: '#333',
              transition: '0.3s ease',
            }}
          />
          <Button
            onClick={searchJobHandler}
            style={{
              borderTopRightRadius: '9999px',
              borderBottomRightRadius: '9999px',
              backgroundColor: '#6A38C2',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E2CA8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6A38C2')}
          >
            <Search style={{ height: '1.25rem', width: '1.25rem', color: '#fff' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;