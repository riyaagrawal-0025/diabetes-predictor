import pandas as pd
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