# -*- coding: utf-8 -*-

import json

from bson import json_util

from datez import pretty_date
from flask import Flask, request, json, jsonify, Response
import requests
from flask.ext.cors import CORS, cross_origin
import os
import sqlite3 as sql
from datetime import date, datetime
from flask_restful import Resource, Api

app = Flask(__name__)
CORS(app, support_credentials=True)
api = Api(app)


# standard logging
# @app.route('/log/<name>')
# @cross_origin(supports_credentials=True)
# def logging(name):
class log(Resource):
    def get(self, name):
        conn = sql.connect('data.db')
        cursor = conn.cursor()
        moisture = request.args.get('m')
        temp = request.args.get('t')
        distance = request.args.get('d')
        status = request.args.get('s')
        today = datetime.today()
        name = str(name)

        for x in cursor.execute("INSERT INTO log VALUES (NULL , ?, ?, ?, ?, ?, ?, NULL);",
                       (name, float(moisture), float(temp), int(distance), int(status), str(today))):
            print x
            print x[5]
            if x[5] == 1:

                cursor.execute("UPDATE log SET completed_at = ? WHERE id = (SELECT MAX(id) FROM log) AND name=?",
                           (str(today), str(name)))
        conn.commit()
        conn.close()
        return {"response" : 200 }

class stat(Resource):
    def get(self, name):
        conn = sql.connect('data.db')
        cursor = conn.cursor()
        cursor.fetchone()
        x = ''
        print "ok"
        i = 0
        dictwa = {}
        dictwa['data'] = []
        for x in cursor.execute("SELECT * FROM log where (completed_at IS NULL OR trim(completed_at) = '') AND (status=1) ORDER by id DESC LIMIT 1;"):
            print x
            print "hmm"
            dictwa['data'].append({
                i: x
            })
            #print x[6]
            i = i + 1

        conn.commit()
        conn.close()

        resp = Response(json.dumps(dictwa, default=json_util.default),
                        mimetype='application/json')
        return resp

    #
    # @app.route('/update/<name>')
    # @cross_origin(supports_credentials=True)
    # def update(name):
    # update endtime with current time


class update(Resource):
    def get(self):
        print
        today = datetime.today()
        conn = sql.connect('data.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO all_logs SELECT * FROM log;")
        # cursor.execute("DELETE FROM all_logs WHERE completed_at IS NULL OR trim(completed_at) = '';")
        cursor.execute("DELETE FROM log")

        conn.commit()
        conn.close()
        return {"response": 200}


#
# @app.route('/report')
# @cross_origin(supports_credentials=True)
class report(Resource):
    def get(self):
        conn = sql.connect('data.db')
        cursor = conn.cursor()
        cursor.fetchone()
        print "ok"
        i = 0
        dictwa = {}
        dictwa['data'] = []
        for x in cursor.execute("SELECT * FROM all_logs;"):
            print x
            print "hmm"
            dictwa['data'].append({
                i: x

            })
            print x[6]
            i = i + 1
        print str(dictwa)
        conn.commit()
        conn.close()
        # return jsonify(**json.loads(json.htmlsafe_dumps(ret)))
        resp = Response(json.dumps(dictwa, default=json_util.default),
                        mimetype='application/json')
        return resp

api.add_resource(stat, '/status/<name>')
api.add_resource(update, '/update/')
api.add_resource(report, '/report/')
api.add_resource(log, '/log/<name>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=9080)
