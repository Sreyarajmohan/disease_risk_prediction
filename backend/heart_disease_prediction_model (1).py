import os
os.system("pip install pandas numpy scikit-learn xgboost catboost imbalanced-learn")

import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.preprocessing import StandardScaler

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    roc_auc_score
)

from imblearn.over_sampling import SMOTE

from xgboost import XGBClassifier

from catboost import CatBoostClassifier

from sklearn.ensemble import VotingClassifier

url = "https://archive.ics.uci.edu/ml/machine-learning-databases/heart-disease/processed.cleveland.data"

columns = [
    'age', 'sex', 'cp', 'trestbps', 'chol',
    'fbs', 'restecg', 'thalach', 'exang',
    'oldpeak', 'slope', 'ca', 'thal', 'target'
]

df = pd.read_csv(
    url,
    header=None,
    names=columns,
    na_values='?'
)

df = df.apply(pd.to_numeric)

df.fillna(df.median(), inplace=True)

df['target'] = (df['target'] > 0).astype(int)

df['chol_age'] = df['chol'] * df['age']

df['bp_age'] = df['trestbps'] * df['age']

df['stress_index'] = df['oldpeak'] * df['exang']

df['heart_ratio'] = df['thalach'] / df['age']

X = df.drop('target', axis=1)

y = df['target']

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)

X_test = scaler.transform(X_test)

smote = SMOTE(random_state=42)

X_train, y_train = smote.fit_resample(X_train, y_train)

xgb = XGBClassifier(
    n_estimators=1200,
    learning_rate=0.008,
    max_depth=4,
    min_child_weight=1,
    subsample=0.95,
    colsample_bytree=0.95,
    gamma=0,
    reg_alpha=0.2,
    reg_lambda=1,
    objective='binary:logistic',
    eval_metric='logloss',
    random_state=42
)

cat = CatBoostClassifier(
    iterations=1000,
    learning_rate=0.01,
    depth=6,
    loss_function='Logloss',
    verbose=0,
    random_seed=42
)

model = VotingClassifier(
    estimators=[
        ('xgb', xgb),
        ('cat', cat)
    ],
    voting='soft'
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

y_prob = model.predict_proba(X_test)[:, 1]

accuracy = accuracy_score(y_test, y_pred)

roc_auc = roc_auc_score(y_test, y_prob)

print("\n==============================")
print("HEART DISEASE PREDICTION")
print("==============================")

print(f"\nAccuracy : {accuracy * 100:.2f}%")

print(f"ROC-AUC  : {roc_auc:.4f}")

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred,
        target_names=['No Disease', 'Disease']
    )
)
