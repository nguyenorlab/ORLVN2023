import os
import re
import json
import ast
import math
import base64
import datetime
import time
from flask import Flask, Response, request, jsonify, request, send_file
from flask_restx import Api, Resource
from flask_cors import CORS
import mysql.connector
import urllib.request
from mysql_operator import BackupOperator
from utils.constants import DBHOST, DBPORT, DBUSER, DBPASSWORD, DBDATABASE, FOLDER_EXPORT, FOLDER_IMPORT, FOLDER_CATEGORY_HAND_ORIGINAL, FOLDER_CATEGORY_HAND_ANALYZED



backup_operator = BackupOperator(hostname=DBHOST, port=DBPORT, username=DBUSER, password=DBPASSWORD)


app = Flask(__name__)
api = Api(app)
CORS(app)


def connectDB():
    mydb = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='',
        database='3dpose'
    )
    '''mydb = mysql.connector.connect(
        host=DBHOST,
        port=DBPORT,
        user=DBUSER,
        password=DBPASSWORD,
        database=DBDATABASE
    )'''
    return mydb


@app.route("/")
def index():
    return render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")





@api.route('/coortbl', methods=['POST'])
class CoorTbl(Resource):
    def post(self):
        poseName = request.json.get('poseName')
        mydb = connectDB()
        cursor = mydb.cursor()
        queryStr = 'SELECT CSV FROM handdata where hand_category = %s'
        cursor.execute(queryStr, (poseName,))
        data = []
        for result in cursor.fetchall():
            data.append(re.sub("['\[\]]", "", result[0]).split(", "))
        cursor.close()
        mydb.close()
        return jsonify(data)

        return {'message': 'Method not allowed.'}, 405


# add category
@api.route('/addhandpose', methods=['POST'])
class AddHandPose(Resource):
    def post(self):
        try:
            addCategory = request.json.get('addCategory')                  
            mydb = connectDB()
            cursor = mydb.cursor()
            queryStr1 = 'SELECT hand_category FROM hand_categorylist WHERE hand_category = %s'
            cursor.execute(queryStr1, (addCategory,))
            data = []
            for result in cursor.fetchall():
                data.append(result[0])
            cursor.close()
            mydb.close()

            if (len(data)):
                return {'Message': 'duplicate'}
            else:
                mydb = connectDB()
                cursor = mydb.cursor()
                queryStr2 =  'INSERT INTO hand_categorylist (hand_category) VALUES (%s)'
                cursor.execute(queryStr2, (addCategory,))
                mydb.commit()
                cursor.close()
                mydb.close()
                return {'Message': 'success', 'StatusCode': 200}        

        except Exception as e:
            return {'Message': e, 'StatusCode': 400}


# delete category
@api.route('/deletehandpose', methods=['POST'])
class DeleteHandPose(Resource):
    def post(self):
        try:
            delCategory = request.json.get('selectedPoseName')['value']            
            mydb = connectDB()
            cursor = mydb.cursor()
            queryStr = 'DELETE FROM hand_categorylist WHERE id = %s'
            cursor.execute(queryStr, (delCategory,))
            mydb.commit()
            cursor.close()
            mydb.close()
            return {'Message': 'success', 'StatusCode': 200}

        except Exception as e:
            return {'Message': e, 'StatusCode': 400}


# hand data
@api.route('/handdata', methods=['GET', 'POST'])    
class HandData(Resource):
    def get(self):
        mydb = connectDB()
        cursor = mydb.cursor()
        queryStr = 'SELECT original_Base64, analyzed_2d_Base64, JSON, id FROM handdata'
        cursor.execute(queryStr)
        data = []
        for result in cursor.fetchall():
            data.append({                
                'org_img': 'data:image/jpeg;base64,' + result[0],
                'ana_img': 'data:image/jpeg;base64,' + result[1],
                'json': ast.literal_eval(result[2]),
                'id': result[3]
            })
        cursor.close()
        mydb.close()
        return jsonify(data)


    def post(self):
        try:
            id = request.json.get('id')
            poseName = request.json.get('poseName')  
            print(id)          
            mydb = connectDB()
            cursor = mydb.cursor()
            queryStr1 = 'DELETE FROM handdata where id = %s'
            cursor.execute(queryStr1, (id,))
            mydb.commit()
            queryStr2 = 'SELECT original_Base64, analyzed_2d_Base64, JSON, id FROM handdata where hand_category = %s'
            cursor.execute(queryStr2, (poseName,))
            data = []
            for result in cursor.fetchall():
                data.append({                
                    'org_img': 'data:image/jpeg;base64,' + result[0],
                    'ana_img': 'data:image/jpeg;base64,' + result[1],
                    'json': ast.literal_eval(result[2]),
                    'id': result[3]
                })
            cursor.close()
            mydb.close()
            return jsonify(data)

        except Exception as e:
            return {'Message': e, 'StatusCode': 400}

        return {'message': 'Method not allowed.'}, 405



# ポーズ名
@api.route('/handcatelist', methods=['GET', 'POST'])    
class HandCateList(Resource):
    def get(self):
        mydb = connectDB()
        cursor = mydb.cursor()
        queryStr = 'SELECT * FROM hand_categorylist'
        cursor.execute(queryStr)
        data = []
        for result in cursor.fetchall():
            data.append({
                'text': result[1],
                'value': result[0]              
            })
        cursor.close()
        mydb.close()
        return jsonify(data)


    def post(self):
        try:
            poseName = request.json.get('poseName')
            mydb = connectDB()
            cursor = mydb.cursor()
            queryStr = 'SELECT original_Base64, analyzed_2d_Base64, JSON, id FROM handdata where hand_category = %s'
            cursor.execute(queryStr, (poseName,))
            data = []
            for result in cursor.fetchall():
                data.append({  
                    'org_img': 'data:image/jpeg;base64,' + result[0],
                    'ana_img': 'data:image/jpeg;base64,' + result[1],
                    'json': ast.literal_eval(result[2]),                  
                    'id': result[3]
                })
            cursor.close()
            mydb.close()
            return jsonify(data)

        except Exception as e:
            return {'Message': e, 'StatusCode': 400}

        return {'message': 'Method not allowed.'}, 405



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)