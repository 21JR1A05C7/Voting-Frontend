import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const textToType = "If You Do Not Vote, You Have No Right to Complain As You Are Not Part of the System. Vote to participate and bring the change.";
  const typingSpeed = 50; // Adjust typing speed here (milliseconds per character)

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(textToType.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === textToType.length) {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Card style={{ width: '44rem', margin: 'auto', marginTop: '50px' }}>
        <Card.Body>
          <Card.Title>Welcome to the Voting App</Card.Title>
          <Card.Text>
            {typedText}
          </Card.Text>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/vote">
                <Button variant="primary" size="lg" block>Vote Now</Button>
              </Link>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
