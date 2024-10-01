from flask import Flask, jsonify, request
import tweepy
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Fetch Twitter API credentials from environment variables
consumer_key = os.getenv('API_KEY')
consumer_secret = os.getenv('API_SECRET_KEY')
access_token = os.getenv('ACCESS_TOKEN')
access_token_secret = os.getenv('ACCESS_TOKEN_SECRET')

# Initialize Flask app
app = Flask(__name__)

# Authenticate with Twitter using Tweepy
auth = tweepy.OAuth1UserHandler(
    consumer_key, consumer_secret,
    access_token, access_token_secret
)

api = tweepy.API(auth, wait_on_rate_limit=True)

@app.route('/getTweets', methods=['GET'])
def get_tweets():
    twitter_id = request.args.get('twitter_id')
    
    if not twitter_id:
        return jsonify({"error": "Twitter ID is required"}), 400

    try:
        # Fetch user tweets using Tweepy API
        tweets = api.user_timeline(screen_name=twitter_id, count=5, tweet_mode='extended')

        # Prepare response data
        tweet_list = [
            {
                "user": tweet.user.name,
                "date_created": tweet.created_at,
                "tweet": tweet.full_text
            }
            for tweet in tweets
        ]

        return jsonify({"tweets": tweet_list}), 200

    except tweepy.TweepyException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
