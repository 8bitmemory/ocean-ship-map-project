from flask import Flask,jsonify,request
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

# global ship list
shipsList = []

# read csv file
with open('ais_sample.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # create smaller list of dictionaries with only the relevant info
    for x,row in enumerate(reader):
        shipsList.append({'id':str(x),'shipId':row['id'],'mmsi':row['mmsi'],'x':row['x'],'y':row['y']})


# ping to see if server is up
@app.route("/api/ping")
def ping():
    response = {
        "success": True
    }
    return jsonify(response),200

# endpoint to return all ships info
@app.route("/api/ships")
def get_post():

    # accept mmsi key as a query parameter
    mmsiParam = request.args.get('mmsi',None)

    # filter the ships by their mmsi key
    if mmsiParam != None:
        filteredList = []
        for ship in shipsList:
            if ship['mmsi'] == mmsiParam:
                filteredList.append(ship)
        filteredDict = {'ships':filteredList}
        return jsonify(filteredDict), 200     

    shipsDict = {'ships' : shipsList}
    return jsonify(shipsDict), 200 