from google.cloud import vision
from google.cloud.vision import types
import cv2
import io
import browserhistory as bh
import libs.constants

# __file__ = libs.Constants.FILE_PATH


def get_image_results(image_path):
    
    # image_path = input("\nPlease enter the path to the image you wish to test: ") 
    # print("Path entered: ", image_path) 

    client = vision.ImageAnnotatorClient()
    # img = cv2.imread(image_path)
    # img_bytes = cv2.imencode('.jpg', img)[1].tostring() # Encode Image into Bytes
    img_bytes = image_path.read()
    image = types.Image(content=img_bytes)

    response = client.safe_search_detection(image=image)

    if response.error.message:
        raise Exception(response.error.message)

    else:

        safety = response.safe_search_annotation

        results = {
            'adult' :
                libs.constants.likelihood_name[safety.adult],
            'medical' :
                libs.constants.likelihood_name[safety.medical],
            'spoofed' : 
                libs.constants.likelihood_name[safety.spoof],
            'violence':
                libs.constants.likelihood_name[safety.violence],
            'racy': libs.constants.likelihood_name[safety.racy],
        }

        return results # To put into front-end

# r = get_image_results() # front-end to upload images for testing
# print("\nGoogle Vision API Image Results: ")
# print(r,"\n")
