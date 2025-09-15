import pandas as pd
from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pickle

from model import generate_csv

generate_csv()
pdf = pd.read_csv('diabetes.csv')
 
x= pdf.drop("Outcome", axis=1)
y= pdf["Outcome"]

x_train, x_test, y_train, y_test = train_test_split(x,y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(x_train, y_train)

pickle.dump(model, open('model.pkl', 'wb'))

app = Flask(__name__)

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Extract features in the correct order
    features = [
        float(data.get('age', 0)),
        float(data.get('sex', 0)),
        float(data.get('bmi', 0)),
        float(data.get('bp', 0)),
        float(data.get('s1', 0)),
        float(data.get('s2', 0)),
        float(data.get('s3', 0)),
        float(data.get('s4', 0)),
        float(data.get('s5', 0)),
        float(data.get('s6', 0)),
        float(data.get('target', 0))
    ]
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    risk = "High Risk" if prediction == 1 else "Low Risk"
    # print(prediction)
    return jsonify({ "risk": risk})

if __name__ == '__main__':
    app.run(debug=True)