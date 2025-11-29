import announcementsImg from '../assets/announcements.jpg';
import eventsImg from '../assets/events.jpg';
import knowledgeImg from '../assets/knowledges.jpg';
import clubsImg from '../assets/clubs.jpg';
import projectsImg from '../assets/projects.jpg';
import styles from '../styles/Home.module.css';

const rooms = [
  { name: 'Announcements', image: announcementsImg },
  { name: 'Events', image: eventsImg },
  { name: 'Knowledge', image: knowledgeImg },
  { name: 'Clubs', image: clubsImg },
  { name: 'Projects', image: projectsImg },
]

interface RoomPickerProps {
  selectedRoom: number | null;
  setSelectedRoom: (room: number | null) => void;
}

export default function RoomPicker({ selectedRoom, setSelectedRoom }: RoomPickerProps) {
  return (
    <div className={styles.roomPicker}>
      {rooms.map((room, idx) => {
        const isSelected = selectedRoom === idx + 1;

        return (
          <div
            key={idx + 1}
            className={`${styles.roomCard} ${isSelected ? styles.roomCardSelected : ''}`}
            onMouseEnter={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 6px 16px rgba(0, 0, 0, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 12px rgba(0, 0, 0, 0.08)';
              }
            }}
            onClick={() => {
              if (!isSelected) setSelectedRoom(idx + 1);
              else setSelectedRoom(null);
            }}
          >
            <img
              src={room.image}
              alt={room.name}
              style={{
                width: '100%',
                height: '100px',
                borderRadius: '8px',
                marginBottom: '10px',
                objectFit: 'cover',
              }}
            />
            <p>{room.name}</p>
          </div>
        );
      })}
    </div>
  );
}
