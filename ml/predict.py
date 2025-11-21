import sys
import json
import joblib
import numpy as np
import pandas as pd
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(MODEL_PATH)

def main():
    data = json.loads(sys.argv[1])
    feature_names = ["age", "sex", "bmi", "bp", "s1", "s2", "s3", "s4", "s5", "s6"]
    features = [float(data[name]) for name in feature_names]
    df = pd.DataFrame([features], columns=feature_names)
    pred = int(model.predict(df)[0])
    prob = float(model.predict_proba(df)[0][1])
    print(json.dumps({
        "prediction": pred,
        "probability": prob
    }))
if __name__ == "__main__":
    main()
