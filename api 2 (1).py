from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from disease_risk_model import (
    load_data, BatAlgorithm, FuzzyRuleEngine,
    build_model, predict_patient
)

app = Flask(__name__)
CORS(app)

df = load_data()
feature_names = df.drop('target', axis=1).columns.tolist()
X = df.drop('target', axis=1).values
y = df['target'].values

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

ba = BatAlgorithm(n_bats=20, n_iter=40, random_state=42)
mask = ba.select_features(X_scaled, y)

X_sel = X_scaled[:, mask]
X_train, X_test, y_train, y_test = train_test_split(
    X_sel, y, test_size=0.2, random_state=42, stratify=y)

model = build_model()
model.fit(X_train, y_train)

fuzzy = FuzzyRuleEngine()


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})


@app.route('/features', methods=['GET'])
def get_features():
    info = {
        "age"      : {"label": "Age (years)",                                    "min": 29,  "max": 77},
        "sex"      : {"label": "Sex (1 = Male, 0 = Female)",                     "min": 0,   "max": 1},
        "cp"       : {"label": "Chest Pain Type (0-3)",                           "min": 0,   "max": 3},
        "trestbps" : {"label": "Resting Blood Pressure (mmHg)",                   "min": 90,  "max": 200},
        "chol"     : {"label": "Cholesterol (mg/dL)",                             "min": 130, "max": 400},
        "fbs"      : {"label": "Fasting Blood Sugar > 120 (1 = Yes)",             "min": 0,   "max": 1},
        "restecg"  : {"label": "Resting ECG Results (0-2)",                       "min": 0,   "max": 2},
        "thalach"  : {"label": "Max Heart Rate Achieved",                         "min": 70,  "max": 200},
        "exang"    : {"label": "Exercise Induced Angina (1 = Yes)",               "min": 0,   "max": 1},
        "oldpeak"  : {"label": "ST Depression (Oldpeak)",                         "min": 0,   "max": 6.2},
        "slope"    : {"label": "Slope of Peak ST Segment (0-2)",                  "min": 0,   "max": 2},
        "ca"       : {"label": "No. of Major Vessels (0-3)",                      "min": 0,   "max": 3},
        "thal"     : {"label": "Thalassemia (1=Normal, 2=Fixed, 3=Reversible)",  "min": 1,   "max": 3},
    }
    return jsonify(info)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No data provided"}), 400

        patient = {k: float(v) for k, v in data.items()}
        result = predict_patient(patient, model, scaler, mask, feature_names, fuzzy)

        if result["risk_level"] == "High":
            result["recommendation"] = "Immediate clinical consultation advised."
        elif result["risk_level"] == "Medium":
            result["recommendation"] = "Regular monitoring and lifestyle changes recommended."
        else:
            result["recommendation"] = "Maintain healthy habits and annual checkups."

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
