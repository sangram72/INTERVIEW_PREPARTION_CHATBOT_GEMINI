
import { useState } from 'react';
import type{ InterviewConfig } from '../types';

interface InterviewSetupProps {
  onStart: (config: InterviewConfig) => void;
}

const InterviewSetup = ({ onStart }: InterviewSetupProps) => {
  const [topic, setTopic] = useState('');
  const [experience, setExperience] = useState('');
  const [duration, setDuration] = useState(30);

  const handleStart = () => {
    if (!topic.trim() || !experience) {
      return;
    }

    onStart({
      topic,
      experience,
      duration,
    });
  };

  return (
    <div
      style={{
        width: '400px',
        margin: '50px auto',
      }}
    >
      <h3>Interview Prep AI</h3>



      <div style={{ marginBottom: '20px' }}>
        <label>Interview Topic</label>

        <input
          type="text"
          value={topic}
          placeholder="Enter interview topic"
          onChange={(event) => setTopic(event.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Experience</label>

        <select
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
          }}
        >
          <option value="">Select experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Preparation Time</label>

        <select
          value={duration}
          onChange={(event) =>
            setDuration(Number(event.target.value))
          }
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
          }}
        >
          <option value={30}>30 Minutes</option>
          <option value={60}>1 Hour</option>
          <option value={120}>2 Hours</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        disabled={!topic.trim() || !experience}
        style={{
          padding: '10px 20px',
        }}
      >
        Start Preparation
      </button>
    </div>
  );
};

export default InterviewSetup;

