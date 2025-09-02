import pandas as pd
from sklearn.datasets import load_diabetes

data = load_diabetes(as_frame=True)
df = data.frame

df['Outcome'] = (df['target'] > df['target'].median()).astype(int)

df.to_csv("diabetes.csv", index=False)

print("CSV file created: diabetes.csv")

pdf = pd.read_csv('diabetes.csv')

print(pdf.head())