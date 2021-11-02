import bcrypt
from captcha.image import ImageCaptcha
import random
import string
import jwt
from jwt.exceptions import ExpiredSignatureError
from io import BytesIO

captcha = ImageCaptcha()

def generateCaptcha():
    image = ImageCaptcha(width = 280, height = 90)
    
    captcha_length = random.choice(range(6, 11))
    captcha_value = "".join(
        [random.choice(string.ascii_lowercase) for _ in range(captcha_length)]
    )

    data = image.generate(captcha_value)
    image.write(captcha_value, 'demo.png')

    captcha_image = captcha.generate_image(captcha_value)
    captcha_buffer = BytesIO()
    captcha_image.save(captcha_buffer, format="PNG")


    captcha_salt = bcrypt.gensalt(rounds=12)
    captcha_code = (captcha_value).encode("latin")
    captcha_hash = bcrypt.hashpw(captcha_code, captcha_salt).decode("latin1")

    captcha_jwt = jwt.encode(
        {"hash": captcha_hash},
        key= "secret",
        algorithm="HS256",
    )

    return (captcha_value, captcha_jwt)


def verifyCaptcha(captcha_answer, token):
    captcha_result = {"valid": False, "expired": False}

    if not captcha_answer:
        return captcha_result

    jwtData = {}

    try:
        jwtData = jwt.decode(
            token,
            key="secret",
            algorithms=["HS256"],
            options={"verify_exp": True},
        )
    except ExpiredSignatureError:
        captcha_result["expired"] = True
    # except PyJWTError:
    except Exception as exc:
        pass

    if jwtData:
        captcha_hash = jwtData.get("hash").encode("latin1")
        captcha_code = (captcha_answer).encode("latin1")
        captcha_result["valid"] = bcrypt.checkpw(captcha_code, captcha_hash)

    return captcha_result

