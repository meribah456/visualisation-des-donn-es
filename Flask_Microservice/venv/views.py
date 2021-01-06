from flask import Flask,request,Response,jsonify
from flask_restful import Resource, Api
from sklearn.preprocessing import LabelEncoder,StandardScaler
import pandas as pd
import os,json
app = Flask(__name__)
api = Api(app)
class LabelEnc(Resource):
	@app.route('/LabelEncoder', methods=['POST'])
	def get():
		file = request.files['file']
		columnName = str(request.form.get('columnName'))
		print("____________________________________________________",columnName)
		data = pd.read_csv(file)
		encoder = LabelEncoder()
		data_cat = data[columnName]
		data_cat_encoded = encoder.fit_transform(data_cat)
		data[columnName] = data_cat_encoded
		encoded_file = open('file.csv','w')
		data.to_csv(encoded_file,index=False)
		encoded_file.close();
		encoded_file = open('file.csv','r')
		return Response(bytes(encoded_file.read(),'utf-8'), mimetype='application/octet-stream')
	@app.route('/FillNaNMean', methods=['POST'])
	def Mean():
		file = request.files['file']
		data = pd.read_csv(file)
		if(request.form.get('columnName')!="null"):
			columnName = str(request.form.get('columnName'))
			data[columnName]=data[columnName].fillna(data[columnName].mean())
		else:
			data=data.fillna(data.mean())
		encoded_file = open('file.csv','w')
		data.to_csv(encoded_file,index=False)
		encoded_file.close();
		encoded_file = open('file.csv','r')
		return Response(bytes(encoded_file.read(),'utf-8'), mimetype='application/octet-stream')

	@app.route('/FillNaNMedian', methods=['POST'])
	def Median():
		file = request.files['file']
		data = pd.read_csv(file)
		if(request.form.get('columnName')!='null'):
			columnName = str(request.form.get('columnName'))
			data[columnName]=data[columnName].fillna(data[columnName].median())
		else:
			data=data.fillna(data.median())
		encoded_file = open('file.csv','w')
		data.to_csv(encoded_file,index=False)
		encoded_file.close();
		encoded_file = open('file.csv','r')
		return Response(bytes(encoded_file.read(),'utf-8'), mimetype='application/octet-stream')


	@app.route('/StandardScaler', methods=['POST'])
	def StandardScaler():
		file = request.files['file']
		xAx = str(request.form.get('xAx'))
		yAx = str(request.form.get('yAx'))
		scaler = StandardScaler()
		data = pd.read_csv(file)
		data[[xAx,yAx]] = scaler.fit_transform(data[[xAx,yAx]])
		encoded_file = open('file.csv','w')
		data.to_csv(encoded_file,index=False)
		encoded_file.close();
		encoded_file = open('file.csv','r')
		return Response(bytes(encoded_file.read(),'utf-8'), mimetype='application/octet-stream')

if __name__ == '__main__':
    app.run(debug=True)