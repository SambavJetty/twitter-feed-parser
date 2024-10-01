import React, { useState } from 'react';
import axios from 'axios';

const Twitter = () => {
    const [twitterId, setTwitterId] = useState('');
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState('');

    const fetchTweets = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tweets', {
                params: { twitter_id: twitterId }
            });
            setTweets(response.data.tweets);
            setError('');
        } catch (err) {
            setError('Failed to fetch tweets');
        }
    };

    return (
        <div>
            <h1>Fetch Twitter Tweets</h1>
            <input
                type="text"
                placeholder="Enter Twitter ID"
                value={twitterId}
                onChange={(e) => setTwitterId(e.target.value)}
            />
            <button onClick={fetchTweets}>Get Tweets</button>

            {error && <p>{error}</p>}

            {tweets.length > 0 && (
                <div>
                    <h2>Tweets:</h2>
                    <ul>
                        {tweets.map((tweet, index) => (
                            <li key={index}>
                                <strong>{tweet.user}</strong>: {tweet.tweet} <br />
                                <small>{new Date(tweet.date_created).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Twitter;
