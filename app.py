from flask import Flask, render_template, request, url_for, jsonify
import pymongo
from flask_pymongo import PyMongo
# from libs.constants import MONGODB

mongo = PyMongo()
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster0.ga0ld.mongodb.net/Database"
mongo.init_app(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        msg_txt = request.form['msg_txt']
        # adding text message to the database  TO DO
        # mongo.db.text_messages.insert({'text' : msg_txt})
        # adding image to the database
        # if 'msg_image' in request.files:
        #     msg_image = request.files['msg_image']
        #     mongo.save_file(msg_image.filename, msg_image)
        #     mongo.db.image_file.insert({'image_name' : msg_image.filename})

        if msg_txt:
            newMsg = msg_txt[::1]

            return jsonify({'msg_txt' : newMsg})

        return jsonify({'error': 'Missing Data!'})
        # return render_template('index.html', msg = msg_txt) #do this for image, text and audio seperately
        # return 'Done'


# @app.route('/test/', methods=['POST'])
# def send_items():
#     message = request.form.get('msg_txt')

#     sql = 'UPDATE audit SET description=? WHERE test_name=?'
#     conn = sqlite3.connect(DATABASE)
#     cur = conn.cursor()
#     cur.execute(sql, (description, test_name))
#     conn.commit()
#     conn.close()

#     return render_template('clicked.html', data=(test_name, description))

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
