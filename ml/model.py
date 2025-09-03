import pandas as pd
from sklearn.datasets import load_diabetes

# data = {
#     "name" : ["Riya", "Agra", "wal"],
#     "age" : [99, 98, 97]
# }
# df = pd.DataFrame(data)
# df.to_csv('riya.csv', index=False)

def generate_csv():
    data = load_diabetes(as_frame=True)
    df = data.frame

    df['Outcome'] = (df['target'] > df['target'].median()).astype(int)

    df.to_csv("diabetes.csv", index=False)
