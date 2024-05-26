# #!/bin/bash

# # Define source and output directories
# src_dir="./src/images/"
# output_dir="./d/smalls"

# # Ensure output directory exists
# mkdir -p "$output_dir" || { echo "Error creating output directory"; exit 1; }

# # Loop through all files in source directory recursively (**)
# # and filter for files with image extensions (jpg, jpeg, png)
# for image in "$src_dir"**/*; do
#   # Extract filename without extension
#   echo $image
#   # filename=$(basename "$image" .*)
  
#   # Define output filename with same name in output directory
#   # output_file="$output_dir/$filename.min.$(echo "${image##*.}" | tr '[:upper:]' '[:lower:]')"

#   # Use jpegoptim for JPG/JPEG and optipng for PNG with 90% quality
#   # if [[ "${image##*.}" == "jpg" || "${image##*.}" == "jpeg" ]]; then
#     # jpegoptim -q 90 "$image" -o "$output_file"
#   # elif [[ "${image##*.}" == "png" ]]; then
#     # optipng -o7 "$image" "$output_file"
#   # fi

#   # Print success message
#   # echo "Minified '$image' to '$output_file'"
# done

# echo "Finished minifying images!"


!/bin/bash

for file in ./src/images/**/*; do
  # echo $file
  fileName=$(basename "$file")
  echo text of what hash is ${file#}

done