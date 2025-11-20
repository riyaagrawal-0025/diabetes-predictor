import sys
import json
import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(MODEL_PATH)

def main():
    data = json.loads(sys.argv[1])

    features = [
        float(data["age"]),
        float(data["sex"]),
        float(data["bmi"]),
        float(data["bp"]),
        float(data["s1"]),
        float(data["s2"]),
        float(data["s3"]),
        float(data["s4"]),
        float(data["s5"]),
        float(data["s6"]),
    ]

    arr = np.array(features).reshape(1, -1)

    pred = int(model.predict(arr)[0])
    prob = float(model.predict_proba(arr)[0][1])

    print(json.dumps({
        "prediction": pred,
        "probability": prob
    }))

if __name__ == "__main__":
    main()
