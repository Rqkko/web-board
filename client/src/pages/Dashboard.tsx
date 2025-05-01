import React from 'react';
import styles from '../styles/Dashboard.module.css';

import announcementsImg from '../assets/announcements.png';
import eventsImg from '../assets/events.png';
import knowledgeImg from '../assets/knowledge.png';
import clubsImg from '../assets/clubs.png';
import projectsImg from '../assets/projects.png';
import avatarImg from '../assets/Sara.jpg';
import logoImg from '../assets/SIIT.png';
import hottopic from '../assets/hottopic.png';
import design from '../assets/designclub.png';
import back from '../assets/backtoschool.png';

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

      <div className={styles.fourthPanel}>
        <div className={styles.topiccard}>
          <div className={styles.event}>
            <img src={hottopic} alt="" />
            <div className={styles.topicLabel}>
              <span>Events</span>
              <h3>SIIT Back to School</h3>
            </div>
          </div>
          <div className={styles.clubs}>
            <img src={design} alt="" />
            <div className={styles.topicLabel}>
              <span>Clubs</span>
              <h4>UI/UX Design Club</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fifthPanel}>
        <div className={styles.title}>
          <h5>Hot Topics</h5>
          <span>Explore</span>
        </div>
        <div className={styles.hotpic}>
        <img src={hottopic} alt="" />
        </div>
          <div className={styles.label}> 
            <span>Announcements</span>
            <h5>Last Day of Withdraw</h5>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
