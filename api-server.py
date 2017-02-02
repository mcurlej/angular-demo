from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api
from bson.json_util import dumps
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from bson.objectid import ObjectId

client = MongoClient()
db = client["angular-demo"]
app = Flask(__name__, static_folder="./", static_url_path="")
api = Api(app)

# api classes
class Records(Resource):
    def get(self):
        records = db.data.find({})
        return json.loads(dumps(records)), 200

    def post(self):
        record = request.json
        db.data.insert(record)
        return json.loads(dumps(record)), 200

class Record(Resource):
    def put(self, record_id):
        update_data = request.json
        result = db.data.find_one_and_update({"_id": ObjectId(record_id)}, {'$set': update_data}, return_document=ReturnDocument.AFTER)
        return json.loads(dumps(result)), 200

    def delete(self, record_id):
        db.data.remove({"_id": ObjectId(record_id)})
        return {}, 200


# bootstrap dummy data to the mongo db
def init_app():
    db.data.remove({})
    with open('data.json') as data_file:    
        data = json.load(data_file)
    for record in data:
        db.data.insert(record)

    return True

init_app()
# create api endpoints
api.add_resource(Records, '/api/records')
api.add_resource(Record, '/api/records/<string:record_id>')

@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(debug=True)
