from flask import Flask
from flask import request
from db.db_client import Db_client
app = Flask(__name__)

db = Db_client()
db.connect()

@app.route('/request_audio', methods=['POST'])
def request_audio():
    print(request.get_json())
    return '<h1>Hello from Flask & Docker</h2>'

@app.route('/stream/<UUID>', methods=['GET'])
def stream(UUID):
    return db.query('SELECT version()')

@app.route('/stop_stream/<UUID>', methods=['POST'])
def stop_stream(UUID):
    print(UUID)
    return UUID

if __name__ == "__main__":
    app.run(debug=True)
