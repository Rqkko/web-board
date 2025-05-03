import React from 'react'

import announcementsImg from '../assets/announcements.png';
import eventsImg from '../assets/events.png';
import knowledgeImg from '../assets/knowledge.png';
import clubsImg from '../assets/clubs.png';
import projectsImg from '../assets/projects.png';

const rooms = [
  { name: 'Announcements', image: announcementsImg },
  { name: 'Events', image: eventsImg },
  { name: 'Knowledge', image: knowledgeImg },
  { name: 'Clubs', image: clubsImg },
  { name: 'Projects', image: projectsImg },
  // { name: 'Hottopic' , image: hottp},
  // { name: 'Design', image: design},
  // { name: 'backto', image: back}
]

interface RoomPickerProps {
  selectedRoom: number | null;
  setSelectedRoom: (room: number | null) => void;
}

export default function RoomPicker({ selectedRoom, setSelectedRoom }: RoomPickerProps) {

  return (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: 'medium',
          justifyContent: 'center',
        }}>
          {rooms.map((room, idx) => (
            <div key={idx+1} style={{
              width: '120px',
              background: selectedRoom === idx+1 ? '#f0f0f0' : 'white',
              padding: '15px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow:
                selectedRoom === idx+1
                  ? '0 6px 16px rgba(0, 0, 0, 0.12)'
                  : '0 4px 12px rgba(0, 0, 0, 0.08)',
              transform: selectedRoom === idx ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (selectedRoom !== idx+1) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 6px 16px rgba(0, 0, 0, 0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedRoom !== idx+1) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onClick={() => setSelectedRoom(idx+1 )}
            >
              <img src={room.image} alt={room.name} style={{
                width: '100%',
                height: '100px',
                borderRadius: '8px',
                marginBottom: '10px',
                objectFit: 'cover'
              }} />
              <p>{room.name}</p>
            </div>
          ))}
        </div>
  )
}