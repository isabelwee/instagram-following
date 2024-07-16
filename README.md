# instagram-following
Check if the people you follow on instagram follow you back!

### external packages
This program unfortunately uses instaloader, which is a strange confusing package that can't be regularly downloaded into the python library.

To properly download instaloader and run the program follow these steps:
1. start up a virtual environment:
   * on Windows:         `.\myenv\Scripts\activate`
   * on MacOs and Linux: `source myenv/bin/activate`
2. install instaloader in the virtual environment `pip3 install instaloader`
3. verify installation `instaloader --version`
4. run `python3 compare_follow_list.py`!
   
(You can alternatively just add instaloader onto your Python interpreter but I did the above and it seemed like the easiest way)
