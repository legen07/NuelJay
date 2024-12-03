from PIL import Image;
import os
import glob
import re


dir_path = "./**/*.webp"

# print(glob.glob(dir_path))

globs = glob.glob(dir_path)

for image_file in globs : 
  # print(image)


  image = Image.open(image_file)

  opt_img = image.resize((10, 14), Image.LANCZOS)

  print(re.sub(".webp","_lri.webp", image_file), 'this is the image OF The Fucking')
  opt_img.save(re.sub(".webp","_lri.webp", image_file), quality=10)