import os
from flask import Flask, render_template, request, url_for, jsonify
import pymongo
from flask_pymongo import PyMongo
import base64
from werkzeug.utils import secure_filename

from libs.tisane import *
from libs.text2speech import *
from libs.googlevision import *

# print("mongodb", libs.constants.TISANE_API_KEY_1)
mongo = PyMongo()
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster0.ga0ld.mongodb.net/Database"
mongo.init_app(app)

UPLOAD_FOLDER = 'static/images/uploads/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/text2speech', methods=['POST'])
def text2speech():
    # print(request.form)
    # audio_file = request.form['audio_file']
    # audio_file_test = list(request.form.to_dict().keys())
    # print("1", audio_file_test[0])

    if request.method == "POST":
        f = request.files['audio_data']

        # print("response", response)
        # print("f", f)
        # with open('audio.wav', 'wb') as audio:
        f.seek(0)
        f.save("audio/audio.wav")
        response = tisane_analysis_audio("audio/audio.wav")
        print("response", response)
        f.close()
        print('file uploaded successfully')

        return response


    # print("2", audio_file_test2)
    # return request.form
    # audio_file = request.files['audio_url']
    # audio_file2 = request.files['file']
    # audio_file3 = request.files
    # print("audio", audio_file2, audio_file, audio_files3)
    # response = text2speech_main(audio_file)
    # print(response)
    # return jsonify(response)
    # print("response", response)
    # audio_file.save(audio_file.filename)
    # print(audio_file.filename)
    
    # transcript = text2speech(audio_file)d
    # print("transcript", transcript)


@app.route('/tisane', methods=['GET', 'POST'])
def tisane_analysis():
    print(request.form['msg_txt'])
    msg_txt = request.form['msg_txt']
    print("message: ", msg_txt)
    if msg_txt:
        newMsg = msg_txt[::1]
        result = analyse_text(newMsg)
        print("result ", result)
        return jsonify({'msg_txt' : newMsg, 'result' : result})
    return jsonify({'error': 'Missing Data!'})


@app.route('/gcv', methods=['GET', 'POST'])
def gcv_analysis():
    if 'msg_image' in request.files:
        msg_image = request.files['msg_image']
        result = get_image_results(msg_image)
        print("result ", result)
        return result
    return jsonify({'error': 'Missing Data!'})
    

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    # elif request.method == 'POST':
    #     msg_txt = request.form['msg_txt']
    #     if msg_txt:
    #         newMsg = msg_txt[::1]
    #         response = analyse_text(newMsg)
    #         print("result ", response)
    #         return jsonify({'msg_txt' : newMsg, 'response' : response})

    #     if 'msg_image' in request.files:
    #         msg_image = request.files['msg_image']
            # mongo.save_file(msg_image.filename, msg_image)
            # mongo.db.image_file.insert({'image_name' : msg_image.filename})

            # Uploads images to static folder
            # if msg_image and allowed_file(msg_image.filename):
            #     filename = secure_filename(msg_image.filename)
            #     msg_image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            #     print((os.path.join(app.config['UPLOAD_FOLDER'], filename)))
            #     return jsonify({'image': base64.b64encode(msg_image.read())})

                # # profile_image = request.files.get(msg_image, False) 
                # with open((os.path.join(app.config['UPLOAD_FOLDER'], filename)), "rb") as imageFile:
                #     f = imageFile.read()
                #     b = bytearray(f)
                #     image = base64.b64encode(b).decode("utf-8")
                #     # img = profile_image.file.read()
                #     return jsonify({'image': image})
                # with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "rb") as imageFile:
                #     img = imageFile.file.read()
                #     print("wee", img)
                #     return jsonify({'image': img})

            # image = base64.b64encode(filename).decode("utf-8")
            # print("wee", image)
            # imgfile = request.files.get(msg_image, False) 
            # with open(filepath, "rb") as imageFile:
            #     img = imageFile.file.read()
            #     print("wee", img)
            #     return jsonify({'image': img})

        # return jsonify({'error': 'Missing Data!'})

        # adding text message to the database  TO DO
        # mongo.db.text_messages.insert({'text' : msg_txt})
        # adding image to the database
        # if 'msg_image' in request.files:
        #     msg_image = request.files['msg_image']
        #     mongo.save_file(msg_image.filename, msg_image)
        #     mongo.db.image_file.insert({'image_name' : msg_image.filename})

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
