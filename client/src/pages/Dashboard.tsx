import React from 'react';
import styles from '../styles/Dashboard.module.css';

import announcementsImg from '../assets/announcements.png';
import eventsImg from '../assets/events.png';
import knowledgeImg from '../assets/knowledge.png';
import clubsImg from '../assets/clubs.png';
import projectsImg from '../assets/projects.png';
import avatarImg from '../assets/Sara.jpg';
import logoImg from '../assets/SIIT.png';

const rooms = [
  { name: 'Announcements', image: announcementsImg },
  { name: 'Events', image: eventsImg },
  { name: 'Knowledge', image: knowledgeImg },
  { name: 'Clubs', image: clubsImg },
  { name: 'Projects', image: projectsImg },
];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} alt="SIIT" />
          <h1>WebBoard</h1>
        </div>
      </header>

      {/* Second Panel: Greeting, search bar, and avatar in one row */}
      <div className={styles.secondPanel}>
        <div className={styles.greeting}>
          <h2>Hi Sara!</h2>
          <p>What do you want to do today?</p>
        </div>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={avatarImg} alt="Sara" />
        </div>
      </div>

      <input type="text" placeholder="Search..." className={styles.search} />

      {/* Third Panel: Rooms */}
      <div className={styles.thirdPanel}>
        <h3>Rooms</h3>
        <div className={styles.rooms}>
          {rooms.map((room, idx) => (
            <div key={idx} className={styles.roomCard}>
              <img src={room.image} alt={room.name} />
              <p>{room.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
