from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = \
    "postgresql://postgres:Halosucks10%40@localhost:5432/todo_app"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


tasks = []
task_id = 1

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    global task_id
    data = request.json

    task = {
        "id": task_id,
        "text": data["text"]
    }

    tasks.append(task)
    task_id += 1
    return jsonify(task), 201

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    global tasks
    tasks = [t for t in tasks if t["id"] != id]
    return "", 204

if __name__ == "__main__":
    app.run(debug=True)   