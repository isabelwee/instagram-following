#!/bin/env python3

from getpass import getpass
import instaloader

l = instaloader.Instaloader()

username = input("Enter instagram username: ")
password = getpass("Enter instagram password: ")

# login to instagram
print()
print("Logging in...")
try:
    l.login(username, password)
except Exception as e:
    print("Login failed: ", e)
    exit()

# get profile to get followers and following
print("Getting profile and follow lists...")
profile = instaloader.Profile.from_username(l.context, username)
followers = profile.get_followers()
following = profile.get_followees()

# get list of usernames
print("Generating list of follower usernames...")
followers_usernames = [follower.username for follower in followers]
print("Generating list of following usernames...")
following_usernames = [follow.username for follow in following]

print("Comparing follow lists...")
follows_back = [user for user in following_usernames if user not in followers_usernames]

print()
print("============================ SUCCESS ============================")
print("Users who don't follow you back: ")
for user in follows_back:
    print("@" + user)
