import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import styles from '../styles/Prioritized.module.css';
import prioritizedImg from '../assets/prioritized.png';

// Define the Slide type
type Slide = {
  image: string;
  title: string;
  description: string;
  dots: boolean[]; // Array to track active dots per slide
};

// Slide data
const slides: Slide[] = [
  {
    image: prioritizedImg,
    title: 'Prioritized Gain Creator',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text...',
    dots: [true, false, false], // Active first dot
  },
  {
    image: prioritizedImg,
    title: 'Smart Decision Engine',
    description: 'It is a long established fact that a reader will be distracted...',
    dots: [false, true, false], // Active second of four
  },
  {
    image: prioritizedImg,
    title: 'Actionable Insights',
    description: 'Many desktop publishing packages and web editors now use Lorem Ipsum...',
    dots: [false, false, true], // Active third dot
  }
];

const Prioritized = (): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // When we reach the last slide, navigate to the Home page
      navigate('/dashboard'); // Redirects to Home page
    }
  };

  const currentSlide = slides[currentIndex]; // Get current slide

  return (
    <div className={styles['prioritized-container']}>
      <div className={styles.illustration}>
        <img
          src={currentSlide.image}
          alt="Location illustration"
          className={styles['prioritized-image']}
        />
      </div>

      <h2 className={styles.title}>{currentSlide.title}</h2>

      <p className={styles.description}>{currentSlide.description}</p>

      <div className={styles.navigation}>
        <span className={styles.skip} onClick={() => navigate('/dashboard')}>
          Skip
        </span>


        {/* Dots Indicator */}
        <div className={styles.dots}>
          {currentSlide.dots.map((isActive, i) => (
            <span
              key={i}
              className={`${styles.dot} ${isActive ? styles.active : styles.inactive}`}
            />
          ))}
        </div>

        <button
          className={styles.next}
          onClick={handleNext}
        >
          {currentIndex === slides.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  );
};



export default Prioritized;
