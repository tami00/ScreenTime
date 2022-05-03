from flask import Flask, request, jsonify
from recommender import calculate_recommended
app = Flask(__name__)

@app.route('/flask', methods=['POST'])
def index():
    content = request.get_json()
    titles = content.get('titles')
    similar_movies = calculate_recommended(titles)
    data = {
      "movies": similar_movies
    }
    return jsonify(data)
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)